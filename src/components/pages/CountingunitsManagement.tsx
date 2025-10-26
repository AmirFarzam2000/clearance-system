
import React, { useState } from 'react';
import { MagnifyingGlassIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import PageHeader from '../ui/PageHeader';
import Table from '../ui/Table';
import HomeIcon from '../ui/icons/HomeIcon';
import { useCountingunits } from '../../hooks/useCountingunits';

const CountingunitsManagement: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const { data: countingUnits = [], isLoading, error } = useCountingunits();

  const columns = [
    { key: 'actions', title: 'عملیات', width: 120 },
    { key: 'CountingUnitID', title: 'شناسه', sortable: true, filterable: true, width: 120 },
    { key: 'FaTitle', title: 'عنوان فارسی', sortable: true, filterable: true, width: 150 },
    { key: 'EnTitle', title: 'عنوان لاتین', sortable: true, filterable: true, width: 150 },
    { key: 'Description', title: 'توضیحات', sortable: true, filterable: true, width: 200 }
  ];

  const handleSearch = () => {
    console.log('Searching for:', searchValue);
  };

  const handleEdit = (row: any) => {
    window.location.href = `/dashboard/countingunits-management/edit/${row.CountingUnitID}`;
  };

  const handleDelete = (row: any) => {
    console.log('Delete counting unit:', row);
  };

  const handleAddNew = () => {
    window.location.href = '/dashboard/countingunits-management/new';
  };

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

  if (isLoading) {
    return (
      <div className="flex-1 bg-gray-50 p-2 md:p-5">
        <div className="mx-auto max-w-full">
          <div style={{
            borderRadius: '10px',
            background: '#f5f5f5',
            border: '5px solid #fff',
            boxShadow: '0 0 16px #292a330f, 0 6px 20px #292a3305'
          }} className="p-3 md:p-5 lg:p-[20px]">
            <div className="text-center text-gray-600">
              در حال بارگذاری...
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-50 p-2 md:p-5">
      <div className="mx-auto max-w-full">
        <div style={{
          borderRadius: '10px',
          background: '#f5f5f5',
          border: '5px solid #fff',
          boxShadow: '0 0 16px #292a330f, 0 6px 20px #292a3305'
        }} className="p-3 md:p-5 lg:p-[20px] flex flex-col gap-3">
          <PageHeader
            title="واحد شمارشی"
            breadcrumbs={[
              { label: 'صفحه اصلی', icon: <HomeIcon className="w-4 h-4 text-gray-600" /> },
              { label: 'واحد شمارشی' }
            ]}
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            onSearch={handleSearch}
          />

          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-3 md:p-4 border-b border-gray-200 flex flex-col md:flex-row md:justify-between items-stretch md:items-center gap-3 md:gap-0">
              <div className="flex items-center gap-2 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                  <input
                    type="text"
                    value={searchValue}
                    placeholder="جستجو"
                    className="px-4 py-2 pr-10 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-yekan text-sm"
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
                className="px-4 py-2 border-blue-700 border-[1px] rounded-lg text-blue-700 hover:bg-blue-700 transition-colors font-yekan-medium text-sm whitespace-nowrap w-full md:w-auto"
              >
                تعریف واحد شمارشی جدید
              </button>
              <span className="text-sm font-yekan text-gray-600">تعداد ردیف: {countingUnits.length}</span>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Cog6ToothIcon className="w-4 h-4" />
              </button>
            </div>
            </div>

            <div className="overflow-y-auto" style={{ maxHeight: '600px' }}>
              <Table
                columns={columns}
                data={countingUnits}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
            
            <div className="p-4 border-t border-gray-200 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-sm font-yekan text-gray-600">تعداد ردیف: {countingUnits.length}</span>
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

export default CountingunitsManagement;
