import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { tarrifsApi } from '../../api/tarrifs';

interface TariffL2ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TariffL2FormData) => void;
  parentTarrifL1?: { id: number; name: string; tarrifNo: string };
}

interface TariffL2FormData {
  tariffNumber: string;
  productType: string;
  preferentialCountryCode: string;
  remarks: string;
  description: string;
  displayStatus: boolean;
}

const TariffL2Modal: React.FC<TariffL2ModalProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  parentTarrifL1 
}) => {
  const queryClient = useQueryClient();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<TariffL2FormData>({
    defaultValues: {
      tariffNumber: '',
      productType: '',
      preferentialCountryCode: '',
      remarks: '',
      description: '',
      displayStatus: false
    }
  });

  const createTariffL2Mutation = useMutation({
    mutationFn: async (data: TariffL2FormData) => {
      const tariffL2Data = {
        ParentID: parentTarrifL1?.id || 0,
        WithParentNo: data.tariffNumber,
        ProductType: data.productType,
        PreferentialTarrifCountryCode: data.preferentialCountryCode,
        Remark: data.remarks,
        Description: data.description,
        isVisible: data.displayStatus
      };
      
      return await tarrifsApi.createL2(tariffL2Data);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['tarrifL2s'] });
      queryClient.invalidateQueries({ queryKey: ['tarrifs'] });
      onSubmit(variables);
      handleClose();
    },
    onError: (error) => {
      console.error('Error creating tariff L2:', error);
    }
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-yekan-bold text-gray-900">
                تعریف تعرفه سطح 2 در زیر مجموعه : ({parentTarrifL1?.tarrifNo})
              </h2>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {parentTarrifL1 && (
              <div className="p-6 bg-gray-50 border-b border-gray-200">
                <div className="text-sm text-gray-600">
                  <p className="font-yekan-medium mb-1">سطح اول : {parentTarrifL1.name}</p>
                  <p className="font-yekan">({parentTarrifL1.tarrifNo}) ماشین</p>
                </div>
                <div className="mt-2">
                  <span className="text-sm font-yekan-medium text-gray-700">سطح دوم</span>
                </div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto">
              <form onSubmit={handleSubmit((data) => createTariffL2Mutation.mutate(data))} className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-yekan-medium text-gray-700 text-right">
                  شماره تعرفه :
                </label>
                <input
                  {...register('tariffNumber', { required: 'شماره تعرفه الزامی است' })}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-yekan text-sm"
                  dir="ltr"
                  placeholder="شماره تعرفه را وارد کنید"
                />
                {errors.tariffNumber && (
                  <p className="text-red-500 text-sm font-yekan">{errors.tariffNumber.message}</p>
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
                  placeholder="نوع کالا را وارد کنید"
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
                  placeholder="کد کشور را وارد کنید"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-yekan-medium text-gray-700 text-right">
                  ملاحظات :
                </label>
                <textarea
                  {...register('remarks')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-yekan text-sm resize-none"
                  dir="rtl"
                  rows={3}
                  placeholder="ملاحظات را وارد کنید"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-yekan-medium text-gray-700 text-right">
                  توضیحات :
                </label>
                <textarea
                  {...register('description')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-yekan text-sm resize-none"
                  dir="rtl"
                  rows={3}
                  placeholder="توضیحات را وارد کنید"
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

              <div className="flex justify-between items-center pt-6">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors font-yekan-medium text-sm"
                >
                  بازگشت
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || createTariffL2Mutation.isPending}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-yekan-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting || createTariffL2Mutation.isPending ? 'در حال ثبت...' : 'ثبت اطلاعات'}
                </button>
              </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TariffL2Modal;
