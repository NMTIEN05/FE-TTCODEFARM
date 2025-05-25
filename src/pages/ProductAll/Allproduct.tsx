import { BookOutlined, HeartOutlined, StarFilled } from '@ant-design/icons';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import React from 'react';
import ViewAllButton from '../home/components/comon/Button';

type Props = {};

const Allproduct = (props: Props) => {
  return (
    <div className='m-10'>
      <div className=" mb-15  mt-10 max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <button className="flex items-center space-x-3 text-slate-600 hover:text-slate-900 transition-all duration-200 hover:scale-105">
            <div className="p-2 rounded-full bg-slate-100 hover:bg-slate-200">
              <ArrowLeft className="w-5 h-5" />
            </div>
            <span className="font-medium">Quay Lại Trang chủ</span>
          </button>

          <div className="text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent flex items-center justify-center">
              <BookOutlined className="w-8 h-8 mr-3 text-slate-700" />
              Tất cả sản phẩm của chúng tôi
            </h1>
          </div>

          <div>{/* Reserved */}</div>
        </div>
      </div>

      <div className="   ml-40 mr-40 mt-10  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 px-8">
        {/* Product 1 */}
        <Link to="/detel">
          <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
            <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
              -12%
            </div>

            <button className="absolute top-4 right-4 z-20 p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white transition-all duration-300 group">
              <HeartOutlined
                className="text-gray-400 group-hover:text-red-500 transition-all duration-300"
                style={{ fontSize: 20 }}
              />
            </button>

            <div className="relative overflow-hidden bg-gray-100 aspect-square">
              <img
                src="https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop"
                alt="iPhone 15"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2">
                iPhone 15 Pro Max 256GB
              </h3>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xl font-bold text-blue-600">
                  32.990.000₫
                </span>
                <span className="text-sm text-gray-400 line-through">
                  37.500.000₫
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex">
                  <StarFilled className="text-yellow-400" style={{ fontSize: 16 }} />
                  <StarFilled className="text-yellow-400" style={{ fontSize: 16 }} />
                  <StarFilled className="text-yellow-400" style={{ fontSize: 16 }} />
                  <StarFilled className="text-yellow-400" style={{ fontSize: 16 }} />
                  <StarFilled className="text-yellow-400" style={{ fontSize: 16 }} />
                </div>
                <span className="text-sm text-gray-500">(124 đánh giá)</span>
              </div>
            </div>
          </div>
        </Link>

        {/* Product 2 */}
        <Link to="/detel">
          <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
            <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
              -10%
            </div>

            <button className="absolute top-4 right-4 z-20 p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white transition-all duration-300 group">
              <HeartOutlined
                className="text-gray-400 group-hover:text-red-500 transition-all duration-300"
                style={{ fontSize: 20 }}
              />
            </button>

            <div className="relative overflow-hidden bg-gray-100 aspect-square">
              <img
                src="https://images.unsplash.com/photo-1606813902527-449f2d3a8c9c?w=400&h=400&fit=crop"
                alt="Samsung S23"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2">
                Samsung Galaxy S23 Ultra
              </h3>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xl font-bold text-blue-600">
                  28.990.000₫
                </span>
                <span className="text-sm text-gray-400 line-through">
                  31.990.000₫
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex">
                  <StarFilled className="text-yellow-400" style={{ fontSize: 16 }} />
                  <StarFilled className="text-yellow-400" style={{ fontSize: 16 }} />
                  <StarFilled className="text-yellow-400" style={{ fontSize: 16 }} />
                  <StarFilled className="text-yellow-400" style={{ fontSize: 16 }} />
                  <StarFilled className="text-yellow-400" style={{ fontSize: 16 }} />
                </div>
                <span className="text-sm text-gray-500">(89 đánh giá)</span>
              </div>
            </div>
          </div>
        </Link>

        {/* Product 3 */}
        <Link to="/detel">
          <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
            <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
              -15%
            </div>

            <button className="absolute top-4 right-4 z-20 p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white transition-all duration-300 group">
              <HeartOutlined
                className="text-gray-400 group-hover:text-red-500 transition-all duration-300"
                style={{ fontSize: 20 }}
              />
            </button>

            <div className="relative overflow-hidden bg-gray-100 aspect-square">
              <img
                src="https://images.unsplash.com/photo-1580910051074-9b64b1c15271?w=400&h=400&fit=crop"
                alt="Xiaomi"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2">
                Xiaomi 13T Pro 5G
              </h3>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xl font-bold text-blue-600">
                  15.990.000₫
                </span>
                <span className="text-sm text-gray-400 line-through">
                  18.990.000₫
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex">
                  <StarFilled className="text-yellow-400" style={{ fontSize: 16 }} />
                  <StarFilled className="text-yellow-400" style={{ fontSize: 16 }} />
                  <StarFilled className="text-yellow-400" style={{ fontSize: 16 }} />
                  <StarFilled className="text-yellow-400" style={{ fontSize: 16 }} />
                </div>
                <span className="text-sm text-gray-500">(45 đánh giá)</span>
              </div>
            </div>
          </div>
        </Link>

        {/* Product 4 */}
        <Link to="/detel">
          <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
            <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
              -8%
            </div>

            <button className="absolute top-4 right-4 z-20 p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white transition-all duration-300 group">
              <HeartOutlined
                className="text-gray-400 group-hover:text-red-500 transition-all duration-300"
                style={{ fontSize: 20 }}
              />
            </button>

            <div className="relative overflow-hidden bg-gray-100 aspect-square">
              <img
                src="https://images.unsplash.com/photo-1542751110-97427bbecf20?w=400&h=400&fit=crop"
                alt="OPPO"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2">
                OPPO Reno10 5G
              </h3>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xl font-bold text-blue-600">
                  10.990.000₫
                </span>
                <span className="text-sm text-gray-400 line-through">
                  11.990.000₫
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex">
                  <StarFilled className="text-yellow-400" style={{ fontSize: 16 }} />
                  <StarFilled className="text-yellow-400" style={{ fontSize: 16 }} />
                  <StarFilled className="text-yellow-400" style={{ fontSize: 16 }} />
                  <StarFilled className="text-yellow-400" style={{ fontSize: 16 }} />
                  <StarFilled className="text-yellow-400" style={{ fontSize: 16 }} />
                </div>
                <span className="text-sm text-gray-500">(67 đánh giá)</span>
              </div>
            </div>
          </div>
        </Link>
           {/* Product 1 */}
        <Link to="/detel">
          <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
            <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
              -12%
            </div>

            <button className="absolute top-4 right-4 z-20 p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white transition-all duration-300 group">
              <HeartOutlined
                className="text-gray-400 group-hover:text-red-500 transition-all duration-300"
                style={{ fontSize: 20 }}
              />
            </button>

            <div className="relative overflow-hidden bg-gray-100 aspect-square">
              <img
                src="https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop"
                alt="iPhone 15"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2">
                iPhone 15 Pro Max 256GB
              </h3>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xl font-bold text-blue-600">
                  32.990.000₫
                </span>
                <span className="text-sm text-gray-400 line-through">
                  37.500.000₫
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex">
                  <StarFilled className="text-yellow-400" style={{ fontSize: 16 }} />
                  <StarFilled className="text-yellow-400" style={{ fontSize: 16 }} />
                  <StarFilled className="text-yellow-400" style={{ fontSize: 16 }} />
                  <StarFilled className="text-yellow-400" style={{ fontSize: 16 }} />
                  <StarFilled className="text-yellow-400" style={{ fontSize: 16 }} />
                </div>
                <span className="text-sm text-gray-500">(124 đánh giá)</span>
              </div>
            </div>
          </div>
        </Link>

        {/* Product 2 */}
        <Link to="/detel">
          <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
            <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
              -10%
            </div>

            <button className="absolute top-4 right-4 z-20 p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white transition-all duration-300 group">
              <HeartOutlined
                className="text-gray-400 group-hover:text-red-500 transition-all duration-300"
                style={{ fontSize: 20 }}
              />
            </button>

            <div className="relative overflow-hidden bg-gray-100 aspect-square">
              <img
                src="https://images.unsplash.com/photo-1606813902527-449f2d3a8c9c?w=400&h=400&fit=crop"
                alt="Samsung S23"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2">
                Samsung Galaxy S23 Ultra
              </h3>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xl font-bold text-blue-600">
                  28.990.000₫
                </span>
                <span className="text-sm text-gray-400 line-through">
                  31.990.000₫
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex">
                  <StarFilled className="text-yellow-400" style={{ fontSize: 16 }} />
                  <StarFilled className="text-yellow-400" style={{ fontSize: 16 }} />
                  <StarFilled className="text-yellow-400" style={{ fontSize: 16 }} />
                  <StarFilled className="text-yellow-400" style={{ fontSize: 16 }} />
                  <StarFilled className="text-yellow-400" style={{ fontSize: 16 }} />
                </div>
                <span className="text-sm text-gray-500">(89 đánh giá)</span>
              </div>
            </div>
          </div>
        </Link>

        {/* Product 3 */}
        <Link to="/detel">
          <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
            <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
              -15%
            </div>

            <button className="absolute top-4 right-4 z-20 p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white transition-all duration-300 group">
              <HeartOutlined
                className="text-gray-400 group-hover:text-red-500 transition-all duration-300"
                style={{ fontSize: 20 }}
              />
            </button>

            <div className="relative overflow-hidden bg-gray-100 aspect-square">
              <img
                src="https://images.unsplash.com/photo-1580910051074-9b64b1c15271?w=400&h=400&fit=crop"
                alt="Xiaomi"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2">
                Xiaomi 13T Pro 5G
              </h3>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xl font-bold text-blue-600">
                  15.990.000₫
                </span>
                <span className="text-sm text-gray-400 line-through">
                  18.990.000₫
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex">
                  <StarFilled className="text-yellow-400" style={{ fontSize: 16 }} />
                  <StarFilled className="text-yellow-400" style={{ fontSize: 16 }} />
                  <StarFilled className="text-yellow-400" style={{ fontSize: 16 }} />
                  <StarFilled className="text-yellow-400" style={{ fontSize: 16 }} />
                </div>
                <span className="text-sm text-gray-500">(45 đánh giá)</span>
              </div>
            </div>
          </div>
        </Link>

        {/* Product 4 */}
        <Link to="/detel">
          <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
            <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
              -8%
            </div>

            <button className="absolute top-4 right-4 z-20 p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white transition-all duration-300 group">
              <HeartOutlined
                className="text-gray-400 group-hover:text-red-500 transition-all duration-300"
                style={{ fontSize: 20 }}
              />
            </button>

            <div className="relative overflow-hidden bg-gray-100 aspect-square">
              <img
                src="https://images.unsplash.com/photo-1542751110-97427bbecf20?w=400&h=400&fit=crop"
                alt="OPPO"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2">
                OPPO Reno10 5G
              </h3>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xl font-bold text-blue-600">
                  10.990.000₫
                </span>
                <span className="text-sm text-gray-400 line-through">
                  11.990.000₫
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex">
                  <StarFilled className="text-yellow-400" style={{ fontSize: 16 }} />
                  <StarFilled className="text-yellow-400" style={{ fontSize: 16 }} />
                  <StarFilled className="text-yellow-400" style={{ fontSize: 16 }} />
                  <StarFilled className="text-yellow-400" style={{ fontSize: 16 }} />
                  <StarFilled className="text-yellow-400" style={{ fontSize: 16 }} />
                </div>
                <span className="text-sm text-gray-500">(67 đánh giá)</span>
              </div>
            </div>
          </div>
        </Link>
      </div>
      <ViewAllButton />
    </div>
    
  );
};

export default Allproduct;
