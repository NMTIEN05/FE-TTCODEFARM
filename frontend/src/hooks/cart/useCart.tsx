import { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstant';
import { getUser } from '../../utils/auth';
import { ICartItem, ICartTotal } from '../../types/Cart';

export const useCart = () => {
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [cartCount, setCartCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const user = getUser();
  const userId = user?._id;

  const fetchCart = async () => {
    if (!userId) return;
    
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/api/cart/${userId}`);
      const items = res.data?.data?.data?.items || [];
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

  const addToCart = async (bookId: string, quantity: number = 1) => {
    if (!userId) {
      throw new Error('Vui lòng đăng nhập để thêm vào giỏ hàng');
    }

    try {
      await axiosInstance.post('/api/cart-add', {
        user_id: userId,
        book_id: bookId,
        quantity,
      });
      await fetchCart();
      return true;
    } catch (error) {
      console.error('Lỗi khi thêm vào giỏ hàng:', error);
      throw error;
    }
  };

  const updateQuantity = async (itemId: string, newQty: number) => {
    if (newQty < 1) return;
    
    try {
      // Cập nhật UI ngay lập tức
      const updatedItems = cartItems.map(item => 
        item._id === itemId ? { ...item, quantity: newQty } : item
      );
      setCartItems(updatedItems);
      
      // Cập nhật tổng tiền và số lượng
      const newTotal = updatedItems.reduce(
        (sum: number, item: ICartItem) => sum + item.price * item.quantity,
        0
      );
      const newCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      setTotalPrice(newTotal);
      setCartCount(newCount);
      
      // Gọi API
      await axiosInstance.put(`/api/cart-item/${itemId}`, {
        quantity: newQty,
      });
    } catch (error) {
      console.error('Lỗi khi cập nhật số lượng:', error);
      // Rollback nếu API thất bại
      await fetchCart();
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      await axiosInstance.delete(`/api/cart-item/${itemId}`);
      await fetchCart();
    } catch (error) {
      console.error('Lỗi khi xoá sản phẩm:', error);
      throw error;
    }
  };

  const clearCart = async () => {
    if (!userId) return;
    
    try {
      await axiosInstance.delete(`/api/cart/${userId}/clear`);
      setCartItems([]);
      setCartCount(0);
      setTotalPrice(0);
    } catch (error) {
      console.error('Lỗi khi xóa giỏ hàng:', error);
      throw error;
    }
  };

  const getCartTotal = async (): Promise<ICartTotal | null> => {
    if (!userId) return null;
    
    try {
      const res = await axiosInstance.get(`/api/cart/${userId}/total`);
      return res.data?.data?.data;
    } catch (error) {
      console.error('Lỗi khi lấy tổng giỏ hàng:', error);
      return null;
    }
  };

  const validateStock = async () => {
    if (!userId) return false;
    
    try {
      await axiosInstance.get(`/api/cart/${userId}/validate`);
      return true;
    } catch (error: any) {
      if (error.response?.status === 400) {
        throw new Error(error.response.data.message || 'Một số sản phẩm không đủ số lượng');
      }
      throw error;
    }
  };

  useEffect(() => {
    fetchCart();
  }, [userId]);

  return {
    cartItems,
    totalPrice,
    cartCount,
    loading,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    fetchCart,
    getCartTotal,
    validateStock,
  };
};