import React from 'react';
import { Briefcase } from 'lucide-react';
import JobCard from './JobCard';
import SectionHeader from './sections/SectionHeader';
import ItemGrid from './sections/ItemGrid';
import { MOCK_JOBS } from '@/constants/mockDataConfig';

function LatestJobs() {
  const recentJobs = [...MOCK_JOBS].sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate)).slice(0, 3);

  return (
    <section className="py-16 bg-gray-50 border-y border-gray-100">
      <div className="container mx-auto px-4">
        <SectionHeader 
          title="Latest Job Opportunities" 
          icon={Briefcase} 
          viewAllLink="/jobs" 
        />
        <ItemGrid 
          items={recentJobs} 
          renderItem={(job) => <JobCard job={job} />} 
        />
      </div>
    </section>
  );
}

export default LatestJobs;