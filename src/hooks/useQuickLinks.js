import { useState, useEffect, useCallback } from 'react';
import { Building2, Users, UserCircle, KeyRound as UsersRound, FolderKanban, MessageCircle, Briefcase, GraduationCap, BookOpen, ShoppingBag } from 'lucide-react';

const STORAGE_KEY = 'virtho_quick_links';

const DEFAULT_QUICK_LINKS = ['Organizations', 'Groups', 'Users'];

const AVAILABLE_ENTITIES = [
  { id: 'organizations', name: 'Organizations', icon: Building2, path: '/organizations', category: 'Management' },
  { id: 'groups', name: 'Groups', icon: Users, path: '/groups', category: 'Management' },
  { id: 'users', name: 'Users', icon: UserCircle, path: '/dashboard', category: 'Management' },
  { id: 'teams', name: 'Teams', icon: UsersRound, path: '/dashboard', category: 'Management' },
  { id: 'projects', name: 'Projects', icon: FolderKanban, path: '/projects', category: 'Content' },
  { id: 'communities', name: 'Communities', icon: MessageCircle, path: '/community', category: 'Content' },
  { id: 'jobs', name: 'Jobs', icon: Briefcase, path: '/jobs', category: 'Content' },
  { id: 'learning', name: 'Learning', icon: GraduationCap, path: '/learning', category: 'Content' },
  { id: 'blogs', name: 'Blogs', icon: BookOpen, path: '/blogs', category: 'Content' },
  { id: 'marketplace', name: 'Marketplace', icon: ShoppingBag, path: '/marketplace', category: 'Content' },
];

export function useQuickLinks() {
  console.log('[useQuickLinks] Hook initialization');
  const [quickLinks, setQuickLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('[useQuickLinks/useEffect] Loading quick links from localStorage');
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      console.log('[useQuickLinks/useEffect] Raw localStorage value:', stored);
      
      if (stored) {
        const parsedLinks = JSON.parse(stored);
        console.log('[useQuickLinks/useEffect] Parsed links:', parsedLinks);
        console.log('[useQuickLinks/useEffect] Parsed links type:', typeof parsedLinks);
        console.log('[useQuickLinks/useEffect] Parsed links isArray:', Array.isArray(parsedLinks));
        
        const validLinks = AVAILABLE_ENTITIES.filter(entity => 
          parsedLinks.includes(entity.name)
        );
        console.log('[useQuickLinks/useEffect] Valid links:', validLinks);
        console.log('[useQuickLinks/useEffect] Valid links count:', validLinks.length);
        setQuickLinks(validLinks);
      } else {
        console.log('[useQuickLinks/useEffect] No stored data, using defaults');
        const defaultLinks = AVAILABLE_ENTITIES.filter(entity => 
          DEFAULT_QUICK_LINKS.includes(entity.name)
        );
        console.log('[useQuickLinks/useEffect] Default links:', defaultLinks);
        console.log('[useQuickLinks/useEffect] Default links count:', defaultLinks.length);
        setQuickLinks(defaultLinks);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_QUICK_LINKS));
      }
    } catch (error) {
      console.error('[useQuickLinks/useEffect] Error loading quick links:', error);
      const defaultLinks = AVAILABLE_ENTITIES.filter(entity => 
        DEFAULT_QUICK_LINKS.includes(entity.name)
      );
      console.log('[useQuickLinks/useEffect] Using defaults after error:', defaultLinks);
      setQuickLinks(defaultLinks);
    } finally {
      setIsLoading(false);
      console.log('[useQuickLinks/useEffect] Loading complete');
    }
  }, []);

  useEffect(() => {
    console.log('[useQuickLinks] quickLinks state updated:', quickLinks);
    console.log('[useQuickLinks] quickLinks count:', quickLinks.length);
  }, [quickLinks]);

  const saveToLocalStorage = useCallback((links) => {
    console.log('[useQuickLinks/saveToLocalStorage] Saving links:', links);
    try {
      const linkNames = links.map(link => link.name);
      console.log('[useQuickLinks/saveToLocalStorage] Link names:', linkNames);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(linkNames));
      console.log('[useQuickLinks/saveToLocalStorage] Save successful');
    } catch (error) {
      console.error('[useQuickLinks/saveToLocalStorage] Error:', error);
    }
  }, []);

  const getQuickLinks = useCallback(() => {
    console.log('[useQuickLinks/getQuickLinks] Returning quickLinks:', quickLinks);
    return quickLinks;
  }, [quickLinks]);

  const addQuickLink = useCallback((entity) => {
    console.log('[useQuickLinks/addQuickLink] Adding entity:', entity);
    setQuickLinks(prev => {
      const exists = prev.some(link => link.id === entity.id);
      console.log('[useQuickLinks/addQuickLink] Entity exists:', exists);
      if (exists) return prev;
      
      const updated = [...prev, entity];
      console.log('[useQuickLinks/addQuickLink] Updated links:', updated);
      saveToLocalStorage(updated);
      return updated;
    });
  }, [saveToLocalStorage]);

  const removeQuickLink = useCallback((entity) => {
    console.log('[useQuickLinks/removeQuickLink] Removing entity:', entity);
    setQuickLinks(prev => {
      const updated = prev.filter(link => link.id !== entity.id);
      console.log('[useQuickLinks/removeQuickLink] Updated links:', updated);
      saveToLocalStorage(updated);
      return updated;
    });
  }, [saveToLocalStorage]);

  const updateQuickLinks = useCallback((selectedEntities) => {
    console.log('[useQuickLinks/updateQuickLinks] Updating with entities:', selectedEntities);
    const validLinks = AVAILABLE_ENTITIES.filter(entity => 
      selectedEntities.some(selected => selected.id === entity.id)
    );
    console.log('[useQuickLinks/updateQuickLinks] Valid links:', validLinks);
    console.log('[useQuickLinks/updateQuickLinks] Valid links count:', validLinks.length);
    setQuickLinks(validLinks);
    saveToLocalStorage(validLinks);
  }, [saveToLocalStorage]);

  console.log('[useQuickLinks] Returning state - quickLinks count:', quickLinks.length);
  console.log('[useQuickLinks] Returning state - isLoading:', isLoading);

  return {
    quickLinks,
    availableEntities: AVAILABLE_ENTITIES,
    addQuickLink,
    removeQuickLink,
    updateQuickLinks,
    isLoading,
    getQuickLinks
  };
}