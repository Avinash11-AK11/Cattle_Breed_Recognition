import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, RefreshCw } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useState } from 'react';

const VerificationSent = () => {
  const [resending, setResending] = useState(false);
  const { user } = useAuth();

  const handleResendVerification = async () => {
    setResending(true);
    // Implementation would depend on Supabase's resend verification method
    setTimeout(() => setResending(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center bg-gradient-to-br from-emerald-50 to-blue-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl rounded-lg sm:px-10">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
              <Mail className="h-8 w-8 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Verify Your Email
            </h2>
            <p className="text-gray-600 mb-2">
              We've sent a verification link to:
            </p>
            <p className="text-emerald-600 font-medium mb-6">
              {user?.email}
            </p>
            <p className="text-gray-600 mb-8">
              Please check your inbox and click the verification link to activate your account.
            </p>
            
            <div className="space-y-4">
              <button
                onClick={handleResendVerification}
                disabled={resending}
                className="inline-flex items-center text-emerald-600 hover:text-emerald-500 transition-colors"
              >
                <RefreshCw className={`h-4 w-4 mr-1 ${resending ? 'animate-spin' : ''}`} />
                {resending ? 'Sending...' : 'Resend verification email'}
              </button>
              
              <div className="pt-4">
                <Link
                  to="/auth/signin"
                  className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back to sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationSent;