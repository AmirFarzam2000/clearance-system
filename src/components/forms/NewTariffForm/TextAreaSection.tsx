import React from 'react';
import type { UseFormRegister, FieldErrors } from 'react-hook-form';

interface TextAreaSectionProps {
  name: string;
  label: string;
  placeholder: string;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  rows?: number;
}

const TextAreaSection: React.FC<TextAreaSectionProps> = ({
  name,
  label,
  placeholder,
  register,
  errors,
  rows = 3
}) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-yekan-medium text-gray-700 text-right">
        {label} :
      </label>
      <textarea
        {...register(name)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-yekan text-sm"
        dir="rtl"
        rows={rows}
        placeholder={placeholder}
      />
      {errors[name] && (
        <p className="text-red-500 text-sm font-yekan">{String(errors[name]?.message)}</p>
      )}
    </div>
  );
};

export default TextAreaSection;
