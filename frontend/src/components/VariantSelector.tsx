import React from 'react';
import { IProductVariant } from '../types/Book';

interface VariantSelectorProps {
  variants: IProductVariant[];
  selectedVariant: IProductVariant | null;
  onVariantSelect: (variant: IProductVariant) => void;
}

const VariantSelector: React.FC<VariantSelectorProps> = ({
  variants,
  selectedVariant,
  onVariantSelect
}) => {
  const getFormatLabel = (format: string) => {
    const labels = {
      'hardcover': 'Bìa cứng',
      'paperback': 'Bìa mềm',
      'pdf': 'PDF'
    };
    return labels[format as keyof typeof labels] || format;
  };

  const getVariantInfo = (variant: IProductVariant) => {
    if (variant.format === 'pdf') {
      return `${variant.file_size}MB - ${variant.file_format}`;
    }
    return `${variant.pages} trang`;
  };

  if (!variants || variants.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-3">
        Chọn định dạng
      </label>
      <div className="grid grid-cols-1 gap-3">
        {variants.map((variant) => (
          <div
            key={variant._id}
            className={`border rounded-lg p-4 cursor-pointer transition-all ${
              selectedVariant?._id === variant._id
                ? 'border-indigo-500 bg-indigo-50'
                : 'border-gray-200 hover:border-gray-300'
            } ${!variant.is_available || variant.stock_quantity === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => {
              if (variant.is_available && variant.stock_quantity > 0) {
                onVariantSelect(variant);
              }
            }}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-900">
                    {getFormatLabel(variant.format)}
                  </span>
                  {!variant.is_available && (
                    <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                      Không khả dụng
                    </span>
                  )}
                  {variant.stock_quantity === 0 && variant.is_available && (
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                      Hết hàng
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {getVariantInfo(variant)}
                </p>
                {variant.stock_quantity > 0 && (
                  <p className="text-xs text-green-600 mt-1">
                    Còn lại: {variant.stock_quantity} sản phẩm
                  </p>
                )}
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-indigo-600">
                  {variant.price.toLocaleString('vi-VN')}đ
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VariantSelector;