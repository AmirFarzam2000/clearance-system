import React from 'react';
import ChevronRightIcon from '../../../ui/icons/ChevronRightIcon';
import MenuItem from './MenuItem';
import type { MenuItem as MenuItemType } from '../../../../types/types';

interface MenuSectionProps {
  label: string;
  icon: React.ReactNode;
  items: MenuItemType[];
  isExpanded: boolean;
  onToggle: () => void;
}

const MenuSection: React.FC<MenuSectionProps> = ({ 
  label, 
  icon, 
  items, 
  isExpanded, 
  onToggle 
}) => {
  return (
    <div className="mb-3">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-3 py-3 hover:bg-gray-50 rounded-lg transition-all duration-200 group"
      >
        <div className="flex items-center gap-3">
          {icon}
          <span className="text-gray-700 font-yekan-medium group-hover:text-hover-pink transition-colors duration-200">{label}</span>
        </div>
        <div 
          className="transition-all duration-300 group-hover:rotate-12" 
          style={{ transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)' }}
        >
          <ChevronRightIcon className="w-4 h-4 text-gray-400 group-hover:text-hover-pink transition-colors duration-200" />
        </div>
      </button>
      
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
        isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="mr-8 space-y-1 mt-2">
          {items.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuSection;
