// src/hooks/useRegisterForm.ts
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { RegisterFormData } from '../../types/auth';

export const useLoginForm = () => {
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const onSubmit = async (data: any) => {
    try {
      const res = await axios.post("http://localhost:8888/auth/login", data);
      alert("Đăng Nhập thành công");
      localStorage.setItem('token', res.data.token);
      nav("/auth/login");
    } catch (error) {
      console.log(error);
      alert("Đăng Nhập thất bại");
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit
  };
};
