import React from 'react'

type Props = {}

const Footer = (props: Props) => {
  return (
   <footer className="bg-gray-900 text-white py-10">
  <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
    {/* Logo và mô tả */}
    <div>
      <h2 className="text-2xl font-bold mb-3">T Bansachs</h2>
      <p className="text-sm text-gray-300">
        Website bán sách trực tuyến uy tín, giao hàng toàn quốc và hỗ trợ khách hàng tận tình.
      </p>
    </div>

    {/* Liên kết nhanh */}
    <div>
      <h3 className="text-xl font-semibold mb-3">Liên kết</h3>
      <ul className="space-y-2 text-sm text-gray-300">
        <li><a href="/" className="hover:text-white transition">Trang chủ</a></li>
        <li><a href="/about" className="hover:text-white transition">Giới thiệu</a></li>
        <li><a href="/contact" className="hover:text-white transition">Liên hệ</a></li>
        <li><a href="/policy" className="hover:text-white transition">Chính sách bảo mật</a></li>
      </ul>
    </div>

    {/* Liên hệ */}
    <div>
      <h3 className="text-xl font-semibold mb-3">Liên hệ</h3>
      <p className="text-sm text-gray-300">Email: support@tbansachs.vn</p>
      <p className="text-sm text-gray-300">Hotline: 0123 456 789</p>
      <p className="text-sm text-gray-300">Địa chỉ: 123 Nguyễn Văn A, TP.HCM</p>
    </div>
  </div>

  <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
    © 2025 T Bansachs. All rights reserved.
  </div>
</footer>

  )
}

export default Footer