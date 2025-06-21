import React from 'react'
import { Star, ThumbsUp, ThumbsDown, Reply, Flag, MoreHorizontal, Filter } from 'lucide-react';
import Button from '../../home/components/comon/Button';

type Props = {}

const Commet = (props: Props) => {
    const rating: number = parseFloat("4.8"); // ✅ chuyển string sang number

    return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Comment Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Đánh giá & Bình luận
          <span className="text-lg font-normal text-gray-500 ml-2">(245)</span>
        </h2>
        
     
      </div>

      {/* Rating Summary */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-indigo-600 mb-2">4.8</div>
            <div className="flex items-center justify-center mb-2">
              <Star className="h-6 w-6 text-yellow-400 fill-current" />
              <Star className="h-6 w-6 text-yellow-400 fill-current" />
              <Star className="h-6 w-6 text-yellow-400 fill-current" />
              <Star className="h-6 w-6 text-yellow-400 fill-current" />
              <Star className="h-6 w-6 text-yellow-400 fill-current" />
            </div>
            <p className="text-gray-600">245 đánh giá</p>
          </div>
          
          
        </div>
      </div>

      {/* Write Comment */}
      <div className="bg-white border rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">Viết đánh giá</h3>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Đánh giá của bạn</label>
          <div className="flex items-center space-x-1">
            <Star className="h-8 w-8 text-gray-300 hover:text-yellow-400 cursor-pointer" />
            <Star className="h-8 w-8 text-gray-300 hover:text-yellow-400 cursor-pointer" />
            <Star className="h-8 w-8 text-gray-300 hover:text-yellow-400 cursor-pointer" />
            <Star className="h-8 w-8 text-gray-300 hover:text-yellow-400 cursor-pointer" />
            <Star className="h-8 w-8 text-gray-300 hover:text-yellow-400 cursor-pointer" />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Tiêu đề</label>
          <input 
            type="text" 
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Tóm tắt đánh giá của bạn..."
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Chi tiết đánh giá</label>
          <textarea 
          
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm này..."
          ></textarea>
        </div>
        
        <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 font-medium">
          Gửi đánh giá
        </button>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {/* Comment 1 */}
        <div className="bg-white border rounded-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-medium">
                A
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Nguyễn Văn A</h4>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  </div>
                  <span className="text-sm text-gray-500">• 2 ngày trước</span>
                </div>
              </div>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </div>

          <h5 className="font-medium text-gray-900 mb-2">Cuốn sách tuyệt vời, rất bổ ích!</h5>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Tôi đã đọc xong cuốn sách này và thực sự rất ấn tượng. Nội dung được trình bày một cách dễ hiểu, 
            có nhiều ví dụ thực tế giúp người đọc dễ dàng áp dụng vào cuộc sống. Đặc biệt là những nguyên tắc 
            về giao tiếp và ứng xử rất hữu ích.
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 text-gray-500 hover:text-indigo-600">
                <ThumbsUp className="h-4 w-4" />
                <span className="text-sm">24</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-500 hover:text-red-600">
                <ThumbsDown className="h-4 w-4" />
                <span className="text-sm">1</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-500 hover:text-indigo-600">
                <Reply className="h-4 w-4" />
                <span className="text-sm">Trả lời</span>
              </button>
            </div>
            <button className="flex items-center space-x-2 text-gray-500 hover:text-red-600">
              <Flag className="h-4 w-4" />
              <span className="text-sm">Báo cáo</span>
            </button>
          </div>

          {/* Reply */}
          <div className="mt-4 pl-8 border-l-2 border-gray-100">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                  S
                </div>
                <div>
                  <h5 className="font-medium text-gray-900 text-sm">BookStore Admin</h5>
                  <span className="text-xs text-gray-500">1 ngày trước</span>
                </div>
              </div>
              <p className="text-sm text-gray-700">
                Cảm ơn bạn đã đánh giá và chia sẻ! Chúng tôi rất vui khi biết bạn hài lòng với sản phẩm. 
                Hãy tiếp tục theo dõi để nhận được thông tin về những cuốn sách mới nhé! 📚
              </p>
            </div>
          </div>
        </div>

        {/* Comment 2 */}
        <div className="bg-white border rounded-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                B
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Trần Thị B</h4>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <Star className="h-4 w-4 text-gray-300" />
                  </div>
                  <span className="text-sm text-gray-500">• 5 ngày trước</span>
                </div>
              </div>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </div>

          <h5 className="font-medium text-gray-900 mb-2">Nội dung hay nhưng hơi dài dòng</h5>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Cuốn sách có nội dung tốt và nhiều bài học quý giá. Tuy nhiên, một số phần hơi lặp lại và dài dòng. 
            Nhìn chung vẫn đáng đọc, nhất là cho những người mới bắt đầu tìm hiểu về kỹ năng giao tiếp.
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 text-gray-500 hover:text-indigo-600">
                <ThumbsUp className="h-4 w-4" />
                <span className="text-sm">12</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-500 hover:text-red-600">
                <ThumbsDown className="h-4 w-4" />
                <span className="text-sm">0</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-500 hover:text-indigo-600">
                <Reply className="h-4 w-4" />
                <span className="text-sm">Trả lời</span>
              </button>
            </div>
            <button className="flex items-center space-x-2 text-gray-500 hover:text-red-600">
              <Flag className="h-4 w-4" />
              <span className="text-sm">Báo cáo</span>
            </button>
          </div>
        </div>

        {/* Comment 3 */}
        <div className="bg-white border rounded-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-medium">
                C
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Lê Văn C</h4>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <Star className="h-4 w-4 text-gray-300" />
                    <Star className="h-4 w-4 text-gray-300" />
                  </div>
                  <span className="text-sm text-gray-500">• 1 tuần trước</span>
                </div>
              </div>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </div>

          <h5 className="font-medium text-gray-900 mb-2">Đáng đọc cho người mới bắt đầu</h5>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Đây là cuốn sách rất phù hợp cho người mới bắt đầu. Ngôn ngữ đơn giản, dễ hiểu. 
            Tác giả đã truyền đạt những kiến thức phức tạp một cách rất dễ tiếp thu.
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 text-gray-500 hover:text-indigo-600">
                <ThumbsUp className="h-4 w-4" />
                <span className="text-sm">8</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-500 hover:text-red-600">
                <ThumbsDown className="h-4 w-4" />
                <span className="text-sm">0</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-500 hover:text-indigo-600">
                <Reply className="h-4 w-4" />
                <span className="text-sm">Trả lời</span>
              </button>
            </div>
            <button className="flex items-center space-x-2 text-gray-500 hover:text-red-600">
              <Flag className="h-4 w-4" />
              <span className="text-sm">Báo cáo</span>
            </button>
          </div>
        </div>
      </div>

      {/* Load More */}
      <div className="text-center mt-8">
       < Button/>
      </div>
    </div>
  );
}

export default Commet


