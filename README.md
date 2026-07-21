# LibraryPro

LibraryPro is a modern, role-based library management system built with React, TypeScript, Vite, and Supabase. It provides a polished experience for administrators, librarians, and members to manage books, members, borrowings, reservations, and library activity from a single interface.

## Overview

This project is a full-stack-style frontend demo for a library platform with:

- A public landing experience
- Authentication and role-based access
- Separate dashboards for admins, librarians, and members
- Book and member management workflows
- Borrowing and reservation tracking
- A modern, responsive UI built with shadcn-style components and Tailwind CSS

## Key Features

- Role-based portals for admin, librarian, and member users
- Book catalog browsing and management
- Member registration and profile handling
- Borrowing and return workflows
- Reservation management
- Notifications and profile/account views
- Dark/light theme support
- Responsive sidebar-based navigation

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router
- Tailwind CSS
- shadcn/ui-inspired component system
- Supabase Auth and profiles
- React Hook Form + Zod
- TanStack React Table
- Sonner for toast notifications

## Project Structure

- src/App.tsx — main application router and route layout
- src/pages/ — page-level views for home, auth, dashboard, books, members, borrowings, reservations, reports, settings, and profile
- src/components/ — reusable UI and layout components such as the sidebar and protected routes
- src/lib/ — application state, auth context, Supabase client, and sample data
- supabase/migrations/ — SQL migrations for the Supabase profiles table and policies

## Authentication and Roles

The app uses Supabase for authentication and profile management.

Supported roles:

- Admin
- Librarian
- Member

User sign-in and sign-up flows are handled via Supabase Auth, and each role is routed to a different dashboard experience.

## Data Model Notes

The current implementation uses mock library data for books, members, borrowings, and reservations in the frontend state. Supabase is primarily used for:

- User authentication
- User profile storage
- Role-based access support

The mock dataset is defined in src/lib/data.ts and is managed through the library context in src/lib/library-context.tsx.

## Getting Started

### Prerequisites

- Node.js 18+ recommended
- npm
- A Supabase project

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a .env.local file in the project root with your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Set up Supabase

Apply the SQL migration in supabase/migrations/ to create the profiles table and related policies in your Supabase project.

### 4. Run the app locally

```bash
npm run dev
```

Then open the local Vite URL shown in the terminal.

## Available Scripts

- npm run dev — start the development server
- npm run build — build the app for production
- npm run typecheck — run TypeScript checks
- npm run preview — preview the production build

## Example User Journeys

- Sign up as a member and browse the catalog
- Sign in as a librarian to manage books and circulation
- Sign in as an admin to view reports and manage the wider system

## Notes

This repository is a polished library management UI and workflow demo. It is well suited for showcasing role-based dashboards, modern React patterns, and Supabase integration, but the core library records are currently seeded from mock data rather than a fully connected backend.
