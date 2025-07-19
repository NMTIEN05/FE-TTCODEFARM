import { useState } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../../utils/axiosInstant';

type ChangePasswordFormData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export const useChangePassword = (userId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const changePassword = async (data: ChangePasswordFormData) => {
    // Kiểm tra mật khẩu mới và xác nhận mật khẩu
    if (data.newPassword !== data.confirmPassword) {
      setError('Mật khẩu mới và xác nhận mật khẩu không khớp');
      return;
    }

    // Kiểm tra độ dài mật khẩu mới
    if (data.newPassword.length < 6) {
      setError('Mật khẩu mới phải có ít nhất 6 ký tự');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axiosInstance.post(`/auth/users/${userId}/change-password`, {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword
      });

      setSuccess(response.data.message || 'Đổi mật khẩu thành công');
      toast.success('Đổi mật khẩu thành công', {
        position: "top-right",
        autoClose: 3000,
      });
      
      // Reset form (thông qua callback)
      return true;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Có lỗi xảy ra khi đổi mật khẩu';
      setError(message);
      toast.error(message, {
        position: "top-right",
        autoClose: 3000,
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    changePassword,
    loading,
    error,
    success,
    setError,
    setSuccess
  };
};