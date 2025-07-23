import { useState } from 'react'
import { createVNPayPaymentAPI } from '../services/vnpay.service'

const TestVNPay = () => {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const handleTestPayment = async () => {
    setLoading(true)
    setResult(null)
    
    try {
      const testData = {
        amount: 100000, // 100,000 VND
        orderId: `TEST_${Date.now()}`,
        orderData: {
          user_id: '676c123456789012345678ab', // Test user ID
          shipping_address: '123 Test Street, Test City',
          shipping_fee: 30000,
          tax: 0,
          details: [
            {
              book_id: '676c123456789012345678cd', // Test book ID
              quantity: 1,
              price: 70000
            }
          ]
        }
      }
      
      console.log('Testing VNPay payment with:', testData)
      
      const response = await createVNPayPaymentAPI(testData)
      console.log('VNPay response:', response)
      
      if (response.paymentUrl) {
        // Redirect to VNPay
        window.location.href = response.paymentUrl
      } else {
        setResult({ error: 'Không nhận được URL thanh toán' })
      }
    } catch (error: any) {
      console.error('Test payment error:', error)
      setResult({ error: error.message || 'Lỗi khi tạo thanh toán' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Test VNPay Payment với Order Integration</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Thông tin test:</h3>
        <ul>
          <li>Số tiền: 100,000 VND</li>
          <li>Mã đơn hàng: TEST_{Date.now()}</li>
          <li>Địa chỉ giao hàng: 123 Test Street, Test City</li>
          <li>Phí ship: 30,000 VND</li>
          <li>Sản phẩm: 1 cuốn sách (70,000 VND)</li>
        </ul>
      </div>

      <button 
        onClick={handleTestPayment}
        disabled={loading}
        style={{
          padding: '12px 24px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer',
          fontSize: '16px'
        }}
      >
        {loading ? 'Đang tạo thanh toán...' : 'Test Thanh Toán + Tạo Đơn Hàng'}
      </button>

      {result && (
        <div style={{ 
          marginTop: '20px', 
          padding: '15px', 
          backgroundColor: result.error ? '#f8d7da' : '#d4edda',
          border: `1px solid ${result.error ? '#f5c6cb' : '#c3e6cb'}`,
          borderRadius: '4px'
        }}>
          {result.error ? (
            <div>
              <strong>Lỗi:</strong> {result.error}
            </div>
          ) : (
            <div>
              <strong>Thành công:</strong> {JSON.stringify(result, null, 2)}
            </div>
          )}
        </div>
      )}

      <div style={{ marginTop: '30px' }}>
        <h3>Luồng hoạt động:</h3>
        <ol>
          <li>Click "Test Thanh Toán + Tạo Đơn Hàng"</li>
          <li>Chuyển đến trang VNPay sandbox</li>
          <li>Thanh toán với thông tin thẻ test</li>
          <li>VNPay return về trang kết quả</li>
          <li><strong>Backend tự động tạo đơn hàng khi thanh toán thành công</strong></li>
          <li>Hiển thị thông báo thành công với thông tin đơn hàng</li>
        </ol>
        
        <h4>Thông tin thẻ test VNPay:</h4>
        <ul>
          <li>Số thẻ: 9704198526191432198</li>
          <li>Tên chủ thẻ: NGUYEN VAN A</li>
          <li>Ngày hết hạn: 07/15</li>
          <li>Mật khẩu OTP: 123456</li>
        </ul>
      </div>
    </div>
  )
}

export default TestVNPay