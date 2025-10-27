import React from 'react';
import { motion } from 'framer-motion';
import ChevronLeftIcon from '../../../ui/icons/ChevronLeftIcon';
import type { MenuItem } from '../../../../types/types';

interface HoverMenuProps {
  items: MenuItem[];
  isVisible: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onItemClick: (path?: string) => void;
}

const HoverMenu: React.FC<HoverMenuProps> = ({ 
  items, 
  isVisible, 
  onMouseEnter, 
  onMouseLeave,
  onItemClick
}) => {
  if (!isVisible || items.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 10, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 10, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="absolute right-full top-0 mr-1 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[200px] z-[9999]"
      style={{ direction: 'rtl' }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors duration-200 group"
          onClick={() => onItemClick(item.path)}
        >
          <ChevronLeftIcon className="w-3 h-3 text-gray-400 ml-2 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110 group-hover:text-hover-pink" />
          <span className="font-yekan group-hover:text-hover-pink transition-colors duration-200">{item.label}</span>
        </div>
      ))}
    </motion.div>
  );
};

export default HoverMenu;
