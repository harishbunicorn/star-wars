'use client';

import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';

export interface ThemeToggleProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  size = 'md', 
  className = '' 
}) => {
  let theme = 'dark';
  let toggleTheme = () => {};
  
  try {
    const themeContext = useTheme();
    theme = themeContext.theme;
    toggleTheme = themeContext.toggleTheme;
  } catch {
    // Fallback for SSR or when context is not available
    console.warn('ThemeToggle: Theme context not available, using fallback');
  }

  const sizeClasses = {
    sm: 'w-10 h-6',
    md: 'w-12 h-7',
    lg: 'w-14 h-8',
  };

  const thumbSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative inline-flex items-center rounded-full p-1 transition-all duration-300 ease-in-out
        ${theme === 'dark' 
          ? 'bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg shadow-purple-500/25' 
          : 'bg-gradient-to-r from-yellow-400 to-orange-500 shadow-lg shadow-orange-500/25'
        }
        ${sizeClasses[size]}
        hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        dark:focus:ring-offset-slate-900
        ${className}
      `}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
    >
      <div
        className={`
          relative flex items-center justify-center rounded-full transition-all duration-300 ease-in-out
          ${thumbSizeClasses[size]}
          ${theme === 'dark' 
            ? 'translate-x-full bg-slate-800 shadow-lg' 
            : 'translate-x-0 bg-white shadow-lg'
          }
        `}
      >
        {theme === 'dark' ? (
          <svg
            className="w-3 h-3 text-blue-300"
            style={{ width: '0.75rem', height: '0.75rem', flexShrink: 0 }}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            className="w-3 h-3 text-yellow-500"
            style={{ width: '0.75rem', height: '0.75rem', flexShrink: 0 }}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
      
      {/* Decorative stars for dark mode */}
      {theme === 'dark' && (
        <div className="absolute inset-0 overflow-hidden rounded-full">
          <div className="absolute top-1 left-1 w-0.5 h-0.5 bg-white rounded-full animate-pulse" />
          <div className="absolute top-2 right-2 w-0.5 h-0.5 bg-white rounded-full animate-pulse delay-500" />
          <div className="absolute bottom-1 left-3 w-0.5 h-0.5 bg-white rounded-full animate-pulse delay-1000" />
        </div>
      )}
    </button>
  );
};

export default ThemeToggle;