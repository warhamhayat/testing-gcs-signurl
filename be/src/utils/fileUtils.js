const { bucket } = require('../config/storage');

const generateSignedUrl = async (fileName) => {
  const file = bucket.file(fileName);
  const [url] = await file.getSignedUrl({
    version: 'v4',
    action: 'read',
    expires: Date.now() + 15 * 60 * 1000, // 15 minutes
  });
  return url;
};

const deleteFile = async (fileName) => {
  try {
    await bucket.file(fileName).delete();
    return true;
  } catch (error) {
    console.error('Error deleting file:', error);
    return false;
  }
};

module.exports = {
  generateSignedUrl,
  deleteFile
}; 