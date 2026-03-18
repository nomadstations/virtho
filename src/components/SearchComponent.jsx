import React from 'react';
import { Search, X } from 'lucide-react';

/**
 * A reusable search input component with standardized styling and behavior.
 */
export default function SearchComponent({ 
  value, 
  onChange, 
  onSearch, 
  placeholder = "Search...", 
  className = "",
  clearable = true 
}) {
  const handleChange = (e) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  const handleClear = () => {
    if (onChange) {
      onChange('');
    }
    // Auto-trigger search submission on clear if onSearch is provided
    if (onSearch) {
      onSearch('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`search-component ${className}`}>
      <div className="search-icon-wrapper">
        <Search className="search-icon" />
      </div>
      <input
        type="text"
        value={value || ''}
        onChange={handleChange}
        placeholder={placeholder}
        className="search-input"
      />
      {clearable && value && (
        <button
          type="button"
          onClick={handleClear}
          className="search-clear-btn"
          aria-label="Clear search"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </form>
  );
}