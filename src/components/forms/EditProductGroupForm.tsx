import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../ui/PageHeader';
import HomeIcon from '../ui/icons/HomeIcon';
import FolderIcon from '../ui/icons/FolderIcon';
import StarIcon from '../ui/icons/StarIcon';
import FormInput from './FormInput';
import CustomSelect from './CustomSelect';
import FormTextarea from './FormTextarea';
import FormButtons from './FormButtons';
import { SuccessModal } from '../ui/SuccessModal';
import { useProductgroup, useUpdateProductgroup, useProductGroupLevels } from '../../hooks/useProductgroups';
import { useToast } from '../../hooks/useToast';
import ToastContainer from '../ui/Toast';
import type { Productgroup } from '../../types/productgroup.dto';

interface ProductGroupFormData {
  category: string;
  title: string;
  code: string;
  description: string;
}

const EditProductGroupForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<ProductGroupFormData>({
    category: '',
    title: '',
    code: '',
    description: ''
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { data: productGroup, isLoading: isLoadingProductGroup, error } = useProductgroup(Number(id || 0));
  const updateProductgroupMutation = useUpdateProductgroup();
  const { data: productGroupLevels = [], isLoading: isLoadingLevels } = useProductGroupLevels();
  const { toasts, removeToast, showError } = useToast();

  const categoryOptions = productGroupLevels.map((level: any) => ({
    value: level.ProductGroupLevelID?.toString() || '',
    label: level.Title || ''
  }));

  useEffect(() => {
    if (productGroup && productGroupLevels.length > 0) {
      // Find the level title based on ProductGroupLevelID
      const selectedLevel = productGroupLevels.find((level: any) => 
        level.ProductGroupLevelID === productGroup.ProductGroupLevelID
      );
      
      setFormData({
        category: selectedLevel?.ProductGroupLevelID?.toString() || '',
        title: productGroup.Title || '',
        code: productGroup.Code || '',
        description: productGroup.Description || ''
      });
    }
  }, [productGroup, productGroupLevels]);

  const handleInputChange = (field: keyof ProductGroupFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!productGroup) return;
    
    setIsLoading(true);
    
    try {
      // Find the selected level based on the category ID
      const selectedLevel = productGroupLevels.find((level: any) => 
        level.ProductGroupLevelID?.toString() === formData.category
      );

      const payload: Productgroup = {
        ...productGroup,
        ProductGroupLevelID: selectedLevel?.ProductGroupLevelID || productGroup.ProductGroupLevelID,
        ProductGroupLevelTitle: selectedLevel?.Title || '',
        Code: formData.code,
        Title: formData.title,
        Description: formData.description || ''
      };

      await updateProductgroupMutation.mutateAsync(payload);
      setShowSuccessModal(true);
    } catch (error: any) {
      console.error('Error updating product group:', error);
      
      if (error?.response?.data) {
        const errorData = error.response.data;
        
        if (errorData.ActionErrors && errorData.ActionErrors.length > 0) {
          errorData.ActionErrors.forEach((errorMsg: string) => {
            showError('خطا در ویرایش گروه کالا', errorMsg);
          });
        } else if (errorData.ValidationErrors && errorData.ValidationErrors.length > 0) {
          errorData.ValidationErrors.forEach((validationError: any) => {
            const errorMessage = validationError.ErrorMessage || validationError.message || 'خطا در اعتبارسنجی';
            showError('خطا در اعتبارسنجی', errorMessage);
          });
        } else if (errorData.message) {
          showError('خطا در ویرایش گروه کالا', errorData.message);
        } else {
          showError('خطا در ویرایش گروه کالا', 'خطای غیرمنتظره‌ای رخ داده است');
        }
      } else if (error.message) {
        showError('خطا در ویرایش گروه کالا', error.message);
      } else {
        showError('خطا در ویرایش گروه کالا', 'خطای غیرمنتظره‌ای رخ داده است');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    navigate('/dashboard/productgroups-managment');
  };

  const handleBack = () => {
    navigate('/dashboard/productgroups-managment');
  };

  if (isLoadingProductGroup) {
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
            <div className="text-center text-red-600">
              خطا در بارگذاری داده‌ها
            </div>
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
                title="ویرایش گروه کالا" 
                breadcrumbs={[
                  { label: 'صفحه اصلی', icon: <HomeIcon className="w-4 h-4 text-gray-600" /> }, 
                  { label: 'گروه کالا', icon: <FolderIcon className="w-4 h-4 text-gray-600" /> },
                  { label: 'ویرایش گروه کالا', icon: <StarIcon className="w-4 h-4 text-gray-600" /> }
                ]}
                searchValue=""
                onSearchChange={() => {}}
                onSearch={() => {}}
              />

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <CustomSelect
                    label="طبقه گروه کالا :"
                    value={formData.category}
                    onChange={(value) => handleInputChange('category', value)}
                    options={categoryOptions}
                    placeholder="-- لطفاً طبقه گروه بندی را انتخاب نمایید --"
                    isLoading={isLoadingLevels}
                    required
                  />

                  <FormInput
                    label="عنوان گروه کالا :"
                    value={formData.title}
                    onChange={(value) => handleInputChange('title', value)}
                    placeholder="عنوان گروه کالا را وارد کنید"
                    required
                  />

                  <FormInput
                    label="کد گروه کالا :"
                    value={formData.code}
                    onChange={(value) => handleInputChange('code', value)}
                    placeholder="کد گروه کالا را وارد کنید"
                    required
                  />

                  <FormTextarea
                    label="توضیحات :"
                    value={formData.description}
                    onChange={(value) => handleInputChange('description', value)}
                    placeholder="توضیحات گروه کالا را وارد کنید"
                    rows={4}
                  />

                  <FormButtons
                    onBack={handleBack}
                    onSubmit={handleSubmit}
                    backText="بازگشت به لیست گروه های کالا"
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
        message="اطلاعات گروه کالا با موفقیت به‌روزرسانی شد"
      />
      
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </>
  );
};

export default EditProductGroupForm;
