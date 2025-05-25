import React from 'react';
import { Trash2, Plus, Minus, ShoppingCart, CreditCard, ArrowLeft, Gift, Tag } from 'lucide-react';

const Cart = () => {
  return (
    <div className=" ">
      {/* Header */}
      <div className="">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <button className="flex items-center space-x-3 text-slate-600 hover:text-slate-900 transition-all duration-200 hover:scale-105">
              <div className="p-2 rounded-full bg-slate-100 hover:bg-slate-200">
                <ArrowLeft className="w-5 h-5" />
              </div>
              <span className="font-medium">Tiếp tục mua sắm</span>
            </button>
            
            <div className="text-center">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent flex items-center justify-center">
                <ShoppingCart className="w-8 h-8 mr-3 text-slate-700" />
                Giỏ hàng
              </h1>
              <p className="text-slate-500 text-sm mt-1">Quản lý sản phẩm yêu thích</p>
            </div>
            
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
              3 sản phẩm
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          
          {/* Cart Items Section */}
          <div className="xl:col-span-8">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 overflow-hidden">
              
              {/* Section Header */}
              <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-6 text-white">
                <h2 className="text-xl font-bold flex items-center">
                  <div className="w-2 h-8 bg-blue-400 rounded-full mr-3"></div>
                  Sản phẩm trong giỏ
                </h2>
                <p className="text-slate-300 text-sm mt-1">Xem lại và chỉnh sửa đơn hàng</p>
              </div>
              
              {/* Cart Items */}
              <div className="divide-y divide-slate-200">
                
                {/* Item 1 */}
                <div className="p-6 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 group">
                  <div className="flex space-x-6">
                    <div className="relative flex-shrink-0">
                      <img 
                        src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=150&h=200&fit=crop" 
                        alt="Tắt Đèn"
                        className="w-24 h-32 object-cover rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                      />
                      <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                        -21%
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                            Tắt Đèn
                          </h3>
                          <p className="text-slate-600 font-medium mt-1">Ngô Tất Tố</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-semibold">
                              Văn học Việt Nam
                            </span>
                           
                          </div>
                        </div>
                        
                        <button className="p-3 rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200 hover:scale-110">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between mt-6">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-red-600">95.000đ</span>
                          <span className="text-lg text-slate-400 line-through">120.000đ</span>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center bg-slate-100 rounded-full p-1">
                            <button className="p-2 rounded-full hover:bg-white hover:shadow-md transition-all duration-200">
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="font-bold text-slate-800 min-w-[3rem] text-center text-lg">2</span>
                            <button className="p-2 rounded-full hover:bg-white hover:shadow-md transition-all duration-200">
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-slate-500">Thành tiền</p>
                            <p className="font-bold text-xl text-slate-800">190.000đ</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="p-6 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 group">
                  <div className="flex space-x-6">
                    <div className="relative flex-shrink-0">
                      <img 
                        src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150&h=200&fit=crop" 
                        alt="Đắc Nhân Tâm"
                        className="w-24 h-32 object-cover rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                            Đắc Nhân Tâm
                          </h3>
                          <p className="text-slate-600 font-medium mt-1">Dale Carnegie</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <span className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full font-semibold">
                              Kỹ năng sống
                            </span>
                            
                          </div>
                        </div>
                        
                        <button className="p-3 rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200 hover:scale-110">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between mt-6">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-red-600">75.000đ</span>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center bg-slate-100 rounded-full p-1">
                            <button className="p-2 rounded-full hover:bg-white hover:shadow-md transition-all duration-200">
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="font-bold text-slate-800 min-w-[3rem] text-center text-lg">1</span>
                            <button className="p-2 rounded-full hover:bg-white hover:shadow-md transition-all duration-200">
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-slate-500">Thành tiền</p>
                            <p className="font-bold text-xl text-slate-800">75.000đ</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="p-6 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 group">
                  <div className="flex space-x-6">
                    <div className="relative flex-shrink-0">
                      <img 
                        src="https://images.unsplash.com/photo-1589998059171-988d887df646?w=150&h=200&fit=crop" 
                        alt="Sherlock Holmes"
                        className="w-24 h-32 object-cover rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                      />
                      <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                        -17%
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                            Sherlock Holmes Toàn Tập
                          </h3>
                          <p className="text-slate-600 font-medium mt-1">Arthur Conan Doyle</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <span className="bg-red-100 text-red-800 text-xs px-3 py-1 rounded-full font-semibold">
                              Trinh thám
                            </span>
                            
                          </div>
                        </div>
                        
                        <button className="p-3 rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200 hover:scale-110">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between mt-6">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-red-600">150.000đ</span>
                          <span className="text-lg text-slate-400 line-through">180.000đ</span>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center bg-slate-100 rounded-full p-1">
                            <button className="p-2 rounded-full hover:bg-white hover:shadow-md transition-all duration-200">
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="font-bold text-slate-800 min-w-[3rem] text-center text-lg">1</span>
                            <button className="p-2 rounded-full hover:bg-white hover:shadow-md transition-all duration-200">
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-slate-500">Thành tiền</p>
                            <p className="font-bold text-xl text-slate-800">150.000đ</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="xl:col-span-4">
            <div className="sticky top-24 space-y-6">
              
              {/* Order Summary Card */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                  <h2 className="text-xl font-bold flex items-center">
                    <CreditCard className="w-6 h-6 mr-3" />
                    Tóm tắt đơn hàng
                  </h2>
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-slate-600">Tạm tính (4 sản phẩm)</span>
                    <span className="font-semibold text-slate-800">415.000đ</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2">
                    <span className="text-slate-600">Phí vận chuyển</span>
                    <span className="font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full text-sm">
                      Miễn phí
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2">
                    <span className="text-slate-600">Giảm giá khuyến mãi</span>
                    <span className="font-semibold text-red-600">-50.000đ</span>
                  </div>
                  
                  <div className="border-t-2 border-dashed border-slate-200 pt-4 mt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-slate-800">Tổng thanh toán</span>
                      <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
                        365.000đ
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="space-y-4">
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-2xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center">
                  <CreditCard className="w-6 h-6 mr-3" />
                  Thanh toán ngay
                </button>
                
                <button className="w-full border-2 border-slate-300 text-slate-700 py-4 px-6 rounded-2xl font-bold hover:bg-slate-50 hover:border-slate-400 transition-all duration-200">
                  Cập nhật giỏ hàng
                </button>
              </div>
              
              {/* Promotion Cards */}
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 p-4 rounded-2xl">
                  <div className="flex items-start space-x-3">
                    <Gift className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-green-800">Chúc mừng!</h3>
                      <p className="text-sm text-green-700 mt-1">
                        Bạn được <strong>miễn phí vận chuyển</strong> cho đơn hàng trên 300.000đ
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 p-4 rounded-2xl">
                  <div className="flex items-start space-x-3">
                    <Tag className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-yellow-800">Mã giảm giá</h3>
                      <p className="text-sm text-yellow-700 mt-1">
                        Nhập mã <strong className="bg-yellow-200 px-2 py-1 rounded">BOOK20</strong> để giảm thêm 20%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;