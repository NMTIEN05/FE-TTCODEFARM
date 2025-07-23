import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const useLogout = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    toast.success("Đăng xuất thành công!", {
      position: "top-right",
      autoClose: 2000,
    });

    navigate('/auth/login');
  };

  return { logout };
};