import React from 'react';
import { useNavigate } from 'react-router-dom';
import NewProductGroupForm from './NewProductGroupForm';

const NewProductGroupFormWrapper: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/dashboard/productgroups-managment');
  };

  return (
    <NewProductGroupForm
      onBack={handleBack}
    />
  );
};

export default NewProductGroupFormWrapper;
