const prisma = require('../config/database');
const { generateSignedUrl, deleteFile } = require('../utils/fileUtils');

const getAllStudents = async () => {
  return await prisma.student.findMany();
};

const getStudentById = async (id) => {
  return await prisma.student.findUnique({
    where: { id: parseInt(id) }
  });
};

const createStudent = async (data) => {
  return await prisma.student.create({
    data: {
      name: data.name,
      class: data.class,
      parentName: data.parentName,
      score: parseFloat(data.score),
      fileUrl: data.fileUrl,
      fileName: data.fileName,
      fileType: data.fileType
    }
  });
};

const updateStudent = async (id, data) => {
  const student = await prisma.student.findUnique({
    where: { id: parseInt(id) }
  });

  if (!student) {
    throw new Error('Student not found');
  }

  // If there's a new file, delete the old one
  if (data.fileUrl && student.fileUrl) {
    await deleteFile(student.fileUrl);
  }

  return await prisma.student.update({
    where: { id: parseInt(id) },
    data: {
      name: data.name,
      class: data.class,
      parentName: data.parentName,
      score: parseFloat(data.score),
      fileUrl: data.fileUrl,
      fileName: data.fileName,
      fileType: data.fileType
    }
  });
};

const deleteStudent = async (id) => {
  const student = await prisma.student.findUnique({
    where: { id: parseInt(id) }
  });

  if (!student) {
    throw new Error('Student not found');
  }

  // Delete associated file if exists
  if (student.fileUrl) {
    await deleteFile(student.fileUrl);
  }

  return await prisma.student.delete({
    where: { id: parseInt(id) }
  });
};

const getFileSignedUrl = async (studentId) => {
  const student = await prisma.student.findUnique({
    where: { id: parseInt(studentId) }
  });

  if (!student || !student.fileUrl) {
    throw new Error('File not found');
  }

  return await generateSignedUrl(student.fileUrl);
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getFileSignedUrl
}; 