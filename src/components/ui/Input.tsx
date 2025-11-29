/**
 * Reusable Input Component
 * 
 * Follows SOLID principles with single responsibility
 * Provides consistent input styling and validation
 */

import React, { useId } from 'react';
import { cn } from '../../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  variant?: 'default' | 'filled' | 'outlined';
}

/**
 * Input Component
 * 
 * A reusable input component with validation and styling
 * Handles form inputs with consistent behavior
 */
const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  required = false,
  variant = 'default',
  className = '',
  id,
  ...props
}) => {
  // Use React's useId hook for SSR-safe ID generation
  const generatedId = useId();
  const inputId = id || generatedId;

  // Base input classes
  const baseClasses = 'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 dark:bg-gray-700 dark:text-white';

  // Variant classes
  const variantClasses = {
    default: 'border-gray-300 dark:border-gray-600',
    filled: 'bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700',
    outlined: 'border-2 border-gray-300 dark:border-gray-600 bg-transparent'
  };

  // Error classes
  const errorClasses = error ? 'border-red-500 focus:ring-red-500' : '';

  // Combine all classes
  const inputClasses = cn(
    baseClasses,
    variantClasses[variant],
    errorClasses,
    className
  );

  return (
    <div className="space-y-2">
      {/* Label */}
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Input */}
      <input
        id={inputId}
        className={inputClasses}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
        {...props}
      />

      {/* Error Message */}
      {error && (
        <p
          id={`${inputId}-error`}
          className="text-sm text-red-600 dark:text-red-400"
          role="alert"
        >
          {error}
        </p>
      )}

      {/* Helper Text */}
      {helperText && !error && (
        <p
          id={`${inputId}-helper`}
          className="text-sm text-gray-500 dark:text-gray-400"
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

/**
 * Textarea Component
 * 
 * A reusable textarea component with validation and styling
 */
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  variant?: 'default' | 'filled' | 'outlined';
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  helperText,
  required = false,
  variant = 'default',
  className = '',
  id,
  ...props
}) => {
  // Use React's useId hook for SSR-safe ID generation
  const generatedId = useId();
  const textareaId = id || generatedId;

  // Base textarea classes
  const baseClasses = 'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 dark:bg-gray-700 dark:text-white resize-none';

  // Variant classes
  const variantClasses = {
    default: 'border-gray-300 dark:border-gray-600',
    filled: 'bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700',
    outlined: 'border-2 border-gray-300 dark:border-gray-600 bg-transparent'
  };

  // Error classes
  const errorClasses = error ? 'border-red-500 focus:ring-red-500' : '';

  // Combine all classes
  const textareaClasses = cn(
    baseClasses,
    variantClasses[variant],
    errorClasses,
    className
  );

  return (
    <div className="space-y-2">
      {/* Label */}
      {label && (
        <label
          htmlFor={textareaId}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Textarea */}
      <textarea
        id={textareaId}
        className={textareaClasses}
        aria-invalid={!!error}
        aria-describedby={error ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined}
        {...props}
      />

      {/* Error Message */}
      {error && (
        <p
          id={`${textareaId}-error`}
          className="text-sm text-red-600 dark:text-red-400"
          role="alert"
        >
          {error}
        </p>
      )}

      {/* Helper Text */}
      {helperText && !error && (
        <p
          id={`${textareaId}-helper`}
          className="text-sm text-gray-500 dark:text-gray-400"
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

export default Input;
