import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../ui/PageHeader';
import HomeIcon from '../ui/icons/HomeIcon';
import FolderIcon from '../ui/icons/FolderIcon';
import StarIcon from '../ui/icons/StarIcon';
import FormInput from './FormInput';
import FormTextarea from './FormTextarea';
import FormButtons from './FormButtons';
import { SuccessModal } from '../ui/SuccessModal';
import ErrorModal from '../ui/ErrorModal';
import { useCountingunit, useUpdateCountingunit } from '../../hooks/useCountingunits';
import type { CountingUnit } from '../../types/countingunits.dto';

interface CountingUnitFormData {
  faTitle: string;
  enTitle: string;
  description: string;
}

const EditCountingUnitForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<CountingUnitFormData>({
    faTitle: '',
    enTitle: '',
    description: ''
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorData, setErrorData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { data: countingUnit, isLoading: isLoadingCountingUnit, error } = useCountingunit(Number(id || 0));
  const updateCountingunitMutation = useUpdateCountingunit();

  useEffect(() => {
    if (countingUnit) {
      setFormData({
        faTitle: countingUnit.FaTitle || '',
        enTitle: countingUnit.EnTitle || '',
        description: countingUnit.Description || ''
      });
    }
  }, [countingUnit]);

  const handleInputChange = (field: keyof CountingUnitFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!countingUnit) return;
    
    setIsLoading(true);
    
    try {
      const payload: any = {
        CountingUnitID: countingUnit.CountingUnitID,
        FaTitle: formData.faTitle,
        EnTitle: formData.enTitle,
        Description: formData.description || '',
        RowVersion: countingUnit.RowVersion
      };

      await updateCountingunitMutation.mutateAsync(payload);
      setShowSuccessModal(true);
    } catch (error: any) {
      console.error('Error updating counting unit:', error);
      if (error?.response?.data) {
        const errorResponse = error.response.data;
        if (errorResponse.ActionErrors?.length > 0 || errorResponse.ValidationErrors?.length > 0) {
          setErrorData(errorResponse);
          setShowErrorModal(true);
          return;
        }
      }
      alert('خطا در به‌روزرسانی واحد شمارشی. لطفاً دوباره تلاش کنید.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    navigate('/dashboard/countingunits-management');
  };

  const handleBack = () => {
    navigate('/dashboard/countingunits-management');
  };

  if (isLoadingCountingUnit) {
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
              خطا در بارگذاری داده‌ها
            </div>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-yekan-medium text-sm mx-auto block"
            >
              تلاش مجدد
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
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
                title="ویرایش واحد شمارشی" 
                breadcrumbs={[
                  { label: 'صفحه اصلی', icon: <HomeIcon className="w-4 h-4 text-gray-600" /> }, 
                  { label: 'واحد شمارشی', icon: <FolderIcon className="w-4 h-4 text-gray-600" /> },
                  { label: 'ویرایش واحد شمارشی', icon: <StarIcon className="w-4 h-4 text-gray-600" /> }
                ]}
                searchValue=""
                onSearchChange={() => {}}
                onSearch={() => {}}
              />

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <FormInput
                    label="عنوان فارسی واحد شمارشی :"
                    value={formData.faTitle}
                    onChange={(value) => handleInputChange('faTitle', value)}
                    placeholder="عنوان فارسی واحد شمارشی را وارد کنید"
                    required
                  />

                  <FormInput
                    label="عنوان لاتین واحد شمارشی :"
                    value={formData.enTitle}
                    onChange={(value) => handleInputChange('enTitle', value)}
                    placeholder="عنوان لاتین واحد شمارشی را وارد کنید"
                    required
                  />

                  <FormTextarea
                    label="توضیحات :"
                    value={formData.description}
                    onChange={(value) => handleInputChange('description', value)}
                    placeholder="توضیحات واحد شمارشی را وارد کنید"
                    rows={4}
                  />

                  <FormButtons
                    onBack={handleBack}
                    onSubmit={handleSubmit}
                    backText="بازگشت به لیست واحدهای شمارشی"
                    submitText="ثبت تغییرات"
                    isLoading={isLoading}
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleSuccessModalClose}
        title="موفق"
        message="اطلاعات واحد شمارشی با موفقیت به‌روزرسانی شد"
      />
      
      <ErrorModal
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        error={errorData}
      />
    </>
  );
};

export default EditCountingUnitForm;
