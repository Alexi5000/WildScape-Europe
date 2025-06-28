import { useState, useEffect, useCallback } from 'react';
import { useCampsiteStore } from '@/store/campsiteStore';
import { useSearchStore } from '@/store/searchStore';
import { apiService } from '@/services/api';

export const useSearch = () => {
  const { setSearchQuery, applyFilters } = useCampsiteStore();
  const { 
    searchQuery, 
    suggestions, 
    isLoading,
    setSearchQuery: setStoreQuery,
    setSuggestions,
    setLoading
  } = useSearchStore();

  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Update campsite store when debounced query changes
  useEffect(() => {
    setSearchQuery(debouncedQuery);
    applyFilters();
  }, [debouncedQuery, setSearchQuery, applyFilters]);

  // Fetch suggestions
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      setLoading(true);
      try {
        const newSuggestions = await apiService.getSuggestions(searchQuery);
        setSuggestions(newSuggestions);
      } catch (error) {
        console.error('Failed to fetch suggestions:', error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, [searchQuery, setSuggestions, setLoading]);

  const handleSearch = useCallback((query: string) => {
    setStoreQuery(query);
  }, [setStoreQuery]);

  const handleSuggestionSelect = useCallback((suggestion: string) => {
    setStoreQuery(suggestion);
    setSuggestions([]);
  }, [setStoreQuery, setSuggestions]);

  const clearSearch = useCallback(() => {
    setStoreQuery('');
    setSuggestions([]);
  }, [setStoreQuery, setSuggestions]);

  return {
    searchQuery,
    suggestions,
    isLoading,
    handleSearch,
    handleSuggestionSelect,
    clearSearch
  };
};