import React, { createContext, useContext, useEffect, useState } from 'react';
import { cartService } from '../services/cart.service';
import { ICartItem } from '../types/Cart';
import { getUser } from '../utils/auth';

interface CartContextType {
  cartItems: ICartItem[];
  totalPrice: number;
  cartCount: number;
  loading: boolean;
  addToCart: (bookId: string, quantity?: number, variantId?: string) => Promise<boolean>;
  updateQuantity: (itemId: string, newQty: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  fetchCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [cartCount, setCartCount] = useState<number>(0);
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

  const fetchCart = async () => {
    if (!userId) return;
    
    try {
      setLoading(true);
      const data = await cartService.getCart(userId);
      const items = data?.items || [];
      const filteredItems = items.filter((item: ICartItem) => item.book_id);
      
      setCartItems(filteredItems);
      setCartCount(filteredItems.reduce((sum, item) => sum + item.quantity, 0));
      
      const total = filteredItems.reduce(
        (sum: number, item: ICartItem) => sum + item.price * item.quantity,
        0
      );
      setTotalPrice(total);
    } catch (error) {
      console.error('Lỗi khi lấy giỏ hàng:', error);
      setCartItems([]);
      setCartCount(0);
      setTotalPrice(0);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (bookId: string, quantity: number = 1, variantId?: string): Promise<boolean> => {
    if (!userId) {
      throw new Error('Vui lòng đăng nhập để thêm vào giỏ hàng');
    }

    try {
      await cartService.addToCart(userId, bookId, quantity, variantId);
      await fetchCart();
      return true;
    } catch (error) {
      console.error('Lỗi khi thêm vào giỏ hàng:', error);
      throw error;
    }
  };

  const updateQuantity = async (itemId: string, newQty: number) => {
    if (newQty < 1) return;
    
    // Cập nhật UI ngay lập tức
    const updatedItems = cartItems.map(item => 
      item._id === itemId ? { ...item, quantity: newQty } : item
    );
    setCartItems(updatedItems);
    
    const newTotal = updatedItems.reduce(
      (sum: number, item: ICartItem) => sum + item.price * item.quantity,
      0
    );
    const newCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
    setTotalPrice(newTotal);
    setCartCount(newCount);
    
    try {
      await cartService.updateQuantity(itemId, newQty);
    } catch (error) {
      console.error('Lỗi khi cập nhật số lượng:', error);
      // Rollback nếu API thất bại
      await fetchCart();
    }
  };

  const removeItem = async (itemId: string) => {
    // Cập nhật UI ngay lập tức
    const updatedItems = cartItems.filter(item => item._id !== itemId);
    setCartItems(updatedItems);
    
    const newTotal = updatedItems.reduce(
      (sum: number, item: ICartItem) => sum + item.price * item.quantity,
      0
    );
    const newCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
    setTotalPrice(newTotal);
    setCartCount(newCount);
    
    try {
      await cartService.removeItem(itemId);
    } catch (error) {
      console.error('Lỗi khi xoá sản phẩm:', error);
      // Rollback nếu API thất bại
      await fetchCart();
      throw error;
    }
  };

  const clearCart = async () => {
    if (!userId) return;
    
    try {
      await cartService.clearCart(userId);
      setCartItems([]);
      setCartCount(0);
      setTotalPrice(0);
    } catch (error) {
      console.error('Lỗi khi xóa giỏ hàng:', error);
      throw error;
    }
  };

  useEffect(() => {
    if (userId) {
      fetchCart();
    } else {
      setCartItems([]);
      setCartCount(0);
      setTotalPrice(0);
    }
  }, [userId]);

  return (
    <CartContext.Provider value={{
      cartItems,
      totalPrice,
      cartCount,
      loading,
      addToCart,
      updateQuantity,
      removeItem,
      clearCart,
      fetchCart,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};