import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Mail, ArrowLeft, CheckCircle, Phone } from 'lucide-react';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
  const [mode, setMode] = useState('email'); // 'email' | 'phone'
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const { resetPassword, sendPhoneOtp, loading } = useAuth();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (mode === 'email') {
      if (!email) return;
      const { data } = await resetPassword(email);
      if (data) {
        setEmailSent(true);
      }
    } else {
      if (!phone) return;
      // For phone-based reset, send OTP and instruct user to verify to proceed
      const { data, error } = await sendPhoneOtp(phone, false);
      if (error) return;
      toast.success('Enter the OTP sent to your phone to continue');
      // Store a flag in sessionStorage to indicate this is a reset flow
      sessionStorage.setItem('pwd_reset_phone', phone);
      window.location.href = '/auth/verify-otp';
    }
  };

  if (emailSent) {
    return (
      <div className="min-h-screen flex flex-col justify-center bg-gradient-to-br from-emerald-50 to-blue-50">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow-xl rounded-lg sm:px-10">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Check Your Email
              </h2>
              <p className="text-gray-600 mb-6">
                We've sent a password reset link to your email address. Please check your inbox and follow the instructions to reset your password.
              </p>
              <Link
                to="/auth/signin"
                className="inline-flex items-center text-emerald-600 hover:text-emerald-500 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center bg-gradient-to-br from-emerald-50 to-blue-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl rounded-lg sm:px-10">
          <div className="text-center mb-6">
            <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
              <Mail className="h-8 w-8 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Reset Your Password
            </h2>
            <p className="text-gray-600">
              Choose Email reset link or Phone OTP reset.
            </p>
          </div>

          <div className="flex space-x-2 mb-4">
            <button type="button" onClick={() => setMode('email')} className={`px-3 py-1 rounded ${mode==='email' ? 'bg-emerald-600 text-white' : 'bg-gray-100'}`}>Email</button>
            <button type="button" onClick={() => setMode('phone')} className={`px-3 py-1 rounded ${mode==='phone' ? 'bg-emerald-600 text-white' : 'bg-gray-100'}`}>Phone</button>
          </div>

          <form onSubmit={handleResetPassword} className="space-y-6">
            {mode === 'email' ? (
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
            ) : (
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                    placeholder="e.g. +1 415 555 2671"
                  />
                </div>
                <p className="mt-1 text-sm text-gray-500">Use E.164 format starting with +countrycode</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                'Send Reset Email'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/auth/signin"
              className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;