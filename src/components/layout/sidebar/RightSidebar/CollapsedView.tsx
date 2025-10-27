import React from 'react';
import { AnimatePresence } from 'framer-motion';
import MenuIcon from '../../../ui/icons/MenuIcon';
import HomeIcon from '../../../ui/icons/HomeIcon';
import SettingsIcon from '../../../ui/icons/SettingsIcon';
import ClockIcon from '../../../ui/icons/ClockIcon';
import ClipboardIcon from '../../../ui/icons/ClipboardIcon';
import LogoutIcon from '../../../ui/icons/LogoutIcon';
import HoverMenu from './HoverMenu';
import { BASIC_INFO_ITEMS, SYSTEM_AFFAIRS_ITEMS, PERSONAL_TASKS_ITEMS } from '../../../../utils/constants';
import { authApi } from '../../../../api/auth.api';

interface CollapsedViewProps {
  onToggle: () => void;
  hoveredItem: string | null;
  setHoveredItem: (item: string | null) => void;
  onNavigation: (path: string) => void;
}

const CollapsedView: React.FC<CollapsedViewProps> = ({
  onToggle,
  hoveredItem,
  setHoveredItem,
  onNavigation
}) => {
  const handleLogout = async () => {
    try {
      await authApi.logout();
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="w-[60px] flex flex-col items-center py-4 space-y-4 overflow-visible">
      <div onClick={onToggle} className="cursor-pointer">
        <MenuIcon 
          className="w-6 h-6 text-gray-500 hover:text-hover-pink hover:rotate-12 hover:scale-110 transition-all duration-300" 
        />
      </div>
      
      <div
        className="w-8 h-8 rounded-full cursor-pointer"
        style={{
          border: '2px solid #fff',
          boxShadow: '0 3px 3px #292a3333',
          backgroundImage: 'url("https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
        onClick={onToggle}
      />
      
      <div className="flex flex-col space-y-3 overflow-visible">
        <div className="relative overflow-visible">
          <div onClick={() => onNavigation('/dashboard')} className="cursor-pointer">
            <HomeIcon 
              className="w-5 h-5 text-gray-500 hover:text-hover-pink hover:rotate-12 hover:scale-110 transition-all duration-300" 
            />
          </div>
        </div>
        
        <div 
          className="relative overflow-visible pr-4"
          onMouseEnter={() => setHoveredItem('systemAffairs')}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <SettingsIcon className="w-5 h-5 text-gray-500 hover:text-hover-pink hover:rotate-12 hover:scale-110 transition-all duration-300 cursor-pointer" />
          <AnimatePresence>
            <HoverMenu 
              items={SYSTEM_AFFAIRS_ITEMS} 
              isVisible={hoveredItem === 'systemAffairs'}
              onMouseEnter={() => setHoveredItem('systemAffairs')}
              onMouseLeave={() => setHoveredItem(null)}
              onItemClick={(path) => path && onNavigation(path)}
            />
          </AnimatePresence>
        </div>
        
        <div 
          className="relative overflow-visible pr-4"
          onMouseEnter={() => setHoveredItem('basicInfo')}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <ClockIcon className="w-5 h-5 text-gray-500 hover:text-hover-pink hover:rotate-12 hover:scale-110 transition-all duration-300 cursor-pointer" />
          <AnimatePresence>
            <HoverMenu 
              items={BASIC_INFO_ITEMS} 
              isVisible={hoveredItem === 'basicInfo'}
              onMouseEnter={() => setHoveredItem('basicInfo')}
              onMouseLeave={() => setHoveredItem(null)}
              onItemClick={(path) => path && onNavigation(path)}
            />
          </AnimatePresence>
        </div>
        
        <div 
          className="relative overflow-visible pr-4"
          onMouseEnter={() => setHoveredItem('personalTasks')}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <ClipboardIcon className="w-5 h-5 text-gray-500 hover:text-hover-pink hover:rotate-12 hover:scale-110 transition-all duration-300 cursor-pointer" />
          <AnimatePresence>
            <HoverMenu 
              items={PERSONAL_TASKS_ITEMS} 
              isVisible={hoveredItem === 'personalTasks'}
              onMouseEnter={() => setHoveredItem('personalTasks')}
              onMouseLeave={() => setHoveredItem(null)}
              onItemClick={(path) => path && onNavigation(path)}
            />
          </AnimatePresence>
        </div>
      </div>
      
      <div className="flex-1"></div>
      
      <div onClick={handleLogout} className="cursor-pointer">
        <LogoutIcon 
          className="w-5 h-5 text-red-500 hover:text-hover-pink hover:rotate-12 hover:scale-110 transition-all duration-300" 
        />
      </div>
    </div>
  );
};

export default CollapsedView;
