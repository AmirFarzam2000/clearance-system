

import React, { useState } from 'react';
import { MagnifyingGlassIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../ui/PageHeader';
import Table from '../ui/Table';
import HomeIcon from '../ui/icons/HomeIcon';

interface Product {
  id: number;
  productId: number;
  productSpecification: string;
  productName: string;
  customsName: string;
  tariff: string;
}

const ProductsManagement: React.FC = () => {
  console.log('ProductsManagement component is rendering');
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [products] = useState<Product[]>([
    { id: 1, productId: 2, productSpecification: '28000116705612', productName: 'OUTDOOR WALL GENERAL SHKAR GNRR-24GRAA-O', customsName: 'NSING UNIT (OUTDOOR FOR AIR CONDITIONER', tariff: '84159010' },
    { id: 2, productId: 4, productSpecification: '2800012572056', productName: 'OUTDOOR GENERAL GOLD GG-MS12000PLATINUM', customsName: 'TOR FOR INDOOR UNIT ONDITIONER 12000 BTU', tariff: '84159010' },
    { id: 3, productId: 5, productSpecification: '2800012572018', productName: 'INDOOR WALL GENERAL ...GOLD GG-', customsName: 'TOR FOR INDOOR UNIT IR CONDITIONER 18000', tariff: '84159010' },
    { id: 4, productId: 6, productSpecification: '2800013189369', productName: 'OUTDOOR GENERAL GOLD GG-MS18000PLATINUM', customsName: 'TOR FOR INDOOR UNIT R CONDITIONER 24000', tariff: '84159010' },
    { id: 5, productId: 8, productSpecification: '2800013189338', productName: 'INDOOR GENERAL GOLD GG-MS18000PLATINUM', customsName: 'TOR FOR INDOOR UNIT R CONDITIONER 24000', tariff: '84159010' },
    { id: 6, productId: 9, productSpecification: '2800012555448', productName: 'OUTDOOR GENERAL GOLD GG-MS24000PLATINUM', customsName: 'TOR FOR INDOOR UNIT R CONDITIONER 24000', tariff: '84159010' },
    { id: 7, productId: 10, productSpecification: '2800012555240', productName: 'INDOOR GENERAL GOLD GG-MS24000PLATINUM', customsName: 'TOR FOR INDOOR UNIT R CONDITIONER 24000', tariff: '84159010' },
    { id: 8, productId: 11, productSpecification: '2800013189291', productName: 'OUTDOOR UNEVA UN-AS24 FANTOM-5 T3', customsName: 'TOR FOR INDOOR UNIT R CONDITIONER 24000', tariff: '84159010' },
    { id: 9, productId: 12, productSpecification: '2800013189284', productName: 'INDOOR UNEVA UN-AS24', customsName: 'TOR FOR INDOOR UNIT R CONDITIONER 24000', tariff: '84159010' }
  ]);

  const columns = [
    { key: 'actions', title: 'عملیات', width: 120 },
    { key: 'id', title: '#', sortable: true, filterable: true, width: 80 },
    { key: 'tariff', title: 'تعرفه', sortable: true, filterable: true, width: 120 },
    { key: 'productId', title: 'شناسه کالا', sortable: true, filterable: true, width: 120 },
    { key: 'productSpecification', title: 'شناسنامه کالا', sortable: true, filterable: true, width: 150 },
    { key: 'productName', title: 'نام کالا', sortable: true, filterable: true, width: 300 },
    { key: 'customsName', title: 'نام گمرکی', sortable: true, filterable: true, width: 300 }
  ];

  const handleSearch = () => {
    console.log('Searching for:', searchValue);
  };

  const handleEdit = (row: any) => {
    console.log('Edit product:', row);
  };

  const handleDelete = (row: any) => {
    console.log('Delete product:', row);
  };

  const handleAddNew = () => {
    navigate('/dashboard/products-management/new');
  };

  return (
    <div className="flex-1 bg-gray-50 p-2 md:p-5">
      <div className="mx-auto max-w-full">
        <div style={{
          borderRadius: '10px',
          background: '#f5f5f5',
          border: '5px solid #fff',
          boxShadow: '0 0 16px #292a330f, 0 6px 20px #292a3305'
        }} className="p-[20px] flex flex-col gap-3">
          <PageHeader
            title="کالا"
            breadcrumbs={[
              { label: 'صفحه اصلی', icon: <HomeIcon className="w-4 h-4 text-gray-600" /> },
              { label: 'کالا' }
            ]}
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            onSearch={handleSearch}
          />

          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <input
                    type="text"
                    value={searchValue}
                    placeholder="جستجو"
                    className="px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-yekan text-sm w-64"
                    dir="rtl"
                  />
                  <button
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <MagnifyingGlassIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <button
                onClick={handleAddNew}
                className="px-4 py-2 border-blue-700 border-[1px] rounded-lg text-blue-700 hover:bg-blue-700 transition-colors font-yekan-medium text-sm"
              >
                تعریف کالا جدید
              </button>
              <span className="text-sm font-yekan text-gray-600">تعداد ردیف: {products.length}</span>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Cog6ToothIcon className="w-4 h-4" />
              </button>
            </div>
            </div>

            <div className="overflow-hidden">
              <Table
                columns={columns}
                data={products}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
            
            <div className="p-4 border-t border-gray-200 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-sm font-yekan text-gray-600">تعداد ردیف: 247</span>
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <Cog6ToothIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default ProductsManagement;
