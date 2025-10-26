import React from 'react';

interface InputFieldProps {
  type: 'text' | 'password' | 'email';
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  icon: React.ReactNode;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  placeholder,
  value,
  onChange,
  icon,
  className = ''
}) => {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        {icon}
      </div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-3 bg-light-gray border border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 font-yekan placeholder:font-yekan"
      />
    </div>
  );
};

export default InputField;
