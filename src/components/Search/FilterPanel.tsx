import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, ChevronDown } from 'lucide-react';
import { useCampsiteStore } from '@/store/campsiteStore';
import { CampsiteFilter } from '@/types/campsite';

export const FilterPanel: React.FC = () => {
  const { filters, setFilters } = useCampsiteStore();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const countries = ['Norway', 'Switzerland', 'Portugal', 'Germany', 'Italy'];
  const difficulties = ['easy', 'moderate', 'challenging'];
  const amenities = [
    'aurora_viewing', 'hiking_trails', 'fishing', 'wildlife_watching',
    'mountain_views', 'beach_access', 'surfing', 'stargazing'
  ];

  const handleFilterChange = (key: keyof CampsiteFilter, value: any) => {
    setFilters({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    setFilters({});
  };

  const hasActiveFilters = Object.keys(filters).length > 0;

  return (
    <div className="relative">
      <motion.button
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
          hasActiveFilters
            ? 'bg-primary text-white shadow-lg'
            : 'bg-white/90 hover:bg-white text-gray-700 shadow-md'
        } backdrop-blur-sm`}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Filter className="w-4 h-4" />
        <span>Filters</span>
        {hasActiveFilters && (
          <span className="bg-white/20 text-xs px-2 py-1 rounded-full">
            {Object.keys(filters).length}
          </span>
        )}
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border overflow-hidden z-50"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-semibold text-gray-900">Filters</h3>
              <div className="flex items-center gap-2">
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    Clear all
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {/* Country Filter */}
              <div className="p-4 border-b">
                <h4 className="font-medium text-gray-900 mb-3">Country</h4>
                <div className="grid grid-cols-2 gap-2">
                  {countries.map((country) => (
                    <label key={country} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="country"
                        value={country}
                        checked={filters.country === country}
                        onChange={(e) => handleFilterChange('country', e.target.value)}
                        className="text-primary focus:ring-primary"
                      />
                      <span className="text-sm text-gray-700">{country}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Difficulty Filter */}
              <div className="p-4 border-b">
                <h4 className="font-medium text-gray-900 mb-3">Difficulty</h4>
                <div className="flex gap-2">
                  {difficulties.map((difficulty) => (
                    <button
                      key={difficulty}
                      onClick={() => handleFilterChange('difficulty', 
                        filters.difficulty === difficulty ? undefined : difficulty
                      )}
                      className={`px-3 py-1 text-sm rounded-full transition-colors capitalize ${
                        filters.difficulty === difficulty
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      }`}
                    >
                      {difficulty}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="p-4 border-b">
                <h4 className="font-medium text-gray-900 mb-3">Price Range (€/night)</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.priceRange?.[0] || ''}
                      onChange={(e) => {
                        const min = parseInt(e.target.value) || 0;
                        const max = filters.priceRange?.[1] || 100;
                        handleFilterChange('priceRange', [min, max]);
                      }}
                      className="w-20 px-2 py-1 border rounded text-sm"
                    />
                    <span className="text-gray-500">to</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.priceRange?.[1] || ''}
                      onChange={(e) => {
                        const min = filters.priceRange?.[0] || 0;
                        const max = parseInt(e.target.value) || 100;
                        handleFilterChange('priceRange', [min, max]);
                      }}
                      className="w-20 px-2 py-1 border rounded text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Amenities Filter */}
              <div className="p-4">
                <h4 className="font-medium text-gray-900 mb-3">Amenities</h4>
                <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto">
                  {amenities.map((amenity) => (
                    <label key={amenity} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.amenities?.includes(amenity) || false}
                        onChange={(e) => {
                          const currentAmenities = filters.amenities || [];
                          if (e.target.checked) {
                            handleFilterChange('amenities', [...currentAmenities, amenity]);
                          } else {
                            handleFilterChange('amenities', 
                              currentAmenities.filter(a => a !== amenity)
                            );
                          }
                        }}
                        className="text-primary focus:ring-primary"
                      />
                      <span className="text-sm text-gray-700 capitalize">
                        {amenity.replace('_', ' ')}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};