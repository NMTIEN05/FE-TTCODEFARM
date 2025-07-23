import axios from 'axios';
import { IWishlistRequest } from '../types/Wishlist';

const API_URL = 'http://localhost:3000/api/wishlist';

export const wishlistService = {
  // Thêm sách vào wishlist
  addToWishlist: async (data: IWishlistRequest) => {
    const response = await axios.post(API_URL, data);
    return response.data;
  },

  // Xóa sách khỏi wishlist
  removeFromWishlist: async (book_id: string, user_id: string) => {
    const response = await axios.delete(`${API_URL}/${book_id}`, {
      data: { book_id, user_id }
    });
    return response.data;
  }
};