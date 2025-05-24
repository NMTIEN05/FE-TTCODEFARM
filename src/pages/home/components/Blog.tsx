import React from 'react'
import ViewAllButton from './comon/Button'

type Props = {}

const Blog = (props: Props) => {
  return (
   <div className="ml-40 mr-40 mt-10 mb-6">
     <h2 className=" mb-8 relative inline-block text-2xl md:text-3xl font-bold text-gray-800 before:content-[''] before:inline-block before:mr-4 before:w-1 before:h-6 before:bg-red-500 align-middle">
   Blog & Tin tức
     </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      
      <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition">
        <img
          src="https://source.unsplash.com/400x250/?book,library&sig=1"
          alt="Bài viết 1"
          className="w-full h-40 object-cover rounded-md mb-3"
        />
        <h3 className="text-lg font-semibold mb-2">Cách chọn sách hay</h3>
        <p className="text-sm text-gray-600">Một vài mẹo giúp bạn chọn được cuốn sách phù hợp với bản thân.</p>
      </div>

      <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition">
        <img
          src="https://source.unsplash.com/400x250/?reading,study&sig=2"
          alt="Bài viết 2"
          className="w-full h-40 object-cover rounded-md mb-3"
        />
        <h3 className="text-lg font-semibold mb-2">Tạo thói quen đọc sách</h3>
        <p className="text-sm text-gray-600">Làm sao để duy trì việc đọc mỗi ngày một cách hiệu quả.</p>
      </div>

      <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition">
        <img
          src="https://source.unsplash.com/400x250/?bookshelf,bookstore&sig=3"
          alt="Bài viết 3"
          className="w-full h-40 object-cover rounded-md mb-3"
        />
        <h3 className="text-lg font-semibold mb-2">Góc nhìn về sách giấy</h3>
        <p className="text-sm text-gray-600">So sánh giữa sách giấy và sách điện tử trong thời đại số.</p>
      </div>

      <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition">
        <img
          src="https://source.unsplash.com/400x250/?writer,notebook&sig=4"
          alt="Bài viết 4"
          className="w-full h-40 object-cover rounded-md mb-3"
        />
        <h3 className="text-lg font-semibold mb-2">Tác giả nổi bật tháng này</h3>
        <p className="text-sm text-gray-600">Khám phá tác phẩm của những cây bút đang được yêu thích hiện nay.</p>
      </div>

    </div>
    <ViewAllButton/>
  </div>
  )
}

export default Blog