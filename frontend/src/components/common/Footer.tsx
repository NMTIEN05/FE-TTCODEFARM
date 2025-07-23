import { BookOpen, Mail, Phone, MapPin, Facebook, Instagram, Youtube, Twitter, Star, Award, Truck, Shield } from 'lucide-react'

type Props = {}

const Footer = (props: Props) => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Đăng ký nhận tin tức mới nhất</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Nhận thông tin về sách mới, khuyến mãi đặc biệt và các sự kiện văn hóa thú vị
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Nhập email của bạn" 
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
              Đăng ký
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    BookStore
                  </h3>
                  <p className="text-sm text-gray-400">Tri thức là sức mạnh</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Chúng tôi là nhà sách trực tuyến hàng đầu, cung cấp hàng ngàn đầu sách chất lượng cao với giá cả hợp lý.
              </p>
              
              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span>Bảo mật thanh toán</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Truck className="w-4 h-4 text-blue-400" />
                  <span>Giao hàng nhanh</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Award className="w-4 h-4 text-yellow-400" />
                  <span>Chất lượng đảm bảo</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Star className="w-4 h-4 text-orange-400" />
                  <span>Uy tín 5 sao</span>
                </div>
              </div>

              {/* Social Media */}
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-pink-600 hover:bg-pink-700 rounded-lg flex items-center justify-center transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-red-600 hover:bg-red-700 rounded-lg flex items-center justify-center transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-sky-500 hover:bg-sky-600 rounded-lg flex items-center justify-center transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-white">Liên kết nhanh</h4>
              <ul className="space-y-3">
                <li><a href="/" className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 transform duration-200 inline-block">Trang chủ</a></li>
                <li><a href="/allproduct" className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 transform duration-200 inline-block">Tất cả sách</a></li>
                <li><a href="/orders" className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 transform duration-200 inline-block">Đơn hàng</a></li>
                <li><a href="/wishlist" className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 transform duration-200 inline-block">Yêu thích</a></li>
                <li><a href="/contant" className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 transform duration-200 inline-block">Liên hệ</a></li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-white">Danh mục sách</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 transform duration-200 inline-block">Văn học</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 transform duration-200 inline-block">Kinh tế</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 transform duration-200 inline-block">Kỹ năng sống</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 transform duration-200 inline-block">Thiếu nhi</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 transform duration-200 inline-block">Giáo khoa</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-white">Liên hệ</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-300 leading-relaxed">
                      123 Đường Sách, Quận 1<br />
                      TP. Hồ Chí Minh, Việt Nam
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-gray-300">Hotline: 1900-1234</p>
                    <p className="text-sm text-gray-400">8:00 - 22:00 (Tất cả các ngày)</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-purple-400" />
                  <div>
                    <p className="text-gray-300">support@bookstore.vn</p>
                    <p className="text-sm text-gray-400">Hỗ trợ 24/7</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              © 2024 BookStore. Tất cả quyền được bảo lưu.
            </div>
            <div className="flex gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Chính sách bảo mật</a>
              <a href="#" className="hover:text-white transition-colors">Điều khoản sử dụng</a>
              <a href="#" className="hover:text-white transition-colors">Chính sách đổi trả</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer