import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import LeftSidebar from './sidebar/LeftSidebar';
import RightSidebar from './sidebar/RightSidebar/RightSidebar';

const DashboardLayout: React.FC = () => {
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsRightSidebarOpen(false);
        setIsLeftSidebarOpen(false);
      } else {
        setIsRightSidebarOpen(true);
        setIsLeftSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleRightSidebar = () => {
    if (window.innerWidth < 1024) {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    } else {
      setIsRightSidebarOpen(!isRightSidebarOpen);
    }
  };

  const toggleLeftSidebar = () => {
    setIsLeftSidebarOpen(!isLeftSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden" dir="rtl">
      <RightSidebar 
        isOpen={window.innerWidth >= 1024 ? isRightSidebarOpen : isMobileMenuOpen} 
        onToggle={toggleRightSidebar} 
      />
      {isMobileMenuOpen && window.innerWidth < 1024 && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <Outlet />
      </div>
      <LeftSidebar 
        isOpen={isLeftSidebarOpen && window.innerWidth >= 768} 
        onToggle={toggleLeftSidebar} 
      />
    </div>
  );
};

export default DashboardLayout;
