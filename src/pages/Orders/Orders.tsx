import React, { useState, useEffect } from "react";
import { 
  Package, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Truck, 
  Eye,
  X,
  AlertTriangle
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { orderService } from "../../services/orderService";
import OrderTracking from "../../components/common/OrderTracking";

interface OrderItem {
  book_id: {
    title: string;
    cover_image: string;
  };
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  orderCode: string;
  customerInfo: {
    fullName: string;
    phone: string;
    address: string;
  };
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: string;
  createdAt: string;
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const navigate = useNavigate();

  const statusConfig = {
    pending: { label: 'Chờ xác nhận', color: 'text-yellow-600 bg-yellow-100', icon: Clock },
    confirmed: { label: 'Đã xác nhận', color: 'text-blue-600 bg-blue-100', icon: CheckCircle },
    shipped: { label: 'Đang giao hàng', color: 'text-purple-600 bg-purple-100', icon: Truck },
    delivered: { label: 'Đã giao hàng', color: 'text-green-600 bg-green-100', icon: CheckCircle },
    cancelled: { label: 'Đã hủy', color: 'text-red-600 bg-red-100', icon: XCircle }
  };

  useEffect(() => {
    fetchOrders();
  }, []);
  
  // Refresh orders khi token thay đổi
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchOrders();
    }
  }, [localStorage.getItem('token')]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('No token found, user not logged in');
        setOrders([]);
        setLoading(false);
        return;
      }
      
      // Lấy userId từ JWT token
      let userId;
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        userId = payload.id;
      } catch (error) {
        console.log('Invalid token');
        setOrders([]);
        setLoading(false);
        return;
      }
      
      console.log('Calling getUserOrders with userId:', userId);
      const ordersData = await orderService.getUserOrders(userId);
      console.log('Fetched orders:', ordersData);
      console.log('Orders data type:', typeof ordersData, Array.isArray(ordersData));
      
      // Xử lý cấu trúc response có pagination
      const actualOrdersData = Array.isArray(ordersData) ? ordersData : ordersData.data || [];
      
      if (!Array.isArray(actualOrdersData)) {
        console.error('Orders data is not an array:', actualOrdersData);
        setOrders([]);
        return;
      }
      
      // Transform data to match component interface
      const transformedOrders: Order[] = actualOrdersData.map((order: any) => {
        const addressParts = order.shipping_address?.split(' - ') || [];
        return {
          _id: order._id,
          orderCode: order._id,
          customerInfo: {
            fullName: addressParts[0] || order.user_id?.fullname || 'Khách hàng',
            phone: addressParts[1] || '',
            address: addressParts.slice(2).join(' - ') || order.shipping_address || ''
          },
          items: (order.details || []).map((detail: any) => ({
            book_id: {
              title: detail.book_id?.title || 'Sản phẩm',
              cover_image: detail.book_id?.cover_image || '/fallback.jpg'
            },
            quantity: detail.quantity || 1,
            price: detail.price || 0
          })),
          totalAmount: order.total_amount || 0,
          status: order.status as 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled',
          paymentMethod: order.payment_method || 'COD',
          createdAt: order.order_date || order.createdAt || new Date().toISOString()
        };
      });
      
      setOrders(transformedOrders);
    } catch (error) {
      console.error('Lỗi khi tải đơn hàng:', error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId: string) => {
    if (!window.confirm('Bạn có chắc muốn hủy đơn hàng này?')) return;
    
    try {
      await orderService.cancelOrder(orderId);
      setOrders(prev => prev.map(order => 
        order._id === orderId ? { ...order, status: 'cancelled' } : order
      ));
      alert('Hủy đơn hàng thành công');
    } catch (error: any) {
      console.error('Lỗi khi hủy đơn hàng:', error);
      alert(error.response?.data?.message || 'Có lỗi khi hủy đơn hàng');
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-4 text-center">
        <div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p>Đang tải đơn hàng...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-8 flex items-center gap-2">
        <Package className="w-6 h-6" />
        Lịch sử đơn hàng
      </h1>

      {orders.length === 0 ? (
        <div className="text-center py-20">
          <Package className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h2 className="text-xl font-semibold mb-2">Chưa có đơn hàng nào</h2>
          <p className="text-gray-600 mb-6">Hãy đặt hàng để xem lịch sử tại đây</p>
          <button
            onClick={() => navigate('/')}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
          >
            Mua sắm ngay
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const StatusIcon = statusConfig[order.status].icon;
            const canCancel = order.status === 'pending';
            
            return (
              <div key={order._id} className="bg-white border rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">Đơn hàng #{order.orderCode.slice(-6)}</h3>
                    <p className="text-sm text-gray-600">
                      Đặt ngày: {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${statusConfig[order.status].color}`}>
                      <StatusIcon className="w-4 h-4" />
                      {statusConfig[order.status].label}
                    </span>
                  </div>
                </div>
                
                {/* Thêm thanh theo dõi trạng thái */}
                <div className="mb-4">
                  <OrderTracking currentStatus={order.status} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="font-medium mb-2">Thông tin giao hàng:</h4>
                    <p className="text-sm text-gray-600">{order.customerInfo.fullName}</p>
                    <p className="text-sm text-gray-600">{order.customerInfo.phone}</p>
                    <p className="text-sm text-gray-600">{order.customerInfo.address}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Thông tin thanh toán:</h4>
                    <p className="text-sm text-gray-600">Phương thức: {order.paymentMethod}</p>
                    <p className="text-sm font-semibold text-red-600">
                      Tổng tiền: {order.totalAmount.toLocaleString()}đ
                    </p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Sản phẩm ({order.items.length}):</h4>
                  <div className="space-y-2">
                    {order.items.length > 0 ? order.items.slice(0, 2).map((item, index) => (
                      <div key={index} className="flex items-center gap-3 text-sm">
                        <img
                          src={item.book_id?.cover_image || '/fallback.jpg'}
                          alt={item.book_id?.title || 'Sản phẩm'}
                          className="w-10 h-12 object-cover rounded"
                        />
                        <span className="flex-1">{item.book_id?.title || 'Sản phẩm'}</span>
                        <span>x{item.quantity}</span>
                        <span className="font-medium">{(item.price || 0).toLocaleString()}đ</span>
                      </div>
                    )) : (
                      <p className="text-sm text-gray-500">Không có sản phẩm</p>
                    )}
                    {order.items.length > 2 && (
                      <p className="text-sm text-gray-500">
                        ... và {order.items.length - 2} sản phẩm khác
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="flex items-center gap-1 px-4 py-2 text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50"
                  >
                    <Eye className="w-4 h-4" />
                    Chi tiết
                  </button>
                  {canCancel && (
                    <button
                      onClick={() => handleCancelOrder(order._id)}
                      className="flex items-center gap-1 px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50"
                    >
                      <X className="w-4 h-4" />
                      Hủy đơn
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal chi tiết đơn hàng */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Chi tiết đơn hàng #{selectedOrder.orderCode.slice(-6)}</h2>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Thông tin khách hàng:</h3>
                  <div className="bg-gray-50 p-3 rounded">
                    <p><strong>Họ tên:</strong> {selectedOrder.customerInfo.fullName}</p>
                    <p><strong>Điện thoại:</strong> {selectedOrder.customerInfo.phone}</p>
                    <p><strong>Địa chỉ:</strong> {selectedOrder.customerInfo.address}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Danh sách sản phẩm:</h3>
                  <div className="space-y-3">
                    {selectedOrder.items.length > 0 ? selectedOrder.items.map((item, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 border rounded">
                        <img
                          src={item.book_id?.cover_image || '/fallback.jpg'}
                          alt={item.book_id?.title || 'Sản phẩm'}
                          className="w-16 h-20 object-cover rounded"
                        />
                        <div className="flex-1">
                          <p className="font-medium">{item.book_id?.title || 'Sản phẩm'}</p>
                          <p className="text-sm text-gray-600">Số lượng: {item.quantity}</p>
                          <p className="text-sm text-gray-600">Đơn giá: {item.price?.toLocaleString() || 0}đ</p>
                        </div>
                        <p className="font-semibold text-red-600">
                          {((item.price || 0) * item.quantity).toLocaleString()}đ
                        </p>
                      </div>
                    )) : (
                      <p className="text-gray-500 text-center py-4">Không có sản phẩm</p>
                    )}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Tổng cộng:</span>
                    <span className="text-red-600">{selectedOrder.totalAmount.toLocaleString()}đ</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;