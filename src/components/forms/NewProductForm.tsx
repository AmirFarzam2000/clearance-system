import React, { useState } from 'react';
import HomeIcon from '../ui/icons/HomeIcon';
import PageHeader from '../ui/PageHeader';
import FormInput from './FormInput';
import FormSelect from './FormSelect';
import FormButtons from './FormButtons';

interface NewProductFormProps {
  onBack: () => void;
  onSubmit: (data: ProductFormData) => void;
}

interface ProductFormData {
  productName: string;
  category: string;
  productType: string;
  productBrand: string;
  productModel: string;
  deviceProduct: string;
  partType: string;
  category6: string;
  category7: string;
  category8: string;
  tariffLevel1: string;
  tariffLevel2: string;
  tariffLevel3: string;
  customsName: string;
  valuationGroup: string;
  specificationNumber: string;
  netWeight: string;
  grossWeight: string;
}

const NewProductForm: React.FC<NewProductFormProps> = ({ onBack, onSubmit }) => {
  const [formData, setFormData] = useState<ProductFormData>({
    productName: 'DOR FLOOR UNEVA GG-MS12000PLATINUM TEA MAKER[ ]8[',
    category: '',
    productType: 'INDOOR FLOOR',
    productBrand: 'UNEVA',
    productModel: 'GG-MS12000PLATINUM',
    deviceProduct: 'TEA MAKER',
    partType: '',
    category6: '***',
    category7: '***',
    category8: '***',
    tariffLevel1: '',
    tariffLevel2: '',
    tariffLevel3: '',
    customsName: '',
    valuationGroup: '',
    specificationNumber: '',
    netWeight: '0',
    grossWeight: '0'
  });

  const handleInputChange = (field: keyof ProductFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    onSubmit(formData);
  };

  const categoryOptions = [
    { value: 'electronics', label: 'الکترونیک' },
    { value: 'appliances', label: 'لوازم خانگی' },
    { value: 'tools', label: 'ابزار' }
  ];

  const partTypeOptions = [
    { value: 'main', label: 'اصلی' },
    { value: 'accessory', label: 'لوازم جانبی' },
    { value: 'replacement', label: 'قطعه یدکی' }
  ];

  const tariffLevel1Options = [
    { value: '84', label: '84 - ماشین‌آلات و تجهیزات مکانیکی' },
    { value: '85', label: '85 - ماشین‌آلات و تجهیزات الکتریکی' }
  ];

  const tariffLevel2Options = [
    { value: '8415', label: '8415 - دستگاه‌های تهویه مطبوع' },
    { value: '8418', label: '8418 - یخچال‌ها و فریزرها' }
  ];

  const tariffLevel3Options = [
    { value: '84159010', label: '84159010 - دستگاه‌های تهویه مطبوع خانگی' },
    { value: '84159090', label: '84159090 - سایر دستگاه‌های تهویه مطبوع' }
  ];

  const valuationGroupOptions = [
    { value: 'group1', label: 'گروه 1' },
    { value: 'group2', label: 'گروه 2' },
    { value: 'group3', label: 'گروه 3' }
  ];

  return (
    <div className="flex-1 bg-gray-50">
      <div className="p-5">
        <div className="mx-auto max-w-full">
          <div style={{
            borderRadius: '10px',
            background: '#f5f5f5',
            border: '5px solid #fff',
            boxShadow: '0 0 16px #292a330f, 0 6px 20px #292a3305'
          }} className="p-3 md:p-5 lg:p-[20px]">

            <PageHeader 
              title="کالا جدید" 
              breadcrumbs={[
                { label: 'صفحه اصلی', icon: <HomeIcon className="w-4 h-4 text-gray-600" /> }, 
                { label: 'کالا' },
                { label: 'کالا جدید' }
              ]}
              searchValue=""
              onSearchChange={() => {}}
              onSearch={() => {}}
            />
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <label className="block text-sm font-yekan-medium text-gray-700 text-right">
                        تعرفه کالا :
                      </label>
                      
                      <FormSelect
                        label="سطح اول :"
                        value={formData.tariffLevel1}
                        onChange={(value) => handleInputChange('tariffLevel1', value)}
                        options={tariffLevel1Options}
                        placeholder="تعرفه سطح اول را انتخاب نمایید"
                      />

                      <FormSelect
                        label="سطح دوم :"
                        value={formData.tariffLevel2}
                        onChange={(value) => handleInputChange('tariffLevel2', value)}
                        options={tariffLevel2Options}
                        placeholder="تعرفه سطح دوم را انتخاب نمایید"
                      />

                      <FormSelect
                        label="سطح سوم :"
                        value={formData.tariffLevel3}
                        onChange={(value) => handleInputChange('tariffLevel3', value)}
                        options={tariffLevel3Options}
                        placeholder="تعرفه سطح سوم را انتخاب نمایید"
                      />
                    </div>

                    <FormInput
                      label="نام گمرکی کالا :"
                      value={formData.customsName}
                      onChange={(value) => handleInputChange('customsName', value)}
                      dir="ltr"
                    />

                    <FormSelect
                      label="گروه ارزش گذاری :"
                      value={formData.valuationGroup}
                      onChange={(value) => handleInputChange('valuationGroup', value)}
                      options={valuationGroupOptions}
                      placeholder="گروه ارزش گذاری را انتخاب نمایید"
                    />

                    <FormInput
                      label="شماره شناسنامه کالا :"
                      value={formData.specificationNumber}
                      onChange={(value) => handleInputChange('specificationNumber', value)}
                      dir="ltr"
                    />

                    <FormInput
                      label="وزن خالص کالا :"
                      value={formData.netWeight}
                      onChange={(value) => handleInputChange('netWeight', value)}
                      type="number"
                      dir="ltr"
                    />

                    <FormInput
                      label="وزن ناخالص کالا :"
                      value={formData.grossWeight}
                      onChange={(value) => handleInputChange('grossWeight', value)}
                      type="number"
                      dir="ltr"
                    />

                    <div className="space-y-2">
                      <label className="block text-sm font-yekan-medium text-gray-700 text-right">
                        فایل شناسنامه :
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="file"
                          className="hidden"
                          id="specification-file"
                          accept=".pdf,.doc,.docx"
                        />
                        <label
                          htmlFor="specification-file"
                          className="px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors font-yekan text-sm text-gray-700"
                        >
                          Choose File
                        </label>
                        <span className="text-sm text-gray-500 font-yekan">No file chosen</span>
                      </div>
                    </div>
                     
                   </div>
                  <div className="space-y-4">
                    <FormInput
                      label="نام کالا :"
                      value={formData.productName}
                      onChange={(value) => handleInputChange('productName', value)}
                      dir="ltr"
                    />

                    <FormSelect
                      label="گروه بندی :"
                      value={formData.category}
                      onChange={(value) => handleInputChange('category', value)}
                      options={categoryOptions}
                      placeholder="گروه بندی را انتخاب نمایید"
                    />

                    <FormInput
                      label="نوع کالا :"
                      value={formData.productType}
                      onChange={(value) => handleInputChange('productType', value)}
                      dir="ltr"
                    />

                    <FormInput
                      label="مارک کالا :"
                      value={formData.productBrand}
                      onChange={(value) => handleInputChange('productBrand', value)}
                      dir="ltr"
                    />

                    <FormInput
                      label="مدل کالا :"
                      value={formData.productModel}
                      onChange={(value) => handleInputChange('productModel', value)}
                      dir="ltr"
                    />

                    <FormInput
                      label="دستگاه / کالا :"
                      value={formData.deviceProduct}
                      onChange={(value) => handleInputChange('deviceProduct', value)}
                      dir="ltr"
                    />

                    <FormSelect
                      label="نوع قطعات :"
                      value={formData.partType}
                      onChange={(value) => handleInputChange('partType', value)}
                      options={partTypeOptions}
                      placeholder="نوع قطعات را انتخاب نمایید"
                    />

                    <FormInput
                      label="طبقه 6 :"
                      value={formData.category6}
                      onChange={(value) => handleInputChange('category6', value)}
                      dir="ltr"
                    />

                    <FormInput
                      label="طبقه 7 :"
                      value={formData.category7}
                      onChange={(value) => handleInputChange('category7', value)}
                      dir="ltr"
                    />

                    <FormInput
                      label="طبقه 8 :"
                      value={formData.category8}
                      onChange={(value) => handleInputChange('category8', value)}
                      dir="ltr"
                    />
                  </div>

                
                </div>

                <FormButtons
                  onBack={onBack}
                  onSubmit={handleSubmit}
                  backText="بازگشت به لیست کالاها"
                  submitText="ثبت اطلاعات"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProductForm;
