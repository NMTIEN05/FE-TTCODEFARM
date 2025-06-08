import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Nhập Link từ react-router-dom
import { ICategory } from '../../../types/Category';
import axios from 'axios';

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
    <div className="ml-40 mr-40 mt-10 grid grid-cols-1 lg:grid-cols-7 gap-6">
      {/* Menu Danh mục bên trái - Thiết kế Thẻ Hiện đại */}
      <div className="lg:col-span-2">
        <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-xl shadow-gray-100/50 overflow-hidden">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Danh mục sản phẩm</h3>
            <ul className="space-y-1">
              {Category.map((item) => (
                <li key={item._id}>
                  <Link
                    to={`/category/${item._id}`}  // Liên kết động đến trang danh mục
                    className="group flex items-center py-3 px-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-95"
                  >
                    <span className="text-gray-700 group-hover:text-gray-900 font-medium transition-colors duration-300">
                      {item.name}
                    </span>
                    <svg
                      className="ml-auto w-4 h-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Banner bên phải */}
      <div className="lg:col-span-5 h-full">
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
