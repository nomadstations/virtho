import { useState, useEffect } from 'react';

export function useViewMode(storageKey = 'app_view_mode', defaultMode = 'grid') {
  const [viewMode, setViewMode] = useState(() => {
    return localStorage.getItem(storageKey) || defaultMode;
  });

  useEffect(() => {
    localStorage.setItem(storageKey, viewMode);
  }, [viewMode, storageKey]);

  return [viewMode, setViewMode];
}