/**
 * Reusable Button Component
 * 
 * Follows SOLID principles with single responsibility
 * Provides consistent button styling and behavior
 */

import React from 'react';
import { motion } from 'framer-motion';
import { ButtonProps } from '../../lib/types';
import { cn } from '../../lib/utils';
import { useButtonAnimation } from '../../hooks/useAnimation';

/**
 * Button Component
 * 
 * A reusable button component with multiple variants and sizes
 * Handles click events, external links, and accessibility
 */
const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button',
  ...props
}) => {
  const { buttonVariants } = useButtonAnimation();

  // Base button classes
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  // Variant classes
  const variantClasses = {
    primary: 'gradient-primary text-white hover:opacity-90 hover:shadow-xl focus:ring-blue-500',
    secondary: 'gradient-secondary text-white hover:opacity-90 hover:shadow-xl focus:ring-cyan-500',
    outline: 'border-2 border-blue-600 text-blue-600 hover:gradient-primary hover:text-white focus:ring-blue-500'
  };

  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  // Combine all classes
  const buttonClasses = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  // Handle click events
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    onClick?.(e);
  };

  // Render as link if href is provided
  if (href) {
    return (
      <motion.a
        href={href}
        className={buttonClasses}
        variants={buttonVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        {...props}
      >
        {children}
      </motion.a>
    );
  }

  // Render as button
  return (
    <motion.button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={buttonClasses}
      variants={buttonVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
