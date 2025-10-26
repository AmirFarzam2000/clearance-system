import React from 'react';
import { useNavigate } from 'react-router-dom';
import NewProductGroupForm from './NewProductGroupForm';
import { useCreateProductgroup } from '../../hooks/useProductgroups';
import type { Productgroup } from '../../types/productgroup.dto';

const NewProductGroupFormWrapper: React.FC = () => {
  const navigate = useNavigate();
  const createProductgroupMutation = useCreateProductgroup();

  const handleSubmit = async (data: any) => {
    try {
      const levelMap: { [key: string]: number } = {
        'نوع کالا': 1,
        'مارک کالا': 2,
        'مدل کالا': 3,
        'دستگاه / کالا': 4,
        'نوع قطعات': 5
      };

      const payload: Productgroup = {
        ProductGroupID: 0,
        ProductGroupLevelID: levelMap[data.category] || 1,
        ProductGroupLevelTitle: data.category,
        Code: data.code,
        Title: data.title,
        Description: data.description || '',
        RowVersion: ''
      };

      await createProductgroupMutation.mutateAsync(payload);
      navigate('/dashboard/productgroups-managment');
    } catch (error) {
      console.error('Error creating product group:', error);
    }
  };

  const handleBack = () => {
    navigate('/dashboard/productgroups-managment');
  };

  return (
    <NewProductGroupForm
      onBack={handleBack}
      onSubmit={handleSubmit}
    />
  );
};

export default NewProductGroupFormWrapper;
