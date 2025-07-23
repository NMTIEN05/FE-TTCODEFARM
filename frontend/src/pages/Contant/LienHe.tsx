import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, CheckCircle, AlertCircle, Facebook, Instagram, Youtube } from 'lucide-react';
import axios from 'axios';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    type: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.post('http://localhost:8888/api/contact', formData);
      
      if (response.data.success) {
        setNotification({
          show: true,
          type: 'success',
          message: 'Tin nhắn của bạn đã được gửi thành công!'
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      }
    } catch (error) {
      console.error('Lỗi khi gửi tin nhắn:', error);
      setNotification({
        show: true,
        type: 'error',
        message: error.response?.data?.message || 'Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại sau.'
      });
    } finally {
      setLoading(false);
      
      // Tự động ẩn thông báo sau 5 giây
      setTimeout(() => {
        setNotification(prev => ({ ...prev, show: false }));
      }, 5000);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">Liên Hệ Với Chúng Tôi</h1>
            <p className="mt-6 text-xl max-w-3xl mx-auto">
              Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy liên hệ với chúng tôi bằng cách điền vào biểu mẫu bên dưới.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="max-w-7xl mx-auto px-4 py-12 -mt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center transform transition duration-500 hover:scale-105">
            <div className="bg-blue-100 p-3 rounded-full mb-4">
              <Phone className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Điện Thoại</h3>
            <p className="text-gray-600">028 1234 5678</p>
            <p className="text-gray-600">0901 234 567</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center transform transition duration-500 hover:scale-105">
            <div className="bg-blue-100 p-3 rounded-full mb-4">
              <Mail className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Email</h3>
            <p className="text-gray-600">info@bookstore.vn</p>
            <p className="text-gray-600">support@bookstore.vn</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center transform transition duration-500 hover:scale-105">
            <div className="bg-blue-100 p-3 rounded-full mb-4">
              <MapPin className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Địa Chỉ</h3>
            <p className="text-gray-600">123 Đường Lê Lợi, Quận 1</p>
            <p className="text-gray-600">TP. Hồ Chí Minh, Việt Nam</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Gửi Tin Nhắn</h2>
              
              {notification.show && (
                <div className={`mb-6 p-4 rounded-lg ${notification.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                  <div className="flex items-center">
                    {notification.type === 'success' ? (
                      <CheckCircle className="w-5 h-5 mr-2" />
                    ) : (
                      <AlertCircle className="w-5 h-5 mr-2" />
                    )}
                    <p>{notification.message}</p>
                  </div>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Họ và tên
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      placeholder="Nhập họ tên"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      placeholder="email@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Số điện thoại
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      placeholder="0123 456 789"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Chủ đề
                    </label>
                    <select 
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    >
                      <option value="">Chọn chủ đề</option>
                      <option value="Tư vấn sách">Tư vấn sách</option>
                      <option value="Hỗ trợ đặt hàng">Hỗ trợ đặt hàng</option>
                      <option value="Phản hồi">Phản hồi</option>
                      <option value="Hợp tác">Hợp tác</option>
                      <option value="Khác">Khác</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nội dung
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="Nhập nội dung tin nhắn..."
                    required
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-800 transition-all shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2 inline-block"></div>
                      Đang gửi...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2 inline-block" />
                      Gửi tin nhắn
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Store Info */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Thông Tin Cửa Hàng</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <Clock className="w-5 h-5 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-900">Giờ mở cửa</h3>
                    <p className="text-gray-600 mt-1">
                      Thứ 2 - Thứ 6: 8:00 - 20:00<br />
                      Thứ 7 - Chủ nhật: 9:00 - 18:00
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <h3 className="font-medium text-gray-900 mb-3">Kết nối với chúng tôi</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="bg-blue-100 p-2 rounded-full text-blue-600 hover:bg-blue-200 transition">
                      <Facebook className="w-5 h-5" />
                    </a>
                    <a href="#" className="bg-blue-100 p-2 rounded-full text-blue-600 hover:bg-blue-200 transition">
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a href="#" className="bg-blue-100 p-2 rounded-full text-blue-600 hover:bg-blue-200 transition">
                      <Youtube className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Câu Hỏi Thường Gặp</h2>
              
              <div className="space-y-5">
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="font-medium text-gray-900 mb-2">Làm sao để đặt hàng online?</h3>
                  <p className="text-gray-600">Bạn có thể duyệt sách, thêm vào giỏ hàng và thanh toán trực tuyến. Chúng tôi sẽ giao hàng tận nơi.</p>
                </div>
                
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="font-medium text-gray-900 mb-2">Có hỗ trợ đổi trả không?</h3>
                  <p className="text-gray-600">Có, chúng tôi hỗ trợ đổi trả trong vòng 7 ngày nếu sách còn nguyên vẹn.</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Thời gian giao hàng bao lâu?</h3>
                  <p className="text-gray-600">Trong nội thành TP.HCM: 1-2 ngày. Các tỉnh khác: 3-5 ngày làm việc.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 bg-gray-100">
            <h2 className="text-2xl font-bold text-gray-900">Vị Trí Cửa Hàng</h2>
            <p className="text-gray-600 mt-2">Ghé thăm cửa hàng của chúng tôi tại trung tâm thành phố</p>
          </div>
          <div className="h-96 w-full">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4241674197667!2d106.69901937469967!3d10.777638089376153!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4670702e31%3A0xa5777fb3a5d0cc72!2zMTIzIEzDqiBM4bujaSwgQuG6v24gTmdow6ksIFF14bqtbiAxLCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1689913546208!5m2!1svi!2s" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Quick Contact Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold">Cần hỗ trợ ngay?</h2>
              <p className="mt-2">Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng giúp đỡ bạn</p>
            </div>
            <div className="flex space-x-4">
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Gọi ngay
              </button>
              <button className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:bg-opacity-10 transition-colors">
                Chat trực tuyến
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;