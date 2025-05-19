// src/hooks/useRegisterForm.ts
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { RegisterFormData } from '../../types/auth';

export const useRegisterForm = () => {
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const onSubmit = async (data: any) => {
    try {
      await axios.post("http://localhost:8888/auth/register", data);
      alert("Đăng ký thành công");
      nav("/login");
    } catch (error) {
      console.log(error);
      

      alert("Đăng ký thất bại");
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit
  };
};
