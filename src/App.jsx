import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { CartProvider } from '@/hooks/useCart';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { DBSchemaProvider } from '@/contexts/DBSchemaContext';
import Layout from '@/components/Layout';
import ShoppingCart from '@/components/ShoppingCart';
import { ROUTES } from '@/constants';

// Page Imports
import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import DashboardPage from '@/pages/DashboardPage';
import CreateProjectPage from '@/pages/CreateProjectPage';
import ProjectDetailPage from '@/pages/ProjectDetailPage';
import ProjectResourcesPage from '@/pages/ProjectResourcesPage';
import ProjectMicrositePage from '@/pages/ProjectMicrositePage';
import BlogsPage from '@/pages/BlogsPage';
import BlogDetailPage from '@/pages/BlogDetailPage';
import TermsPage from '@/pages/TermsPage';
import PrivacyPage from '@/pages/PrivacyPage';
import ProjectsPage from '@/pages/ProjectsPage';
import CommunityPage from '@/pages/CommunityPage';
import HumanDetailPage from '@/pages/HumanDetailPage';
import GroupDetailPage from '@/pages/GroupDetailPage';
import OrganizationDetailPage from '@/pages/OrganizationDetailPage';
import ContactPage from '@/pages/ContactPage';
import SupportUsPage from '@/pages/SupportUsPage';
import MarketplacePage from '@/pages/MarketplacePage';
import ProductDetailPage from '@/pages/ProductDetailPage';
import SuccessPage from '@/pages/SuccessPage';
import JobsPage from '@/pages/JobsPage';
import JobDetailsPage from '@/pages/JobDetailsPage';
import LearningPage from '@/pages/LearningPage';
import LearningDetailsPage from '@/pages/LearningDetailsPage';
import GalleryPage from '@/pages/GalleryPage';
import DBSchemaPage from '@/pages/DBSchemaPage';
import HealthPage from '@/pages/HealthPage';

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
                {/* Public Routes */}
                <Route path={ROUTES.HOME} element={<LandingPage />} />
                <Route path={ROUTES.HEALTH} element={<HealthPage />} />
                <Route path="/db-schema" element={<DBSchemaPage />} />
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
                
                {/* Blogs Routes */}
                <Route path={ROUTES.BLOGS} element={<BlogsPage />} />
                <Route path={ROUTES.BLOG_DETAIL} element={<BlogDetailPage />} />
                
                <Route path="/gallery" element={<GalleryPage />} />
                
                {/* Info Routes */}
                <Route path={ROUTES.CONTACT} element={<ContactPage />} />
                <Route path={ROUTES.SUPPORT} element={<SupportUsPage />} />
                <Route path={ROUTES.TERMS} element={<TermsPage />} />
                <Route path={ROUTES.PRIVACY} element={<PrivacyPage />} />
                
                {/* Auth Routes */}
                <Route path={ROUTES.LOGIN} element={<LoginPage />} />
                <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
                
                {/* Protected Routes */}
                <Route path={ROUTES.DASHBOARD} element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
                <Route path="/create-project" element={<ProtectedRoute><CreateProjectPage /></ProtectedRoute>} />
                <Route path="/project/:id/resources" element={<ProtectedRoute><ProjectResourcesPage /></ProtectedRoute>} />
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