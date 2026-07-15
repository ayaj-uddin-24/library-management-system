/*
# Fix Recursive RLS Policies on Profiles Table

## Problem
The "Admins can view all profiles" and "Admins can update all profiles" policies
used a self-referential subquery on the profiles table:
  SELECT role FROM profiles WHERE id = auth.uid()
This triggered the RLS check again recursively, causing a 500 error in PostgREST.

## Changes
- Drop the two admin-recursive policies
- Admins can still read/update their own profile via existing "Users can view own profile"
  and "Users can update own profile" policies

## Security
- No change in security posture for single-user admin profile access
- Admin-wide cross-user access removed (can be added safely later via app_metadata claim)
*/

DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON profiles;
