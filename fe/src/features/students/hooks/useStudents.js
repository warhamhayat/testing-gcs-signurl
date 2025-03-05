import { useState, useEffect, useCallback } from 'react';
import api from '../../../services/api';

/**
 * Hook untuk mengelola data siswa
 * @returns {Object} - Object berisi data dan fungsi untuk mengelola siswa
 */
const useStudents = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch students data
  const fetchStudents = useCallback(async () => {
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
  }, []);

  // Create a new student
  const createStudent = useCallback(async (studentData) => {
    try {
      await api.createStudent(studentData);
      await fetchStudents();
      return { success: true };
    } catch (error) {
      console.error('Error creating student:', error);
      return { 
        success: false, 
        error: 'Gagal menyimpan data siswa. Silakan coba lagi.' 
      };
    }
  }, [fetchStudents]);

  // Update a student
  const updateStudent = useCallback(async (id, studentData) => {
    try {
      await api.updateStudent(id, studentData);
      await fetchStudents();
      return { success: true };
    } catch (error) {
      console.error(`Error updating student ${id}:`, error);
      return { 
        success: false, 
        error: 'Gagal memperbarui data siswa. Silakan coba lagi.' 
      };
    }
  }, [fetchStudents]);

  // Delete a student
  const deleteStudent = useCallback(async (id) => {
    try {
      await api.deleteStudent(id);
      await fetchStudents();
      return { success: true };
    } catch (error) {
      console.error(`Error deleting student ${id}:`, error);
      return { 
        success: false, 
        error: 'Gagal menghapus data siswa. Silakan coba lagi.' 
      };
    }
  }, [fetchStudents]);

  // Get file signed URL
  const getFileSignedUrl = useCallback(async (studentId) => {
    try {
      return await api.getFileSignedUrl(studentId);
    } catch (error) {
      console.error(`Error getting signed URL for student ${studentId}:`, error);
      throw error;
    }
  }, []);

  // Filter students based on search term
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

  // Initial fetch
  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  return {
    students,
    filteredStudents,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    fetchStudents,
    createStudent,
    updateStudent,
    deleteStudent,
    getFileSignedUrl,
  };
};

export default useStudents; 