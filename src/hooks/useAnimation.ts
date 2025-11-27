/**
 * Custom Animation Hook
 * 
 * Reusable hook for managing animations with Framer Motion
 * Follows DRY principle and provides consistent animation patterns
 */

import { useInView } from 'react-intersection-observer';
import { AnimationConfig } from '../lib/types';

/**
 * Hook for scroll-triggered animations
 * Provides consistent animation configuration for scroll-based animations
 */
export const useScrollAnimation = (threshold: number = 0.1, triggerOnce: boolean = true) => {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce
  });

  return { ref, inView };
};

/**
 * Hook for fade-in animations
 * Provides standardized fade-in animation configuration
 */
export const useFadeIn = (delay: number = 0, duration: number = 0.8) => {
  const { ref, inView } = useScrollAnimation();

  const animationConfig: AnimationConfig = {
    initial: { opacity: 0, y: 30 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
    transition: { duration, delay }
  };

  return { ref, animationConfig };
};

/**
 * Hook for slide-in animations
 * Provides standardized slide-in animation configuration
 */
export const useSlideIn = (direction: 'left' | 'right' | 'up' | 'down' = 'left', delay: number = 0) => {
  const { ref, inView } = useScrollAnimation();

  const getInitialPosition = () => {
    switch (direction) {
      case 'left': return { x: -50 };
      case 'right': return { x: 50 };
      case 'up': return { y: -50 };
      case 'down': return { y: 50 };
      default: return { x: -50 };
    }
  };

  const animationConfig: AnimationConfig = {
    initial: { opacity: 0, ...getInitialPosition() },
    animate: inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...getInitialPosition() },
    transition: { duration: 0.8, delay }
  };

  return { ref, animationConfig };
};

/**
 * Hook for staggered animations
 * Provides animation configuration for staggered element animations
 */
export const useStaggeredAnimation = (staggerDelay: number = 0.1) => {
  const { ref, inView } = useScrollAnimation();

  const getStaggeredConfig = (index: number): AnimationConfig => ({
    initial: { opacity: 0, y: 20 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    transition: { duration: 0.6, delay: index * staggerDelay }
  });

  return { ref, getStaggeredConfig };
};

/**
 * Hook for hover animations
 * Provides standardized hover animation configuration
 */
export const useHoverAnimation = () => {
  const hoverVariants = {
    hover: { 
      scale: 1.05,
      y: -5,
      transition: { duration: 0.2 }
    },
    tap: { 
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  return { hoverVariants };
};

/**
 * Hook for button animations
 * Provides standardized button animation configuration
 */
export const useButtonAnimation = () => {
  const { hoverVariants } = useHoverAnimation();

  const buttonVariants = {
    ...hoverVariants,
    initial: { scale: 1 },
    whileHover: {
      scale: 1.05,
      boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
    },
    whileTap: {
      scale: 0.95
    }
  };

  return { buttonVariants };
};

/**
 * Hook for card animations
 * Provides standardized card animation configuration
 */
export const useCardAnimation = () => {
  const { hoverVariants } = useHoverAnimation();

  const cardVariants = {
    ...hoverVariants,
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return { cardVariants };
};

/**
 * Hook for modal animations
 * Provides standardized modal animation configuration
 */
export const useModalAnimation = () => {
  const backdropVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const modalVariants = {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.9, opacity: 0 }
  };

  return { backdropVariants, modalVariants };
};

/**
 * Hook for loading animations
 * Provides standardized loading animation configuration
 */
export const useLoadingAnimation = () => {
  const loadingVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return { loadingVariants, pulseVariants };
};
