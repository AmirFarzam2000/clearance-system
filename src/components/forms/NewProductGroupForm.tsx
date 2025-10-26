import React, { useState } from 'react';
import PageHeader from '../ui/PageHeader';
import HomeIcon from '../ui/icons/HomeIcon';
import FolderIcon from '../ui/icons/FolderIcon';
import StarIcon from '../ui/icons/StarIcon';
import FormInput from './FormInput';
import CustomSelect from './CustomSelect';
import FormTextarea from './FormTextarea';
import FormButtons from './FormButtons';

interface ProductGroupFormData {
  category: string;
  title: string;
  code: string;
  description: string;
}

interface NewProductGroupFormProps {
  onBack: () => void;
  onSubmit: (data: ProductGroupFormData) => void;
}

const NewProductGroupForm: React.FC<NewProductGroupFormProps> = ({ onBack, onSubmit }) => {
  const [formData, setFormData] = useState<ProductGroupFormData>({
    category: '',
    title: '',
    code: '',
    description: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const categoryOptions = [
    { value: 'نوع کالا', label: 'نوع کالا' },
    { value: 'مارک کالا', label: 'مارک کالا' },
    { value: 'مدل کالا', label: 'مدل کالا' },
    { value: 'دستگاه / کالا', label: 'دستگاه / کالا' },
    { value: 'نوع قطعات', label: 'نوع قطعات' }
  ];

  const handleInputChange = (field: keyof ProductGroupFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setIsLoading(true);
    
    try {
      await onSubmit(formData);
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
              title="گروه کالا جدید" 
              breadcrumbs={[
                { label: 'صفحه اصلی', icon: <HomeIcon className="w-4 h-4 text-gray-600" /> }, 
                { label: 'گروه کالا', icon: <FolderIcon className="w-4 h-4 text-gray-600" /> },
                { label: 'گروه کالا جدید', icon: <StarIcon className="w-4 h-4 text-gray-600" /> }
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
                  onBack={onBack}
                  onSubmit={handleSubmit}
                  backText="بازگشت به لیست گروه های کالا"
                  submitText="ثبت اطلاعات"
                  isLoading={isLoading}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProductGroupForm;
