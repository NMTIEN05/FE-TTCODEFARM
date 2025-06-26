import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Star, BookOpen, TrendingUp, ArrowRight, Sparkles } from 'lucide-react'
import { Ibook } from '../../../types/Book'
import axios from 'axios'
import WishlistButton from '../../../components/wishlist/WishlistButton'
import { CartButton } from '../../../components/cart'
import { useFlashSale } from '../../../hooks/useFlashSale'

type Props = {}

const Product = (props: Props) => {
  const [book, setBook] = useState<Ibook[]>([])
  const [loading, setLoading] = useState(true)
  const { getProductDiscount, isProductOnSale, getSalePrice } = useFlashSale()

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`http://localhost:8888/api/books`)
        if (Array.isArray(data.data.data)) {
          setBook(data.data.data.slice(0, 10)) // Lấy 10 sản phẩm đầu
        } else {
          console.warn('Dữ liệu trả về không hợp lệ:', data)
          setBook([])
        }
      } catch (error) {
        console.error('Lỗi khi gọi API sách:', error)
        setBook([])
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
          <p className="text-gray-600">Đang tải sản phẩm...</p>
        </div>
      </div>
    )
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full text-sm font-medium text-blue-700 mb-4">
            <BookOpen className="w-4 h-4" />
            <span>Sản phẩm nổi bật</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Sách bán chạy nhất</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Khám phá những đầu sách được yêu thích nhất và được đánh giá cao bởi cộng đồng độc giả
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {book.map((item, index) => (
            <Link to={`/detail/${item._id}`} key={item._id}>
              <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
                {/* Badges */}
                <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
                  {index < 3 && (
                    <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      <span>Hot</span>
                    </div>
                  )}
                  {isProductOnSale(item._id) && (
                    <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      -{getProductDiscount(item._id)}%
                    </div>
                  )}
                </div>

                {/* Wishlist Button */}
                <div className="absolute top-3 right-3 z-20">
                  <WishlistButton bookId={item._id} />
                </div>

                {/* Image */}
                <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 aspect-[3/4]">
                  <img
                    src={item.cover_image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm leading-tight">
                    {item.title}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    <div className="flex">
                      {Array(5).fill(0).map((_, idx) => (
                        <Star
                          key={idx}
                          className="w-3 h-3 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-1">(4.8)</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-3">
                    {isProductOnSale(item._id) ? (
                      <>
                        <span className="text-lg font-bold text-blue-600">
                          {getSalePrice(item.price, item._id).toLocaleString('vi-VN')}đ
                        </span>
                        <span className="text-sm text-gray-400 line-through">
                          {item.price.toLocaleString('vi-VN')}đ
                        </span>
                      </>
                    ) : (
                      <span className="text-lg font-bold text-blue-600">
                        {item.price ? item.price.toLocaleString('vi-VN') : '0'}đ
                      </span>
                    )}
                  </div>

                  {/* Add to Cart */}
                  <div onClick={(e) => e.preventDefault()}>
                    <CartButton 
                      bookId={item._id} 
                      size="sm" 
                      className="w-full text-sm py-2"
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
          <Link
            to="/allproduct"
            className="group flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
          >
            <BookOpen className="w-5 h-5" />
            <span>Xem tất cả sách</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/wishlist"
            className="group flex items-center gap-2 border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-xl font-semibold hover:border-purple-500 hover:text-purple-600 transition-all duration-300"
          >
            <Sparkles className="w-5 h-5" />
            <span>Danh sách yêu thích</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Product;
