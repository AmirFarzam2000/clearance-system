import React, { useState } from 'react';
import { ConfirmModal } from '../../ui/Modal';
import ErrorModal from '../../ui/ErrorModal';
import { useDeleteTarrif, useDeleteTarrifL2, useDeleteTarrifL3 } from '../../../hooks/useTarrifs';

interface DeleteTarrifModalProps {
  isOpen: boolean;
  onClose: () => void;
  tariff: {
    id: string;
    level: number;
    tarrifNo: string;
    productType: string;
    originalData: any;
  } | null;
  onSuccess?: () => void;
}

const DeleteTarrifModal: React.FC<DeleteTarrifModalProps> = ({
  isOpen,
  onClose,
  tariff,
  onSuccess
}) => {
  
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorData, setErrorData] = useState<any>(null);
  
  const deleteTarrifL1 = useDeleteTarrif();
  const deleteTarrifL2 = useDeleteTarrifL2();
  const deleteTarrifL3 = useDeleteTarrifL3();

  const getActiveMutation = () => {
    if (!tariff) {
      console.log('No tariff provided');
      return null;
    }
    
    
    switch (tariff.level) {
      case 1:
        return deleteTarrifL1;
      case 2:
        return deleteTarrifL2;
      case 3:
        return deleteTarrifL3;
      default:
        return null;
    }
  };

  const activeMutation = getActiveMutation();
  const isLoading = activeMutation?.isPending || false;

  const getTariffId = (): number | null => {
    if (!tariff?.originalData) return null;

    try {
      switch (tariff.level) {
        case 1:
          return tariff.originalData.TarrifL1ID ?? null;
        case 2:
          return tariff.originalData.TarrifL2ID ?? null;
        case 3:
          return tariff.originalData.TarrifL3ID ?? null;
        default:
          console.error('Invalid tariff level:', tariff.level);
          return null;
      }
    } catch (error) {
      console.error('Error extracting tariff ID:', error);
      return null;
    }
  };

  const handleConfirm = async () => {
    if (!tariff || !activeMutation) {
      console.error('Missing tariff or mutation:', { tariff, activeMutation });
      return;
    }

    const tariffId = getTariffId();
    if (tariffId === null) {
      console.error('Invalid tariff ID for level:', tariff.level, tariff);
      alert('خطا در حذف تعرفه: شناسه معتبری پیدا نشد');
      return;
    }


    try {
      await activeMutation.mutateAsync(tariffId);
      
      
      if (onSuccess) {
        onSuccess();
      }
      
      onClose();
    } catch (error: any) {
      console.error('Error deleting tariff:', error);
      
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
      
      alert('خطا در حذف تعرفه. لطفاً دوباره تلاش کنید.');
    }
  };

  const getMessage = (): string => {
    if (!tariff) {
      console.log('No tariff in getMessage');
      return '';
    }

    console.log('Getting message for tariff:', tariff);

    const levelNames = {
      1: 'سطح اول',
      2: 'سطح دوم',
      3: 'سطح سوم'
    };

    const message = `آیا از حذف تعرفه ${levelNames[tariff.level as keyof typeof levelNames]} با شماره "${tariff.tarrifNo}" (${tariff.productType}) مطمئن هستید؟`;
    
    return message;
  };

  return (
    <>
      <ConfirmModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleConfirm}
        title="حذف تعرفه"
        message={getMessage()}
        confirmText="بله، حذف شود"
        cancelText="انصراف"
        confirmButtonColor="red"
        isLoading={isLoading}
      />

      <ErrorModal
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        error={errorData}
      />
    </>
  );
};

export default DeleteTarrifModal;
