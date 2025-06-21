import React from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 text-center">Liên hệ</h1>
          <p className="text-gray-600 text-center mt-2">Chúng tôi sẵn sàng hỗ trợ bạn</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Form */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Gửi tin nhắn</h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Họ và tên
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Nhập họ tên"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="email@example.com"
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
                      className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0123 456 789"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Chủ đề
                    </label>
                    <select className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>Chọn chủ đề</option>
                      <option>Tư vấn sách</option>
                      <option>Hỗ trợ đặt hàng</option>
                      <option>Phản hồi</option>
                      <option>Hợp tác</option>
                      <option>Khác</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nội dung
                  </label>
                  <textarea
                    rows={5}
                    className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Nhập nội dung tin nhắn..."
                  ></textarea>
                </div>

                <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-md font-medium hover:bg-blue-700 transition-colors flex items-center justify-center">
                  <Send className="w-4 h-4 mr-2" />
                  Gửi tin nhắn
                </button>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            
            {/* Store Info */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Thông tin cửa hàng</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-gray-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-900">Địa chỉ</h3>
                    <p className="text-gray-600 mt-1">
                      123 Đường Lê Lợi, Quận 1<br />
                      TP. Hồ Chí Minh, Việt Nam
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="w-5 h-5 text-gray-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-900">Điện thoại</h3>
                    <p className="text-gray-600 mt-1">
                      028 1234 5678<br />
                      0901 234 567
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="w-5 h-5 text-gray-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-900">Email</h3>
                    <p className="text-gray-600 mt-1">
                      info@bookstore.vn<br />
                      support@bookstore.vn
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="w-5 h-5 text-gray-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-gray-900">Giờ mở cửa</h3>
                    <p className="text-gray-600 mt-1">
                      Thứ 2 - Thứ 6: 8:00 - 20:00<br />
                      Thứ 7 - Chủ nhật: 9:00 - 18:00
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Câu hỏi thường gặp</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Làm sao để đặt hàng online?</h3>
                  <p className="text-gray-600 text-sm">Bạn có thể duyệt sách, thêm vào giỏ hàng và thanh toán trực tuyến. Chúng tôi sẽ giao hàng tận nơi.</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Có hỗ trợ đổi trả không?</h3>
                  <p className="text-gray-600 text-sm">Có, chúng tôi hỗ trợ đổi trả trong vòng 7 ngày nếu sách còn nguyên vẹn.</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Thời gian giao hàng bao lâu?</h3>
                  <p className="text-gray-600 text-sm">Trong nội thành TP.HCM: 1-2 ngày. Các tỉnh khác: 3-5 ngày làm việc.</p>
                </div>
              </div>
            </div>

            {/* Quick Contact */}
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <MessageCircle className="w-6 h-6 text-blue-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">Hỗ trợ nhanh</h3>
              </div>
              <p className="text-gray-600 mb-4">Cần hỗ trợ ngay? Liên hệ hotline hoặc chat trực tuyến.</p>
              <div className="flex space-x-3">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
                  Gọi ngay
                </button>
                <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-50 transition-colors">
                  Chat online
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;