
import { useState, useEffect } from 'react';
import { Building2, Users, FolderOpen, KeyRound as UsersRound, FileText, Calendar, ShoppingBag, GraduationCap, Briefcase } from 'lucide-react';

const STORAGE_KEY = 'dashboardQuickActions';

const AVAILABLE_QUICK_ACTIONS = [
  {
    id: 'create-organization',
    label: 'Create Organization',
    icon: 'Building2',
    iconComponent: Building2,
    action: 'openCreateOrganization',
    visible: true,
    category: 'Core Actions'
  },
  {
    id: 'create-group',
    label: 'Create Group',
    icon: 'Users',
    iconComponent: Users,
    action: 'openCreateGroup',
    visible: true,
    category: 'Core Actions'
  },
  {
    id: 'create-project',
    label: 'Create Project',
    icon: 'FolderOpen',
    iconComponent: FolderOpen,
    action: 'openCreateProject',
    visible: true,
    category: 'Core Actions'
  },
  {
    id: 'create-team',
    label: 'Create Team',
    icon: 'UsersRound',
    iconComponent: UsersRound,
    action: 'openCreateTeam',
    visible: false,
    category: 'People Management'
  },
  {
    id: 'create-post',
    label: 'Write a Post',
    icon: 'FileText',
    iconComponent: FileText,
    action: 'openCreatePost',
    visible: false,
    category: 'Content Creation'
  },
  {
    id: 'create-event',
    label: 'Create Event',
    icon: 'Calendar',
    iconComponent: Calendar,
    action: 'openCreateEvent',
    visible: false,
    category: 'Content Creation'
  },
  {
    id: 'add-product',
    label: 'Add Product',
    icon: 'ShoppingBag',
    iconComponent: ShoppingBag,
    action: 'openAddProduct',
    visible: false,
    category: 'Commerce'
  },
  {
    id: 'add-course',
    label: 'Add Course',
    icon: 'GraduationCap',
    iconComponent: GraduationCap,
    action: 'openAddCourse',
    visible: false,
    category: 'Learning'
  },
  {
    id: 'post-job',
    label: 'Post a Job',
    icon: 'Briefcase',
    iconComponent: Briefcase,
    action: 'openPostJob',
    visible: false,
    category: 'Jobs'
  },
];

const DEFAULT_SELECTED_IDS = ['create-organization', 'create-group', 'create-project'];

export function getQuickActions() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    
    if (stored) {
      const selectedIds = JSON.parse(stored);
      
      if (!Array.isArray(selectedIds)) {
        throw new Error('Invalid data format in localStorage');
      }
      
      const validIds = selectedIds.filter(id => id !== 'create-user');
      
      const selected = AVAILABLE_QUICK_ACTIONS.filter(action => 
        validIds.includes(action.id)
      );
      
      return selected;
    } else {
      const defaults = AVAILABLE_QUICK_ACTIONS.filter(action => 
        DEFAULT_SELECTED_IDS.includes(action.id)
      );
      return defaults;
    }
  } catch (error) {
    console.error('[useQuickActions] Error loading quick actions:', error);
    const defaults = AVAILABLE_QUICK_ACTIONS.filter(action => 
      DEFAULT_SELECTED_IDS.includes(action.id)
    );
    return defaults;
  }
}

export function saveQuickActions(actions) {
  try {
    if (!Array.isArray(actions)) {
      throw new Error('saveQuickActions requires an array of action objects');
    }
    
    const actionIds = actions.map(action => {
      if (!action || !action.id) {
        throw new Error('Action object must have an id property');
      }
      return action.id;
    }).filter(id => id !== 'create-user');
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(actionIds));
    return true;
  } catch (error) {
    console.error('[useQuickActions] Error saving quick actions:', error);
    return false;
  }
}

export function toggleQuickAction(actionId, currentActions) {
  try {
    if (actionId === 'create-user') {
      return currentActions;
    }
    
    const action = AVAILABLE_QUICK_ACTIONS.find(a => a.id === actionId);
    if (!action) {
      console.error('[useQuickActions] Action not found:', actionId);
      return currentActions;
    }
    
    const isSelected = currentActions.some(a => a.id === actionId);
    
    let newActions;
    if (isSelected) {
      newActions = currentActions.filter(a => a.id !== actionId);
    } else {
      newActions = [...currentActions, action];
    }
    
    saveQuickActions(newActions);
    return newActions;
  } catch (error) {
    console.error('[useQuickActions] Error toggling quick action:', error);
    return currentActions;
  }
}

export function resetQuickActionsToDefaults() {
  try {
    const defaults = AVAILABLE_QUICK_ACTIONS.filter(action => 
      DEFAULT_SELECTED_IDS.includes(action.id)
    );
    saveQuickActions(defaults);
    return defaults;
  } catch (error) {
    console.error('[useQuickActions] Error resetting quick actions:', error);
    return AVAILABLE_QUICK_ACTIONS.filter(action => 
      DEFAULT_SELECTED_IDS.includes(action.id)
    );
  }
}

export function useQuickActions() {
  const [quickActions, setQuickActions] = useState(() => getQuickActions());
  const [availableActions] = useState(AVAILABLE_QUICK_ACTIONS);

  useEffect(() => {
    const actions = getQuickActions();
    setQuickActions(actions);
  }, []);

  const handleSaveQuickActions = (actions) => {
    const success = saveQuickActions(actions);
    if (success) {
      setQuickActions(actions);
    }
    return success;
  };

  const handleToggleQuickAction = (actionId) => {
    const newActions = toggleQuickAction(actionId, quickActions);
    setQuickActions(newActions);
    return newActions;
  };

  const handleResetToDefaults = () => {
    const defaults = resetQuickActionsToDefaults();
    setQuickActions(defaults);
    return defaults;
  };

  return {
    quickActions,
    availableActions,
    toggleQuickAction: handleToggleQuickAction,
    resetToDefaults: handleResetToDefaults,
    saveQuickActions: handleSaveQuickActions
  };
}
