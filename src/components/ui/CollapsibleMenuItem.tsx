import React, { useState } from 'react';
import ChevronRightIcon from './icons/ChevronRightIcon';
import ChevronLeftIcon from './icons/ChevronLeftIcon';

interface SubMenuItem {
  id: string;
  label: string;
}

interface CollapsibleMenuItemProps {
  title: string;
  icon: React.ReactNode;
  subItems: SubMenuItem[];
  isExpanded?: boolean;
  onToggle?: () => void;
}

const CollapsibleMenuItem: React.FC<CollapsibleMenuItemProps> = ({
  title,
  icon,
  subItems,
  isExpanded = false,
  onToggle
}) => {
  const [expanded, setExpanded] = useState(isExpanded);

  const handleToggle = () => {
    setExpanded(!expanded);
    onToggle?.();
  };

  return (
    <div className="mb-3" dir="rtl">
      <button
        onClick={handleToggle}
        className="w-full flex items-center justify-between px-3 py-3 hover:bg-gray-50 rounded-lg transition-all duration-200 group"
      >
        <div className="flex items-center gap-3">
          <div className="transition-all duration-300 group-hover:rotate-12 group-hover:scale-110 group-hover:text-hover-pink">
            {icon}
          </div>
          <span className="text-gray-700 font-yekan-medium group-hover:text-hover-pink transition-colors duration-200">{title}</span>
        </div>
        <div className="transition-all duration-300 group-hover:rotate-12" style={{
          transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)'
        }}>
          <ChevronRightIcon className="w-4 h-4 text-gray-400 group-hover:text-hover-pink transition-colors duration-200" />
        </div>
      </button>
      
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
        expanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="mr-8 space-y-1 mt-2">
          {subItems.map((item) => (
            <div key={item.id} className="flex items-center px-2 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-all duration-200 group">
              <ChevronLeftIcon className="w-3 h-3 text-gray-400 ml-2 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110 group-hover:text-hover-pink" />
              <span className="font-yekan group-hover:text-hover-pink transition-colors duration-200">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollapsibleMenuItem;
