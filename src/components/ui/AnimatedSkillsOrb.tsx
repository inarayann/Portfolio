'use client'
import { motion } from 'framer-motion';
import { useState, useMemo, useEffect } from 'react';

/**
 * AnimatedSkillsOrb Component
 * 
 * Displays skills in a circular animated pattern around a center point.
 * Skills are blurred by default and unblurred with glow effect on hover.
 * Features rotating and bouncing animations.
 * 
 * @component
 * @returns {JSX.Element} The animated skills orb component
 */

// Skills data with their positions and animation properties
const SKILLS = [
  { name: 'ReactJs', color: 'from-cyan-400 to-blue-500' },
  { name: 'AngularJs', color: 'from-red-500 to-pink-600' },
  { name: 'NextJS', color: 'from-gray-700 to-gray-900' },
  { name: 'DeFi', color: 'from-green-500 to-emerald-600' },
  { name: 'TypeScript', color: 'from-blue-600 to-blue-800' },
  { name: 'Node.js', color: 'from-green-600 to-green-800' },
  { name: 'Web3', color: 'from-purple-500 to-indigo-600' },
  { name: 'Redux', color: 'from-purple-600 to-purple-800' },
  { name: 'TailwindCSS', color: 'from-cyan-400 to-blue-500' },
  { name: 'MUI', color: 'from-blue-500 to-indigo-600' },
];

interface SkillItemProps {
  skill: typeof SKILLS[0];
  angle: number;
  radius: number;
  index: number;
  isHovered: boolean;
  onHover: (skillName: string | null) => void;
  isMounted: boolean;
}

/**
 * Individual Skill Item Component
 * 
 * Renders a single skill badge with circular positioning,
 * blur effects, and hover interactions.
 * 
 * @param {SkillItemProps} props - Component props
 * @returns {JSX.Element} The skill item component
 */
function SkillItem({ skill, angle, radius, index, isHovered, onHover, isMounted }: SkillItemProps) {
  // Bouncing animation offset for variety
  const bounceDelay = index * 0.2;
  const bounceAmplitude = 8 + (index % 3) * 4;
  
  // Calculate position on circle - round to prevent hydration mismatches
  const x = Math.round(Math.cos((angle * Math.PI) / 180) * radius * 100) / 100;
  const y = Math.round(Math.sin((angle * Math.PI) / 180) * radius * 100) / 100;

  return (
    <motion.div
      className="absolute left-1/2 top-1/2"
      style={{
        x: x,
        y: y,
      }}
      initial={false}
      animate={isMounted ? {
        opacity: 1,
        scale: 1,
      } : {
        opacity: 0,
        scale: 0,
      }}
      transition={{
        opacity: { duration: 0.5, delay: index * 0.1 },
        scale: { duration: 0.5, delay: index * 0.1 },
      }}
      onHoverStart={() => onHover(skill.name)}
      onHoverEnd={() => onHover(null)}
      whileHover={{
        scale: 1.2,
        zIndex: 50,
      }}
    >
      {/* Bouncing wrapper */}
      <motion.div
        animate={isMounted ? {
          y: [
            0,
            -bounceAmplitude,
            0,
            bounceAmplitude * 0.7,
            0,
          ],
          // Counter-rotate to keep text upright as it orbits
          rotate: [0, -360],
        } : {
          y: 0,
          rotate: 0,
        }}
        transition={{
          y: {
            duration: 3 + index * 0.3,
            delay: bounceDelay,
            repeat: Infinity,
            ease: 'easeInOut',
          },
          rotate: {
            duration: 60,
            repeat: Infinity,
            ease: 'linear',
          },
        }}
        style={{ transformOrigin: 'center' }}
      >
        <div
          className={`
            px-4 py-2 rounded-full font-semibold text-sm md:text-base
            bg-gradient-to-r ${skill.color}
            backdrop-blur-sm border border-white/20
            transition-all duration-300 ease-in-out
            cursor-pointer
            ${isHovered ? 'blur-none shadow-2xl' : 'blur-md'}
            ${isHovered ? 'shadow-blue-500/50 shadow-lg' : ''}
          `}
          style={{
            filter: isHovered 
              ? 'blur(0px) drop-shadow(0 0 20px rgba(59, 130, 246, 0.6))' 
              : 'blur(8px)',
            boxShadow: isHovered
              ? '0 0 30px rgba(59, 130, 246, 0.8), 0 0 60px rgba(59, 130, 246, 0.4)'
              : 'none',
          }}
        >
          <span className="text-white dark:text-gray-100 drop-shadow-lg">
            {skill.name}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

/**
 * AnimatedSkillsOrb Component
 * 
 * Main component that renders all skills in a circular pattern.
 * Handles hover state management and rotation animation.
 * 
 * @returns {JSX.Element} The animated skills orb
 */
export default function AnimatedSkillsOrb() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  
  // Only start animations after client-side mount to prevent hydration errors
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Calculate positions for skills in a circle with responsive radius
  const skillPositions = useMemo(() => {
    const skillsCount = SKILLS.length;
    // Increased radius for better spacing - will be adjusted via CSS classes for responsiveness
    const radius = 250;
    
    return SKILLS.map((skill, index) => {
      const angle = (360 / skillsCount) * index;
      return {
        skill,
        angle,
        radius,
        index,
      };
    });
  }, []);

  return (
    <div className="relative w-full h-[450px] sm:h-[500px] md:h-[600px] flex items-center justify-center">
      {/* Rotating container for circular motion */}
      <motion.div
        className="relative w-full h-full scale-75 sm:scale-90 md:scale-100"
        animate={isMounted ? {
          rotate: [0, 360],
        } : { rotate: 0 }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {/* Center content - Counter-rotates to stay fixed */}
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
          animate={isMounted ? {
            rotate: [0, -360],
          } : { rotate: 0 }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <motion.div
            className="text-center"
            initial={false}
            animate={isMounted ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Skills & Expertise
            </h3>
          </motion.div>
        </motion.div>

        {/* Skills orbiting around the center */}
        {skillPositions.map(({ skill, angle, radius, index }) => (
          <SkillItem
            key={skill.name}
            skill={skill}
            angle={angle}
            radius={radius}
            index={index}
            isHovered={hoveredSkill === skill.name}
            onHover={setHoveredSkill}
            isMounted={isMounted}
          />
        ))}
      </motion.div>
    </div>
  );
}

