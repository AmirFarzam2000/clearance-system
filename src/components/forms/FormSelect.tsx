import React from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface SelectOption {
  value: string;
  label: string;
}

interface FormSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;
  className?: string;
  disabled?: boolean;
}

const FormSelect: React.FC<FormSelectProps> = ({
  label,
  value,
  onChange,
  options,
  placeholder,
  required = false,
  className = '',
  disabled = false
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-yekan-medium text-gray-700 text-right">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-yekan text-sm bg-white text-right appearance-none disabled:opacity-50 disabled:cursor-not-allowed"
          required={required}
          disabled={disabled}
          dir="rtl"
          style={{ 
            textAlign: 'right',
            direction: 'rtl'
          }}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value} style={{ textAlign: 'right', direction: 'rtl' }}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <ChevronDownIcon className="w-4 h-4 text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default FormSelect;
