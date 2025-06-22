import React, { useState } from "react";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingCart,
  CreditCard,
  ArrowLeft,
  AlertCircle,
  Loader2,
  Package,
} from "lucide-react";
import { useCart } from "../../providers/CartProvider";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, totalPrice, cartCount, loading, updateQuantity, removeItem, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const handleClearCart = async () => {
    if (window.confirm('Bạn có chắc muốn xóa toàn bộ giỏ hàng?')) {
      try {
        await clearCart();
      } catch (error) {
        alert('Có lỗi khi xóa giỏ hàng');
      }
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-4 text-center">
        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
        <p>Đang tải giỏ hàng...</p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-4 text-center">
        <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-400" />
        <h2 className="text-2xl font-bold mb-2">Giỏ hàng trống</h2>
        <p className="text-gray-600 mb-6">Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm</p>
        <button 
          onClick={() => navigate('/')}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
        >
          Tiếp tục mua sắm
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-gray-600 hover:text-black"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Tiếp tục mua sắm</span>
        </button>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <ShoppingCart /> Giỏ hàng ({cartCount} sản phẩm)
          </h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/orders')}
              className="text-indigo-600 hover:text-indigo-800 text-sm flex items-center gap-1 px-3 py-1 border border-indigo-600 rounded-lg hover:bg-indigo-50"
            >
              <Package className="w-4 h-4" />
              Lịch sử đơn hàng
            </button>
            {cartItems.length > 0 && (
              <button
                onClick={handleClearCart}
                className="text-red-600 hover:text-red-800 text-sm flex items-center gap-1"
              >
                <Trash2 className="w-4 h-4" />
                Xóa tất cả
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {cartItems.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center border-b pb-4"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.book_id?.cover_image || "/fallback.jpg"}
                alt={item.book_id?.title || "Không có tiêu đề"}
                className="w-20 h-28 object-cover rounded"
              />
              <div>
                <h2 className="text-lg font-semibold">{item.book_id?.title}</h2>
                <p className="text-sm text-gray-600">
                  Tác giả: {item.book_id?.author_id?.name || 'Chưa có thông tin'}
                </p>
                <p className="text-sm text-gray-500">
                  Đơn giá: {item.price.toLocaleString()}đ
                </p>
                <div className="flex items-center mt-2 border rounded-lg">
                  <button
                    className="p-2 hover:bg-gray-100 disabled:opacity-50"
                    disabled={item.quantity <= 1}
                    onClick={() =>
                      item._id && updateQuantity(item._id, item.quantity - 1)
                    }
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 min-w-[50px] text-center font-medium">{item.quantity}</span>
                  <button
                    className="p-2 hover:bg-gray-100"
                    onClick={() =>
                      item._id && updateQuantity(item._id, item.quantity + 1)
                    }
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="text-right">
              <p className="font-bold text-red-600 text-lg">
                {(item.price * item.quantity).toLocaleString()}đ
              </p>
              <button
                className="text-gray-500 hover:text-red-600 mt-2 p-1 rounded hover:bg-red-50"
                onClick={() => item._id && removeItem(item._id)}
                title="Xóa sản phẩm"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 p-6 border-t bg-gray-50 rounded-lg">
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span>Số lượng sản phẩm:</span>
            <span>{cartCount}</span>
          </div>
          <div className="flex justify-between text-lg font-semibold border-t pt-2">
            <span>Tổng tiền:</span>
            <span className="text-red-600">{totalPrice.toLocaleString()}đ</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 mb-4 text-sm text-amber-600">
          <AlertCircle className="w-4 h-4" />
          <span>Vui lòng kiểm tra kỹ thông tin trước khi thanh toán</span>
        </div>
        
        <button 
          onClick={handleCheckout}
          disabled={cartItems.length === 0}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <CreditCard className="w-4 h-4" />
          Thanh toán ngay
        </button>
      </div>
    </div>
  );
};

export default Cart;
