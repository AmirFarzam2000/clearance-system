import React from 'react';
import { useNavigate } from 'react-router-dom';
import NewCountingUnitForm from './NewCountingUnitForm';
import { useCreateCountingunit } from '../../hooks/useCountingunits';
import { useToast } from '../../hooks/useToast';
import ToastContainer from '../ui/Toast';

const NewCountingUnitFormWrapper: React.FC = () => {
  const navigate = useNavigate();
  const createCountingunitMutation = useCreateCountingunit();
  const { toasts, removeToast, showSuccess, showError } = useToast();

  const handleSubmit = async (data: any) => {
    try {
      const payload: any = {
        CountingUnitID: null,
        FaTitle: data.faTitle,
        EnTitle: data.enTitle,
        Description: data.description || '',
        RowVersion: []
      };

      await createCountingunitMutation.mutateAsync(payload);
      showSuccess('موفقیت', 'واحد شمارشی جدید با موفقیت ثبت شد');
      setTimeout(() => {
        navigate('/dashboard/countingunits-management');
      }, 1500);
    } catch (error: any) {
      console.error('Error creating counting unit:', error);
      
      if (error?.response?.data) {
        const errorData = error.response.data;
        
        if (errorData.ActionErrors && errorData.ActionErrors.length > 0) {
          errorData.ActionErrors.forEach((errorMsg: string) => {
            showError('خطا در ثبت واحد شمارشی', errorMsg);
          });
        } else if (errorData.ValidationErrors && errorData.ValidationErrors.length > 0) {
          errorData.ValidationErrors.forEach((validationError: any) => {
            const errorMessage = validationError.ErrorMessage || validationError.message || 'خطا در اعتبارسنجی';
            showError('خطا در اعتبارسنجی', errorMessage);
          });
        } else if (errorData.message) {
          showError('خطا در ثبت واحد شمارشی', errorData.message);
        } else {
          showError('خطا در ثبت واحد شمارشی', 'خطای غیرمنتظره‌ای رخ داده است');
        }
      } else if (error.message) {
        showError('خطا در ثبت واحد شمارشی', error.message);
      } else {
        showError('خطا در ثبت واحد شمارشی', 'خطای غیرمنتظره‌ای رخ داده است');
      }
    }
  };

  const handleBack = () => {
    navigate('/dashboard/countingunits-management');
  };

  return (
    <>
      <NewCountingUnitForm
        onBack={handleBack}
        onSubmit={handleSubmit}
      />
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </>
  );
};

export default NewCountingUnitFormWrapper;
