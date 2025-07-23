import axios from 'axios';

const API_BASE_URL = 'http://localhost:8888/api';

export interface CreateOrderData {
  user_id?: string;
  cart_id?: string;
  total_amount: number;
  shipping_address: string;
  payment_method: string;
  shipping_fee?: number;
  tax?: number;
  status?: string;
  details: Array<{
    book_id: string;
    quantity: number;
    price: number;
  }>;
}

export interface Order {
  _id: string;
  user_id?: {
    _id: string;
    fullname: string;
    email: string;
  };
  cart_id?: string;
  total_amount: number;
  status: string;
  order_date: string;
  shipping_address: string;
  payment_method: string;
  shipping_fee: number;
  tax: number;
  details?: Array<{
    book_id: {
      title: string;
      cover_image: string;
    };
    quantity: number;
    price: number;
  }>;
}

export const orderService = {
  // Tạo đơn hàng mới
  createOrder: async (orderData: CreateOrderData): Promise<Order> => {
    const response = await axios.post(`${API_BASE_URL}/orders/add`, orderData);
    console.log('API Response:', response.data);
    return response.data.data || response.data;
  },

  // Lấy danh sách đơn hàng của user
  getUserOrders: async (userId: string): Promise<Order[]> => {
    try {
      if (!userId) {
        throw new Error('UserId là bắt buộc');
      }
      const response = await axios.get(`${API_BASE_URL}/orders/user/${userId}`);
      console.log('getUserOrders response:', response.data);
      return response.data.data || [];
    } catch (error) {
      console.error('getUserOrders error:', error);
      return [];
    }
  },

  // Lấy chi tiết đơn hàng
  getOrderById: async (orderId: string): Promise<Order> => {
    const response = await axios.get(`${API_BASE_URL}/orders/${orderId}`);
    return response.data.data;
  },

  // Hủy đơn hàng
  cancelOrder: async (orderId: string): Promise<Order> => {
    const response = await axios.patch(`${API_BASE_URL}/orders/cancel/${orderId}`);
    return response.data.data;
  },

  // Cập nhật trạng thái đơn hàng
  updateOrderStatus: async (orderId: string, status: string): Promise<Order> => {
    const response = await axios.patch(`${API_BASE_URL}/orders/status/${orderId}`, { status });
    return response.data.data;
  }
};