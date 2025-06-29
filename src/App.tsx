import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCampsiteStore } from './store/campsiteStore';
import { useUIStore } from './store/uiStore';

// Components
import { AuroraBackground } from './components/Hero/AuroraBackground';
import { HeroContent } from './components/Hero/HeroContent';
import { ForestParallax } from './components/Background/ForestParallax';
import { WeatherParticles } from './components/Map/WeatherParticles';
import { Terrain3DMap } from './components/Map/Terrain3DMap';
import { MorphingSearchBar } from './components/Search/MorphingSearchBar';
import { SearchResults } from './components/Search/SearchResults';
import { CampsiteDetails } from './components/Campsite/CampsiteDetails';
import { ThemeToggle } from './components/UI/ThemeToggle';
import { NotificationCenter } from './components/UI/NotificationCenter';
import { UserDashboard } from './components/Dashboard/UserDashboard';

// Services
import { enhancedApiService } from './services/enhancedApi';
import { realTimeService } from './services/realTimeService';

function App() {
  const { 
    loadCampsites, 
    filteredCampsites = [], 
    selectedCampsite, 
    setSelectedCampsite,
    setSearchQuery,
    setSearchFilters
  } = useCampsiteStore();
  
  const { 
    theme = 'dark',
    weatherEffectsEnabled = true,
    currentWeatherCondition = 'clear',
    setCurrentWeatherCondition 
  } = useUIStore();
  
  const [currentView, setCurrentView] = useState<'hero' | 'explore' | 'map' | 'dashboard'>('hero');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        setIsLoading(true);
        
        // Initialize enhanced API service
        await loadCampsites();
        
        // Connect to real-time service
        realTimeService.connect();
        
        // Simulate some initial data loading
        await enhancedApiService.getFeaturedCampsites();
        await enhancedApiService.getPopularDestinations();
        
      } catch (error) {
        console.error('Failed to initialize app:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();

    // Cleanup on unmount
    return () => {
      realTimeService.disconnect();
    };
  }, [loadCampsites]);

  // Cycle through weather conditions for demo
  useEffect(() => {
    if (!setCurrentWeatherCondition) return;

    const weatherCycle = ['clear', 'rain', 'snow', 'fog', 'cloudy'] as const;
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % weatherCycle.length;
      setCurrentWeatherCondition(weatherCycle[currentIndex]);
    }, 12000); // Change every 12 seconds

    return () => clearInterval(interval);
  }, [setCurrentWeatherCondition]);

  const handleExploreClick = () => {
    setCurrentView('explore');
  };

  const handleMapView = () => {
    setCurrentView('map');
  };

  const handleDashboardView = () => {
    setCurrentView('dashboard');
  };

  const handleBackToHero = () => {
    setCurrentView('hero');
  };

  const handleSearch = ({ query, filters }: { query: string; filters: any }) => {
    if (setSearchQuery) setSearchQuery(query);
    if (setSearchFilters) setSearchFilters(filters);
  };

  const handleFilterChange = (filters: any) => {
    if (setSearchFilters) setSearchFilters(filters);
  };

  // Show loading state while app initializes
  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-center">
          <motion.div
            className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full mx-auto mb-6"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.h2
            className="text-2xl font-bold text-white mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Loading WildScape...
          </motion.h2>
          <motion.p
            className="text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Preparing your adventure
          </motion.p>
        </div>
      </div>
    );
  }

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
          </>
        )}
      </AnimatePresence>

      {/* Global Weather Effects */}
      {weatherEffectsEnabled && currentView !== 'dashboard' && (
        <WeatherParticles condition={currentWeatherCondition} intensity={0.6} />
      )}

      {/* Header Controls */}
      <div className="fixed top-6 right-6 z-40 flex items-center gap-4">
        <NotificationCenter />
        <ThemeToggle />
      </div>

      {/* Navigation */}
      {currentView !== 'hero' && (
        <div className="fixed top-6 left-6 z-40">
          <nav className="flex items-center gap-4">
            <button
              onClick={handleBackToHero}
              className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 text-white hover:bg-white/20 transition-all"
            >
              🏠 Home
            </button>
            <button
              onClick={handleDashboardView}
              className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 text-white hover:bg-white/20 transition-all"
            >
              📊 Dashboard
            </button>
          </nav>
        </div>
      )}

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
            <HeroContent onExploreClick={handleExploreClick} />
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
                  <h1 className="text-4xl font-display font-bold">
                    Explore European Campsites
                  </h1>
                  <p className="text-gray-400 mt-2">
                    Discover {filteredCampsites.length} amazing camping destinations
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <MorphingSearchBar 
                    onSearch={handleSearch}
                    onFilterChange={handleFilterChange}
                  />
                  <button
                    onClick={handleMapView}
                    className="px-6 py-3 bg-secondary hover:bg-secondary/90 text-white rounded-lg transition-colors"
                  >
                    🗺️ 3D Map View
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
                <span className="text-sm text-gray-400">
                  {filteredCampsites.length} campsites
                </span>
              </div>
              <div className="flex items-center gap-4">
                <MorphingSearchBar 
                  onSearch={handleSearch}
                  onFilterChange={handleFilterChange}
                />
              </div>
            </div>

            {/* Map Container */}
            <div className="flex-1">
              <Terrain3DMap 
                campsites={filteredCampsites}
                onCampsiteSelect={(campsite) => setSelectedCampsite?.(campsite)}
                selectedCampsite={selectedCampsite}
                currentWeatherCondition={currentWeatherCondition}
              />
            </div>
          </motion.div>
        )}

        {currentView === 'dashboard' && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            <UserDashboard />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Campsite Details Modal */}
      <AnimatePresence>
        {selectedCampsite && (
          <CampsiteDetails
            campsite={selectedCampsite}
            onClose={() => setSelectedCampsite?.(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;