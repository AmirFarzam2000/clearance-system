import React from 'react';

interface FolderIconProps {
  className?: string;
}

const FolderIcon: React.FC<FolderIconProps> = ({ className = "w-4 h-4" }) => {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
    </svg>
  );
};

export default FolderIcon;
