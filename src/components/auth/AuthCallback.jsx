import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

const AuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // If coming from OAuth or email link, exchange the code for a session
        const code = searchParams.get('code');
        const errorParam = searchParams.get('error');
        const type = searchParams.get('type'); // e.g., 'signup', 'recovery', 'magiclink', 'oauth'

        if (errorParam) {
          console.error('Auth callback error param:', errorParam);
          navigate('/auth/signin');
          return;
        }

        if (code) {
          const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
          if (exchangeError) {
            console.error('Exchange code error:', exchangeError);
            navigate('/auth/signin');
            return;
          }
        }

        // For password recovery links, route to reset screen
        if (type === 'recovery') {
          navigate('/auth/reset-password?' + searchParams.toString());
          return;
        }

        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth callback error:', error);
          navigate('/auth/signin');
          return;
        }

        if (data.session) {
          navigate('/dashboard');
        } else {
          navigate('/auth/signin');
        }
      } catch (error) {
        console.error('Auth callback error:', error);
        navigate('/auth/signin');
      }
    };

    handleAuthCallback();
  }, [navigate, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-blue-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Completing sign in...</p>
      </div>
    </div>
  );
};

export default AuthCallback;