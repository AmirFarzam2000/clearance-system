import React from 'react';

interface FlagIconProps {
  className?: string;
}

const FlagIcon: React.FC<FlagIconProps> = ({ className = '' }) => {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M3 3h2v18H3V3zm4 0h14l-2 6 2 6H7V3z"/>
      <circle cx="19" cy="5" r="1.5" fill="currentColor"/>
    </svg>
  );
};

export default FlagIcon;
