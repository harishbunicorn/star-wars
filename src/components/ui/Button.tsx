import React from 'react';

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  'aria-label'?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    children, 
    onClick, 
    variant = 'primary', 
    size = 'md', 
    disabled = false,
    loading = false,
    type = 'button',
    className = '',
    icon,
    iconPosition = 'left',
    'aria-label': ariaLabel,
    ...props 
  }, ref) => {
    const baseClasses = `
      relative inline-flex items-center justify-center font-medium rounded-xl 
      transition-all duration-200 ease-in-out transform
      focus:outline-none focus:ring-2 focus:ring-offset-2
      dark:focus:ring-offset-slate-900
      disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
      active:scale-95
    `;
    
    const variantClasses = {
      primary: `
        bg-gradient-to-r from-blue-600 to-blue-700 text-white 
        hover:from-blue-700 hover:to-blue-800 hover:shadow-lg hover:shadow-blue-500/25
        focus:ring-blue-500 
        dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700
      `,
      secondary: `
        bg-gray-100 text-gray-900 hover:bg-gray-200 hover:shadow-md
        dark:bg-slate-800 dark:text-gray-100 dark:hover:bg-slate-700
        focus:ring-gray-500 border border-gray-200 dark:border-slate-700
      `,
      outline: `
        border-2 border-blue-600 text-blue-600 hover:bg-blue-50 hover:shadow-md
        dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-950
        focus:ring-blue-500 bg-transparent
      `,
      ghost: `
        text-gray-600 hover:bg-gray-100 hover:text-gray-900
        dark:text-gray-300 dark:hover:bg-slate-800 dark:hover:text-gray-100
        focus:ring-gray-500
      `,
      danger: `
        bg-gradient-to-r from-red-600 to-red-700 text-white 
        hover:from-red-700 hover:to-red-800 hover:shadow-lg hover:shadow-red-500/25
        focus:ring-red-500
      `,
      success: `
        bg-gradient-to-r from-green-600 to-green-700 text-white 
        hover:from-green-700 hover:to-green-800 hover:shadow-lg hover:shadow-green-500/25
        focus:ring-green-500
      `,
    };
    
    const sizeClasses = {
      xs: 'px-2.5 py-1.5 text-xs gap-1',
      sm: 'px-3 py-2 text-sm gap-1.5',
      md: 'px-4 py-2.5 text-sm gap-2',
      lg: 'px-6 py-3 text-base gap-2',
      xl: 'px-8 py-4 text-lg gap-3',
    };
    
    const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
    
    const LoadingSpinner = () => (
      <svg 
        className="animate-spin w-4 h-4" 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24"
      >
        <circle 
          className="opacity-25" 
          cx="12" 
          cy="12" 
          r="10" 
          stroke="currentColor" 
          strokeWidth="4"
        />
        <path 
          className="opacity-75" 
          fill="currentColor" 
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    );
    
    return (
      <button
        ref={ref}
        type={type}
        onClick={onClick}
        disabled={disabled || loading}
        className={combinedClasses}
        aria-label={ariaLabel}
        {...props}
      >
        {loading ? (
          <LoadingSpinner />
        ) : icon && iconPosition === 'left' ? (
          <>
            {icon}
            {children}
          </>
        ) : icon && iconPosition === 'right' ? (
          <>
            {children}
            {icon}
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;