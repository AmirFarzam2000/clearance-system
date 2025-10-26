import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NewCountingUnitForm from './NewCountingUnitForm';
import ErrorModal from '../ui/ErrorModal';
import { useCreateCountingunit } from '../../hooks/useCountingunits';
import type { CountingUnit } from '../../types/countingunits.dto';

const NewCountingUnitFormWrapper: React.FC = () => {
  const navigate = useNavigate();
  const createCountingunitMutation = useCreateCountingunit();
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorData, setErrorData] = useState<any>(null);

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
      navigate('/dashboard/countingunits-management');
    } catch (error: any) {
      console.error('Error creating counting unit:', error);
      if (error?.response?.data) {
        const errorResponse = error.response.data;
        if (errorResponse.ActionErrors?.length > 0 || errorResponse.ValidationErrors?.length > 0) {
          setErrorData(errorResponse);
          setShowErrorModal(true);
          return;
        }
      }
      alert('خطا در ایجاد واحد شمارشی. لطفاً دوباره تلاش کنید.');
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
      <ErrorModal
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        error={errorData}
      />
    </>
  );
};

export default NewCountingUnitFormWrapper;
