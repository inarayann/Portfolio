/**
 * Reusable Section Component
 * 
 * Follows SOLID principles with single responsibility
 * Provides consistent section styling and behavior
 */

import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { SectionProps } from '../../lib/types';
import { cn } from '../../lib/utils';
import { useFadeIn } from '../../hooks/useAnimation';

/**
 * Section Component
 * 
 * A reusable section component with consistent styling
 * Handles section layout and animations
 */
const Section = forwardRef<HTMLElement, SectionProps>(({
  children,
  className = '',
  ...props
}, ref) => {
  return (
    <section
      ref={ref}
      className={cn('py-20', className)}
      {...props}
    >
      {children}
    </section>
  );
});

Section.displayName = 'Section';

/**
 * Section Header Component
 * 
 * Provides consistent header styling for sections
 */
interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  className?: string;
  centered?: boolean;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  description,
  className = '',
  centered = true
}) => {
  const { ref, animationConfig } = useFadeIn();

  return (
    <motion.div
      ref={ref}
      className={cn(
        'mb-16',
        centered ? 'text-center' : 'text-left',
        className
      )}
      {...animationConfig}
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-6 animated-gradient-text">
        {title}
        {subtitle && (
          <span className="ml-2">{subtitle}</span>
        )}
      </h2>
      
      <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mb-4"></div>
      
      {description && (
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </motion.div>
  );
};

/**
 * Container Component
 * 
 * Provides consistent container styling
 */
interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  size = 'lg'
}) => {
  const sizeClasses = {
    sm: 'max-w-3xl',
    md: 'max-w-5xl',
    lg: 'max-w-7xl',
    xl: 'max-w-8xl',
    full: 'max-w-full'
  };

  return (
    <div className={cn('mx-auto px-6', sizeClasses[size], className)}>
      {children}
    </div>
  );
};

/**
 * Grid Component
 * 
 * Provides consistent grid layout
 */
interface GridProps {
  children: React.ReactNode;
  className?: string;
  cols?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  responsive?: boolean;
}

export const Grid = forwardRef<HTMLDivElement, GridProps>(({
  children,
  className = '',
  cols = 3,
  gap = 'md',
  responsive = true
}, ref) => {
  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-12'
  };

  const gridClasses = responsive
    ? `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${cols} ${gapClasses[gap]}`
    : `grid grid-cols-${cols} ${gapClasses[gap]}`;

  return (
    <div ref={ref} className={cn(gridClasses, className)}>
      {children}
    </div>
  );
});

Grid.displayName = 'Grid';

export default Section;
