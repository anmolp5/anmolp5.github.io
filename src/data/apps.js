/**
 * Applications & Websites Registry
 * 
 * To add a new website to your launchpad in the future, simply copy and paste
 * an entry in the APPS array below and update the fields:
 * 
 * {
 *   id: 'unique-id',
 *   title: 'Application Title',
 *   subtitle: 'Short Catchy Subtitle',
 *   description: '1-2 sentence description of what the project does.',
 *   url: 'https://anmolprabhakar.com/your-app-path/',
 *   tags: ['Tag 1', 'Tag 2'],
 *   badge: 'Live', // e.g. 'Live', 'Beta', 'Active', 'Demo'
 *   icon: 'cube', // options: 'dumbbell', 'cube', 'remote', 'printer', 'hexagon', 'sparkles', 'globe', 'terminal', 'cpu'
 *   accent: '#8b5cf6', // Hex color used for card glow accents and badges
 *   external: true, // true to open in new tab, false to navigate in-app
 * }
 */

export const APPS = [
  {
    id: 'partial-plus',
    title: 'Partial+',
    subtitle: 'Workout Tracking PWA',
    description: 'Progressive Web App for tracking progressive overload, routine customization, and multi-year training volume.',
    url: 'https://anmolprabhakar.com/partial-plus/',
    tags: ['PWA', 'Fitness', 'Mobile-First'],
    badge: 'Live',
    icon: 'dumbbell',
    accent: '#f59e0b',
    external: true,
  },
  {
    id: 'portfolio',
    title: 'Engineering Portfolio',
    subtitle: '3D Interactive Workspace',
    description: 'Interactive 3D maker portfolio showcasing mechanical CAD, embedded robotics, firmware, and software engineering builds.',
    url: '/',
    tags: ['3D WebGL', 'Three.js', 'Hardware'],
    badge: 'Active',
    icon: 'cube',
    accent: '#8b5cf6',
    external: false,
  },
  {
    id: 'universal-remote',
    title: 'Universal Remote',
    subtitle: 'IoT Hardware Controller',
    description: 'Cloud and web interface for ESP32 & IR automation, smart home touch lamp control, and connected IoT triggers.',
    url: 'https://anmolprabhakar.com/universal-remote/',
    tags: ['IoT', 'ESP32', 'Firmware'],
    badge: 'Live',
    icon: 'remote',
    accent: '#06b6d4',
    external: true,
  },
  {
    id: 'printerqueue',
    title: 'Printer Queue',
    subtitle: '3D Print Dispatch Manager',
    description: 'Static Next.js queue management system for scheduling, tracking, and prioritizing 3D print jobs across machines.',
    url: 'https://anmolprabhakar.com/printerqueue/',
    tags: ['Next.js', '3D Printing', 'Productivity'],
    badge: 'Live',
    icon: 'printer',
    accent: '#10b981',
    external: true,
  },
  {
    id: 'catangen',
    title: 'CatanGen',
    subtitle: 'Board Generator & Analytics',
    description: 'Algorithmic map and resource distribution generator for the Settlers of Catan board game.',
    url: 'https://anmolprabhakar.com/catangen/',
    tags: ['Game Dev', 'Algorithms', 'Web Tool'],
    badge: 'Live',
    icon: 'hexagon',
    accent: '#f43f5e',
    external: true,
  }
];
