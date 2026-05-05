
export const getPublicBreadcrumbLabel = (pathname) => {
  // Static route mappings
  const routeMap = {
    '/': 'Home',
    '/about': 'About',
    '/contact': 'Contact',
    '/blogs': 'Blogs',
    '/learning': 'Learning',
    '/jobs': 'Jobs',
    '/community': 'Community',
    '/marketplace': 'Marketplace',
    '/projects': 'Projects',
    '/gallery': 'Gallery',
    '/organizations': 'Organizations',
    '/groups': 'Groups',
    '/support-us': 'Support Us',
    '/terms': 'Terms',
    '/privacy': 'Privacy',
    '/store': 'Store',
    '/db-schema': 'Database Schema',
  };

  // Check for exact match first
  if (routeMap[pathname]) {
    return routeMap[pathname];
  }

  // Handle dynamic routes
  const pathSegments = pathname.split('/').filter(Boolean);
  
  // Handle /blog/:slug
  if (pathSegments[0] === 'blog' && pathSegments.length === 2) {
    return 'Blog Post';
  }

  // Handle /project/:id
  if (pathSegments[0] === 'project' && pathSegments.length === 2) {
    return 'Project Details';
  }

  // Handle /product/:id
  if (pathSegments[0] === 'product' && pathSegments.length === 2) {
    return 'Product Details';
  }

  // Handle /job/:id
  if (pathSegments[0] === 'job' && pathSegments.length === 2) {
    return 'Job Details';
  }

  // Handle /course/:id or /learning/:id
  if ((pathSegments[0] === 'course' || pathSegments[0] === 'learning') && pathSegments.length === 2) {
    return 'Course Details';
  }

  // Handle /organization/:id
  if (pathSegments[0] === 'organization' && pathSegments.length === 2) {
    return 'Organization';
  }

  // Handle /group/:id
  if (pathSegments[0] === 'group' && pathSegments.length === 2) {
    return 'Group';
  }

  // Handle /human/:id
  if (pathSegments[0] === 'human' && pathSegments.length === 2) {
    return 'Profile';
  }

  // Default fallback
  return pathSegments[pathSegments.length - 1]
    ?.split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ') || 'Page';
};

export const generatePublicBreadcrumbs = (pathname) => {
  const crumbs = [
    { label: 'Home', path: '/' }
  ];

  if (pathname === '/') {
    return crumbs;
  }

  const pathSegments = pathname.split('/').filter(Boolean);
  let currentPath = '';

  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    
    const label = getPublicBreadcrumbLabel(currentPath);
    crumbs.push({
      label,
      path: currentPath
    });
  });

  return crumbs;
};
