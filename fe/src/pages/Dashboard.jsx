import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import MainLayout from '../layouts/MainLayout';
import PageHeader from '../components/ui/PageHeader';
import Button from '../components/ui/Button';
import SearchBar from '../components/ui/SearchBar';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorAlert from '../components/ui/ErrorAlert';
import StudentTable from '../features/students/components/StudentTable';
import StudentModal from '../features/students/components/StudentModal';
import DeleteConfirmationModal from '../features/students/components/DeleteConfirmationModal';
import useStudents from '../features/students/hooks/useStudents';
import useModal from '../hooks/useModal';

/**
 * Halaman Dashboard untuk mengelola data siswa
 * @returns {React.ReactElement}
 */
const Dashboard = () => {
  // Student data and operations
  const {
    filteredStudents,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    createStudent,
    updateStudent,
    deleteStudent,
    getFileSignedUrl,
  } = useStudents();

  // Student modal state
  const {
    isOpen: isStudentModalOpen,
    modalData: currentStudent,
    openModal: openStudentModal,
    closeModal: closeStudentModal,
  } = useModal();

  // Delete confirmation modal state
  const {
    isOpen: isDeleteModalOpen,
    modalData: studentToDelete,
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
  } = useModal();

  // Modal mode state (add, edit, view)
  const [modalMode, setModalMode] = useState('add');
  
  // Delete loading state
  const [isDeleting, setIsDeleting] = useState(false);

  // Handle add button click
  const handleAddClick = () => {
    setModalMode('add');
    openStudentModal(null);
  };

  // Handle edit button click
  const handleEditClick = (student) => {
    setModalMode('edit');
    openStudentModal(student);
  };

  // Handle view button click
  const handleViewClick = (student) => {
    setModalMode('view');
    openStudentModal(student);
  };

  // Handle delete button click
  const handleDeleteClick = (id) => {
    const student = filteredStudents.find((s) => s.id === id);
    openDeleteModal(student);
  };

  // Handle form submission
  const handleFormSubmit = async (formData) => {
    try {
      if (modalMode === 'add') {
        const result = await createStudent(formData);
        if (!result.success) {
          alert(result.error);
          return;
        }
      } else if (modalMode === 'edit') {
        const result = await updateStudent(currentStudent.id, formData);
        if (!result.success) {
          alert(result.error);
          return;
        }
      }
      
      closeStudentModal();
    } catch (error) {
      console.error('Error saving student:', error);
      alert('Gagal menyimpan data siswa. Silakan coba lagi.');
    }
  };

  // Handle delete confirmation
  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteStudent(studentToDelete.id);
      if (result.success) {
        closeDeleteModal();
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error('Error deleting student:', error);
      alert('Gagal menghapus data siswa. Silakan coba lagi.');
    } finally {
      setIsDeleting(false);
    }
  };

  // Render add button
  const renderAddButton = () => (
    <Button
      variant="primary"
      icon={<FaPlus />}
      onClick={handleAddClick}
    >
      Tambah Siswa
    </Button>
  );

  return (
    <MainLayout>
      <PageHeader
        title="Dashboard Siswa"
        subtitle="Kelola data siswa, nilai, dan file dokumen"
        actions={renderAddButton()}
      />

      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Cari siswa..."
          className="w-full sm:w-64"
        />
      </div>

      {error && (
        <ErrorAlert
          message={error}
          onDismiss={() => {}}
        />
      )}

      {isLoading ? (
        <div className="h-64">
          <LoadingSpinner />
        </div>
      ) : (
        <StudentTable
          students={filteredStudents}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
          onView={handleViewClick}
          onViewFile={getFileSignedUrl}
        />
      )}

      {/* Student Modal */}
      <StudentModal
        isOpen={isStudentModalOpen}
        onClose={closeStudentModal}
        mode={modalMode}
        student={currentStudent}
        onSubmit={handleFormSubmit}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        student={studentToDelete}
        onConfirm={handleDeleteConfirm}
        isLoading={isDeleting}
      />
    </MainLayout>
  );
};

export default Dashboard;