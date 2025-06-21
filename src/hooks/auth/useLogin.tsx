import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LoginFormData } from '../../types/auth';
import axiosInstance from '../../utils/axiosInstant';

export const useLoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await axios.post('http://localhost:8888/auth/login', data);

      toast.success("Đăng nhập thành công!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      const result = res.data;

      // Lưu token và isAdmin vào localStorage
      localStorage.setItem('token', result.token);
      localStorage.setItem('isAdmin', JSON.stringify(result.isAdmin)); // lưu dưới dạng string

      // Điều hướng theo isAdmin
      if (result.isAdmin) {
        window.location.href=('http://localhost:5174/dashboard');

      } else {
        navigate('/');
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 'Email hoặc mật khẩu không đúng';
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
