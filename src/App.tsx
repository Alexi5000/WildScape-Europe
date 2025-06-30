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
import { ForestParticles } from './components/UI/ForestParticles';
import { ForestLoadingSpinner } from './components/UI/ForestLoadingSpinner';

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
    setSearchFilters,
    isLoading: campsitesLoading,
    error: campsitesError
  } = useCampsiteStore();
  
  const { 
    theme = 'dark',
    weatherEffectsEnabled = true,
    currentWeatherCondition = 'clear',
    setCurrentWeatherCondition 
  } = useUIStore();
  
  const [currentView, setCurrentView] = useState<'hero' | 'explore' | 'map' | 'dashboard'>('hero');
  const [isLoading, setIsLoading] = useState(true);
  const [appError, setAppError] = useState<string | null>(null);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        setIsLoading(true);
        setAppError(null);
        
        // Initialize enhanced API service
        await loadCampsites();
        
        // Connect to real-time service
        realTimeService.connect();
        
        // Simulate some initial data loading
        await Promise.all([
          enhancedApiService.getFeaturedCampsites(),
          enhancedApiService.getPopularDestinations()
        ]);
        
      } catch (error) {
        console.error('Failed to initialize app:', error);
        setAppError(error instanceof Error ? error.message : 'Failed to initialize application');
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
    }, 15000); // Change every 15 seconds

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

  // Show error state
  if (appError || campsitesError) {
    return (
      <div className="min-h-screen bg-forest-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-xl shadow-forest-lg max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-forest-900 mb-4">
            Oops! Something went wrong
          </h2>
          <p className="text-forest-700 mb-6">
            {appError || campsitesError}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="btn btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Show loading state while app initializes
  if (isLoading || campsitesLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-forest-50 to-forest-100 flex items-center justify-center">
        <ForestLoadingSpinner 
          size="lg" 
          message="Preparing your forest adventure..." 
        />
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-forest-900 to-forest-800 text-white' 
        : 'bg-gradient-to-br from-forest-50 to-forest-100 text-forest-900'
    }`}>
      {/* Background Effects */}
      <AnimatePresence mode="wait">
        {currentView === 'hero' && (
          <>
            <ForestParallax />
            {theme === 'dark' && <AuroraBackground />}
          </>
        )}
      </AnimatePresence>

      {/* Global Weather Effects */}
      {weatherEffectsEnabled && currentView !== 'dashboard' && (
        <WeatherParticles condition={currentWeatherCondition} intensity={0.6} />
      )}

      {/* Forest Particles */}
      {currentView === 'hero' && (
        <ForestParticles density="medium" types={['leaf', 'pollen']} />
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
              className="px-4 py-2 glass-forest rounded-lg border border-forest-200 text-forest-700 hover:bg-forest-100 transition-all flex items-center gap-2"
            >
              🏠 Home
            </button>
            <button
              onClick={handleDashboardView}
              className="px-4 py-2 glass-forest rounded-lg border border-forest-200 text-forest-700 hover:bg-forest-100 transition-all flex items-center gap-2"
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
                  <h1 className="text-4xl font-display font-bold text-forest-800">
                    Explore Forest Campsites
                  </h1>
                  <p className="text-forest-600 mt-2">
                    Discover {filteredCampsites.length} amazing forest camping destinations
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <MorphingSearchBar 
                    onSearch={handleSearch}
                    onFilterChange={handleFilterChange}
                  />
                  <button
                    onClick={handleMapView}
                    className="px-6 py-3 bg-forest-600 hover:bg-forest-700 text-white rounded-lg transition-colors flex items-center gap-2"
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
            <div className="flex items-center justify-between p-6 glass-forest-dark backdrop-blur-sm">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setCurrentView('explore')}
                  className="text-white hover:text-forest-300 transition-colors"
                >
                  ← Back to Results
                </button>
                <h1 className="text-2xl font-bold text-white">3D Forest Terrain Map</h1>
                <span className="text-sm text-forest-200">
                  {filteredCampsites.length} forest campsites
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