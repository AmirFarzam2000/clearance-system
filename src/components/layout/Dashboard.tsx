import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import MainContent from './MainContent';
import CurrencyManagement from '../pages/CurrencyManagement';
import { authApi } from '../../api/auth.api';
import ProductgroupsManagment from '../pages/productgroupsManagement';
import ProductsManagement from '../pages/ProductsManagement';
import TarrifsManagement from '../pages/TarrifsManagement';
import NewTariffForm from '../forms/NewTariffForm';
import NewProductForm from '../forms/NewProductForm';
import NewCurrencyForm from '../forms/NewCurrencyForm';
import EditCurrencyForm from '../forms/EditCurrencyForm';
import NewProductGroupFormWrapper from '../forms/NewProductGroupFormWrapper';
import EditProductGroupForm from '../forms/EditProductGroupForm';
import NewCountingUnitFormWrapper from '../forms/NewCountingUnitFormWrapper';
import EditCountingUnitForm from '../forms/EditCountingUnitForm';
import CountingunitsManagement from '../pages/CountingunitsManagement';

const Dashboard: React.FC = () => {
  const user = authApi.getCurrentUser();

  if (!user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-yekan">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<MainContent />} />
        <Route path="currency-management" element={<CurrencyManagement />} />
        <Route path="currency-management/new" element={<NewCurrencyForm />} />
        <Route path="currency-management/edit/:id" element={<EditCurrencyForm />} />
        <Route path="productgroups-managment" element={<ProductgroupsManagment />} />
        <Route path="productgroups-managment/new" element={<NewProductGroupFormWrapper />} />
        <Route path="productgroups-managment/edit/:id" element={<EditProductGroupForm />} />
        <Route path="countingunits-management" element={<CountingunitsManagement />} />
        <Route path="countingunits-management/new" element={<NewCountingUnitFormWrapper />} />
        <Route path="countingunits-management/edit/:id" element={<EditCountingUnitForm />} />
        <Route path="products-management" element={<ProductsManagement/>} />
        <Route path="products-management/new" element={<NewProductForm onBack={() => window.history.back()} onSubmit={() => {}} />} />
        <Route path="tarrifs-management" element={<TarrifsManagement/>} />
        <Route path="tarrifs-management/new" element={<NewTariffForm onBack={() => window.history.back()} />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />


      </Route>
    </Routes>
  );
};

export default Dashboard;
