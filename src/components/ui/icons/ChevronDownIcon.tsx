import React from 'react';

interface ChevronDownIconProps {
  className?: string;
}

const ChevronDownIcon: React.FC<ChevronDownIconProps> = ({ className = 'w-4 h-4' }) => {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <polyline points="6,9 12,15 18,9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

export default ChevronDownIcon;
