import React from 'react';

type CheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
};

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  className = '',
  size = 'md',
}) => {
  const handleChange = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8',
  };

  const baseClasses = 'rounded-full border-2 flex-shrink-0 transition-colors duration-200';
  const checkedClasses = checked
    ? 'bg-success-500 border-success-500'
    : 'border-primary-500 bg-white';
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  
  const checkboxClasses = `${baseClasses} ${checkedClasses} ${sizeClasses[size]} ${disabledClasses} ${className}`;
  
  return (
    <div className="flex items-center">
      <div
        className={checkboxClasses}
        onClick={handleChange}
        role="checkbox"
        aria-checked={checked}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if ((e.key === ' ' || e.key === 'Enter') && !disabled) {
            e.preventDefault();
            onChange(!checked);
          }
        }}
      >
        {checked && (
          <svg
            className="w-full h-full text-white p-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </div>
      {label && (
        <label
          className={`ml-2 ${disabled ? 'opacity-50' : ''} select-none`}
          onClick={handleChange}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default Checkbox;