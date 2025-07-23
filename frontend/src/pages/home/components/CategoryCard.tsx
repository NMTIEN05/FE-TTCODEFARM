import React from 'react';
import { Link } from 'react-router-dom';
import { ICategory } from '../../../types/Category';

interface CategoryCardProps {
  category: ICategory;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link
      to={`/category/${category._id}`}
      className="group flex items-center py-2 md:py-3 px-3 md:px-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-95"
    >
      <span className="text-sm md:text-base text-gray-700 group-hover:text-gray-900 font-medium transition-colors duration-300">
        {category.name}
      </span>
      <svg
        className="ml-auto w-4 h-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  );
};