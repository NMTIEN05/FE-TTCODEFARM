import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Ibook } from '../../types/Book';
import axios from 'axios';
import { SimpleWishlistButton } from '../../components/wishlist/SimpleWishlistButton';
import { ProductFilter } from '../../components/common/ProductFilter';

const Allproduct = () => {
  const [products, setProducts] = useState<Ibook[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Ibook[]>([]);
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
          setFilteredProducts(response.data.data.data);
        } else {
          setProducts([]);
          setFilteredProducts([]);
        }
      } catch (error) {
        console.error('Lỗi khi gọi API sản phẩm:', error);
        setProducts([]);
        setFilteredProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleFilterChange = (filters: { category: string; priceRange: string; sortBy: string }) => {
    let filtered = [...products];

    // Filter by category
    if (filters.category) {
      filtered = filtered.filter(product => 
        product.category_id && typeof product.category_id === 'object' && product.category_id._id === filters.category
      );
    }

    // Filter by price range
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter(product => 
        product.price && product.price >= min && product.price <= max
      );
    }

    // Sort products
    switch (filters.sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case 'price-desc':
        filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case 'name':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  };

  if (loading) {
    return <div className="text-center mt-10">Đang tải...</div>;
  }

  return (
    <div className="mx-4 md:mx-20 lg:mx-40 mt-10 md:mt-20 mb-10 md:mb-20">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">
        Tất cả sản phẩm ({filteredProducts.length})
      </h2>
      
      <ProductFilter onFilterChange={handleFilterChange} />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8">
        {filteredProducts.map((item) => (
          <Link to={`/detail/${item._id}`} key={item._id}>
            <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden flex flex-col h-full min-h-[460px]">
              <div className="absolute top-4 right-4 z-20">
                <SimpleWishlistButton
                  bookId={item._id}
                  className="bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white"
                />
              </div>
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
                    {item.price ? item.price.toLocaleString('vi-VN') : '0'}₫
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    {item.price ? (item.price * 1.12).toLocaleString('vi-VN') : '0'}₫
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>


    </div>
  );
};

export default Allproduct;
