import axios from 'axios';
import config from '../config';

const API_URL = config.apiUrl;

/**
 * Service untuk mengakses API
 */
const api = {
  /**
   * Mengambil semua data siswa
   * @returns {Promise<Array>} - Array data siswa
   */
  getStudents: async () => {
    try {
      const response = await axios.get(`${API_URL}/students`);
      return response.data;
    } catch (error) {
      console.error('Error fetching students:', error);
      throw error;
    }
  },
  
  /**
   * Mengambil data siswa berdasarkan ID
   * @param {string} id - ID siswa
   * @returns {Promise<Object>} - Data siswa
   */
  getStudent: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/students/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching student ${id}:`, error);
      throw error;
    }
  },
  
  /**
   * Mengambil signed URL untuk file siswa
   * @param {string} studentId - ID siswa
   * @returns {Promise<string>} - Signed URL
   */
  getFileSignedUrl: async (studentId) => {
    try {
      const response = await axios.get(`${API_URL}/files/${studentId}`);
      return response.data.signedUrl;
    } catch (error) {
      console.error(`Error getting signed URL for student ${studentId}:`, error);
      throw error;
    }
  },
  
  /**
   * Membuat data siswa baru
   * @param {Object} studentData - Data siswa
   * @returns {Promise<Object>} - Data siswa yang dibuat
   */
  createStudent: async (studentData) => {
    try {
      const formData = new FormData();
      
      // Add student data to form
      formData.append('name', studentData.name);
      formData.append('class', studentData.class);
      formData.append('parentName', studentData.parentName);
      formData.append('score', studentData.score);
      
      // Add file if exists
      if (studentData.file) {
        formData.append('file', studentData.file);
      }
      
      const response = await axios.post(`${API_URL}/students`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return response.data;
    } catch (error) {
      console.error('Error creating student:', error);
      throw error;
    }
  },
  
  /**
   * Memperbarui data siswa
   * @param {string} id - ID siswa
   * @param {Object} studentData - Data siswa
   * @returns {Promise<Object>} - Data siswa yang diperbarui
   */
  updateStudent: async (id, studentData) => {
    try {
      const formData = new FormData();
      
      // Add student data to form
      formData.append('name', studentData.name);
      formData.append('class', studentData.class);
      formData.append('parentName', studentData.parentName);
      formData.append('score', studentData.score);
      
      // Add file if exists
      if (studentData.file) {
        formData.append('file', studentData.file);
      }
      
      const response = await axios.put(`${API_URL}/students/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return response.data;
    } catch (error) {
      console.error(`Error updating student ${id}:`, error);
      throw error;
    }
  },
  
  /**
   * Menghapus data siswa
   * @param {string} id - ID siswa
   * @returns {Promise<Object>} - Response data
   */
  deleteStudent: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/students/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting student ${id}:`, error);
      throw error;
    }
  },
};

export default api;