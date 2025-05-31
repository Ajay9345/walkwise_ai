import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export const Input = forwardRef(
  ({ className, label, error, leftIcon, rightIcon, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={props.id}
            className="block text-sm font-medium mb-2 text-text-light-primary dark:text-text-dark-primary"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-text-light-secondary dark:text-text-dark-secondary">
              {leftIcon}
            </div>
          )}
          <input
            className={cn(
              "w-full rounded-md border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark px-4 py-2 text-text-light-primary dark:text-text-dark-primary outline-none transition-colors",
              "focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20",
              "disabled:cursor-not-allowed disabled:opacity-50",
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              error && "border-danger-500 focus:border-danger-500 focus:ring-danger-500/20",
              className
            )}
            ref={ref}
            {...props}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-text-light-secondary dark:text-text-dark-secondary">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p className="mt-1.5 text-sm text-danger-500">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
