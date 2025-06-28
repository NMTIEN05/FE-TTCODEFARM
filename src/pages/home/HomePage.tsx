import React from 'react'
import { Book, Star, TrendingUp, Award, Users, Truck, Shield, HeadphonesIcon, ArrowRight, BookOpen, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import FlasSale from './components/FlasSale'
import Product from './components/Product'
import Nav from './components/Nav'
import Blog from './components/Blog'
import ServiceInfo from './components/ServiceInfo'

type Props = {}

const HomePage = (props: Props) => {
  const navigate = useNavigate()

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <div className="w-full h-full bg-gradient-to-br from-blue-100/20 to-purple-100/20"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full text-sm font-medium text-blue-700">
                <Sparkles className="w-4 h-4" />
                <span>Kho tàng tri thức bất tận</span>
              </div>
              
              <div>
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Khám phá
                  </span>
                  <br />
                  <span className="text-gray-900">thế giới sách</span>
                  <br />
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    tuyệt vời
                  </span>
                </h1>
                <p className="text-xl text-gray-600 mt-6 leading-relaxed">
                  Hàng nghìn đầu sách chất lượng cao, từ văn học kinh điển đến kiến thức hiện đại. 
                  Mở ra cánh cửa tri thức với BookStore.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => navigate('/allproduct')}
                  className="group flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <BookOpen className="w-5 h-5" />
                  Khám phá ngay
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => navigate('#')}
                  className="flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:border-blue-500 hover:text-blue-600 transition-all duration-300"
                >
                  <TrendingUp className="w-5 h-5" />
                  Sách bán chạy
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">10K+</div>
                  <div className="text-sm text-gray-600 mt-1">Đầu sách</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">50K+</div>
                  <div className="text-sm text-gray-600 mt-1">Khách hàng</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-600">99%</div>
                  <div className="text-sm text-gray-600 mt-1">Hài lòng</div>
                </div>
              </div>
            </div>

            {/* Right Content - Hero Image */}
            <div className="relative">
              <div className="relative z-10">
                <div className="bg-white rounded-3xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <div className="h-32 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                        <Book className="w-12 h-12 text-blue-600" />
                      </div>
                      <div className="h-24 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center">
                        <BookOpen className="w-8 h-8 text-purple-600" />
                      </div>
                    </div>
                    <div className="space-y-4 mt-8">
                      <div className="h-24 bg-gradient-to-br from-pink-100 to-pink-200 rounded-lg flex items-center justify-center">
                        <Star className="w-8 h-8 text-pink-600" />
                      </div>
                      <div className="h-32 bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg flex items-center justify-center">
                        <Award className="w-12 h-12 text-amber-600" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-blue-500 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-purple-500 rounded-full opacity-20 animate-pulse delay-1000"></div>
              <div className="absolute top-1/2 -right-8 w-12 h-12 bg-pink-500 rounded-full opacity-20 animate-bounce"></div>
            </div>
          </div>
        </div>
      </section>



      {/* Navigation Categories */}
      <Nav />
      
      {/* Flash Sale */}
      <FlasSale />
      
      {/* Products */}
      <Product />
      
      {/* Service Info */}
      <ServiceInfo />
      
      {/* Blog/News */}
      <Blog />
    </>
  )
}

export default HomePage