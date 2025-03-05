import React from 'react';
import Modal from '../../../components/ui/Modal';
import Button from '../../../components/ui/Button';

/**
 * Modal konfirmasi hapus siswa
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Apakah modal terbuka
 * @param {Function} props.onClose - Fungsi yang dipanggil saat modal ditutup
 * @param {Object} props.student - Data siswa yang akan dihapus
 * @param {Function} props.onConfirm - Fungsi yang dipanggil saat konfirmasi
 * @param {boolean} props.isLoading - Apakah sedang loading
 * @returns {React.ReactElement}
 */
const DeleteConfirmationModal = ({ isOpen, onClose, student, onConfirm, isLoading }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Konfirmasi Hapus"
      size="sm"
    >
      <div className="p-4">
        <p className="mb-4">
          Apakah Anda yakin ingin menghapus data siswa{' '}
          <span className="font-semibold">{student?.name}</span>?
        </p>
        <p className="mb-4 text-sm text-red-600">
          Tindakan ini tidak dapat dibatalkan dan akan menghapus semua data termasuk file yang telah diunggah.
        </p>
        <div className="flex justify-end space-x-3">
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={isLoading}
          >
            Batal
          </Button>
          <Button
            variant="danger"
            onClick={onConfirm}
            isLoading={isLoading}
          >
            Hapus
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal; 