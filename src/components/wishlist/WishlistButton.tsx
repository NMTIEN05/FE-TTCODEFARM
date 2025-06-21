import React from 'react';
import { useWishlist } from '../../hooks/useWishlist';
import { useWishlistStore } from '../../stores/wishlist.store';

interface WishlistButtonProps {
  bookId: string;
  userId: string;
  isInWishlist?: boolean;
  className?: string;
}

export const WishlistButton: React.FC<WishlistButtonProps> = ({
  bookId,
  userId,
  isInWishlist,
  className = ''
}) => {
  const { addToWishlist, removeFromWishlist, isAddingToWishlist, isRemovingFromWishlist } = useWishlist();
  const { isInWishlist: isInWishlistStore, addToWishlist: addToStore, removeFromWishlist: removeFromStore } = useWishlistStore();
  
  const inWishlist = isInWishlist ?? isInWishlistStore(bookId);

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (inWishlist) {
      removeFromWishlist({ book_id: bookId, user_id: userId });
      removeFromStore(bookId);
    } else {
      addToWishlist({ book_id: bookId, user_id: userId });
      addToStore(bookId);
    }
  };

  const isLoading = isAddingToWishlist || isRemovingFromWishlist;

  return (
    <button
      onClick={handleToggleWishlist}
      disabled={isLoading}
      className={`flex items-center justify-center p-2 rounded-full transition-colors ${
        inWishlist 
          ? 'text-red-500 hover:text-red-600' 
          : 'text-gray-400 hover:text-red-500'
      } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      <svg
        className="w-6 h-6"
        fill={inWishlist ? 'currentColor' : 'none'}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </button>
  );
};