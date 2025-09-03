import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Mail, Lock, Eye, EyeOff, Chrome, Phone } from 'lucide-react';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authMode, setAuthMode] = useState('email'); // 'email' or 'phone'
  const { signIn, signInWithGoogle, sendPhoneOtp, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    if (!email || !password) return;

    const { data } = await signIn(email, password);
    if (data.user) {
      navigate(from, { replace: true });
    }
  };

  const handleGoogleSignIn = async () => {
    await signInWithGoogle();
  };

  const handlePhoneSignIn = async (e) => {
    e.preventDefault();
    if (!phone) return;

    // Allow creating the user if it doesn't exist to avoid
    // "Signups not allowed for otp" when signups are permitted
    const { data } = await sendPhoneOtp(phone);
    if (data) {
      navigate('/auth/verify-otp', { 
        state: { phone, from } 
      });
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24 bg-white">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600">
              Sign in to access the Cattle Breed Recognition Platform
            </p>
          </div>

          {/* Auth Mode Toggle */}
          <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
            <button
              type="button"
              onClick={() => setAuthMode('email')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                authMode === 'email'
                  ? 'bg-white text-emerald-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Email
            </button>
            <button
              type="button"
              onClick={() => setAuthMode('phone')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                authMode === 'phone'
                  ? 'bg-white text-emerald-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Phone
            </button>
          </div>

          {authMode === 'email' ? (
            <form onSubmit={handleEmailSignIn} className="space-y-6">
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

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="appearance-none block w-full h-12 pl-10 pr-12 border border-gray-200 rounded-xl placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all bg-white"
                    placeholder="Enter your password"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="p-1 text-gray-500 hover:text-gray-700 focus:outline-none"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Link
                  to="/auth/forgot-password"
                  className="text-sm text-emerald-600 hover:text-emerald-500 transition-colors"
                >
                  Forgot your password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handlePhoneSignIn} className="space-y-6">
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
                    placeholder="+91 98765 43210"
                  />
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  We'll send you an OTP to verify your phone number
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  'Send OTP'
                )}
              </button>
            </form>
          )}

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleGoogleSignIn}
                className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all"
              >
                <Chrome className="h-5 w-5 text-red-500 mr-2" />
                Sign in with Google
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link
                to="/auth/signup"
                className="font-medium text-emerald-600 hover:text-emerald-500 transition-colors"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Hero */}
      <div className="hidden lg:block relative w-0 flex-1">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.pexels.com/photos/422218/pexels-photo-422218.jpeg"
          alt="Cattle in field"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/80 to-blue-600/80"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-8">
            <h1 className="text-4xl font-bold mb-4">
              Cattle Breed Recognition
            </h1>
            <p className="text-xl opacity-90">
              Advanced AI-powered identification for Indian cattle and buffalo breeds
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;