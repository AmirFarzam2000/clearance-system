import React from 'react';

interface FormButtonsProps {
  onBack: () => void;
  onSubmit: (e?: React.FormEvent) => void;
  backText?: string;
  submitText?: string;
  isLoading?: boolean;
  className?: string;
}

const FormButtons: React.FC<FormButtonsProps> = ({
  onBack,
  onSubmit,
  backText = 'بازگشت',
  submitText = 'ثبت اطلاعات',
  isLoading = false,
  className = ''
}) => {
  return (
    <div className={`flex flex-col md:flex-row md:justify-between md:items-center gap-3 md:gap-0 pt-6 ${className}`}>
      <button
        type="button"
        onClick={onBack}
        className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors font-yekan-medium text-sm w-full md:w-auto order-2 md:order-1"
      >
        {backText}
      </button>
      <button
        type="submit"
        onClick={onSubmit}
        disabled={isLoading}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-yekan-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto order-1 md:order-2"
      >
        {isLoading ? 'در حال ثبت...' : submitText}
      </button>
    </div>
  );
};

export default FormButtons;
