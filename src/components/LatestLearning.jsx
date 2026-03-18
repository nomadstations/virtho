import React from 'react';
import { GraduationCap } from 'lucide-react';
import CourseCard from './CourseCard';
import SectionHeader from './sections/SectionHeader';
import ItemGrid from './sections/ItemGrid';
import { useCoursesData } from '@/hooks/useCoursesData';

function LatestLearning() {
  const { courses } = useCoursesData();
  
  const activeCourses = courses.filter(course => course.status?.toLowerCase() === 'active');
  const topCourses = [...activeCourses].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 3);

  if (topCourses.length === 0) return null;

  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4">
        <SectionHeader 
          title="Featured Courses" 
          icon={GraduationCap} 
          viewAllLink="/learning" 
        />
        <ItemGrid 
          items={topCourses} 
          renderItem={(course) => <CourseCard course={course} />} 
        />
      </div>
    </section>
  );
}

export default LatestLearning;