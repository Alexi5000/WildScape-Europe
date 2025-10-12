import { MountainHero } from './MountainHero';
import { TourFilters } from './TourFilters';
import { ToursSection } from './ToursSection';

interface LandingPageProps {
  onExploreClick: () => void;
}

export const LandingPage = ({ onExploreClick }: LandingPageProps) => {
  return (
    <div className="min-h-screen bg-[#F5F2ED]">
      <MountainHero onExploreClick={onExploreClick} />
      <TourFilters />
      <ToursSection />
    </div>
  );
};

