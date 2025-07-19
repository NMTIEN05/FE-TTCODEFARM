import axiosInstance from '../utils/axiosInstant';

export const couponService = {
  // Kiểm tra mã giảm giá
  validateCoupon: async (code: string, totalAmount: number) => {
    try {
      const response = await axiosInstance.post('/api/coupons/validate', { 
        code, 
        totalAmount 
      });
      
      console.log('Raw API response:', response.data);
      
      // Xử lý dữ liệu trả về từ API
      if (response.data && response.data.data) {
        // Đảm bảo các giá trị số được chuyển đổi đúng
        const processedData = {
          ...response.data,
          data: {
            ...response.data.data,
            discountPercent: parseFloat(response.data.data.discountPercent) || 0,
            discountAmount: parseFloat(response.data.data.discountAmount) || 0,
            finalAmount: parseFloat(response.data.data.finalAmount) || totalAmount
          }
        };
        return processedData;
      }
      
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};