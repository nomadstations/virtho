import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchComponent from './SearchComponent';

/**
 * @deprecated Use SearchComponent directly for all new feature implementations.
 * This file is kept as a wrapper for backward compatibility, specifically for 
 * scenarios relying on the global search behavior with internal routing.
 */
function SearchBar({ value, onChange, placeholder, className }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  // Act as a proxy to SearchComponent if explicitly controlled
  if (value !== undefined || onChange) {
    return (
      <SearchComponent 
        value={value} 
        onChange={onChange} 
        placeholder={placeholder} 
        className={className} 
      />
    );
  }

  // Legacy global search behavior
  const handleGlobalSearch = (val) => {
    if (val.trim()) {
      navigate(`/projects?search=${encodeURIComponent(val)}`);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto -mt-8 relative z-10 px-4">
      <SearchComponent
        value={query}
        onChange={setQuery}
        onSearch={handleGlobalSearch}
        placeholder={placeholder || "Search projects, jobs, courses, communities..."}
        className="shadow-lg hover:shadow-xl transition-all rounded-xl"
      />
    </div>
  );
}

export default SearchBar;