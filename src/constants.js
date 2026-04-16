
export const ROUTES = {
  HOME: '/',
  HEALTH: '/health',
  BLOGS: '/blogs',
  BLOG_DETAIL: '/blog/:slug',
  COMMUNITY: '/community',
  JOBS: '/jobs',
  LEARNING: '/learning',
  MARKETPLACE: '/marketplace',
  PROJECTS: '/projects',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  CONTACT: '/contact',
  SUPPORT: '/support-us',
  TERMS: '/terms',
  PRIVACY: '/privacy',
  COMMUNITY_HUMAN: '/community/human/:id',
  COMMUNITY_GROUP: '/community/group/:id',
  COMMUNITY_ORG: '/community/organization/:id',
  DB_SCHEMA: '/db-schema',
  ORGANIZATIONS: '/organizations',
  GROUPS: '/groups',
};

export const NAV_LINKS = [
  { name: 'Home', path: ROUTES.HOME },
  { name: 'Projects', path: ROUTES.PROJECTS },
  { name: 'Learning', path: ROUTES.LEARNING },
  { 
    name: 'Economy', 
    dropdown: true,
    subLinks: [
      { name: 'Marketplace', path: ROUTES.MARKETPLACE },
      { name: 'Jobs', path: ROUTES.JOBS }
    ]
  },
  { name: 'Health', path: ROUTES.HEALTH },
  { 
    name: 'Social', 
    dropdown: true,
    subLinks: [
      { name: 'Blogs', path: ROUTES.BLOGS },
      { name: 'Communities', path: ROUTES.COMMUNITY }
    ]
  },
];

export const FOOTER_LINKS = [
  { name: 'Contact', path: ROUTES.CONTACT },
  { name: 'Support Us', path: ROUTES.SUPPORT },
  { name: 'Terms of Use', path: ROUTES.TERMS },
  { name: 'Privacy Policy', path: ROUTES.PRIVACY },
  { name: 'Blog', path: ROUTES.BLOGS },
];

export const UI_CONSTANTS = {
  ANIMATION_DURATION: 0.3,
  MOBILE_BREAKPOINT: 768,
  PAGE_SIZE_DEFAULT: 12,
};
