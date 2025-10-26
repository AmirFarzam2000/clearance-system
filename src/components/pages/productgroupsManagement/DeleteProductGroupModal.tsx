import React, { useState } from 'react';
import { Modal } from '../../ui/Modal';
import ErrorModal from '../../ui/ErrorModal';
import { useDeleteProductgroup } from '../../../hooks/useProductgroups';

interface DeleteProductGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  productGroup: any;
  onSuccess?: () => void;
}

const DeleteProductGroupModal: React.FC<DeleteProductGroupModalProps> = ({
  isOpen,
  onClose,
  productGroup,
  onSuccess
}) => {
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorData, setErrorData] = useState<any>(null);
  
  const deleteProductgroupMutation = useDeleteProductgroup();
  const isLoading = deleteProductgroupMutation.isPending;

  const handleConfirm = async () => {
    if (!productGroup) return;

    try {
      await deleteProductgroupMutation.mutateAsync(productGroup.ProductGroupID);
      if (onSuccess) {
        onSuccess();
      }
      onClose();
    } catch (error: any) {
      console.error('Error deleting product group:', error);
      onClose();
      if (error?.response?.data) {
        const errorResponse = error.response.data;
        if (errorResponse.ActionErrors?.length > 0 || errorResponse.ValidationErrors?.length > 0) {
          setErrorData(errorResponse);
          setShowErrorModal(true);
          return;
        }
      }
      alert('خطا در حذف گروه کالا. لطفاً دوباره تلاش کنید.');
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="حذف گروه کالا"
        size="md"
      >
        <div className="space-y-6">
          <p className="text-right text-gray-700 font-yekan">
            آیا واقعاً قصد حذف اطلاعات این گروه کالا را دارید؟
          </p>

          <div className="flex justify-center gap-4 pt-4">
            <button
              onClick={handleConfirm}
              disabled={isLoading}
              className="px-8 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-yekan-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'در حال حذف...' : 'بله'}
            </button>
            <button
              onClick={onClose}
              disabled={isLoading}
              className="px-8 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors font-yekan-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              خیر
            </button>
          </div>
        </div>
      </Modal>
      
      <ErrorModal
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        error={errorData}
      />
    </>
  );
};

export default DeleteProductGroupModal;
