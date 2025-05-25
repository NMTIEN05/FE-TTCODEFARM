import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { RegisterFormData } from '../../types/auth';

export const useLoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      const res = await axios.post('http://localhost:8888/auth/login', data);
                  toast.success("Đăng nhập thành công!", {
      position: "top-right",
 // hiện bên phải trên cùng
      autoClose: 3000,  // tự tắt sau 3s
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
        const result = res.data;


        

        // Lưu token và role
        localStorage.setItem('token', result.token);
        localStorage.setItem('role', result.role);

        // Điều hướng theo vai trò
        if (result.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/');
        }
      } catch (error: any) {
        const message =
          error.response?.data?.message || error.message || 'Đăng nhập thất bại';
        alert(message);
      }

  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
};
