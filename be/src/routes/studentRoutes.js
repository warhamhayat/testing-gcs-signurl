const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const upload = require('../middleware/upload');

// Get all students
router.get('/', studentController.getAllStudents);

// Get signed URL for student's file
router.get('/files/:studentId', studentController.getFileSignedUrl);

// Get student by ID
router.get('/:id', studentController.getStudentById);

// Create new student
router.post('/', upload.single('file'), studentController.createStudent);

// Update student
router.put('/:id', upload.single('file'), studentController.updateStudent);

// Delete student
router.delete('/:id', studentController.deleteStudent);

module.exports = router; 