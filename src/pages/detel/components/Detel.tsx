import React from 'react'
import { Star, Heart, ShoppingCart, Minus, Plus, Share2, Truck, Shield, RotateCcw } from 'lucide-react';

type Props = {}

const Detel = (props: Props) => {
    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Breadcrumb */}
            <nav className="text-sm mb-8">
                <ol className="flex items-center space-x-2 text-gray-500">
                    <li><a href="#" className="hover:text-indigo-600">Trang chủ</a></li>
                    <li>/</li>
                    <li><a href="#" className="hover:text-indigo-600">Sách</a></li>
                    
                    
                    <li>/</li>
                    <li className="text-gray-900">Đắc Nhân Tâm</li>
                </ol>
            </nav>

            {/* Product Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
                {/* Product Images */}
                <div>
                    <div className="aspect-w-3 aspect-h-4 bg-gray-200 rounded-lg mb-4">
                        <div className="w-full h-[600px] rounded-lg overflow-hidden">
                            <img
                                src="https://cungdocsach.vn/wp-content/uploads/2020/10/%C4%90%E1%BA%AFc-nh%C3%A2n-t%C3%A2m-3.jpg"
                                alt="Đắc Nhân Tâm"
                                className="w-full h-full  object-cover"
                            />
                        </div>

                    </div>


                </div>

                {/* Product Info */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Đắc Nhân Tâm</h1>
                    <p className="text-lg text-gray-600 mb-4">Tác giả: <span className="font-medium">Dale Carnegie</span></p>

                    {/* Rating */}
                    <div className="flex items-center mb-6">
                        <div className="flex items-center">
                            {Array.from({ length: 5 }, (_, i) => (
                                <Star key={i} className={`h-5 w-5 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                            ))}
                        </div>
                        <span className="text-gray-600 ml-2">(4.8)</span>
                        <span className="text-gray-500 ml-2">• 245 đánh giá</span>
                    </div>

                    {/* Price */}
                    <div className="mb-6">
                        <div className="flex items-center space-x-4">
                            <span className="text-3xl font-bold text-indigo-600">89,000đ</span>
                            <span className="text-xl text-gray-500 line-through">120,000đ</span>
                            <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">-26%</span>
                        </div>
                    </div>

                    {/* Quantity */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Số lượng</label>
                        <div className="flex items-center space-x-3">
                            <button className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                                <Minus className="h-4 w-4" />
                            </button>
                            <span className="w-16 text-center text-lg font-medium">1</span>
                            <button className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                                <Plus className="h-4 w-4" />
                            </button>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-4 mb-6">
                        <button className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 flex items-center justify-center space-x-2">
                            <ShoppingCart className="h-5 w-5" />
                            <span>Thêm vào giỏ hàng</span>
                        </button>
                        <button className="p-3 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50">
                            <Heart className="h-5 w-5" />
                        </button>
                  
                    </div>

                    {/* Features */}
                    <div className="space-y-3">
                        <div className="flex items-center space-x-3 text-sm text-gray-600">
                            <Truck className="h-5 w-5 text-green-600" />
                            <span>Miễn phí vận chuyển cho đơn hàng trên 200,000đ</span>
                        </div>
                        <div className="flex items-center space-x-3 text-sm text-gray-600">
                            <Shield className="h-5 w-5 text-blue-600" />
                            <span>Bảo hành chất lượng 100%</span>
                        </div>
                        <div className="flex items-center space-x-3 text-sm text-gray-600">
                            <RotateCcw className="h-5 w-5 text-orange-600" />
                            <span>Đổi trả trong 30 ngày</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Details Tabs */}
            <div className="border-t pt-8">
                <div className="border-b">
                    <nav className="flex space-x-8">
                        <button className="py-4 px-1 border-b-2 border-indigo-500 text-indigo-600 font-medium text-sm">
                            Mô tả
                        </button>
                        <button className="py-4 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 font-medium text-sm">
                            Đánh giá
                        </button>
                        <button className="py-4 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 font-medium text-sm">
                            Thông tin
                        </button>
                    </nav>
                </div>

                <div className="py-8">
                    <div className="prose max-w-none">
                        <p className="text-gray-700 leading-relaxed mb-4">
                            "Đắc Nhân Tâm" của Dale Carnegie là một trong những cuốn sách kinh điển về nghệ thuật giao tiếp và ứng xử.
                            Cuốn sách đã bán được hàng triệu bản trên toàn thế giới và được dịch ra nhiều thứ tiếng.
                        </p>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Tác phẩm này cung cấp những nguyên tắc cơ bản để chinh phục lòng tin của mọi người,
                            làm cho họ yêu quý bạn và đồng tình với quan điểm của bạn.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            Đây là cuốn sách không thể thiếu trong thư viện của mỗi người muốn thành công trong cuộc sống
                            và công việc thông qua việc cải thiện kỹ năng giao tiếp.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
};




export default Detel