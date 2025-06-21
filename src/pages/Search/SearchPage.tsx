import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Ibook } from '../../types/Book';
import { SimpleWishlistButton } from '../../components/wishlist/SimpleWishlistButton';

export const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<Ibook[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const searchBooks = async () => {
      if (!query.trim()) return;
      
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:8888/api/books?search=${encodeURIComponent(query)}`);
        if (response.data?.data?.data) {
          setResults(response.data.data.data);
        }
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    searchBooks();
  }, [query]);

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">Đang tìm kiếm...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        Kết quả tìm kiếm cho: "{query}"
      </h1>
      
      {results.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Không tìm thấy sản phẩm nào</p>
        </div>
      ) : (
        <>
          <p className="text-gray-600 mb-6">Tìm thấy {results.length} sản phẩm</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {results.map((book) => (
              <Link to={`/detail/${book._id}`} key={book._id}>
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={book.cover_image}
                      alt={book.title}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <SimpleWishlistButton
                        bookId={book._id}
                        className="bg-white/90 shadow-md"
                      />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">{book.title}</h3>
                    <p className="text-gray-600 mb-2">Tác giả: {book.author_id?.name || 'Chưa có thông tin'}</p>
                    <p className="text-red-600 font-bold">
                      {book.price ? book.price.toLocaleString('vi-VN') : '0'}đ
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
};