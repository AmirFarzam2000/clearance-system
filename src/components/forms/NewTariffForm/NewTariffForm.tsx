import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import HomeIcon from '../../ui/icons/HomeIcon';
import PageHeader from '../../ui/PageHeader';
import FormButtons from '../FormButtons';
import TariffModal from '../../ui/TariffModal';
import TariffL2Modal from '../../ui/TariffL2Modal';
import useModal from '../../../hooks/useModal';
import { useTarrifL1s, useTarrifL2s, useCreateTarrifL3 } from '../../../hooks/useTarrifs';
import { useCountingunits } from '../../../hooks/useCountingunits';
import { useToast } from '../../../hooks/useToast';
import ToastContainer from '../../ui/Toast';
import TariffLevel1Section from './TariffLevel1Section';
import TariffLevel2Section from './TariffLevel2Section';
import CountingUnitSection from './CountingUnitSection';
import BasicFieldsSection from './BasicFieldsSection';
import TextAreaSection from './TextAreaSection';
import CheckboxSection from './CheckboxSection';
import FormErrorDisplay from './FormErrorDisplay';
import { buildPayload, mapValidationErrors } from '../../../utils/tariffFormUtils';
import type { TariffFormData } from '../../../utils/tariffFormUtils';

interface NewTariffFormProps {
  onBack: () => void;
}


const NewTariffForm: React.FC<NewTariffFormProps> = ({ onBack }) => {
  const tariffModal = useModal();
  const tariffL2Modal = useModal();
  const { data: tarrifL1s = [], isLoading } = useTarrifL1s();
  const { data: tarrifL2s = [], isLoading: isLoadingL2 } = useTarrifL2s();
  const { data: countingUnits = [], isLoading: isLoadingCountingUnits } = useCountingunits();
  const createTarrifL3Mutation = useCreateTarrifL3();
  const { toasts, removeToast, showSuccess, showError } = useToast();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    watch,
    setError,
    setValue
  } = useForm<TariffFormData>({
    defaultValues: {
      tariffLevel1: '',
      tariffLevel2: '',
      countingUnit1: '',
      countingUnit2: '',
      countingUnit3: '',
      customsDuties: '0',
      commercialProfit: '0',
      tariffNumber: '',
      productType: '',
      preferentialCountryCode: '',
      notes: '',
      description: '',
      displayStatus: false,
      uniqueCodeSubject: false
    }
  });

  const selectedTariffLevel1 = watch('tariffLevel1');
  // const selectedTariffLevel2 = watch('tariffLevel2');

  useEffect(() => {
    if (selectedTariffLevel1) {
      setValue('tariffLevel2', '');
    }
  }, [selectedTariffLevel1, setValue]);

  // Removed the useEffect - all error handling will be in handleFormSubmit

  const handleFormSubmit = async (data: TariffFormData) => {
    const selectedL2 = tarrifL2s.find(t => t.TarrifL2ID.toString() === data.tariffLevel2);
    const payload = buildPayload(data, selectedL2, countingUnits);

    console.log('Sending payload:', payload);
    console.log('Selected L2:', selectedL2);
    console.log('Counting Units:', countingUnits);

    try {
      console.log('Attempting to create Tariff L3 with payload:', JSON.stringify(payload, null, 2));
      const result = await createTarrifL3Mutation.mutateAsync(payload);
      console.log('Success! Response:', result);
      showSuccess('موفقیت', 'تعرفه جدید با موفقیت ثبت شد');
      setTimeout(() => {
        onBack();
      }, 1500);
    } catch (error: any) {
      console.error('Error creating tariff L3:', error);
      console.error('Error response:', error?.response?.data);
      console.error('Error details:', error?.response?.data?.ValidationErrors);
      
      // Handle errors with toast notifications
      if (error?.response?.data) {
        const errorData = error.response.data;
        
        if (errorData.ActionErrors && errorData.ActionErrors.length > 0) {
          errorData.ActionErrors.forEach((errorMsg: string) => {
            showError('خطا در ثبت تعرفه', errorMsg);
          });
        } else if (errorData.ValidationErrors && errorData.ValidationErrors.length > 0) {
          errorData.ValidationErrors.forEach((validationError: any) => {
            const errorMessage = validationError.ErrorMessage || validationError.message || 'خطا در اعتبارسنجی';
            showError('خطا در اعتبارسنجی', errorMessage);
          });
          
          // Map validation errors to form fields
          mapValidationErrors(errorData.ValidationErrors, (name, error) => {
            setError(name as keyof TariffFormData, error as any);
          });
        } else if (errorData.message) {
          showError('خطا در ثبت تعرفه', errorData.message);
        } else {
          showError('خطا در ثبت تعرفه', 'خطای غیرمنتظره‌ای رخ داده است');
        }
      } else if (error.message) {
        showError('خطا در ثبت تعرفه', error.message);
      } else {
        showError('خطا در ثبت تعرفه', 'خطای غیرمنتظره‌ای رخ داده است');
      }
    }
  };

  const handleTariffModalSubmit = (data: any) => {
    console.log('New tariff level 1 created:', data);
  };

  const handleTariffL2ModalSubmit = (data: any) => {
    console.log('New tariff level 2 created:', data);
  };

  // Find the parent TarrifL1 based on selectedTariffLevel1 (the selected L1)
  const parentTarrifL1 = selectedTariffLevel1 
    ? tarrifL1s.find(t => t.TarrifL1ID.toString() === selectedTariffLevel1)
    : undefined;

  const tariffLevel1Options = tarrifL1s.map(tarrif => ({
    value: tarrif.TarrifL1ID.toString(),
    label: tarrif.ProductType,
    code: tarrif.TarrifNo.toString()
  }));

  const tariffLevel2Options = selectedTariffLevel1
    ? tarrifL2s
        .filter(tarrif => tarrif.ParentID === parseInt(selectedTariffLevel1))
        .map(tarrif => ({
          value: tarrif.TarrifL2ID.toString(),
          label: tarrif.ProductType,
          code: tarrif.WithParentNo
        }))
    : [];

  const countingUnitOptions = countingUnits.map(unit => ({
    value: unit.CountingUnitID?.toString() || '',
    label: `${unit.FaTitle} (${unit.EnTitle})`,
    description: unit.Description
  }));

  return (
    <div className="flex-1 bg-gray-50 flex flex-col overflow-auto">
      <div className="p-5 flex-1">
        <div className=" max-w-full">
          <div style={{
            borderRadius: '10px',
            background: '#f5f5f5',
            border: '5px solid #fff',
            boxShadow: '0 0 16px #292a330f, 0 6px 20px #292a3305'
          }} className="p-3 md:p-5 lg:p-[20px]">

            <PageHeader 
              title="تعرفه جدید" 
              breadcrumbs={[
                { label: 'صفحه اصلی', icon: <HomeIcon className="w-4 h-4 text-gray-600" /> }, 
                { label: 'تعرفه ها' },
                { label: 'تعرفه جدید' }
              ]}
              searchValue=""
              onSearchChange={() => {}}
              onSearch={() => {}}
            />
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
              <FormErrorDisplay error={createTarrifL3Mutation.error} />

              <form onSubmit={handleSubmit(handleFormSubmit)}>
                <div className="space-y-4">
                  <TariffLevel1Section
                    control={control}
                    errors={errors}
                    options={tariffLevel1Options}
                    isLoading={isLoading}
                    onAddNew={tariffModal.openModal}
                  />

                  <TariffLevel2Section
                    control={control}
                    errors={errors}
                    options={tariffLevel2Options}
                    isLoading={isLoadingL2}
                    selectedTariffLevel1={selectedTariffLevel1}
                    onAddNew={tariffL2Modal.openModal}
                  />

                  <CountingUnitSection
                    name="countingUnit1"
                    label="واحد اول شمارش تعرفه : (برای استفاده در فاکتور مورد استفاده قرار میگیرد)"
                    control={control}
                    errors={errors}
                    options={countingUnitOptions}
                    placeholder="واحد اول شمارشی را انتخاب نمایید"
                    isLoading={isLoadingCountingUnits}
                    required
                  />

                  <CountingUnitSection
                    name="countingUnit2"
                    label="واحد دوم شمارش تعرفه : (برای استفاده در بارنامه مورد استفاده قرار میگیرد و معمولاً کارتن می باشد)"
                    control={control}
                    errors={errors}
                    options={countingUnitOptions}
                    placeholder="واحد دوم شمارشی را انتخاب نمایید"
                    isLoading={isLoadingCountingUnits}
                  />

                  <CountingUnitSection
                    name="countingUnit3"
                    label="واحد سوم شمارش تعرفه :"
                    control={control}
                    errors={errors}
                    options={countingUnitOptions}
                    placeholder="واحد سوم شمارشی را انتخاب نمایید"
                    isLoading={isLoadingCountingUnits}
                  />

                  <BasicFieldsSection control={control} errors={errors} />

                  <TextAreaSection
                    name="notes"
                    label="ملاحظات"
                    placeholder="ملاحظات را وارد کنید"
                    register={register}
                    errors={errors}
                    rows={3}
                  />

                  <TextAreaSection
                    name="description"
                    label="توضیحات"
                    placeholder="توضیحات را وارد کنید"
                    register={register}
                    errors={errors}
                    rows={3}
                  />

                  <CheckboxSection
                    name="displayStatus"
                    label="وضعیت نمایش"
                    register={register}
                    errors={errors}
                  />

                  <CheckboxSection
                    name="uniqueCodeSubject"
                    label="مشمول کد یکتا"
                    register={register}
                    errors={errors}
                  />
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <FormButtons
                    onBack={onBack}
                    onSubmit={handleSubmit(handleFormSubmit)}
                    backText="بازگشت به لیست تعرفه های سطح سوم"
                    submitText={isSubmitting || createTarrifL3Mutation.isPending ? "در حال ثبت..." : "ثبت اطلاعات"}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <TariffModal
        isOpen={tariffModal.isOpen}
        onClose={tariffModal.closeModal}
        onSubmit={handleTariffModalSubmit}
      />

      <TariffL2Modal
        isOpen={tariffL2Modal.isOpen}
        onClose={tariffL2Modal.closeModal}
        onSubmit={handleTariffL2ModalSubmit}
        parentTarrifL1={parentTarrifL1 ? {
          id: parentTarrifL1.TarrifL1ID,
          name: parentTarrifL1.ProductType,
          tarrifNo: parentTarrifL1.TarrifNo.toString()
        } : undefined}
      />
      
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
};

export default NewTariffForm;
