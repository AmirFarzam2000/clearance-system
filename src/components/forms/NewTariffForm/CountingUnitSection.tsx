import React from 'react';
import { Controller } from 'react-hook-form';
import type { Control, FieldErrors } from 'react-hook-form';
import SelectField from '../../ui/SelectField';

interface CountingUnitOption {
  value: string;
  label: string;
  description?: string;
}

interface CountingUnitSectionProps {
  name: 'countingUnit1' | 'countingUnit2' | 'countingUnit3';
  label: string;
  control: Control<any>;
  errors: FieldErrors<any>;
  options: CountingUnitOption[];
  placeholder: string;
  required?: boolean;
  isLoading?: boolean;
}

const CountingUnitSection: React.FC<CountingUnitSectionProps> = ({
  name,
  label,
  control,
  errors,
  options,
  placeholder,
  required = false,
  isLoading = false
}) => {
  const rules = required ? { required: `${label} الزامی است` } : undefined;

  return (
    <div className="space-y-2">
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <SelectField
            label={label}
            value={field.value}
            onChange={field.onChange}
            options={options}
            placeholder={isLoading ? "در حال بارگذاری..." : placeholder}
            disabled={isLoading}
          />
        )}
      />
      {errors[name] && (
        <p className="text-red-500 text-sm font-yekan">{String(errors[name]?.message)}</p>
      )}
    </div>
  );
};

export default CountingUnitSection;
