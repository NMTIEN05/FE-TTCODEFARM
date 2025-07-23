import React from 'react';
import { Link } from 'react-router-dom';
import { HeartOutlined, ShoppingOutlined, SearchOutlined, FireOutlined } from '@ant-design/icons';

const QuickActions: React.FC = () => {
  const actions = [
    {
      icon: <FireOutlined className="text-2xl" />,
      title: 'Flash Sale',
      description: 'Giảm giá sốc',
      link: '/allproduct',
      color: 'from-red-500 to-orange-500'
    },
    {
      icon: <ShoppingOutlined className="text-2xl" />,
      title: 'Tất cả sách',
      description: 'Khám phá ngay',
      link: '/allproduct',
      color: 'from-blue-500 to-purple-500'
    },
    {
      icon: <HeartOutlined className="text-2xl" />,
      title: 'Yêu thích',
      description: 'Sách đã lưu',
      link: '/wishlist',
      color: 'from-pink-500 to-red-500'
    },
    {
      icon: <SearchOutlined className="text-2xl" />,
      title: 'Tìm kiếm',
      description: 'Tìm sách hay',
      link: '/search',
      color: 'from-green-500 to-teal-500'
    }
  ];

  return (
    <div className="mx-4 md:mx-20 lg:mx-40 mt-16 mb-16">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          Truy cập nhanh
        </h2>
        <p className="text-gray-600">Các tính năng phổ biến nhất</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {actions.map((action, index) => (
          <Link
            key={index}
            to={action.link}
            className="group relative overflow-hidden rounded-2xl p-6 text-center text-white transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            style={{
              background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
              backgroundImage: `linear-gradient(135deg, ${action.color.split(' ')[1]}, ${action.color.split(' ')[3]})`
            }}
          >
            <div className="relative z-10">
              <div className="mb-3 flex justify-center">
                {action.icon}
              </div>
              <h3 className="font-semibold text-lg mb-1">{action.title}</h3>
              <p className="text-sm opacity-90">{action.description}</p>
            </div>
            
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;