import React from 'react';

interface BellIconProps {
  className?: string;
}

const BellIcon: React.FC<BellIconProps> = ({ className = 'w-6 h-6' }) => {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="18" cy="6" r="2" fill="currentColor"/>
    </svg>
  );
};

export default BellIcon;
