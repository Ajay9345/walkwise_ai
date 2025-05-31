import React from 'react';
import { cn } from '../../utils/cn';

export const Card = ({ className, children, ...props }) => {
  return (
    <div
      className={cn(
        "rounded-lg border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark p-6 shadow-elevation-1",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ className, children, ...props }) => {
  return (
    <div
      className={cn("mb-4 flex flex-col space-y-1.5", className)}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardTitle = ({ className, children, ...props }) => {
  return (
    <h3
      className={cn(
        "text-lg font-semibold leading-none tracking-tight text-text-light-primary dark:text-text-dark-primary",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
};

export const CardDescription = ({ className, children, ...props }) => {
  return (
    <p
      className={cn(
        "text-sm text-text-light-secondary dark:text-text-dark-secondary",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
};

export const CardContent = ({ className, children, ...props }) => {
  return (
    <div className={cn("pt-0", className)} {...props}>
      {children}
    </div>
  );
};

export const CardFooter = ({ className, children, ...props }) => {
  return (
    <div
      className={cn("flex items-center pt-4", className)}
      {...props}
    >
      {children}
    </div>
  );
};
