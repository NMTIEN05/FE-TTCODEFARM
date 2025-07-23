import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { useWishlist } from '../../providers/WishlistProvider';

interface WishlistButtonProps {
  bookId: string;
  className?: string;
}

const WishlistButton: React.FC<WishlistButtonProps> = ({ bookId, className = '' }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [isLoading, setIsLoading] = useState(false);
  
  const inWishlist = isInWishlist(bookId);

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      setIsLoading(true);
      if (inWishlist) {
        await removeFromWishlist(bookId);
      } else {
        await addToWishlist(bookId);
      }
    } catch (error: any) {
      alert(error.message || 'Có lỗi xảy ra');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isLoading}
      className={`absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white transition-all duration-200 disabled:opacity-50 ${className}`}
      title={inWishlist ? 'Xóa khỏi yêu thích' : 'Thêm vào yêu thích'}
    >
      <Heart 
        className={`w-5 h-5 transition-colors ${
          inWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600 hover:text-red-500'
        }`} 
      />
    </button>
  );
};

export default WishlistButton;