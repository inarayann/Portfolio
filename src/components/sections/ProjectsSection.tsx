'use client'
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PROJECTS, PROJECT_FILTERS } from '../../lib/constants';
import { useScrollAnimation, useStaggeredAnimation } from '../../hooks/useAnimation';
import Section, { SectionHeader, Container, Grid } from '../ui/Section';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import ProjectCard3D from '../ui/ProjectCard3D';
import { Project } from '../../lib/types';

/**
 * Projects Section Component
 * 
 * Optimized projects section using centralized data and reusable components
 * Follows SOLID principles with single responsibility
 */
export default function ProjectsSection() {
  const { ref, inView } = useScrollAnimation();
  const { ref: projectsRef, getStaggeredConfig } = useStaggeredAnimation();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState('all');
  const router = useRouter();

  const filteredProjects = PROJECTS.filter(project => 
    filter === 'all' || project.category === filter
  );

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  /**
   * Handle demo button click - navigate to local route or open external URL
   * 
   * @param {string} url - The demo URL (local route or external URL)
   */
  const handleDemoClick = (url: string) => {
    // Check if it's a local route (starts with /)
    if (url.startsWith('/')) {
      router.push(url);
    } else if (url && url !== '#') {
      // External URL - open in new tab
      window.open(url, '_blank');
    }
  };

  return (
    <Section id="projects" ref={ref} className="bg-white dark:bg-gray-900">
      <Container>
        <SectionHeader
          title="My"
          subtitle="Projects"
          description="Here are some of my recent projects that showcase my skills and experience"
        />

        {/* Filter Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {PROJECT_FILTERS.map((category) => (
            <Button
              key={category.id}
              onClick={() => setFilter(category.id)}
              variant={filter === category.id ? 'primary' : 'secondary'}
              className="px-6 py-3 rounded-full"
            >
              {category.name}
            </Button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <Grid ref={projectsRef} cols={3} className="gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              {...getStaggeredConfig(index)}
            >
              <ProjectCard3D
                project={project}
                onClick={() => handleProjectClick(project)}
                className="w-full h-80"
              />
            </motion.div>
          ))}
        </Grid>

        {/* Project Detail Modal */}
        <Modal
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          title={selectedProject?.title}
          size="lg"
        >
          {selectedProject && (
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Project Description
                </h4>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {selectedProject.description}
                </p>

                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={() => handleDemoClick(selectedProject.demoUrl)}
                    variant="primary"
                  >
                    {selectedProject.demoUrl.startsWith('/') ? 'View Project' : 'View Demo'}
                  </Button>
                  {selectedProject.githubUrl && selectedProject.githubUrl !== '#' && (
                    <Button
                      onClick={() => window.open(selectedProject.githubUrl, '_blank')}
                      variant="outline"
                    >
                      View Code
                    </Button>
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Key Features
                </h4>
                <ul className="space-y-2 mb-6">
                  {selectedProject.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Modules
                </h4>
                <ul className="space-y-2">
                  {selectedProject.modules.map((module, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span className="text-gray-600 dark:text-gray-300">{module}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </Modal>
      </Container>
    </Section>
  );
}
