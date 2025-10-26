import React from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { Controller } from 'react-hook-form';
import type { Control, FieldErrors } from 'react-hook-form';
import SelectField from '../../ui/SelectField';

interface SelectOption {
  value: string;
  label: string;
  code?: string;
}

interface TariffLevel1SectionProps {
  control: Control<any>;
  errors: FieldErrors<any>;
  options: SelectOption[];
  isLoading: boolean;
  onAddNew: () => void;
}

const TariffLevel1Section: React.FC<TariffLevel1SectionProps> = ({
  control,
  errors,
  options,
  isLoading,
  onAddNew
}) => {
  return (
    <div className="flex items-end gap-4">
      <div className="flex-1">
        <Controller
          name="tariffLevel1"
          control={control}
          rules={{ required: 'تعرفه سطح اول الزامی است' }}
          render={({ field }) => (
            <SelectField
              label="تعرفه سطح اول :"
              value={field.value}
              onChange={field.onChange}
              options={options}
              placeholder={isLoading ? "در حال بارگذاری..." : "تعرفه سطح اول را انتخاب نمایید"}
              disabled={isLoading}
            />
          )}
        />
        {errors.tariffLevel1 && (
          <p className="text-red-500 text-sm font-yekan mt-1">{String(errors.tariffLevel1.message)}</p>
        )}
      </div>
      <button
        type="button"
        onClick={onAddNew}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-yekan-medium text-sm flex items-center gap-2"
      >
        <PlusIcon className="w-4 h-4" />
        تعریف جدید
      </button>
    </div>
  );
};

export default TariffLevel1Section;
