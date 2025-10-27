import React from 'react';
import HomeIcon from '../../../ui/icons/HomeIcon';
import SettingsIcon from '../../../ui/icons/SettingsIcon';
import ClockIcon from '../../../ui/icons/ClockIcon';
import ClipboardIcon from '../../../ui/icons/ClipboardIcon';
import LogoutIcon from '../../../ui/icons/LogoutIcon';
import MenuSection from './MenuSection';
import SidebarHeader from './SidebarHeader';
import UserProfile from './UserProfile';
import { BASIC_INFO_ITEMS, SYSTEM_AFFAIRS_ITEMS } from '../../../../utils/constants';
import { authApi } from '../../../../api/auth.api';
import type { ExpandedItems } from '../../../../types/types';

interface ExpandedViewProps {
  onToggle: () => void;
  expandedItems: ExpandedItems;
  onToggleExpanded: (key: string) => void;
  onNavigation: (path: string) => void;
}

const ExpandedView: React.FC<ExpandedViewProps> = ({
  onToggle,
  expandedItems,
  onToggleExpanded,
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
    <div className="w-[260px]">
      <SidebarHeader onToggle={onToggle} />
      <UserProfile />

      <div className="flex-1 px-4 py-4 overflow-y-auto overflow-x-visible">
        <button 
          onClick={() => onNavigation('/dashboard')}
          className="w-full flex items-center gap-3 px-3 py-3 bg-pink-100 text-pink-700 rounded-lg mb-3 hover:bg-pink-200 transition-all duration-200 group"
        >
          <HomeIcon className="w-5 h-5 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110 group-hover:text-hover-pink" />
          <span className="font-yekan-medium group-hover:text-hover-pink transition-colors duration-200">داشبورد</span>
        </button>

        <MenuSection
          label="امور سامانه"
          icon={<SettingsIcon className="w-5 h-5 text-gray-500 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110 group-hover:text-hover-pink" />}
          items={SYSTEM_AFFAIRS_ITEMS}
          isExpanded={expandedItems.systemAffairs}
          onToggle={() => onToggleExpanded('systemAffairs')}
        />

        <MenuSection
          label="اطلاعات پایه"
          icon={<ClockIcon className="w-5 h-5 text-gray-500 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110 group-hover:text-hover-pink" />}
          items={BASIC_INFO_ITEMS}
          isExpanded={expandedItems.basicInfo}
          onToggle={() => onToggleExpanded('basicInfo')}
        />

        <div className="mb-3">
          <button className="w-full flex items-center gap-3 px-3 py-3 hover:bg-gray-50 rounded-lg transition-all duration-200 group">
            <ClipboardIcon className="w-5 h-5 text-gray-500 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110 group-hover:text-hover-pink" />
            <span className="text-gray-700 font-yekan-medium group-hover:text-hover-pink transition-colors duration-200">کارهای شخصی</span>
          </button>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-3 hover:bg-red-50 rounded-lg transition-all duration-200 group text-red-600"
        >
          <LogoutIcon className="w-5 h-5 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110 group-hover:text-hover-pink" />
          <span className="font-yekan-medium group-hover:text-hover-pink transition-colors duration-200">خروج</span>
        </button>
      </div>
    </div>
  );
};

export default ExpandedView;
