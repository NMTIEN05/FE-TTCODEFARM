import { ShoppingCartOutlined, UserOutlined, HeartOutlined, LogoutOutlined } from '@ant-design/icons'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { SearchBar } from './SearchBar';
import { WishlistBadge } from './WishlistBadge';
import { useLogout } from '../../hooks/auth/useLogout';

type Props = {}


const Header = (props: Props) => {
  const navigate = useNavigate();
  const { logout } = useLogout();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleClick = () => {
    navigate('/auth/login');
  };
    const handleCart = () => {
    navigate('/cart');
  };
  const handleWishlist = () => {
    navigate('/wishlist');
  };
  return (
   <header className="bg-white shadow">
  <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
    
    {/* Logo */}
    <a href="#" className="flex items-center space-x-2 text-2xl font-bold text-gray-800">
      <div className="w-8 h-8 bg-black text-white flex items-center justify-center rounded-full font-semibold">S</div>
      <span>SHOP</span>
    </a>

    {/* Navigation Menu */}
    <nav className="hidden md:block">
      <ul className="flex space-x-6 text-gray-700 font-medium">
        <li><a href="/" className="hover:text-blue-600">Trang chủ</a></li>
        <li><a href="/allproduct" className="hover:text-blue-600">Sản phẩm</a></li>
        <li><a href="/wishlist" className="hover:text-blue-600">Yêu thích</a></li>
        <li><a href="/contant" className="hover:text-blue-600">Liên hệ</a></li>
      </ul>
    </nav>

    {/* Search Bar */}
    <SearchBar />

    {/* Header Icons */}
    <div className="flex items-center space-x-4 ">
      
  
{!isLoggedIn ? (
  <button onClick={handleClick} className="text-gray-700 hover:text-blue-600" title="Đăng nhập">
    <UserOutlined className="text-xl mr-5" />
  </button>
) : (
  <button onClick={logout} className="text-gray-700 hover:text-red-600" title="Đăng xuất">
    <LogoutOutlined className="text-xl mr-5" />
  </button>
)}

<button onClick={handleWishlist} className="relative text-gray-700 hover:text-red-600 mr-5" title="Yêu thích">
  <HeartOutlined className="text-xl" />
  <WishlistBadge />
</button>

<button onClick={handleCart} className="relative text-gray-700 hover:text-blue-600" title="Giỏ hàng">
      <ShoppingCartOutlined className="text-2xl" />
      
      {/* Badge */}
      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
        3
      </span>
    </button>



    </div>
  </div>
</header>

  )
}

export default Header