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
      const res = await axiosInstance.post('/auth/login', data);

      const result = res.data;

      if (result.token) {
        // Lưu thông tin user vào localStorage
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify({
          _id: result._id,
          email: result.email,
          fullname: result.fullname,
          isAdmin: result.isAdmin
        }));

        toast.success("Đăng nhập thành công!", {
          position: "top-right",
          autoClose: 2000,
        });

        // Điều hướng theo isAdmin
        setTimeout(() => {
          if (result.isAdmin) {
            window.location.href = `http://localhost:5173/?token=${result.token}&user=${encodeURIComponent(JSON.stringify({
              _id: result._id,
              email: result.email,
              fullname: result.fullname,
              isAdmin: result.isAdmin
            }))}`;
          } else {
            navigate('/');
          }
        }, 1000);
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
