import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { verifyVNPayReturnAPI } from '../../services/vnpay.service'
import '../../css/vnpay.css'

const VNPayReturnPage = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        console.log('VNPay Return Page loaded')
        console.log('Current URL:', window.location.href)
        console.log('Search params:', Object.fromEntries(searchParams.entries()))
        
        // Gọi API backend để verify payment
        const data = await verifyVNPayReturnAPI(searchParams)
        console.log('Backend verification result:', data)
        
        setResult({
          success: data.success,
          message: data.success ? 'Thanh toán thành công!' : 'Thanh toán thất bại!',
          orderId: data.data?.orderId || searchParams.get('vnp_TxnRef'),
          amount: data.data?.amount || (searchParams.get('vnp_Amount') ? parseInt(searchParams.get('vnp_Amount')!) / 100 : 0),
          transactionNo: data.data?.transactionNo || searchParams.get('vnp_TransactionNo'),
          bankCode: data.data?.bankCode || searchParams.get('vnp_BankCode'),
          payDate: data.data?.payDate || searchParams.get('vnp_PayDate'),
          verified: data.verified,
          order_id: data.data?.order_id // ID đơn hàng đã tạo
        })
      } catch (error) {
        console.error('Error verifying payment:', error)
        // Fallback to client-side processing if API fails
        const responseCode = searchParams.get('vnp_ResponseCode')
        const isSuccess = responseCode === '00'
        
        setResult({
          success: isSuccess,
          message: isSuccess ? 'Thanh toán thành công!' : 'Thanh toán thất bại!',
          orderId: searchParams.get('vnp_TxnRef'),
          amount: searchParams.get('vnp_Amount') ? parseInt(searchParams.get('vnp_Amount')!) / 100 : 0,
          transactionNo: searchParams.get('vnp_TransactionNo'),
          bankCode: searchParams.get('vnp_BankCode'),
          payDate: searchParams.get('vnp_PayDate'),
          verified: false,
          order_id: null
        })
      } finally {
        setLoading(false)
      }
    }

    verifyPayment()
  }, [searchParams])

  if (loading || !result) {
    console.log('Loading or result is null, showing loading...')
    return (
      <div style={styles.container}>
        <div style={styles.loadingCard}>
          <div style={styles.spinner}></div>
          <p style={styles.loadingText}>Đang xử lý kết quả thanh toán...</p>
        </div>
      </div>
    )
  }
  
  console.log('Rendering result:', result)

  return (
    <div style={styles.container}>
      <div style={{
        ...styles.card,
        borderTop: `4px solid ${result.success ? '#10B981' : '#EF4444'}`
      }}>
        <div style={styles.header}>
          <div style={styles.logoContainer}>
            <div style={styles.logoPlaceholder}>
              <img src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-VNPAY-QR-350x65.png" alt="VNPay Logo" style={{ maxWidth: '100%', height: 'auto' }} />
            </div>
          </div>
          <div style={styles.statusIcon}>
            {result.success ? (
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" fill="#10B981"/>
                <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" fill="#EF4444"/>
                <path d="M15 9l-6 6M9 9l6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </div>
        </div>

        <div style={styles.messageSection}>
          <h1 style={{
            ...styles.title,
            color: result.success ? '#10B981' : '#EF4444'
          }}>
            {result.message}
          </h1>
          <p style={styles.subtitle}>
            {result.success 
              ? 'Giao dịch của bạn đã được xử lý thành công và đơn hàng đã được tạo'
              : 'Giao dịch không thành công, vui lòng thử lại'
            }
          </p>
        </div>

        <div style={styles.detailsSection}>
          <h3 style={styles.detailsTitle}>Thông tin giao dịch</h3>
          <div style={styles.detailsGrid}>
            <div style={styles.detailItem}>
              <span style={styles.detailLabel}>Mã đơn hàng:</span>
              <span style={styles.detailValue}>{result.orderId}</span>
            </div>
            <div style={styles.detailItem}>
              <span style={styles.detailLabel}>Số tiền:</span>
              <span style={styles.detailValue}>
                {result.amount?.toLocaleString('vi-VN')} VNĐ
              </span>
            </div>
            <div style={styles.detailItem}>
              <span style={styles.detailLabel}>Mã giao dịch:</span>
              <span style={styles.detailValue}>{result.transactionNo}</span>
            </div>
            <div style={styles.detailItem}>
              <span style={styles.detailLabel}>Ngân hàng:</span>
              <span style={styles.detailValue}>{result.bankCode}</span>
            </div>
            {result.payDate && (
              <div style={styles.detailItem}>
                <span style={styles.detailLabel}>Thời gian:</span>
                <span style={styles.detailValue}>
                  {result.payDate.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$3/$2/$1 $4:$5:$6')}
                </span>
              </div>
            )}
            {result.order_id && (
              <div style={styles.detailItem}>
                <span style={styles.detailLabel}>Mã đơn hàng:</span>
                <span style={styles.detailValue}>{result.order_id}</span>
              </div>
            )}
          </div>
        </div>

        <div style={styles.actionSection}>
          {result.success ? (
            <>
              <button 
                onClick={() => navigate('/orders')}
                style={styles.primaryButton}
              >
                Xem đơn hàng
              </button>
              <button 
                onClick={() => navigate('/')}
                style={styles.secondaryButton}
              >
                Tiếp tục mua sắm
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => navigate('/checkout')}
                style={styles.primaryButton}
              >
                Thử lại
              </button>
              <button 
                onClick={() => navigate('/')}
                style={styles.secondaryButton}
              >
                Về trang chủ
              </button>
            </>
          )}
        </div>

        <div style={styles.footer}>
          <p style={styles.footerText}>
            Nếu có thắc mắc, vui lòng liên hệ hỗ trợ khách hàng
          </p>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#F3F4F6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  loadingCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '40px',
    textAlign: 'center' as const,
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #E5E7EB',
    borderTop: '4px solid #3B82F6',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    margin: '0 auto 20px'
  },
  loadingText: {
    color: '#6B7280',
    fontSize: '16px',
    margin: 0
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '0',
    maxWidth: '600px',
    width: '100%',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    overflow: 'hidden'
  },
  header: {
    padding: '30px 30px 20px',
    textAlign: 'center' as const,
    backgroundColor: '#FAFAFA'
  },
  logoContainer: {
    marginBottom: '20px'
  },
  logoPlaceholder: {
    display: 'inline-block',
    padding: '12px 24px',
    backgroundColor: 'transparent',
    borderRadius: '8px',
    color: '#6B7280',
    fontSize: '14px',
    fontWeight: 'bold'
  },
  statusIcon: {
    display: 'flex',
    justifyContent: 'center'
  },
  messageSection: {
    padding: '20px 30px',
    textAlign: 'center' as const
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    margin: '0 0 10px 0'
  },
  subtitle: {
    fontSize: '16px',
    color: '#6B7280',
    margin: 0
  },
  detailsSection: {
    padding: '20px 30px',
    backgroundColor: '#F9FAFB',
    borderTop: '1px solid #E5E7EB',
    borderBottom: '1px solid #E5E7EB'
  },
  detailsTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#374151',
    margin: '0 0 20px 0'
  },
  detailsGrid: {
    display: 'grid',
    gap: '12px'
  },
  detailItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 0'
  },
  detailLabel: {
    fontSize: '14px',
    color: '#6B7280',
    fontWeight: '500'
  },
  detailValue: {
    fontSize: '14px',
    color: '#111827',
    fontWeight: '600'
  },
  actionSection: {
    padding: '30px',
    display: 'flex',
    gap: '12px',
    flexDirection: 'column' as const
  },
  primaryButton: {
    backgroundColor: '#3B82F6',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    color: '#6B7280',
    border: '1px solid #D1D5DB',
    borderRadius: '8px',
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  footer: {
    padding: '20px 30px',
    backgroundColor: '#F9FAFB',
    textAlign: 'center' as const
  },
  footerText: {
    fontSize: '12px',
    color: '#9CA3AF',
    margin: 0
  }
}

export default VNPayReturnPage