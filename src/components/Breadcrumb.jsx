import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumb = ({ paths = [], isDashboard = false }) => {
  const location = useLocation();
  
  // Auto-detect if we're in dashboard context based on current route
  const isInDashboard = isDashboard || location.pathname.startsWith('/dashboard') || 
    location.pathname === '/profile' || 
    location.pathname === '/settings' ||
    location.pathname === '/create-project' ||
    location.pathname.startsWith('/project/');

  // Adjust the first breadcrumb item based on dashboard context
  const adjustedPaths = paths.map((path, index) => {
    if (index === 0 && isInDashboard && path.label === 'Home') {
      return {
        ...path,
        label: 'Dashboard home',
        href: '/dashboard'
      };
    }
    return path;
  });

  if (!adjustedPaths || adjustedPaths.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-6 w-full overflow-x-auto">
      <ol className="flex items-center space-x-2 text-xs md:text-sm text-gray-500 min-w-max">
        {adjustedPaths.map((path, index) => {
          const isLast = index === adjustedPaths.length - 1;
          return (
            <li key={index} className="flex items-center">
              {isLast ? (
                <span className="text-gray-900 font-medium truncate" aria-current="page">
                  {path.label}
                </span>
              ) : (
                <>
                  <Link
                    to={path.href}
                    className="hover:text-purple-600 transition-colors truncate"
                  >
                    {path.label}
                  </Link>
                  <span className="mx-2 text-gray-400">/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;