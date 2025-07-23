import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RegisterFormData } from '../../types/auth';

export const useRegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const res = await axios.post('http://localhost:8888/auth/register', data);
      toast.success(res.data.message || 'Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Chuyển đến trang nhập OTP
      setTimeout(() => {
        navigate('/auth/verify-otp', { state: { email: data.email } });
      }, 2000);

    } catch (error: any) {
      const message =
        error.response?.data?.message || error.message || 'Đăng ký thất bại';
      toast.error(message, {
        position: 'top-right',
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
