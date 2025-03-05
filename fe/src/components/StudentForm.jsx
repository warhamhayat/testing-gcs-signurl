import React, { useState, useEffect } from 'react';

const StudentForm = ({ student, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    class: '',
    parentName: '',
    score: '',
    file: null,
  });
  const [fileName, setFileName] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name || '',
        class: student.class || '',
        parentName: student.parentName || '',
        score: student.score || '',
        file: null,
      });
      setFileName(student.fileName || '');
    }
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error for this field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        setErrors({
          ...errors,
          file: 'Hanya file PDF yang diperbolehkan',
        });
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) { // 5MB
        setErrors({
          ...errors,
          file: 'Ukuran file maksimal 5MB',
        });
        return;
      }
      
      setFormData({
        ...formData,
        file,
      });
      setFileName(file.name);
      
      // Clear error for this field
      if (errors.file) {
        setErrors({
          ...errors,
          file: '',
        });
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Nama siswa harus diisi';
    }
    
    if (!formData.class.trim()) {
      newErrors.class = 'Kelas harus diisi';
    }
    
    if (!formData.parentName.trim()) {
      newErrors.parentName = 'Nama orangtua harus diisi';
    }
    
    if (!formData.score) {
      newErrors.score = 'Nilai harus diisi';
    } else if (isNaN(formData.score) || parseFloat(formData.score) < 0 || parseFloat(formData.score) > 100) {
      newErrors.score = 'Nilai harus berupa angka antara 0-100';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nama Siswa
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
            errors.name ? 'border-red-500' : ''
          }`}
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="class" className="block text-sm font-medium text-gray-700">
          Kelas
        </label>
        <input
          type="text"
          id="class"
          name="class"
          value={formData.class}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
            errors.class ? 'border-red-500' : ''
          }`}
        />
        {errors.class && <p className="mt-1 text-sm text-red-600">{errors.class}</p>}
      </div>

      <div>
        <label htmlFor="parentName" className="block text-sm font-medium text-gray-700">
          Nama Orangtua
        </label>
        <input
          type="text"
          id="parentName"
          name="parentName"
          value={formData.parentName}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
            errors.parentName ? 'border-red-500' : ''
          }`}
        />
        {errors.parentName && <p className="mt-1 text-sm text-red-600">{errors.parentName}</p>}
      </div>

      <div>
        <label htmlFor="score" className="block text-sm font-medium text-gray-700">
          Nilai
        </label>
        <input
          type="number"
          id="score"
          name="score"
          min="0"
          max="100"
          step="0.01"
          value={formData.score}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
            errors.score ? 'border-red-500' : ''
          }`}
        />
        {errors.score && <p className="mt-1 text-sm text-red-600">{errors.score}</p>}
      </div>

      <div>
        <label htmlFor="file" className="block text-sm font-medium text-gray-700">
          File PDF
        </label>
        <div className="mt-1 flex items-center">
          <input
            type="file"
            id="file"
            name="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className={`block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 ${
              errors.file ? 'border-red-500' : ''
            }`}
          />
        </div>
        {fileName && (
          <p className="mt-1 text-sm text-gray-500">
            File saat ini: {fileName}
          </p>
        )}
        {errors.file && <p className="mt-1 text-sm text-red-600">{errors.file}</p>}
        <p className="mt-1 text-sm text-gray-500">Hanya file PDF (maks. 5MB)</p>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Batal
        </button>
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Simpan
        </button>
      </div>
    </form>
  );
};

export default StudentForm; 