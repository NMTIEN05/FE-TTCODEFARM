import React from 'react';
import '../../css/auth.css';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const Register = () => {
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    console.log(data);
    
    try {
      await axios.post("http://localhost:8888/auth/register", data);
      alert("Đăng ký thành công");
      nav("/auth/login");
    } catch (error) {
      console.log(error);
      alert("Đăng ký thất bại");
    }
  };

  return (
    <div className="container">
      <div className="left-side">
        <div className="decoration"></div>
        <h1>BOOKSTORE</h1>
        <p>
          Chào mừng bạn đến với cửa hàng Sách của chúng tôi. Đăng nhập hoặc đăng ký để trải nghiệm những sản phẩm chất lượng cao với mức giá hợp lý nhất!
        </p>
      </div>

      <div className="right-side">
        <div className="tabs">
          <Link className="tab" to="/login">Đăng Nhập</Link>
          <Link className="tab active" to="/register">Đăng Ký</Link>
        </div>

        <div className="form-container">
          <form id="register-form" className="active" onSubmit={handleSubmit(onSubmit)}>
            <div className="input-group">
              <label htmlFor="fullname">Họ và tên</label>
              <input
                type="text"
                id="fullname"
                placeholder="Nhập họ và tên"
                {...register("fullname", { required: true })}
              />
              {errors.fullname && <p className="error">Họ và tên không được để trống</p>}
            </div>

            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Nhập email của bạn"
                {...register("email", { required: true })}
              />
              {errors.email && <p className="error">Email không được để trống</p>}
            </div>

            <div className="input-group">
              <label htmlFor="phone">Số điện thoại</label>
              <input
                type="tel"
                id="phone"
                placeholder="Nhập số điện thoại"
                {...register("phone", { required: true })}
              />
              {errors.phone && <p className="error">Số điện thoại không được để trống</p>}
            </div>

            <div className="input-group">
              <label htmlFor="password">Mật khẩu</label>
              <input
                type="password"
                id="password"
                placeholder="Tạo mật khẩu"
                {...register("password", { required: true })}
              />
              {errors.password && <p className="error">Mật khẩu không được để trống</p>}
            </div>
        
          

            <button type="submit">Đăng Ký</button>
          </form>
        </div>

    
      </div>
    </div>
  );
};

export default Register;
