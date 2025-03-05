import axios from 'axios';
import config from '../config';

const API_URL = config.apiUrl;

const api = {
  // Get all students
  getStudents: async () => {
    try {
      const response = await axios.get(`${API_URL}/students`);
      return response.data;
    } catch (error) {
      console.error('Error fetching students:', error);
      throw error;
    }
  },
  
  // Get a single student
  getStudent: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/students/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching student ${id}:`, error);
      throw error;
    }
  },
  
  // Get signed URL for a file
  getFileSignedUrl: async (studentId) => {
    try {
      const response = await axios.get(`${API_URL}/files/${studentId}`);
      return response.data.signedUrl;
    } catch (error) {
      console.error(`Error getting signed URL for student ${studentId}:`, error);
      throw error;
    }
  },
  
  // Create a new student
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
  
  // Update a student
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
  
  // Delete a student
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