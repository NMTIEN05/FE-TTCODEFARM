import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Star, Heart, ShoppingCart, Minus, Plus, Truck, Shield, RotateCcw, Loader2 } from 'lucide-react';
import { Ibook, IProductVariant } from '../../../types/Book';
import WishlistButton from '../../../components/wishlist/WishlistButton';
import { useCart } from '../../../providers/CartProvider';
import VariantSelector from '../../../components/VariantSelector';
import { variantService } from '../../../services/variantService';

const Detail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Ibook | null>(null);
  const [variants, setVariants] = useState<IProductVariant[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<IProductVariant | null>(null);
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

    const fetchVariants = async () => {
      if (id) {
        const variantData = await variantService.getVariantsByBookId(id);
        setVariants(variantData);
        // Tự động chọn variant đầu tiên nếu có
        if (variantData.length > 0) {
          const availableVariant = variantData.find(v => v.is_available && v.stock_quantity > 0);
          if (availableVariant) {
            setSelectedVariant(availableVariant);
          }
        }
      }
    };

    if (id) {
      fetchProduct();
      fetchVariants();
    }
  }, [id]);

  const handleAddToCart = async () => {
    if (!product || !id) return;

    // Nếu có variants nhưng chưa chọn variant
    if (variants.length > 0 && !selectedVariant) {
      alert('Vui lòng chọn định dạng sản phẩm!');
      return;
    }

    // Kiểm tra tồn kho của variant được chọn
    if (selectedVariant && selectedVariant.stock_quantity < quantity) {
      alert('Số lượng yêu cầu vượt quá tồn kho của định dạng này!');
      return;
    }

    try {
      setIsAdding(true);
      // Truyền thêm thông tin variant nếu có
      const cartData = {
        bookId: id,
        quantity,
        variantId: selectedVariant?._id
      };
      await addToCart(id, quantity, selectedVariant?._id);
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
          <li><a href="/allproduct" className="hover:text-indigo-600">Sách</a></li>
          <li>/</li>
          <li className="text-gray-900">{product.title}</li>
        </ol>
      </nav>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
        {/* Product Image */}
        <div className="space-y-4">
          <div className="w-full h-[600px] rounded-2xl overflow-hidden bg-gray-100 shadow-lg">
            <img src={product.cover_image} alt={product.title} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Title & Category */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                {product.category_id?.name || 'Chưa phân loại'}
              </span>
              {product.is_available && (
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                  Còn hàng
                </span>
              )}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>
          </div>

          {/* Book Details */}
          <div className="bg-gray-50 rounded-xl p-6 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-gray-500">Tác giả</span>
                <p className="text-gray-900 font-medium">{product.author_id?.name || 'Chưa có thông tin'}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Nhà xuất bản</span>
                <p className="text-gray-900 font-medium">{product.publisher || 'Chưa có thông tin'}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Năm xuất bản</span>
                <p className="text-gray-900 font-medium">
                  {product.publish_year ? new Date(product.publish_year).getFullYear() : 'Chưa có thông tin'}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Định dạng</span>
                <p className="text-gray-900 font-medium capitalize">{product.format || 'Bìa mềm'}</p>
              </div>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              {Array(5).fill(0).map((_, idx) => (
                <Star key={idx} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-gray-600">(4.8) • 124 đánh giá</span>
          </div>

          {/* Price */}
          <div className="bg-white border-2 border-blue-100 rounded-xl p-6">
            <div className="flex items-center space-x-4 mb-2">
              <span className="text-4xl font-bold text-blue-600">
                {selectedVariant ? selectedVariant.price.toLocaleString('vi-VN') : (product.price ?? 0).toLocaleString('vi-VN')}đ
              </span>
            </div>
            <p className="text-sm text-gray-500">Giá đã bao gồm VAT</p>
          </div>

          {/* Variant Selector */}
          <VariantSelector
            variants={variants}
            selectedVariant={selectedVariant}
            onVariantSelect={setSelectedVariant}
          />

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
                onClick={() => setQuantity(q => Math.min(selectedVariant?.stock_quantity || product?.stock_quantity || 1, q + 1))}
                disabled={quantity >= (selectedVariant?.stock_quantity || product?.stock_quantity || 1)}
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Stock info */}
          <div className="mb-4">
            <span className="text-sm text-gray-600">
              Còn lại: <span className="font-medium text-green-600">
                {selectedVariant ? selectedVariant.stock_quantity : product.stock_quantity} sản phẩm
              </span>
            </span>
          </div>

          {/* Actions */}
          <div className="flex space-x-4 mb-6">
            <button
              className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              onClick={handleAddToCart}
              disabled={isAdding || (selectedVariant ? selectedVariant.stock_quantity < quantity : product.stock_quantity < quantity) || (variants.length > 0 && !selectedVariant)}
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

          {((selectedVariant && selectedVariant.stock_quantity < quantity) || (!selectedVariant && product.stock_quantity < quantity)) && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">
                Số lượng yêu cầu vượt quá tồn kho. Vui lòng chọn số lượng nhỏ hơn.
              </p>
            </div>
          )}

          {variants.length > 0 && !selectedVariant && (
            <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-600 text-sm">
                Vui lòng chọn định dạng sản phẩm trước khi thêm vào giỏ hàng.
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

      {/* Product Description & Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 border-t pt-8">
        {/* Description */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Mô tả sản phẩm</h2>
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line text-base">
              {product.description || 'Chưa có mô tả cho sản phẩm này.'}
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="space-y-6">
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin chi tiết</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Mã sản phẩm:</span>
                <span className="font-medium text-gray-900">{product._id?.slice(-8).toUpperCase()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Tình trạng:</span>
                <span className={`font-medium ${
                  product.stock_quantity > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {product.stock_quantity > 0 ? 'Còn hàng' : 'Hết hàng'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Số lượng:</span>
                <span className="font-medium text-gray-900">{product.stock_quantity} cuốn</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Danh mục:</span>
                <span className="font-medium text-gray-900">{product.category_id?.name || 'Chưa phân loại'}</span>
              </div>
            </div>
          </div>

          {/* Shipping Info */}
          <div className="bg-blue-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin vận chuyển</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <Truck className="h-5 w-5 text-blue-600" />
                <span className="text-gray-700">Miễn phí vận chuyển đơn từ 200k</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-green-600" />
                <span className="text-gray-700">Bảo hành chất lượng 100%</span>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw className="h-5 w-5 text-orange-600" />
                <span className="text-gray-700">Đổi trả trong 30 ngày</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Detail;
