# bread_detection

## Auth setup (Supabase + OAuth + Phone OTP)

Follow these steps to fix unsupported phone provider, email verification links, Google sign-in, and password reset flows.

### 1) Environment variables

Create a `.env` file in the project root with:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Restart the dev server after changes.

### 2) Supabase Auth URL settings

In Supabase Dashboard → Authentication → URL Configuration:
- Set Site URL to your app URL during development: `http://localhost:5173`.
- Add Redirect URLs:
  - `http://localhost:5173/auth/callback`
  - `http://localhost:5173/auth/reset-password`
- Add your production URLs similarly.

These match the app routes in `src/App.jsx`.

### 3) Email verification and password recovery

- Email verification links are configured via `emailRedirectTo: ${origin}/auth/callback` in the app.
- Password recovery emails use `redirectTo: ${origin}/auth/reset-password`.
- Ensure both routes exist (they do in this project) and are whitelisted in Supabase.

If you see “This site can’t be reached” after clicking the email link:
- Your Site URL in Supabase is wrong or not publicly reachable. Fix it to match where your app is actually hosted.
- In production, set `VITE_PUBLIC_SITE_URL` in your `.env` to your public URL (e.g., `https://yourdomain.com`). The app will use it for all Supabase redirects.
- Ensure the exact path `/auth/callback` is deployed and not blocked by hosting rewrites.
- If developing locally, the email may contain your production URL. Verify which project/environment sent the email and that the Site URL matches.

### 4) Google OAuth

In Supabase Dashboard → Authentication → Providers → Google:
- Enable Google.
- Paste Client ID and Client Secret from Google Cloud Console.
- In Google Cloud Console → OAuth consent screen & Credentials:
  - Authorized JavaScript Origins: `http://localhost:5173`
  - Authorized Redirect URIs: `http://localhost:5173/auth/callback`
- Save in Supabase. This resolves common Google sign-in errors due to redirect mismatch.

### 5) Phone OTP (SMS)

Error "unsupported phone provider" means no SMS provider is configured.

In Supabase Dashboard → Authentication → SMS:
- Choose a provider (e.g., Twilio or Vonage) and configure credentials.
- Set the default sender/from accordingly.
- Enable Phone auth in Authentication → Providers → Phone.
- Optionally customize SMS templates for OTP codes.

The app uses `signInWithOtp` with `{ channel: 'sms' }` and expects phone numbers in E.164 format (e.g., `+14155552671`).

If you see "Signups not allowed for otp":
- Supabase Dashboard → Authentication → Providers → Email/Phone → under Phone, ensure "Allow new users to sign up" is enabled (or enable signups globally under Authentication → Policies/Settings depending on plan/version).
- In this app we request OTP with `shouldCreateUser: true` by default, so if signups are allowed in your project, it will create the user during OTP flow.

### 6) Phone-based password reset (OTP)

This project supports resetting a password by confirming a phone OTP:
- In Forgot Password, switch to Phone tab, enter your number, receive OTP.
- After OTP verification you are routed to Set New Password.

No additional backend is required beyond configuring SMS provider.

### 7) Run locally

```
npm install
npm run dev
```

Open `http://localhost:5173`.
