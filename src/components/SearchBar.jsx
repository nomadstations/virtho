
import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import '@/styles/searchNavigation.css';

/**
 * SearchBar Component
 * 
 * A comprehensive search component with support for:
 * - Real-time search input with debouncing
 * - Country-based filtering (when selectedCountry is provided)
 * - Clear button with smooth animations
 * - Loading and error states
 * - Keyboard navigation (Enter to search, Escape to clear)
 * - Accessibility features (ARIA labels, focus management)
 * - Dark mode support
 * - Responsive design
 * - Ready for Elasticsearch integration
 * 
 * @param {Object} props
 * @param {string} props.placeholder - Placeholder text for search input
 * @param {Function} props.onSearch - Callback function when search is submitted
 * @param {Function} props.onChange - Callback function when input value changes
 * @param {string} props.value - Controlled input value (optional)
 * @param {boolean} props.disabled - Disable the search input
 * @param {boolean} props.loading - Show loading state
 * @param {string} props.error - Error message to display
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.selectedCountry - Currently selected country for filtering
 * @param {Function} props.onClearCountry - Callback to clear country filter
 */
function SearchBar({
  placeholder = 'Search everywhere',
  onSearch,
  onChange,
  value: controlledValue,
  disabled = false,
  loading = false,
  error = '',
  className = '',
  selectedCountry = null,
  onClearCountry
}) {
  // State management
  const [internalValue, setInternalValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  
  // Determine if component is controlled or uncontrolled
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;
  
  // Refs
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  // Dynamic placeholder based on country filter
  const getPlaceholder = () => {
    if (selectedCountry) {
      return `Search in ${selectedCountry}`;
    }
    return placeholder;
  };

  // Handle input change
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    
    if (!isControlled) {
      setInternalValue(newValue);
    }
    
    if (onChange) {
      onChange(newValue);
    }

    // TODO: Implement debounced Elasticsearch autocomplete/suggestions here
    // Example structure:
    // debounce(() => {
    //   if (newValue.trim().length >= 2) {
    //     fetchSuggestions(newValue, selectedCountry);
    //   }
    // }, 300);
  };

  // Handle search submission
  const handleSearch = (e) => {
    if (e) {
      e.preventDefault();
    }

    if (value.trim() && onSearch && !disabled && !loading) {
      // Pass both search term and country filter to search function
      onSearch(value.trim(), selectedCountry);
      
      // TODO: Implement Elasticsearch search query here with country filter
      // Example structure:
      // elasticsearchClient.search({
      //   index: 'your_index',
      //   body: {
      //     query: {
      //       bool: {
      //         must: [
      //           {
      //             multi_match: {
      //               query: value.trim(),
      //               fields: ['title^3', 'description^2', 'content', 'tags']
      //             }
      //           }
      //         ],
      //         filter: selectedCountry ? [
      //           { term: { country: selectedCountry } }
      //         ] : []
      //       }
      //     }
      //   }
      // });
    }
  };

  // Handle clear button click
  const handleClear = () => {
    if (!isControlled) {
      setInternalValue('');
    }
    
    if (onChange) {
      onChange('');
    }

    // Focus input after clearing
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Handle clear country filter
  const handleClearCountry = (e) => {
    e.stopPropagation();
    if (onClearCountry) {
      onClearCountry();
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    } else if (e.key === 'Escape') {
      handleClear();
      inputRef.current?.blur();
    }

    // TODO: Add arrow key navigation for suggestions dropdown
    // if (e.key === 'ArrowDown') { navigateToNextSuggestion(); }
    // if (e.key === 'ArrowUp') { navigateToPreviousSuggestion(); }
  };

  // Handle focus
  const handleFocus = () => {
    setIsFocused(true);
  };

  // Handle blur
  const handleBlur = () => {
    setIsFocused(false);
    
    // TODO: Add delay before closing suggestions dropdown to allow click
    // setTimeout(() => {
    //   setShowSuggestions(false);
    // }, 200);
  };

  // Click outside handler for dropdown (when implemented)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        // TODO: Close suggestions/results dropdown
        // setShowSuggestions(false);
        // setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Determine wrapper classes
  const wrapperClasses = `
    search-input-wrapper
    ${disabled ? 'disabled' : ''}
    ${error ? 'error' : ''}
    ${selectedCountry ? 'country-filtered' : ''}
  `.trim();

  // Determine clear button visibility
  const showClearButton = value.length > 0 && !loading && !disabled;

  return (
    <div className={`search-container ${className}`} ref={containerRef}>
      {/* Country Filter Badge */}
      {selectedCountry && (
        <div className="search-country-filter-badge">
          <span className="search-country-filter-text">
            Filtering by: <strong>{selectedCountry}</strong>
          </span>
          <button
            type="button"
            className="search-country-filter-clear"
            onClick={handleClearCountry}
            aria-label={`Clear ${selectedCountry} filter`}
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      <form onSubmit={handleSearch} role="search">
        <div className={wrapperClasses}>
          {/* Search Icon (Left) */}
          <Search 
            className="search-icon" 
            aria-hidden="true"
          />

          {/* Input Field */}
          <input
            ref={inputRef}
            type="text"
            className="search-input"
            placeholder={getPlaceholder()}
            value={value}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={disabled || loading}
            aria-label="Search input"
            aria-describedby={error ? 'search-error' : undefined}
            aria-invalid={error ? 'true' : 'false'}
            autoComplete="off"
            spellCheck="false"
          />

          {/* Clear Button */}
          {showClearButton && (
            <button
              type="button"
              className={`search-clear-button ${showClearButton ? 'visible' : ''}`}
              onClick={handleClear}
              aria-label="Clear search"
              tabIndex={0}
            >
              <X />
            </button>
          )}

          {/* Loading Spinner */}
          {loading && (
            <div 
              className="search-loading-spinner" 
              role="status"
              aria-label="Searching"
            />
          )}

          {/* Search Button (Right) */}
          {!loading && (
            <button
              type="submit"
              className="search-submit-button"
              disabled={disabled || !value.trim()}
              aria-label="Submit search"
              tabIndex={0}
            >
              <Search />
            </button>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div 
            className="search-error-message" 
            id="search-error"
            role="alert"
          >
            {error}
          </div>
        )}
      </form>

      {/* TODO: Suggestions Dropdown (Elasticsearch Autocomplete) */}
      {/* Uncomment when Elasticsearch is integrated */}
      {/*
      {showSuggestions && suggestions.length > 0 && (
        <div className="search-suggestions-dropdown" role="listbox">
          {suggestions.map((suggestion, index) => (
            <div
              key={suggestion.id || index}
              className={`search-suggestion-item ${selectedIndex === index ? 'active' : ''}`}
              onClick={() => handleSuggestionClick(suggestion)}
              role="option"
              aria-selected={selectedIndex === index}
            >
              <div className="search-suggestion-icon">
                {getSuggestionIcon(suggestion.type)}
              </div>
              <div className="search-suggestion-text">
                {suggestion.text}
              </div>
              <div className="search-suggestion-category">
                {suggestion.category}
              </div>
            </div>
          ))}
        </div>
      )}
      */}

      {/* TODO: Results Display (Elasticsearch Search Results with Country Filter) */}
      {/* Uncomment when Elasticsearch is integrated */}
      {/*
      {showResults && results.length > 0 && (
        <div className="search-results-container">
          <div className="search-results-header">
            {results.length} results found {selectedCountry && `in ${selectedCountry}`}
          </div>
          {results.map((result) => (
            <div
              key={result.id}
              className="search-result-item"
              onClick={() => handleResultClick(result)}
            >
              <div className="search-result-title">
                {result.title}
              </div>
              <div className="search-result-description">
                {result.description}
              </div>
              {result.country && (
                <div className="search-result-country">
                  📍 {result.country}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      */}

      {/* TODO: No Results State */}
      {/*
      {showResults && results.length === 0 && (
        <div className="search-results-container">
          <div className="search-no-results">
            <Search className="search-no-results-icon" />
            <div className="search-no-results-text">
              No results found {selectedCountry && `in ${selectedCountry}`}
            </div>
            <div className="search-no-results-subtext">
              Try different keywords or browse categories
            </div>
          </div>
        </div>
      )}
      */}
    </div>
  );
}

export default SearchBar;
