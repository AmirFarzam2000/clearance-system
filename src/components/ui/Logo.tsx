import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
    <img src="/Image/logo.svg" alt="Logo" className='w-[25px] h-[25px]' />
    </div>
  );
};

export default Logo;
