# Convex Authentication Setup Guide

This project is now configured to use Convex for authentication with email and password.

## Setup Steps

1. **Install Convex CLI** (if not already installed):
   ```bash
   npm install -g convex
   ```

2. **Initialize Convex**:
   ```bash
   npx convex dev
   ```
   
   This will:
   - Create a Convex account (if you don't have one)
   - Set up your Convex project
   - Generate the `VITE_CONVEX_URL` environment variable
   - Start the Convex development server

3. **The environment variable will be automatically added** to your `.env.local` file (or `.env` file). The Convex CLI handles this automatically.

4. **Start your development server**:
   ```bash
   npm run dev
   ```

## Features Implemented

- ✅ Email/Password authentication (sign up and sign in)
- ✅ User profile management (first name, last name, email)
- ✅ Protected routes (dashboard pages require authentication)
- ✅ Automatic redirects (authenticated users redirected from auth pages)
- ✅ Sign out functionality
- ✅ User dropdown shows authenticated user info

## Authentication Flow

1. **Sign Up**: Users can create an account with email, password, first name, and last name
2. **Sign In**: Users can sign in with their email and password
3. **Protected Routes**: All dashboard routes are protected and require authentication
4. **User Profile**: User data is automatically created and stored in Convex

## Files Modified/Created

### Backend (Convex)
- `convex/auth.ts` - Authentication configuration with Password provider
- `convex/schema.ts` - Database schema including users table
- `convex/users.ts` - User queries and mutations

### Frontend
- `src/lib/convex.ts` - Convex client configuration
- `src/context/AuthContext.tsx` - Authentication context and hooks
- `src/components/auth/SignInForm.tsx` - Updated sign in form
- `src/components/auth/SignUpForm.tsx` - Updated sign up form
- `src/components/auth/ProtectedRoute.tsx` - Route protection component
- `src/components/auth/AuthRedirect.tsx` - Redirect component for auth pages
- `src/components/header/UserDropdown.tsx` - Updated with sign out functionality
- `src/main.tsx` - Added ConvexProvider and AuthProvider
- `src/App.tsx` - Added route protection

## Notes

- Google and X (Twitter) sign-in buttons have been removed as requested
- Only email/password authentication is implemented
- User data is stored in the `users` table in Convex
- The authentication state is managed through React Context

## Troubleshooting

If you encounter issues:

1. Make sure `VITE_CONVEX_URL` is set in your environment variables
2. Ensure Convex dev server is running (`npx convex dev`)
3. Check browser console for any errors
4. Verify your Convex project is properly initialized

