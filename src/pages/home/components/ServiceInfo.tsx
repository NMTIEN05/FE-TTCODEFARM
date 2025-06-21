import React from 'react';
import {
  CarOutlined,
  CustomerServiceOutlined,
  SafetyOutlined,
} from '@ant-design/icons';

const iconWrapperStyle = "w-14 h-14 flex items-center justify-center rounded-full border-2 border-black mb-2 bg-black";


const ServiceInfo = () => {
  return (
    <div className="ml-40 mr-40 mt-10 mb-6 flex flex-col md:flex-row justify-between items-center gap-6 py-10 px-4 bg-white">
      {/* Item 1 */}
      <div className="flex flex-col items-center text-center max-w-xs">
        <div className={iconWrapperStyle}>
          <CarOutlined style={{ fontSize: 24, color: '#0d6efd' }} />
        </div>
        <h3 className="font-semibold text-lg">FREE AND FAST DELIVERY</h3>
        <p className="text-gray-500 text-sm">Free delivery for all orders over $140</p>
      </div>

      {/* Item 2 */}
      <div className="flex flex-col items-center text-center max-w-xs">
        <div className={iconWrapperStyle}>
          <CustomerServiceOutlined style={{ fontSize: 24, color: '#0d6efd' }} />
        </div>
        <h3 className="font-semibold text-lg">24/7 CUSTOMER SERVICE</h3>
        <p className="text-gray-500 text-sm">Friendly 24/7 customer support</p>
      </div>

      {/* Item 3 */}
      <div className="flex flex-col items-center text-center max-w-xs">
        <div className={iconWrapperStyle}>
          <SafetyOutlined style={{ fontSize: 24, color: '#0d6efd' }} />
        </div>
        <h3 className="font-semibold text-lg">MONEY BACK GUARANTEE</h3>
        <p className="text-gray-500 text-sm">We return money within 30 days</p>
      </div>
    </div>
  );
};

export default ServiceInfo;
