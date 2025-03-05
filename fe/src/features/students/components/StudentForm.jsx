import React, { useState, useEffect } from 'react';
import Input from '../../../components/ui/Input';
import FileInput from '../../../components/ui/FileInput';
import Button from '../../../components/ui/Button';

/**
 * Form untuk menambah atau mengedit data siswa
 * @param {Object} props - Component props
 * @param {Object} props.student - Data siswa untuk mode edit
 * @param {Function} props.onSubmit - Fungsi yang dipanggil saat form disubmit
 * @param {Function} props.onCancel - Fungsi yang dipanggil saat form dibatalkan
 * @param {boolean} props.readOnly - Mode hanya baca
 * @returns {React.ReactElement}
 */
const StudentForm = ({ student, onSubmit, onCancel, readOnly = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    class: '',
    parentName: '',
    score: '',
    file: null,
  });
  const [fileName, setFileName] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form data when student prop changes
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

  // Handle input change
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

  // Handle file input change
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

  // Validate form
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (readOnly) {
      onCancel();
      return;
    }
    
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        await onSubmit(formData);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Nama Siswa"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        disabled={readOnly || isSubmitting}
        required
      />

      <Input
        label="Kelas"
        id="class"
        name="class"
        value={formData.class}
        onChange={handleChange}
        error={errors.class}
        disabled={readOnly || isSubmitting}
        required
      />

      <Input
        label="Nama Orangtua"
        id="parentName"
        name="parentName"
        value={formData.parentName}
        onChange={handleChange}
        error={errors.parentName}
        disabled={readOnly || isSubmitting}
        required
      />

      <Input
        label="Nilai"
        id="score"
        name="score"
        type="number"
        min="0"
        max="100"
        step="0.01"
        value={formData.score}
        onChange={handleChange}
        error={errors.score}
        disabled={readOnly || isSubmitting}
        required
      />

      <FileInput
        label="File PDF"
        id="file"
        name="file"
        accept="application/pdf"
        onChange={handleFileChange}
        error={errors.file}
        currentFileName={fileName}
        helperText="Hanya file PDF (maks. 5MB)"
        disabled={readOnly || isSubmitting}
      />

      <div className="flex justify-end space-x-3">
        <Button
          variant="secondary"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          {readOnly ? 'Tutup' : 'Batal'}
        </Button>
        
        {!readOnly && (
          <Button
            type="submit"
            variant="primary"
            isLoading={isSubmitting}
          >
            Simpan
          </Button>
        )}
      </div>
    </form>
  );
};

export default StudentForm; 