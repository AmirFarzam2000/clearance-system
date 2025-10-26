import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ExpandedView from './ExpandedView';
import CollapsedView from './CollapsedView';
import type { ExpandedItems } from './types';

interface RightSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const RightSidebar: React.FC<RightSidebarProps> = ({ isOpen, onToggle }) => {
  const navigate = useNavigate();
  const [expandedItems, setExpandedItems] = useState<ExpandedItems>({
    basicInfo: true,
    systemAffairs: false
  });
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleNavigation = (path: string) => {
    console.log('Navigating to:', path);
    navigate(path);
    setHoveredItem(null);
  };

  const toggleExpanded = (itemKey: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemKey]: !prev[itemKey]
    }));
  };

  return (
    <motion.div 
      className="bg-white h-screen flex flex-col shadow-sm overflow-visible z-50 fixed lg:relative" 
      dir="rtl"
      initial={{ width: 260 }}
      animate={{ width: isOpen ? 260 : 60 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
          >
            <ExpandedView
              onToggle={onToggle}
              expandedItems={expandedItems}
              onToggleExpanded={toggleExpanded}
              onNavigation={handleNavigation}
            />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <CollapsedView
              onToggle={onToggle}
              hoveredItem={hoveredItem}
              setHoveredItem={setHoveredItem}
              onNavigation={handleNavigation}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default RightSidebar;
