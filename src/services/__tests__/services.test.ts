import { describe, expect, it, vi } from 'vitest';
import { productionService } from '../serviceFacade';
import type { Campsite } from '../../types/campsite';
import { enhancedApiService } from '../enhancedApi';
import { realTimeService } from '../realTimeService';

describe('productionService campsite repository facade', () => {
  it('returns a production-sized campsite catalogue with stable identifiers', async () => {
    const campsites = await productionService.getCampsites();

    expect(campsites).toHaveLength(150);
    expect(campsites[0]).toMatchObject({
      id: 'camp_001',
      location: expect.objectContaining({ country: expect.any(String) }),
    });
    expect(campsites[0].location.coordinates).toHaveLength(2);
  });

  it('searches by country, difficulty, price, capacity, and amenities without mutating results', async () => {
    const results = await productionService.searchCampsites({
      country: 'Norway',
      difficulty: 'easy',
      priceRange: [0, 200],
      capacity: 5,
      amenities: ['aurora_viewing'],
    });

    expect(results.length).toBeGreaterThan(0);
    expect(results.every((campsite: Campsite) => campsite.location.country === 'Norway')).toBe(true);
    expect(results.every((campsite: Campsite) => campsite.difficulty === 'easy')).toBe(true);
    expect(results.every((campsite: Campsite) => campsite.amenities.includes('aurora_viewing'))).toBe(true);
  });

  it('creates and cancels bookings through a narrow booking boundary', async () => {
    const booking = await productionService.submitBooking({
      campsiteId: 'camp_001',
      selectedDates: ['2026-06-01', '2026-06-03'],
      guests: 2,
      totalPrice: 240,
      userDetails: {
        name: 'Test Explorer',
        email: 'test@example.com',
        phone: '+47 555 0100',
      },
    });

    expect(booking.success).toBe(true);
    expect(booking.confirmationNumber).toMatch(/^WS[A-Z0-9]+$/);

    expect(booking.bookingId).toEqual(expect.any(String));

    const cancelled = await productionService.cancelBooking(booking.bookingId as string);
    expect(cancelled).toBe(true);
  });
});

describe('enhancedApiService orchestration', () => {
  it('records search history and recently viewed campsites as application-level concerns', async () => {
    await enhancedApiService.searchCampsites({ query: 'Norway' });
    await enhancedApiService.getCampsiteById('camp_001');

    await expect(enhancedApiService.getSearchHistory()).resolves.toContain('Norway');
    await expect(enhancedApiService.getRecentlyViewed()).resolves.toContain('camp_001');
  });

  it('returns aurora forecasts only for eligible northern latitudes', async () => {
    await expect(enhancedApiService.getAuroraForecast([10, 64])).resolves.toMatchObject({
      probability: expect.any(Number),
      visibility: expect.any(String),
    });

    await expect(enhancedApiService.getAuroraForecast([10, 45])).resolves.toMatchObject({
      probability: 0,
      message: 'Aurora not visible at this latitude',
    });
  });

  it('supports user profile and wishlist operations without leaking repository internals', async () => {
    const profile = await enhancedApiService.createUserProfile({
      name: 'Integration Camper',
      email: 'integration@example.com',
    });

    await expect(enhancedApiService.addToWishlist(profile.id, 'camp_010')).resolves.toBe(true);
    await expect(enhancedApiService.removeFromWishlist(profile.id, 'camp_010')).resolves.toBe(true);
  });
});

describe('realTimeService event bus', () => {
  it('broadcasts typed booking updates to subscribers and supports unsubscription', () => {
    const listener = vi.fn();
    realTimeService.subscribe('test-listener', listener);

    realTimeService.simulateBookingUpdate('booking_001', 'confirmed');

    expect(listener).toHaveBeenCalledWith(expect.objectContaining({
      type: 'booking',
      data: expect.objectContaining({ bookingId: 'booking_001', status: 'confirmed' }),
    }));

    realTimeService.unsubscribe('test-listener');
    realTimeService.simulateBookingUpdate('booking_001', 'cancelled');
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('honors notification preferences for weather alerts', () => {
    const listener = vi.fn();
    realTimeService.subscribe('weather-listener', listener);
    realTimeService.updateNotificationPreferences({ weatherAlerts: false });

    realTimeService.simulateWeatherAlert('camp_001', 'high');
    expect(listener).not.toHaveBeenCalled();

    realTimeService.updateNotificationPreferences({ weatherAlerts: true });
    realTimeService.unsubscribe('weather-listener');
  });
});
