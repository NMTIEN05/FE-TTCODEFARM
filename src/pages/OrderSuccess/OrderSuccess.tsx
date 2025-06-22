import React from "react";
import { CheckCircle, Home, FileText } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderData = location.state?.orderData;

  return (
    <div className="max-w-2xl mx-auto py-20 px-4 text-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-green-600 mb-2">Đặt hàng thành công!</h1>
        <p className="text-gray-600 mb-6">
          Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ liên hệ với bạn sớm nhất để xác nhận đơn hàng.
        </p>
        
        {orderData && (
          <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left">
            <h3 className="font-semibold mb-2">Thông tin đơn hàng:</h3>
            <p className="text-sm text-gray-600">Mã đơn hàng: <span className="font-medium">#{orderData.orderCode.slice(-6)}</span></p>
            <p className="text-sm text-gray-600">Tổng tiền: <span className="font-medium text-red-600">{orderData.totalAmount?.toLocaleString()}đ</span></p>
            <p className="text-sm text-gray-600">Phương thức thanh toán: <span className="font-medium">Thanh toán khi nhận hàng</span></p>
            <p className="text-sm text-gray-600">Khách hàng: <span className="font-medium">{orderData.customerInfo?.fullName}</span></p>
            <p className="text-sm text-gray-600">Địa chỉ: <span className="font-medium">{orderData.customerInfo?.address}</span></p>
            <p className="text-sm text-gray-600">SĐT: <span className="font-medium">{orderData.customerInfo?.phone}</span></p>
          </div>
        )}

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
          >
            <Home className="w-4 h-4" />
            Về trang chủ
          </button>
          <button
            onClick={() => navigate('/orders')}
            className="flex items-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700"
          >
            <FileText className="w-4 h-4" />
            Xem đơn hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;