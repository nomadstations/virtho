import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Grid, List, Filter, X } from 'lucide-react';
import ProjectCard from '@/components/ProjectCard';
import ProjectListView from '@/components/ProjectListView';
import SearchComponent from '@/components/SearchComponent';
import ProjectFilters from '@/components/ProjectFilters';
import Breadcrumb from '@/components/Breadcrumb';
import { getBreadcrumbPaths } from '@/utils/breadcrumbConfig';
import { useFilters } from '@/hooks/useFilters';
import { useViewMode } from '@/hooks/useViewMode';
import { useSearch } from '@/hooks/useSearch';
import { ANIMATION_VARIANTS } from '@/utils/config';

function ProjectsPage() {
  const [viewMode, setViewMode] = useViewMode('virtho_projects_view', 'grid');
  const { searchTerm, setSearchTerm, clearSearch } = useSearch();
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  
  const { filters, setFilters, clearFilters: resetFilters } = useFilters({
    categories: [], minRating: 0, status: [],
  });

  const clearAllFilters = () => { resetFilters(); clearSearch(); };

  const sampleProjects = [
    { id: 'vrth-token-launch', title: 'VRTH Token Launch Platform', description: 'A comprehensive web platform for launching and managing resource-backed tokens.', author: 'Virtho Team', publishedDate: '2025-12-15', image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop', category: 'Web Development', status: 'active', rating: 5 },
    { id: 'clean-water-tracker', title: 'Clean Water Distribution Tracker', description: 'Mobile application for field workers to track clean water deliveries.', author: 'Dr. Sarah Mitchell', publishedDate: '2025-11-28', image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=800&h=600&fit=crop', category: 'Mobile App', status: 'active', rating: 4 },
    { id: 'energy-grid-ui', title: 'Renewable Energy Dashboard UI/UX', description: 'Designing intuitive interfaces for decentralized energy platforms.', author: 'Marcus Chen', publishedDate: '2025-10-10', image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop', category: 'Design', status: 'archived', rating: 5 },
    { id: 'gold-reserve-analysis', title: 'Precious Metals Market Predictor', description: 'Machine learning model predicting gold reserve values.', author: 'Elena Rodriguez', publishedDate: '2025-09-22', image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=800&h=600&fit=crop', category: 'AI/ML', status: 'active', rating: 3 }
  ];

  const filteredProjects = useMemo(() => {
    return sampleProjects.filter(project => {
      if (searchTerm) {
        const lower = searchTerm.toLowerCase();
        if (!project.title.toLowerCase().includes(lower) && !project.description.toLowerCase().includes(lower)) return false;
      }
      if (filters.categories.length > 0 && !filters.categories.includes(project.category)) return false;
      if (filters.minRating > 0 && (project.rating || 0) < filters.minRating) return false;
      if (filters.status.length > 0 && !filters.status.includes(project.status)) return false;
      return true;
    });
  }, [searchTerm, filters]);

  return (
    <>
      <Helmet><title>Projects - Virtho Platform</title></Helmet>
      
      <div className="bg-white border-b border-gray-200 pt-8 pb-12">
        <div className="container mx-auto px-4">
          <Breadcrumb paths={getBreadcrumbPaths('/projects')} />
          <div className="text-center max-w-3xl mx-auto mt-8">
            <motion.h1 variants={ANIMATION_VARIANTS.slideUp} initial="initial" animate="animate" className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">Our Projects</motion.h1>
            <motion.p variants={ANIMATION_VARIANTS.slideUp} initial="initial" animate="animate" className="text-xl text-gray-600 leading-relaxed">Discover how our community is building the future through innovative software, design, and data solutions.</motion.p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm sticky top-24">
              <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-100"><Filter className="w-5 h-5 text-purple-600" /><h2 className="text-xl font-bold">Filters</h2></div>
              <ProjectFilters filters={filters} setFilters={setFilters} clearFilters={clearAllFilters} />
            </div>
          </aside>

          <div className="flex-1 min-w-0">
            <div className="mb-6">
              <div className="lg:hidden mb-4 flex gap-4">
                <Button onClick={() => setIsMobileFiltersOpen(true)} className="flex-1 bg-white border border-gray-200 text-gray-800 hover:bg-gray-50 shadow-sm h-12"><Filter className="w-5 h-5 mr-2" /> Filter</Button>
              </div>
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                <div className="w-full md:max-w-md">
                  <SearchComponent 
                    value={searchTerm} 
                    onChange={setSearchTerm} 
                    placeholder="Search projects..." 
                  />
                </div>
                <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                  <div className="hidden lg:block text-sm font-medium text-gray-500 mr-2">Showing {filteredProjects.length} results</div>
                  <div className="flex bg-gray-50 p-1 rounded-lg border border-gray-200">
                    <button onClick={() => setViewMode('grid')} className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-white text-purple-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}><Grid className="w-5 h-5" /></button>
                    <button onClick={() => setViewMode('list')} className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-white text-purple-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}><List className="w-5 h-5" /></button>
                  </div>
                </div>
              </div>
            </div>

            <div className="min-h-[500px]">
              <AnimatePresence mode="wait">
                {filteredProjects.length === 0 ? (
                  <motion.div variants={ANIMATION_VARIANTS.fadeIn} initial="initial" animate="animate" exit="exit" className="text-center py-20 bg-white rounded-2xl border border-gray-200">
                    <p className="text-gray-500 mb-2">No projects found.</p>
                    <Button variant="link" onClick={clearAllFilters} className="text-purple-600">Clear all filters</Button>
                  </motion.div>
                ) : viewMode === 'grid' ? (
                  <motion.div key="grid" variants={ANIMATION_VARIANTS.fadeIn} initial="initial" animate="animate" exit="exit" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredProjects.map((p, i) => <motion.div key={p.id} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:i*0.05}}><ProjectCard project={p} /></motion.div>)}
                  </motion.div>
                ) : (
                  <motion.div key="list" variants={ANIMATION_VARIANTS.fadeIn} initial="initial" animate="animate" exit="exit" className="flex flex-col gap-6">
                    {filteredProjects.map((p, i) => <motion.div key={p.id} initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{delay:i*0.05}}><ProjectListView project={p} /></motion.div>)}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
      
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="fixed inset-0 bg-gray-900/60" onClick={() => setIsMobileFiltersOpen(false)} />
          <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} className="relative w-[320px] bg-white h-full overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h2 className="text-lg font-bold">Filters</h2>
              <button onClick={() => setIsMobileFiltersOpen(false)}><X className="w-6 h-6 text-gray-500" /></button>
            </div>
            <div className="p-4"><ProjectFilters filters={filters} setFilters={setFilters} clearFilters={() => { clearAllFilters(); setIsMobileFiltersOpen(false); }} /></div>
          </motion.div>
        </div>
      )}
    </>
  );
}

export default ProjectsPage;