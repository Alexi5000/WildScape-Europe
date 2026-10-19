import { MountainHero } from "./MountainHero";
import { TourFilters } from "./TourFilters";
import { ToursSection } from "./ToursSection";

interface LandingPageProps {
  onExploreClick: () => void;
  onMapClick: () => void;
}

export const LandingPage = ({ onExploreClick, onMapClick }: LandingPageProps) => {
  return (
    <div className="min-h-screen bg-[#F5F2ED]">
      <MountainHero onExploreClick={onExploreClick} onMapClick={onMapClick} />
      <TourFilters />
      <ToursSection onMapClick={onMapClick} />
    </div>
  );
};
