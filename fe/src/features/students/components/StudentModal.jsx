import React from 'react';
import Modal from '../../../components/ui/Modal';
import StudentForm from './StudentForm';

/**
 * Modal untuk menambah, mengedit, atau melihat data siswa
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Apakah modal terbuka
 * @param {Function} props.onClose - Fungsi yang dipanggil saat modal ditutup
 * @param {string} props.mode - Mode modal ('add', 'edit', atau 'view')
 * @param {Object} props.student - Data siswa (untuk mode edit atau view)
 * @param {Function} props.onSubmit - Fungsi yang dipanggil saat form disubmit
 * @returns {React.ReactElement}
 */
const StudentModal = ({ isOpen, onClose, mode = 'add', student, onSubmit }) => {
  // Determine modal title based on mode
  const getModalTitle = () => {
    switch (mode) {
      case 'add':
        return 'Tambah Siswa Baru';
      case 'edit':
        return 'Edit Data Siswa';
      case 'view':
        return 'Detail Siswa';
      default:
        return 'Data Siswa';
    }
  };

  // Determine modal size based on mode
  const getModalSize = () => {
    return mode === 'view' ? 'lg' : 'md';
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={getModalTitle()}
      size={getModalSize()}
    >
      <StudentForm
        student={student}
        onSubmit={onSubmit}
        onCancel={onClose}
        readOnly={mode === 'view'}
      />
    </Modal>
  );
};

export default StudentModal; 