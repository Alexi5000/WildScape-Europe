export type AppView = 'landing' | 'hero' | 'explore' | 'map' | 'dashboard';

export interface SearchSubmission<TFilters> {
  query: string;
  filters: TFilters;
}
