import React, { createContext, useContext, useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstant';
import { getUser } from '../utils/auth';

interface WishlistItem {
  _id: string;
  user_id: string;
  book_id: any;
  added_date: string;
}

interface WishlistContextType {
  wishlistItems: WishlistItem[];
  wishlistCount: number;
  loading: boolean;
  addToWishlist: (bookId: string) => Promise<void>;
  removeFromWishlist: (bookId: string) => Promise<void>;
  isInWishlist: (bookId: string) => boolean;
  fetchWishlist: () => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [wishlistCount, setWishlistCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const [currentUser, setCurrentUser] = useState(getUser());
  const userId = currentUser?._id;

  // Listen for auth changes
  useEffect(() => {
    const handleStorageChange = () => {
      const newUser = getUser();
      setCurrentUser(newUser);
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also check periodically for same-tab changes
    const interval = setInterval(() => {
      const newUser = getUser();
      if (JSON.stringify(newUser) !== JSON.stringify(currentUser)) {
        setCurrentUser(newUser);
      }
    }, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [currentUser]);

  const fetchWishlist = async () => {
    if (!userId) return;
    
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/api/wishlist/user/${userId}`);
      const items = res.data?.data || [];
      setWishlistItems(items);
      setWishlistCount(items.length);
    } catch (error) {
      console.error('Lỗi khi lấy wishlist:', error);
      setWishlistItems([]);
      setWishlistCount(0);
    } finally {
      setLoading(false);
    }
  };

  const addToWishlist = async (bookId: string) => {
    if (!userId) {
      throw new Error('Vui lòng đăng nhập để thêm vào yêu thích');
    }

    try {
      await axiosInstance.post('/api/wishlist/add', {
        user_id: userId,
        book_id: bookId,
      });
      await fetchWishlist();
    } catch (error: any) {
      if (error.response?.status === 400) {
        throw new Error('Sản phẩm đã có trong danh sách yêu thích');
      }
      throw error;
    }
  };

  const removeFromWishlist = async (bookId: string) => {
    if (!userId) return;

    // Cập nhật UI ngay lập tức
    const updatedItems = wishlistItems.filter(item => item.book_id?._id !== bookId);
    setWishlistItems(updatedItems);
    setWishlistCount(updatedItems.length);

    try {
      await axiosInstance.delete('/api/wishlist/remove', {
        data: { user_id: userId, book_id: bookId }
      });
    } catch (error) {
      console.error('Lỗi khi xóa khỏi wishlist:', error);
      // Rollback nếu API thất bại
      await fetchWishlist();
      throw error;
    }
  };

  const isInWishlist = (bookId: string): boolean => {
    return wishlistItems.some(item => item.book_id?._id === bookId);
  };

  useEffect(() => {
    if (userId) {
      fetchWishlist();
    } else {
      setWishlistItems([]);
      setWishlistCount(0);
    }
  }, [userId]);

  return (
    <WishlistContext.Provider value={{
      wishlistItems,
      wishlistCount,
      loading,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      fetchWishlist,
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};