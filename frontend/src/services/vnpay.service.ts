const API_BASE_URL = 'http://localhost:8888'

export interface VNPayPaymentRequest {
  amount: number
  orderId: string
  orderData: {
    user_id?: string
    cart_id?: string
    shipping_address: string
    shipping_fee?: number
    tax?: number
    details: Array<{
      book_id: string
      variant_id?: string
      quantity: number
      price: number
    }>
  }
}

export interface VNPayPaymentResponse {
  success?: boolean
  paymentUrl: string
  message?: string
  error?: string
}

export interface VNPayReturnResponse {
  success: boolean
  message: string
  data?: any
  code?: string
  verified?: boolean
}

export const createVNPayPaymentAPI = async (data: VNPayPaymentRequest): Promise<VNPayPaymentResponse> => {
  try {
    console.log('Sending VNPay payment request:', data)
    const response = await fetch(`${API_BASE_URL}/api/payment/vnpay/create-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    
    const result = await response.json()
    console.log('VNPay payment response:', result)
    
    if (!response.ok) {
      console.error('API Error Response:', result)
      console.error('Backend received:', result.received)
      throw new Error(result.message || `HTTP ${response.status}: ${response.statusText}`)
    }
    
    if (!result.paymentUrl) {
      throw new Error(result.message || 'Không nhận được URL thanh toán từ VNPay!')
    }
    
    return result
  } catch (error) {
    console.error('VNPay API Error:', error)
    throw error
  }
}

export const verifyVNPayReturnAPI = async (params: URLSearchParams): Promise<VNPayReturnResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/payment/vnpay/return?${params.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  
  const result = await response.json()
  return result
}