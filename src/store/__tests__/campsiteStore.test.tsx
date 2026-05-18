import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { Button } from '@/components/ui/button';
import { useCampsiteStore } from '../campsiteStore';

describe('useCampsiteStore', () => {
  beforeEach(() => {
    useCampsiteStore.setState({
      campsites: [],
      filteredCampsites: [],
      selectedCampsite: null,
      filters: {},
      searchQuery: '',
      isLoading: false,
      error: null,
    });
  });

  it('loads and normalizes campsite JSON into strongly typed state', async () => {
    await useCampsiteStore.getState().loadCampsites();
    const state = useCampsiteStore.getState();

    expect(state.error).toBeNull();
    expect(state.campsites.length).toBeGreaterThan(0);
    expect(state.campsites[0].location.coordinates).toHaveLength(2);
    expect(['easy', 'moderate', 'challenging', 'expert']).toContain(state.campsites[0].difficulty);
  });

  it('applies text and structured filters consistently', async () => {
    await useCampsiteStore.getState().loadCampsites();

    useCampsiteStore.getState().setSearchQuery('Norway');
    useCampsiteStore.getState().setFilters({ country: 'Norway' });

    const { filteredCampsites } = useCampsiteStore.getState();
    expect(filteredCampsites.length).toBeGreaterThan(0);
    expect(filteredCampsites.every(campsite => campsite.location.country === 'Norway')).toBe(true);
  });

  it('translates search filters into campsite filters safely', async () => {
    await useCampsiteStore.getState().loadCampsites();

    useCampsiteStore.getState().setSearchFilters({
      location: 'Switzerland',
      difficulty: 'moderate',
      guests: 4,
      priceRange: [0, 150],
      amenities: ['mountain_views'],
      dateRange: [null, null],
    });

    const { filters } = useCampsiteStore.getState();
    expect(filters).toMatchObject({
      country: 'Switzerland',
      difficulty: 'moderate',
      capacity: 4,
      priceRange: [0, 150],
    });
  });
});

describe('Button adapter', () => {
  it('renders a semantic button and forwards click handlers', async () => {
    const user = userEvent.setup();
    let clicks = 0;

    render(<Button size="icon" variant="secondary" onClick={() => { clicks += 1; }}>Zoom</Button>);
    await user.click(screen.getByRole('button', { name: 'Zoom' }));

    expect(clicks).toBe(1);
  });
});
