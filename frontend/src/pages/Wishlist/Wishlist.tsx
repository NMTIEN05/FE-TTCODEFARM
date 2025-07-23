import React from 'react';
import { useWishlist } from '../../providers/WishlistProvider';
import { CartButton } from '../../components/cart';
import WishlistButton from '../../components/wishlist/WishlistButton';
import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';

const Wishlist: React.FC = () => {
  const { wishlistItems, loading, removeFromWishlist } = useWishlist();
  const navigate = useNavigate();

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">Đang tải...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
        <Heart className="text-red-500" />
        Danh sách yêu thích ({wishlistItems.length})
      </h1>
      
      {wishlistItems.length === 0 ? (
        <div className="text-center py-20">
          <Heart className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h2 className="text-2xl font-bold mb-2">Chưa có sản phẩm yêu thích</h2>
          <p className="text-gray-600 mb-6">Hãy thêm sản phẩm vào danh sách yêu thích để xem ở đây</p>
          <button 
            onClick={() => navigate('/')}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
          >
            Khám phá sản phẩm
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.filter(item => item.book_id && item.book_id._id).map((item) => (
            <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={item.book_id?.cover_image || '/placeholder.jpg'}
                  alt={item.book_id?.title || 'Book'}
                  className="w-full h-64 object-cover cursor-pointer"
                  onClick={() => navigate(`/detail/${item.book_id._id}`)}
                />
                <WishlistButton
                  bookId={item.book_id._id}
                  className="!absolute !top-2 !right-2"
                />
              </div>
              
              <div className="p-4">
                <h3 
                  className="font-semibold text-lg mb-2 line-clamp-2 cursor-pointer hover:text-indigo-600"
                  onClick={() => navigate(`/detail/${item.book_id._id}`)}
                >
                  {item.book_id?.title || 'Untitled'}
                </h3>
                <p className="text-gray-600 mb-2">
                  Tác giả: {item.book_id?.author_id?.name || 'Chưa có thông tin'}
                </p>
                <p className="text-red-600 font-bold text-xl mb-4">
                  {item.book_id?.price ? item.book_id.price.toLocaleString('vi-VN') : '0'}đ
                </p>
                
                <div className="flex gap-2">
                  <CartButton 
                    bookId={item.book_id._id}
                    size="sm"
                    className="flex-1"
                  />
                  <button 
                    onClick={() => navigate(`/detail/${item.book_id._id}`)}
                    className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 transition-colors text-sm"
                  >
                    Chi tiết
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

export default Wishlist;