import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Ibook } from '../../types/Book';
import ViewAllButton from '../home/components/comon/Button';
import axios from 'axios';

const Allproduct = () => {
  const [products, setProducts] = useState<Ibook[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8888/api/books?limit=0');

        if (
          response.data &&
          response.data.data &&
          Array.isArray(response.data.data.data)
        ) {
          setProducts(response.data.data.data);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error('Lỗi khi gọi API sản phẩm:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Đang tải...</div>;
  }

  return (
    <div className="ml-40 mr-40 mt-20 mb-20">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">
        Tất cả sản phẩm
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {products.map((item) => (
          <Link to={`/detail/${item._id}`} key={item._id}>
            <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden flex flex-col h-full min-h-[460px]">
              <div className="relative overflow-hidden bg-gray-100 aspect-square">
                <img
                  src={item.cover_image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              <div className="p-6 flex flex-col flex-grow justify-between">
                <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2 min-h-[48px]">
                  {item.title}
                </h3>

                {/* 5 sao mặc định */}
                <div className="flex items-center gap-1 text-yellow-400 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="w-4 h-4 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09L5.5 12.545.122 8.91l6.09-.545L10 3l3.788 5.365 6.09.545-5.378 3.635 1.378 5.545z" />
                    </svg>
                  ))}
                </div>

                <div className="flex items-center gap-3 mt-auto">
                  <span className="text-xl font-bold text-blue-600">
                    {item.price.toLocaleString('vi-VN')}₫
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    {(item.price * 1.12).toLocaleString('vi-VN')}₫
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10">
        <ViewAllButton />
      </div>
    </div>
  );
};

export default Allproduct;
