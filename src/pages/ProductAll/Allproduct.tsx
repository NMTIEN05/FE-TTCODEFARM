import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Search, Grid, List, Star, Filter, ChevronDown } from 'lucide-react'
import { Ibook } from '../../types/Book'
import axios from 'axios'
import { SimpleWishlistButton } from '../../components/wishlist/SimpleWishlistButton'
import { CartButton } from '../../components/cart'

const Allproduct = () => {
  const [products, setProducts] = useState<Ibook[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Ibook[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('')
  const [priceRange, setPriceRange] = useState('')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await axios.get('http://localhost:8888/api/books?limit=0')

        if (response.data?.data?.data && Array.isArray(response.data.data.data)) {
          setProducts(response.data.data.data)
          setFilteredProducts(response.data.data.data)
        } else {
          setProducts([])
          setFilteredProducts([])
        }
      } catch (error) {
        console.error('Lỗi khi gọi API sản phẩm:', error)
        setProducts([])
        setFilteredProducts([])
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    applyFilters(term, sortBy, priceRange)
  }

  const applyFilters = (search: string, sort: string, price: string) => {
    let filtered = [...products]

    // Search filter
    if (search) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(search.toLowerCase())
      )
    }

    // Price filter
    if (price) {
      const [min, max] = price.split('-').map(Number)
      filtered = filtered.filter(product => 
        product.price && product.price >= min && product.price <= max
      )
    }

    // Sort
    switch (sort) {
      case 'price-asc':
        filtered.sort((a, b) => (a.price || 0) - (b.price || 0))
        break
      case 'price-desc':
        filtered.sort((a, b) => (b.price || 0) - (a.price || 0))
        break
      case 'name':
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
    }

    setFilteredProducts(filtered)
  }

  const handleSortChange = (value: string) => {
    setSortBy(value)
    applyFilters(searchTerm, value, priceRange)
  }

  const handlePriceChange = (value: string) => {
    setPriceRange(value)
    applyFilters(searchTerm, sortBy, value)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải sản phẩm...</p>
        </div>
      </div>
    )
  }

  // Grid Card Component
  const GridProductCard = ({ item }: { item: Ibook }) => (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
      <div className="relative">
        <Link to={`/detail/${item._id}`}>
          <div className="relative overflow-hidden bg-gray-100 aspect-[3/4]">
            <img
              src={item.cover_image}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </Link>
        <div className="absolute top-3 right-3">
          <SimpleWishlistButton
            bookId={item._id}
            className="bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white p-2 rounded-full"
          />
        </div>
      </div>
      <div className="p-4">
        <Link to={`/detail/${item._id}`}>
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
            {item.title}
          </h3>
        </Link>
        <div className="flex items-center gap-1 mb-3">
          {Array(5).fill(0).map((_, idx) => (
            <Star key={idx} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          ))}
          <span className="text-sm text-gray-500 ml-1">(4.8)</span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xl font-bold text-blue-600">
            {item.price?.toLocaleString('vi-VN') || '0'}đ
          </span>
        </div>
        <div onClick={(e) => e.preventDefault()}>
          <CartButton bookId={item._id} size="sm" className="w-full" />
        </div>
      </div>
    </div>
  )

  // List Card Component
  const ListProductCard = ({ item }: { item: Ibook }) => (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="flex gap-6 p-6">
        <Link to={`/detail/${item._id}`} className="flex-shrink-0">
          <div className="w-32 h-40 bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={item.cover_image}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <Link to={`/detail/${item._id}`}>
              <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                {item.title}
              </h3>
            </Link>
            <div className="flex items-center gap-1 mb-3">
              {Array(5).fill(0).map((_, idx) => (
                <Star key={idx} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="text-sm text-gray-500 ml-2">(4.8) • 124 đánh giá</span>
            </div>
            <p className="text-gray-600 line-clamp-2 mb-4">
              Mô tả ngắn về cuốn sách này và những giá trị mà nó mang lại cho độc giả.
            </p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold text-blue-600">
                {item.price?.toLocaleString('vi-VN') || '0'}đ
              </span>
              <SimpleWishlistButton
                bookId={item._id}
                className="p-2 rounded-full hover:bg-gray-100"
              />
            </div>
            <div onClick={(e) => e.preventDefault()}>
              <CartButton bookId={item._id} size="md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Tất cả sách</h1>
              <p className="text-gray-600 mt-1">{filteredProducts.length} sản phẩm</p>
            </div>
            {/* Search & Controls */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Tìm kiếm sách..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-80"
                />
              </div>
              {/* Filters */}
              <div className="flex gap-2">
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Sắp xếp</option>
                  <option value="name">Tên A-Z</option>
                  <option value="price-asc">Giá thấp → cao</option>
                  <option value="price-desc">Giá cao → thấp</option>
                </select>

                {/* Price Range */}
                <select
                  value={priceRange}
                  onChange={(e) => handlePriceChange(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Khoảng giá</option>
                  <option value="0-100000">Dưới 100k</option>
                  <option value="100000-300000">100k - 300k</option>
                  <option value="300000-500000">300k - 500k</option>
                  <option value="500000-999999999">Trên 500k</option>
                </select>

                {/* View Toggle */}
                <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'} transition-colors`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'} transition-colors`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Products */}
        <div>
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Không tìm thấy sản phẩm</h3>
              <p className="text-gray-600">Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc</p>
            </div>
          ) : (
            <div className={viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'space-y-6'
            }>
              {filteredProducts.map((item) =>
                viewMode === 'grid'
                  ? <GridProductCard key={item._id} item={item} />
                  : <ListProductCard key={item._id} item={item} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Allproduct
