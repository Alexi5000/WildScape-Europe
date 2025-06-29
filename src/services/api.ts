import { enhancedApiService } from './enhancedApi';

// Re-export enhanced API service as the main API service
export const apiService = enhancedApiService;

// Keep existing interfaces for backward compatibility
export type {
  BookingRequest,
  BookingResponse,
  SearchFilters
} from './enhancedApi';