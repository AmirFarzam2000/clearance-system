import React from 'react';
import type { UseFormRegister, FieldErrors } from 'react-hook-form';

interface CheckboxSectionProps {
  name: string;
  label: string;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

const CheckboxSection: React.FC<CheckboxSectionProps> = ({
  name,
  label,
  register,
  errors
}) => {
  return (
    <>
      <div className="flex items-center gap-3">
        <input
          {...register(name)}
          type="checkbox"
          id={name}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor={name} className="text-sm font-yekan-medium text-gray-700">
          {label}
        </label>
      </div>
      {errors[name] && (
        <p className="text-red-500 text-sm font-yekan">{String(errors[name]?.message)}</p>
      )}
    </>
  );
};

export default CheckboxSection;
