import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import keycloak from '@/lib/keycloak';
import { virthoApi } from '@/lib/virthoApi';
import { useToast } from '@/hooks/use-toast';
import { setActiveEntityId, clearActiveEntityId } from '@/lib/activeEntityStore';

const EMPTY_DASHBOARD = {
  blogs: [],
  projects: [],
  events: [],
  products: [],
  portfolios: [],
  teams: [],
  activities: [],
};

const AuthContext = createContext({
  currentUser: null,
  backendUser: null,
  backendSyncError: null,

  myEntities: [],
  myEntitiesError: null,
  isEntitiesLoading: false,

  activeEntity: null,
  activeEntityError: null,
  isSelectingActiveEntity: false,

  isAuthenticated: false,
  isLoading: true,

  login: () => {},
  register: () => {},
  logout: () => {},

  syncMeWithBackend: () => {},
  loadMyEntities: () => {},
  selectActiveEntity: () => {},

  updateUserProfile: () => {},
  uploadProfilePicture: () => {},
  archiveUserAccount: () => {},

  keycloak: null,
  dashboardData: EMPTY_DASHBOARD,

  addBlog: () => {},
  updateBlog: () => {},
  deleteBlog: () => {},
  addProject: () => {},
  updateProject: () => {},
  deleteProject: () => {},
  addEvent: () => {},
  updateEvent: () => {},
  deleteEvent: () => {},
  addProduct: () => {},
  updateProduct: () => {},
  deleteProduct: () => {},
  addPortfolioItem: () => {},
  updatePortfolioItem: () => {},
  deletePortfolioItem: () => {},
  addTeam: () => {},
  updateTeam: () => {},
  deleteTeam: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

function normalizeEntitiesResponse(response) {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.data)) return response.data;
  return [];
}

// Build a user object from Keycloak token claims.
function buildUserFromToken() {
  const t = keycloak.tokenParsed ?? {};
  const fullName =
    t.name ||
    `${t.given_name ?? ''} ${t.family_name ?? ''}`.trim() ||
    t.preferred_username ||
    t.email ||
    'User';

  return {
    id: keycloak.subject,
    email: t.email,
    name: fullName,
    username: t.preferred_username,
    roles: t.realm_access?.roles ?? [],
    avatar: null,
    role: 'User',
    memberSince: null,
    bio: '',
    location: '',
    website: '',
    socialLinks: {
      twitter: '',
      linkedin: '',
      github: '',
    },
  };
}

export function AuthProvider({ children }) {
  const { toast } = useToast();

  const [currentUser, setCurrentUser] = useState(null);
  const [backendUser, setBackendUser] = useState(null);
  const [backendSyncError, setBackendSyncError] = useState(null);

  const [myEntities, setMyEntities] = useState([]);
  const [myEntitiesError, setMyEntitiesError] = useState(null);
  const [isEntitiesLoading, setIsEntitiesLoading] = useState(false);

  const [activeEntity, setActiveEntity] = useState(null);
  const [activeEntityError, setActiveEntityError] = useState(null);
  const [isSelectingActiveEntity, setIsSelectingActiveEntity] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(EMPTY_DASHBOARD);

  const syncInFlightRef = useRef(null);
  const lastSyncedSubjectRef = useRef(null);
  const backendUserRef = useRef(null);
  const activeEntityRef = useRef(null);

  const logActivity = useCallback((text) => {
    setDashboardData((prev) => ({
      ...prev,
      activities: [
        { id: Date.now().toString(), text, timestamp: new Date().toISOString() },
        ...(prev.activities ?? []),
      ].slice(0, 10),
    }));
  }, []);

  const selectActiveEntity = useCallback(async (entity) => {
    if (!keycloak.authenticated || !entity?.id) return null;

    setIsSelectingActiveEntity(true);

    try {
      await virthoApi.selectContext(entity.id);

      activeEntityRef.current = entity;
      setActiveEntity(entity);
      setActiveEntityId(entity.id);
      setActiveEntityError(null);

      return entity;
    } catch (err) {
      setActiveEntityError(err);

      // eslint-disable-next-line no-console
      console.error('[Virtho API] /context/select failed:', err);

      return null;
    } finally {
      setIsSelectingActiveEntity(false);
    }
  }, []);

  const loadMyEntities = useCallback(async () => {
    if (!keycloak.authenticated) return [];

    setIsEntitiesLoading(true);

    try {
      const response = await virthoApi.getMyEntities();
      const normalizedEntities = normalizeEntitiesResponse(response);

      setMyEntities(normalizedEntities);
      setMyEntitiesError(null);

      const currentActiveEntity = activeEntityRef.current;
      const currentStillValid =
        currentActiveEntity &&
        normalizedEntities.some(
          (entity) =>
            entity.id === currentActiveEntity.id &&
            entity.status === 'ACTIVE'
        );

      if (!currentStillValid) {
        const firstActiveEntity =
          normalizedEntities.find((entity) => entity.status === 'ACTIVE') ??
          normalizedEntities[0] ??
          null;

        if (firstActiveEntity) {
          void selectActiveEntity(firstActiveEntity);
        } else {
          activeEntityRef.current = null;
          setActiveEntity(null);
          clearActiveEntityId();
        }
      }

      return normalizedEntities;
    } catch (err) {
      setMyEntities([]);
      setMyEntitiesError(err);

      // eslint-disable-next-line no-console
      console.error('[Virtho API] /me/entities failed:', err);

      return [];
    } finally {
      setIsEntitiesLoading(false);
    }
  }, [selectActiveEntity]);

  const syncMeWithBackend = useCallback(async ({ force = false } = {}) => {
    if (!keycloak.authenticated) return null;

    const subject = keycloak.subject ?? keycloak.tokenParsed?.sub ?? null;

    if (!force && subject && lastSyncedSubjectRef.current === subject) {
      return backendUserRef.current;
    }

    if (syncInFlightRef.current) {
      return syncInFlightRef.current;
    }

    syncInFlightRef.current = virthoApi
      .syncMe()
      .then((syncedUser) => {
        backendUserRef.current = syncedUser;
        lastSyncedSubjectRef.current = subject;
        setBackendUser(syncedUser);
        setBackendSyncError(null);
        void loadMyEntities();
        return syncedUser;
      })
      .catch((err) => {
        setBackendSyncError(err);

        // eslint-disable-next-line no-console
        console.error('[Virtho API] /me/sync failed:', err);

        return null;
      })
      .finally(() => {
        syncInFlightRef.current = null;
      });

    return syncInFlightRef.current;
  }, [loadMyEntities]);

  useEffect(() => {
    let refreshInterval = null;

    keycloak
      .init({
        onLoad: 'check-sso',
        pkceMethod: 'S256',
        checkLoginIframe: false,
        flow: 'standard',
      })
      .then((authenticated) => {
        setIsAuthenticated(authenticated);

        if (authenticated) {
          setCurrentUser(buildUserFromToken());
          void syncMeWithBackend();
        }

        setIsLoading(false);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error('[Keycloak] init failed:', err);
        setIsLoading(false);
      });

    keycloak.onAuthSuccess = () => {
      setIsAuthenticated(true);
      setCurrentUser(buildUserFromToken());
      void syncMeWithBackend({ force: true });
    };

    keycloak.onAuthRefreshSuccess = () => {
      setCurrentUser(buildUserFromToken());
    };

    keycloak.onAuthLogout = () => {
      setIsAuthenticated(false);
      setCurrentUser(null);
      setBackendUser(null);
      setBackendSyncError(null);

      setMyEntities([]);
      setMyEntitiesError(null);
      setIsEntitiesLoading(false);

      setActiveEntity(null);
      setActiveEntityError(null);
      setIsSelectingActiveEntity(false);

      backendUserRef.current = null;
      activeEntityRef.current = null;
      lastSyncedSubjectRef.current = null;
      syncInFlightRef.current = null;
      clearActiveEntityId();
    };

    keycloak.onTokenExpired = () => {
      keycloak.updateToken(30).catch(() => {
        // eslint-disable-next-line no-console
        console.warn('[Keycloak] token refresh failed, logging out');
        keycloak.logout();
      });
    };

    refreshInterval = setInterval(() => {
      if (keycloak.authenticated) {
        keycloak.updateToken(70).catch(() => {
          // eslint-disable-next-line no-console
          console.warn('[Keycloak] background refresh failed, logging out');
          keycloak.logout();
        });
      }
    }, 60_000);

    return () => {
      if (refreshInterval) clearInterval(refreshInterval);
    };
  }, [syncMeWithBackend]);

  const login = () => keycloak.login({ redirectUri: window.location.origin });

  const register = () => keycloak.register({ redirectUri: window.location.origin });

  const logout = () => {
    try {
      const virthoKeys = Object.keys(localStorage).filter((key) => key.startsWith('virtho_'));
      virthoKeys.forEach((key) => localStorage.removeItem(key));
      sessionStorage.clear();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn('[Logout] storage cleanup skipped:', err);
    }

    clearActiveEntityId();

    return keycloak.logout({ redirectUri: window.location.origin });
  };

  const updateUserProfile = async (profileData) => {
    const updatedUser = { ...currentUser, ...profileData };
    setCurrentUser(updatedUser);
    logActivity(`Updated profile: ${updatedUser.name ?? updatedUser.email ?? 'current user'}`);

    toast({
      title: 'Profile updated',
      description: 'Your local profile view was updated.',
    });

    return { success: true };
  };

  const uploadProfilePicture = async (imageData) => {
    const updatedUser = { ...currentUser, avatar: imageData };
    setCurrentUser(updatedUser);
    logActivity('Updated profile picture');

    toast({
      title: 'Profile picture updated',
      description: 'Your local profile picture was updated.',
    });

    return { success: true, imageUrl: imageData };
  };

  const archiveUserAccount = async () => {
    logActivity('Account archive requested');

    toast({
      title: 'Account archive is not connected yet',
      description: 'Backend account archive will be implemented in a later segment.',
    });

    return { success: false, reason: 'not_implemented' };
  };

  const createCrudMethods = (collectionKey, displayNameField) => ({
    add: (item) => {
      setDashboardData((prev) => ({
        ...prev,
        [collectionKey]: [{ id: Date.now().toString(), ...item }, ...(prev[collectionKey] ?? [])],
      }));
      logActivity(`Created ${collectionKey.slice(0, -1)}: ${item?.[displayNameField] ?? 'Untitled'}`);
    },
    update: (id, item) => {
      setDashboardData((prev) => ({
        ...prev,
        [collectionKey]: (prev[collectionKey] ?? []).map((existingItem) =>
          existingItem.id === id ? { ...existingItem, ...item } : existingItem
        ),
      }));
      logActivity(`Updated ${collectionKey.slice(0, -1)}: ${item?.[displayNameField] ?? id}`);
    },
    delete: (id) => {
      setDashboardData((prev) => ({
        ...prev,
        [collectionKey]: (prev[collectionKey] ?? []).filter((item) => item.id !== id),
      }));
      logActivity(`Deleted ${collectionKey.slice(0, -1)}: ${id}`);
    },
  });

  const blogMethods = createCrudMethods('blogs', 'title');
  const projectMethods = createCrudMethods('projects', 'name');
  const eventMethods = createCrudMethods('events', 'title');
  const productMethods = createCrudMethods('products', 'name');
  const portfolioMethods = createCrudMethods('portfolios', 'title');
  const teamMethods = createCrudMethods('teams', 'name');

  const value = {
    currentUser,
    backendUser,
    backendSyncError,

    myEntities,
    myEntitiesError,
    isEntitiesLoading,

    activeEntity,
    activeEntityError,
    isSelectingActiveEntity,

    isAuthenticated,
    isLoading,

    login,
    register,
    logout,

    syncMeWithBackend,
    loadMyEntities,
    selectActiveEntity,

    updateUserProfile,
    uploadProfilePicture,
    archiveUserAccount,

    keycloak,
    dashboardData,

    addBlog: blogMethods.add,
    updateBlog: blogMethods.update,
    deleteBlog: blogMethods.delete,

    addProject: projectMethods.add,
    updateProject: projectMethods.update,
    deleteProject: projectMethods.delete,

    addEvent: eventMethods.add,
    updateEvent: eventMethods.update,
    deleteEvent: eventMethods.delete,

    addProduct: productMethods.add,
    updateProduct: productMethods.update,
    deleteProduct: productMethods.delete,

    addPortfolioItem: portfolioMethods.add,
    updatePortfolioItem: portfolioMethods.update,
    deletePortfolioItem: portfolioMethods.delete,

    addTeam: teamMethods.add,
    updateTeam: teamMethods.update,
    deleteTeam: teamMethods.delete,
  };

  return (
    <AuthContext.Provider value={value}>
      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-lg text-gray-400">Loading...</div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}