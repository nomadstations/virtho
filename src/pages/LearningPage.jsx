import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Grid, List, Filter, X, GraduationCap } from 'lucide-react';
import CourseCard from '@/components/CourseCard';
import CourseListView from '@/components/CourseListView';
import SearchComponent from '@/components/SearchComponent';
import LearningFilters from '@/components/LearningFilters';
import Breadcrumb from '@/components/Breadcrumb';
import { getBreadcrumbPaths } from '@/utils/breadcrumbConfig';
import { useCoursesData } from '@/hooks/useCoursesData';
import { useFilters } from '@/hooks/useFilters';
import { useViewMode } from '@/hooks/useViewMode';
import { useSearch } from '@/hooks/useSearch';

function LearningPage() {
  const [viewMode, setViewMode] = useViewMode('virtho_learning_view', 'grid');
  const { searchTerm, setSearchTerm, clearSearch } = useSearch();
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const { courses } = useCoursesData();
  
  const { filters, setFilters, clearFilters: resetFilters } = useFilters({
    categories: [], difficulties: [], price: [], minRating: 0,
  });

  const clearAllFilters = () => { resetFilters(); clearSearch(); };

  const filteredCourses = useMemo(() => {
    // Only show active courses on the public page
    const activeCourses = courses.filter(c => c.status?.toLowerCase() === 'active');
    
    return activeCourses.filter(course => {
      if (searchTerm) {
        const q = searchTerm.toLowerCase();
        const instructorName = (course.instructor?.name || course.instructor || '').toLowerCase();
        if (!course.title.toLowerCase().includes(q) && !instructorName.includes(q)) return false;
      }
      if (filters.categories.length > 0 && !filters.categories.includes(course.category)) return false;
      if (filters.difficulties.length > 0 && !filters.difficulties.includes(course.level)) return false;
      if (filters.price.length > 0 && !filters.price.includes(course.priceType)) return false;
      if (filters.minRating > 0 && (course.rating || 0) < filters.minRating) return false;
      return true;
    });
  }, [searchTerm, filters, courses]);

  return (
    <>
      <Helmet><title>Learning Center - Virtho</title></Helmet>
      
      <div className="bg-white border-b border-gray-200 pt-8 pb-12">
        <div className="container mx-auto px-4">
          <Breadcrumb paths={getBreadcrumbPaths('/learning')} />
          <div className="text-center max-w-3xl mx-auto mt-8">
            <GraduationCap className="mx-auto h-12 w-12 text-purple-600 mb-4" />
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">Learning Center</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm sticky top-24">
              <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-100"><Filter className="w-5 h-5 text-purple-600" /><h2 className="text-xl font-bold">Filters</h2></div>
              <LearningFilters filters={filters} setFilters={setFilters} clearFilters={clearAllFilters} />
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
                    placeholder="Search courses..." 
                  />
                </div>
                <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                  <div className="flex bg-gray-50 p-1 rounded-lg border border-gray-200">
                    <button onClick={() => setViewMode('grid')} className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-white text-purple-700 shadow-sm' : 'text-gray-500'}`}><Grid className="w-5 h-5" /></button>
                    <button onClick={() => setViewMode('list')} className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-white text-purple-700 shadow-sm' : 'text-gray-500'}`}><List className="w-5 h-5" /></button>
                  </div>
                </div>
              </div>
            </div>

            <div className="min-h-[500px]">
              <AnimatePresence mode="wait">
                {filteredCourses.length === 0 ? (
                  <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="text-center py-20 bg-white rounded-2xl border border-gray-200">
                    <p className="text-gray-500 mb-2">No courses found.</p>
                    <Button variant="link" onClick={clearAllFilters} className="text-purple-600">Clear filters</Button>
                  </motion.div>
                ) : viewMode === 'grid' ? (
                  <motion.div key="grid" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredCourses.map((c, i) => <motion.div key={c.id} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:i*0.05}}><CourseCard course={c} /></motion.div>)}
                  </motion.div>
                ) : (
                  <motion.div key="list" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="flex flex-col gap-6">
                    {filteredCourses.map((c, i) => <motion.div key={c.id} initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{delay:i*0.05}}><CourseListView course={c} /></motion.div>)}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LearningPage;