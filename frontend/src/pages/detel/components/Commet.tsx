import React from 'react';
import { useForm } from 'react-hook-form';
import { Star, ThumbsUp, ThumbsDown, Reply, Flag, MoreHorizontal } from 'lucide-react';
import Button from '../../home/components/comon/Button';

interface FormData {
  rating: number;
  title: string;
  detail: string;
}

type Props = {
  bookId: string;
};

const Commet: React.FC<Props> = ({ bookId }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      rating: 0,
      title: '',
      detail: '',
    },
  });

  const rating = watch('rating');

  const onSubmit = (data: FormData) => {
    console.log('Gửi đánh giá:', data);
    // TODO: call API gửi đánh giá, kèm bookId và data
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Đánh giá & Bình luận
          <span className="text-lg font-normal text-gray-500 ml-2">(245)</span>
        </h2>
      </div>

      {/* Rating Summary (tạm để cứng) */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <div className="text-center">
          <div className="text-4xl font-bold text-indigo-600 mb-2">4.8</div>
          <div className="flex items-center justify-center mb-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
            ))}
          </div>
          <p className="text-gray-600">245 đánh giá</p>
        </div>
      </div>

      {/* Form viết đánh giá */}
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white border rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">Viết đánh giá</h3>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Đánh giá của bạn</label>
          <div className="flex items-center space-x-1 cursor-pointer">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-8 w-8 ${
                  rating >= star ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
                onClick={() => setValue('rating', star, { shouldValidate: true })}
              />
            ))}
          </div>
          {errors.rating && (
            <p className="text-red-600 text-sm mt-1">Vui lòng chọn số sao đánh giá.</p>
          )}
          {/* ẩn input rating để register */}
          <input
            type="hidden"
            {...register('rating', { required: true, min: 1 })}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Tiêu đề</label>
          <input
            type="text"
            placeholder="Tóm tắt đánh giá của bạn..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            {...register('title', { required: true })}
          />
          {errors.title && (
            <p className="text-red-600 text-sm mt-1">Tiêu đề không được để trống.</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Chi tiết đánh giá</label>
          <textarea
            placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm này..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            {...register('detail', { required: true })}
          ></textarea>
          {errors.detail && (
            <p className="text-red-600 text-sm mt-1">Chi tiết đánh giá không được để trống.</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 font-medium"
        >
          Gửi đánh giá
        </button>
      </form>

      {/* Danh sách comment mẫu */}
      <div className="space-y-6">
        {/* Ví dụ comment */}
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
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i <= 5 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
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

          {/* Các nút Like, Reply, Report */}
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
        </div>

        {/* Bạn có thể thêm các comment khác tương tự */}
      </div>

      {/* Button load more */}
      
    </div>
  );
};

export default Commet;
