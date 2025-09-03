import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase environment variables are not configured. Please set up your .env file with valid Supabase credentials.');

  // Create a mock client to prevent app crashes during development
  supabase = {
    auth: {
      signUp: () => Promise.reject(new Error('Supabase not configured')),
      signInWithPassword: () => Promise.reject(new Error('Supabase not configured')),
      signInWithOAuth: () => Promise.reject(new Error('Supabase not configured')),
      signOut: () => Promise.reject(new Error('Supabase not configured')),
      resetPasswordForEmail: () => Promise.reject(new Error('Supabase not configured')),
      verifyOtp: () => Promise.reject(new Error('Supabase not configured')),
      onAuthStateChange: () => ({
        data: { subscription: null },
        unsubscribe: () => {}
      })
    }
  };
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export { supabase };
