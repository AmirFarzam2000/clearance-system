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

  const categoryOptions = productGroupLevels.map((level: any) => ({
    value: level.ProductGroupLevelID?.toString() || '',
    label: level.Title || ''
  }));

  useEffect(() => {
    if (productGroup) {
      setFormData({
        category: productGroup.ProductGroupLevelTitle || '',
        title: productGroup.Title || '',
        code: productGroup.Code || '',
        description: productGroup.Description || ''
      });
    }
  }, [productGroup]);

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
      const levelMap: { [key: string]: number } = {
        'نوع کالا': 1,
        'مارک کالا': 2,
        'مدل کالا': 3,
        'دستگاه / کالا': 4,
        'نوع قطعات': 5
      };

      const payload: Productgroup = {
        ...productGroup,
        ProductGroupLevelID: levelMap[formData.category] || productGroup.ProductGroupLevelID,
        ProductGroupLevelTitle: formData.category,
        Code: formData.code,
        Title: formData.title,
        Description: formData.description || ''
      };

      await updateProductgroupMutation.mutateAsync(payload);
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Error updating product group:', error);
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
    </>
  );
};

export default EditProductGroupForm;
