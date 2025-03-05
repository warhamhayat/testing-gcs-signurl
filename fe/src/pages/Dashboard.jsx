import React, { useState, useEffect } from 'react';
import { FaPlus, FaSearch } from 'react-icons/fa';
import StudentTable from '../components/StudentTable';
import StudentForm from '../components/StudentForm';
import Modal from '../components/Modal';
import api from '../services/api';

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [currentStudent, setCurrentStudent] = useState(null);
  const [modalMode, setModalMode] = useState('add'); // 'add', 'edit', or 'view'
  
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredStudents(students);
    } else {
      const filtered = students.filter(
        (student) =>
          student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.parentName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredStudents(filtered);
    }
  }, [searchTerm, students]);

  const fetchStudents = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.getStudents();
      setStudents(data);
      setFilteredStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
      setError('Gagal memuat data siswa. Silakan coba lagi nanti.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddClick = () => {
    setModalTitle('Tambah Siswa Baru');
    setCurrentStudent(null);
    setModalMode('add');
    setIsModalOpen(true);
  };

  const handleEditClick = (student) => {
    setModalTitle('Edit Data Siswa');
    setCurrentStudent(student);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleViewClick = (student) => {
    setModalTitle('Detail Siswa');
    setCurrentStudent(student);
    setModalMode('view');
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    const student = students.find((s) => s.id === id);
    setStudentToDelete(student);
    setIsDeleteModalOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (modalMode === 'add') {
        await api.createStudent(formData);
      } else if (modalMode === 'edit') {
        await api.updateStudent(currentStudent.id, formData);
      }
      
      setIsModalOpen(false);
      fetchStudents();
    } catch (error) {
      console.error('Error saving student:', error);
      alert('Gagal menyimpan data siswa. Silakan coba lagi.');
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await api.deleteStudent(studentToDelete.id);
      setIsDeleteModalOpen(false);
      fetchStudents();
    } catch (error) {
      console.error('Error deleting student:', error);
      alert('Gagal menghapus data siswa. Silakan coba lagi.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Siswa</h1>
        <p className="mt-2 text-gray-600">
          Kelola data siswa, nilai, dan file dokumen
        </p>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 p-2.5"
            placeholder="Cari siswa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          onClick={handleAddClick}
          className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:border-indigo-900 focus:ring ring-indigo-300 disabled:opacity-25 transition ease-in-out duration-150"
        >
          <FaPlus className="mr-2" />
          Tambah Siswa
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error! </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      ) : (
        <StudentTable
          students={filteredStudents}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
          onView={handleViewClick}
        />
      )}

      {/* Form Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalTitle}
      >
        <StudentForm
          student={currentStudent}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsModalOpen(false)}
          readOnly={modalMode === 'view'}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Konfirmasi Hapus"
      >
        <div className="p-4">
          <p className="mb-4">
            Apakah Anda yakin ingin menghapus data siswa{' '}
            <span className="font-semibold">{studentToDelete?.name}</span>?
          </p>
          <p className="mb-4 text-sm text-red-600">
            Tindakan ini tidak dapat dibatalkan dan akan menghapus semua data termasuk file yang telah diunggah.
          </p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Batal
            </button>
            <button
              onClick={handleDeleteConfirm}
              className="inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Hapus
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Dashboard; 