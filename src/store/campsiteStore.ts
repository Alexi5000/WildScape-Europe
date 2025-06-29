import { create } from 'zustand';
import { Campsite, CampsiteFilter, SearchFilters } from '@/types/campsite';
import campsitesData from '@/data/europeCampsites.json';

interface CampsiteStore {
  campsites: Campsite[];
  filteredCampsites: Campsite[];
  selectedCampsite: Campsite | null;
  filters: CampsiteFilter;
  searchQuery: string;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setCampsites: (campsites: Campsite[]) => void;
  setSelectedCampsite: (campsite: Campsite | null) => void;
  setFilters: (filters: CampsiteFilter) => void;
  setSearchQuery: (query: string) => void;
  setSearchFilters: (filters: SearchFilters) => void;
  applyFilters: () => void;
  loadCampsites: () => Promise<void>;
  clearError: () => void;
}

export const useCampsiteStore = create<CampsiteStore>((set, get) => ({
  campsites: [],
  filteredCampsites: [],
  selectedCampsite: null,
  filters: {},
  searchQuery: '',
  isLoading: false,
  error: null,

  setCampsites: (campsites) => {
    // Ensure campsites is always an array
    const safeCampsites = Array.isArray(campsites) ? campsites : [];
    set({ 
      campsites: safeCampsites, 
      filteredCampsites: safeCampsites,
      error: null 
    });
  },

  setSelectedCampsite: (campsite) => {
    set({ selectedCampsite: campsite });
  },

  setFilters: (filters) => {
    // Ensure filters is always an object
    const safeFilters = filters && typeof filters === 'object' ? filters : {};
    set({ filters: safeFilters });
    get().applyFilters();
  },

  setSearchQuery: (query) => {
    // Ensure query is always a string
    const safeQuery = typeof query === 'string' ? query : '';
    set({ searchQuery: safeQuery });
    get().applyFilters();
  },

  setSearchFilters: (searchFilters) => {
    // Safely convert SearchFilters to CampsiteFilter format
    if (!searchFilters || typeof searchFilters !== 'object') {
      return;
    }

    const filters: CampsiteFilter = {
      country: searchFilters.location || undefined,
      difficulty: searchFilters.difficulty !== 'any' ? searchFilters.difficulty : undefined,
      amenities: Array.isArray(searchFilters.amenities) && searchFilters.amenities.length > 0 
        ? searchFilters.amenities 
        : undefined,
      priceRange: Array.isArray(searchFilters.priceRange) && searchFilters.priceRange[1] < 200 
        ? searchFilters.priceRange 
        : undefined,
      capacity: typeof searchFilters.guests === 'number' && searchFilters.guests > 2 
        ? searchFilters.guests 
        : undefined,
    };
    
    set({ filters });
    get().applyFilters();
  },

  applyFilters: () => {
    const { campsites, filters, searchQuery } = get();
    
    // Ensure campsites is an array
    if (!Array.isArray(campsites)) {
      set({ filteredCampsites: [] });
      return;
    }
    
    let filtered = campsites.filter((campsite) => {
      // Ensure campsite is a valid object
      if (!campsite || typeof campsite !== 'object') {
        return false;
      }

      // Search query filter
      if (searchQuery && typeof searchQuery === 'string') {
        const query = searchQuery.toLowerCase();
        const name = campsite.name?.toLowerCase() || '';
        const country = campsite.location?.country?.toLowerCase() || '';
        const region = campsite.location?.region?.toLowerCase() || '';
        
        const matchesName = name.includes(query);
        const matchesCountry = country.includes(query);
        const matchesRegion = region.includes(query);
        
        if (!matchesName && !matchesCountry && !matchesRegion) {
          return false;
        }
      }

      // Country filter
      if (filters?.country && campsite.location?.country) {
        if (campsite.location.country.toLowerCase() !== filters.country.toLowerCase()) {
          return false;
        }
      }

      // Difficulty filter
      if (filters?.difficulty && campsite.difficulty !== filters.difficulty) {
        return false;
      }

      // Price range filter
      if (Array.isArray(filters?.priceRange) && typeof campsite.price_per_night === 'number') {
        const [min, max] = filters.priceRange;
        if (campsite.price_per_night < min || campsite.price_per_night > max) {
          return false;
        }
      }

      // Capacity filter
      if (typeof filters?.capacity === 'number' && typeof campsite.capacity === 'number') {
        if (campsite.capacity < filters.capacity) {
          return false;
        }
      }

      // Amenities filter
      if (Array.isArray(filters?.amenities) && filters.amenities.length > 0) {
        const campsiteAmenities = Array.isArray(campsite.amenities) ? campsite.amenities : [];
        const hasAllAmenities = filters.amenities.every(amenity =>
          campsiteAmenities.includes(amenity)
        );
        if (!hasAllAmenities) {
          return false;
        }
      }

      return true;
    });

    set({ filteredCampsites: filtered });
  },

  loadCampsites: async () => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Safely parse campsites data
      let campsites: Campsite[] = [];
      
      if (Array.isArray(campsitesData)) {
        campsites = campsitesData as Campsite[];
      } else {
        console.warn('Campsites data is not an array:', campsitesData);
        campsites = [];
      }
      
      set({ 
        campsites, 
        filteredCampsites: campsites,
        isLoading: false,
        error: null
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load campsites';
      console.error('Failed to load campsites:', error);
      set({ 
        isLoading: false, 
        error: errorMessage,
        campsites: [],
        filteredCampsites: []
      });
    }
  },

  clearError: () => {
    set({ error: null });
  },
}));