import React, { useState } from 'react'
import { Calendar, User, ArrowRight, BookOpen, TrendingUp, MessageCircle, Eye, Search, Tag } from 'lucide-react'
import { Link } from 'react-router-dom'

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'Tất cả', count: 15 },
    { id: 'literature', name: 'Văn học', count: 5 },
    { id: 'business', name: 'Kinh doanh', count: 4 },
    { id: 'skills', name: 'Kỹ năng', count: 3 },
    { id: 'lifestyle', name: 'Lối sống', count: 3 }
  ]

  const blogPosts = [
    {
      id: 1,
      title: '10 cuốn sách kinh điển mọi người nên đọc',
      excerpt: 'Khám phá những tác phẩm bất hủ đã định hình nên nền văn học thế giới và mang lại giá trị tinh thần sâu sắc cho độc giả qua nhiều thế hệ.',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      author: 'Nguyễn Văn A',
      date: '15 Tháng 12, 2024',
      readTime: '5 phút',
      views: 1250,
      comments: 23,
      category: 'literature',
      categoryName: 'Văn học',
      featured: true,
      tags: ['Kinh điển', 'Văn học', 'Đọc sách']
    },
    {
      id: 2,
      title: 'Cách xây dựng thói quen đọc sách hiệu quả',
      excerpt: 'Những phương pháp khoa học giúp bạn duy trì việc đọc sách hàng ngày và tận hưởng tri thức một cách tối đa.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      author: 'Trần Thị B',
      date: '12 Tháng 12, 2024',
      readTime: '7 phút',
      views: 890,
      comments: 15,
      category: 'skills',
      categoryName: 'Kỹ năng',
      tags: ['Thói quen', 'Kỹ năng', 'Hiệu quả']
    },
    {
      id: 3,
      title: 'Xu hướng sách kinh doanh 2024',
      excerpt: 'Tổng quan về những đầu sách kinh doanh được quan tâm nhất trong năm và những bài học quý giá từ chúng.',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      author: 'Lê Văn C',
      date: '10 Tháng 12, 2024',
      readTime: '6 phút',
      views: 1100,
      comments: 31,
      category: 'business',
      categoryName: 'Kinh doanh',
      tags: ['Kinh doanh', 'Xu hướng', '2024']
    },
    {
      id: 4,
      title: 'Nghệ thuật đọc nhanh và ghi nhớ hiệu quả',
      excerpt: 'Khám phá các kỹ thuật đọc nhanh và phương pháp ghi nhớ thông tin từ sách một cách bền vững.',
      image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      author: 'Phạm Thị D',
      date: '8 Tháng 12, 2024',
      readTime: '8 phút',
      views: 750,
      comments: 18,
      category: 'skills',
      categoryName: 'Kỹ năng',
      tags: ['Đọc nhanh', 'Ghi nhớ', 'Kỹ thuật']
    },
    {
      id: 5,
      title: 'Tác động của việc đọc sách đến sức khỏe tinh thần',
      excerpt: 'Nghiên cứu khoa học về lợi ích của việc đọc sách đối với sức khỏe tâm lý và phát triển cá nhân.',
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      author: 'Hoàng Văn E',
      date: '5 Tháng 12, 2024',
      readTime: '6 phút',
      views: 920,
      comments: 25,
      category: 'lifestyle',
      categoryName: 'Lối sống',
      tags: ['Sức khỏe', 'Tinh thần', 'Lợi ích']
    },
    {
      id: 6,
      title: 'Cách chọn sách phù hợp với từng độ tuổi',
      excerpt: 'Hướng dẫn chi tiết về việc lựa chọn sách phù hợp cho trẻ em, thanh thiếu niên và người lớn.',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      author: 'Nguyễn Thị F',
      date: '3 Tháng 12, 2024',
      readTime: '5 phút',
      views: 680,
      comments: 12,
      category: 'lifestyle',
      categoryName: 'Lối sống',
      tags: ['Chọn sách', 'Độ tuổi', 'Hướng dẫn']
    }
  ]

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <BookOpen className="w-4 h-4" />
              <span>Blog & Tin tức</span>
            </div>
            <h1 className="text-4xl font-bold mb-4">Khám phá thế giới sách</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Cập nhật những thông tin mới nhất về sách, tác giả và xu hướng đọc hiện đại
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Search & Filter */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Tìm kiếm bài viết..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-8">
          <p className="text-gray-600">
            Hiển thị {filteredPosts.length} bài viết
            {searchTerm && ` cho "${searchTerm}"`}
            {selectedCategory !== 'all' && ` trong danh mục "${categories.find(c => c.id === selectedCategory)?.name}"`}
          </p>
        </div>

        {/* Blog Posts Grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Không tìm thấy bài viết</h3>
            <p className="text-gray-600">Thử thay đổi từ khóa tìm kiếm hoặc danh mục</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article key={post.id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                      {post.categoryName}
                    </span>
                  </div>
                  {post.featured && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        Nổi bật
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.map((tag, index) => (
                      <span key={index} className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        <Tag className="w-2 h-2" />
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>{post.readTime}</span>
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        <span>{post.views}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-3 h-3" />
                        <span>{post.comments}</span>
                      </div>
                    </div>
                    <Link
                      to={`/blog/${post.id}`}
                      className="group flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-sm"
                    >
                      <span>Đọc tiếp</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {filteredPosts.length > 0 && (
          <div className="text-center mt-12">
            <button className="inline-flex items-center gap-2 bg-white text-gray-700 px-8 py-3 rounded-xl font-medium border border-gray-300 hover:bg-gray-50 transition-colors">
              <TrendingUp className="w-5 h-5" />
              <span>Tải thêm bài viết</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default BlogPage