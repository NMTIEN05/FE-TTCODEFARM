import { ShoppingCartOutlined, UserOutlined, HeartOutlined, LogoutOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom';
import { SearchBar } from './SearchBar';
import { useWishlist } from '../../providers/WishlistProvider';
import { useLogout } from '../../hooks/auth/useLogout';
import { useCart } from '../../providers/CartProvider';

type Props = {}


const Header = (props: Props) => {
  const navigate = useNavigate();
  const { logout } = useLogout();
  

  const { cartCount, totalPrice } = useCart();
  const { wishlistCount } = useWishlist();
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
  {wishlistCount > 0 && (
    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
      {wishlistCount}
    </span>
  )}
</button>

<button onClick={handleCart} className="relative flex items-center gap-2 text-gray-700 hover:text-blue-600 p-2 rounded-lg hover:bg-gray-100 transition-colors" title="Giỏ hàng">
      <div className="relative">
        <ShoppingCartOutlined className="text-2xl" />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
            {cartCount > 99 ? '99+' : cartCount}
          </span>
        )}
      </div>
    </button>



    </div>
  </div>
</header>

  )
}

export default Header