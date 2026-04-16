import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { ShoppingCart as ShoppingCartIcon, Menu, X, LayoutDashboard, LogOut, ChevronDown, Building2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { NAV_LINKS, ROUTES } from '@/constants';

const Header = ({ setIsCartOpen }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { cartItems } = useCart();
  const { isAuthenticated, logout, currentUser } = useAuth();
  const navigate = useNavigate();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const getNavLinkClass = (isActive, isMobile = false) => {
    const base = 'rounded-md transition-all duration-200 font-medium';
    const mobile = isMobile ? 'block px-4 py-3' : 'whitespace-nowrap px-3 py-2 text-sm';
    const active = isActive ? 'bg-purple-100 text-purple-800 shadow-sm' : 'text-gray-600 hover:bg-purple-50 hover:text-purple-700';
    return `${base} ${mobile} ${active}`;
  };

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
    setIsMenuOpen(false);
  };

  const toggleDropdown = (index) => {
    if (activeDropdown === index) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(index);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20 md:h-24">
          
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 -ml-2 text-gray-700 hover:bg-purple-50 rounded-md transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <Link to={ROUTES.HOME} className="flex items-center gap-3 shrink-0 py-2">
              <h1 className="m-0 p-0 text-5xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-800 tracking-tighter leading-none py-1">
                Virtho
              </h1>
            </Link>
          </div>

          <nav className="flex-1 mx-4 hidden md:flex items-center justify-center">
            <div className="flex items-center space-x-1 lg:space-x-2">
              {NAV_LINKS.map((link, index) => {
                if (link.dropdown) {
                  return (
                    <div 
                      key={link.name} 
                      className="relative group"
                      onMouseEnter={() => setActiveDropdown(index)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <button className="flex items-center gap-1 rounded-md transition-all duration-200 font-medium whitespace-nowrap px-3 py-2 text-sm text-gray-600 hover:bg-purple-50 hover:text-purple-700">
                        {link.name} <ChevronDown className="w-4 h-4" />
                      </button>
                      
                      <AnimatePresence>
                        {activeDropdown === index && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-100 overflow-hidden py-1 z-50"
                          >
                            {link.subLinks.map((subLink) => (
                              <NavLink
                                key={subLink.path}
                                to={subLink.path}
                                className={({ isActive }) => `block px-4 py-2.5 text-sm transition-colors ${isActive ? 'bg-purple-50 text-purple-700 font-semibold' : 'text-gray-700 hover:bg-gray-50 hover:text-purple-600'}`}
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
                {/* 1. Cart Icon */}
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="relative p-2.5 text-gray-700 hover:bg-purple-50 rounded-full transition-colors group"
                  aria-label="Open cart"
                >
                  <ShoppingCartIcon className="w-6 h-6 group-hover:text-purple-700 transition-colors" />
                  {totalItems > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 bg-pink-500 text-white text-[11px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-sm border-2 border-white">
                      {totalItems}
                    </span>
                  )}
                </button>

                {/* 2. Language Switch */}
                <button 
                  className="hidden md:flex w-10 h-10 rounded-full bg-gray-50 border border-gray-200 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200 items-center justify-center text-sm font-bold text-gray-600 transition-all shrink-0"
                  aria-label="Switch Language"
                >
                  EN
                </button>

                {/* 3. Dashboard Button */}
                <div className="hidden lg:flex items-center">
                  <Link to={ROUTES.DASHBOARD}>
                    <Button variant="ghost" className="text-purple-700 hover:bg-purple-50 font-bold px-4 h-10">
                      <LayoutDashboard className="w-4 h-4 mr-2" /> Dashboard
                    </Button>
                  </Link>
                </div>

                {/* 4. Acting on behalf of Context */}
                <div className="hidden lg:flex items-center mx-1 group cursor-pointer">
                  <div className="flex items-center bg-gray-50 border border-gray-200 hover:border-purple-300 hover:bg-purple-50 rounded-full pl-3 pr-4 py-1.5 transition-all duration-200 shadow-sm">
                    <div className="flex flex-col mr-2">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider leading-tight">Acting on behalf of:</span>
                      <span className="text-sm font-semibold text-gray-800 group-hover:text-purple-700 leading-tight max-w-[120px] truncate">
                        {currentUser?.activeEntity?.name || currentUser?.name || 'Individual'}
                      </span>
                    </div>
                    <Building2 className="w-4 h-4 text-gray-400 group-hover:text-purple-600" />
                  </div>
                </div>

                {/* 5. User Profile Image */}
                <button 
                  onClick={handleLogout}
                  className="w-10 h-10 rounded-full overflow-hidden border-2 border-transparent hover:border-purple-500 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ml-1 shrink-0 bg-gray-100"
                  title="Click to logout"
                >
                  <img 
                    src={currentUser?.avatar || `https://ui-avatars.com/api/?name=${currentUser?.name || 'User'}&background=6366f1&color=fff`} 
                    alt={currentUser?.name || "User Profile"}
                    className="w-full h-full object-cover"
                  />
                </button>
              </>
            ) : (
              <div className="hidden lg:flex items-center gap-2">
                <Link to={ROUTES.LOGIN}>
                  <Button variant="ghost" className="text-gray-700 hover:bg-purple-50 font-semibold px-5 h-11">
                    Login
                  </Button>
                </Link>
                <Link to={ROUTES.REGISTER}>
                  <Button className="bg-purple-600 text-white hover:bg-purple-700 shadow-md transition-all hover:shadow-lg font-bold px-6 h-11">
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
            className="md:hidden overflow-hidden bg-white border-b border-gray-200 shadow-lg absolute w-full left-0 top-[88px] z-40"
          >
            <nav className="px-4 py-6 space-y-1 max-h-[calc(100vh-5rem)] overflow-y-auto">
              {NAV_LINKS.map((link, index) => {
                if (link.dropdown) {
                  return (
                    <div key={link.name} className="space-y-1">
                      <button 
                        onClick={() => toggleDropdown(index)}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-md transition-all duration-200 font-medium text-gray-600 hover:bg-purple-50 hover:text-purple-700"
                      >
                        {link.name}
                        <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === index ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {activeDropdown === index && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden pl-4"
                          >
                            {link.subLinks.map(subLink => (
                              <NavLink
                                key={subLink.path}
                                to={subLink.path}
                                onClick={() => setIsMenuOpen(false)}
                                className={({ isActive }) => `block px-4 py-2.5 mt-1 rounded-md text-sm transition-colors ${isActive ? 'bg-purple-100 text-purple-800 font-semibold' : 'text-gray-600 hover:bg-gray-50 hover:text-purple-700'}`}
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
                    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200 mb-2">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Acting on behalf of:</span>
                        <span className="text-sm font-semibold text-gray-800">
                          {currentUser?.activeEntity?.name || currentUser?.name || 'Individual'}
                        </span>
                      </div>
                      <Building2 className="w-5 h-5 text-gray-400" />
                    </div>
                    <Link to={ROUTES.DASHBOARD} onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full justify-center bg-purple-50 text-purple-700 hover:bg-purple-100 h-12 font-bold">
                        <LayoutDashboard className="w-4 h-4 mr-2" /> Dashboard
                      </Button>
                    </Link>
                    <Button variant="outline" className="w-full justify-center text-red-600 h-12 font-bold border-gray-300" onClick={handleLogout}>
                      <LogOut className="w-4 h-4 mr-2" /> Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to={ROUTES.LOGIN} onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="w-full justify-center text-gray-700 h-12 font-bold border-gray-300">
                        Login
                      </Button>
                    </Link>
                    <Link to={ROUTES.REGISTER} onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full justify-center bg-purple-600 text-white hover:bg-purple-700 h-12 font-bold shadow-md">
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
    </header>
  );
};

export default Header;