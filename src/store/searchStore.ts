import { create } from 'zustand';

interface SearchStore {
  isExpanded: boolean;
  searchQuery: string;
  suggestions: string[];
  isLoading: boolean;
  
  // Actions
  setExpanded: (expanded: boolean) => void;
  setSearchQuery: (query: string) => void;
  setSuggestions: (suggestions: string[]) => void;
  setLoading: (loading: boolean) => void;
  clearSearch: () => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  isExpanded: false,
  searchQuery: '',
  suggestions: [],
  isLoading: false,

  setExpanded: (expanded) => set({ isExpanded: expanded }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSuggestions: (suggestions) => set({ suggestions }),
  setLoading: (loading) => set({ isLoading: loading }),
  clearSearch: () => set({ searchQuery: '', suggestions: [], isExpanded: false }),
}));