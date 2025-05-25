import React, { useEffect, useState } from 'react'
import { ICategory } from '../../../types/Category'
import axios from 'axios'

type Props = {}

const Nav = (props: Props) => {
  const [Category,setCategories] = useState<ICategory[]>([])
useEffect(() => {
  (async () => {
    try {
      const response = await axios.get('http://localhost:8888/api/categories')
      // response.data.data là object chứa data, offset, limit,...
      const resData = response.data.data
      if (Array.isArray(resData.data)) {
        setCategories(resData.data)
      } else {
        console.warn('Dữ liệu trả về không hợp lệ:', resData)
        setCategories([])
      }
    } catch (error) {
      console.error('Lỗi khi gọi API danh mục:', error)
      setCategories([])
    }
  })()
}, [])


  return (

    <div className="ml-40 mr-40 mt-10 grid grid-cols-1 lg:grid-cols-7 gap-6">
      {/* Left Category Menu - Modern Card Design */}
      <div className="lg:col-span-2">
        <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-xl shadow-gray-100/50 overflow-hidden">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Danh mục sản phẩm</h3>
            <ul className="space-y-1">
              {Category.map((item) => (
                <li key={item._id}>
                  <a
                    href="#"
                    className="group flex items-center py-3 px-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-95"
                  >
                    <span className="text-gray-700 group-hover:text-gray-900 font-medium transition-colors duration-300">
                      {item.name}
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
              ))}
              

            
            </ul>
          </div>
        </div>
      </div>

      {/* Right Banner */}
      <div className="lg:col-span-5 h-full">
        <img
          src="https://static.vecteezy.com/system/resources/previews/002/294/871/large_2x/reading-book-web-banner-design-open-book-with-stack-of-books-header-or-footer-banner-illustration-free-vector.jpg"
          alt="Banner"
          className="w-full h-full object-cover rounded-2xl shadow-2xl shadow-gray-200/50"
        />
      </div>
    </div>

  )
}

export default Nav