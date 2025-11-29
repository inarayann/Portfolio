'use client'
import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Box, OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { Project } from '../../lib/types';

interface ProjectCard3DProps {
  project: Project;
  onClick: () => void;
  className?: string;
}

/**
 * 3D Card Mesh Component
 * 
 * Handles the 3D mesh animation within Canvas
 */
function CardMesh({ project, hovered, setHovered, onClick }: { 
  project: Project; 
  hovered: boolean; 
  setHovered: (hovered: boolean) => void; 
  onClick: () => void; 
}) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // 90 degrees left and back rotation
      const time = state.clock.elapsedTime;
      const rotationY = hovered ? Math.sin(time * 0.5) * Math.PI / 4 : Math.sin(time * 0.2) * Math.PI / 12;
      const rotationX = hovered ? Math.sin(time * 0.3) * Math.PI / 8 : Math.sin(time * 0.15) * Math.PI / 16;
      
      meshRef.current.rotation.y = rotationY;
      meshRef.current.rotation.x = rotationX;
    }
  });

  return (
    <group
      ref={meshRef}
      onClick={onClick}
    >
      {/* Main Card */}
      <Box args={[3, 2, 0.2]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color={hovered ? "#3b82f6" : "#8b5cf6"} 
          metalness={0.3}
          roughness={0.4}
        />
      </Box>
      
      {/* Card Border */}
      <Box args={[3.1, 2.1, 0.1]} position={[0, 0, -0.05]}>
        <meshStandardMaterial 
          color="#06b6d4" 
          metalness={0.8}
          roughness={0.2}
        />
      </Box>
      
      {/* Project Title */}
      <Text
        position={[0, 0.3, 0.15]}
        fontSize={0.2}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        maxWidth={2.5}
        textAlign="center"
      >
        {project.title}
      </Text>
      
      {/* Technology Tags */}
      {project.technologies.slice(0, 3).map((tech, index) => (
        <Box 
          key={index}
          args={[0.8, 0.1, 0.05]} 
          position={[-1 + index * 0.9, -0.3, 0.15]}
        >
          <meshStandardMaterial 
            color={index === 0 ? "#10b981" : index === 1 ? "#f59e0b" : "#ef4444"}
            metalness={0.2}
            roughness={0.3}
          />
        </Box>
      ))}
      
      {/* Floating Elements */}
      {hovered && (
        <>
          <Box args={[0.1, 0.1, 0.1]} position={[1.5, 1, 0.5]}>
            <meshStandardMaterial 
              color="#06b6d4" 
              metalness={0.8}
              roughness={0.1}
            />
          </Box>
          <Box args={[0.08, 0.08, 0.08]} position={[-1.5, -0.8, 0.3]}>
            <meshStandardMaterial 
              color="#8b5cf6" 
              metalness={0.6}
              roughness={0.2}
            />
          </Box>
        </>
      )}
    </group>
  );
}

/**
 * 3D Project Card Component
 * 
 * Interactive 3D card with Three.js for enhanced visual appeal
 * Follows SOLID principles with single responsibility
 */
function ProjectCard3D({ project, onClick, className = '' }: ProjectCard3DProps) {
  const [hovered, setHovered] = useState(true); // Set to true by default for always-on hover effects

  return (
    <motion.div
      className={`relative w-full h-80 ${className} cursor-pointer`}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} />
        
        <CardMesh 
          project={project}
          hovered={hovered}
          setHovered={setHovered}
          onClick={() => {}} // Empty handler since parent handles click
        />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          enableRotate={false}
          autoRotate={false}
        />
      </Canvas>
      
      {/* Overlay Content - Make sure it doesn't block clicks */}
      <div 
        className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/60 to-transparent rounded-lg pointer-events-none"
      >
        <div className="pointer-events-auto">
          <h3 className="text-white font-bold text-lg mb-2">{project.title}</h3>
          <p className="text-white/90 text-sm mb-3 line-clamp-2">{project.shortDesc}</p>
          <div className="flex flex-wrap gap-1">
            {project.technologies.slice(0, 3).map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-white/20 text-white text-xs rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ProjectCard3D;
