'use client'
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * TypingText Component
 * 
 * Displays animated typing text that cycles through different skills.
 * Shows "I'm a [skill] developer" with typing and deleting animations.
 * 
 * @param {string[]} skills - Array of skills to cycle through
 * @param {number} typingSpeed - Speed of typing (milliseconds per character)
 * @param {number} deletingSpeed - Speed of deleting (milliseconds per character)
 * @param {number} pauseDuration - Duration to pause before deleting (milliseconds)
 * @param {string} className - Additional CSS classes
 * @returns {JSX.Element} The typing text component
 */

interface TypingTextProps {
  skills: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
}

export default function TypingText({
  skills,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000,
  className = '',
}: TypingTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (skills.length === 0) return;

    const currentSkill = skills[currentSkillIndex];
    const fullText = `I'm a ${currentSkill} developer`;

    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseDuration);

      return () => clearTimeout(pauseTimer);
    }

    if (isDeleting) {
      // Deleting text
      if (displayText.length > 0) {
        const timer = setTimeout(() => {
          setDisplayText((prev) => prev.slice(0, -1));
        }, deletingSpeed);

        return () => clearTimeout(timer);
      } else {
        // Finished deleting, move to next skill
        setIsDeleting(false);
        setCurrentSkillIndex((prev) => (prev + 1) % skills.length);
      }
    } else {
      // Typing text
      if (displayText.length < fullText.length) {
        const timer = setTimeout(() => {
          setDisplayText((prev) => fullText.slice(0, prev.length + 1));
        }, typingSpeed);

        return () => clearTimeout(timer);
      } else {
        // Finished typing, pause before deleting
        setIsPaused(true);
      }
    }
  }, [displayText, currentSkillIndex, isDeleting, isPaused, skills, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <motion.div
      className={`inline-flex items-center ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.8 }}
    >
      <motion.span
        className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent drop-shadow-lg"
        style={{
          textShadow: '0 0 30px rgba(59, 130, 246, 0.5), 0 0 60px rgba(147, 51, 234, 0.3)',
          filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.4))',
        }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {displayText}
        <motion.span
          className="inline-block w-1 h-6 md:h-8 lg:h-10 xl:h-12 bg-gradient-to-b from-cyan-400 to-purple-500 ml-2 align-middle rounded-sm"
          animate={{ 
            opacity: [1, 0, 1],
            boxShadow: [
              '0 0 10px rgba(59, 130, 246, 0.8)',
              '0 0 20px rgba(147, 51, 234, 0.8)',
              '0 0 10px rgba(59, 130, 246, 0.8)',
            ],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.span>
    </motion.div>
  );
}

