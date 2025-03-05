import React from 'react';
import { FaSearch } from 'react-icons/fa';

/**
 * Komponen SearchBar untuk pencarian
 * @param {Object} props - Component props
 * @param {string} props.value - Nilai pencarian
 * @param {Function} props.onChange - Fungsi yang dipanggil saat nilai berubah
 * @param {string} props.placeholder - Placeholder
 * @param {string} props.className - Class tambahan
 * @returns {React.ReactElement}
 */
const SearchBar = ({ value, onChange, placeholder = 'Cari...', className = '' }) => {
  return (
    <div className={`relative w-full ${className}`}>
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <FaSearch className="text-gray-400" />
      </div>
      <input
        type="text"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 p-2.5"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar; 