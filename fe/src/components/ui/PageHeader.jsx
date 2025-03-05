import React from 'react';

/**
 * Komponen PageHeader untuk header halaman
 * @param {Object} props - Component props
 * @param {string} props.title - Judul halaman
 * @param {string} props.subtitle - Subjudul halaman
 * @param {React.ReactNode} props.actions - Aksi tambahan
 * @returns {React.ReactElement}
 */
const PageHeader = ({ title, subtitle, actions }) => {
  return (
    <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        {subtitle && (
          <p className="mt-2 text-gray-600">{subtitle}</p>
        )}
      </div>
      {actions && (
        <div className="mt-4 sm:mt-0">{actions}</div>
      )}
    </div>
  );
};

export default PageHeader; 