import React from 'react';

/**
 * Komponen LoadingSpinner untuk menampilkan indikator loading
 * @param {Object} props - Component props
 * @param {string} props.size - Ukuran spinner (sm, md, lg)
 * @param {string} props.color - Warna spinner
 * @returns {React.ReactElement}
 */
const LoadingSpinner = ({ size = 'md', color = 'indigo' }) => {
  // Size classes
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
  };

  // Color classes
  const colorClasses = {
    indigo: 'border-indigo-500',
    red: 'border-red-500',
    blue: 'border-blue-500',
    green: 'border-green-500',
    gray: 'border-gray-500',
  };

  return (
    <div className="flex justify-center items-center">
      <div 
        className={`animate-spin rounded-full border-t-2 border-b-2 ${colorClasses[color]} ${sizeClasses[size]}`}
      ></div>
    </div>
  );
};

export default LoadingSpinner; 