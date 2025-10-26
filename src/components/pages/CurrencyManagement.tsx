import React, { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../ui/PageHeader';
import Table from '../ui/Table';
import HomeIcon from '../ui/icons/HomeIcon';
import { ConfirmModal } from '../ui/Modal';
import { useCurrencies, useDeleteCurrency } from '../../hooks/useCurrencies';

const CurrencyManagement: React.FC = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    currency: any | null;
  }>({
    isOpen: false,
    currency: null
  });
  
  const { data: currencies = [], isLoading, error, refetch } = useCurrencies();
  const deleteCurrencyMutation = useDeleteCurrency();

  const columns = [
    { key: 'actions', title: 'عملیات', width: 120 },
    { key: 'CurrencyID', title: 'شناسه ارز', sortable: true, filterable: true, width: 120 },
    { key: 'Title', title: 'عنوان', sortable: true, filterable: true, width: 150 },
    { key: 'AlternativeTitle', title: 'عنوان جایگزین', sortable: true, filterable: true, width: 150 },
    { key: 'ISO', title: 'ISO', sortable: true, filterable: true, width: 100 },
    { key: 'DecimalDigit', title: 'تعداد اعشار', sortable: true, filterable: true, width: 100 }
  ];

  const handleSearch = () => {
  };

  const handleEdit = (row: any) => {
    navigate(`/dashboard/currency-management/edit/${row.CurrencyID}`);
  };

  const handleDelete = (row: any) => {
    setDeleteModal({
      isOpen: true,
      currency: row
    });
  };

  const handleConfirmDelete = () => {
    if (deleteModal.currency) {
      deleteCurrencyMutation.mutate(deleteModal.currency.CurrencyID, {
        onSuccess: () => {
          setDeleteModal({ isOpen: false, currency: null });
        },
        onError: () => {
          setDeleteModal({ isOpen: false, currency: null });
        }
      });
    }
  };

  const handleCloseDeleteModal = () => {
    setDeleteModal({ isOpen: false, currency: null });
  };

  const handleAddNew = () => {
    navigate('/dashboard/currency-management/new');
  };

  const handleRefresh = () => {
    refetch();
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
          }} className="p-[20px] flex flex-col gap-3">
            <div className="text-center text-red-600 mb-4">
              خطا در بارگذاری داده‌ها: {error.message}
            </div>
            <button
              onClick={handleRefresh}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
      <div className="flex-1 bg-gray-50 p-2 md:p-5">
        <div className="mx-auto max-w-full">
          <div style={{
            borderRadius: '10px',
            background: '#f5f5f5',
            border: '5px solid #fff',
            boxShadow: '0 0 16px #292a330f, 0 6px 20px #292a3305'
          }} className="p-[20px] flex flex-col gap-3">
            <PageHeader
              title="ارز"
              breadcrumbs={[
                { label: 'صفحه اصلی', icon: <HomeIcon className="w-4 h-4 text-gray-600" /> },
                { label: 'ارز' }
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
                <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
                
                  <button
                    onClick={handleAddNew}
                    className="px-4 py-2 border-blue-700 border-[1px] rounded-lg text-blue-700 hover:bg-blue-700 hover:text-white transition-colors font-yekan-medium text-sm whitespace-nowrap w-full md:w-auto"
                  >
                    تعریف ارز جدید
                  </button>
                </div>
                <span className="text-sm font-yekan text-gray-600">تعداد ردیف: {currencies.length}</span>
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <MagnifyingGlassIcon className="w-4 h-4" />
                </button>
              </div>

              <div className="overflow-hidden">
                {isLoading ? (
                  <div className="flex justify-center items-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <span className="mr-2 text-gray-600">در حال بارگذاری...</span>
                  </div>
                ) : (
                  <Table
                    columns={columns}
                    data={currencies}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        title="حذف ارز"
        message={`آیا واقعاً قصد حذف اطلاعات این ارز را دارید؟`}
        confirmText="بله"
        cancelText="خیر"
        confirmButtonColor="red"
        isLoading={deleteCurrencyMutation.isPending}
      />
    </>
  );
};

export default CurrencyManagement;
