import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const siteUrl = import.meta.env.VITE_PUBLIC_SITE_URL || window.location.origin;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user || null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user || null);
      setLoading(false);

      if (event === 'SIGNED_IN') {
        toast.success('Successfully signed in!');
      } else if (event === 'SIGNED_OUT') {
        toast.success('Successfully signed out!');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email, password, userData = {}) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
          emailRedirectTo: `${siteUrl}/auth/callback`
        }
      });

      if (error) throw error;

      if (data.user && !data.user.email_confirmed_at) {
        toast.success('Please check your email for verification link');
      }

      return { data, error: null };
    } catch (error) {
      toast.error(error.message);
      return { data: null, error };
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email, password) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      toast.error(error.message);
      return { data: null, error };
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${siteUrl}/auth/callback`
        }
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      toast.error(error.message);
      return { data: null, error };
    }
  };

  const signInWithOTP = async (phone) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithOtp({
        phone,
        options: {
          channel: 'sms',
          shouldCreateUser: true
        }
      });

      if (error) throw error;
      toast.success('OTP sent to your phone number');
      return { data, error: null };
    } catch (error) {
      toast.error(error.message);
      return { data: null, error };
    } finally {
      setLoading(false);
    }
  };

  const sendPhoneOtp = async (phone, shouldCreateUser = true) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithOtp({
        phone,
        options: {
          channel: 'sms',
          shouldCreateUser
        }
      });

      if (error) throw error;
      toast.success('OTP sent to your phone number');
      return { data, error: null };
    } catch (error) {
      toast.error(error.message);
      return { data: null, error };
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (phone, token) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.verifyOtp({
        phone,
        token,
        type: 'sms'
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      toast.error(error.message);
      return { data: null, error };
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${siteUrl}/auth/reset-password`
      });

      if (error) throw error;
      toast.success('Password reset email sent');
      return { data, error: null };
    } catch (error) {
      toast.error(error.message);
      return { data: null, error };
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async (password) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.updateUser({
        password
      });

      if (error) throw error;
      toast.success('Password updated successfully');
      return { data, error: null };
    } catch (error) {
      toast.error(error.message);
      return { data: null, error };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      toast.error(error.message);
    }
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    sendPhoneOtp,
    signInWithOTP,
    verifyOTP,
    resetPassword,
    updatePassword,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};