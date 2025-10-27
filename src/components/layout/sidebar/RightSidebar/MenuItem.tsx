import React from 'react';
import { Link } from 'react-router-dom';
import ChevronLeftIcon from '../../../ui/icons/ChevronLeftIcon';
import type { MenuItem as MenuItemType } from '../../../../types/types';

interface MenuItemProps {
  item: MenuItemType;
}

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  return (
    <Link 
      to={item.path || '#'} 
      className="flex items-center px-2 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-all duration-200 group"
    >
      <ChevronLeftIcon className="w-3 h-3 text-gray-400 ml-2 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110 group-hover:text-hover-pink" />
      <span className="font-yekan group-hover:text-hover-pink transition-colors duration-200">{item.label}</span>
    </Link>
  );
};

export default MenuItem;
