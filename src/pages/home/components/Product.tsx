import { StarFilled } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import ViewAllButton from './comon/Button';
import { Link } from 'react-router-dom';
import { Ibook } from '../../../types/Book';
import axios from 'axios';
import WishlistButton from '../../../components/wishlist/WishlistButton';
import { CartButton } from '../../../components/cart';
import { useFlashSale } from '../../../hooks/useFlashSale';

type Props = {}

const Product = (props: Props) => {
  const [book, setBook] = useState<Ibook[]>([]);
  const { getProductDiscount, isProductOnSale, getSalePrice } = useFlashSale();

useEffect(() => {
  (async () => {
    try {
      const { data } = await axios.get(`http://localhost:8888/api/books`);
      if (Array.isArray(data.data.data)) {
        setBook(data.data.data);
      } else {
        console.warn('Dữ liệu trả về không hợp lệ:', data);
        setBook([]);
      }
    } catch (error) {
      console.error('Lỗi khi gọi API sách:', error);
      setBook([]);
    }
  })();
}, []);


  return (
    <div className="mx-4 md:mx-20 lg:mx-40 mt-10 md:mt-20 mb-10 md:mb-20">
      <div className="mt-8 mb-10">
        <h2 className="relative inline-block text-2xl md:text-3xl font-bold text-gray-800 before:content-[''] before:inline-block before:mr-4 before:w-1 before:h-6 before:bg-red-500 align-middle">
          Tất cả sản phẩm của chúng tôi
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8">
  {book.map((item) => (
    <Link to={`/detail/${item._id}`} key={item._id}>
      <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden h-full flex flex-col">
        {/* Discount Badge */}
        {isProductOnSale(item._id) && (
          <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
            -{getProductDiscount(item._id)}%
          </div>
        )}

        {/* Favorite Button */}
        <WishlistButton bookId={item._id} />

        {/* Image Container */}
        <div className="relative overflow-hidden bg-gray-100 aspect-square">
          <img
            src={item.cover_image}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>

        {/* Product Info - Flex grow để chiếm hết không gian còn lại */}
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2 flex-grow">
            {item.title}
          </h3>

          {/* Price - Luôn ở dưới cùng */}
          <div className="flex items-center gap-3 mb-4">
            {isProductOnSale(item._id) ? (
              <>
                <span className="text-xl font-bold text-blue-600">
                  {getSalePrice(item.price, item._id).toLocaleString('vi-VN')}₫
                </span>
                <span className="text-sm text-gray-400 line-through">
                  {item.price.toLocaleString('vi-VN')}₫
                </span>
              </>
            ) : (
              <span className="text-xl font-bold text-blue-600">
                {item.price ? item.price.toLocaleString('vi-VN') : '0'}₫
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {Array(5)
                .fill(0)
                .map((_, idx) => (
                  <StarFilled
                    key={idx}
                    className="text-yellow-400"
                    style={{ fontSize: 16 }}
                  />
                ))}
            </div>
            <span className="text-sm text-gray-500">(124 đánh giá)</span>
          </div>

          {/* Add to Cart Button */}
          <div className="mt-auto" onClick={(e) => e.preventDefault()}>
            <CartButton 
              bookId={item._id} 
              size="sm" 
              className="w-full"
            />
          </div>
        </div>
      </div>
    </Link>
  ))}
</div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <ViewAllButton text="Xem tất cả sản phẩm" to="/allproduct" />
        <ViewAllButton text="Sản phẩm yêu thích" to="/wishlist" />
      </div>
    </div>
  );
};

export default Product;
