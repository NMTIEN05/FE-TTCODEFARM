import axios from 'axios';

const API_BASE_URL = 'http://localhost:8888/api';

export interface FlashSaleItem {
  _id: string;
  discountPercent: number;
  productId: string;
  flashSaleId: {
    _id: string;
    name: string;
    startDate: string;
    endDate: string;
  };
}

export const flashSaleService = {
  getActiveFlashSaleProducts: async (): Promise<FlashSaleItem[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/flashsales/active-products`);
      return response.data?.results || [];
    } catch (error) {
      console.error('Error fetching active flash sale products:', error);
      return [];
    }
  },

  getProductDiscount: async (productId: string): Promise<number> => {
    try {
      const activeProducts = await flashSaleService.getActiveFlashSaleProducts();
      const flashSaleItem = activeProducts.find(item => item.productId === productId);
      return flashSaleItem?.discountPercent || 0;
    } catch (error) {
      console.error('Error getting product discount:', error);
      return 0;
    }
  }
};