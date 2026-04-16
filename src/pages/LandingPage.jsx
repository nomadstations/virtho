import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Rocket, Users, Briefcase, GraduationCap, ShoppingBag, KeyRound as UsersRound, Database } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import BlogSection from '@/components/BlogSection';
import LatestCommunities from '@/components/LatestCommunities';
import LatestJobs from '@/components/LatestJobs';
import LatestLearning from '@/components/LatestLearning';
import LatestMarketplace from '@/components/LatestMarketplace';
import LatestProjects from '@/components/LatestProjects';
import Breadcrumb from '@/components/Breadcrumb';
import { getBreadcrumbPaths } from '@/utils/breadcrumbConfig';
import { ROUTES } from '@/constants';
import { Card } from '@/components/SharedUI';

function LandingPage() {
  const features = [
    { icon: Rocket, title: 'Create Projects', desc: 'Launch your innovative ideas and bring your vision to life.', link: ROUTES.PROJECTS, cta: 'Explore Projects' },
    { icon: UsersRound, title: 'Join Teams', desc: 'Collaborate with passionate individuals and build together.', link: ROUTES.COMMUNITY, cta: 'Find Teams' },
    { icon: Users, title: 'Enter Communities', desc: 'Connect with like-minded people, share knowledge, and collaborate globally.', link: ROUTES.COMMUNITY, cta: 'Browse Communities' },
    { icon: Briefcase, title: 'Explore Jobs', desc: 'Find exciting career opportunities and relevant job postings in your field.', link: ROUTES.JOBS, cta: 'View Jobs' },
    { icon: GraduationCap, title: 'Start Learning', desc: 'Accelerate your skill development through top-rated courses and bootcamps.', link: ROUTES.LEARNING, cta: 'Start Learning' },
    { icon: ShoppingBag, title: 'Browse Marketplace', desc: 'Buy and sell professional services, innovative products, or digital assets.', link: ROUTES.MARKETPLACE, cta: 'Visit Marketplace' }
  ];

  return (
    <>
      <Helmet>
        <title>Virtho - Human Development Hub</title>
        <meta name="description" content="Join Virtho to create, collaborate, and bring innovative projects to life. Connect with passionate individuals and make a difference." />
      </Helmet>
      
      {/* DB Schema Navigation Banner */}
      <div className="bg-purple-900 text-white py-3">
        <div className="container mx-auto px-4 flex justify-center items-center gap-3">
          <Database size={18} className="text-purple-300" />
          <span className="font-medium text-sm md:text-base">Explore our system architecture and data structures</span>
          <Link to="/db-schema" className="ml-2 bg-white text-purple-900 hover:bg-purple-100 transition-colors px-4 py-1.5 rounded-full text-sm font-bold shadow-sm">
            View DB Schema
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-purple-50 to-white pt-12 pb-32">
        <div className="container mx-auto px-4 relative z-10">
          <Breadcrumb paths={getBreadcrumbPaths('/')} />
          <div className="text-center mt-12">
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-gray-900 mb-6 tracking-tight">
              Human Development Hub
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              A platform for human development. Transform ideas into reality. Create projects, collaborate and make a lasting impact.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-wrap justify-center gap-4 mb-8">
              <Link to={ROUTES.REGISTER}>
                <Button size="lg" className="bg-purple-600 text-white hover:bg-purple-700 px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all font-semibold">
                  Start Your Journey
                </Button>
              </Link>
              <Link to={ROUTES.PROJECTS}>
                <Button size="lg" variant="outline" className="px-8 py-6 rounded-xl border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold">
                  Explore the Platform
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
        
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-1/4 left-10 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-1/3 right-10 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-10 left-1/2 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>
      </section>

      <SearchBar />

      {/* Core Features Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-gray-900 mb-4">Tools for You to Build</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Empowering communities to connect, collaborate, exchange and thrive together.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}>
                <Card hover className="p-8 text-center h-full flex flex-col group border-transparent hover:border-purple-100">
                  <div className="w-16 h-16 mx-auto bg-purple-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-600 transition-colors duration-300 shrink-0">
                    <feature.icon className="w-8 h-8 text-purple-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed flex-grow mb-6">{feature.desc}</p>
                  <Link to={feature.link} className="mt-auto block">
                    <Button variant="outline" className="w-full border-purple-200 text-purple-700 hover:bg-purple-600 hover:text-white transition-colors font-medium">
                      {feature.cta}
                    </Button>
                  </Link>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <LatestProjects />
      <LatestCommunities />
      <LatestJobs />
      <LatestLearning />
      <LatestMarketplace />
      <BlogSection />
    </>
  );
}

export default LandingPage;