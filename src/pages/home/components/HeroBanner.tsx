import React from 'react';
import { Link } from 'react-router-dom';

const HeroBanner: React.FC = () => {
  return (
    <div className="mx-4 md:mx-20 lg:mx-40 mt-10">
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative px-8 py-16 md:py-24 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Khám Phá Thế Giới Sách
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Hàng ngàn đầu sách hay, giá tốt nhất. Đọc sách là hành trình khám phá tri thức vô tận.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/allproduct"
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Khám Phá Sách Ngay
            </Link>
            <Link 
              to="/wishlist"
              className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
            >
              Danh Sách Yêu Thích
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;