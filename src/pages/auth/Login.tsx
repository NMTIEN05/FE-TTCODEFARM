import React from 'react';
import '../../css/auth.css';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import { useLoginForm } from '../../hooks/auth/useLogin';

const Login = () => {
  const { register, handleSubmit, errors, onSubmit } = useLoginForm();

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
          <Link className="tab active" to="/login">Đăng Nhập</Link>
          <Link className="tab " to="/register">Đăng Ký</Link>
        </div>

        <div className="form-container">
          <form id="register-form" className="active" onSubmit={handleSubmit(onSubmit)}>
      

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
              <label htmlFor="password">Mật khẩu</label>
              <input
                type="password"
                id="password"
                placeholder="Tạo mật khẩu"
                {...register("password", { required: true })}
              />
              {errors.password && <p className="error">Mật khẩu không được để trống</p>}
            </div>
        
          

            <button type="submit">Đăng Nhập</button>
          </form>
        </div>

    
      </div>
    </div>
  );
};

export default Login;
