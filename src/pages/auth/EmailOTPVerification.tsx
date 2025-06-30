import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEmailVerification } from '../../hooks/auth/useEmailVerification';

const EmailOTPVerification: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { resendVerification, verifyOTP, loading: resendLoading, verifyLoading } = useEmailVerification();
  const email = location.state?.email;
  
  const [otp, setOtp] = useState('');

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!otp || otp.length !== 6) {
      toast.error('Vui lòng nhập mã OTP 6 số');
      return;
    }

    const success = await verifyOTP(email, otp);
    if (success) {
      setTimeout(() => {
        navigate('/auth/login');
      }, 2000);
    }
  };

  const handleResend = async () => {
    if (email) {
      await resendVerification(email);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Xác thực email</h2>
          <p className="text-gray-600">
            Nhập mã OTP 6 số đã được gửi đến <strong>{email}</strong>
          </p>
        </div>

        <form onSubmit={handleVerifyOTP} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mã OTP
            </label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="Nhập 6 số"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-center text-2xl tracking-widest focus:outline-none focus:ring-2 focus:ring-indigo-500"
              maxLength={6}
              required
            />
          </div>

          <button
            type="submit"
            disabled={verifyLoading || otp.length !== 6}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50"
          >
            {verifyLoading ? 'Đang xác thực...' : 'Xác thực'}
          </button>
        </form>

        <div className="mt-6 text-center space-y-4">
          <button
            onClick={handleResend}
            disabled={resendLoading}
            className="text-indigo-600 hover:text-indigo-500 text-sm"
          >
            {resendLoading ? 'Đang gửi...' : 'Gửi lại mã OTP'}
          </button>
          
          <div>
            <button
              onClick={() => navigate('/login')}
              className="text-gray-500 hover:text-gray-700 text-sm"
            >
              Về trang đăng nhập
            </button>
          </div>
        </div>

        <p className="text-xs text-gray-500 mt-6 text-center">
          Mã OTP có hiệu lực trong 10 phút
        </p>
      </div>
    </div>
  );
};

export default EmailOTPVerification;