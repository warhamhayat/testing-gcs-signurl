import React from 'react';

/**
 * Input component for consistent styling across the application
 * @param {Object} props - Component props
 * @param {string} props.label - Input label
 * @param {string} props.id - Input id
 * @param {string} props.name - Input name
 * @param {string} props.type - Input type
 * @param {string} props.value - Input value
 * @param {Function} props.onChange - Input change handler
 * @param {string} props.error - Error message
 * @param {string} props.placeholder - Input placeholder
 * @param {React.ReactNode} props.icon - Icon to display in the input
 * @returns {React.ReactElement}
 */
const Input = ({
  label,
  id,
  name,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
  icon,
  ...props
}) => {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {icon}
          </div>
        )}
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`
            block w-full rounded-md shadow-sm 
            focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
            ${error ? 'border-red-500' : 'border-gray-300'}
            ${icon ? 'pl-10' : ''}
          `}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Input; 