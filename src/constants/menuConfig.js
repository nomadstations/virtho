import { LayoutDashboard, Building2, Users, UserCircle, KeyRound as UsersRound, FolderOpen, ShoppingCart, BookOpen, Briefcase, MessageCircle, Settings } from 'lucide-react';

const STORAGE_KEY = 'dashboardMenuConfig';
const ORDER_KEY = 'dashboardMenuOrder';

const DEFAULT_MENU_ITEMS = [
  { 
    id: 'dashboard', 
    label: 'Dashboard', 
    icon: 'LayoutDashboard', 
    iconComponent: LayoutDashboard,
    path: '/dashboard', 
    visible: true, 
    category: 'Main' 
  },
  { 
    id: 'organizations', 
    label: 'Organizations', 
    icon: 'Building2', 
    iconComponent: Building2,
    path: '/organizations', 
    visible: true, 
    category: 'Main' 
  },
  { 
    id: 'groups', 
    label: 'Groups', 
    icon: 'Users', 
    iconComponent: Users,
    path: '/groups', 
    visible: true, 
    category: 'Main' 
  },
  { 
    id: 'users', 
    label: 'People', 
    icon: 'UserCircle', 
    iconComponent: UserCircle,
    path: '/dashboard', 
    visible: true, 
    category: 'Main',
    comingSoon: true
  },
  { 
    id: 'teams', 
    label: 'Teams', 
    icon: 'UsersRound', 
    iconComponent: UsersRound,
    path: '/dashboard', 
    visible: true, 
    category: 'Main',
    comingSoon: true
  },
  { 
    id: 'projects', 
    label: 'Projects', 
    icon: 'FolderOpen', 
    iconComponent: FolderOpen,
    path: '/projects', 
    visible: true, 
    category: 'Main' 
  },
  { 
    id: 'marketplace', 
    label: 'Marketplace', 
    icon: 'ShoppingCart', 
    iconComponent: ShoppingCart,
    path: '/marketplace', 
    visible: true, 
    category: 'Main' 
  },
  { 
    id: 'learning', 
    label: 'Learning', 
    icon: 'BookOpen', 
    iconComponent: BookOpen,
    path: '/learning', 
    visible: true, 
    category: 'Main' 
  },
  { 
    id: 'jobs', 
    label: 'Jobs', 
    icon: 'Briefcase', 
    iconComponent: Briefcase,
    path: '/jobs', 
    visible: true, 
    category: 'Main' 
  },
  { 
    id: 'community', 
    label: 'Community', 
    icon: 'MessageCircle', 
    iconComponent: MessageCircle,
    path: '/community', 
    visible: true, 
    category: 'Main' 
  },
  { 
    id: 'settings', 
    label: 'Settings', 
    icon: 'Settings', 
    iconComponent: Settings,
    path: null, 
    visible: true, 
    category: 'Settings',
    action: 'openSettings'
  },
];

export function getMenuItems() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const storedOrder = localStorage.getItem(ORDER_KEY);
    
    if (stored) {
      const config = JSON.parse(stored);
      let items = DEFAULT_MENU_ITEMS.map(item => ({
        ...item,
        visible: config[item.id]?.visible !== undefined ? config[item.id].visible : item.visible
      }));
      
      if (storedOrder) {
        const order = JSON.parse(storedOrder);
        items = order.map(id => items.find(item => item.id === id)).filter(Boolean);
        const missingItems = items.filter(item => !order.includes(item.id));
        items = [...items, ...missingItems];
      }
      
      return items;
    }
  } catch (error) {
    console.error('Error loading menu config:', error);
  }
  
  return DEFAULT_MENU_ITEMS;
}

export function toggleMenuItemVisibility(id) {
  try {
    const items = getMenuItems();
    const config = {};
    
    items.forEach(item => {
      config[item.id] = {
        visible: item.id === id ? !item.visible : item.visible
      };
    });
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    return getMenuItems();
  } catch (error) {
    console.error('Error toggling menu item:', error);
    return getMenuItems();
  }
}

export function setMenuItemVisibility(id, visible) {
  try {
    const items = getMenuItems();
    const config = {};
    
    items.forEach(item => {
      config[item.id] = {
        visible: item.id === id ? visible : item.visible
      };
    });
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    return getMenuItems();
  } catch (error) {
    console.error('Error setting menu item visibility:', error);
    return getMenuItems();
  }
}

export function reorderMenuItems(newOrder) {
  try {
    const orderIds = newOrder.map(item => item.id);
    localStorage.setItem(ORDER_KEY, JSON.stringify(orderIds));
    return getMenuItems();
  } catch (error) {
    console.error('Error reordering menu items:', error);
    return getMenuItems();
  }
}

export function saveMenuConfig(items) {
  try {
    const config = {};
    items.forEach(item => {
      config[item.id] = {
        visible: item.visible
      };
    });
    
    const orderIds = items.map(item => item.id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    localStorage.setItem(ORDER_KEY, JSON.stringify(orderIds));
    
    return true;
  } catch (error) {
    console.error('Error saving menu config:', error);
    return false;
  }
}

export function resetToDefaults() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(ORDER_KEY);
    return DEFAULT_MENU_ITEMS;
  } catch (error) {
    console.error('Error resetting menu config:', error);
    return DEFAULT_MENU_ITEMS;
  }
}

export { DEFAULT_MENU_ITEMS };