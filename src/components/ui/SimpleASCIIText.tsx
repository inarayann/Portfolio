/**
 * Simple ASCII Text Component
 * 
 * A lighter version of the ASCII text animation
 * Uses CSS animations instead of Three.js for better performance
 */

'use client'
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface SimpleASCIITextProps {
  text: string;
  className?: string;
  fontSize?: number;
  color?: string;
  animationSpeed?: number;
}

export default function SimpleASCIIText({
  text,
  className = '',
  fontSize = 48,
  color = '#3B82F6',
  animationSpeed = 2
}: SimpleASCIITextProps) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const asciiChars = ' .\'`^",:;Il!i~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$';

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 100 / animationSpeed);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, text, animationSpeed]);

  return (
    <motion.div
      className={`font-mono ${className}`}
      style={{
        fontSize: `${fontSize}px`,
        color: color,
        lineHeight: 1,
        letterSpacing: '0.1em'
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        className="relative"
        animate={{
          textShadow: [
            '0 0 10px rgba(59, 130, 246, 0.5)',
            '0 0 20px rgba(59, 130, 246, 0.8)',
            '0 0 10px rgba(59, 130, 246, 0.5)'
          ]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {displayText}
        <motion.span
          className="inline-block w-2 h-8 bg-current ml-1"
          animate={{ opacity: [1, 0, 1] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </motion.div>
  );
}
