import { HeartOutlined, StarFilled } from '@ant-design/icons'
import React from 'react'
import ViewAllButton from './comon/Button'
import { Link } from 'react-router-dom'

type Props = {}

const Product = (props: Props) => {
  return (
    <div className=" ml-40 mr-40 mt-20 mb-20">
<div className=" mt-8   mb-10">
  <h2 className="relative inline-block text-2xl md:text-3xl font-bold text-gray-800 before:content-[''] before:inline-block before:mr-4 before:w-1 before:h-6 before:bg-red-500 align-middle">
    Tất cả sản phẩm của chúng tôi
  </h2>
</div>
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Product Card 1 */}
          <Link to="/detel">
          <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
            {/* Discount Badge */}
            <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
              -12%
            </div>

            {/* Favorite Button */}
            <button className="absolute top-4 right-4 z-20 p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white transition-all duration-300 group">
              <HeartOutlined
                className="text-gray-400 group-hover:text-red-500 transition-all duration-300"
                style={{ fontSize: 20 }}
              />
            </button>

            {/* Image Container */}
            <div className="relative overflow-hidden bg-gray-100 aspect-square">
              <img
                src="https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop"
                alt="Sản phẩm 1"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Bỏ phần overlay icon ở đây */}
            </div>

            {/* Product Info */}
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2">
                iPhone 15 Pro Max 256GB
              </h3>

              {/* Price */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xl font-bold text-blue-600">
                  32.990.000₫
                </span>
                <span className="text-sm text-gray-400 line-through">
                  37.500.000₫
                </span>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex">
                  <StarFilled
                    className="text-yellow-400"
                    style={{ fontSize: 16 }}
                  />
                  <StarFilled
                    className="text-yellow-400"
                    style={{ fontSize: 16 }}
                  />
                  <StarFilled
                    className="text-yellow-400"
                    style={{ fontSize: 16 }}
                  />
                  <StarFilled
                    className="text-yellow-400"
                    style={{ fontSize: 16 }}
                  />
                  <StarFilled
                    className="text-yellow-400"
                    style={{ fontSize: 16 }}
                  />
                </div>
                <span className="text-sm text-gray-500">(124 đánh giá)</span>
              </div>
            </div>
          </div>
          </Link>

          {/* Các card còn lại tương tự, chỉ cần bỏ phần overlay */}
          {/* Product Card 2 */}
             <Link to="/detel">
          <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
            {/* Discount Badge */}
            <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
              -12%
            </div>

            {/* Favorite Button */}
            <button className="absolute top-4 right-4 z-20 p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white transition-all duration-300 group">
              <HeartOutlined
                className="text-gray-400 group-hover:text-red-500 transition-all duration-300"
                style={{ fontSize: 20 }}
              />
            </button>

            {/* Image Container */}
            <div className="relative overflow-hidden bg-gray-100 aspect-square">
              <img
                src="https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop"
                alt="Sản phẩm 1"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Bỏ phần overlay icon ở đây */}
            </div>

            {/* Product Info */}
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2">
                iPhone 15 Pro Max 256GB
              </h3>

              {/* Price */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xl font-bold text-blue-600">
                  32.990.000₫
                </span>
                <span className="text-sm text-gray-400 line-through">
                  37.500.000₫
                </span>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex">
                  <StarFilled
                    className="text-yellow-400"
                    style={{ fontSize: 16 }}
                  />
                  <StarFilled
                    className="text-yellow-400"
                    style={{ fontSize: 16 }}
                  />
                  <StarFilled
                    className="text-yellow-400"
                    style={{ fontSize: 16 }}
                  />
                  <StarFilled
                    className="text-yellow-400"
                    style={{ fontSize: 16 }}
                  />
                  <StarFilled
                    className="text-yellow-400"
                    style={{ fontSize: 16 }}
                  />
                </div>
                <span className="text-sm text-gray-500">(124 đánh giá)</span>
              </div>
            </div>
          </div>
          </Link>

          {/* Product Card 3 */}
            <Link to="/detel">
          <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
            {/* Discount Badge */}
            <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
              -12%
            </div>

            {/* Favorite Button */}
            <button className="absolute top-4 right-4 z-20 p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white transition-all duration-300 group">
              <HeartOutlined
                className="text-gray-400 group-hover:text-red-500 transition-all duration-300"
                style={{ fontSize: 20 }}
              />
            </button>

            {/* Image Container */}
            <div className="relative overflow-hidden bg-gray-100 aspect-square">
              <img
                src="https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop"
                alt="Sản phẩm 1"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Bỏ phần overlay icon ở đây */}
            </div>

            {/* Product Info */}
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2">
                iPhone 15 Pro Max 256GB
              </h3>

              {/* Price */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xl font-bold text-blue-600">
                  32.990.000₫
                </span>
                <span className="text-sm text-gray-400 line-through">
                  37.500.000₫
                </span>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex">
                  <StarFilled
                    className="text-yellow-400"
                    style={{ fontSize: 16 }}
                  />
                  <StarFilled
                    className="text-yellow-400"
                    style={{ fontSize: 16 }}
                  />
                  <StarFilled
                    className="text-yellow-400"
                    style={{ fontSize: 16 }}
                  />
                  <StarFilled
                    className="text-yellow-400"
                    style={{ fontSize: 16 }}
                  />
                  <StarFilled
                    className="text-yellow-400"
                    style={{ fontSize: 16 }}
                  />
                </div>
                <span className="text-sm text-gray-500">(124 đánh giá)</span>
              </div>
            </div>
          </div>
          </Link>

          {/* Product Card 4 */}
            <Link to="/detel">
          <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
            {/* Discount Badge */}
            <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
              -12%
            </div>

            {/* Favorite Button */}
            <button className="absolute top-4 right-4 z-20 p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white transition-all duration-300 group">
              <HeartOutlined
                className="text-gray-400 group-hover:text-red-500 transition-all duration-300"
                style={{ fontSize: 20 }}
              />
            </button>

            {/* Image Container */}
            <div className="relative overflow-hidden bg-gray-100 aspect-square">
              <img
                src="https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop"
                alt="Sản phẩm 1"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Bỏ phần overlay icon ở đây */}
            </div>

            {/* Product Info */}
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2">
                iPhone 15 Pro Max 256GB
              </h3>

              {/* Price */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xl font-bold text-blue-600">
                  32.990.000₫
                </span>
                <span className="text-sm text-gray-400 line-through">
                  37.500.000₫
                </span>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex">
                  <StarFilled
                    className="text-yellow-400"
                    style={{ fontSize: 16 }}
                  />
                  <StarFilled
                    className="text-yellow-400"
                    style={{ fontSize: 16 }}
                  />
                  <StarFilled
                    className="text-yellow-400"
                    style={{ fontSize: 16 }}
                  />
                  <StarFilled
                    className="text-yellow-400"
                    style={{ fontSize: 16 }}
                  />
                  <StarFilled
                    className="text-yellow-400"
                    style={{ fontSize: 16 }}
                  />
                </div>
                <span className="text-sm text-gray-500">(124 đánh giá)</span>
              </div>
            </div>
          </div>
          </Link>
        </div>
        <ViewAllButton/>
</div>


    
  )
}

export default Product