import React from 'react';

interface ChevronLeftIconProps {
  className?: string;
}

const ChevronLeftIcon: React.FC<ChevronLeftIconProps> = ({ className = 'w-4 h-4' }) => {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <polyline points="15,18 9,12 15,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

export default ChevronLeftIcon;
