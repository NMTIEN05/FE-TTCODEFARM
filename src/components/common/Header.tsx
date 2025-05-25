import { SearchOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
import React from 'react'
import { useNavigate } from 'react-router-dom';

type Props = {}


const Header = (props: Props) => {
   const navigate = useNavigate();

  const handleClick = () => {
    navigate('/auth/login');
  };
    const handleCart = () => {
    navigate('/cart');
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
        <li><a href="#" className="hover:text-blue-600">Về chúng tôi</a></li>
        <li><a href="#" className="hover:text-blue-600">Liên hệ</a></li>
      </ul>
    </nav>

    {/* Search Bar */}
    <div className="hidden md:flex items-center space-x-2 bg-gray-100 px-2 py-1 rounded-md">
      <input
        type="text"
        placeholder="Tìm kiếm sản phẩm..."
        className="bg-transparent focus:outline-none text-sm px-2 py-1 w-40"
      />
      <button className="text-gray-600 hover:text-blue-600">
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M15.5 14h-.79l-.28-.27A6.471..." />
        </svg>
      </button>
    </div>

    {/* Header Icons */}
    <div className="flex items-center space-x-4 ">
      
  
<button  onClick={handleClick} className=  "text-gray-700 hover:text-blue-600 " title="Tài khoản">
  <UserOutlined className="text-xl mr-5" />
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