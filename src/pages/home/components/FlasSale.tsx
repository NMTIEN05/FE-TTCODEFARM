import { StarFilled } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import ViewAllButton from './comon/Button'
import { Link } from 'react-router-dom';
import { Ibook } from '../../../types/Book';
import axios from 'axios';
import { SimpleWishlistButton } from '../../../components/wishlist/SimpleWishlistButton';

type Props = {}

interface FlashSaleItem {
  _id: string;
  discountPercent: number;
  productId: Ibook;
  flashSaleId: {
    _id: string;
    name: string;
    endDate: string;
  };
}

const FlasSale = (props: Props) => {
  const [flashSaleItems, setFlashSaleItems] = useState<FlashSaleItem[]>([]);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const fetchFlashSaleProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:8888/api/flashsales/active-products');
        if (data?.results) {
          setFlashSaleItems(data.results);
          
          // Set countdown based on first flash sale end date
          if (data.results.length > 0) {
            const endDate = new Date(data.results[0].flashSaleId.endDate);
            const now = new Date();
            const diff = endDate.getTime() - now.getTime();
            
            if (diff > 0) {
              const hours = Math.floor(diff / (1000 * 60 * 60));
              const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
              const seconds = Math.floor((diff % (1000 * 60)) / 1000);
              setTimeLeft({ hours, minutes, seconds });
            }
          }
        }
      } catch (error) {
        console.error('Error fetching flash sale products:', error);
      }
    };
    fetchFlashSaleProducts();

    // Countdown timer
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mx-4 md:mx-20 lg:mx-40 mt-10 min-h-screen bg-gradient-to-br from-red-500 via-orange-400 to-yellow-300 p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flash-sale-title flex items-center gap-3">
          <svg className="flash-icon w-6 h-6 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 2v11h3v9l7-12h-4l3-8z" />
          </svg>
          <div className="title-text">
            <h2 className="text-3xl font-extrabold text-red-700">FLASH SALE</h2>
            <p className="text-sm text-red-800/80 italic">Siêu khuyến mãi - Số lượng có hạn</p>
          </div>
        </div>

        <div className="flex items-center w-auto h-10 bg-red-600 text-white px-4 py-1 rounded-lg font-mono text-sm select-none">
          <span>{String(timeLeft.hours).padStart(2, '0')}</span>:
          <span>{String(timeLeft.minutes).padStart(2, '0')}</span>:
          <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {flashSaleItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-white text-lg">Hiện tại không có flash sale nào đang diễn ra</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {flashSaleItems.map((item) => {
              const book = item.productId;
              const salePrice = book.price * (1 - item.discountPercent / 100);
              
              return (
                <div key={item._id} className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
                  <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                    -{item.discountPercent}%
                  </div>

                  <div className="absolute top-4 right-4 z-20" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
                    <SimpleWishlistButton
                      bookId={book._id}
                      className="p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white"
                    />
                  </div>

                  <Link to={`/detail/${book._id}`}>

                    <div className="relative overflow-hidden bg-gray-100 aspect-square">
                      <img
                        src={book.cover_image}
                        alt={book.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>

                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2">
                        {book.title}
                      </h3>

                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-xl font-bold text-blue-600">
                          {salePrice.toLocaleString('vi-VN')}₫
                        </span>
                        <span className="text-sm text-gray-400 line-through">
                          {book.price.toLocaleString('vi-VN')}₫
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[1,2,3,4,5].map(star => (
                            <StarFilled key={star} className="text-yellow-400" style={{ fontSize: 16 }} />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">(124 đánh giá)</span>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
        <div className="flex justify-center mt-8">
          <ViewAllButton/>
        </div>
      </div>
    </div>
  )
}

export default FlasSale