const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { PrismaClient } = require('@prisma/client');
const { Storage } = require('@google-cloud/storage');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Configure Google Cloud Storage
let storage;
let bucket;

try {
  storage = new Storage({
    projectId: process.env.GCP_PROJECT_ID,
    keyFilename: process.env.GCP_KEYFILE_PATH,
  });
  
  bucket = storage.bucket(process.env.GCP_BUCKET_NAME);
  console.log('GCP Storage initialized successfully');
} catch (error) {
  console.error('Error initializing GCP Storage:', error);
  console.log('Continuing without GCP Storage functionality');
}

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed!'), false);
    }
  },
});

// Routes
// Get all students
app.get('/api/students', async (req, res) => {
  try {
    const students = await prisma.student.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    res.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'Failed to fetch students' });
  }
});

// Create a new student with file upload
app.post('/api/students', upload.single('file'), async (req, res) => {
  try {
    const { name, class: className, parentName, score } = req.body;
    
    let filePath = null;
    let fileName = null;
    let fileType = null;
    
    // Upload file to GCP if provided
    if (req.file && bucket) {
      const file = req.file;
      fileName = `${Date.now()}-${file.originalname}`;
      fileType = file.mimetype;
      filePath = `files/${fileName}`;
      
      const blob = bucket.file(filePath);
      const blobStream = blob.createWriteStream({
        resumable: false,
        metadata: {
          contentType: file.mimetype,
        },
      });
      
      blobStream.on('error', (err) => {
        console.error('Error uploading to GCP:', err);
        res.status(500).json({ error: 'Failed to upload file' });
      });
      
      blobStream.on('finish', async () => {
        // File is private by default, no need to call makePublic()
        
        // Create student record with file info
        const student = await prisma.student.create({
          data: {
            name,
            class: className,
            parentName,
            score: parseFloat(score),
            fileUrl: filePath,
            fileName,
            fileType,
          },
        });
        
        res.status(201).json(student);
      });
      
      blobStream.end(file.buffer);
    } else {
      // Create student record without file
      const student = await prisma.student.create({
        data: {
          name,
          class: className,
          parentName,
          score: parseFloat(score),
          fileUrl: req.file ? 'files/mock-file' : null,
          fileName: req.file ? req.file.originalname : null,
          fileType: req.file ? req.file.mimetype : null,
        },
      });
      
      res.status(201).json(student);
    }
  } catch (error) {
    console.error('Error creating student:', error);
    res.status(500).json({ error: 'Failed to create student' });
  }
});

// Get a single student
app.get('/api/students/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const student = await prisma.student.findUnique({
      where: { id: parseInt(id) },
    });
    
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    
    res.json(student);
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({ error: 'Failed to fetch student' });
  }
});

// Update a student
app.put('/api/students/:id', upload.single('file'), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, class: className, parentName, score } = req.body;
    
    // Get existing student
    const existingStudent = await prisma.student.findUnique({
      where: { id: parseInt(id) },
    });
    
    if (!existingStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }
    
    let filePath = existingStudent.fileUrl;
    let fileName = existingStudent.fileName;
    let fileType = existingStudent.fileType;
    
    // Upload new file to GCP if provided
    if (req.file && bucket) {
      const file = req.file;
      fileName = `${Date.now()}-${file.originalname}`;
      fileType = file.mimetype;
      filePath = `files/${fileName}`;
      
      const blob = bucket.file(filePath);
      const blobStream = blob.createWriteStream({
        resumable: false,
        metadata: {
          contentType: file.mimetype,
        },
      });
      
      blobStream.on('error', (err) => {
        console.error('Error uploading to GCP:', err);
        res.status(500).json({ error: 'Failed to upload file' });
      });
      
      blobStream.on('finish', async () => {
        // File is private by default, no need to call makePublic()
        
        // Delete old file if exists
        if (existingStudent.fileUrl) {
          try {
            await bucket.file(existingStudent.fileUrl).delete();
          } catch (error) {
            console.error('Error deleting old file:', error);
          }
        }
        
        // Update student record with new file info
        const student = await prisma.student.update({
          where: { id: parseInt(id) },
          data: {
            name,
            class: className,
            parentName,
            score: parseFloat(score),
            fileUrl: filePath,
            fileName,
            fileType,
          },
        });
        
        res.json(student);
      });
      
      blobStream.end(file.buffer);
    } else {
      // Update student record without changing file
      const student = await prisma.student.update({
        where: { id: parseInt(id) },
        data: {
          name,
          class: className,
          parentName,
          score: parseFloat(score),
        },
      });
      
      res.json(student);
    }
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({ error: 'Failed to update student' });
  }
});

// Delete a student
app.delete('/api/students/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Get existing student
    const existingStudent = await prisma.student.findUnique({
      where: { id: parseInt(id) },
    });
    
    if (!existingStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }
    
    // Delete file from GCP if exists
    if (existingStudent.fileUrl && bucket) {
      try {
        await bucket.file(existingStudent.fileUrl).delete();
      } catch (error) {
        console.error('Error deleting file:', error);
      }
    }
    
    // Delete student record
    await prisma.student.delete({
      where: { id: parseInt(id) },
    });
    
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ error: 'Failed to delete student' });
  }
});

// Get signed URL for a file
app.get('/api/files/:studentId', async (req, res) => {
  try {
    const { studentId } = req.params;
    
    // Get student record
    const student = await prisma.student.findUnique({
      where: { id: parseInt(studentId) },
    });
    
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    
    if (!student.fileUrl) {
      return res.status(404).json({ error: 'No file found for this student' });
    }
    
    if (!bucket) {
      return res.status(500).json({ error: 'Storage not initialized' });
    }
    
    // Generate signed URL (valid for 15 minutes)
    const [signedUrl] = await bucket.file(student.fileUrl).getSignedUrl({
      version: 'v4',
      action: 'read',
      expires: Date.now() + 15 * 60 * 1000, // 15 minutes
    });
    
    res.json({ signedUrl });
  } catch (error) {
    console.error('Error generating signed URL:', error);
    res.status(500).json({ error: 'Failed to generate signed URL' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 