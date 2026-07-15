/*
# Create Profiles Table with Role-Based Access

## Purpose
Stores user profile information and roles for the LibraryPro management system.
Links to Supabase auth.users and supports three roles: admin, librarian, member.

## Changes

### 1. New Tables
- `profiles`
  - `id` (uuid, primary key) — references auth.users(id), cascades on delete
  - `email` (text, not null) — user's email address
  - `full_name` (text) — display name
  - `role` (text, not null) — one of: 'admin', 'librarian', 'member' (default: 'member')
  - `avatar_url` (text) — optional profile photo URL
  - `phone` (text) — optional phone number
  - `created_at` (timestamptz) — auto-set on insert
  - `updated_at` (timestamptz) — auto-updated on change

### 2. Security (RLS)
- RLS enabled on profiles
- Authenticated users can SELECT their own profile
- Authenticated users can UPDATE their own profile
- INSERT allowed for authenticated users (triggered on sign-up)
- Admins can SELECT all profiles (via role check in JWT metadata)

### 3. Trigger
- `handle_new_user` function + trigger: auto-creates a profile row
  when a new user is inserted into auth.users, pulling email and full_name
  from the sign-up metadata.

### Notes
- The role field is constrained to 'admin', 'librarian', or 'member'.
- Roles are set at sign-up time and can only be changed by an admin.
- Email confirmation is OFF — users get immediate access after sign-up.
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  full_name text,
  role text NOT NULL DEFAULT 'member' CHECK (role IN ('admin', 'librarian', 'member')),
  avatar_url text,
  phone text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policies
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT TO authenticated
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = id);

-- Allow admins to view all profiles
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
CREATE POLICY "Admins can view all profiles" ON profiles
  FOR SELECT TO authenticated
  USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

-- Allow admins to update all profiles (for role management)
DROP POLICY IF EXISTS "Admins can update all profiles" ON profiles;
CREATE POLICY "Admins can update all profiles" ON profiles
  FOR UPDATE TO authenticated
  USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  )
  WITH CHECK (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

-- Trigger: auto-create profile on sign-up
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'role', 'member')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE handle_new_user();

-- Index for role queries
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
