import React from 'react';
import MenuIcon from '../../../ui/icons/MenuIcon';
import Logo from '../../../ui/Logo';

interface SidebarHeaderProps {
  onToggle: () => void;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ onToggle }) => {
  return (
    <div className="px-4 py-3 border-b border-gray-200">
      <div className="flex items-center gap-[10px]">
        <div onClick={onToggle} className="cursor-pointer">
          <MenuIcon 
            className="w-5 h-5 text-gray-500 hover:text-hover-pink hover:rotate-12 hover:scale-110 transition-all duration-300" 
          />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-gray-700 font-yekan-medium text-sm">سامانه ترخیص ؟؟</span>
          <Logo />
        </div>
      </div>
    </div>
  );
};

export default SidebarHeader;
