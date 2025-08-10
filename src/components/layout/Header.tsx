'use client';

import React from 'react';
import ThemeToggle from '@/components/ui/ThemeToggle';

export interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  onBack?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  title = 'Star Wars Movies',
  showBackButton = false,
  onBack 
}) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            {showBackButton && (
              <button
                onClick={onBack}
                className="
                  inline-flex items-center justify-center w-10 h-10 
                  rounded-xl bg-gray-100 dark:bg-slate-800 
                  text-gray-600 dark:text-gray-300
                  hover:bg-gray-200 dark:hover:bg-slate-700
                  transition-all duration-200 ease-in-out
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                "
                aria-label="Go back"
              >
                <svg 
                  className="w-5 h-5" 
                  style={{ width: '1.25rem', height: '1.25rem', flexShrink: 0 }}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-yellow-500 rounded-lg flex items-center justify-center">
                <svg 
                  className="w-5 h-5 text-white" 
                  style={{ width: '1.25rem', height: '1.25rem', flexShrink: 0 }}
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" />
                </svg>
              </div>
              
              <div>
                <h1 className="text-xl font-sans font-bold text-gray-900 dark:text-gray-50">
                  {title}
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Explore the galaxy far, far away
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <span>May the Force be with you</span>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;