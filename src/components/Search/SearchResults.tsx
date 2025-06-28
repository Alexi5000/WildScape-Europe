import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCampsiteStore } from '@/store/campsiteStore';
import { CampsiteCard } from '../Campsite/CampsiteCard';
import { LoadingSpinner } from '../UI/LoadingSpinner';

export const SearchResults: React.FC = () => {
  const { filteredCampsites, isLoading, searchQuery } = useCampsiteStore();

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">
          {searchQuery ? `Search Results for "${searchQuery}"` : 'All Campsites'}
        </h2>
        <span className="text-gray-400">
          {filteredCampsites.length} {filteredCampsites.length === 1 ? 'campsite' : 'campsites'} found
        </span>
      </div>

      {/* Results Grid */}
      <AnimatePresence mode="wait">
        {filteredCampsites.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filteredCampsites.map((campsite, index) => (
              <motion.div
                key={campsite.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <CampsiteCard campsite={campsite} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="text-6xl mb-4">🏕️</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No campsites found
            </h3>
            <p className="text-gray-400 mb-6">
              Try adjusting your search criteria or filters
            </p>
            <button className="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors">
              Clear Filters
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};