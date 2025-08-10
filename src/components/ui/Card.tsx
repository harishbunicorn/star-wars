import React from 'react';

export interface CardProps {
  children?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'outlined' | 'elevated' | 'gradient';
  hover?: boolean;
  onClick?: () => void;
  loading?: boolean;
  style?: React.CSSProperties;
  'aria-label'?: string;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  variant = 'default',
  hover = false, 
  onClick,
  loading = false,
  style,
  'aria-label': ariaLabel 
}) => {
  const baseClasses = `
    rounded-xl transition-all duration-300 ease-in-out
    ${loading ? 'animate-pulse' : ''}
  `;
  
  const variantClasses = {
    default: `
      bg-white dark:bg-slate-800 
      border border-gray-200 dark:border-slate-700
      shadow-sm
    `,
    glass: `
      bg-white/80 dark:bg-slate-900/80 
      backdrop-blur-md border border-white/20 dark:border-slate-700/30
      shadow-lg
    `,
    outlined: `
      bg-transparent border-2 border-gray-200 dark:border-slate-700
      hover:border-blue-300 dark:hover:border-blue-600
    `,
    elevated: `
      bg-white dark:bg-slate-800 
      border border-gray-200 dark:border-slate-700
      shadow-lg shadow-gray-500/10 dark:shadow-slate-900/20
    `,
    gradient: `
      bg-gradient-to-br from-white to-gray-50 
      dark:from-slate-800 dark:to-slate-900
      border border-gray-200 dark:border-slate-700
      shadow-md
    `,
  };

  const hoverClasses = hover ? `
    hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1
    hover:border-blue-300 dark:hover:border-blue-600
    cursor-pointer transform-gpu
  ` : '';

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${className}`;

  const CardContent = () => (
    <>
      {loading ? (
        <div className="p-6 space-y-4">
          <div className="loading-skeleton h-4 w-3/4" />
          <div className="loading-skeleton h-4 w-1/2" />
          <div className="loading-skeleton h-20 w-full" />
        </div>
      ) : (
        <div className="p-4 md:p-6">
          {children}
        </div>
      )}
    </>
  );

  if (onClick) {
    return (
      <div
        className={combinedClasses}
        style={style}
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
          }
        }}
        aria-label={ariaLabel}
      >
        <CardContent />
      </div>
    );
  }

  return (
    <div className={combinedClasses} style={style} aria-label={ariaLabel}>
      <CardContent />
    </div>
  );
};

export default Card;