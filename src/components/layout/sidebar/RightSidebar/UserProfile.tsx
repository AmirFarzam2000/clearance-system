import React from 'react';
import { authApi } from '../../../../api/auth.api';

const UserProfile: React.FC = () => {
  const user = authApi.getCurrentUser();
  
  console.log('User from localStorage:', user);
  console.log('User FirstName:', user?.FirstName);
  console.log('User LastName:', user?.LastName);
  
  const fullName = user 
    ? `${user.FirstName || ''} ${user.LastName || ''}`.trim() 
    : 'کاربر';

  const avatarUrl = user?.avatar 
    ? user.avatar 
    : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face';

  return (
    <div className="px-6 py-5 border-b border-gray-200">
      <div className="flex items-center gap-3">
        <div
          className="flex-shrink-0"
          style={{
            borderRadius: '8px',
            width: '50px',
            height: '50px',
            border: '3px solid #fff',
            boxShadow: '0 5px 5px #292a3333',
            backgroundImage: `url("${avatarUrl}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="flex flex-col">
          <h3 className="font-yekan-bold text-gray-900 text-lg leading-tight">
            {fullName}
          </h3>
          <p className="text-sm font-yekan text-gray-600 mt-0.5">(دوره مالی پیش فرض)</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
