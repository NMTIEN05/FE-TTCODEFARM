import React from 'react';
import { Clock, CheckCircle, Truck, Package, RefreshCw, AlertTriangle, ShoppingBag } from 'lucide-react';

interface OrderTrackingProps {
  currentStatus: 'pending' | 'processing' | 'confirmed' | 'ready_to_ship' | 'shipped' | 'delivered' | 'cancelled' | 'returned';
}

const OrderTracking: React.FC<OrderTrackingProps> = ({ currentStatus }) => {
  const steps = [
    { key: 'pending', label: 'Đặt hàng', icon: Clock },
    { key: 'processing', label: 'Xử lý', icon: RefreshCw },
    { key: 'confirmed', label: 'Xác nhận', icon: CheckCircle },
    { key: 'ready_to_ship', label: 'Sẵn sàng giao', icon: ShoppingBag },
    { key: 'shipped', label: 'Đang giao', icon: Truck },
    { key: 'delivered', label: 'Hoàn thành', icon: Package }
  ];

  const getStepStatus = (stepKey: string) => {
    if (currentStatus === 'cancelled') return 'cancelled';
    
    const currentIndex = steps.findIndex(s => s.key === currentStatus);
    const stepIndex = steps.findIndex(s => s.key === stepKey);
    
    if (stepIndex <= currentIndex) return 'completed';
    return 'pending';
  };

  if (currentStatus === 'cancelled' || currentStatus === 'returned') {
    return (
      <div className="flex items-center justify-center p-4 rounded-lg" style={{ 
        backgroundColor: currentStatus === 'cancelled' ? '#FEF2F2' : '#FFF7ED',
        color: currentStatus === 'cancelled' ? '#DC2626' : '#EA580C'
      }}>
        {currentStatus === 'cancelled' ? (
          <span className="font-medium flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Đơn hàng đã bị hủy
          </span>
        ) : (
          <span className="font-medium flex items-center gap-2">
            <RefreshCw className="w-5 h-5" />
            Đơn hàng đã hoàn trả
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const status = getStepStatus(step.key);
        const isCompleted = status === 'completed';
        
        return (
          <div key={step.key} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                isCompleted ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
              }`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className={`text-xs mt-1 ${isCompleted ? 'text-green-600 font-medium' : 'text-gray-500'}`}>
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={`w-16 h-0.5 mx-2 ${
                getStepStatus(steps[index + 1].key) === 'completed' ? 'bg-green-500' : 'bg-gray-300'
              }`} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default OrderTracking;