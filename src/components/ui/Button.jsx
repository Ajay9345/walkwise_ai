import React from 'react';
import { cn } from '../../utils/cn';

export const Button = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className,
  children,
  disabled,
  ...props
}) => {
  const baseStyles =
    'relative inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:pointer-events-none disabled:opacity-50';

  const variantStyles = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700',
    secondary:
      'bg-surface-light dark:bg-surface-dark text-text-light-primary dark:text-text-dark-primary hover:bg-gray-200 dark:hover:bg-gray-700',
    outline:
      'border border-border-light dark:border-border-dark bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-text-light-primary dark:text-text-dark-primary',
    danger: 'bg-danger-500 text-white hover:bg-danger-600 active:bg-danger-700',
    warning: 'bg-warning-500 text-white hover:bg-warning-600 active:bg-warning-700',
    ghost:
      'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-text-light-primary dark:text-text-dark-primary',
    link: 'bg-transparent underline-offset-4 hover:underline text-primary-500 hover:text-primary-600 p-0 h-auto',
  };

  const sizeStyles = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-4 py-2 text-sm',
    lg: 'h-12 px-6 py-3 text-base',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], widthStyle, className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-solid border-current border-r-transparent" />
        </div>
      )}
      <span className={cn('flex items-center gap-2', isLoading && 'opacity-0')}>
        {leftIcon && <span className="mr-1">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="ml-1">{rightIcon}</span>}
      </span>
    </button>
  );
};
