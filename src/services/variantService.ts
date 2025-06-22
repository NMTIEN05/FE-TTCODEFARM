import axios from 'axios';
import { IProductVariant } from '../types/Book';

const API_BASE_URL = 'http://localhost:8888/api';

export const variantService = {
  getVariantsByBookId: async (bookId: string): Promise<IProductVariant[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/variants/book/${bookId}`);
      return response.data.data.data || [];
    } catch (error) {
      console.error('Lỗi khi lấy danh sách biến thể:', error);
      return [];
    }
  }
};