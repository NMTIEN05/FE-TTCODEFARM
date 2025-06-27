import { Book, ShoppingCart, Heart, User, LogOut, Search, Menu, X, BookOpen, Star, Award } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SearchBar } from './SearchBar'
import { useWishlist } from '../../providers/WishlistProvider'
import { useLogout } from '../../hooks/auth/useLogout'
import { useCart } from '../../providers/CartProvider'
import NotificationBell from './NotificationBell'

type Props = {}

const Header = (props: Props) => {
  const navigate = useNavigate()
  const { logout } = useLogout()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const { cartCount, totalPrice } = useCart()
  const { wishlistCount } = useWishlist()
  const isLoggedIn = !!localStorage.getItem('token')

  const handleLogin = () => navigate('/auth/login')
  const handleCart = () => navigate('/cart')
  const handleWishlist = () => navigate('/wishlist')
  const handleHome = () => navigate('/')

  return (
    <>
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Award className="w-4 h-4" />
              <span>Miễn phí vận chuyển đơn hàng từ 200.000đ</span>
            </div>
            <div className="hidden md:flex items-center gap-1">
              <Star className="w-4 h-4" />
              <span>Cam kết sách chính hãng 100%</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span>Hotline: 1900-1234</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          {/* Top Row */}
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <div onClick={handleHome} className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <BookOpen className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full flex items-center justify-center">
                  <Star className="w-2 h-2 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  SBook
                </h1>
                <p className="text-xs text-gray-500 font-medium">Tri thức là sức mạnh</p>
              </div>
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden md:block flex-1 max-w-2xl mx-8">
              <SearchBar />
            </div>

            {/* User Actions */}
            <div className="flex items-center gap-2">
              {isLoggedIn && <NotificationBell />}
              
              {/* Wishlist */}
              <button 
                onClick={handleWishlist} 
                className="relative p-3 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 group"
                title="Danh sách yêu thích"
              >
                <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium animate-pulse">
                    {wishlistCount > 99 ? '99+' : wishlistCount}
                  </span>
                )}
              </button>

              {/* Cart */}
              <button 
                onClick={handleCart} 
                className="relative p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 group"
                title="Giỏ hàng"
              >
                <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium animate-pulse">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </button>

              {/* User Account */}
              {!isLoggedIn ? (
                <button 
                  onClick={handleLogin} 
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 font-medium"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Đăng nhập</span>
                </button>
              ) : (
                <button 
                  onClick={logout} 
                  className="p-3 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200"
                  title="Đăng xuất"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              )}

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:block border-t border-gray-100 py-4">
            <ul className="flex items-center gap-8">
              <li>
                <a href="/" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium transition-colors py-2 px-3 rounded-lg hover:bg-blue-50">
                  <BookOpen className="w-4 h-4" />
                  Trang chủ
                </a>
              </li>
              <li>
                <a href="/allproduct" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium transition-colors py-2 px-3 rounded-lg hover:bg-blue-50">
                  <Book className="w-4 h-4" />
                  Tất cả sách
                </a>
              </li>
              <li>
                <a href="/blog" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium transition-colors py-2 px-3 rounded-lg hover:bg-blue-50">
                  <BookOpen className="w-4 h-4" />
                  Bài viết
                </a>
              </li>
              <li>
                <a href="/orders" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium transition-colors py-2 px-3 rounded-lg hover:bg-blue-50">
                  <ShoppingCart className="w-4 h-4" />
                  Đơn hàng
                </a>
              </li>
              <li>
                <a href="/contant" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium transition-colors py-2 px-3 rounded-lg hover:bg-blue-50">
                  Liên hệ
                </a>
              </li>
            </ul>
          </nav>

          {/* Search Bar - Mobile */}
          <div className="md:hidden py-3 border-t border-gray-100">
            <div className="relative">
              <SearchBar />
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
            <nav className="px-4 py-4">
              <ul className="space-y-2">
                <li>
                  <a href="/" className="flex items-center gap-3 text-gray-700 hover:text-blue-600 font-medium py-3 px-4 rounded-lg hover:bg-blue-50 transition-colors">
                    <BookOpen className="w-5 h-5" />
                    Trang chủ
                  </a>
                </li>
                <li>
                  <a href="/allproduct" className="flex items-center gap-3 text-gray-700 hover:text-blue-600 font-medium py-3 px-4 rounded-lg hover:bg-blue-50 transition-colors">
                    <Book className="w-5 h-5" />
                    Tất cả sách
                  </a>
                </li>
                <li>
                  <a href="/blog" className="flex items-center gap-3 text-gray-700 hover:text-blue-600 font-medium py-3 px-4 rounded-lg hover:bg-blue-50 transition-colors">
                    <BookOpen className="w-5 h-5" />
                    Bài viết
                  </a>
                </li>
                <li>
                  <a href="/orders" className="flex items-center gap-3 text-gray-700 hover:text-blue-600 font-medium py-3 px-4 rounded-lg hover:bg-blue-50 transition-colors">
                    <ShoppingCart className="w-5 h-5" />
                    Đơn hàng
                  </a>
                </li>
                <li>
                  <a href="/contant" className="flex items-center gap-3 text-gray-700 hover:text-blue-600 font-medium py-3 px-4 rounded-lg hover:bg-blue-50 transition-colors">
                    Liên hệ
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </header>
    </>
  )
}

export default Header