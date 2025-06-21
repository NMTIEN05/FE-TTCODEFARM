import React from 'react';
import { useWishlistStore } from '../../stores/wishlist.store';

export const WishlistBadge: React.FC = () => {
  const { wishlistItems } = useWishlistStore();
  
  if (wishlistItems.length === 0) return null;

  return (
    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
      {wishlistItems.length}
    </span>
  );
};