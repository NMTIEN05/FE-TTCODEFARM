import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ICategory } from '../../../types/Category';
import axios from 'axios';
import { CategoryCard } from './CategoryCard';

const Nav = () => {
  const [Category, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Trạng thái Đang Tải

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('http://localhost:8888/api/categories');
        const resData = response.data.data;
        if (Array.isArray(resData.data)) {
          setCategories(resData.data);
        } else {
          console.warn('Dữ liệu trả về không hợp lệ:', resData);
          setCategories([]);
        }
      } catch (error) {
        console.error('Lỗi khi gọi API danh mục:', error);
        setCategories([]);
      } finally {
        setLoading(false);  // Tắt trạng thái Đang Tải khi dữ liệu đã được lấy xong
      }
    })();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Đang tải...</div>;  // Trạng thái Đang Tải
  }

  return (
    <div className="mx-4 md:mx-20 lg:mx-40 mt-10 grid grid-cols-1 lg:grid-cols-7 gap-6">
      <div className="lg:col-span-2">
        <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-xl shadow-gray-100/50 overflow-hidden">
          <div className="p-4 md:p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Danh mục sản phẩm</h3>
            <ul className="space-y-1">
              {Category.map((item) => (
                <li key={item._id}>
                  <CategoryCard category={item} />
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-4 border-t border-gray-200">
              <Link
                to="/allproduct"
                className="block w-full text-center py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Xem tất cả sản phẩm
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-5 h-64 md:h-80 lg:h-full">
        <img
          src="https://static.vecteezy.com/system/resources/previews/021/916/224/non_2x/promo-banner-with-stack-of-books-globe-inkwell-quill-plant-lantern-ebook-world-book-day-bookstore-bookshop-library-book-lover-bibliophile-education-for-poster-cover-advertising-vector.jpg"
          alt="Banner"
          className="w-full h-full object-cover rounded-2xl shadow-2xl shadow-gray-200/50"
        />
      </div>
    </div>
  );
}

export default Nav;
