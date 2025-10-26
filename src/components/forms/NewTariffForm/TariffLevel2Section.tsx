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

interface TariffLevel2SectionProps {
  control: Control<any>;
  errors: FieldErrors<any>;
  options: SelectOption[];
  isLoading: boolean;
  selectedTariffLevel1: string | null;
  onAddNew: () => void;
}

const TariffLevel2Section: React.FC<TariffLevel2SectionProps> = ({
  control,
  errors,
  options,
  isLoading,
  selectedTariffLevel1,
  onAddNew
}) => {
  return (
    <div className="flex items-end gap-4">
      <div className="flex-1">
        <Controller
          name="tariffLevel2"
          control={control}
          rules={{ required: 'تعرفه سطح دوم الزامی است' }}
          render={({ field }) => (
            <SelectField
              label="تعرفه سطح دوم :"
              value={field.value}
              onChange={field.onChange}
              options={options}
              placeholder={
                !selectedTariffLevel1 
                  ? "ابتدا تعرفه سطح اول را انتخاب کنید" 
                  : isLoading 
                  ? "در حال بارگذاری..." 
                  : options.length === 0
                  ? "تعرفه سطح دومی برای این سطح اول یافت نشد"
                  : "تعرفه سطح دوم را انتخاب نمایید"
              }
              disabled={isLoading || !selectedTariffLevel1}
            />
          )}
        />
        {errors.tariffLevel2 && (
          <p className="text-red-500 text-sm font-yekan mt-1">{String(errors.tariffLevel2.message)}</p>
        )}
      </div>
      <button
        type="button"
        onClick={onAddNew}
        disabled={!selectedTariffLevel1}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-yekan-medium text-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <PlusIcon className="w-4 h-4" />
        تعریف جدید
      </button>
    </div>
  );
};

export default TariffLevel2Section;
