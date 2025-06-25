import React from 'react';
import { useFlashSale } from '../hooks/useFlashSale';

interface SaleTagProps {
  productId: string;
  className?: string;
}

const SaleTag: React.FC<SaleTagProps> = ({ productId, className = '' }) => {
  const { getProductDiscount, isProductOnSale } = useFlashSale();
  
  if (!isProductOnSale(productId)) {
    return null;
  }

  const discount = getProductDiscount(productId);

  return (
    <div className={`bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg ${className}`}>
      -{discount}%
    </div>
  );
};

export default SaleTag;