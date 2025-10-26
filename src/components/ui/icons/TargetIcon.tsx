import React from 'react';

interface TargetIconProps {
  className?: string;
}

const TargetIcon: React.FC<TargetIconProps> = ({ className = 'w-6 h-6' }) => {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
      <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="2"/>
      <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="2"/>
    </svg>
  );
};

export default TargetIcon;
