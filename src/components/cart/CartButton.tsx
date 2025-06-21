import React, { useState } from 'react';
import { ShoppingCart, Plus, Check } from 'lucide-react';
import { useCart } from '../../providers/CartProvider';

interface CartButtonProps {
  bookId: string;
  quantity?: number;
  className?: string;
  variant?: 'primary' | 'secondary' | 'icon';
  size?: 'sm' | 'md' | 'lg';
}

const CartButton: React.FC<CartButtonProps> = ({
  bookId,
  quantity = 1,
  className = '',
  variant = 'primary',
  size = 'md'
}) => {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = async () => {
    try {
      setIsAdding(true);
      await addToCart(bookId, quantity);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    } catch (error: any) {
      alert(error.message || 'Có lỗi khi thêm vào giỏ hàng');
    } finally {
      setIsAdding(false);
    }
  };

  const getButtonClasses = () => {
    const baseClasses = 'flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
    
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg'
    };

    const variantClasses = {
      primary: 'bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800',
      secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 active:bg-gray-400',
      icon: 'bg-transparent text-indigo-600 hover:bg-indigo-50 border border-indigo-600'
    };

    return `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;
  };

  const getIcon = () => {
    if (isAdded) return <Check className="w-4 h-4" />;
    if (variant === 'icon') return <Plus className="w-4 h-4" />;
    return <ShoppingCart className="w-4 h-4" />;
  };

  const getText = () => {
    if (isAdding) return 'Đang thêm...';
    if (isAdded) return 'Đã thêm!';
    if (variant === 'icon') return '';
    return 'Thêm vào giỏ';
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdding}
      className={getButtonClasses()}
      title={variant === 'icon' ? 'Thêm vào giỏ hàng' : undefined}
    >
      {getIcon()}
      {getText() && <span>{getText()}</span>}
    </button>
  );
};

export default CartButton;