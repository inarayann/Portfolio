'use client'
import { motion } from 'framer-motion';
import { SKILL_CATEGORIES, ADDITIONAL_SKILLS } from '../../lib/constants';
import { useScrollAnimation, useStaggeredAnimation } from '../../hooks/useAnimation';
import Section, { SectionHeader, Container } from '../ui/Section';
import Card from '../ui/Card';

/**
 * Skills Section Component
 * 
 * Optimized skills section using centralized data and reusable components
 * Follows SOLID principles with single responsibility
 */
export default function SkillsSection() {
  const { ref, inView } = useScrollAnimation();
  const { ref: skillsRef, getStaggeredConfig } = useStaggeredAnimation();

  return (
    <Section id="skills" ref={ref} className="bg-gray-50 dark:bg-gray-800 overflow-hidden">
      <Container>
        <SectionHeader
          title="My"
          subtitle="Skills"
          description="Here are the technologies and tools I work with to create amazing web experiences"
        />

        <div ref={skillsRef} className="space-y-12">
          {SKILL_CATEGORIES.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              {...getStaggeredConfig(categoryIndex)}
            >
              <Card className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                  {category.title}
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skillIndex}
                      className="skill-item overflow-hidden"
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-900 dark:text-white font-medium">
                          {skill.name}
                        </span>
                        <span className="text-blue-600 font-bold">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                        <motion.div
                          className={`skill-bar h-full bg-gradient-to-r ${skill.color} rounded-full`}
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                          whileHover={{ 
                            boxShadow: "0 0 10px rgba(59, 130, 246, 0.3)" 
                          }}
                          transition={{ 
                            duration: 1.5, 
                            delay: skillIndex * 0.1,
                            ease: "easeOut"
                          }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Skills */}
        <motion.div
          className="mt-16 text-center overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Additional Expertise
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {ADDITIONAL_SKILLS.map((skill, index) => (
              <motion.span
                key={index}
                className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium"
                whileHover={{ 
                  scale: 1.02,
                  backgroundColor: "rgba(59, 130, 246, 0.1)"
                }}
                transition={{ duration: 0.2 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
