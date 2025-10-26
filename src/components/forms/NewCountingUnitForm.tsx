import React, { useState } from 'react';
import PageHeader from '../ui/PageHeader';
import HomeIcon from '../ui/icons/HomeIcon';
import FolderIcon from '../ui/icons/FolderIcon';
import StarIcon from '../ui/icons/StarIcon';
import FormInput from './FormInput';
import FormTextarea from './FormTextarea';
import FormButtons from './FormButtons';

interface CountingUnitFormData {
  faTitle: string;
  enTitle: string;
  description: string;
}

interface NewCountingUnitFormProps {
  onBack: () => void;
  onSubmit: (data: CountingUnitFormData) => void;
}

const NewCountingUnitForm: React.FC<NewCountingUnitFormProps> = ({ onBack, onSubmit }) => {
  const [formData, setFormData] = useState<CountingUnitFormData>({
    faTitle: '',
    enTitle: '',
    description: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof CountingUnitFormData, value: string) => {
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
              title="واحد شمارشی جدید" 
              breadcrumbs={[
                { label: 'صفحه اصلی', icon: <HomeIcon className="w-4 h-4 text-gray-600" /> }, 
                { label: 'واحد شمارشی', icon: <FolderIcon className="w-4 h-4 text-gray-600" /> },
                { label: 'واحد شمارشی جدید', icon: <StarIcon className="w-4 h-4 text-gray-600" /> }
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
                  onBack={onBack}
                  onSubmit={handleSubmit}
                  backText="بازگشت به لیست واحدهای شمارشی"
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

export default NewCountingUnitForm;
