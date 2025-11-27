/**
 * Factory Pattern Implementation
 * 
 * Factory classes for creating components and managing data
 * Follows Factory design pattern and SOLID principles
 */

import { 
  Project, 
  SkillCategory, 
  TimelineItem, 
  ContactInfo, 
  SocialLink, 
  PersonalInfo,
  ProjectCategory,
  ComponentFactory,
  DataFactory
} from './types';
import { 
  PROJECTS, 
  SKILL_CATEGORIES, 
  TIMELINE_ITEMS, 
  CONTACT_INFO, 
  SOCIAL_LINKS, 
  PERSONAL_INFO,
  PROJECT_FILTERS
} from './constants';

/**
 * Project Factory
 * Creates and manages project-related data and operations
 */
export class ProjectFactory implements DataFactory<Project[]> {
  private projects: Project[] = PROJECTS;

  /**
   * Create projects data
   * Returns all projects
   */
  create(): Project[] {
    return this.projects;
  }

  /**
   * Validate project data
   * Ensures project data integrity
   */
  validate(data: Project[]): boolean {
    return Array.isArray(data) && data.every(project => 
      project.id && 
      project.title && 
      project.description && 
      project.technologies && 
      Array.isArray(project.technologies)
    );
  }

  /**
   * Get project by ID
   * Returns specific project or null
   */
  getById(id: number): Project | null {
    return this.projects.find(project => project.id === id) || null;
  }

  /**
   * Get projects by category
   * Returns filtered projects by category
   */
  getByCategory(category: ProjectCategory): Project[] {
    return this.projects.filter(project => project.category === category);
  }

  /**
   * Get all categories
   * Returns unique project categories
   */
  getCategories(): ProjectCategory[] {
    return [...new Set(this.projects.map(project => project.category))];
  }

  /**
   * Search projects
   * Returns projects matching search criteria
   */
  search(query: string): Project[] {
    const lowercaseQuery = query.toLowerCase();
    return this.projects.filter(project =>
      project.title.toLowerCase().includes(lowercaseQuery) ||
      project.description.toLowerCase().includes(lowercaseQuery) ||
      project.technologies.some(tech => 
        tech.toLowerCase().includes(lowercaseQuery)
      )
    );
  }

  /**
   * Get featured projects
   * Returns projects marked as featured
   */
  getFeatured(): Project[] {
    return this.projects.slice(0, 3); // First 3 as featured
  }
}

/**
 * Skills Factory
 * Creates and manages skills-related data
 */
export class SkillsFactory implements DataFactory<SkillCategory[]> {
  private skillCategories: SkillCategory[] = SKILL_CATEGORIES;

  /**
   * Create skills data
   * Returns all skill categories
   */
  create(): SkillCategory[] {
    return this.skillCategories;
  }

  /**
   * Validate skills data
   * Ensures skills data integrity
   */
  validate(data: SkillCategory[]): boolean {
    return Array.isArray(data) && data.every(category =>
      category.title && 
      category.skills && 
      Array.isArray(category.skills) &&
      category.skills.every(skill => 
        skill.name && 
        typeof skill.level === 'number' && 
        skill.level >= 0 && 
        skill.level <= 100
      )
    );
  }

  /**
   * Get skills by category
   * Returns skills for specific category
   */
  getByCategory(categoryTitle: string): SkillCategory | null {
    return this.skillCategories.find(category => 
      category.title === categoryTitle
    ) || null;
  }

  /**
   * Get all skill names
   * Returns flat array of all skill names
   */
  getAllSkillNames(): string[] {
    return this.skillCategories.flatMap(category => 
      category.skills.map(skill => skill.name)
    );
  }

  /**
   * Get skills by level range
   * Returns skills within specified level range
   */
  getByLevelRange(minLevel: number, maxLevel: number): SkillCategory[] {
    return this.skillCategories.map(category => ({
      ...category,
      skills: category.skills.filter(skill => 
        skill.level >= minLevel && skill.level <= maxLevel
      )
    })).filter(category => category.skills.length > 0);
  }
}

/**
 * Timeline Factory
 * Creates and manages timeline data
 */
export class TimelineFactory implements DataFactory<TimelineItem[]> {
  private timelineItems: TimelineItem[] = TIMELINE_ITEMS;

  /**
   * Create timeline data
   * Returns all timeline items
   */
  create(): TimelineItem[] {
    return this.timelineItems;
  }

  /**
   * Validate timeline data
   * Ensures timeline data integrity
   */
  validate(data: TimelineItem[]): boolean {
    return Array.isArray(data) && data.every(item =>
      item.year && 
      item.title && 
      item.company && 
      item.description
    );
  }

  /**
   * Get timeline by year range
   * Returns timeline items within year range
   */
  getByYearRange(startYear: number, endYear: number): TimelineItem[] {
    return this.timelineItems.filter(item => {
      const itemStartYear = parseInt(item.year.split(' - ')[0]);
      return itemStartYear >= startYear && itemStartYear <= endYear;
    });
  }

  /**
   * Get sorted timeline
   * Returns timeline items sorted by year (newest first)
   */
  getSortedTimeline(): TimelineItem[] {
    return [...this.timelineItems].sort((a, b) => {
      const yearA = parseInt(a.year.split(' - ')[0]);
      const yearB = parseInt(b.year.split(' - ')[0]);
      return yearB - yearA;
    });
  }
}

/**
 * Contact Factory
 * Creates and manages contact information
 */
export class ContactFactory implements DataFactory<ContactInfo[]> {
  private contactInfo: ContactInfo[] = CONTACT_INFO;
  private socialLinks: SocialLink[] = SOCIAL_LINKS;

  /**
   * Create contact data
   * Returns all contact information
   */
  create(): ContactInfo[] {
    return this.contactInfo;
  }

  /**
   * Validate contact data
   * Ensures contact data integrity
   */
  validate(data: ContactInfo[]): boolean {
    return Array.isArray(data) && data.every(info =>
      info.title && 
      info.value && 
      info.description
    );
  }

  /**
   * Get social links
   * Returns all social media links
   */
  getSocialLinks(): SocialLink[] {
    return this.socialLinks;
  }

  /**
   * Get contact by type
   * Returns specific contact information
   */
  getByType(type: string): ContactInfo | null {
    return this.contactInfo.find(info => 
      info.title.toLowerCase() === type.toLowerCase()
    ) || null;
  }

  /**
   * Get primary contact
   * Returns primary contact information (email)
   */
  getPrimaryContact(): ContactInfo | null {
    return this.getByType('email');
  }
}

/**
 * Personal Info Factory
 * Creates and manages personal information
 */
export class PersonalInfoFactory implements DataFactory<PersonalInfo> {
  private personalInfo: PersonalInfo = PERSONAL_INFO;

  /**
   * Create personal info data
   * Returns personal information
   */
  create(): PersonalInfo {
    return this.personalInfo;
  }

  /**
   * Validate personal info data
   * Ensures personal info data integrity
   */
  validate(data: PersonalInfo): boolean {
    return data.name && 
           data.title && 
           data.email && 
           data.phone && 
           data.location;
  }

  /**
   * Get formatted name
   * Returns formatted name with title
   */
  getFormattedName(): string {
    return `${this.personalInfo.name} - ${this.personalInfo.title}`;
  }

  /**
   * Get contact summary
   * Returns formatted contact summary
   */
  getContactSummary(): string {
    return `${this.personalInfo.email} | ${this.personalInfo.phone} | ${this.personalInfo.location}`;
  }
}

/**
 * Component Factory
 * Creates reusable component instances
 */
export class ComponentFactoryImpl implements ComponentFactory<any> {
  private components: Map<string, React.ComponentType<any>> = new Map();

  /**
   * Register component
   * Registers a component with the factory
   */
  register<T>(name: string, component: React.ComponentType<T>): void {
    this.components.set(name, component);
  }

  /**
   * Create component
   * Creates a component instance by name
   */
  create<T>(name: string): React.ComponentType<T> | null {
    return this.components.get(name) || null;
  }

  /**
   * Check if component exists
   * Returns true if component is registered
   */
  hasComponent(name: string): boolean {
    return this.components.has(name);
  }

  /**
   * Get all registered components
   * Returns array of all registered component names
   */
  getRegisteredComponents(): string[] {
    return Array.from(this.components.keys());
  }
}

/**
 * Data Manager Factory
 * Centralized factory for all data operations
 */
export class DataManagerFactory {
  private static instance: DataManagerFactory;
  private projectFactory: ProjectFactory;
  private skillsFactory: SkillsFactory;
  private timelineFactory: TimelineFactory;
  private contactFactory: ContactFactory;
  private personalInfoFactory: PersonalInfoFactory;

  private constructor() {
    this.projectFactory = new ProjectFactory();
    this.skillsFactory = new SkillsFactory();
    this.timelineFactory = new TimelineFactory();
    this.contactFactory = new ContactFactory();
    this.personalInfoFactory = new PersonalInfoFactory();
  }

  /**
   * Get singleton instance
   * Returns the singleton instance of DataManagerFactory
   */
  static getInstance(): DataManagerFactory {
    if (!DataManagerFactory.instance) {
      DataManagerFactory.instance = new DataManagerFactory();
    }
    return DataManagerFactory.instance;
  }

  /**
   * Get project factory
   * Returns project factory instance
   */
  getProjectFactory(): ProjectFactory {
    return this.projectFactory;
  }

  /**
   * Get skills factory
   * Returns skills factory instance
   */
  getSkillsFactory(): SkillsFactory {
    return this.skillsFactory;
  }

  /**
   * Get timeline factory
   * Returns timeline factory instance
   */
  getTimelineFactory(): TimelineFactory {
    return this.timelineFactory;
  }

  /**
   * Get contact factory
   * Returns contact factory instance
   */
  getContactFactory(): ContactFactory {
    return this.contactFactory;
  }

  /**
   * Get personal info factory
   * Returns personal info factory instance
   */
  getPersonalInfoFactory(): PersonalInfoFactory {
    return this.personalInfoFactory;
  }
}

// Export singleton instance
export const dataManager = DataManagerFactory.getInstance();
