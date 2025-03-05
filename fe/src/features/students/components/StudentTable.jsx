import React, { useState, useMemo } from 'react';
import { FaEdit, FaTrash, FaFilePdf, FaEye, FaSpinner } from 'react-icons/fa';
import Table from '../../../components/ui/Table';
import Button from '../../../components/ui/Button';

/**
 * Tabel untuk menampilkan data siswa
 * @param {Object} props - Component props
 * @param {Array} props.students - Data siswa
 * @param {Function} props.onEdit - Fungsi yang dipanggil saat tombol edit diklik
 * @param {Function} props.onDelete - Fungsi yang dipanggil saat tombol hapus diklik
 * @param {Function} props.onView - Fungsi yang dipanggil saat tombol lihat diklik
 * @param {Function} props.onViewFile - Fungsi yang dipanggil saat tombol lihat file diklik
 * @returns {React.ReactElement}
 */
const StudentTable = ({ students, onEdit, onDelete, onView, onViewFile }) => {
  const [loadingFiles, setLoadingFiles] = useState({});

  // Handle view file
  const handleViewFile = async (studentId) => {
    try {
      setLoadingFiles(prev => ({ ...prev, [studentId]: true }));
      const signedUrl = await onViewFile(studentId);
      
      // Open the file in a new tab
      window.open(signedUrl, '_blank');
    } catch (error) {
      console.error('Error getting signed URL:', error);
      alert('Gagal membuka file. Silakan coba lagi.');
    } finally {
      setLoadingFiles(prev => ({ ...prev, [studentId]: false }));
    }
  };

  // Define table columns
  const columns = useMemo(() => [
    {
      key: 'name',
      header: 'Nama Siswa',
      render: (student) => (
        <div className="text-sm font-medium text-gray-900">{student.name}</div>
      ),
    },
    {
      key: 'class',
      header: 'Kelas',
      render: (student) => (
        <div className="text-sm text-gray-500">{student.class}</div>
      ),
    },
    {
      key: 'parentName',
      header: 'Nama Orangtua',
      render: (student) => (
        <div className="text-sm text-gray-500">{student.parentName}</div>
      ),
    },
    {
      key: 'score',
      header: 'Nilai',
      render: (student) => (
        <div className="text-sm text-gray-500">{student.score}</div>
      ),
    },
    {
      key: 'fileUrl',
      header: 'File',
      render: (student) => (
        student.fileUrl ? (
          <Button
            variant="secondary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              handleViewFile(student.id);
            }}
            isLoading={loadingFiles[student.id]}
            icon={loadingFiles[student.id] ? <FaSpinner /> : <FaFilePdf />}
            className="text-blue-600 hover:text-blue-900"
          >
            {loadingFiles[student.id] ? 'Memuat...' : 'Lihat PDF'}
          </Button>
        ) : (
          <span className="text-sm text-gray-500">Tidak ada file</span>
        )
      ),
    },
    {
      key: 'actions',
      header: 'Aksi',
      render: (student) => (
        <div className="flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onView(student);
            }}
            className="text-blue-600 hover:text-blue-900"
            title="Lihat Detail"
          >
            <FaEye />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(student);
            }}
            className="text-indigo-600 hover:text-indigo-900"
            title="Edit"
          >
            <FaEdit />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(student.id);
            }}
            className="text-red-600 hover:text-red-900"
            title="Hapus"
          >
            <FaTrash />
          </button>
        </div>
      ),
    },
  ], [loadingFiles, onDelete, onEdit, onView, onViewFile]);

  return (
    <Table
      columns={columns}
      data={students}
      emptyMessage="Tidak ada data siswa"
    />
  );
};

export default StudentTable; 