# Project Setup Instructions

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Site URL for redirects
VITE_PUBLIC_SITE_URL=http://localhost:5173
```

## Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings > API
3. Copy the Project URL and anon public key
4. Add them to your `.env` file

## Running the Project

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:5173](http://localhost:5173) in your browser

## Features

- ✅ User Authentication (Email/Password, Phone OTP, Google OAuth)
- ✅ Protected Routes
- ✅ Dashboard with Breed Recognition
- ✅ Settings Page with Profile Management
- ✅ Password Change Functionality
- ✅ Logout Functionality
- ✅ Responsive Design
- ✅ Modern UI with Tailwind CSS

## Project Structure

```
src/
├── components/
│   ├── auth/           # Authentication components
│   ├── dashboard/      # Dashboard and settings
│   ├── Dashboard.jsx   # Main dashboard
│   └── ProtectedRoute.jsx
├── contexts/
│   └── AuthContext.jsx # Authentication context
├── lib/
│   └── supabase.js     # Supabase client
└── App.jsx            # Main app component
```
