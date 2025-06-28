import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Filter, MapPin } from 'lucide-react';
import { useSearch } from '@/hooks/useSearch';
import { useSearchStore } from '@/store/searchStore';

export const MorphingSearchBar: React.FC = () => {
  const { searchQuery, suggestions, isLoading, handleSearch, handleSuggestionSelect, clearSearch } = useSearch();
  const { isExpanded, setExpanded } = useSearchStore();
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  const handleExpand = () => {
    setExpanded(true);
  };

  const handleCollapse = () => {
    if (!searchQuery.trim()) {
      setExpanded(false);
      setIsFocused(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearch(e.target.value);
  };

  const handleClear = () => {
    clearSearch();
    handleCollapse();
  };

  return (
    <div className="relative z-50">
      <motion.div
        className={`relative overflow-hidden transition-all duration-500 ${
          isExpanded 
            ? 'w-96 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl' 
            : 'w-14 h-14 bg-primary hover:bg-primary/90 rounded-full shadow-lg cursor-pointer'
        }`}
        layout
        onClick={!isExpanded ? handleExpand : undefined}
        whileHover={{ scale: isExpanded ? 1 : 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {!isExpanded ? (
            <motion.div
              key="collapsed"
              className="flex items-center justify-center w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Search className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="expanded"
              className="p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {/* Search Input */}
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Search className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={handleInputChange}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="Search campsites, countries, regions..."
                  className="w-full pl-10 pr-10 py-3 bg-transparent border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition-colors text-gray-900 placeholder-gray-500"
                />
                {searchQuery && (
                  <button
                    onClick={handleClear}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                )}
              </div>

              {/* Quick Filters */}
              <div className="flex gap-2 mt-3">
                <button className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
                  <Filter className="w-3 h-3 inline mr-1" />
                  Filters
                </button>
                <button className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
                  Norway
                </button>
                <button className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
                  Aurora
                </button>
              </div>

              {/* Suggestions */}
              <AnimatePresence>
                {(isFocused || suggestions.length > 0) && (
                  <motion.div
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border overflow-hidden z-10"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isLoading ? (
                      <div className="p-4 text-center text-gray-500">
                        <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                        Searching...
                      </div>
                    ) : suggestions.length > 0 ? (
                      <div className="max-h-64 overflow-y-auto">
                        {suggestions.map((suggestion, index) => (
                          <motion.button
                            key={suggestion}
                            className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3"
                            onClick={() => handleSuggestionSelect(suggestion)}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2, delay: index * 0.05 }}
                          >
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-900">{suggestion}</span>
                          </motion.button>
                        ))}
                      </div>
                    ) : searchQuery.trim() ? (
                      <div className="p-4 text-center text-gray-500">
                        No suggestions found
                      </div>
                    ) : (
                      <div className="p-4 text-center text-gray-500">
                        Start typing to search...
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};