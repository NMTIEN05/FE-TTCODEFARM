import React from 'react'
import { Calendar, User, ArrowRight, BookOpen, TrendingUp, MessageCircle, Eye } from 'lucide-react'
import { Link } from 'react-router-dom'

type Props = {}

const Blog = (props: Props) => {
  const blogPosts = [
    {
      id: 1,
      title: '10 cuốn sách kinh điển mọi người nên đọc',
      excerpt: 'Khám phá những tác phẩm bất hủ đã định hình nên nền văn học thế giới và mang lại giá trị tinh thần sâu sắc.',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      author: 'Nguyễn Văn A',
      date: '15 Tháng 12, 2024',
      readTime: '5 phút',
      views: 1250,
      comments: 23,
      category: 'Văn học',
      featured: true
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
      category: 'Kỹ năng'
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
      category: 'Kinh doanh'
    }
  ]

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full text-sm font-medium text-blue-700 mb-4">
            <BookOpen className="w-4 h-4" />
            <span>Blog & Tin tức</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Khám phá thế giới sách</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Cập nhật những thông tin mới nhất về sách, tác giả và xu hướng đọc hiện đại
          </p>
        </div>

        {/* Featured Post */}
        <div className="mb-12">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="relative overflow-hidden">
                <img
                  src={blogPosts[0].image}
                  alt={blogPosts[0].title}
                  className="w-full h-full object-cover min-h-[300px] lg:min-h-[400px]"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {blogPosts[0].category}
                  </span>
                </div>
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{blogPosts[0].author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{blogPosts[0].date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{blogPosts[0].views.toLocaleString()}</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                  {blogPosts[0].title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {blogPosts[0].excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>{blogPosts[0].readTime} đọc</span>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>{blogPosts[0].comments} bình luận</span>
                    </div>
                  </div>
                  <Link
                    to={`/blog/${blogPosts[0].id}`}
                    className="group flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    <span>Đọc tiếp</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Other Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {blogPosts.slice(1).map((post) => (
            <article key={post.id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                </div>
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
                    <span>Đọc</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            to="/blog"
            className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
          >
            <TrendingUp className="w-5 h-5" />
            <span>Xem tất cả bài viết</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Blog