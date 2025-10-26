import React from 'react';

interface FormInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number';
  dir?: 'rtl' | 'ltr';
  required?: boolean;
  className?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  dir = 'rtl',
  required = false,
  className = ''
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-yekan-medium text-gray-700 text-right">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-yekan text-sm"
        dir={dir}
        required={required}
      />
    </div>
  );
};

export default FormInput;
