import React, { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;
  className?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  value,
  onChange,
  options,
  placeholder,
  required = false,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(option => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-yekan-medium text-gray-700 text-right">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative" ref={selectRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-yekan text-sm bg-white text-right"
          dir="rtl"
        >
          {selectedOption ? selectedOption.label : placeholder}
        </button>
        
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <ChevronDownIcon 
            className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          />
        </div>

        {isOpen && (
          <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
            {placeholder && (
              <button
                type="button"
                onClick={() => handleOptionClick('')}
                className="w-full px-3 py-2 text-right text-gray-500 hover:bg-gray-50 font-yekan text-sm first:rounded-t-lg"
                dir="rtl"
              >
                {placeholder}
              </button>
            )}
            {options.map((option, index) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleOptionClick(option.value)}
                className={`w-full px-3 py-2 text-right hover:bg-gray-50 font-yekan text-sm ${
                  value === option.value ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                } ${index === options.length - 1 ? 'rounded-b-lg' : ''}`}
                dir="rtl"
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomSelect;
