import React from 'react';
import { motion } from 'framer-motion';
import GridIcon from '../../ui/icons/GridIcon';
import BellIcon from '../../ui/icons/BellIcon';
import FlagIcon from '../../ui/icons/FlagIcon';
import CalendarIcon from '../../ui/icons/CalendarIcon';
import SettingsIcon from '../../ui/icons/SettingsIcon';
import PowerIcon from '../../ui/icons/PowerIcon';

interface LeftSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({ isOpen }) => {
  return (
    <motion.div 
      className="bg-white h-screen flex flex-col items-center py-6 space-y-6 shadow-sm"
      initial={{ width: 64 }}
      animate={{ width: isOpen ? 64 : 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{ overflow: 'hidden' }}
    >
      <div className="w-10 h-10 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <GridIcon className="w-6 h-6 text-gray-600" />
        </motion.div>
      </div>
      
      <div className="w-10 h-10 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
        >
          <BellIcon className="w-6 h-6 text-gray-600" />
        </motion.div>
      </div>
      
      <div className="w-10 h-10 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "linear" }}
        >
          <FlagIcon className="w-6 h-6 text-gray-600" />
        </motion.div>
      </div>
      
      <div className="w-10 h-10 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
        >
          <CalendarIcon className="w-6 h-6 text-gray-600" />
        </motion.div>
      </div>
      
      <div className="w-10 h-10 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2.7, repeat: Infinity, ease: "linear" }}
        >
          <SettingsIcon className="w-6 h-6 text-gray-600" />
        </motion.div>
      </div>
      
      <div className="flex-1"></div>
      
      <div className="w-10 h-10 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
        >
          <PowerIcon className="w-6 h-6 text-gray-600" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LeftSidebar;
