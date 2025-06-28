import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, MapPin, Users, Star } from 'lucide-react';
import { SearchFilters } from '@/types/campsite';

interface MorphingSearchBarProps {
  onSearch: (data: { query: string; filters: SearchFilters }) => void;
  onFilterChange: (filters: SearchFilters) => void;
}

export const MorphingSearchBar = ({ onSearch, onFilterChange }: MorphingSearchBarProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({
    location: '',
    dateRange: [null, null],
    guests: 2,
    amenities: [],
    difficulty: 'any',
    priceRange: [0, 200]
  });
  
  const searchRef = useRef<HTMLDivElement>(null);
  
  const popularSearches = [
    'Northern Lights Norway',
    'Alpine Camping Switzerland', 
    'Forest Retreat Germany',
    'Coastal Camping Portugal',
    'Mountain Views Austria'
  ];
  
  const amenityOptions = [
    { id: 'aurora_viewing', label: 'Aurora Viewing', icon: '🌌' },
    { id: 'hiking_trails', label: 'Hiking Trails', icon: '🥾' },
    { id: 'fishing', label: 'Fishing', icon: '🎣' },
    { id: 'wildlife_watching', label: 'Wildlife', icon: '🦌' },
    { id: 'hot_springs', label: 'Hot Springs', icon: '♨️' },
    { id: 'lake_access', label: 'Lake Access', icon: '🏊' }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const handleSearch = () => {
    onSearch({ query: searchQuery, filters });
  };

  const updateFilters = (newFilters: Partial<SearchFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-4xl mx-auto">
      {/* Main search bar */}
      <motion.div
        className="relative"
        layout
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <motion.div
          className={`relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden transition-all duration-300 ${
            isExpanded ? 'shadow-2xl shadow-emerald-500/20' : 'shadow-lg'
          }`}
          animate={{
            height: isExpanded ? 'auto' : '64px'
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {/* Search input */}
          <div className="flex items-center p-4">
            <Search className="text-white/60 mr-3" size={20} />
            <input
              type="text"
              placeholder="Search for camping destinations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsExpanded(true)}
              className="flex-1 bg-transparent text-white placeholder-white/60 outline-none text-lg"
            />
            <motion.button
              className="ml-3 p-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <Filter size={16} />
            </motion.button>
          </div>

          {/* Expanded filters */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="border-t border-white/10"
              >
                <div className="p-6 space-y-6">
                  {/* Quick filters */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Location */}
                    <div className="space-y-2">
                      <label className="text-white/80 text-sm font-medium flex items-center">
                        <MapPin size={16} className="mr-2" />
                        Location
                      </label>
                      <select 
                        className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white"
                        value={filters.location}
                        onChange={(e) => updateFilters({ location: e.target.value })}
                      >
                        <option value="">All Countries</option>
                        <option value="norway">Norway</option>
                        <option value="sweden">Sweden</option>
                        <option value="finland">Finland</option>
                        <option value="iceland">Iceland</option>
                        <option value="switzerland">Switzerland</option>
                        <option value="austria">Austria</option>
                        <option value="germany">Germany</option>
                      </select>
                    </div>

                    {/* Guests */}
                    <div className="space-y-2">
                      <label className="text-white/80 text-sm font-medium flex items-center">
                        <Users size={16} className="mr-2" />
                        Guests
                      </label>
                      <select 
                        className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white"
                        value={filters.guests}
                        onChange={(e) => updateFilters({ guests: parseInt(e.target.value) })}
                      >
                        <option value={1}>1 Guest</option>
                        <option value={2}>2 Guests</option>
                        <option value={4}>3-4 Guests</option>
                        <option value={6}>5-6 Guests</option>
                        <option value={8}>7+ Guests</option>
                      </select>
                    </div>

                    {/* Difficulty */}
                    <div className="space-y-2">
                      <label className="text-white/80 text-sm font-medium flex items-center">
                        <Star size={16} className="mr-2" />
                        Difficulty
                      </label>
                      <select 
                        className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white"
                        value={filters.difficulty}
                        onChange={(e) => updateFilters({ difficulty: e.target.value })}
                      >
                        <option value="any">Any Level</option>
                        <option value="easy">Easy</option>
                        <option value="moderate">Moderate</option>
                        <option value="challenging">Challenging</option>
                        <option value="expert">Expert</option>
                      </select>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="space-y-3">
                    <label className="text-white/80 text-sm font-medium">Amenities</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {amenityOptions.map((amenity) => (
                        <motion.button
                          key={amenity.id}
                          className={`p-3 rounded-lg border transition-all text-left ${
                            filters.amenities.includes(amenity.id)
                              ? 'bg-emerald-500/30 border-emerald-400 text-white'
                              : 'bg-white/5 border-white/20 text-white/70 hover:bg-white/10'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            const newAmenities = filters.amenities.includes(amenity.id)
                              ? filters.amenities.filter(a => a !== amenity.id)
                              : [...filters.amenities, amenity.id];
                            updateFilters({ amenities: newAmenities });
                          }}
                        >
                          <div className="flex items-center">
                            <span className="text-lg mr-2">{amenity.icon}</span>
                            <span className="text-sm">{amenity.label}</span>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Price range */}
                  <div className="space-y-3">
                    <label className="text-white/80 text-sm font-medium">
                      Price Range: €{filters.priceRange[0]} - €{filters.priceRange[1]} per night
                    </label>
                    <div className="relative">
                      <input
                        type="range"
                        min="0"
                        max="200"
                        step="10"
                        value={filters.priceRange[1]}
                        onChange={(e) => updateFilters({
                          priceRange: [filters.priceRange[0], parseInt(e.target.value)]
                        })}
                        className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                      />
                    </div>
                  </div>

                  {/* Search button */}
                  <motion.button
                    className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-emerald-500/25 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSearch}
                  >
                    Search Campsites
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Popular searches */}
        <AnimatePresence>
          {isExpanded && searchQuery === '' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="absolute top-full left-0 right-0 mt-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4 z-50"
            >
              <h4 className="text-white/80 text-sm font-medium mb-3">Popular Searches</h4>
              <div className="space-y-2">
                {popularSearches.map((search) => (
                  <motion.button
                    key={search}
                    className="w-full text-left p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                    whileHover={{ x: 4 }}
                    onClick={() => {
                      setSearchQuery(search);
                      handleSearch();
                    }}
                  >
                    {search}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};