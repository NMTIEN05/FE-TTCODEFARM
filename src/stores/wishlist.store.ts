import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistStore {
  wishlistItems: string[];
  addToWishlist: (bookId: string) => void;
  removeFromWishlist: (bookId: string) => void;
  isInWishlist: (bookId: string) => boolean;
}

export const useWishlistStore = create<WishlistStore>()(persist(
  (set, get) => ({
    wishlistItems: [],
    
    addToWishlist: (bookId: string) => {
      const items = get().wishlistItems;
      if (!items.includes(bookId)) {
        set((state) => ({
          wishlistItems: [...state.wishlistItems, bookId]
        }));
      }
    },
    
    removeFromWishlist: (bookId: string) => {
      set((state) => ({
        wishlistItems: state.wishlistItems.filter(id => id !== bookId)
      }));
    },
    
    isInWishlist: (bookId: string) => {
      return get().wishlistItems.includes(bookId);
    }
  }),
  {
    name: 'wishlist-storage'
  }
));