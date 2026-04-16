import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ paths = [] }) => {
  if (!paths || paths.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-6 w-full overflow-x-auto">
      <ol className="flex items-center space-x-2 text-xs md:text-sm text-gray-500 min-w-max">
        {paths.map((path, index) => {
          const isLast = index === paths.length - 1;
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