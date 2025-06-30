import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Search, Grid, List, Star, Filter, SlidersHorizontal, X } from 'lucide-react'
import axios from 'axios'
import { Ibook } from '../../types/Book'
import { SimpleWishlistButton } from '../../components/wishlist/SimpleWishlistButton'
import { CartButton } from '../../components/cart'

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  
  const [products, setProducts] = useState<Ibook[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Ibook[]>([])
  const [loading, setLoading] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('')
  const [priceRange, setPriceRange] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    if (query) {
      searchProducts(query)
    }
  }, [query])

  const searchProducts = async (searchQuery: string) => {
    setLoading(true)
    console.log('Searching for:', searchQuery)
    
    try {
      const response = await axios.get(`http://localhost:8888/api/books/search?q=${encodeURIComponent(searchQuery)}&limit=50`)
      console.log('Search response:', response.data)
      
      if (response.data?.data?.data && Array.isArray(response.data.data.data) && response.data.data.data.length > 0) {
        console.log('Found products:', response.data.data.data.length)
        setProducts(response.data.data.data)
        setFilteredProducts(response.data.data.data)
        setLoading(false)
        return
      }
    } catch (error) {
      console.error('Search endpoint error:', error)
    }
    
    try {
      console.log('Trying fallback with books endpoint')
      const fallbackResponse = await axios.get(`http://localhost:8888/api/books?search=${encodeURIComponent(searchQuery)}&limit=50`)
      console.log('Fallback response:', fallbackResponse.data)
      
      if (fallbackResponse.data?.data?.data && Array.isArray(fallbackResponse.data.data.data)) {
        console.log('Found products in fallback:', fallbackResponse.data.data.data.length)
        setProducts(fallbackResponse.data.data.data)
        setFilteredProducts(fallbackResponse.data.data.data)
        setLoading(false)
        return
      }
    } catch (fallbackError) {
      console.error('Fallback error:', fallbackError)
    }
    
    console.log('No results found, setting empty arrays')
    setProducts([])
    setFilteredProducts([])
    setLoading(false)
  }

  const applyFilters = (sort: string, price: string) => {
    let filtered = [...products]

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
      case 'relevance':
      default:
        // Keep original order (most relevant first)
        break
    }

    setFilteredProducts(filtered)
  }

  const handleSortChange = (value: string) => {
    setSortBy(value)
    applyFilters(value, priceRange)
  }

  const handlePriceChange = (value: string) => {
    setPriceRange(value)
    applyFilters(sortBy, value)
  }

  const clearFilters = () => {
    setSortBy('')
    setPriceRange('')
    setFilteredProducts(products)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tìm kiếm...</p>
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
          <div className="flex flex-col gap-4">
            {/* Search Info */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Kết quả tìm kiếm cho "{query}"
              </h1>
              <p className="text-gray-600 mt-1">
                {filteredProducts.length} sản phẩm được tìm thấy
              </p>
            </div>

            {/* Controls */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Filter Toggle - Mobile */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Bộ lọc
              </button>

              {/* Filters - Desktop */}
              <div className={`flex flex-col sm:flex-row gap-4 ${showFilters ? 'block' : 'hidden lg:flex'}`}>
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Sắp xếp theo</option>
                  <option value="relevance">Liên quan nhất</option>
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

                {/* Clear Filters */}
                {(sortBy || priceRange) && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Xóa bộ lọc
                  </button>
                )}
              </div>

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

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Results */}
        <div>
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Không tìm thấy sản phẩm nào
              </h3>
              <p className="text-gray-600 mb-6">
                Thử tìm kiếm với từ khóa khác hoặc thay đổi bộ lọc
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="text-sm text-gray-500">Gợi ý:</span>
                {['Sách kinh tế', 'Tiểu thuyết', 'Sách thiếu nhi'].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setSearchParams({ q: suggestion })}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
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

export default SearchResults