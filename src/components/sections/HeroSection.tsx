'use client'
import { motion } from 'framer-motion';
import { useState } from 'react';
import { PERSONAL_INFO, SOCIAL_LINKS } from '../../lib/constants';
import { scrollToElement } from '../../lib/utils';
import { useFadeIn } from '../../hooks/useAnimation';
import Button from '../ui/Button';
import ScrambledText from '../ui/ScrambledText';
import RandomSkillsFloating from '../ui/RandomSkillsFloating';
import TypingText from '../ui/TypingText';
import { FiDownload, FiMail, FiMapPin } from 'react-icons/fi';

/**
 * Hero Section Component
 * 
 * Centered hero section with animated text similar to reference design
 */
export default function HeroSection() {
  const { ref, animationConfig } = useFadeIn();

  const scrollToNext = () => {
    scrollToElement('contact', 80);
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = PERSONAL_INFO.phone.replace(/[^\d+]/g, '');
    const message = encodeURIComponent('Hello! I would like to get in touch with you.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const downloadCV = async () => {
    if (isGeneratingPDF) return; // Prevent multiple clicks
    
    setIsGeneratingPDF(true);
    try {
      // Import dynamically to avoid SSR issues
      const { generatePDF } = await import('../../lib/pdfGenerator');
      await generatePDF();
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again or contact me directly.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleEmailClick = () => {
    window.open(`mailto:${PERSONAL_INFO.email}`, '_self');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 px-6 bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900">
      {/* Random floating skills */}
      <RandomSkillsFloating />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-4 md:left-20 w-48 h-48 md:w-72 md:h-72 bg-blue-400 dark:bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 dark:opacity-10 animate-blob"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute top-40 right-4 md:right-20 w-48 h-48 md:w-72 md:h-72 bg-purple-400 dark:bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 dark:opacity-10 animate-blob"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-48 h-48 md:w-72 md:h-72 bg-pink-400 dark:bg-pink-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 dark:opacity-10 animate-blob"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Main content - Centered */}
      <div ref={ref} className="relative z-30 text-center max-w-4xl mx-auto px-4">
        {/* Greeting Text */}
        <motion.p
          className="text-lg md:text-xl text-purple-400 dark:text-purple-300 mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          👋Hello, I'm
        </motion.p>

        {/* Animated Name */}
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <ScrambledText 
            className="text-white dark:text-white font-bold"
            style={{ 
              maxWidth: '100%',
              fontSize: 'clamp(2.5rem, 8vw, 6rem)',
            }}
          >
            {PERSONAL_INFO.name}
          </ScrambledText>
        </motion.div>

        {/* Typing Text Animation */}
        <div className="mb-6 min-h-[3rem] md:min-h-[4rem] flex items-center justify-center">
          <TypingText
            skills={[
              'React.js',
              'Next.js',
              'AngularJs',
              'Node.js',
              'Web3',
              'TypeScript',
              'Javascript',
              'Full-Stack',
              'Frontend',
            ]}
            typingSpeed={80}
            deletingSpeed={40}
            pauseDuration={2000}
            className="text-center"
          />
        </div>

        {/* Separator Line */}
        <motion.div
          className="w-16 h-1 bg-white dark:bg-white mx-auto mb-6"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        />

        {/* Contact Information */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mb-8 text-white dark:text-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <div className="flex items-center gap-2">
            <FiMapPin className="w-5 h-5" />
            <span className="text-sm md:text-base">{PERSONAL_INFO.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <FiMail className="w-5 h-5" />
            <span className="text-sm md:text-base">{PERSONAL_INFO.email}</span>
          </div>
        </motion.div>

        {/* WhatsApp Button */}
        <motion.button
          onClick={handleWhatsAppClick}
          className="mb-8 px-6 py-3 bg-[#25D366] text-white rounded-lg font-semibold flex items-center gap-2 mx-auto hover:bg-[#20BA5A] transition-colors duration-300 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
          Contact on WhatsApp
        </motion.button>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <Button
            onClick={scrollToNext}
            variant="primary"
            size="lg"
            className="px-8 py-4 rounded-lg text-base font-semibold shadow-lg"
          >
            Get In Touch
          </Button>
          
          <Button
            onClick={downloadCV}
            variant="outline"
            size="lg"
            className="px-8 py-4 rounded-lg text-base font-semibold border-2 border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-400 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isGeneratingPDF}
          >
            <FiDownload className="w-5 h-5 mr-2" />
            {isGeneratingPDF ? 'Generating PDF...' : 'Download CV'}
          </Button>
        </motion.div>

        {/* Social Media Icons */}
        <motion.div
          className="flex items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          {SOCIAL_LINKS.slice(0, 2).map((social, index) => (
            <motion.a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 dark:hover:bg-gray-700/50 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-xl">{social.icon}</span>
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white dark:border-gray-400 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-white dark:bg-gray-400 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
