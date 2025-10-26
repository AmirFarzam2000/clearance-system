import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from '../../ui/Modal';
import { useUpdateTarrif, useUpdateTarrifL2, useUpdateTarrifL3 } from '../../../hooks/useTarrifs';
import { useToast } from '../../../hooks/useToast';
import ToastContainer from '../../ui/Toast';
import { useCountingunits } from '../../../hooks/useCountingunits';

interface EditTariffModalProps {
  isOpen: boolean;
  onClose: () => void;
  tariff: {
    id: string;
    level: number;
    tarrifNo: string;
    productType: string;
    preferentialTarrif: string;
    remark: string;
    description: string;
    originalData: any;
  } | null;
  onSuccess?: () => void;
}

const EditTariffModal: React.FC<EditTariffModalProps> = ({
  isOpen,
  onClose,
  tariff,
  onSuccess
}) => {
  const updateTarrifL1 = useUpdateTarrif();
  const updateTarrifL2 = useUpdateTarrifL2();
  const updateTarrifL3 = useUpdateTarrifL3();
  const { toasts, removeToast, showSuccess, showError } = useToast();
  const { data: countingUnits = [] } = useCountingunits();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<any>({
    defaultValues: {
      tariffNumber: '',
      productType: '',
      preferentialCountryCode: '',
      customsDuties: '0',
      commercialProfit: '0',
      countingUnit1: '',
      countingUnit2: '',
      countingUnit3: '',
      notes: '',
      description: '',
      displayStatus: false,
      uniqueCodeSubject: false
    }
  });

  useEffect(() => {
    if (tariff) {
      const orig = tariff.originalData;
      reset({
        tariffNumber: tariff.tarrifNo || '',
        productType: tariff.productType || '',
        preferentialCountryCode: tariff.preferentialTarrif || '',
        customsDuties: orig?.CustomDuty?.toString() || '0',
        commercialProfit: orig?.CommercialBenefit?.toString() || '0',
        countingUnit1: orig?.FirstCountingUnitID?.toString() || '',
        countingUnit2: orig?.SecondCountingUnitID?.toString() || '',
        countingUnit3: orig?.ThirdCountingUnitID?.toString() || '',
        notes: orig?.Remark || tariff.remark || '',
        description: tariff.description || '',
        displayStatus: orig?.isVisible || false,
        uniqueCodeSubject: orig?.NeedtoUniqueCode || false
      });
    }
  }, [tariff, reset]);

  const getActiveMutation = () => {
    if (!tariff) return null;
    switch (tariff.level) {
      case 1: return updateTarrifL1;
      case 2: return updateTarrifL2;
      case 3: return updateTarrifL3;
      default: return null;
    }
  };

  const activeMutation = getActiveMutation();
  const isLoading = activeMutation?.isPending || false;

  const countingUnitOptions = countingUnits.map((unit: any) => ({
    value: unit.CountingUnitID?.toString() || '',
    label: `${unit.FaTitle} (${unit.EnTitle})`
  }));

  const handleSubmitForm = async (data: any) => {
    if (!tariff || !activeMutation) return;

    try {
      let payload: any;
      
      if (tariff.level === 3) {
        const getUnitTitle = (unitId: string) => {
          if (!unitId) return '';
          const unit = countingUnits.find((u: any) => u.CountingUnitID?.toString() === unitId);
          return unit ? unit.FaTitle : '';
        };

        payload = {
          ...tariff.originalData,
          TarrifNo: data.tariffNumber,
          WithParentNo: data.tariffNumber,
          ProductType: data.productType,
          CustomDuty: parseFloat(data.customsDuties) || 0,
          CommercialBenefit: parseFloat(data.commercialProfit) || 0,
          FirstCountingUnitID: data.countingUnit1 ? parseInt(data.countingUnit1) : null,
          FirstCountingUnitTitle: getUnitTitle(data.countingUnit1),
          SecondCountingUnitID: data.countingUnit2 ? parseInt(data.countingUnit2) : null,
          SecondCountingUnitTitle: getUnitTitle(data.countingUnit2),
          ThirdCountingUnitID: data.countingUnit3 ? parseInt(data.countingUnit3) : null,
          ThirdCountingUnitTitle: getUnitTitle(data.countingUnit3),
          PreferentialTarrifCountryCode: data.preferentialCountryCode || '',
          Remark: data.notes || '',
          Description: data.description || '',
          isVisible: data.displayStatus,
          NeedtoUniqueCode: data.uniqueCodeSubject
        };
      } else if (tariff.level === 1) {
        payload = {
          ...tariff.originalData,
          TarrifNo: Number(data.tariffNumber),
          ProductType: data.productType,
          PreferentialTarrifCountryCode: data.preferentialCountryCode,
          Remark: data.notes,
          Description: data.description,
          isVisible: data.displayStatus
        };
      } else if (tariff.level === 2) {
        payload = {
          ...tariff.originalData,
          WithParentNo: data.tariffNumber,
          ProductType: data.productType,
          PreferentialTarrifCountryCode: data.preferentialCountryCode,
          Remark: data.notes,
          Description: data.description,
          isVisible: data.displayStatus
        };
      }

      console.log('Payload being sent:', JSON.stringify(payload, null, 2));
      await activeMutation.mutateAsync(payload);
      showSuccess('موفقیت', 'تعرفه با موفقیت ویرایش شد');
      
      if (onSuccess) {
        onSuccess();
      }
      
      onClose();
    } catch (error: any) {
      console.error('Error updating tariff:', error);
      
      if (error?.response?.data) {
        const errorData = error.response.data;
        
        if (errorData.ActionErrors && errorData.ActionErrors.length > 0) {
          errorData.ActionErrors.forEach((errorMsg: string) => {
            showError('خطا در ویرایش تعرفه', errorMsg);
          });
        } else if (errorData.ValidationErrors && errorData.ValidationErrors.length > 0) {
          errorData.ValidationErrors.forEach((validationError: any) => {
            const errorMessage = validationError.ErrorMessage || validationError.message || 'خطا در اعتبارسنجی';
            showError('خطا در اعتبارسنجی', errorMessage);
          });
        } else if (errorData.message) {
          showError('خطا در ویرایش تعرفه', errorData.message);
        } else {
          showError('خطا در ویرایش تعرفه', 'خطای غیرمنتظره‌ای رخ داده است');
        }
      } else if (error.message) {
        showError('خطا در ویرایش تعرفه', error.message);
      } else {
        showError('خطا در ویرایش تعرفه', 'خطای غیرمنتظره‌ای رخ داده است');
      }
    }
  };

  const getTitle = (): string => {
    if (!tariff) return '';
    const levelNames = { 1: 'اول', 2: 'دوم', 3: 'سوم' };
    return `ویرایش اطلاعات تعرفه سطح ${levelNames[tariff.level as keyof typeof levelNames]}`;
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={getTitle()}
        size="lg"
      >
        <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-4">
          <div className="overflow-y-auto max-h-[70vh] pr-2 space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-yekan-medium text-gray-700 text-right">
                شماره تعرفه :
              </label>
              <input
                {...register('tariffNumber', { required: 'شماره تعرفه الزامی است' })}
                type="text"
                inputMode={tariff?.level === 1 ? 'numeric' : 'text'}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-yekan text-sm"
                dir="ltr"
              />
            </div>

            {tariff?.level === 3 && (
              <>
                <div className="space-y-2">
                  <label className="block text-sm font-yekan-medium text-gray-700 text-right">
                    واحد اول شمارش تعرفه :
                  </label>
                  <select
                    {...register('countingUnit1')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-yekan text-sm"
                  >
                    <option value="">انتخاب واحد اول</option>
                    {countingUnitOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-yekan-medium text-gray-700 text-right">
                    واحد دوم شمارش تعرفه :
                  </label>
                  <select
                    {...register('countingUnit2')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-yekan text-sm"
                  >
                    <option value="">انتخاب واحد دوم</option>
                    {countingUnitOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-yekan-medium text-gray-700 text-right">
                    واحد سوم شمارش تعرفه :
                  </label>
                  <select
                    {...register('countingUnit3')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-yekan text-sm"
                  >
                    <option value="">انتخاب واحد سوم</option>
                    {countingUnitOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-yekan-medium text-gray-700 text-right">
                    حقوق گمرکی :
                  </label>
                  <input
                    {...register('customsDuties')}
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-yekan text-sm"
                    dir="ltr"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-yekan-medium text-gray-700 text-right">
                    سود بازرگانی :
                  </label>
                  <input
                    {...register('commercialProfit')}
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-yekan text-sm"
                    dir="ltr"
                  />
                </div>
              </>
            )}

            <div className="space-y-2">
              <label className="block text-sm font-yekan-medium text-gray-700 text-right">
                نوع کالا :
              </label>
              <input
                {...register('productType', { required: 'نوع کالا الزامی است' })}
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-yekan text-sm"
                dir="rtl"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-yekan-medium text-gray-700 text-right">
                کد کشور دارنده کد ترجیحی :
              </label>
              <input
                {...register('preferentialCountryCode')}
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-yekan text-sm"
                dir="ltr"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-yekan-medium text-gray-700 text-right">
                ملاحظات :
              </label>
              <textarea
                {...register('notes')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-yekan text-sm resize-none"
                dir="rtl"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-yekan-medium text-gray-700 text-right">
                توضیحات :
              </label>
              <textarea
                {...register('description')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-yekan text-sm resize-none"
                dir="rtl"
                rows={3}
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                {...register('displayStatus')}
                type="checkbox"
                id="displayStatus"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="displayStatus" className="text-sm font-yekan-medium text-gray-700">
                وضعیت نمایش
              </label>
            </div>

            <div className="flex items-center gap-3">
              <input
                {...register('uniqueCodeSubject')}
                type="checkbox"
                id="uniqueCodeSubject"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="uniqueCodeSubject" className="text-sm font-yekan-medium text-gray-700">
                مشمول کد یکتا
              </label>
            </div>
          </div>

          <div className="flex justify-between items-center pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-yekan-medium text-sm"
            >
              بازگشت
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-yekan-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'در حال ثبت...' : 'ثبت اطلاعات'}
            </button>
          </div>
        </form>
      </Modal>
      
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </>
  );
};

export default EditTariffModal;
