import { useState, useCallback } from 'react';

/**
 * Hook untuk mengelola state modal
 * @param {boolean} initialState - State awal modal (default: false)
 * @returns {Object} - Object berisi state dan fungsi untuk mengelola modal
 */
const useModal = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);
  const [modalData, setModalData] = useState(null);

  const openModal = useCallback((data = null) => {
    setModalData(data);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    // Reset data after animation completes
    setTimeout(() => {
      setModalData(null);
    }, 300);
  }, []);

  return {
    isOpen,
    modalData,
    openModal,
    closeModal,
  };
};

export default useModal; 