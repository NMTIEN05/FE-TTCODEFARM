import React from 'react'
import { Truck, HeadphonesIcon, Shield, Award, Clock, RefreshCw } from 'lucide-react'

const ServiceInfo = () => {
  const services = [
    {
      icon: Truck,
      title: 'Giao hàng miễn phí',
      description: 'Miễn phí vận chuyển cho đơn hàng từ 200.000đ',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      icon: HeadphonesIcon,
      title: 'Hỗ trợ 24/7',
      description: 'Đội ngũ tư vấn nhiệt tình, chuyên nghiệp',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      icon: Shield,
      title: 'Bảo mật thanh toán',
      description: 'Thông tin thanh toán được bảo mật tuyệt đối',
      color: 'from-purple-500 to-violet-500',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    },
    {
      icon: Award,
      title: 'Chất lượng đảm bảo',
      description: 'Sách chính hãng, chất lượng cao',
      color: 'from-amber-500 to-orange-500',
      bgColor: 'bg-amber-50',
      iconColor: 'text-amber-600'
    },
    {
      icon: Clock,
      title: 'Giao hàng nhanh chóng',
      description: 'Giao hàng trong vòng 1-3 ngày làm việc',
      color: 'from-pink-500 to-rose-500',
      bgColor: 'bg-pink-50',
      iconColor: 'text-pink-600'
    },
    {
      icon: RefreshCw,
      title: 'Đổi trả dễ dàng',
      description: 'Chính sách đổi trả linh hoạt trong 7 ngày',
      color: 'from-indigo-500 to-blue-500',
      bgColor: 'bg-indigo-50',
      iconColor: 'text-indigo-600'
    }
  ]

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full text-sm font-medium text-blue-700 mb-4">
            <Award className="w-4 h-4" />
            <span>Cam kết chất lượng</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Tại sao chọn BookStore?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Chúng tôi cam kết mang đến dịch vụ tốt nhất và trải nghiệm mua sắm tuyệt vời
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <div 
                key={index}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`}></div>
                
                {/* Icon */}
                <div className={`relative w-16 h-16 ${service.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className={`w-8 h-8 ${service.iconColor}`} />
                </div>
                
                {/* Content */}
                <div className="relative">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                    {service.description}
                  </p>
                </div>
                
                {/* Hover Effect */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${service.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-2xl"></div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-4 bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex -space-x-2">
              {[1,2,3,4].map((i) => (
                <div key={i} className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full border-2 border-white flex items-center justify-center text-white font-semibold text-sm">
                  {i === 1 && '5'}
                  {i === 2 && '★'}
                  {i === 3 && '+'}
                  {i === 4 && 'K'}
                </div>
              ))}
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-900">Hơn 50,000+ khách hàng hài lòng</p>
              <p className="text-sm text-gray-600">Đánh giá trung bình 4.8/5 sao</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServiceInfo;
