import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Ibook } from '../../../types/Book';
import { ICategory } from '../../../types/Category';
import { SimpleWishlistButton } from '../../../components/wishlist/SimpleWishlistButton';

const ProductByCategory: React.FC = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState<Ibook[]>([]);
  const [category, setCategory] = useState<ICategory | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch all products and category info
        const [productsRes, categoryRes] = await Promise.all([
          axios.get('http://localhost:8888/api/books?limit=0'),
          axios.get(`http://localhost:8888/api/categories/${categoryId}`)
        ]);

        // Filter products by category on client side
        if (productsRes.data?.data?.data) {
          const allProducts = productsRes.data.data.data;
          console.log('All products:', allProducts);
          console.log('Category ID to filter:', categoryId);
          
          const filteredProducts = allProducts.filter((book: Ibook) => {
            console.log('Book category_id:', book.category_id);
            if (typeof book.category_id === 'object' && book.category_id?._id) {
              return book.category_id._id === categoryId;
            }
            return book.category_id === categoryId;
          });
          
          console.log('Filtered products:', filteredProducts);
          setProducts(filteredProducts);
        }
        
        // Set category info
        if (categoryRes.data?.data?.data) {
          setCategory(categoryRes.data.data.data);
        } else if (categoryRes.data?.data) {
          setCategory(categoryRes.data.data);
        }
      } catch (error) {
        console.error('Error fetching category products:', error);
        setProducts([]);
        setCategory(null);
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) fetchData();
  }, [categoryId]);

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">Đang tải...</div>;
  }

  return (
    <div className="mx-4 md:mx-20 lg:mx-40 mt-10 mb-20">
      <div className="mb-8">
        <nav className="text-sm mb-4">
          <Link to="/" className="text-gray-500 hover:text-blue-600">Trang chủ</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{category?.name}</span>
        </nav>
        <h1 className="text-3xl font-bold text-gray-800">
          {category?.name} ({products.length} sản phẩm)
        </h1>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Không có sản phẩm nào trong danh mục này</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {products.map((book) => (
            <Link to={`/detail/${book._id}`} key={book._id}>
              <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
                <div className="absolute top-4 right-4 z-20">
                  <SimpleWishlistButton
                    bookId={book._id}
                    className="bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white"
                  />
                </div>
                
                <div className="relative overflow-hidden bg-gray-100 aspect-square">
                  <img
                    src={book.cover_image}
                    alt={book.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                <div className="p-4">
                  <h3 className="text-sm md:text-base font-bold text-gray-800 mb-2 line-clamp-2">
                    {book.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600 mb-2">
                    {book.author_id?.name || 'Chưa có thông tin'}
                  </p>
                  <p className="text-lg font-bold text-blue-600">
                    {book.price ? book.price.toLocaleString('vi-VN') : '0'}₫
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductByCategory;