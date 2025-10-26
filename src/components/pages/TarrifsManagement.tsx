import React, { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import PageHeader from '../ui/PageHeader';
import Table from '../ui/Table';
import HomeIcon from '../ui/icons/HomeIcon';
import { useTarrifs } from '../../hooks/useTarrifs';
import useModal from '../../hooks/useModal';
import type { TarrifL1 } from '../../types/dto/tarrifs.dto';
import { useNavigate } from 'react-router-dom';
import DeleteTarrifModal from './TarrifsManagement/DeleteTarrifModal';
import EditTariffModal from './TarrifsManagement/EditTariffModal';

const TarrifsManagement: React.FC = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [selectedTariff, setSelectedTariff] = useState<any>(null);
  const [selectedTariffForEdit, setSelectedTariffForEdit] = useState<any>(null);
  const deleteModal = useModal();
  const editModal = useModal();
  const viewModal = useModal();
  
  const { data: tarrifs = [], isLoading, error, refetch } = useTarrifs();

  const handleSearch = () => {
  };

  const handleRefresh = () => {
    refetch();
  };

  const handleAddNew = () => {
    navigate('/dashboard/tarrifs-management/new');
  };

  const flattenTarrifs = (tarrifs: TarrifL1[]): any[] => {
    const result: any[] = [];
    
    tarrifs.forEach(tarrifL1 => {
      result.push({
        id: `L1-${tarrifL1.TarrifL1ID}`,
        level: 1,
        tarrifNo: tarrifL1.TarrifNo,
        productType: tarrifL1.ProductType,
        preferentialTarrif: tarrifL1.PreferentialTarrifCountryCode,
        remark: tarrifL1.Remark,
        description: tarrifL1.Description,
        customDuty: '',
        commercialBenefit: '',
        countingUnit: '',
        parentId: null,
        originalData: tarrifL1
      });

      tarrifL1.Childs.forEach(tarrifL2 => {
        result.push({
          id: `L2-${tarrifL2.TarrifL2ID}`,
          level: 2,
          tarrifNo: tarrifL2.WithParentNo,
          productType: tarrifL2.ProductType,
          preferentialTarrif: tarrifL2.PreferentialTarrifCountryCode,
          remark: tarrifL2.Remark,
          description: tarrifL2.Description,
          customDuty: '',
          commercialBenefit: '',
          countingUnit: '',
          parentId: tarrifL1.TarrifL1ID,
          originalData: tarrifL2
        });

        tarrifL2.Childs.forEach(tarrifL3 => {
          result.push({
            id: `L3-${tarrifL3.TarrifL3ID}`,
            level: 3,
            tarrifNo: tarrifL3.WithParentNo,
            productType: tarrifL3.ProductType,
            preferentialTarrif: tarrifL3.PreferentialTarrifCountryCode,
            remark: tarrifL3.Remark,
            description: tarrifL3.Description,
            customDuty: tarrifL3.CustomDuty,
            commercialBenefit: tarrifL3.CommercialBenefit,
            countingUnit: `${tarrifL3.FirstCountingUnitTitle}${tarrifL3.SecondCountingUnitTitle ? ` / ${tarrifL3.SecondCountingUnitTitle}` : ''}${tarrifL3.ThirdCountingUnitTitle ? ` / ${tarrifL3.ThirdCountingUnitTitle}` : ''}`,
            parentId: tarrifL2.TarrifL2ID,
            originalData: tarrifL3
          });
        });
      });
    });

    return result;
  };

  const tableData = flattenTarrifs(tarrifs);

  const columns = [
    { key: 'actions', title: 'عملیات', width: 120 },
    { key: 'tarrifNo', title: 'شماره تعرفه', sortable: true, filterable: true, width: 150 },
    { key: 'productType', title: 'نوع کالا', sortable: true, filterable: true, width: 300 },
    { key: 'preferentialTarrif', title: 'تعرفه ترجیحی', sortable: true, filterable: true, width: 150 },
    { key: 'remark', title: 'ملاحظات', sortable: true, filterable: true, width: 300 },
    { key: 'description', title: 'توضیحات', sortable: true, filterable: true, width: 200 }
  ];

  const handleEdit = (row: any) => {
    setSelectedTariffForEdit(row);
    editModal.openModal();
  };

  const handleEditSuccess = () => {
    refetch();
  };

  const handleDelete = (row: any) => {
    setSelectedTariff(row);
    deleteModal.openModal();
  };

  const handleDeleteSuccess = () => {
    refetch();
  };

  const handleView = (row: any) => {
    viewModal.openModal();
    console.log('View tariff:', row);
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
    <div className="flex-1 bg-gray-50 p-2 md:p-5 overflow-y-auto">
      <div className="mx-auto max-w-full">
        <div style={{
          borderRadius: '10px',
          background: '#f5f5f5',
          border: '5px solid #fff',
          boxShadow: '0 0 16px #292a330f, 0 6px 20px #292a3305'
        }} className="p-[20px] flex flex-col gap-3">
          
          <PageHeader
            title="تعرفه‌ها"
            breadcrumbs={[
              { label: 'صفحه اصلی', icon: <HomeIcon className="w-4 h-4 text-gray-600" /> },
              { label: 'تعرفه‌ها' }
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
                    onClick={handleSearch}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <MagnifyingGlassIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleRefresh}
                  className="px-4 py-2 border-gray-300 border-[1px] rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-yekan-medium text-sm"
                >
                  بروزرسانی
                </button>
                <button
                  onClick={handleAddNew}
                  className="px-4 py-2 border-blue-700 border-[1px] rounded-lg text-blue-700 hover:bg-blue-700 hover:text-white transition-colors font-yekan-medium text-sm"
                >
                  تعریف تعرفه جدید
                </button>
              </div>
            </div>

            <div className="overflow-y-auto max-h-96">
              {isLoading ? (
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span className="mr-2 text-gray-600">در حال بارگذاری...</span>
                </div>
              ) : (
                <Table
                  columns={columns}
                  data={tableData}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onView={handleView}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <DeleteTarrifModal
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.closeModal}
        tariff={selectedTariff}
        onSuccess={handleDeleteSuccess}
      />

      <EditTariffModal
        isOpen={editModal.isOpen}
        onClose={editModal.closeModal}
        tariff={selectedTariffForEdit}
        onSuccess={handleEditSuccess}
      />
    </div>
  );
};

export default TarrifsManagement;