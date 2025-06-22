import axiosInstance from '../utils/axiosInstant';
import { ICartResponse, ICartTotal } from '../types/Cart';

export const cartService = {
  // Lấy giỏ hàng
  getCart: async (userId: string): Promise<ICartResponse> => {
    const response = await axiosInstance.get(`/api/cart/${userId}`);
    return response.data?.data?.data;
  },

  // Thêm sản phẩm vào giỏ
  addToCart: async (userId: string, bookId: string, quantity: number = 1, variantId?: string) => {
    const requestData: any = {
      user_id: userId,
      book_id: bookId,
      quantity,
    };
    
    if (variantId) {
      requestData.variant_id = variantId;
    }
    
    const response = await axiosInstance.post('/api/cart-add', requestData);
    return response.data;
  },

  // Cập nhật số lượng
  updateQuantity: async (itemId: string, quantity: number) => {
    const response = await axiosInstance.put(`/api/cart-item/${itemId}`, {
      quantity,
    });
    return response.data;
  },

  // Xóa sản phẩm
  removeItem: async (itemId: string) => {
    const response = await axiosInstance.delete(`/api/cart-item/${itemId}`);
    return response.data;
  },

  // Xóa toàn bộ giỏ hàng
  clearCart: async (userId: string) => {
    const response = await axiosInstance.delete(`/api/cart/${userId}/clear`);
    return response.data;
  },

  // Lấy tổng giá trị giỏ hàng
  getCartTotal: async (userId: string): Promise<ICartTotal> => {
    const response = await axiosInstance.get(`/api/cart/${userId}/total`);
    return response.data?.data?.data;
  },

  // Kiểm tra tồn kho
  validateStock: async (userId: string) => {
    const response = await axiosInstance.get(`/api/cart/${userId}/validate`);
    return response.data;
  },
};