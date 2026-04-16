
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { CartProvider } from '@/hooks/useCart.jsx';
import { AuthProvider, useAuth } from '@/contexts/AuthContext.jsx';
import { DBSchemaProvider } from '@/contexts/DBSchemaContext.jsx';
import Layout from '@/components/Layout.jsx';
import ShoppingCart from '@/components/ShoppingCart.jsx';

import LandingPage from '@/pages/LandingPage.jsx';
import LoginPage from '@/pages/LoginPage.jsx';
import RegisterPage from '@/pages/RegisterPage.jsx';
import DashboardPage from '@/pages/DashboardPage.jsx';
import CreateProjectPage from '@/pages/CreateProjectPage.jsx';
import ProjectDetailPage from '@/pages/ProjectDetailPage.jsx';
import ProjectResourcesPage from '@/pages/ProjectResourcesPage.jsx';
import ProjectMicrositePage from '@/pages/ProjectMicrositePage.jsx';
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
import DBSchemaPage from '@/pages/DBSchemaPage.jsx';
import HealthPage from '@/pages/HealthPage.jsx';

import OrganizationsPage from '@/pages/OrganizationsPage.jsx';
import GroupsPage from '@/pages/GroupsPage.jsx';

const ROUTES = {
  HOME: '/',
  HEALTH: '/health',
  BLOGS: '/blogs',
  BLOG_DETAIL: '/blog/:slug',
  COMMUNITY: '/community',
  JOBS: '/jobs',
  LEARNING: '/learning',
  MARKETPLACE: '/marketplace',
  PROJECTS: '/projects',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  CONTACT: '/contact',
  SUPPORT: '/support-us',
  TERMS: '/terms',
  PRIVACY: '/privacy',
  COMMUNITY_HUMAN: '/community/human/:id',
  COMMUNITY_GROUP: '/community/group/:id',
  COMMUNITY_ORG: '/community/organization/:id',
  DB_SCHEMA: '/db-schema',
  ORGANIZATIONS: '/organizations',
  GROUPS: '/groups',
};

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to={ROUTES.LOGIN} replace />;
}

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <Router>
      <AuthProvider>
        <DBSchemaProvider>
          <CartProvider>
            <Layout setIsCartOpen={setIsCartOpen}>
              <Routes>
                <Route path={ROUTES.HOME} element={<LandingPage />} />
                <Route path={ROUTES.HEALTH} element={<HealthPage />} />
                <Route path={ROUTES.DB_SCHEMA} element={<DBSchemaPage />} />
                <Route path={ROUTES.PROJECTS} element={<ProjectsPage />} />
                <Route path="/project/:id" element={<ProjectDetailPage />} />
                <Route path="/project/:id/microsite" element={<ProjectMicrositePage />} />
                
                <Route path={ROUTES.COMMUNITY} element={<CommunityPage />} />
                <Route path={ROUTES.COMMUNITY_HUMAN} element={<HumanDetailPage />} />
                <Route path={ROUTES.COMMUNITY_GROUP} element={<GroupDetailPage />} />
                <Route path={ROUTES.COMMUNITY_ORG} element={<OrganizationDetailPage />} />
                
                <Route path={ROUTES.JOBS} element={<JobsPage />} />
                <Route path="/jobs/:id" element={<JobDetailsPage />} />
                <Route path={ROUTES.LEARNING} element={<LearningPage />} />
                <Route path="/learning/:id" element={<LearningDetailsPage />} />
                <Route path={ROUTES.MARKETPLACE} element={<MarketplacePage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/success" element={<SuccessPage />} />
                
                <Route path={ROUTES.BLOGS} element={<BlogsPage />} />
                <Route path={ROUTES.BLOG_DETAIL} element={<BlogDetailPage />} />
                
                <Route path="/gallery" element={<GalleryPage />} />
                
                <Route path={ROUTES.CONTACT} element={<ContactPage />} />
                <Route path={ROUTES.SUPPORT} element={<SupportUsPage />} />
                <Route path={ROUTES.TERMS} element={<TermsPage />} />
                <Route path={ROUTES.PRIVACY} element={<PrivacyPage />} />
                
                <Route path={ROUTES.LOGIN} element={<LoginPage />} />
                <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
                
                <Route path={ROUTES.DASHBOARD} element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
                <Route path={ROUTES.ORGANIZATIONS} element={<ProtectedRoute><OrganizationsPage /></ProtectedRoute>} />
                <Route path={ROUTES.GROUPS} element={<ProtectedRoute><GroupsPage /></ProtectedRoute>} />
                
                <Route path="/create-project" element={<ProtectedRoute><CreateProjectPage /></ProtectedRoute>} />
                <Route path="/project/:id/resources" element={<ProtectedRoute><ProjectResourcesPage /></ProtectedRoute>} />
                
                <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
              </Routes>
            </Layout>

            <ShoppingCart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
            <Toaster />
          </CartProvider>
        </DBSchemaProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
