'use client'
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

/**
 * RandomSkillsFloating Component
 * 
 * Displays skills randomly placed around the hero section.
 * Skills are blurred and glowing by default, becoming fully visible on hover/tap.
 * 
 * @component
 * @returns {JSX.Element} The random floating skills component
 */

// Skills data with their colors
const SKILLS = [
  { name: 'ReactJs', color: 'from-cyan-400 to-blue-500' },
  { name: 'AngularJs', color: 'from-red-500 to-pink-600' },
  { name: 'NextJS', color: 'from-gray-700 to-gray-900' },
  { name: 'TypeScript', color: 'from-blue-600 to-blue-800' },
  { name: 'Node.js', color: 'from-green-600 to-green-800' },
  { name: 'Web3', color: 'from-purple-500 to-indigo-600' },
  { name: 'Redux', color: 'from-purple-600 to-purple-800' },
  { name: 'TailwindCSS', color: 'from-cyan-400 to-blue-500' },
  { name: 'MUI', color: 'from-blue-500 to-indigo-600' },
  { name: 'DeFi', color: 'from-green-500 to-emerald-600' },
  { name: 'JavaScript', color: 'from-yellow-500 to-orange-500' },
  { name: 'Blockchain', color: 'from-purple-500 to-indigo-600' },
  { name: 'HTML5', color: 'from-orange-500 to-red-500' },
  { name: 'CSS3', color: 'from-blue-500 to-cyan-600' },
  { name: 'Service Workers', color: 'from-purple-500 to-indigo-600' },
  { name: 'SEO Optimization', color: 'from-purple-500 to-indigo-600' },
  { name: 'Performance Optimization', color: 'from-purple-500 to-indigo-600' },
  { name: 'Code Review', color: 'from-purple-500 to-indigo-600' },
  { name: 'Team Leadership', color: 'from-purple-500 to-indigo-600' },
  { name: 'Agile Methodologies', color: 'from-purple-500 to-indigo-600' },
  { name: 'API Integration', color: 'from-purple-500 to-indigo-600' },
  { name: 'State Management', color: 'from-purple-500 to-indigo-600' },
];

interface SkillBadgeProps {
  skill: typeof SKILLS[0];
  position: { x: number; y: number };
  index: number;
  isHovered: boolean;
  onHover: (skillName: string | null) => void;
  isMounted: boolean;
}

/**
 * Individual Skill Badge Component
 * 
 * Renders a single skill badge with random positioning,
 * blur effects, and hover interactions.
 * 
 * @param {SkillBadgeProps} props - Component props
 * @returns {JSX.Element} The skill badge component
 */
function SkillBadge({ skill, position, index, isHovered, onHover, isMounted }: SkillBadgeProps) {
  return (
    <motion.div
      className="absolute pointer-events-auto"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)', // Center the badge on its position
        zIndex: isHovered ? 50 : 20,
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
      onTapStart={() => onHover(skill.name)}
      onTapCancel={() => onHover(null)}
      whileHover={{
        scale: 1.3,
        zIndex: 50,
      }}
      whileTap={{
        scale: 1.2,
      }}
    >
      {/* Floating animation */}
      <motion.div
        animate={isMounted ? {
          y: [0, -15, 0],
          rotate: [0, 5, -5, 0],
        } : {
          y: 0,
          rotate: 0,
        }}
        transition={{
          duration: 3 + (index % 3) * 0.5,
          delay: index * 0.2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <div
          className={`
            px-3 py-1.5 md:px-4 md:py-2 rounded-full font-semibold text-xs md:text-sm
            bg-gradient-to-r ${skill.color}
            backdrop-blur-sm border border-white/20
            transition-all duration-300 ease-in-out
            cursor-pointer
            select-none
          `}
          style={{
            filter: isHovered 
              ? 'blur(0px) drop-shadow(0 0 20px rgba(59, 130, 246, 0.6))' 
              : 'blur(4px)',
            boxShadow: isHovered
              ? '0 0 30px rgba(59, 130, 246, 0.8), 0 0 60px rgba(59, 130, 246, 0.4)'
              : '0 0 15px rgba(147, 51, 234, 0.4), 0 0 30px rgba(147, 51, 234, 0.3)',
            opacity: isHovered ? 1 : 0.85,
            transition: 'all 0.3s ease-in-out',
            WebkitBackdropFilter: isHovered ? 'blur(0px)' : 'blur(2px)',
          }}
        >
          <span className="text-white dark:text-gray-100 drop-shadow-lg whitespace-nowrap">
            {skill.name}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

/**
 * RandomSkillsFloating Component
 * 
 * Main component that renders skills in random positions.
 * Handles hover state management and positioning.
 * 
 * @returns {JSX.Element} The random floating skills component
 */
export default function RandomSkillsFloating() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [skillPositions, setSkillPositions] = useState<Array<{
    skill: typeof SKILLS[0];
    position: { x: number; y: number };
    index: number;
  }>>([]);
  
  // Generate random positions only on client-side after mount to prevent hydration errors
  useEffect(() => {
    setIsMounted(true);
    
    // Generate random positions avoiding center area (where main content is)
    const positions: { x: number; y: number }[] = [];
    const centerX = 50; // Center of screen
    const centerY = 50;
    const minDistance = 25; // Minimum distance from center
    
    SKILLS.forEach((skill, index) => {
      let x: number, y: number;
      let attempts = 0;
      
      // Try to find a position that's not too close to center and not overlapping
      do {
        x = 10 + Math.random() * 80; // Between 10% and 90%
        y = 10 + Math.random() * 80; // Between 10% and 90%
        
        // Check distance from center
        const distance = Math.sqrt(
          Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
        );
        
        // Check if too close to other skills
        const tooClose = positions.some(pos => {
          const dist = Math.sqrt(
            Math.pow(x - pos.x, 2) + Math.pow(y - pos.y, 2)
          );
          return dist < 8; // Minimum 8% distance between skills
        });
        
        attempts++;
        if (attempts > 100) break; // Prevent infinite loop
        
        if (distance >= minDistance && !tooClose) {
          positions.push({ x, y });
          break;
        }
      } while (true);
      
      // Fallback if we couldn't find a good position
      if (positions.length <= index) {
        // Place in corners or edges
        const corner = index % 4;
        switch (corner) {
          case 0:
            positions.push({ x: 15, y: 15 });
            break;
          case 1:
            positions.push({ x: 85, y: 15 });
            break;
          case 2:
            positions.push({ x: 15, y: 85 });
            break;
          case 3:
            positions.push({ x: 85, y: 85 });
            break;
        }
      }
    });
    
    // Set positions after generating them
    setSkillPositions(
      SKILLS.map((skill, index) => ({
        skill,
        position: positions[index] || { x: 20 + (index * 10), y: 20 + (index * 10) },
        index,
      }))
    );
  }, []);

  // Return null on server-side to completely prevent hydration mismatch
  // Only render after component mounts on client
  if (!isMounted || skillPositions.length === 0) {
    return null;
  }

  return (
    <div className="absolute inset-0 z-20 pointer-events-none">
      {skillPositions.map(({ skill, position, index }) => (
        <SkillBadge
          key={skill.name}
          skill={skill}
          position={position}
          index={index}
          isHovered={hoveredSkill === skill.name}
          onHover={setHoveredSkill}
          isMounted={isMounted}
        />
      ))}
    </div>
  );
}

