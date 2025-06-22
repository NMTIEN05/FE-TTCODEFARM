import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Star, Heart, ShoppingCart, Minus, Plus, Truck, Shield, RotateCcw, Loader2 } from 'lucide-react';
import { Ibook } from '../../../types/Book';
import WishlistButton from '../../../components/wishlist/WishlistButton';
import { useCart } from '../../../providers/CartProvider';

const Detail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Ibook | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:8888/api/books/${id}`);
        setProduct(res.data.data.data);
      } catch (error) {
        console.error('Lỗi khi gọi API chi tiết sản phẩm:', error);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!product || !id) return;

    try {
      setIsAdding(true);
      await addToCart(id, quantity);
      alert('Đã thêm vào giỏ hàng thành công!');
    } catch (error: any) {
      alert(error.message || 'Có lỗi khi thêm vào giỏ hàng');
    } finally {
      setIsAdding(false);
    }
  };

  if (!product) return <div className="text-center py-10">Đang tải chi tiết sản phẩm...</div>;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm mb-8">
        <ol className="flex items-center space-x-2 text-gray-500">
          <li><a href="/" className="hover:text-indigo-600">Trang chủ</a></li>
          <li>/</li>
          <li><a href="/products" className="hover:text-indigo-600">Sách</a></li>
          <li>/</li>
          <li className="text-gray-900">{product.title}</li>
        </ol>
      </nav>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
        <div className="w-full h-[600px] rounded-lg overflow-hidden bg-gray-100">
          <img src={product.cover_image} alt={product.cover_image} className="w-full h-full object-cover" />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>
          <p className="text-lg text-gray-600 mb-4">Tác giả: <span className="font-medium">{product.publisher}</span></p>

          {/* Price */}
          <div className="mb-6 flex items-center space-x-4">
            <span className="text-3xl font-bold text-indigo-600">{product.price ?? 200000}đ</span>
            <span className="text-xl text-gray-500 line-through">200.000đ</span>
            <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">
              20%
            </span>
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Số lượng
            </label>
            <div className="flex items-center space-x-3">
              <button
                className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-16 text-center text-lg font-medium">{quantity}</span>
              <button
                className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
                onClick={() => setQuantity(q => Math.min(product?.stock_quantity || 1, q + 1))}
                disabled={quantity >= (product?.stock_quantity || 1)}
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Stock info */}
          <div className="mb-4">
            <span className="text-sm text-gray-600">
              Còn lại: <span className="font-medium text-green-600">{product.stock_quantity} sản phẩm</span>
            </span>
          </div>

          {/* Actions */}
          <div className="flex space-x-4 mb-6">
            <button
              className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              onClick={handleAddToCart}
              disabled={isAdding || product.stock_quantity < quantity}
            >
              {isAdding ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Đang thêm...</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="h-5 w-5" />
                  <span>Thêm vào giỏ hàng</span>
                </>
              )}
            </button>
<WishlistButton 
              bookId={product._id}
              className="!relative !top-0 !right-0 !p-3 !rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 !bg-transparent"
            />
          </div>

          {product.stock_quantity < quantity && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">
                Số lượng yêu cầu vượt quá tồn kho. Vui lòng chọn số lượng nhỏ hơn.
              </p>
            </div>
          )}

          {/* Features */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3 text-sm text-gray-600">
              <Truck className="h-5 w-5 text-green-600" />
              <span>Miễn phí vận chuyển cho đơn hàng trên 200,000đ</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-600">
              <Shield className="h-5 w-5 text-blue-600" />
              <span>Bảo hành chất lượng 100%</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-600">
              <RotateCcw className="h-5 w-5 text-orange-600" />
              <span>Đổi trả trong 30 ngày</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t pt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Mô tả</h2>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {product.description}
        </p>
      </div>
    </main>
  );
};

export default Detail;
