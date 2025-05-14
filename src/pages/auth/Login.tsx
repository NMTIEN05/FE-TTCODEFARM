import React from 'react'
import '../../css/auth.css';
import { Link } from 'react-router-dom';
const Login = () => {
  return (
    <div className="container">
  <div className="left-side">
    <div className="decoration"></div>
    <h1>ShopPhuKien</h1>
    <p>
      Chào mừng bạn đến với cửa hàng phụ kiện của chúng tôi. Đăng nhập hoặc đăng ký để trải nghiệm những sản phẩm chất lượng cao với mức giá hợp lý nhất!
    </p>
  </div>
  <div className="right-side">
    <div className="tabs">
      <Link  className="tab  active" to="/login" >Đăng Nhập</Link>
          <Link className="tab " to="/register">Đăng Ký</Link>
      
    </div>
    <div className="form-container">
      <form id="login-form" className="active">
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Nhập email của bạn" required />
        </div>
        <div className="input-group">
          <label htmlFor="password">Mật khẩu</label>
          <input type="password" id="password" placeholder="Nhập mật khẩu" required />
        </div>
        <div className="forgot-password">
          <a href="#">Quên mật khẩu?</a>
        </div>
        <button type="submit">Đăng Nhập</button>
      </form>
    </div>
    <div className="social-login">
      <p>Hoặc đăng nhập với</p>
      <div className="social-icons">
        <div className="social-icon">
          {/* SVG Google */}
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* ...path data... */}
          </svg>
        </div>
        <div className="social-icon">
          {/* SVG Facebook */}
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* ...path data... */}
          </svg>
        </div>
        <div className="social-icon">
          {/* SVG Twitter */}
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* ...path data... */}
          </svg>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}

export default Login
