import React from 'react';

/**
 * Layout utama aplikasi
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Konten halaman
 * @returns {React.ReactElement}
 */
const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-indigo-600">Aplikasi Manajemen Siswa</h1>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-white shadow-inner mt-auto">
        <div className="container mx-auto px-4 py-4 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Aplikasi Manajemen Siswa
        </div>
      </footer>
    </div>
  );
};

export default MainLayout; 