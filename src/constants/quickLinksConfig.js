
/**
 * Quick Links Configuration
 * 
 * This file defines all available quick link entities for the dashboard.
 * Each entity can be either a navigation link or an action trigger.
 * 
 * Entity Structure:
 * {
 *   id: string - Unique identifier
 *   name: string - Display name shown in UI
 *   icon: Component - Lucide React icon component
 *   type: 'navigation' | 'action' - Type of entity
 *   category: string - Category for grouping in settings modal
 *   path?: string - Route path (for navigation type)
 *   action?: string - Action identifier (for action type)
 *   description?: string - Optional description for tooltips
 * }
 * 
 * Categories:
 * - "Navigation" - Links to different pages/sections
 * - "Actions" - Quick action triggers (modals, forms, etc.)
 */

import { LayoutDashboard, FolderKanban, BookOpen, Briefcase, Users, ShoppingBag, Settings, FileText, Building2, KeyRound as UsersRound, UserPlus, FolderPlus, UserCog, PenSquare, Calendar, Package, GraduationCap, Briefcase as BriefcaseBusiness, Image as Images, User, Network } from 'lucide-react';

/**
 * All available quick link entities
 * Add new entities here following the structure above
 */
export const ALL_QUICK_LINKS = [
  // ===== NAVIGATION ENTITIES =====
  {
    id: 'dashboard',
    name: 'Dashboard',
    icon: LayoutDashboard,
    type: 'navigation',
    category: 'Navigation',
    path: '/dashboard',
    description: 'View your dashboard overview'
  },
  {
    id: 'projects',
    name: 'Projects',
    icon: FolderKanban,
    type: 'navigation',
    category: 'Navigation',
    path: '/projects-management',
    description: 'Manage your projects'
  },
  {
    id: 'blogs',
    name: 'Blogs',
    icon: FileText,
    type: 'navigation',
    category: 'Navigation',
    path: '/blogs',
    description: 'Read and manage blog posts'
  },
  {
    id: 'learning',
    name: 'Learning',
    icon: BookOpen,
    type: 'navigation',
    category: 'Navigation',
    path: '/learning',
    description: 'Access learning resources and courses'
  },
  {
    id: 'jobs',
    name: 'Jobs',
    icon: Briefcase,
    type: 'navigation',
    category: 'Navigation',
    path: '/jobs',
    description: 'Browse job opportunities'
  },
  {
    id: 'community',
    name: 'Community',
    icon: Users,
    type: 'navigation',
    category: 'Navigation',
    path: '/community',
    description: 'Connect with the community'
  },
  {
    id: 'marketplace',
    name: 'Marketplace',
    icon: ShoppingBag,
    type: 'navigation',
    category: 'Navigation',
    path: '/marketplace',
    description: 'Browse and shop products'
  },
  {
    id: 'organizations',
    name: 'Organizations',
    icon: Building2,
    type: 'navigation',
    category: 'Navigation',
    path: '/organizations',
    description: 'View and manage organizations'
  },
  {
    id: 'groups',
    name: 'Groups',
    icon: UsersRound,
    type: 'navigation',
    category: 'Navigation',
    path: '/groups',
    description: 'Manage your groups'
  },
  {
    id: 'users',
    name: 'Users',
    icon: UserPlus,
    type: 'navigation',
    category: 'Navigation',
    path: '/users',
    description: 'View user directory'
  },
  {
    id: 'teams',
    name: 'Teams',
    icon: Network,
    type: 'navigation',
    category: 'Navigation',
    path: '/teams',
    description: 'Manage your teams'
  },
  {
    id: 'gallery',
    name: 'Gallery',
    icon: Images,
    type: 'navigation',
    category: 'Navigation',
    path: '/gallery',
    description: 'View photo gallery'
  },
  {
    id: 'profile',
    name: 'Profile',
    icon: User,
    type: 'navigation',
    category: 'Navigation',
    path: '/profile',
    description: 'View your profile'
  },
  {
    id: 'settings',
    name: 'Settings',
    icon: Settings,
    type: 'navigation',
    category: 'Navigation',
    path: '/settings',
    description: 'Manage your settings'
  },

  // ===== ACTION ENTITIES =====
  {
    id: 'create-organization',
    name: 'Create Organization',
    icon: Building2,
    type: 'action',
    category: 'Actions',
    action: 'create-organization',
    description: 'Create a new organization'
  },
  {
    id: 'create-group',
    name: 'Create Group',
    icon: UsersRound,
    type: 'action',
    category: 'Actions',
    action: 'create-group',
    description: 'Create a new group'
  },
  {
    id: 'create-project',
    name: 'Create Project',
    icon: FolderPlus,
    type: 'action',
    category: 'Actions',
    action: 'create-project',
    description: 'Start a new project'
  },
  {
    id: 'create-team',
    name: 'Create Team',
    icon: UserCog,
    type: 'action',
    category: 'Actions',
    action: 'create-team',
    description: 'Create a new team'
  },
  {
    id: 'create-post',
    name: 'Write a Post',
    icon: PenSquare,
    type: 'action',
    category: 'Actions',
    action: 'create-post',
    description: 'Write a new blog post'
  },
  {
    id: 'create-event',
    name: 'Create Event',
    icon: Calendar,
    type: 'action',
    category: 'Actions',
    action: 'create-event',
    description: 'Create a new event'
  },
  {
    id: 'add-product',
    name: 'Add Product',
    icon: Package,
    type: 'action',
    category: 'Actions',
    action: 'add-product',
    description: 'Add a new product to marketplace'
  },
  {
    id: 'add-course',
    name: 'Add Course',
    icon: GraduationCap,
    type: 'action',
    category: 'Actions',
    action: 'add-course',
    description: 'Create a new course'
  },
  {
    id: 'post-job',
    name: 'Post a Job',
    icon: BriefcaseBusiness,
    type: 'action',
    category: 'Actions',
    action: 'post-job',
    description: 'Post a new job opening'
  }
];

/**
 * Default quick links shown on initial dashboard load
 * These are pre-selected for new users
 */
export const DEFAULT_SELECTED_QUICK_LINKS = [
  'dashboard',
  'projects',
  'blogs',
  'learning',
  'community'
];

/**
 * Maximum number of quick links that can be selected
 * Set to null for unlimited
 */
export const MAX_QUICK_LINKS = null;

/**
 * Validate quick links configuration
 * Ensures all entities have required fields
 */
export function validateQuickLinksConfig() {
  const errors = [];

  if (!ALL_QUICK_LINKS || ALL_QUICK_LINKS.length === 0) {
    errors.push('ALL_QUICK_LINKS is empty or undefined');
    return errors;
  }

  ALL_QUICK_LINKS.forEach((entity, index) => {
    if (!entity.id) errors.push(`Entity at index ${index} missing 'id'`);
    if (!entity.name) errors.push(`Entity at index ${index} missing 'name'`);
    if (!entity.icon) errors.push(`Entity at index ${index} missing 'icon'`);
    if (!entity.type) errors.push(`Entity at index ${index} missing 'type'`);
    if (!entity.category) errors.push(`Entity at index ${index} missing 'category'`);
    
    if (entity.type === 'navigation' && !entity.path) {
      errors.push(`Navigation entity '${entity.id}' missing 'path'`);
    }
    if (entity.type === 'action' && !entity.action) {
      errors.push(`Action entity '${entity.id}' missing 'action'`);
    }
  });

  return errors;
}

// Run validation in development
if (import.meta.env.DEV) {
  const validationErrors = validateQuickLinksConfig();
  if (validationErrors.length > 0) {
    console.error('[quickLinksConfig] Validation errors:', validationErrors);
  } else {
    console.log('[quickLinksConfig] Configuration validated successfully');
    console.log(`[quickLinksConfig] Total entities: ${ALL_QUICK_LINKS.length}`);
    console.log(`[quickLinksConfig] Navigation: ${ALL_QUICK_LINKS.filter(e => e.type === 'navigation').length}`);
    console.log(`[quickLinksConfig] Actions: ${ALL_QUICK_LINKS.filter(e => e.type === 'action').length}`);
  }
}
