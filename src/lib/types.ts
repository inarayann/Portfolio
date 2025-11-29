/**
 * TypeScript Type Definitions
 * 
 * Centralized type definitions for the portfolio application
 * Following TypeScript best practices and SOLID principles
 */
import type React from 'react';

// Navigation Types
export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface NavigationConfig {
  brand: string;
  items: NavigationItem[];
}

// Project Types
export interface Project {
  id: number;
  title: string;
  description: string;
  shortDesc: string;
  image: string;
  technologies: string[];
  category: ProjectCategory;
  demoUrl: string;
  githubUrl: string;
  features: string[];
  modules: string[];
}

export type ProjectCategory = 'frontend' | 'fullstack' | 'backend';

export interface ProjectFilter {
  id: string;
  name: string;
  category?: ProjectCategory;
}

// Skills Types
export interface Skill {
  name: string;
  level: number;
  color: string;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

// Timeline Types
export interface TimelineItem {
  year: string;
  title: string;
  company: string;
  description: string;
}

// Contact Types
export interface ContactInfo {
  title: string;
  value: string;
  description: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  color: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Personal Information Types
export interface PersonalInfo {
  name: string;
  title: string;
  subtitle: string;
  description: string;
  experience: string;
  projects: string;
  clients: string;
  awards: string;
  email: string;
  phone: string;
  location: string;
}

// Animation Types
export interface AnimationConfig {
  initial: Record<string, any>;
  animate: Record<string, any>;
  transition: Record<string, any>;
}

// Component Props Types
export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  children?: React.ReactNode;
}

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

// Factory Pattern Types
export interface ComponentFactory<T> {
  create(props: T): React.ComponentType<T>;
}

export interface DataFactory<T> {
  create(): T;
  validate(data: T): boolean;
}

// Theme Types
export interface ThemeConfig {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
  };
  typography: {
    fontFamily: string;
    fontSize: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

// Utility Types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

// Form Validation Types
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => boolean | string;
}

export interface ValidationRules {
  [key: string]: ValidationRule;
}

export interface ValidationErrors {
  [key: string]: string;
}
