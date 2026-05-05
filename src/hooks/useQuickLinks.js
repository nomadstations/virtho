
import { useState, useEffect } from 'react';
import { 
  ALL_QUICK_LINKS, 
  DEFAULT_SELECTED_QUICK_LINKS,
  validateQuickLinksConfig 
} from '@/constants/quickLinksConfig';

/**
 * Custom hook for managing quick links state
 * Handles loading, saving, and updating quick links from localStorage
 */
export function useQuickLinks() {
  console.log('[useQuickLinks] Initializing hook');
  console.log('[useQuickLinks] Available entities:', ALL_QUICK_LINKS?.length);

  // Validate configuration on initialization
  useEffect(() => {
    const errors = validateQuickLinksConfig();
    if (errors.length > 0) {
      console.error('[useQuickLinks] Configuration validation failed:', errors);
    }
  }, []);

  // Initialize quick links from localStorage or defaults
  const [quickLinks, setQuickLinks] = useState(() => {
    console.log('[useQuickLinks] Loading initial quick links');
    const saved = localStorage.getItem('dashboardQuickLinks');
    
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        console.log('[useQuickLinks] Found saved quick links:', parsed);
        
        // Map saved IDs back to full link objects with icons
        const loadedLinks = parsed
          .map(id => ALL_QUICK_LINKS.find(link => link.id === id))
          .filter(Boolean); // Remove any undefined entries
        
        console.log('[useQuickLinks] Loaded quick links:', loadedLinks.length);
        return loadedLinks;
      } catch (error) {
        console.error('[useQuickLinks] Error parsing saved quick links:', error);
        // Fallback to defaults if parsing fails
        const defaults = DEFAULT_SELECTED_QUICK_LINKS
          .map(id => ALL_QUICK_LINKS.find(link => link.id === id))
          .filter(Boolean);
        console.log('[useQuickLinks] Using default quick links:', defaults.length);
        return defaults;
      }
    }
    
    // No saved data - use defaults
    const defaults = DEFAULT_SELECTED_QUICK_LINKS
      .map(id => ALL_QUICK_LINKS.find(link => link.id === id))
      .filter(Boolean);
    console.log('[useQuickLinks] No saved data, using defaults:', defaults.length);
    return defaults;
  });

  /**
   * Update quick links and persist to localStorage
   * @param {Array} newLinks - Array of quick link entities
   */
  const updateQuickLinks = (newLinks) => {
    console.log('[useQuickLinks] Updating quick links:', newLinks?.length);
    setQuickLinks(newLinks);
    
    // Save only IDs to localStorage
    const linkIds = newLinks.map(link => link.id);
    localStorage.setItem('dashboardQuickLinks', JSON.stringify(linkIds));
    console.log('[useQuickLinks] Saved to localStorage:', linkIds);
  };

  /**
   * Reset quick links to default configuration
   */
  const resetToDefaults = () => {
    console.log('[useQuickLinks] Resetting to defaults');
    const defaults = DEFAULT_SELECTED_QUICK_LINKS
      .map(id => ALL_QUICK_LINKS.find(link => link.id === id))
      .filter(Boolean);
    
    setQuickLinks(defaults);
    const linkIds = defaults.map(link => link.id);
    localStorage.setItem('dashboardQuickLinks', JSON.stringify(linkIds));
    console.log('[useQuickLinks] Reset complete:', defaults.length);
  };

  /**
   * Get navigation entities only
   */
  const getNavigationLinks = () => {
    return ALL_QUICK_LINKS.filter(link => link.type === 'navigation');
  };

  /**
   * Get action entities only
   */
  const getActionLinks = () => {
    return ALL_QUICK_LINKS.filter(link => link.type === 'action');
  };

  console.log('[useQuickLinks] Current state:');
  console.log('  - Selected quick links:', quickLinks?.length);
  console.log('  - Available entities:', ALL_QUICK_LINKS?.length);
  console.log('  - Navigation entities:', getNavigationLinks()?.length);
  console.log('  - Action entities:', getActionLinks()?.length);

  return {
    quickLinks,
    updateQuickLinks,
    resetToDefaults,
    availableEntities: ALL_QUICK_LINKS, // Used by ManageQuickLinksModal
    availableLinks: ALL_QUICK_LINKS, // Backward compatibility
    navigationLinks: getNavigationLinks(),
    actionLinks: getActionLinks()
  };
}
