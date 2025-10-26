import React from 'react';

interface GridIconProps {
  className?: string;
}

const GridIcon: React.FC<GridIconProps> = ({ className = '' }) => {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="3" y="3" width="6" height="6" fill="currentColor"/>
      <rect x="13" y="3" width="6" height="6" fill="currentColor"/>
      <rect x="3" y="13" width="6" height="6" fill="currentColor"/>
      <rect x="13" y="13" width="6" height="6" fill="currentColor"/>
    </svg>
  );
};

export default GridIcon;
