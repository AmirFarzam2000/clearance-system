import React from 'react';

interface ChevronRightIconProps {
  className?: string;
}

const ChevronRightIcon: React.FC<ChevronRightIconProps> = ({ className = 'w-4 h-4' }) => {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <polyline points="9,18 15,12 9,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

export default ChevronRightIcon;
