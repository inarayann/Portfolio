'use client'
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Header from "@/components/header";
import Footer from "@/components/footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from '@/components/sections/AboutSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ContactSection from '@/components/sections/ContactSection';
import FloatingWhatsAppButton from '@/components/ui/FloatingWhatsAppButton';

export default function Home() {
  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 overflow-x-hidden"
      suppressHydrationWarning
    >
      <Header />
      
      <main className="relative">
        {/* Hero Section */}
        <HeroSection />
        
        {/* About Section */}
        <AboutSection />
        
        {/* Skills Section */}
        <SkillsSection />
        
        {/* Projects Section */}
        <ProjectsSection />
        
        {/* Contact Section */}
        <ContactSection />
      </main>
      
      <Footer />
      
      {/* Floating WhatsApp Button */}
      <FloatingWhatsAppButton />
    </div>
  );
}
