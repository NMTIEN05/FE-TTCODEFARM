import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ICategory } from '../../../types/Category'
import { Book, ArrowRight, Sparkles, TrendingUp } from 'lucide-react'
import axios from 'axios'
import { CategoryCard } from './CategoryCard'

const Nav = () => {
  const [Category, setCategories] = useState<ICategory[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('http://localhost:8888/api/categories')
        const resData = response.data.data
        if (Array.isArray(resData.data)) {
          setCategories(resData.data)
        } else {
          console.warn('Dữ liệu trả về không hợp lệ:', resData)
          setCategories([])
        }
      } catch (error) {
        console.error('Lỗi khi gọi API danh mục:', error)
        setCategories([])
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  if (loading) {
    return (
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải danh mục...</p>
        </div>
      </div>
    )
  }

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full text-sm font-medium text-blue-700 mb-4">
            <Book className="w-4 h-4" />
            <span>Khám phá theo danh mục</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Tìm sách theo sở thích</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Khám phá hàng nghìn đầu sách được phân loại chi tiết theo từng chủ đề
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <Book className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Danh mục sách</h3>
                    <p className="text-blue-100 text-sm">{Category.length} danh mục</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {Category.map((item, index) => (
                    <div key={item._id} className="transform transition-all duration-200 hover:scale-105">
                      <CategoryCard category={item} />
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <Link
                    to="/allproduct"
                    className="group flex items-center justify-center gap-2 w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-medium"
                  >
                    <span>Xem tất cả sách</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Banner */}
          <div className="lg:col-span-2">
            <div className="relative h-full min-h-[400px] rounded-2xl overflow-hidden shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Thế giới sách"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <div className="mb-4">
                  <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium mb-3">
                    <Sparkles className="w-4 h-4" />
                    <span>Đặc biệt</span>
                  </div>
                  <h3 className="text-3xl font-bold mb-2">Khám phá tri thức</h3>
                  <p className="text-white/90 text-lg mb-4">
                    Hành trình khám phá kiến thức bắt đầu từ những trang sách đầu tiên
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <Link
                    to="/category/bestseller"
                    className="group flex items-center gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 px-4 py-2 rounded-lg transition-all duration-300"
                  >
                    <TrendingUp className="w-4 h-4" />
                    <span className="font-medium">Sách bán chạy</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to="/category/new"
                    className="group flex items-center gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 px-4 py-2 rounded-lg transition-all duration-300"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span className="font-medium">Sách mới</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Nav;
