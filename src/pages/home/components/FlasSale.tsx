import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Zap, Clock, Star, ShoppingCart, ArrowRight } from 'lucide-react'
import { Ibook } from '../../../types/Book'
import axios from 'axios'
import { SimpleWishlistButton } from '../../../components/wishlist/SimpleWishlistButton'
import { CartButton } from '../../../components/cart'

type Props = {}

interface FlashSaleItem {
  _id: string
  discountPercent: number
  productId: Ibook
  flashSaleId: {
    _id: string
    name: string
    endDate: string
  }
}

const FlasSale = (props: Props) => {
  const [flashSaleItems, setFlashSaleItems] = useState<FlashSaleItem[]>([])
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFlashSaleProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:8888/api/flashsales/active-products')
        if (data?.results) {
          setFlashSaleItems(data.results.slice(0, 6)) // Lấy 6 sản phẩm
          
          if (data.results.length > 0) {
            const endDate = new Date(data.results[0].flashSaleId.endDate)
            const now = new Date()
            const diff = endDate.getTime() - now.getTime()
            
            if (diff > 0) {
              const hours = Math.floor(diff / (1000 * 60 * 60))
              const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
              const seconds = Math.floor((diff % (1000 * 60)) / 1000)
              setTimeLeft({ hours, minutes, seconds })
            }
          }
        }
      } catch (error) {
        console.error('Error fetching flash sale products:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchFlashSaleProducts()

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  if (loading) {
    return (
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="animate-spin w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải flash sale...</p>
        </div>
      </div>
    )
  }

  if (flashSaleItems.length === 0) {
    return null // Không hiển thị nếu không có flash sale
  }

  return (
    <section className="py-16 bg-gradient-to-br from-red-600 via-pink-600 to-purple-600 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="w-full h-full bg-gradient-to-br from-white/10 to-transparent"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 relative">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
          <div className="flex items-center gap-4 mb-6 md:mb-0">
            <div className="relative">
              <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center animate-pulse">
                <Zap className="w-8 h-8 text-red-600" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <span className="text-red-600 font-bold text-xs">!</span>
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-white mb-2">FLASH SALE</h2>
              <p className="text-pink-100">Giảm giá sốc - Số lượng có hạn</p>
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-white">
              <Clock className="w-5 h-5" />
              <span className="font-medium">Kết thúc sau:</span>
            </div>
            <div className="flex gap-2">
              {[
                { label: 'Giờ', value: timeLeft.hours },
                { label: 'Phút', value: timeLeft.minutes },
                { label: 'Giây', value: timeLeft.seconds }
              ].map((time, index) => (
                <div key={index} className="text-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 min-w-[60px]">
                    <div className="text-2xl font-bold text-white font-mono">
                      {String(time.value).padStart(2, '0')}
                    </div>
                  </div>
                  <div className="text-xs text-pink-100 mt-1">{time.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {flashSaleItems.map((item, index) => {
            const book = item.productId
            const salePrice = book.price * (1 - item.discountPercent / 100)
            
            return (
              <div key={item._id} className="group relative bg-white rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
                {/* Sale Badge */}
                <div className="absolute top-4 left-4 z-20">
                  <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg animate-bounce">
                    -{item.discountPercent}%
                  </div>
                </div>

                {/* Wishlist */}
                <div className="absolute top-4 right-4 z-20" onClick={(e) => { e.preventDefault(); e.stopPropagation() }}>
                  <SimpleWishlistButton
                    bookId={book._id}
                    className="p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white"
                  />
                </div>

                <Link to={`/detail/${book._id}`}>
                  {/* Image */}
                  <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 aspect-[4/5]">
                    <img
                      src={book.cover_image}
                      alt={book.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-bold text-gray-900 mb-3 line-clamp-2 text-lg leading-tight">
                      {book.title}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-4">
                      <div className="flex">
                        {Array(5).fill(0).map((_, idx) => (
                          <Star key={idx} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 ml-1">(4.8)</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl font-bold text-red-600">
                        {salePrice.toLocaleString('vi-VN')}đ
                      </span>
                      <span className="text-lg text-gray-400 line-through">
                        {book.price.toLocaleString('vi-VN')}đ
                      </span>
                    </div>

                    {/* Savings */}
                    <div className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block">
                      Tiết kiệm {(book.price - salePrice).toLocaleString('vi-VN')}đ
                    </div>
                  </div>
                </Link>

                {/* Add to Cart */}
                <div className="px-6 pb-6" onClick={(e) => e.preventDefault()}>
                  <CartButton 
                    bookId={book._id} 
                    size="md" 
                    className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
                  />
                </div>
              </div>
            )
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            to="/flashsale"
            className="group inline-flex items-center gap-2 bg-white text-red-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Zap className="w-5 h-5" />
            <span>Xem tất cả Flash Sale</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FlasSale