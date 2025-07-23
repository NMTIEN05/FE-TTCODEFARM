import { useState, useEffect } from 'react';
import { flashSaleService, FlashSaleItem } from '../services/flashSale.service';

export const useFlashSale = () => {
  const [flashSaleItems, setFlashSaleItems] = useState<FlashSaleItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlashSaleItems = async () => {
      try {
        const items = await flashSaleService.getActiveFlashSaleProducts();
        setFlashSaleItems(items);
      } catch (error) {
        console.error('Error fetching flash sale items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlashSaleItems();
  }, []);

  const getProductDiscount = (productId: string): number => {
    const item = flashSaleItems.find(item => item.productId === productId);
    return item?.discountPercent || 0;
  };

  const isProductOnSale = (productId: string): boolean => {
    return getProductDiscount(productId) > 0;
  };

  const getSalePrice = (originalPrice: number, productId: string): number => {
    const discount = getProductDiscount(productId);
    return originalPrice * (1 - discount / 100);
  };

  return {
    flashSaleItems,
    loading,
    getProductDiscount,
    isProductOnSale,
    getSalePrice
  };
};