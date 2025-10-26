import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '../ui/icons/HomeIcon';
import PageHeader from '../ui/PageHeader';
import { SuccessModal } from '../ui/SuccessModal';
import { useCreateCurrency, useCurrencies } from '../../hooks/useCurrencies';

interface CurrencyFormData {
  title: string;
  alternativeTitle: string;
  iso: string;
  decimalDigit: number;
}

const NewCurrencyForm: React.FC = () => {
  const navigate = useNavigate();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const createCurrencyMutation = useCreateCurrency();
  const { data: existingCurrencies = [] } = useCurrencies();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<CurrencyFormData>({
    defaultValues: {
      title: '',
      alternativeTitle: '',
      iso: '',
      decimalDigit: 2
    }
  });

  const onSubmit = async (data: CurrencyFormData) => {
    try {
      await createCurrencyMutation.mutateAsync(data);
      reset();
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Error creating currency:', error);
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    navigate('/dashboard/currency-management');
  };

  const handleBack = () => {
    navigate('/dashboard/currency-management');
  };

  return (
    <div className="flex-1 bg-gray-50">
      <div className="p-2 md:p-5">
        <div className="mx-auto max-w-full">
          <div style={{
            borderRadius: '10px',
            background: '#f5f5f5',
            border: '5px solid #fff',
            boxShadow: '0 0 16px #292a330f, 0 6px 20px #292a3305'
          }} className="p-3 md:p-5 lg:p-[20px]">

            <PageHeader 
              title="ارز جدید" 
              breadcrumbs={[
                { label: 'صفحه اصلی', icon: <HomeIcon className="w-4 h-4 text-gray-600" /> }, 
                { label: 'ارز' }
              ]}
              searchValue=""
              onSearchChange={() => {}}
              onSearch={() => {}}
            />
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="block text-sm font-yekan-medium text-gray-700 mb-2 text-right">
                    عنوان ارز *
                  </label>
                  <input
                    type="text"
                    {...register('title', { 
                      required: 'عنوان ارز الزامی است',
                      minLength: { value: 2, message: 'عنوان باید حداقل 2 کاراکتر باشد' }
                    })}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-yekan text-sm ${
                      errors.title ? 'border-red-500' : 'border-gray-300'
                    }`}
                    dir="rtl"
                    placeholder="عنوان ارز را وارد کنید"
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-1 text-right">{errors.title.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-yekan-medium text-gray-700 mb-2 text-right">
                    عنوان جایگزین *
                  </label>
                  <input
                    type="text"
                    {...register('alternativeTitle', { 
                      required: 'عنوان جایگزین الزامی است',
                      minLength: { value: 2, message: 'عنوان جایگزین باید حداقل 2 کاراکتر باشد' }
                    })}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-yekan text-sm ${
                      errors.alternativeTitle ? 'border-red-500' : 'border-gray-300'
                    }`}
                    dir="rtl"
                    placeholder="عنوان جایگزین را وارد کنید"
                  />
                  {errors.alternativeTitle && (
                    <p className="text-red-500 text-sm mt-1 text-right">{errors.alternativeTitle.message}</p>
                  )}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm font-yekan text-gray-700 text-right leading-relaxed">
                    این عنوان در گزارشات مثلاً زمانی که ارز یورو باشد بعنوان ارزش یورویی مورد استفاده قرار می‌گیرد و باید مقدار آن را یورو تعیین نمایید
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-yekan-medium text-gray-700 mb-2 text-right">
                    ISO *
                  </label>
                  <input
                    type="text"
                    {...register('iso', { 
                      required: 'کد ISO الزامی است',
                      minLength: { value: 3, message: 'کد ISO باید 3 کاراکتر باشد' },
                      maxLength: { value: 3, message: 'کد ISO باید 3 کاراکتر باشد' },
                      pattern: {
                        value: /^[A-Z]{3}$/,
                        message: 'کد ISO باید 3 حرف بزرگ انگلیسی باشد'
                      },
                      validate: (value) => {
                        const isDuplicate = existingCurrencies.some(
                          currency => currency.ISO.toUpperCase() === value.toUpperCase()
                        );
                        return !isDuplicate || 'کد ISO تکراری است';
                      }
                    })}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-yekan text-sm ${
                      errors.iso ? 'border-red-500' : 'border-gray-300'
                    }`}
                    dir="ltr"
                    placeholder="ISO code (e.g., USD, EUR)"
                    maxLength={3}
                    style={{ textTransform: 'uppercase' }}
                  />
                  {errors.iso && (
                    <p className="text-red-500 text-sm mt-1 text-right">{errors.iso.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-yekan-medium text-gray-700 mb-2 text-right">
                    تعداد رقم اعشار *
                  </label>
                  <input
                    type="number"
                    {...register('decimalDigit', { 
                      required: 'تعداد رقم اعشار الزامی است',
                      min: { value: 0, message: 'تعداد رقم اعشار نمی‌تواند منفی باشد' },
                      max: { value: 10, message: 'تعداد رقم اعشار نمی‌تواند بیشتر از 10 باشد' }
                    })}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-yekan text-sm ${
                      errors.decimalDigit ? 'border-red-500' : 'border-gray-300'
                    }`}
                    min="0"
                    max="10"
                  />
                  {errors.decimalDigit && (
                    <p className="text-red-500 text-sm mt-1 text-right">{errors.decimalDigit.message}</p>
                  )}
                </div>

                <div className="flex justify-between items-center pt-6">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-yekan-medium text-sm"
                  >
                    بازگشت به لیست ارزها
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || createCurrencyMutation.isPending}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-yekan-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting || createCurrencyMutation.isPending ? 'در حال ثبت...' : 'ثبت اطلاعات'}
                  </button>
                </div>

                {createCurrencyMutation.isError && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm text-right">
                      خطا در ثبت اطلاعات: {createCurrencyMutation.error?.message || 'خطای نامشخص'}
                    </p>
                  </div>
                )}

                {createCurrencyMutation.isSuccess && (
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-600 text-sm text-right">
                      ارز با موفقیت ثبت شد!
                    </p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleSuccessModalClose}
        title="ارز با موفقیت ثبت شد"
        message="ارز جدید با موفقیت به سیستم اضافه شد."
        buttonText="بازگشت به لیست"
        onButtonClick={handleSuccessModalClose}
      />
    </div>
  );
};

export default NewCurrencyForm;
