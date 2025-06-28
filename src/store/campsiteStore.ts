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
  
  // Actions
  setCampsites: (campsites: Campsite[]) => void;
  setSelectedCampsite: (campsite: Campsite | null) => void;
  setFilters: (filters: CampsiteFilter) => void;
  setSearchQuery: (query: string) => void;
  setSearchFilters: (filters: SearchFilters) => void;
  applyFilters: () => void;
  loadCampsites: () => Promise<void>;
}

export const useCampsiteStore = create<CampsiteStore>((set, get) => ({
  campsites: [],
  filteredCampsites: [],
  selectedCampsite: null,
  filters: {},
  searchQuery: '',
  isLoading: false,

  setCampsites: (campsites) => {
    set({ campsites, filteredCampsites: campsites });
  },

  setSelectedCampsite: (campsite) => {
    set({ selectedCampsite: campsite });
  },

  setFilters: (filters) => {
    set({ filters });
    get().applyFilters();
  },

  setSearchQuery: (query) => {
    set({ searchQuery: query });
    get().applyFilters();
  },

  setSearchFilters: (searchFilters) => {
    // Convert SearchFilters to CampsiteFilter format
    const filters: CampsiteFilter = {
      country: searchFilters.location || undefined,
      difficulty: searchFilters.difficulty !== 'any' ? searchFilters.difficulty : undefined,
      amenities: searchFilters.amenities.length > 0 ? searchFilters.amenities : undefined,
      priceRange: searchFilters.priceRange[1] < 200 ? searchFilters.priceRange : undefined,
      capacity: searchFilters.guests > 2 ? searchFilters.guests : undefined,
    };
    
    set({ filters });
    get().applyFilters();
  },

  applyFilters: () => {
    const { campsites, filters, searchQuery } = get();
    
    let filtered = campsites.filter((campsite) => {
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = campsite.name.toLowerCase().includes(query);
        const matchesCountry = campsite.location.country.toLowerCase().includes(query);
        const matchesRegion = campsite.location.region.toLowerCase().includes(query);
        
        if (!matchesName && !matchesCountry && !matchesRegion) {
          return false;
        }
      }

      // Country filter
      if (filters.country && campsite.location.country.toLowerCase() !== filters.country.toLowerCase()) {
        return false;
      }

      // Difficulty filter
      if (filters.difficulty && campsite.difficulty !== filters.difficulty) {
        return false;
      }

      // Price range filter
      if (filters.priceRange) {
        const [min, max] = filters.priceRange;
        if (campsite.price_per_night < min || campsite.price_per_night > max) {
          return false;
        }
      }

      // Capacity filter
      if (filters.capacity && campsite.capacity < filters.capacity) {
        return false;
      }

      // Amenities filter
      if (filters.amenities && filters.amenities.length > 0) {
        const hasAllAmenities = filters.amenities.every(amenity =>
          campsite.amenities.includes(amenity)
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
    set({ isLoading: true });
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const campsites = campsitesData as Campsite[];
      set({ 
        campsites, 
        filteredCampsites: campsites,
        isLoading: false 
      });
    } catch (error) {
      console.error('Failed to load campsites:', error);
      set({ isLoading: false });
    }
  },
}));