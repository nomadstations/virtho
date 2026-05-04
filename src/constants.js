
// Navigation and Route Constants

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  HEALTH_WELLNESS: '/health/wellness',
  HEALTH_ID: '/health/health-id',
  HEALTH_LEGAL: '/health/legal-and-insurance',
  LEARNING: '/learning',
  BLOGS: '/blogs',
  BLOG_DETAIL: '/blog/:slug',
  JOBS: '/jobs',
  MARKETPLACE: '/marketplace',
  PROJECTS: '/projects',
  COMMUNITY: '/community',
  ORGANIZATIONS: '/organizations',
  GROUPS: '/groups',
  GALLERY: '/gallery',
  CONTACT: '/contact',
  SUPPORT: '/support-us',
  TERMS: '/terms',
  PRIVACY: '/privacy',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  SETTINGS: '/settings',
};

export const NAV_LINKS = [
  { 
    name: 'Home', 
    path: ROUTES.HOME 
  },
  {
    name: 'Health',
    dropdown: true,
    subLinks: [
      { name: 'Wellness', path: ROUTES.HEALTH_WELLNESS },
      { name: 'Health ID', path: ROUTES.HEALTH_ID },
      { name: 'Legal & Insurance', path: ROUTES.HEALTH_LEGAL }
    ]
  },
  {
    name: 'Knowledge',
    dropdown: true,
    subLinks: [
      { name: 'Learning', path: ROUTES.LEARNING },
      { name: 'Blogs', path: ROUTES.BLOGS },
      { name: 'Gallery', path: ROUTES.GALLERY }
    ]
  },
  {
    name: 'Economy',
    dropdown: true,
    subLinks: [
      { name: 'Jobs', path: ROUTES.JOBS },
      { name: 'Marketplace', path: ROUTES.MARKETPLACE },
      { name: 'Projects', path: ROUTES.PROJECTS }
    ]
  },
  {
    name: 'Social',
    dropdown: true,
    subLinks: [
      { name: 'Community', path: ROUTES.COMMUNITY },
      { name: 'Organizations', path: ROUTES.ORGANIZATIONS },
      { name: 'Groups', path: ROUTES.GROUPS }
    ]
  }
];

export const FOOTER_LINKS = [
  { name: 'Contact', path: ROUTES.CONTACT },
  { name: 'About', path: ROUTES.ABOUT },
  { name: 'Support Us', path: ROUTES.SUPPORT },
  { name: 'Terms of Service', path: ROUTES.TERMS },
  { name: 'Privacy Policy', path: ROUTES.PRIVACY }
];
