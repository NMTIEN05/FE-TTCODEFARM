import React, { useEffect, useState } from 'react';
import { SimpleWishlistButton } from '../../components/wishlist/SimpleWishlistButton';
import { Ibook } from '../../types/Book';
import { useWishlistStore } from '../../stores/wishlist.store';
import axios from 'axios';

export const Wishlist: React.FC = () => {
  const userId = '123';
  const { wishlistItems } = useWishlistStore();
  const [wishlistBooks, setWishlistBooks] = useState<Ibook[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlistBooks = async () => {
      console.log('Fetching wishlist books for items:', wishlistItems);
      
      if (wishlistItems.length === 0) {
        console.log('No wishlist items, showing empty state');
        setWishlistBooks([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const books = [];
        
        for (const bookId of wishlistItems) {
          try {
            console.log('Fetching book with ID:', bookId);
            const response = await axios.get(`http://localhost:8888/api/books/${bookId}`);
            console.log('Book response:', response.data);
            
            // Handle different response structures
            let book;
            if (response.data.data?.data) {
              book = response.data.data.data;
            } else if (response.data.data) {
              book = response.data.data;
            } else {
              book = response.data;
            }
            
            if (book && book._id) {
              books.push(book);
              console.log('Added book to wishlist:', book.title);
            }
          } catch (bookError) {
            console.error(`Error fetching book ${bookId}:`, bookError);
          }
        }
        
        console.log('Final wishlist books:', books);
        setWishlistBooks(books);
      } catch (error) {
        console.error('Error in fetchWishlistBooks:', error);
        setWishlistBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlistBooks();
  }, [wishlistItems]);

  console.log('=== WISHLIST DEBUG ===');
  console.log('Wishlist items from store:', wishlistItems);
  console.log('Wishlist books state:', wishlistBooks);
  console.log('Loading state:', loading);
  console.log('=====================');

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">Đang tải...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Danh sách yêu thích</h1>
      
      {wishlistBooks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">Chưa có sản phẩm nào trong danh sách yêu thích</p>
          <p className="text-sm text-gray-400 mb-4">Số lượng trong store: {wishlistItems.length}</p>
          <button 
            onClick={() => {
              console.log('Current wishlist store:', wishlistItems);
              alert(`Wishlist store có ${wishlistItems.length} items: ${wishlistItems.join(', ')}`);
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Kiểm tra Store
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistBooks.map((book) => (
            <div key={book._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative">
                <img
                  src={book.cover_image}
                  alt={book.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-2 right-2">
                  <SimpleWishlistButton
                    bookId={book._id}
                    className="bg-white shadow-md"
                  />
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">{book.title}</h3>
                <p className="text-gray-600 mb-2">Tác giả: {book.author_id?.name || 'Chưa có thông tin'}</p>
                <p className="text-red-600 font-bold text-xl">
                  {book.price ? book.price.toLocaleString('vi-VN') : '0'}đ
                </p>
                
                <div className="mt-4 flex gap-2">
                  <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
                    Thêm vào giỏ
                  </button>
                  <button className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 transition-colors">
                    Xem chi tiết
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};