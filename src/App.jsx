
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import { CartProvider } from '@/hooks/useCart.jsx';
import { AuthProvider, useAuth } from '@/contexts/AuthContext.jsx';
import { ThemeProvider } from '@/contexts/ThemeContext.jsx';
import { ROUTES } from '@/constants';
import Layout from '@/components/Layout.jsx';
import ShoppingCart from '@/components/ShoppingCart.jsx';

import HomePage from '@/pages/HomePage.jsx';
import AboutPage from '@/pages/AboutPage.jsx';
import LoginPage from '@/pages/LoginPage.jsx';
import RegisterPage from '@/pages/RegisterPage.jsx';
import DashboardPage from '@/pages/DashboardPage.jsx';
import ProfilePage from '@/pages/ProfilePage.jsx';
import SettingsPage from '@/pages/SettingsPage.jsx';
import CreateProjectPage from '@/pages/CreateProjectPage.jsx';
import ProjectDetailPage from '@/pages/ProjectDetailPage.jsx';
import ProjectResourcesPage from '@/pages/ProjectResourcesPage.jsx';
import ProjectMicrositePage from '@/pages/ProjectMicrositePage.jsx';
import ProjectsManagementPage from '@/pages/ProjectsManagementPage.jsx';
import BlogsPage from '@/pages/BlogsPage.jsx';
import BlogDetailPage from '@/pages/BlogDetailPage.jsx';
import TermsPage from '@/pages/TermsPage.jsx';
import PrivacyPage from '@/pages/PrivacyPage.jsx';
import ProjectsPage from '@/pages/ProjectsPage.jsx';
import CommunityPage from '@/pages/CommunityPage.jsx';
import HumanDetailPage from '@/pages/HumanDetailPage.jsx';
import GroupDetailPage from '@/pages/GroupDetailPage.jsx';
import OrganizationDetailPage from '@/pages/OrganizationDetailPage.jsx';
import ContactPage from '@/pages/ContactPage.jsx';
import SupportUsPage from '@/pages/SupportUsPage.jsx';
import MarketplacePage from '@/pages/MarketplacePage.jsx';
import ProductDetailPage from '@/pages/ProductDetailPage.jsx';
import SuccessPage from '@/pages/SuccessPage.jsx';
import JobsPage from '@/pages/JobsPage.jsx';
import JobDetailsPage from '@/pages/JobDetailsPage.jsx';
import LearningPage from '@/pages/LearningPage.jsx';
import LearningDetailsPage from '@/pages/LearningDetailsPage.jsx';
import GalleryPage from '@/pages/GalleryPage.jsx';
import OrganizationsPage from '@/pages/OrganizationsPage.jsx';
import GroupsPage from '@/pages/GroupsPage.jsx';
import UsersPage from '@/pages/UsersPage.jsx';
import TeamsPage from '@/pages/TeamsPage.jsx';
import WellnessPage from '@/pages/health/WellnessPage.jsx';
import HealthIDPage from '@/pages/health/HealthIDPage.jsx';
import LegalAndInsurancePage from '@/pages/health/LegalAndInsurancePage.jsx';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to={ROUTES.LOGIN} replace />;
}

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 }
};

const pageTransition = {
  duration: 0.3,
  ease: 'easeInOut'
};

function AnimatedRoutes() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path={ROUTES.HOME} element={
          <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
            <HomePage />
          </motion.div>
        } />
        
        <Route path={ROUTES.ABOUT} element={
          <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
            <AboutPage />
          </motion.div>
        } />
        
        {/* Health Section Routes */}
        <Route path={ROUTES.HEALTH_WELLNESS} element={
          <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
            <WellnessPage />
          </motion.div>
        } />
        <Route path={ROUTES.HEALTH_ID} element={
          <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
            <HealthIDPage />
          </motion.div>
        } />
        <Route path={ROUTES.HEALTH_LEGAL} element={
          <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
            <LegalAndInsurancePage />
          </motion.div>
        } />
        
        {/* Projects Routes */}
        <Route path={ROUTES.PROJECTS} element={
          <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
            <ProjectsPage />
          </motion.div>
        } />
        <Route path="/project/:id" element={
          <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
            <ProjectDetailPage />
          </motion.div>
        } />
        <Route path="/project/:id/microsite" element={
          <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
            <ProjectMicrositePage />
          </motion.div>
        } />
        
        {/* Community Routes */}
        <Route path={ROUTES.COMMUNITY} element={
          <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
            <CommunityPage />
          </motion.div>
        } />
        <Route path="/communities" element={
          <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
            <CommunityPage />
          </motion.div>
        } />
        <Route path="/community/human/:id" element={
          <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
            <HumanDetailPage />
          </motion.div>
        } />
        <Route path="/community/group/:id" element={
          <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
            <GroupDetailPage />
          </motion.div>
        } />
        <Route path="/community/organization/:id" element={
          <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
            <OrganizationDetailPage />
          </motion.div>
        } />
        
        {/* Jobs Routes */}
        <Route path={ROUTES.JOBS} element={
          <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
            <JobsPage />
          </motion.div>
        } />
        <Route path="/jobs/:id" element={
          <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
            <JobDetailsPage />
          </motion.div>
        } />
        
        {/* Learning Routes */}
        <Route path={ROUTES.LEARNING} element={
          <ProtectedRoute>
            <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
              <LearningPage />
            </motion.div>
          </ProtectedRoute>
        } />
        <Route path="/learning/:id" element={
          <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
            <LearningDetailsPage />
          </motion.div>
        } />
        
        {/* Marketplace Routes */}
        <Route path={ROUTES.MARKETPLACE} element={
          <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
            <MarketplacePage />
          </motion.div>
        } />
        <Route path="/product/:id" element={
          <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
            <ProductDetailPage />
          </motion.div>
        } />
        <Route path="/success" element={
          <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
            <SuccessPage />
          </motion.div>
        } />
        
        {/* Blogs Routes */}
        <Route path={ROUTES.BLOGS} element={
          <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
            <BlogsPage />
          </motion.div>
        } />
        <Route path={ROUTES.BLOG_DETAIL} element={
          <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
            <BlogDetailPage />
          </motion.div>
        } />
        
        {/* Gallery Route */}
        <Route path={ROUTES.GALLERY} element={
          <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
            <GalleryPage />
          </motion.div>
        } />
        
        {/* Static Pages */}
        <Route path={ROUTES.CONTACT} element={
          <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
            <ContactPage />
          </motion.div>
        } />
        <Route path={ROUTES.SUPPORT} element={
          <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
            <SupportUsPage />
          </motion.div>
        } />
        <Route path={ROUTES.TERMS} element={
          <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
            <TermsPage />
          </motion.div>
        } />
        <Route path={ROUTES.PRIVACY} element={
          <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
            <PrivacyPage />
          </motion.div>
        } />
        
        {/* Auth Routes */}
        <Route path={ROUTES.LOGIN} element={
          <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
            <LoginPage />
          </motion.div>
        } />
        <Route path={ROUTES.REGISTER} element={
          <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
            <RegisterPage />
          </motion.div>
        } />
        
        {/* Protected Routes */}
        <Route path={ROUTES.DASHBOARD} element={
          <ProtectedRoute>
            <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
              <DashboardPage />
            </motion.div>
          </ProtectedRoute>
        } />
        <Route path={ROUTES.PROFILE} element={
          <ProtectedRoute>
            <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
              <ProfilePage />
            </motion.div>
          </ProtectedRoute>
        } />
        <Route path={ROUTES.SETTINGS} element={
          <ProtectedRoute>
            <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
              <SettingsPage />
            </motion.div>
          </ProtectedRoute>
        } />
        <Route path={ROUTES.ORGANIZATIONS} element={
          <ProtectedRoute>
            <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
              <OrganizationsPage />
            </motion.div>
          </ProtectedRoute>
        } />
        <Route path={ROUTES.GROUPS} element={
          <ProtectedRoute>
            <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
              <GroupsPage />
            </motion.div>
          </ProtectedRoute>
        } />
        <Route path="/users" element={
          <ProtectedRoute>
            <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
              <UsersPage />
            </motion.div>
          </ProtectedRoute>
        } />
        <Route path="/teams" element={
          <ProtectedRoute>
            <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
              <TeamsPage />
            </motion.div>
          </ProtectedRoute>
        } />
        
        {/* Project Management Routes */}
        <Route path="/projects-management" element={
          <ProtectedRoute>
            <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
              <ProjectsManagementPage />
            </motion.div>
          </ProtectedRoute>
        } />
        <Route path="/create-project" element={
          <ProtectedRoute>
            <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
              <CreateProjectPage />
            </motion.div>
          </ProtectedRoute>
        } />
        <Route path="/project/:id/resources" element={
          <ProtectedRoute>
            <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
              <ProjectResourcesPage />
            </motion.div>
          </ProtectedRoute>
        } />
        
        <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <Layout setIsCartOpen={setIsCartOpen}>
              <AnimatedRoutes />
            </Layout>

            <ShoppingCart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
            <Toaster />
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
