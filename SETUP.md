# Setup Instructions

## Quick Start

1. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```

2. **Run the development servers** (both Convex and Vite):
   ```bash
   npm run dev
   ```

   This will:
   - Start Convex dev server (backend)
   - Start Vite dev server (frontend)
   - Automatically set up your Convex project if needed
   - Generate the `VITE_CONVEX_URL` environment variable

3. **Open your browser**:
   - The app will start at `http://localhost:5173` (or the port Vite assigns)
   - You'll be redirected to `/signin` (login page)
   - Sign up or sign in to access the dashboard

## First Time Setup

If this is your first time running the project:

1. When you run `npm run dev`, Convex will prompt you to:
   - Create a Convex account (if you don't have one)
   - Create a new project or select an existing one
   - The `VITE_CONVEX_URL` will be automatically added to `.env.local`

2. After Convex is set up, both servers will run together.

## Project Structure

- **Frontend**: React + Vite + TypeScript
- **Backend**: Convex (serverless backend)
- **Authentication**: Convex Auth with email/password

## Routes

- `/` - Redirects to `/signin`
- `/signin` - Login page (public)
- `/signup` - Sign up page (public)
- `/dashboard` - Main dashboard (protected)
- All other routes are protected and require authentication

## Scripts

- `npm run dev` - Run both Convex and Vite together
- `npm run dev:frontend` - Run only Vite (frontend)
- `npm run dev:convex` - Run only Convex (backend)
- `npm run build` - Build for production
- `npm run lint` - Run ESLint

## Troubleshooting

### Convex URL Missing
If you see errors about missing `VITE_CONVEX_URL`:
1. Make sure Convex dev server is running
2. Check `.env.local` file exists and has `VITE_CONVEX_URL`
3. Restart the dev server

### Port Already in Use
If port 5173 is already in use, Vite will automatically use the next available port.

### Authentication Issues
- Make sure both Convex and Vite servers are running
- Check browser console for errors
- Verify Convex functions are deployed (check Convex dashboard)

## Environment Variables

The `.env.local` file (created automatically) contains:
```
VITE_CONVEX_URL=https://your-project.convex.cloud
```

Do not commit this file to git (it's in `.gitignore`).

