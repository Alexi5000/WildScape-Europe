import type { BookingStatus, WeatherCondition } from './common';

export interface WeatherUpdatePayload {
  campsiteId: string;
  condition: WeatherCondition;
  temperature: number;
  alert: string | null;
  severity?: 'low' | 'medium' | 'high';
}

export interface AvailabilityUpdatePayload {
  campsiteId: string;
  date: string;
  available: boolean;
  spotsRemaining: number;
  message?: string;
}

export interface BookingUpdatePayload {
  campsiteId?: string;
  bookingId: string;
  status: BookingStatus;
  message: string;
  timestamp?: string;
}

export interface ReviewUpdatePayload {
  campsiteId: string;
  rating: number;
  reviewer: string;
  preview: string;
}

export interface SystemUpdatePayload {
  message: string;
  severity: 'info' | 'warning' | 'error';
}

export type LiveUpdate =
  | { type: 'weather'; data: WeatherUpdatePayload; timestamp: number }
  | { type: 'availability'; data: AvailabilityUpdatePayload; timestamp: number }
  | { type: 'booking'; data: BookingUpdatePayload; timestamp: number }
  | { type: 'review'; data: ReviewUpdatePayload; timestamp: number }
  | { type: 'system'; data: SystemUpdatePayload; timestamp: number };

export interface NotificationPreferences {
  weatherAlerts: boolean;
  bookingUpdates: boolean;
  priceDrops: boolean;
  newReviews: boolean;
  systemMessages: boolean;
}
