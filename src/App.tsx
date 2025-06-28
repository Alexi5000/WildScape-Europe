import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCampsiteStore } from './store/campsiteStore';
import { useUIStore } from './store/uiStore';

// Components
import { AuroraBackground } from './components/Hero/AuroraBackground';
import { HeroContent } from './components/Hero/HeroContent';
import { FloatingCTA } from './components/Hero/FloatingCTA';
import { ForestParallax } from './components/Background/ForestParallax';
import { WeatherSystem } from './components/Background/WeatherSystem';
import { Terrain3DMap } from './components/Map/Terrain3DMap';
import { MorphingSearchBar } from './components/Search/MorphingSearchBar';
import { FilterPanel } from './components/Search/FilterPanel';
import { SearchResults } from './components/Search/SearchResults';
import { CampsiteDetails } from './components/Campsite/CampsiteDetails';
import { ThemeToggle } from './components/UI/ThemeToggle';

function App() {
  const { loadCampsites, selectedCampsite, setSelectedCampsite } = useCampsiteStore();
  const { theme, weatherEffectsEnabled } = useUIStore();
  const [currentView, setCurrentView] = useState<'hero' | 'explore' | 'map'>('hero');

  useEffect(() => {
    loadCampsites();
  }, [loadCampsites]);

  const handleExploreClick = () => {
    setCurrentView('explore');
  };

  const handleMapView = () => {
    setCurrentView('map');
  };

  const handleBackToHero = () => {
    setCurrentView('hero');
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' ? 'bg-dark text-white' : 'bg-light text-gray-900'
    }`}>
      {/* Background Effects */}
      <AnimatePresence mode="wait">
        {currentView === 'hero' && (
          <>
            <AuroraBackground />
            <ForestParallax />
            {weatherEffectsEnabled && <WeatherSystem enabled />}
          </>
        )}
      </AnimatePresence>

      {/* Theme Toggle */}
      <div className="fixed top-6 right-6 z-40">
        <ThemeToggle />
      </div>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {currentView === 'hero' && (
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <HeroContent onSearchClick={handleExploreClick} />
            <FloatingCTA onExploreClick={handleExploreClick} />
          </motion.div>
        )}

        {currentView === 'explore' && (
          <motion.div
            key="explore"
            className="min-h-screen pt-20 pb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.6 }}
          >
            <div className="container mx-auto px-4">
              {/* Header */}
              <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div>
                  <button
                    onClick={handleBackToHero}
                    className="text-primary hover:text-primary/80 mb-2 transition-colors"
                  >
                    ← Back to Home
                  </button>
                  <h1 className="text-4xl font-display font-bold">
                    Explore European Campsites
                  </h1>
                </div>
                <div className="flex items-center gap-4">
                  <MorphingSearchBar />
                  <FilterPanel />
                  <button
                    onClick={handleMapView}
                    className="px-6 py-3 bg-secondary hover:bg-secondary/90 text-white rounded-lg transition-colors"
                  >
                    3D Map View
                  </button>
                </div>
              </div>

              {/* Search Results */}
              <SearchResults />
            </div>
          </motion.div>
        )}

        {currentView === 'map' && (
          <motion.div
            key="map"
            className="h-screen flex flex-col"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.6 }}
          >
            {/* Map Header */}
            <div className="flex items-center justify-between p-6 bg-dark/90 backdrop-blur-sm">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setCurrentView('explore')}
                  className="text-white hover:text-primary transition-colors"
                >
                  ← Back to Results
                </button>
                <h1 className="text-2xl font-bold text-white">3D Terrain Map</h1>
              </div>
              <div className="flex items-center gap-4">
                <MorphingSearchBar />
                <FilterPanel />
              </div>
            </div>

            {/* Map Container */}
            <div className="flex-1">
              <Terrain3DMap 
                onCampsiteSelect={(campsite) => setSelectedCampsite(campsite)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Campsite Details Modal */}
      <AnimatePresence>
        {selectedCampsite && (
          <CampsiteDetails
            campsite={selectedCampsite}
            onClose={() => setSelectedCampsite(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;