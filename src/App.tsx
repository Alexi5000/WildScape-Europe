import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCampsiteStore } from './store/campsiteStore';
import { useUIStore } from './store/uiStore';

// Enhanced Components
import { EnhancedForestParallax } from './components/Background/EnhancedForestParallax';
import { EnhancedHeroContent } from './components/Hero/EnhancedHeroContent';
import { EnhancedForestParticles } from './components/UI/EnhancedForestParticles';
import { AmbientSoundManager } from './components/Audio/AmbientSoundManager';
import { StorytellingElements } from './components/Interactive/StorytellingElements';
import { AccessibilityControls } from './components/UI/AccessibleContent';
import { EngagementMetrics, useEngagementTracking } from './components/Content/EngagementMetrics';

// Existing Components
import { WeatherParticles } from './components/Map/WeatherParticles';
import { Terrain3DMap } from './components/Map/Terrain3DMap';
import { MorphingSearchBar } from './components/Search/MorphingSearchBar';
import { SearchResults } from './components/Search/SearchResults';
import { CampsiteDetails } from './components/Campsite/CampsiteDetails';
import { ThemeToggle } from './components/UI/ThemeToggle';
import { NotificationCenter } from './components/UI/NotificationCenter';
import { UserDashboard } from './components/Dashboard/UserDashboard';
import { ForestLoadingSpinner } from './components/UI/ForestLoadingSpinner';

// Services
import { enhancedApiService } from './services/enhancedApi';
import { realTimeService } from './services/realTimeService';

// Import accessibility styles
import './styles/accessibility.css';

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
    theme = 'light',
    weatherEffectsEnabled = true,
    currentWeatherCondition = 'clear',
    setCurrentWeatherCondition 
  } = useUIStore();
  
  const [currentView, setCurrentView] = useState<'hero' | 'explore' | 'map' | 'dashboard'>('hero');
  const [isLoading, setIsLoading] = useState(true);
  const [appError, setAppError] = useState<string | null>(null);
  const [timeOfDay, setTimeOfDay] = useState<'dawn' | 'day' | 'dusk' | 'night'>('day');

  // Track user engagement
  useEngagementTracking();

  // Determine time of day based on current time
  useEffect(() => {
    const updateTimeOfDay = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 8) setTimeOfDay('dawn');
      else if (hour >= 8 && hour < 17) setTimeOfDay('day');
      else if (hour >= 17 && hour < 20) setTimeOfDay('dusk');
      else setTimeOfDay('night');
    };

    updateTimeOfDay();
    const interval = setInterval(updateTimeOfDay, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

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

  // Enhanced weather cycling with time-based conditions
  useEffect(() => {
    if (!setCurrentWeatherCondition) return;

    const getWeatherForTime = () => {
      const conditions = {
        dawn: ['fog', 'clear', 'cloudy'],
        day: ['clear', 'cloudy', 'rain'],
        dusk: ['clear', 'cloudy', 'fog'],
        night: ['clear', 'fog', 'cloudy']
      };
      
      const timeConditions = conditions[timeOfDay];
      return timeConditions[Math.floor(Math.random() * timeConditions.length)];
    };
    
    const interval = setInterval(() => {
      setCurrentWeatherCondition(getWeatherForTime() as any);
    }, 20000); // Change every 20 seconds

    return () => clearInterval(interval);
  }, [setCurrentWeatherCondition, timeOfDay]);

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

  // Show error state with enhanced styling
  if (appError || campsitesError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-forest-mist to-morning-dew flex items-center justify-center">
        <motion.div 
          className="text-center p-8 glass-forest rounded-2xl shadow-lg max-w-md"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          role="alert"
          aria-live="assertive"
        >
          <motion.div 
            className="text-forest-medium text-6xl mb-4"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🌲
          </motion.div>
          <h2 className="text-2xl font-serif font-bold text-forest-deep mb-4">
            Forest Path Blocked
          </h2>
          <p className="text-forest-primary mb-6">
            {appError || campsitesError}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="btn btn-primary focus:outline-none focus:ring-4 focus:ring-forest-light"
            aria-label="Reload the application to find another path"
          >
            Find Another Path
          </button>
        </motion.div>
      </div>
    );
  }

  // Enhanced loading state
  if (isLoading || campsitesLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-morning-dew to-forest-mist flex items-center justify-center relative overflow-hidden">
        {/* Background forest silhouette */}
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <svg viewBox="0 0 1200 800" className="w-full h-full">
            <path d="M0,600 Q200,400 400,500 T800,450 Q1000,400 1200,480 L1200,800 L0,800 Z" fill="currentColor" />
          </svg>
        </div>
        
        <ForestLoadingSpinner 
          size="lg" 
          message="Preparing your forest sanctuary..." 
        />
        
        {/* Loading particles */}
        <EnhancedForestParticles 
          density="low" 
          types={['leaf', 'dust']} 
          timeOfDay={timeOfDay}
        />
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-forest-deep to-forest-dark text-white' 
        : 'bg-gradient-to-br from-morning-dew to-forest-mist text-forest-deep'
    }`}>
      {/* Main content landmark */}
      <main id="main-content">
        {/* Enhanced Background Effects */}
        <AnimatePresence mode="wait">
          {currentView === 'hero' && (
            <motion.div
              key="hero-bg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <EnhancedForestParallax />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Weather Effects */}
        {weatherEffectsEnabled && currentView !== 'dashboard' && (
          <WeatherParticles condition={currentWeatherCondition} intensity={0.7} />
        )}

        {/* Enhanced Forest Particles */}
        {currentView === 'hero' && (
          <EnhancedForestParticles 
            density="medium" 
            types={timeOfDay === 'night' ? ['firefly', 'dust'] : ['leaf', 'pollen', 'dust']}
            timeOfDay={timeOfDay}
            windStrength={currentWeatherCondition === 'clear' ? 0.5 : 1.5}
          />
        )}

        {/* Ambient Sound Manager */}
        <AmbientSoundManager />

        {/* Interactive Storytelling */}
        {currentView === 'hero' && <StorytellingElements />}

        {/* Header Controls */}
        <div className="fixed top-6 right-6 z-40 flex items-center gap-4">
          <NotificationCenter />
          <ThemeToggle />
        </div>

        {/* Enhanced Navigation */}
        {currentView !== 'hero' && (
          <motion.div 
            className="fixed top-6 left-6 z-40"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <nav className="flex items-center gap-4" role="navigation" aria-label="Main navigation">
              <motion.button
                onClick={handleBackToHero}
                className="px-6 py-3 glass-forest rounded-xl border border-forest-light text-forest-primary hover:bg-forest-light hover:text-forest-deep transition-all flex items-center gap-2 focus:outline-none focus:ring-4 focus:ring-forest-light"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Return to forest home page"
              >
                🏠 Forest Home
              </motion.button>
              <motion.button
                onClick={handleDashboardView}
                className="px-6 py-3 glass-forest rounded-xl border border-forest-light text-forest-primary hover:bg-forest-light hover:text-forest-deep transition-all flex items-center gap-2 focus:outline-none focus:ring-4 focus:ring-forest-light"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label="View your journey log dashboard"
              >
                📊 Journey Log
              </motion.button>
            </nav>
          </motion.div>
        )}

        {/* Main Content with Enhanced Transitions */}
        <AnimatePresence mode="wait">
          {currentView === 'hero' && (
            <motion.div
              key="hero"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <EnhancedHeroContent onExploreClick={handleExploreClick} />
            </motion.div>
          )}

          {currentView === 'explore' && (
            <motion.div
              key="explore"
              className="min-h-screen pt-24 pb-12"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.8 }}
            >
              <div className="container mx-auto px-4">
                {/* Enhanced Header */}
                <motion.div 
                  className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="text-center md:text-left">
                    <h1 className="text-5xl font-serif font-bold text-forest-deep mb-4">
                      Forest Sanctuaries
                    </h1>
                    <p className="text-forest-primary text-xl">
                      Discover {filteredCampsites.length} enchanting forest camping destinations
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <MorphingSearchBar 
                      onSearch={handleSearch}
                      onFilterChange={handleFilterChange}
                    />
                    <motion.button
                      onClick={handleMapView}
                      className="px-8 py-4 bg-gradient-to-r from-forest-medium to-forest-primary text-white rounded-xl font-semibold transition-all flex items-center gap-3 shadow-lg focus:outline-none focus:ring-4 focus:ring-forest-light"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="View campsites on 3D forest map"
                    >
                      🗺️ 3D Forest Map
                    </motion.button>
                  </div>
                </motion.div>

                {/* Enhanced Search Results */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <SearchResults />
                </motion.div>
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
              transition={{ duration: 0.8 }}
            >
              {/* Enhanced Map Header */}
              <motion.div 
                className="flex items-center justify-between p-6 glass-forest backdrop-blur-lg border-b border-forest-light"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-6">
                  <motion.button
                    onClick={() => setCurrentView('explore')}
                    className="text-forest-primary hover:text-forest-medium transition-colors flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-forest-light rounded"
                    whileHover={{ x: -5 }}
                    aria-label="Return to forest campsite listings"
                  >
                    ← Return to Forest
                  </motion.button>
                  <div>
                    <h1 className="text-3xl font-serif font-bold text-forest-deep">
                      3D Forest Terrain Explorer
                    </h1>
                    <span className="text-forest-primary">
                      {filteredCampsites.length} forest sanctuaries mapped
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <MorphingSearchBar 
                    onSearch={handleSearch}
                    onFilterChange={handleFilterChange}
                  />
                </div>
              </motion.div>

              {/* Enhanced Map Container */}
              <motion.div 
                className="flex-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <Terrain3DMap 
                  campsites={filteredCampsites}
                  onCampsiteSelect={(campsite) => setSelectedCampsite?.(campsite)}
                  selectedCampsite={selectedCampsite}
                  currentWeatherCondition={currentWeatherCondition}
                />
              </motion.div>
            </motion.div>
          )}

          {currentView === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
            >
              <UserDashboard />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Campsite Details Modal */}
        <AnimatePresence>
          {selectedCampsite && (
            <CampsiteDetails
              campsite={selectedCampsite}
              onClose={() => setSelectedCampsite?.(null)}
            />
          )}
        </AnimatePresence>

        {/* Time of day indicator */}
        <motion.div 
          className="fixed bottom-6 left-6 z-30 glass-forest px-4 py-2 rounded-full"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          role="status"
          aria-label={`Current time of day: ${timeOfDay}`}
        >
          <div className="flex items-center gap-2 text-sm text-forest-primary">
            <span className="capitalize">{timeOfDay}</span>
            <div className={`w-2 h-2 rounded-full ${
              timeOfDay === 'dawn' ? 'bg-orange-300' :
              timeOfDay === 'day' ? 'bg-yellow-400' :
              timeOfDay === 'dusk' ? 'bg-orange-500' :
              'bg-blue-400'
            }`} />
          </div>
        </motion.div>
      </main>

      {/* Accessibility Controls */}
      <AccessibilityControls />

      {/* Engagement Metrics */}
      <EngagementMetrics />
    </div>
  );
}

export default App;