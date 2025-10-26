import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from '../../ui/Modal';
import { useUpdateTarrif, useUpdateTarrifL2, useUpdateTarrifL3 } from '../../../hooks/useTarrifs';
import ErrorModal from '../../ui/ErrorModal';

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

interface EditFormData {
  tarrifNo: string | number;
  productType: string;
  preferentialCountryCode: string;
  remark: string;
  description: string;
  displayStatus: boolean;
}

const EditTariffModal: React.FC<EditTariffModalProps> = ({
  isOpen,
  onClose,
  tariff,
  onSuccess
}) => {
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorData, setErrorData] = useState<any>(null);

  const updateTarrifL1 = useUpdateTarrif();
  const updateTarrifL2 = useUpdateTarrifL2();
  const updateTarrifL3 = useUpdateTarrifL3();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<EditFormData>({
    defaultValues: {
      tarrifNo: '',
      productType: '',
      preferentialCountryCode: '',
      remark: '',
      description: '',
      displayStatus: false
    }
  });

  useEffect(() => {
    if (tariff) {
      reset({
        tarrifNo: tariff.tarrifNo || (tariff.level === 1 ? 0 : ''),
        productType: tariff.productType || '',
        preferentialCountryCode: tariff.preferentialTarrif || '',
        remark: tariff.remark || '',
        description: tariff.description || '',
        displayStatus: tariff.originalData?.isVisible || false
      });
    }
  }, [tariff, reset]);

  const getActiveMutation = () => {
    if (!tariff) return null;
    
    switch (tariff.level) {
      case 1:
        return updateTarrifL1;
      case 2:
        return updateTarrifL2;
      case 3:
        return updateTarrifL3;
      default:
        return null;
    }
  };

  const activeMutation = getActiveMutation();
  const isLoading = activeMutation?.isPending || false;

  const handleSubmitForm = async (data: EditFormData) => {
    if (!tariff || !activeMutation) return;

    try {
      let payload: any;
      
      switch (tariff.level) {
        case 1:
          payload = {
            ...tariff.originalData,
            TarrifNo: typeof data.tarrifNo === 'string' ? parseInt(data.tarrifNo) : data.tarrifNo,
            ProductType: data.productType,
            PreferentialTarrifCountryCode: data.preferentialCountryCode,
            Remark: data.remark,
            Description: data.description,
            isVisible: data.displayStatus
          };
          break;
          
        case 2:
          payload = {
            ...tariff.originalData,
            WithParentNo: data.tarrifNo,
            ProductType: data.productType,
            PreferentialTarrifCountryCode: data.preferentialCountryCode,
            Remark: data.remark,
            Description: data.description,
            isVisible: data.displayStatus
          };
          break;
          
        case 3:
          payload = {
            ...tariff.originalData,
            WithParentNo: data.tarrifNo,
            ProductType: data.productType,
            PreferentialTarrifCountryCode: data.preferentialCountryCode,
            Remark: data.remark,
            Description: data.description,
            isVisible: data.displayStatus
          };
          break;
      }

      await activeMutation.mutateAsync(payload);
      
      if (onSuccess) {
        onSuccess();
      }
      
      onClose();
    } catch (error: any) {
      console.error('Error updating tariff:', error);
      
      onClose();
      
      if (error?.response?.data) {
        const errorResponse = error.response.data;
        
        if (errorResponse.ActionErrors && errorResponse.ActionErrors.length > 0) {
          setErrorData(errorResponse);
          setShowErrorModal(true);
          return;
        }
        
        if (errorResponse.ValidationErrors && errorResponse.ValidationErrors.length > 0) {
          setErrorData(errorResponse);
          setShowErrorModal(true);
          return;
        }
      }
      
      alert('خطا در به‌روزرسانی تعرفه. لطفاً دوباره تلاش کنید.');
    }
  };

  const getTitle = (): string => {
    if (!tariff) return '';
    
    const levelNames = {
      1: 'اول',
      2: 'دوم',
      3: 'سوم'
    };
    
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
        <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-yekan-medium text-gray-700 text-right">
              شماره تعرفه :
            </label>
            <input
              {...register('tarrifNo', { required: 'شماره تعرفه الزامی است' })}
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-yekan text-sm"
              dir="ltr"
            />
            {errors.tarrifNo && (
              <p className="text-red-500 text-sm font-yekan">{errors.tarrifNo.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-yekan-medium text-gray-700 text-right">
              نوع کالا :
            </label>
            <input
              {...register('productType', { required: 'نوع کالا الزامی است' })}
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-yekan text-sm"
              dir="rtl"
            />
            {errors.productType && (
              <p className="text-red-500 text-sm font-yekan">{errors.productType.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-yekan-medium text-gray-700 text-right">
              کد کشور دارنده کد ترجیحی :
            </label>
            <input
              {...register('preferentialCountryCode')}
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-yekan text-sm"
              dir="ltr"
            />
            {errors.preferentialCountryCode && (
              <p className="text-red-500 text-sm font-yekan">{errors.preferentialCountryCode.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-yekan-medium text-gray-700 text-right">
              ملاحظات :
            </label>
            <textarea
              {...register('remark')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-yekan text-sm"
              dir="rtl"
              rows={3}
            />
            {errors.remark && (
              <p className="text-red-500 text-sm font-yekan">{errors.remark.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-yekan-medium text-gray-700 text-right">
              توضیحات :
            </label>
            <textarea
              {...register('description')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-yekan text-sm"
              dir="rtl"
              rows={3}
            />
            {errors.description && (
              <p className="text-red-500 text-sm font-yekan">{errors.description.message}</p>
            )}
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

      <ErrorModal
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        error={errorData}
      />
    </>
  );
};

export default EditTariffModal;
