const studentService = require('../services/studentService');
const { bucket } = require('../config/storage');

const getAllStudents = async (req, res) => {
  try {
    const students = await studentService.getAllStudents();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getStudentById = async (req, res) => {
  try {
    const student = await studentService.getStudentById(req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createStudent = async (req, res) => {
  try {
    const data = { ...req.body };
    
    // Process file if it exists
    if (req.file) {
      // Generate a unique filename with proper path structure
      const filePath = `files/${process.env.GCP_BUCKET_NAME}/${Date.now()}-${req.file.originalname}`;
      
      // Upload file to storage bucket
      const file = bucket.file(filePath);
      const stream = file.createWriteStream({
        metadata: {
          contentType: req.file.mimetype,
        },
      });
      
      stream.on('error', (err) => {
        console.error('Error uploading file:', err);
        res.status(500).json({ error: 'Error uploading file' });
      });
      
      stream.on('finish', async () => {
        // Add file information to data
        data.fileUrl = filePath;
        data.fileName = req.file.originalname;
        data.fileType = req.file.mimetype;
        
        // Create student with file information
        try {
          const student = await studentService.createStudent(data);
          res.status(201).json(student);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      });
      
      // Write file to storage
      stream.end(req.file.buffer);
    } else {
      // Create student without file
      const student = await studentService.createStudent(data);
      res.status(201).json(student);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateStudent = async (req, res) => {
  try {
    const data = { ...req.body };
    
    // Process file if it exists
    if (req.file) {
      // Generate a unique filename with proper path structure
      const filePath = `files/${process.env.GCP_BUCKET_NAME}/${Date.now()}-${req.file.originalname}`;
      
      // Upload file to storage bucket
      const file = bucket.file(filePath);
      const stream = file.createWriteStream({
        metadata: {
          contentType: req.file.mimetype,
        },
      });
      
      stream.on('error', (err) => {
        console.error('Error uploading file:', err);
        res.status(500).json({ error: 'Error uploading file' });
      });
      
      stream.on('finish', async () => {
        // Add file information to data
        data.fileUrl = filePath;
        data.fileName = req.file.originalname;
        data.fileType = req.file.mimetype;
        
        // Update student with file information
        try {
          const student = await studentService.updateStudent(req.params.id, data);
          res.json(student);
        } catch (error) {
          if (error.message === 'Student not found') {
            return res.status(404).json({ error: error.message });
          }
          res.status(500).json({ error: error.message });
        }
      });
      
      // Write file to storage
      stream.end(req.file.buffer);
    } else {
      // Update student without file
      const student = await studentService.updateStudent(req.params.id, data);
      res.json(student);
    }
  } catch (error) {
    if (error.message === 'Student not found') {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

const deleteStudent = async (req, res) => {
  try {
    await studentService.deleteStudent(req.params.id);
    res.status(204).send();
  } catch (error) {
    if (error.message === 'Student not found') {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

const getFileSignedUrl = async (req, res) => {
  try {
    const signedUrl = await studentService.getFileSignedUrl(req.params.studentId);
    res.json({ url: signedUrl });
  } catch (error) {
    if (error.message === 'File not found') {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getFileSignedUrl
}; 