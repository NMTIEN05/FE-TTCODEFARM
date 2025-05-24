import React from 'react'

type Props = {}

const Nav = (props: Props) => {
  return (
<nav className="container">
  <div className="ml-40 mr-40 mt-10 grid grid-cols-1 lg:grid-cols-7 gap-6">
    {/* Left Category Menu - Modern Card Design */}
    <div className="lg:col-span-2">
      <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-xl shadow-gray-100/50 overflow-hidden">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Danh mục sản phẩm</h3>
          <ul className="space-y-1">
            <li>
              <a 
                href="#" 
                className="group flex items-center py-3 px-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-95"
              >
                <span className="text-gray-700 group-hover:text-gray-900 font-medium transition-colors duration-300">
                  Điện thoại & Máy tính bảng
                </span>
                <svg 
                  className="ml-auto w-4 h-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className="group flex items-center py-3 px-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-95"
              >
                <span className="text-gray-700 group-hover:text-gray-900 font-medium transition-colors duration-300">
                  Thời trang Nam
                </span>
                <svg 
                  className="ml-auto w-4 h-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className="group flex items-center py-3 px-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-95"
              >
                <span className="text-gray-700 group-hover:text-gray-900 font-medium transition-colors duration-300">
                  Thời trang Nữ
                </span>
                <svg 
                  className="ml-auto w-4 h-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className="group flex items-center py-3 px-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-95"
              >
                <span className="text-gray-700 group-hover:text-gray-900 font-medium transition-colors duration-300">
                  Điện tử & Điện lạnh
                </span>
                <svg 
                  className="ml-auto w-4 h-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className="group flex items-center py-3 px-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-95"
              >
                <span className="text-gray-700 group-hover:text-gray-900 font-medium transition-colors duration-300">
                  Nhà cửa & Đời sống
                </span>
                <svg 
                  className="ml-auto w-4 h-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className="group flex items-center py-3 px-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-95"
              >
                <span className="text-gray-700 group-hover:text-gray-900 font-medium transition-colors duration-300">
                  Sức khỏe & Làm đẹp
                </span>
                <svg 
                  className="ml-auto w-4 h-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className="group flex items-center py-3 px-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-95"
              >
                <span className="text-gray-700 group-hover:text-gray-900 font-medium transition-colors duration-300">
                  Thể thao & Du lịch
                </span>
                <svg 
                  className="ml-auto w-4 h-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    {/* Right Banner */}
    <div className="lg:col-span-5">
      <img 
        src="https://thietkelogo.edu.vn/uploads/images/thiet-ke-do-hoa-khac/banner-sach/3.jpg" 
        alt="Banner" 
        className="w-full h-full object-cover rounded-2xl shadow-2xl shadow-gray-200/50"
      />
    </div>
  </div>
</nav>
  )
}

export default Nav