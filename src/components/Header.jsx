import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  ShoppingCart as ShoppingCartIcon,
  Menu,
  X,
  LayoutDashboard,
  ChevronDown,
  User,
  Building,
  Users,
  Zap,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { UserAvatarDropdown } from '@/components/UserAvatarDropdown';
import QuickActionsDropdown from '@/components/QuickActionsDropdown';
import ActingOnBehalfDropdown from '@/components/ActingOnBehalfDropdown';
import Logo from '@/components/Logo';
import { NAV_LINKS, ROUTES } from '@/constants';
import '@/styles/HeaderMenu.css';

const getUiContextType = (entityType) => {
  if (entityType === 'ORGANIZATION') return 'organization';
  if (entityType === 'GROUP') return 'group';
  return 'person';
};

const Header = ({ setIsCartOpen }) => {
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isQuickActionsOpen, setIsQuickActionsOpen] = useState(false);
  const [isActingDropdownOpen, setIsActingDropdownOpen] = useState(false);

  const { cartItems } = useCart();

  const {
    isAuthenticated,
    currentUser,
    activeEntity,
    selectActiveEntity,
    isEntitiesLoading,
    isSelectingActiveEntity,
  } = useAuth();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const actingContext = getUiContextType(activeEntity?.type);

  const actingEntityLabel = isEntitiesLoading
    ? 'Loading...'
    : isSelectingActiveEntity
      ? 'Switching...'
      : activeEntity?.name || currentUser?.name || 'No entity selected';

  const getNavLinkClass = (isActive, isMobile = false) => {
    const base = 'rounded-md transition-all duration-200 font-medium';
    const mobile = isMobile ? 'block px-4 py-3' : 'whitespace-nowrap px-3 py-2 text-sm';
    const active = isActive
      ? 'bg-lavender-lightest text-lavender-primary shadow-sm'
      : 'text-gray-600 hover:bg-lavender-lightest hover:text-lavender-primary';

    return `${base} ${mobile} ${active}`;
  };

  const toggleDropdown = (index) => {
    if (activeDropdown === index) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(index);
    }
  };

  const getActingIcon = () => {
    switch (actingContext) {
      case 'organization':
        return Building;
      case 'group':
        return Users;
      case 'person':
      default:
        return User;
    }
  };

  const ActingIcon = getActingIcon();

  const handleContextChange = (data) => {
    const selectedEntity = data?.rawEntity;

    if (!selectedEntity?.id) {
      return;
    }

    // Backend validates the selected entity before AuthContext accepts it.
    void selectActiveEntity(selectedEntity);
  };

  return (
    <header
      className="header-full-width sticky top-0 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm"
      style={{ zIndex: 'var(--z-header)', position: 'relative' }}
    >
      <div className="header-content-wrapper">
        <div className="flex items-center justify-between h-20 md:h-24">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 -ml-2 text-gray-700 hover:bg-lavender-lightest rounded-md transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <Link
              to={ROUTES.HOME}
              className="flex items-center shrink-0 py-2"
              aria-label="Virtho Foundation - Home"
            >
              <Logo size={56} />
            </Link>
          </div>

          <nav className="flex-1 mx-4 hidden md:flex items-center justify-center">
            <div className="flex items-center space-x-1 lg:space-x-2">
              {NAV_LINKS.map((link, index) => {
                if (link.dropdown) {
                  return (
                    <div
                      key={link.name}
                      className="relative group header-dropdown"
                      style={{ zIndex: activeDropdown === index ? 'var(--z-dropdown)' : 'auto' }}
                      onMouseEnter={() => setActiveDropdown(index)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <button className="header-dropdown-button">
                        {link.name}
                        <ChevronDown
                          className={`w-4 h-4 header-dropdown-chevron ${
                            activeDropdown === index ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {activeDropdown === index && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="header-dropdown-menu"
                            style={{ pointerEvents: 'auto' }}
                          >
                            {link.subLinks.map((subLink) => (
                              <NavLink
                                key={subLink.path}
                                to={subLink.path}
                                className={({ isActive }) =>
                                  `header-dropdown-item ${isActive ? 'active' : ''}`
                                }
                                onClick={() => setActiveDropdown(null)}
                              >
                                {subLink.name}
                              </NavLink>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) => getNavLinkClass(isActive, false)}
                    end={link.path === ROUTES.HOME}
                  >
                    {link.name}
                  </NavLink>
                );
              })}
            </div>
          </nav>

          <div className="flex items-center gap-3 md:gap-4 shrink-0">
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="relative p-2.5 text-gray-700 hover:bg-lavender-lightest rounded-full transition-colors group"
                  aria-label="Open cart"
                >
                  <ShoppingCartIcon className="w-6 h-6 group-hover:text-lavender-primary transition-colors" />
                  {totalItems > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 bg-pink-500 text-white text-[11px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-sm border-2 border-white">
                      {totalItems}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setIsQuickActionsOpen(true)}
                  className="relative p-2.5 text-gray-700 hover:bg-lavender-lightest rounded-full transition-colors group"
                  aria-label="Open quick actions"
                >
                  <Zap className="w-6 h-6 group-hover:text-lavender-primary transition-colors" />
                </button>

                <button
                  className="hidden md:flex w-10 h-10 rounded-full bg-gray-50 border border-gray-200 hover:bg-lavender-lightest hover:text-lavender-primary hover:border-lavender-light items-center justify-center text-sm font-bold text-gray-600 transition-all shrink-0"
                  aria-label="Switch Language"
                >
                  EN
                </button>

                <button
                  onClick={() => navigate(ROUTES.DASHBOARD)}
                  className="hidden lg:flex p-2.5 text-gray-700 hover:bg-lavender-lightest rounded-full transition-colors group"
                  aria-label="Go to Dashboard"
                  title="Dashboard"
                >
                  <LayoutDashboard className="w-6 h-6 group-hover:text-lavender-primary transition-colors" />
                </button>

                <button
                  onClick={() => setIsActingDropdownOpen(true)}
                  className="hidden lg:flex p-2.5 text-gray-700 hover:bg-lavender-lightest rounded-full transition-colors group relative"
                  aria-label={`Acting as ${actingEntityLabel}`}
                  title={`Acting as ${actingEntityLabel}`}
                  disabled={isEntitiesLoading || isSelectingActiveEntity}
                >
                  <ActingIcon className="w-6 h-6 group-hover:text-lavender-primary transition-all duration-300" />
                </button>

                <UserAvatarDropdown />
              </>
            ) : (
              <div className="hidden lg:flex items-center gap-2">
                <Link to={ROUTES.LOGIN}>
                  <Button
                    variant="ghost"
                    className="text-gray-700 hover:bg-lavender-lightest font-semibold px-5 h-11"
                  >
                    Login
                  </Button>
                </Link>

                <Link to={ROUTES.REGISTER}>
                  <Button className="bg-lavender-primary text-white hover:bg-lavender-dark shadow-md transition-all hover:shadow-lg font-bold px-6 h-11">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-b border-gray-200 shadow-lg absolute w-full left-0 top-[88px]"
            style={{ zIndex: 'var(--z-dropdown)' }}
          >
            <nav className="px-4 py-6 space-y-1 max-h-[calc(100vh-5rem)] overflow-y-auto">
              {NAV_LINKS.map((link, index) => {
                if (link.dropdown) {
                  return (
                    <div key={link.name} className="space-y-1">
                      <button
                        onClick={() => toggleDropdown(index)}
                        className="header-mobile-dropdown-button"
                      >
                        {link.name}
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            activeDropdown === index ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {activeDropdown === index && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="header-mobile-dropdown"
                          >
                            {link.subLinks.map((subLink) => (
                              <NavLink
                                key={subLink.path}
                                to={subLink.path}
                                onClick={() => setIsMenuOpen(false)}
                                className={({ isActive }) =>
                                  `header-mobile-dropdown-item ${isActive ? 'active' : ''}`
                                }
                              >
                                {subLink.name}
                              </NavLink>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) => getNavLinkClass(isActive, true)}
                    end={link.path === ROUTES.HOME}
                  >
                    {link.name}
                  </NavLink>
                );
              })}

              <div className="pt-6 mt-4 border-t border-gray-100 flex flex-col gap-4">
                {isAuthenticated ? (
                  <>
                    <div
                      onClick={() => setIsActingDropdownOpen(true)}
                      className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200 mb-2 cursor-pointer hover:bg-lavender-lightest transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <ActingIcon className="w-5 h-5 text-lavender-primary" />
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                            Acting on behalf of:
                          </span>
                          <span className="text-sm font-semibold text-gray-800">
                            {actingEntityLabel}
                          </span>
                        </div>
                      </div>
                    </div>

                    <Link to={ROUTES.DASHBOARD} onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full justify-center bg-lavender-lightest text-lavender-primary hover:bg-lavender-lighter h-12 font-bold">
                        <LayoutDashboard className="w-4 h-4 mr-2" />
                        Dashboard
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to={ROUTES.LOGIN} onClick={() => setIsMenuOpen(false)}>
                      <Button
                        variant="outline"
                        className="w-full justify-center text-gray-700 h-12 font-bold border-gray-300"
                      >
                        Login
                      </Button>
                    </Link>

                    <Link to={ROUTES.REGISTER} onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full justify-center bg-lavender-primary text-white hover:bg-lavender-dark h-12 font-bold shadow-md">
                        Get Started
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <QuickActionsDropdown
        isOpen={isQuickActionsOpen}
        setIsOpen={setIsQuickActionsOpen}
      />

      <ActingOnBehalfDropdown
        isOpen={isActingDropdownOpen}
        onClose={() => setIsActingDropdownOpen(false)}
        actingContext={actingContext}
        actingEntity={activeEntity?.name ?? ''}
        onContextChange={handleContextChange}
      />
    </header>
  );
};

export default Header;