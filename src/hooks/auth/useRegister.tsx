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
      toast.success('Đăng ký thành công!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Đợi toast tắt mới chuyển hướng
      setTimeout(() => {
        navigate('/auth/login');
      }, 3000);

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
