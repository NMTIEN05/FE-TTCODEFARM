import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../../providers/CartProvider';
import { useNavigate } from 'react-router-dom';

const QuickOrderSummary: React.FC = () => {
  const { cartItems, totalPrice, cartCount } = useCart();
  const navigate = useNavigate();

  if (cartCount === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white border rounded-lg shadow-lg p-4 max-w-sm z-40">
      <div className="flex items-center gap-3 mb-3">
        <ShoppingBag className="w-5 h-5 text-indigo-600" />
        <span className="font-semibold">Giỏ hàng ({cartCount})</span>
      </div>
      
      <div className="space-y-2 mb-3 max-h-32 overflow-y-auto">
        {cartItems.slice(0, 2).map((item, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <img
              src={item.book_id?.cover_image || '/fallback.jpg'}
              alt={item.book_id?.title}
              className="w-8 h-10 object-cover rounded"
            />
            <div className="flex-1 min-w-0">
              <p className="truncate">{item.book_id?.title}</p>
              <p className="text-gray-500">x{item.quantity}</p>
            </div>
          </div>
        ))}
        {cartCount > 2 && (
          <p className="text-sm text-gray-500">... và {cartCount - 2} sản phẩm khác</p>
        )}
      </div>
      
      <div className="border-t pt-3">
        <div className="flex justify-between items-center mb-3">
          <span className="font-semibold">Tổng:</span>
          <span className="font-semibold text-red-600">{totalPrice.toLocaleString()}đ</span>
        </div>
        
        <button
          onClick={() => navigate('/checkout')}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 flex items-center justify-center gap-2"
        >
          Thanh toán ngay
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default QuickOrderSummary;