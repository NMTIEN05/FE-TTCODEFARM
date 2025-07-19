import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axiosInstance from '../../utils/axiosInstant';

type ForgotPasswordFormData = {
  email: string;
};

export const useForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ForgotPasswordFormData>();

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      const res = await axiosInstance.post('/auth/forgot-password', data);
      toast.success(res.data.message, {
        position: "top-right",
        autoClose: 3000,
      });
      reset(); // Reset form sau khi gửi thành công
    } catch (error: any) {
      const message = error.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại sau';
      toast.error(message, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
};