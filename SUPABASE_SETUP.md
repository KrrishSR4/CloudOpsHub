# Supabase Setup Guide

## 1. Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Create a new project
4. Note down your project URL and API keys

## 2. Run Database Migration

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `backend/supabase-migration.sql`
4. Run the migration

This will create:
- `users` table for storing user metadata
- Row Level Security policies
- Trigger to automatically create user records on signup

## 3. Get Your Supabase Credentials

From your Supabase project dashboard:
- **Project URL**: Found in Settings > API > Project URL
- **Anon Key**: Found in Settings > API > Project API keys > `anon` `public`
- **Service Role Key**: Found in Settings > API > Project API keys > `service_role` `secret` (keep this secure!)

## 4. Configure Frontend

Create or update `.env` file in the root directory:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

## 5. Configure Backend

Update `backend/.env` file:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
JWT_SECRET=your-jwt-secret
JWT_EXPIRES_IN=1d
PORT=3000
```

## 6. Test the Setup

1. Start frontend: `npm run dev`
2. Start backend: `cd backend && npm run start:dev`
3. Go to `http://localhost:8080/signup`
4. Create a new account
5. Login at `http://localhost:8080/login`

## Notes

- Frontend uses Supabase Auth directly (simpler and more secure)
- Backend auth endpoints are still available but frontend bypasses them
- User data is stored in Supabase `auth.users` table
- User metadata is stored in `users` table
- JWT tokens are managed by Supabase
