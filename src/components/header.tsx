'use client'
import { useState, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { NAVIGATION_CONFIG } from '../lib/constants';
import { useHoverAnimation } from '../hooks/useAnimation';

/**
 * Header Component
 * 
 * Optimized header component using centralized data and reusable patterns
 * Follows SOLID principles with single responsibility
 * Features glass effect on scroll
 */
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { hoverVariants } = useHoverAnimation();

  useEffect(() => {
    const handleScroll = () => {
      // Apply glass effect when scrolled past 50px
      setIsScrolled(window.scrollY > 50);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header 
      className={`p-4 fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg border-b border-gray-200/50 dark:border-gray-700/50' 
          : 'bg-white dark:bg-gray-900 shadow-md'
      } text-gray-900 dark:text-white`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Brand */}
        <motion.h1 
          className="text-2xl font-bold" 
          variants={hoverVariants}
          whileHover="hover"
        >
          {NAVIGATION_CONFIG.brand}
        </motion.h1>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 items-center">
          {NAVIGATION_CONFIG.items.map((item) => (
            <motion.div 
              key={item.id}
              variants={hoverVariants}
              whileHover="hover"
            >
              <Link 
                href={item.href} 
                className="hover:text-blue-400 dark:hover:text-blue-300 transition-colors duration-300"
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <motion.button 
            onClick={toggleMenu}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.nav 
          className="md:hidden bg-gray-100 dark:bg-gray-800 p-4 flex flex-col space-y-4 transition-colors duration-300" 
          initial={{ opacity: 0, height: 0 }} 
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          {NAVIGATION_CONFIG.items.map((item) => (
            <motion.div 
              key={item.id}
              variants={hoverVariants}
              whileHover="hover"
            >
              <Link 
                href={item.href} 
                className="hover:text-blue-400 dark:hover:text-blue-300 transition-colors duration-300 block py-2" 
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
        </motion.nav>
      )}
    </header>
  );
}