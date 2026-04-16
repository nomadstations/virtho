import React from 'react';
import { Users } from 'lucide-react';
import CommunityCard from './CommunityCard';
import SectionHeader from './sections/SectionHeader';
import ItemGrid from './sections/ItemGrid';
import { MOCK_COMMUNITIES } from '@/constants/mockDataConfig';

function LatestCommunities() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeader 
          title="Discover Communities" 
          icon={Users} 
          viewAllLink="/community" 
        />
        <ItemGrid 
          items={MOCK_COMMUNITIES} 
          renderItem={(community) => <CommunityCard member={community} />} 
        />
      </div>
    </section>
  );
}

export default LatestCommunities;