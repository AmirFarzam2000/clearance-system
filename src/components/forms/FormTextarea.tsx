import React from 'react';

interface FormTextareaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  required?: boolean;
  className?: string;
  dir?: 'ltr' | 'rtl';
}

const FormTextarea: React.FC<FormTextareaProps> = ({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
  required = false,
  className = '',
  dir = 'rtl'
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-yekan-medium text-gray-700 text-right">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-yekan text-sm resize-none"
        dir={dir}
        required={required}
      />
    </div>
  );
};

export default FormTextarea;
