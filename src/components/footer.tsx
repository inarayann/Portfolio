'use client'
import { motion } from 'framer-motion';
import { PERSONAL_INFO, SOCIAL_LINKS, QUICK_ACTIONS } from '../lib/constants';
import { useHoverAnimation } from '../hooks/useAnimation';

/**
 * Footer Component
 * 
 * Optimized footer component using centralized data and reusable patterns
 * Follows SOLID principles with single responsibility
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { hoverVariants } = useHoverAnimation();

  const handleContactClick = (type: string, value: string) => {
    if (type === 'email') {
      window.open(`mailto:${value}`, '_self');
    } else if (type === 'phone') {
      window.open(`tel:${value}`, '_self');
    } else if (type === 'location') {
      const encodedLocation = encodeURIComponent(value);
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodedLocation}`, '_blank');
    } else if (type === 'whatsapp') {
      // Extract phone number from the value (remove any non-digit characters except +)
      const phoneNumber = value.replace(/[^\d+]/g, '');
      window.open(`https://wa.me/${phoneNumber}`, '_blank');
    }
  };

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-gradient-primary">
              {PERSONAL_INFO.name}
            </h3>
            <p className="text-gray-300 dark:text-gray-400 mb-4">
              {PERSONAL_INFO.title} specializing in Angular, React, and Next.js. 
              Creating amazing web experiences with modern technologies.
            </p>
            <div className="flex space-x-4">
              {SOCIAL_LINKS.slice(0, 4).map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 dark:bg-gray-700 rounded-full flex items-center justify-center hover:gradient-primary transition-all duration-300"
                  variants={hoverVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <span className="text-lg">{social.icon}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {QUICK_ACTIONS.map((action, index) => (
                <li key={index}>
                  <motion.a
                    href={action.url}
                    className="text-gray-300 dark:text-gray-400 hover:text-cyan-400 dark:hover:text-cyan-300 transition-colors duration-300"
                    variants={hoverVariants}
                    whileHover="hover"
                  >
                    {action.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Get In Touch</h4>
            <div className="space-y-3 text-gray-300 dark:text-gray-400">
              <motion.p 
                className="cursor-pointer hover:text-cyan-400 dark:hover:text-cyan-300 transition-colors duration-300 flex items-center space-x-2"
                onClick={() => handleContactClick('email', PERSONAL_INFO.email)}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <span>📧</span>
                <span>{PERSONAL_INFO.email}</span>
              </motion.p>
              <motion.p 
                className="cursor-pointer hover:text-cyan-400 dark:hover:text-cyan-300 transition-colors duration-300 flex items-center space-x-2"
                onClick={() => handleContactClick('phone', PERSONAL_INFO.phone)}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <span>📱</span>
                <span>{PERSONAL_INFO.phone}</span>
              </motion.p>
              <motion.p 
                className="cursor-pointer hover:text-cyan-400 dark:hover:text-cyan-300 transition-colors duration-300 flex items-center space-x-2"
                onClick={() => handleContactClick('location', PERSONAL_INFO.location)}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <span>📍</span>
                <span>{PERSONAL_INFO.location}</span>
              </motion.p>
              <motion.p 
                className="cursor-pointer hover:text-cyan-400 dark:hover:text-cyan-300 transition-colors duration-300 flex items-center space-x-2"
                onClick={() => handleContactClick('whatsapp', PERSONAL_INFO.phone)}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <span>💬</span>
                <span>WhatsApp: {PERSONAL_INFO.phone}</span>
              </motion.p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 dark:border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 dark:text-gray-500 text-sm mb-4 md:mb-0">
              © {currentYear} {PERSONAL_INFO.name}. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-gray-400 dark:text-gray-500">
              <a href="/privacy" className="hover:text-white dark:hover:text-gray-200 transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="/terms" className="hover:text-white dark:hover:text-gray-200 transition-colors duration-300">
                Terms of Service
              </a>
              <a href="/sitemap" className="hover:text-white dark:hover:text-gray-200 transition-colors duration-300">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
  