import React, { useState } from "react";
import {
  ArrowLeft,
  CreditCard,
  Truck,
  MapPin,
  Phone,
  User,
  Mail,
  ShoppingBag,
  CheckCircle,
  Tag,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../providers/CartProvider";
import { orderService } from "../../services/orderService";
import { useVNPay } from "../../hooks/useVNPay";
import { couponService } from "../../services/coupon.service";
import { toast } from "react-toastify";

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, totalPrice, cartCount, clearCart } = useCart();
  const [selectedPayment, setSelectedPayment] = useState("cod");
  const { createPayment, isLoading } = useVNPay();
  const [customerInfo, setCustomerInfo] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    note: "",
  });
  
  // State cho mã giảm giá
  const [couponCode, setCouponCode] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<{
    couponId: string;
    code: string;
    discountPercent: number;
    discountAmount: number;
    finalAmount: number;
  } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Xử lý áp dụng mã giảm giá
  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      toast.error("Vui lòng nhập mã giảm giá");
      return;
    }
    
    setCouponLoading(true);
    try {
      const response = await couponService.validateCoupon(couponCode, totalPrice);
      console.log('Coupon response:', JSON.stringify(response, null, 2));
      
      // Backend trả về cấu trúc { message, data }
      if (response && response.data) {
        // Tính toán trực tiếp từ dữ liệu cơ bản
        const code = response.data.code || couponCode;
        const discountPercent = response.data.discountPercent || 0;
        
        // Tính toán lại số tiền giảm và số tiền cuối cùng
        const discountAmount = Math.floor(totalPrice * (discountPercent / 100));
        const finalAmount = totalPrice - discountAmount;
        
        const couponData = {
          couponId: response.data.couponId || '',
          code: code,
          discountPercent: discountPercent,
          discountAmount: discountAmount,
          finalAmount: finalAmount
        };
        
        console.log('Processed coupon data:', couponData);
        setAppliedCoupon(couponData);
        toast.success(response.message || "Mã giảm giá đã được áp dụng");
      } else {
        toast.error("Có lỗi khi áp dụng mã giảm giá");
        setAppliedCoupon(null);
      }
    } catch (error: any) {
      console.error('Coupon error:', error);
      toast.error(error.response?.data?.message || "Mã giảm giá không hợp lệ");
      setAppliedCoupon(null);
    } finally {
      setCouponLoading(false);
    }
  };
  
  // Xử lý xóa mã giảm giá
  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
  };

  const handlePlaceOrder = async () => {
    // Kiểm tra thông tin bắt buộc
    if (!customerInfo.fullName || !customerInfo.phone || !customerInfo.address) {
      toast.error("Vui lòng điền đầy đủ thông tin bắt buộc");
      return;
    }

    if (selectedPayment === "vnpay") {
      // Thanh toán VNPAY
      const orderId = Date.now().toString();
      
      // Lấy userId từ token
      let userId;
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          userId = payload.id;
          console.log('VNPay - UserId from token:', userId);
      console.log('VNPay - Customer info:', customerInfo);
      console.log('VNPay - Shipping address:', `${customerInfo.fullName} - ${customerInfo.phone} - ${customerInfo.address}`);
        } catch (error) {
          console.log('Không thể lấy userId từ token');
        }
      } else {
        console.log('VNPay - No token found');
      }
      
      createPayment({
        amount: appliedCoupon ? appliedCoupon.finalAmount : totalPrice,
        orderId,
        orderData: {
          user_id: userId,
          customer_name: customerInfo.fullName,
          customer_phone: customerInfo.phone,
          customer_email: customerInfo.email,
          shipping_address: `${customerInfo.fullName} - ${customerInfo.phone} - ${customerInfo.address}`,
          note: customerInfo.note,
          shipping_fee: 0,
          tax: 0,
          coupon_id: appliedCoupon?.couponId,
          discount_amount: appliedCoupon?.discountAmount || 0,
          details: cartItems.map(item => ({
            book_id: item.book_id?._id || '',
            variant_id: item.variant_id?._id || null,
            quantity: item.quantity,
            price: item.price
          }))
        }
      });
    } else {
      try {
        // Tạo đơn hàng COD
        const token = localStorage.getItem('token');
        if (!token) {
          alert('Vui lòng đăng nhập để đặt hàng');
          navigate('/auth/login');
          return;
        }
        
        // Lấy userId từ JWT token
        let userId;
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          userId = payload.id;
          console.log('UserId from token:', userId);
        } catch (error) {
          alert('Token không hợp lệ, vui lòng đăng nhập lại');
          navigate('/auth/login');
          return;
        }
        
        const orderData = {
          user_id: userId,
          cart_id: undefined,
          total_amount: appliedCoupon ? appliedCoupon.finalAmount : totalPrice,
          shipping_address: `${customerInfo.fullName} - ${customerInfo.phone} - ${customerInfo.address}`,
          payment_method: 'COD',
          shipping_fee: 0,
          tax: 0,
          status: 'pending',
          coupon_id: appliedCoupon?.couponId,
          discount_amount: appliedCoupon?.discountAmount || 0,
          details: cartItems.map(item => ({
            book_id: item.book_id?._id || '',
            variant_id: item.variant_id?._id || null,
            quantity: item.quantity,
            price: item.price
          }))
        };
        
        console.log('Order data being sent:', orderData);
        console.log('Cart items:', cartItems);
        
        // Gọi API tạo đơn hàng
        const response = await orderService.createOrder(orderData);
        console.log('Order response:', response);
        
        // Xóa giỏ hàng
        await clearCart();
        
        // Chuyển đến trang thành công
        navigate('/order-success', { 
          state: { 
            orderData: {
              orderCode: response._id || response.data?._id || 'N/A',
              totalAmount: response.total_amount || response.data?.total_amount || totalPrice,
              customerInfo
            }
          } 
        });
      } catch (error: any) {
        console.error('Lỗi khi đặt hàng:', error);
        alert(error.response?.data?.message || 'Có lỗi khi đặt hàng');
      }
    }
  };

  // Nếu giỏ hàng trống, chuyển về trang chủ
  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={() => navigate('/cart')}
          className="flex items-center space-x-2 text-gray-600 hover:text-black"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Quay lại giỏ hàng</span>
        </button>
        <h1 className="text-2xl font-bold">Thanh toán</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Thông tin khách hàng và phương thức thanh toán */}
        <div className="lg:col-span-2 space-y-6">
          {/* Thông tin giao hàng */}
          <div className="bg-white p-6 rounded-lg border">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Thông tin giao hàng
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Họ và tên <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={customerInfo.fullName}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Nhập họ và tên"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Số điện thoại <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={customerInfo.phone}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Nhập số điện thoại"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={customerInfo.email}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Nhập email (không bắt buộc)"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">
                  Địa chỉ giao hàng <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  value={customerInfo.address}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Nhập địa chỉ chi tiết"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">
                  Ghi chú đơn hàng
                </label>
                <textarea
                  name="note"
                  value={customerInfo.note}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Ghi chú thêm cho đơn hàng (không bắt buộc)"
                />
              </div>
            </div>
          </div>

          {/* Phương thức thanh toán */}
          <div className="bg-white p-6 rounded-lg border">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Phương thức thanh toán
            </h2>
            <div className="space-y-3">
              {/* Thanh toán khi nhận hàng */}
              <div 
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedPayment === "cod" 
                    ? "border-indigo-500 bg-indigo-50" 
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setSelectedPayment("cod")}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={selectedPayment === "cod"}
                    onChange={() => setSelectedPayment("cod")}
                    className="w-4 h-4 text-indigo-600"
                  />
                  <Truck className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-medium">Thanh toán khi nhận hàng (COD)</p>
                    <p className="text-sm text-gray-600">Thanh toán bằng tiền mặt khi nhận được hàng</p>
                  </div>
                </div>
              </div>

              {/* Thanh toán VNPAY */}
              <div 
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedPayment === "vnpay" 
                    ? "border-indigo-500 bg-indigo-50" 
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setSelectedPayment("vnpay")}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    value="vnpay"
                    checked={selectedPayment === "vnpay"}
                    onChange={() => setSelectedPayment("vnpay")}
                    className="w-4 h-4 text-indigo-600"
                  />
                  <div className="w-5 h-5 bg-red-600 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">V</span>
                  </div>
                  <div>
                    <p className="font-medium">Thanh toán qua VNPAY</p>
                    <p className="text-sm text-gray-600">Thanh toán trực tuyến qua cổng thanh toán VNPAY</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tóm tắt đơn hàng */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg border sticky top-4">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              Đơn hàng của bạn
            </h2>
            
            {/* Danh sách sản phẩm */}
            <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
              {cartItems.map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                  <img
                    src={item.book_id?.cover_image || "/fallback.jpg"}
                    alt={item.book_id?.title}
                    className="w-12 h-16 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.book_id?.title}</p>
                    <p className="text-xs text-gray-600">SL: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-semibold text-red-600">
                    {(item.price * item.quantity).toLocaleString()}đ
                  </p>
                </div>
              ))}
            </div>

            {/* Mã giảm giá */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Tag className="w-4 h-4 text-indigo-600" />
                <span className="text-sm font-medium">Mã giảm giá</span>
              </div>
              
              {!appliedCoupon ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Nhập mã giảm giá"
                    className="flex-1 p-2 border rounded-md text-sm"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    disabled={couponLoading}
                    className="bg-indigo-600 text-white px-3 py-2 rounded-md text-sm hover:bg-indigo-700 disabled:opacity-50"
                  >
                    {couponLoading ? "...Đang kiểm tra" : "Áp dụng"}
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between p-2 bg-indigo-50 border border-indigo-200 rounded-md">
                  <div>
                    <span className="text-sm font-medium text-indigo-700">{appliedCoupon.code}</span>
                    <span className="text-xs text-indigo-600 ml-2">(-{appliedCoupon.discountPercent || 0}%)</span>
                  </div>
                  <button
                    onClick={handleRemoveCoupon}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
            
            {/* Tổng kết */}
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Tạm tính ({cartCount} sản phẩm):</span>
                <span>{totalPrice.toLocaleString()}đ</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Phí vận chuyển:</span>
                <span className="text-green-600">Miễn phí</span>
              </div>
              
              {appliedCoupon && appliedCoupon.discountAmount > 0 && (
                <div className="flex justify-between text-sm text-indigo-600">
                  <span>Giảm giá ({appliedCoupon.discountPercent}%):</span>
                  <span>-{appliedCoupon.discountAmount.toLocaleString()}đ</span>
                </div>
              )}
              
              <div className="flex justify-between text-lg font-semibold border-t pt-2">
                <span>Tổng cộng:</span>
                <span className="text-red-600">
                  {(appliedCoupon && appliedCoupon.finalAmount ? appliedCoupon.finalAmount : totalPrice).toLocaleString()}đ
                </span>
              </div>
            </div>

            {/* Nút đặt hàng */}
            <button
              onClick={handlePlaceOrder}
              disabled={isLoading}
              className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <CheckCircle className="w-4 h-4" />
              {isLoading ? "Đang xử lý..." : selectedPayment === "vnpay" ? "Thanh toán VNPAY" : "Đặt hàng"}
            </button>

            {/* Thông tin bảo mật */}
            <div className="mt-4 p-3 bg-green-50 rounded-lg">
              <p className="text-xs text-green-700 text-center">
                🔒 Thông tin của bạn được bảo mật tuyệt đối
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;