import { useState } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../../utils/axiosInstant';

export const useEmailVerification = () => {
  const [loading, setLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);

  const resendVerification = async (email: string) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post('/auth/resend-verification', { email });
      toast.success(response.data.message);
      return true;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Gửi email thất bại');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (email: string, otp: string) => {
    try {
      setVerifyLoading(true);
      const response = await axiosInstance.post('/auth/verify-email', { email, otp });
      toast.success(response.data.message);
      return true;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Xác thực thất bại');
      return false;
    } finally {
      setVerifyLoading(false);
    }
  };

  return {
    resendVerification,
    verifyOTP,
    loading,
    verifyLoading
  };
};