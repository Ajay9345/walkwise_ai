import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * A utility function that combines clsx and tailwind-merge for efficient 
 * conditional className handling with proper Tailwind CSS class merging
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
