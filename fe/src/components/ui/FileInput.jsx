import React from 'react';

/**
 * FileInput component for consistent styling across the application
 * @param {Object} props - Component props
 * @param {string} props.label - Input label
 * @param {string} props.id - Input id
 * @param {string} props.name - Input name
 * @param {string} props.accept - Accepted file types
 * @param {Function} props.onChange - Input change handler
 * @param {string} props.error - Error message
 * @param {string} props.currentFileName - Current file name
 * @param {string} props.helperText - Helper text
 * @returns {React.ReactElement}
 */
const FileInput = ({
  label,
  id,
  name,
  accept,
  onChange,
  error,
  currentFileName,
  helperText,
  ...props
}) => {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="mt-1">
        <input
          id={id}
          name={name}
          type="file"
          accept={accept}
          onChange={onChange}
          className={`
            block w-full text-sm text-gray-500 
            file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 
            file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 
            hover:file:bg-indigo-100
            ${error ? 'border-red-500' : ''}
          `}
          {...props}
        />
      </div>
      {currentFileName && (
        <p className="mt-1 text-sm text-gray-500">
          File saat ini: {currentFileName}
        </p>
      )}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      {helperText && <p className="mt-1 text-sm text-gray-500">{helperText}</p>}
    </div>
  );
};

export default FileInput; 