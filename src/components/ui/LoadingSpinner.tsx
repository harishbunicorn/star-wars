import React from 'react';

export interface LoadingSpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'dots' | 'pulse' | 'orbit' | 'lightsaber';
  className?: string;
  'aria-label'?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  variant = 'default',
  className = '', 
  'aria-label': ariaLabel = 'Loading...' 
}) => {
  const sizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  const SpinnerVariants = {
    default: () => (
      <div
        className={`animate-spin rounded-full border-2 border-gray-200 border-t-blue-500 dark:border-slate-600 dark:border-t-blue-400 ${sizeClasses[size]} ${className}`}
        role="status"
        aria-label={ariaLabel}
      >
        <span className="sr-only">{ariaLabel}</span>
      </div>
    ),

    dots: () => (
      <div className={`flex space-x-1 ${className}`} role="status" aria-label={ariaLabel}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`
              bg-blue-500 dark:bg-blue-400 rounded-full animate-bounce
              ${size === 'xs' ? 'w-1 h-1' : ''}
              ${size === 'sm' ? 'w-1.5 h-1.5' : ''}
              ${size === 'md' ? 'w-2 h-2' : ''}
              ${size === 'lg' ? 'w-3 h-3' : ''}
              ${size === 'xl' ? 'w-4 h-4' : ''}
            `}
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
        <span className="sr-only">{ariaLabel}</span>
      </div>
    ),

    pulse: () => (
      <div
        className={`
          bg-gradient-to-r from-blue-500 to-yellow-500 rounded-full animate-pulse
          ${sizeClasses[size]} ${className}
        `}
        role="status"
        aria-label={ariaLabel}
      >
        <span className="sr-only">{ariaLabel}</span>
      </div>
    ),

    orbit: () => (
      <div className={`relative ${sizeClasses[size]} ${className}`} role="status" aria-label={ariaLabel}>
        <div className="absolute inset-0 rounded-full border border-gray-200 dark:border-slate-600" />
        <div className="absolute inset-0 rounded-full border-t-2 border-blue-500 dark:border-t-blue-400 animate-spin" />
        <div className="absolute inset-2 rounded-full border-t-2 border-yellow-500 dark:border-t-yellow-400 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
        <span className="sr-only">{ariaLabel}</span>
      </div>
    ),

    lightsaber: () => (
      <div className={`flex items-center space-x-1 ${className}`} role="status" aria-label={ariaLabel}>
        <div className={`
          bg-gradient-to-r from-blue-500 to-blue-300 rounded-full animate-pulse
          ${size === 'xs' ? 'w-4 h-1' : ''}
          ${size === 'sm' ? 'w-6 h-1.5' : ''}
          ${size === 'md' ? 'w-8 h-2' : ''}
          ${size === 'lg' ? 'w-12 h-3' : ''}
          ${size === 'xl' ? 'w-16 h-4' : ''}
        `} />
        <div className={`
          bg-gray-600 dark:bg-gray-400 rounded
          ${size === 'xs' ? 'w-1 h-2' : ''}
          ${size === 'sm' ? 'w-1.5 h-3' : ''}
          ${size === 'md' ? 'w-2 h-4' : ''}
          ${size === 'lg' ? 'w-3 h-6' : ''}
          ${size === 'xl' ? 'w-4 h-8' : ''}
        `} />
        <span className="sr-only">{ariaLabel}</span>
      </div>
    ),
  };

  return SpinnerVariants[variant]();
};

export default LoadingSpinner;