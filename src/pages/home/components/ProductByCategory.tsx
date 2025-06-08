import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

import ViewAllButton from './comon/Button';
import { Ibook } from '../../../types/Book';

const ProductByCategory = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [products, setProducts] = useState<Ibook[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Gọi API lấy sách theo category_id đúng backend
        const response = await axios.get(`http://localhost:8888/api/books?category_id=${categoryId}`);
        console.log('Dữ liệu sản phẩm theo danh mục:', response.data);

        // Kiểm tra dữ liệu trả về dạng phân trang với nested data
        if (
          response.data &&
          response.data.data &&
          Array.isArray(response.data.data.data)
        ) {
          setProducts(response.data.data.data); // Lấy mảng sản phẩm thật
          console.log('Sản phẩm theo danh mục:', response.data.data.data);
        } else {
          console.warn('Dữ liệu trả về không hợp lệ:', response.data);
          setProducts([]);
        }
      } catch (error) {
        console.error('Lỗi khi gọi API sản phẩm theo danh mục:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  if (loading) {
    return <div className="text-center mt-10">Đang tải...</div>;
  }

  return (
    <div className="ml-40 mr-40 mt-20 mb-20">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">Sản phẩm trong danh mục</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {products.length > 0 ? (
          products.map((item) => (
            <Link to={`/detail/${item._id}`} key={item._id}>
              <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden flex flex-col h-full">
                <div className="relative overflow-hidden bg-gray-100 aspect-square">
                  <img
                    src={item.cover_image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2 flex-grow">{item.title}</h3>

                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xl font-bold text-blue-600">{item.price.toLocaleString('vi-VN')}₫</span>
                    <span className="text-sm text-gray-400 line-through">
                      {(item.price * 1.12).toLocaleString('vi-VN')}₫
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center col-span-4">Không có sản phẩm nào trong danh mục này</div>
        )}
      </div>

      <ViewAllButton />
    </div>
  );
};

export default ProductByCategory;
