import React, { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface SelectOption {
  value: string;
  label: string;
  code?: string;
}

interface SelectListProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

const SelectList: React.FC<SelectListProps> = ({
  options,
  value,
  onChange,
  placeholder = "انتخاب کنید",
  disabled = false,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(opt => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (option: SelectOption) => {
    onChange(option.value);
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (isOpen && highlightedIndex >= 0) {
          handleSelect(options[highlightedIndex]);
        } else {
          setIsOpen(true);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setHighlightedIndex(prev => 
            prev < options.length - 1 ? prev + 1 : prev
          );
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (isOpen) {
          setHighlightedIndex(prev => prev > 0 ? prev - 1 : prev);
        }
        break;
    }
  };

  useEffect(() => {
    if (isOpen && highlightedIndex >= 0 && listRef.current) {
      const item = listRef.current.children[highlightedIndex] as HTMLElement;
      if (item) {
        item.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [highlightedIndex, isOpen]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={disabled ? -1 : 0}
        className={`
          w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg 
          bg-white text-right cursor-pointer font-yekan text-sm
          transition-all duration-200
          ${disabled 
            ? 'opacity-50 cursor-not-allowed' 
            : 'hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          }
        `}
      >
        <div className={`block ${!selectedOption ? 'text-gray-400' : 'text-gray-900'}`} style={{ direction: 'rtl' }}>
          {selectedOption ? (
            selectedOption.code ? (
              <span className="flex items-center gap-2">
                <span className="text-gray-500 font-yekan-light text-left">({selectedOption.code})</span>
                <span className="text-right flex-1">{selectedOption.label}</span>
              </span>
            ) : (
              selectedOption.label
            )
          ) : (
            placeholder
          )}
        </div>
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <ChevronDownIcon 
            className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          />
        </div>
      </div>

      {isOpen && (
        <div
          ref={listRef}
          className={`
            absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg
            max-h-60 overflow-auto
            animate-in fade-in slide-in-from-top-2 duration-200
          `}
          style={{ direction: 'rtl' }}
        >
          {options.length === 0 ? (
            <div className="px-4 py-3 text-sm text-gray-500 text-center font-yekan">
              موردی یافت نشد
            </div>
          ) : (
            options.map((option, index) => {
              const isSelected = option.value === value;
              const isHighlighted = index === highlightedIndex;
              
              return (
                <div
                  key={option.value}
                  onClick={() => handleSelect(option)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  className={`
                    px-4 py-2.5 text-sm font-yekan cursor-pointer
                    transition-colors duration-100
                    ${
                      isSelected
                        ? 'bg-blue-50 text-blue-700'
                        : isHighlighted
                        ? 'bg-gray-50 text-gray-900'
                        : 'text-gray-700 hover:bg-gray-50'
                    }
                  `}
                  style={{
                    backgroundColor: isSelected ? '#EFF6FF' : 
                                   isHighlighted ? '#F9FAFB' : 
                                   'transparent'
                  }}
                >
                  {option.code ? (
                    <div className="flex items-start gap-2">
                      <span className="text-gray-500 font-yekan-light">({option.code})</span>
                      <span className={isSelected ? 'font-yekan-medium' : 'font-yekan'}>{option.label}</span>
                    </div>
                  ) : (
                    <span className={isSelected ? 'font-yekan-medium' : 'font-yekan'}>{option.label}</span>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default SelectList;
