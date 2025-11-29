/**
 * Reusable Card Component
 * 
 * Follows SOLID principles with single responsibility
 * Provides consistent card styling and behavior
 */

import React from 'react';
import { motion } from 'framer-motion';
import { CardProps } from '../../lib/types';
import { cn } from '../../lib/utils';
import { useCardAnimation } from '../../hooks/useAnimation';

/**
 * Card Component
 * 
 * A reusable card component with hover effects and animations
 * Handles click events and accessibility
 */
const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = true,
  onClick,
  ...props
}) => {
  const { cardVariants } = useCardAnimation();

  // Base card classes
  const baseClasses = 'bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-300';

  // Hover classes
  const hoverClasses = hover ? 'hover:shadow-2xl cursor-pointer' : '';

  // Combine all classes
  const cardClasses = cn(
    baseClasses,
    hoverClasses,
    className
  );

  // Handle click events
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <motion.div
      className={cardClasses}
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover={hover ? "hover" : undefined}
      whileTap={hover ? "tap" : undefined}
      onClick={handleClick}
      {...props}
    >
      {children}
    </motion.div>
  );
};

/**
 * Card Header Component
 * 
 * Provides consistent header styling for cards
 */
export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = ''
}) => (
  <div className={cn('p-6 pb-4', className)}>
    {children}
  </div>
);

/**
 * Card Content Component
 * 
 * Provides consistent content styling for cards
 */
export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = ''
}) => (
  <div className={cn('p-6 pt-0', className)}>
    {children}
  </div>
);

/**
 * Card Footer Component
 * 
 * Provides consistent footer styling for cards
 */
export const CardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = ''
}) => (
  <div className={cn('p-6 pt-4 border-t border-gray-200 dark:border-gray-700', className)}>
    {children}
  </div>
);

export default Card;
