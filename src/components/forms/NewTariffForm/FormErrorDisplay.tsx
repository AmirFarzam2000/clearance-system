import React from 'react';

interface FormErrorDisplayProps {
  error: any;
}

const FormErrorDisplay: React.FC<FormErrorDisplayProps> = ({ error }) => {
  if (!error) return null;

  const generalErrors = error?.response?.data?.ValidationErrors
    ?.filter((e: any) => e.PropertyName === 'TarrifL3ID' || !e.PropertyName)
    .map((e: any) => e.ErrorMessage) || [];

  if (generalErrors.length === 0) return null;

  return (
    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
      <p className="text-red-600 font-yekan text-sm mb-2">
        خطا در ثبت اطلاعات
      </p>
      <ul className="list-disc list-inside text-red-600 font-yekan text-sm space-y-1">
        {generalErrors.map((msg: string, idx: number) => (
          <li key={idx}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default FormErrorDisplay;
