import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { Phone, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

const VerifyOTP = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const { verifyOTP, sendPhoneOtp, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const phone = location.state?.phone;
  const isSignUp = location.state?.isSignUp;
  const fullName = location.state?.fullName;
  const from = location.state?.from || '/dashboard';
  const isPasswordReset = !!sessionStorage.getItem('pwd_reset_phone');

  useEffect(() => {
    if (!phone) {
      navigate('/auth/signin');
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [phone, navigate]);

  const handleOtpChange = (index, value) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    const otpCode = otp.join('');
    
    if (otpCode.length !== 6) {
      toast.error('Please enter the complete OTP');
      return;
    }

    const { data } = await verifyOTP(phone, otpCode);
    if (data.user) {
      // If this was a sign-up via phone and we collected full name, persist it to user metadata
      if (isSignUp && fullName) {
        try {
          await supabase.auth.updateUser({
            data: { full_name: fullName }
          });
        } catch (e) {
          // Ignore metadata update errors, continue flow
        }
      }

      if (isPasswordReset) {
        sessionStorage.removeItem('pwd_reset_phone');
        navigate('/auth/reset-password');
      } else {
        navigate(from, { replace: true });
      }
    }
  };

  const handleResendOTP = async () => {
    if (timer > 0) return;
    
    await sendPhoneOtp(phone, isSignUp !== false);
    setTimer(60);
    setOtp(['', '', '', '', '', '']);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center bg-gradient-to-br from-emerald-50 to-blue-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl rounded-lg sm:px-10">
          <div className="text-center mb-6">
            <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
              <Phone className="h-8 w-8 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Verify Your Phone
            </h2>
            <p className="text-gray-600">
              We've sent a 6-digit code to
            </p>
            <p className="text-emerald-600 font-medium">{phone}</p>
          </div>

          <form onSubmit={handleVerifyOTP} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Enter verification code
              </label>
              <div className="flex space-x-2 justify-center">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 text-center text-xl font-bold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  />
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || otp.join('').length !== 6}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                'Verify & Continue'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Didn't receive the code?{' '}
              {timer > 0 ? (
                <span className="text-emerald-600 font-medium">
                  Resend in {timer}s
                </span>
              ) : (
                <button
                  onClick={handleResendOTP}
                  className="font-medium text-emerald-600 hover:text-emerald-500 transition-colors"
                >
                  Resend OTP
                </button>
              )}
            </p>
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={() => navigate('/auth/signin')}
              className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;