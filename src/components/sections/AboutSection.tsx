'use client'
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import { PERSONAL_INFO, TIMELINE_ITEMS } from '../../lib/constants';
import { useScrollAnimation, useStaggeredAnimation } from '../../hooks/useAnimation';
import Section, { SectionHeader, Container, Grid } from '../ui/Section';
import Card from '../ui/Card';

/**
 * About Section Component
 * 
 * Optimized about section using centralized data and reusable components
 * Follows SOLID principles with single responsibility
 */
export default function AboutSection() {
  const { ref, inView } = useScrollAnimation();
  const { ref: statsRef, getStaggeredConfig } = useStaggeredAnimation();
  const [isHovered, setIsHovered] = useState(false);

  const stats = [
    { label: 'Experience', value: PERSONAL_INFO.experience },
    { label: 'Projects', value: PERSONAL_INFO.projects },
    { label: 'Clients', value: PERSONAL_INFO.clients },
    { label: 'Awards', value: PERSONAL_INFO.awards }
  ];

  // Image paths
  const defaultImage = '/assets/user-profile1.jpg';
  const hoverImage = '/assets/user-profile2.jpg';

  return (
    <Section id="about" className="bg-white dark:bg-gray-900">
      <Container>
        <SectionHeader
          title="About"
          subtitle="Me"
          description="Learn more about my background and experience"
        />

        <div className="grid lg:grid-cols-3 gap-12 items-start">
          {/* Personal Info */}
          <motion.div
            className="space-y-6 lg:col-span-2"
            initial={{ opacity: 1, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Hi, I'm <span className="animated-gradient-text">{PERSONAL_INFO.name}</span>
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                {PERSONAL_INFO.description}
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                A passionate technologist who blends clean UI design with reliable engineering practices—continuously exploring modern frameworks, optimizing performance, and elevating the user experience.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <Card key={stat.label} className="p-4" hover={false}>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{stat.label}</h4>
                  <p className="text-blue-600 font-bold">{stat.value}</p>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Profile Image with Hover Effect */}
          <div className="lg:col-span-1 flex justify-center lg:justify-end">
            <motion.div
              className="relative w-80 h-80 rounded-2xl overflow-hidden shadow-2xl cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
            >
              {/* Image Container with Smooth Transition */}
              <div className="relative w-full h-full z-0">
                <AnimatePresence mode="wait">
                  {!isHovered ? (
                    <motion.div
                      key="default-image"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={defaultImage}
                        alt="Profile - Default"
                        fill
                        className="object-cover rounded-2xl"
                        sizes="(max-width: 768px) 100vw, 320px"
                        priority
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="hover-image"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={hoverImage}
                        alt="Profile - Hover"
                        fill
                        className="object-cover rounded-2xl"
                        sizes="(max-width: 768px) 100vw, 320px"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Floating elements on top of image */}
              <motion.div
                className="absolute top-4 right-4 w-8 h-8 bg-blue-500 rounded-full opacity-80 z-10 shadow-lg"
                animate={{ y: [0, -10, 0], rotate: [0, 180, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute bottom-4 left-4 w-6 h-6 bg-purple-500 rounded-full opacity-80 z-10 shadow-lg"
                animate={{ y: [0, 10, 0], rotate: [360, 180, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute top-1/2 left-4 w-4 h-4 bg-pink-500 rounded-full opacity-80 z-10 shadow-lg"
                animate={{ x: [0, 10, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Professional <span className="animated-gradient-text">Journey</span>
            </h3>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 to-purple-600"></div>
              
            {TIMELINE_ITEMS.map((item, index) => {
              const isCurrent = index === 0;
              const isRecent = index === 1;
              const isPast = index >= 2;
              
              return (
                <div 
                  key={index} 
                  className="timeline-item relative flex items-start mb-8"
                >
                  <div className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                    isCurrent 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg shadow-green-500/30' 
                      : isRecent 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-blue-500/30'
                      : 'bg-gradient-to-r from-gray-500 to-gray-600'
                  }`}>
                    {isCurrent ? '★' : index + 1}
                  </div>
                  <div className="ml-6 flex-1">
                    <Card className={`p-6 hover:shadow-lg transition-all duration-300 ${
                      isCurrent 
                        ? 'border-l-4 border-green-500 bg-gradient-to-r from-green-50 to-white dark:from-green-900/20 dark:to-gray-800' 
                        : isRecent
                        ? 'border-l-4 border-blue-500 bg-gradient-to-r from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-800'
                        : ''
                    }`} hover={false}>
                      <div className="flex items-center justify-between mb-2">
                        <div className={`text-sm font-semibold px-3 py-1 rounded-full ${
                          isCurrent 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                            : isRecent
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                        }`}>
                          {item.year}
                        </div>
                        {isCurrent && (
                          <span className="text-green-600 font-bold text-sm animate-pulse">Current Role</span>
                        )}
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {item.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 font-medium mb-3">
                        {item.company}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
