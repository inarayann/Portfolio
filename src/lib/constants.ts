/**
 * Application Constants
 * 
 * Centralized constants for all static data in the portfolio application
 * Following DRY principle and single source of truth
 */

import { 
  NavigationConfig, 
  Project, 
  SkillCategory, 
  TimelineItem, 
  ContactInfo, 
  SocialLink, 
  PersonalInfo,
  ProjectFilter,
  ThemeConfig
} from './types';

// Personal Information
export const PERSONAL_INFO: PersonalInfo = {
  name: "Narayan Singh",
  title: "Full-Stack Developer",
  subtitle: "Angular, React.js, Next.js • Node.js • Web3 / DeFi",
  description: "Full-stack developer with 5 years of experience designing, developing, and deploying scalable, secure web and blockchain applications. Specialized in Angular, React.js, and Next.js with strong backend exposure to Node.js. Passionate about clean UI, reliable engineering, and performance optimization.",
  experience: "5 Years",
  projects: "8",
  clients: "5",
  awards: "1",
  email: "narayansinghbti@gmail.com",
  phone: "+91 98761 62402",
  location: "Mohali, Punjab, India"
};

// Navigation Configuration
export const NAVIGATION_CONFIG: NavigationConfig = {
  brand: "Narayan Singh",
  items: [
    { id: "home", label: "Home", href: "/" },
    { id: "about", label: "About", href: "#about" },
    { id: "skills", label: "Skills", href: "#skills" },
    { id: "projects", label: "Projects", href: "#projects" },
    { id: "contact", label: "Contact", href: "#contact" }
  ]
};

// Project Data
export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "QuantDex",
    description: "A multi-chain, multi-hop decentralized exchange supporting Ethereum, Solana, and Sui with real-time analytics and optimized routing.",
    shortDesc: "Multi-chain DEX with advanced routing and live analytics",
    image: "/api/placeholder/400/300",
    technologies: ["Next.js", "React", "TypeScript", "Redux Toolkit", "Wagmi", "TailwindCSS", "Chart.js", "Recharts"],
    category: "frontend",
    demoUrl: "https://dex-app.debutinfotech.in",
    githubUrl: "#",
    features: [
      "Real-time multi-chain swap interface",
      "Single- and multi-hop routing",
      "Live price analytics with polling",
      "Optimized chain selector and token aggregator",
      "Responsive trading dashboards"
    ],
    modules: [
      "Swap Engine",
      "Analytics Dashboard",
      "Token Aggregator",
      "Chain Selector",
      "State Management"
    ]
  },
  {
    id: 2,
    title: "Yieldz",
    description: "DeFi platform enabling staking of USDT/USDC for YLDZ tokens with passwordless onboarding and compliance integrations.",
    shortDesc: "DeFi staking with Passkeys and DocuSign KYC",
    image: "/api/placeholder/400/300",
    technologies: ["Next.js", "React", "Node.js", "Web3.js", "MUI", "Passkeys", "DocuSign API"],
    category: "frontend",
    demoUrl: "https://qa-app.yieldz.net",
    githubUrl: "#",
    features: [
      "Passwordless onboarding (Passkeys) + DocuSign",
      "Staking and rewards dashboard",
      "Claim and withdraw flows",
      "Compliance-aligned UX"
    ],
    modules: [
      "Auth & KYC",
      "Staking Module",
      "Rewards",
      "Compliance"
    ]
  },
  {
    id: 3,
    title: "Aithentic",
    description: "Enterprise asset management across M365, AWS, Azure, and CrowdStrike with real-time updates and visualizations.",
    shortDesc: "Enterprise asset management with real-time data",
    image: "/api/placeholder/400/300",
    technologies: ["Angular", "Next.js", "Laravel", "AG-Grid", "AG-Charts", "Keycloak", "Socket.io"],
    category: "frontend",
    demoUrl: "https://app.aithentic.com",
    githubUrl: "#",
    features: [
      "Real-time asset updates",
      "Server-side filtering & bulk operations",
      "Keycloak authentication",
      "Advanced visualization",
      "Scalable admin UI",
      "Subscription based pricing",
      "User management",
      "Notification system & Alert Management",
      "Audit trail",
      "Role based access control",
      "Data export to CSV, Excel, PDF,TSV, etc.",
      "Data import",
      "Data import from CrowdStrike, M365, AWS, Azure, SentinelOne, ServiceNow, etc.",
      "Asset Details Management",
    ],
    modules: [
      "Assets",
      "Auth",
      "Realtime Updates",
      "Visualization",
      "Subscription Management",
      "User Management",
      "Notification System",
      "Alert Management",
      "Audit Trail",
      "Role Based Access Control",
      "Data Export",
      "Data Import",
      "Data Synchronization",
    ]
  },
  {
    id: 4,
    title: "Reel-Ville / VisVille",
    description: "Social media video platform enabling content discovery and upload with scalable admin UI.",
    shortDesc: "Video platform with scalable admin UI",
    image: "/api/placeholder/400/300",
    technologies: ["Angular", "Node.js"],
    category: "frontend",
    demoUrl: "#",
    githubUrl: "#",
    features: [
      "Admin module and UI architecture",
      "Scalable content workflows", 
    ],
    modules: [
      "Admin",
      "Content Management", 
      "User Management",
      "Notification System",
      "Analytics",
      "Reporting",
      "Video Management",
      "Video Upload",
    ]
  },
  {
    id: 5,
    title: "Multim3d",
    description: "Medical content platform with secure, optimized video streaming and content categorization.",
    shortDesc: "Healthcare media platform",
    image: "/api/placeholder/400/300",
    technologies: ["React", "Node.js", "MongoDB"],
    category: "fullstack",
    demoUrl: "https://multim3d.net",
    githubUrl: "#",
    features: [
      "Video optimization",
      "Content categorization",
      "Security-focused UX",
      "Video Player Customization",
      "Screenshot Generation for Thumbnails",
      "PDF Generation for Downloads",
      "Content Sharing",
      "Social Media Integration",
      "Analytics",
      "Onboarding of Doctors and Nurses as per GMC",
      "Multi-platform social media integration",
      "Content scheduling and publishing",
      "Analytics and reporting",
      "Team collaboration tools",
      "Brand monitoring",

    ],
    modules: [
      "Reporting",
      "Team Collaboration",
      "Content Scheduling and Publishing",
      "Social Media Integration",
      "Video Management",
      "Video Upload",
      "Video Player Customization",
      "Screenshot Generation for Thumbnails",
      "PDF Generation for Downloads",
      "Content Sharing",
      "Analytics",
      "Onboarding of Doctors and Nurses as per GMC",
      "Multi-platform social media integration",
      "Content scheduling and publishing",
      "Analytics and reporting",
      "Team collaboration tools",
      "Brand monitoring",
      "Automated responses"
    ]
  },
  {
    id: 6,
    title: "Smart MFG",
    description: "NFT-backed lending and borrowing protocol with wallet connectivity and motion-rich UI.",
    shortDesc: "DeFi lending with NFT collateral",
    image: "/api/placeholder/400/300",
    technologies: ["Next.js", "Redux Toolkit", "MUI", "Framer Motion", "Node.js", "MongoDB", "Web3.js"],
    category: "frontend",
    demoUrl: "#",
    githubUrl: "#",
    features: [
      "Wallet connectivity",
      "NFT collateral mechanisms",
      "Smooth async flows"
    ],
    modules: [
      "Wallet",
      "Collateral",
      "Lending"
    ]
  }
];

// Project Filters
export const PROJECT_FILTERS: ProjectFilter[] = [
  { id: 'all', name: 'All Projects' },
  { id: 'frontend', name: 'Frontend' },
  { id: 'fullstack', name: 'Full Stack' }
];

// Skills Data
// Skills Data
// Skills Data (Full Updated)
export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Frontend Technologies",
    skills: [
      { name: "HTML5", level: 95, color: "from-orange-500 to-red-500" },
      { name: "CSS3", level: 90, color: "from-blue-500 to-cyan-500" },
      { name: "JavaScript (ES6+)", level: 95, color: "from-yellow-500 to-orange-500" },
      { name: "TypeScript", level: 90, color: "from-blue-600 to-blue-800" },
      { name: "Angular (v2–20)", level: 95, color: "from-red-500 to-pink-500" },
      { name: "React.js", level: 90, color: "from-cyan-500 to-blue-500" },
      { name: "Next.js", level: 85, color: "from-gray-700 to-gray-900" },
      { name: "Lightweight Charts", level: 75, color: "from-green-400 to-green-600" },
      { name: "AG-Grid & AG-Charts", level: 80, color: "from-purple-500 to-indigo-500" },
      { name: "Material-UI", level: 90, color: "from-blue-500 to-indigo-600" },
      { name: "Ant Design", level: 75, color: "from-cyan-600 to-blue-700" },
      { name: "Bootstrap", level: 90, color: "from-purple-600 to-pink-600" },
    ]
  },
  {
    title: "Backend & Database",
    skills: [
      { name: "Node.js", level: 70, color: "from-green-600 to-green-800" },
      { name: "JSON & REST APIs", level: 85, color: "from-yellow-600 to-amber-700" }
    ]
  },
  {
    title: "Web3 & Blockchain Technologies",
    skills: [
      { name: "Wallet Connect / Web3Modal", level: 85, color: "from-indigo-500 to-purple-700" },
      { name: "Ethers.js", level: 60, color: "from-purple-500 to-pink-600" },
      { name: "Smart Contract Integration", level: 75, color: "from-blue-600 to-indigo-700" },
      { name: "DeFi Protocols & NFT Collateralization", level: 80, color: "from-green-600 to-green-800" },
      { name: "Moralis API", level: 90, color: "from-teal-500 to-emerald-600" },
    ]
  },
  {
    title: "State Management",
    skills: [
      { name: "Redux Toolkit with Thunk & Saga", level: 90, color: "from-purple-600 to-purple-800" },
      { name: "Context API", level: 85, color: "from-teal-500 to-green-600" },
      { name: "Angular Store (NgRx)", level: 70, color: "from-indigo-600 to-indigo-800" },
    ],
  },
  {
    title: "API Integrations & External Services",
    skills: [
      { name: "Stripe Payment Gateway", level: 80, color: "from-blue-400 to-indigo-700" },
      { name: "Mailchimp Integration", level: 80, color: "from-orange-400 to-red-600" },
      { name: "DocuSign Integration", level: 75, color: "from-yellow-500 to-amber-600" },
      { name: "Moralis API", level: 90, color: "from-teal-500 to-emerald-600" },
      { name: "Persona KYC Integration", level: 90, color: "from-purple-500 to-indigo-600" },
      { name: "Parallel Market Integration", level: 80, color: "from-purple-500 to-indigo-600" },
      { name: "OnRamper Integration", level: 80, color: "from-purple-500 to-indigo-600" },
    ]
  },
  {
    title: "Tools & Frameworks",
    skills: [
      { name: "Git & GitHub", level: 90, color: "from-gray-700 to-gray-900" },
      { name: "Bitbucket", level: 90, color: "from-blue-700 to-indigo-700" },
      { name: "Jira", level: 90, color: "from-blue-500 to-blue-700" },
      { name: "Trello", level: 90, color: "from-teal-400 to-cyan-600" },
      { name: "Slack", level: 90, color: "from-pink-500 to-purple-500" },
      { name: "Figma", level: 85, color: "from-pink-500 to-purple-500" },
      { name: "Confluence", level: 85, color: "from-purple-500 to-purple-700" },
    ]
  },
  {
    title: "Operating Systems",
    skills: [
      { name: "Ubuntu (16/18/20)", level: 90, color: "from-orange-600 to-red-700" },
      { name: "Windows (10/11)", level: 80, color: "from-blue-600 to-indigo-700" },
    ]
  }
];


// Additional Skills
export const ADDITIONAL_SKILLS: string[] = [
  "Responsive Design", "PWA Development","Service Workers", "SEO Optimization", 
  "Performance Optimization", "Code Review", "Team Leadership",
  "Agile Methodologies", "API Integration", "State Management",
  "Testing (Jest, Jasmine / Karma)"
];

// Timeline Data
export const TIMELINE_ITEMS: TimelineItem[] = [
  {
    year: "July 2025 - Present",
    title: "Dev Lead Web Developer",
    company: "Debut Infotech, Mohali",
    description: "Leading development teams and architecting scalable web solutions. Mentoring junior developers and driving technical excellence across multiple projects."
  },
  {
    year: "2023 - July 2025",
    title: "Web Developer",
    company: "Debut Infotech, Mohali",
    description: "Advanced to senior role focusing on complex enterprise applications and blockchain integration. Led multiple full-stack projects and mentored junior team members."
  },
  {
    year: "2021 - 2023",
    title: "Junior Web Developer",
    company: "Debut Infotech, Mohali",
    description: "Started career in web development, focusing on frontend technologies and modern JavaScript frameworks. Gained expertise in Angular, React, and Next.js."
  },
  {
    year: "2016 - 2020",
    title: "B.Tech (CSE)",
    company: "Giani Zail Singh Campus College of Engineering & Technology, Bathinda",
    description: "Graduated with 8.4 CGPA from MRSPTU, Bathinda. Specialized in Computer Science and Engineering with focus on modern web technologies."
  }
];

// Contact Information
export const CONTACT_INFO: ContactInfo[] = [
  {
    title: 'Email',
    value: 'narayansinghbti@gmail.com',
    description: 'Send me an email anytime'
  },
  {
    title: 'Phone',
    value: '+91 98761 62402',
    description: 'Call me for urgent matters'
  },
  {
    title: 'Location',
    value: 'Mohali, Punjab, India',
    description: 'Open to hybrid/remote roles'
  },
  {
    title: 'Whatsapp',
    value: '+91 98761 62402',
    description: 'Whatsapp me for urgent matters'
  }
];

// Social Links
export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/',
    icon: '🐙',
    color: 'from-gray-700 to-gray-900'
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/narayan-singh-993b2012a',
    icon: '💼',
    color: 'from-blue-600 to-blue-800'
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/user1',
    icon: '🐦',
    color: 'from-cyan-500 to-blue-500'
  },
  {
    name: 'Email',
    url: 'mailto:narayansinghbti@gmail.com',
    icon: '📧',
    color: 'from-red-500 to-pink-500'
  },
  {
    name: 'Portfolio',
    url: '#projects',
    icon: '🌐',
    color: 'from-purple-500 to-indigo-500'
  },
  {
    name: 'Resume',
    url: '/resume.pdf',
    icon: '📄',
    color: 'from-green-500 to-emerald-500'
  }
];

// Quick Actions
export const QUICK_ACTIONS = [
  { name: 'Download CV', url: '/resume.pdf' },
  { name: 'View Projects', url: '#projects' },
  { name: 'Contact Me', url: '#contact' },
  { name: 'Blog', url: '/blog' }
];

// Theme Configuration
export const THEME_CONFIG: ThemeConfig = {
  colors: {
    primary: '#3B82F6',
    secondary: '#8B5CF6',
    accent: '#06B6D4',
    background: '#FFFFFF',
    surface: '#F8FAFC',
    text: '#1F2937'
  },
  typography: {
    fontFamily: 'Inter, system-ui, sans-serif',
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem'
    }
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem'
  }
};

// Animation Constants
export const ANIMATION_DURATION = {
  fast: 0.2,
  normal: 0.5,
  slow: 0.8,
  verySlow: 1.2
};

export const ANIMATION_EASING = {
  easeIn: 'ease-in',
  easeOut: 'ease-out',
  easeInOut: 'ease-in-out',
  linear: 'linear'
};

// Breakpoints
export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
};

// Z-Index Scale
export const Z_INDEX = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070
};
