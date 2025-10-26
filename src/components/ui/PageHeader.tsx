import React from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';

interface PageHeaderProps {
  title: string;
  breadcrumbs: Array<{ label: string; icon?: React.ReactNode }>;
  searchValue: string;
  onSearchChange: (value: string) => void;
  onSearch: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  breadcrumbs
}) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
      
        <div>
          <h1 className="text-2xl font-yekan-bold text-gray-900">{title}</h1>
          <div className="flex items-center gap-1 mt-1">
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                {crumb.icon}
                <span className="text-gray-500 font-yekan text-sm">{crumb.label}</span>
                {index < breadcrumbs.length - 1 && (
                  <span className="text-gray-400 mx-1">/</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
       
      </div>
     <div className="w-10 h-10 hover:bg-blue-600 text-blue-600 border-blue-600 hover:text-white border-[1px] rounded-lg flex items-center justify-center transition-colors">
          <Bars3Icon className="w-5 h-5 text-blue-600 hover:text-white transition-colors" />
        </div>
    </div>
  );
};

export default PageHeader;
