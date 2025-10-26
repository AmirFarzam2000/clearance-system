import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import HomeIcon from '../ui/icons/HomeIcon';
import PageHeader from '../ui/PageHeader';
import { SuccessModal } from '../ui/SuccessModal';
import { useCurrency, useUpdateCurrency } from '../../hooks/useCurrencies';
import type { Currency } from '../../types/currencies';

interface CurrencyFormData {
  title: string;
  alternativeTitle: string;
  iso: string;
  decimalDigit: number;
}

const EditCurrencyForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  const { data: currency, isLoading, error } = useCurrency(Number(id || 0));
  const updateCurrencyMutation = useUpdateCurrency();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue
  } = useForm<CurrencyFormData>({
    defaultValues: {
      title: '',
      alternativeTitle: '',
      iso: '',
      decimalDigit: 2
    }
  });

  useEffect(() => {
    if (currency) {
      setValue('title', currency.Title || '');
      setValue('alternativeTitle', currency.AlternativeTitle || '');
      setValue('iso', currency.ISO || '');
      setValue('decimalDigit', currency.DecimalDigit || 2);
    }
  }, [currency, setValue]);

  const onSubmit = async (data: CurrencyFormData) => {
    if (!currency) return;
    
    try {
      const updatedCurrency: Currency = {
        ...currency,
        Title: data.title,
        AlternativeTitle: data.alternativeTitle,
        ISO: data.iso,
        DecimalDigit: data.decimalDigit
      };
      
      await updateCurrencyMutation.mutateAsync(updatedCurrency);
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Error updating currency:', error);
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    navigate('/dashboard/currency-management');
  };

  const handleBack = () => {
    navigate('/dashboard/currency-management');
  };

  if (isLoading) {
    return (
      <div className="flex-1 bg-gray-50 p-2 md:p-5">
        <div className="mx-auto max-w-full">
          <div style={{
            borderRadius: '10px',
            background: '#f5f5f5',
            border: '5px solid #fff',
            boxShadow: '0 0 16px #292a330f, 0 6px 20px #292a3305'
          }} className="p-3 md:p-5 lg:p-[20px]">
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="mr-2 text-gray-600">در حال بارگذاری...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 bg-gray-50 p-2 md:p-5">
        <div className="mx-auto max-w-full">
          <div style={{
            borderRadius: '10px',
            background: '#f5f5f5',
            border: '5px solid #fff',
            boxShadow: '0 0 16px #292a330f, 0 6px 20px #292a3305'
          }} className="p-3 md:p-5 lg:p-[20px]">
            <div className="text-center text-red-600 mb-4">
              خطا در بارگذاری اطلاعات ارز: {error.message}
            </div>
            <button
              onClick={handleBack}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              بازگشت به لیست
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!currency) {
    return (
      <div className="flex-1 bg-gray-50 p-2 md:p-5">
        <div className="mx-auto max-w-full">
          <div style={{
            borderRadius: '10px',
            background: '#f5f5f5',
            border: '5px solid #fff',
            boxShadow: '0 0 16px #292a330f, 0 6px 20px #292a3305'
          }} className="p-3 md:p-5 lg:p-[20px]">
            <div className="text-center text-gray-600 mb-4">
              ارز مورد نظر یافت نشد
            </div>
            <button
              onClick={handleBack}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              بازگشت به لیست
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-50">
      <div className="p-5">
        <div className="mx-auto max-w-full">
          <div style={{
            borderRadius: '10px',
            background: '#f5f5f5',
            border: '5px solid #fff',
            boxShadow: '0 0 16px #292a330f, 0 6px 20px #292a3305'
          }} className="p-3 md:p-5 lg:p-[20px]">

            <PageHeader 
              title="ویرایش" 
              breadcrumbs={[
                { label: 'صفحه اصلی', icon: <HomeIcon className="w-4 h-4 text-gray-600" /> }, 
                { label: 'ارز' },
                { label: 'ویرایش' }
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
                    disabled={isSubmitting || updateCurrencyMutation.isPending}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-yekan-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting || updateCurrencyMutation.isPending ? 'در حال ثبت...' : 'ثبت اطلاعات'}
                  </button>
                </div>

                {updateCurrencyMutation.isError && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm text-right">
                      خطا در ثبت اطلاعات: {updateCurrencyMutation.error?.message || 'خطای نامشخص'}
                    </p>
                  </div>
                )}

                {updateCurrencyMutation.isSuccess && (
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-600 text-sm text-right">
                      ارز با موفقیت به‌روزرسانی شد!
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
        title="ارز با موفقیت به‌روزرسانی شد"
        message="اطلاعات ارز با موفقیت تغییر یافت."
        buttonText="بازگشت به لیست"
        onButtonClick={handleSuccessModalClose}
      />
    </div>
  );
};

export default EditCurrencyForm;
