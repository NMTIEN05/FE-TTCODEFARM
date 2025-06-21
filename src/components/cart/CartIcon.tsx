import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../hooks/cart/useCart';
import { useNavigate } from 'react-router-dom';

const CartIcon: React.FC = () => {
  const { cartCount, totalPrice } = useCart();
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/cart')}
      className="relative flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
      title="Giỏ hàng"
    >
      <div className="relative">
        <ShoppingCart className="w-6 h-6" />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
            {cartCount > 99 ? '99+' : cartCount}
          </span>
        )}
      </div>
      <div className="hidden md:flex flex-col items-start">
        <span className="text-xs text-gray-600">Giỏ hàng</span>
        <span className="text-sm font-medium">
          {totalPrice.toLocaleString()}đ
        </span>
      </div>
    </button>
  );
};

export default CartIcon;