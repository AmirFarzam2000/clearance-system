import React from 'react';
import { Controller } from 'react-hook-form';
import type { Control, FieldErrors } from 'react-hook-form';
import FormInput from '../FormInput';

interface BasicFieldsSectionProps {
  control: Control<any>;
  errors: FieldErrors<any>;
}

const BasicFieldsSection: React.FC<BasicFieldsSectionProps> = ({ control, errors }) => {
  return (
    <>
      <Controller
        name="customsDuties"
        control={control}
        rules={{ required: 'حقوق گمرکی الزامی است' }}
        render={({ field }) => (
          <FormInput
            label="حقوق گمرکی :"
            value={field.value}
            onChange={field.onChange}
            type="number"
            dir="ltr"
          />
        )}
      />
      {errors.customsDuties && (
        <p className="text-red-500 text-sm font-yekan -mt-2">{String(errors.customsDuties.message)}</p>
      )}

      <Controller
        name="commercialProfit"
        control={control}
        rules={{ required: 'سود بازرگانی الزامی است' }}
        render={({ field }) => (
          <FormInput
            label="سود بازرگانی :"
            value={field.value}
            onChange={field.onChange}
            type="number"
            dir="ltr"
          />
        )}
      />
      {errors.commercialProfit && (
        <p className="text-red-500 text-sm font-yekan -mt-2">{String(errors.commercialProfit.message)}</p>
      )}

      <Controller
        name="tariffNumber"
        control={control}
        rules={{ required: 'شماره تعرفه الزامی است' }}
        render={({ field }) => (
          <FormInput
            label="شماره تعرفه :"
            value={field.value}
            onChange={field.onChange}
            dir="ltr"
          />
        )}
      />
      {errors.tariffNumber && (
        <p className="text-red-500 text-sm font-yekan -mt-2">{String(errors.tariffNumber.message)}</p>
      )}

      <Controller
        name="productType"
        control={control}
        rules={{ required: 'نوع کالا الزامی است' }}
        render={({ field }) => (
          <FormInput
            label="نوع کالا :"
            value={field.value}
            onChange={field.onChange}
            dir="ltr"
          />
        )}
      />
      {errors.productType && (
        <p className="text-red-500 text-sm font-yekan -mt-2">{String(errors.productType.message)}</p>
      )}

      <Controller
        name="preferentialCountryCode"
        control={control}
        render={({ field }) => (
          <FormInput
            label="کد کشور دارنده کد ترجیحی :"
            value={field.value}
            onChange={field.onChange}
            dir="ltr"
          />
        )}
      />
      {errors.preferentialCountryCode && (
        <p className="text-red-500 text-sm font-yekan -mt-2">{String(errors.preferentialCountryCode.message)}</p>
      )}
    </>
  );
};

export default BasicFieldsSection;
