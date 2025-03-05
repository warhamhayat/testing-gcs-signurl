import React, { useState } from 'react';
import { FaEdit, FaTrash, FaFilePdf, FaEye, FaSpinner } from 'react-icons/fa';
import config from '../config';
import api from '../services/api';

const StudentTable = ({ students, onEdit, onDelete, onView }) => {
  const [loadingFiles, setLoadingFiles] = useState({});

  const handleViewFile = async (studentId) => {
    try {
      setLoadingFiles(prev => ({ ...prev, [studentId]: true }));
      const signedUrl = await api.getFileSignedUrl(studentId);
      
      // Open the file in a new tab
      window.open(signedUrl, '_blank');
    } catch (error) {
      console.error('Error getting signed URL:', error);
      alert('Gagal membuka file. Silakan coba lagi.');
    } finally {
      setLoadingFiles(prev => ({ ...prev, [studentId]: false }));
    }
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nama Siswa
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Kelas
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nama Orangtua
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nilai
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              File
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {students.length > 0 ? (
            students.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{student.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{student.class}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{student.parentName}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{student.score}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {student.fileUrl ? (
                    <button
                      onClick={() => handleViewFile(student.id)}
                      disabled={loadingFiles[student.id]}
                      className="text-blue-600 hover:text-blue-900 flex items-center"
                    >
                      {loadingFiles[student.id] ? (
                        <FaSpinner className="mr-1 animate-spin" />
                      ) : (
                        <FaFilePdf className="mr-1" />
                      )}
                      <span className="text-sm">
                        {loadingFiles[student.id] ? 'Memuat...' : 'Lihat PDF'}
                      </span>
                    </button>
                  ) : (
                    <span className="text-sm text-gray-500">Tidak ada file</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onView(student)}
                      className="text-blue-600 hover:text-blue-900"
                      title="Lihat Detail"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => onEdit(student)}
                      className="text-indigo-600 hover:text-indigo-900"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => onDelete(student.id)}
                      className="text-red-600 hover:text-red-900"
                      title="Hapus"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                Tidak ada data siswa
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable; 