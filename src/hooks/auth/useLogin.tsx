import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
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
      const result = res.data;

      // ✅ Kiểm tra dữ liệu trả về
      if (!result?.token || typeof result.isAdmin === 'undefined') {
        throw new Error("Dữ liệu phản hồi không hợp lệ từ server.");
      }

      // ✅ Hiển thị thông báo
      toast.success("Đăng nhập thành công!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // ✅ Lưu token, role
      localStorage.setItem('token', result.token);
      localStorage.setItem('isAdmin', JSON.stringify(result.isAdmin));

      // ✅ Chỉ lưu user nếu tồn tại
      if (result.user) {
        localStorage.setItem('user', JSON.stringify(result.user));
      } else {
        console.warn("⚠️ Không có 'user' trong phản hồi từ API. Không lưu vào localStorage.");
      }

      // ✅ Điều hướng
      if (result.isAdmin) {
        window.location.href = 'http://localhost:5174/dashboard';
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
