import type { UserPreferences, UserProfile, UserSeed } from '@/types/api';

const defaultPreferences: UserPreferences = {
  favoriteActivities: ['hiking_trails', 'photography', 'stargazing'],
  preferredDifficulty: 'moderate',
  budgetRange: [30, 100]
};

export class UserRepository {
  private currentUser: UserProfile | null = null;
  private readonly users = new Map<string, UserSeed>();

  constructor() {
    this.seedUsers();
  }

  createProfile(userData: Partial<UserProfile>): UserProfile {
    const user: UserProfile = {
      id: `user_${Date.now()}`,
      name: userData.name ?? 'Anonymous User',
      email: userData.email ?? '',
      avatar: userData.avatar,
      preferences: {
        ...defaultPreferences,
        ...userData.preferences
      },
      bookingHistory: userData.bookingHistory ?? [],
      wishlist: userData.wishlist ?? []
    };

    this.currentUser = user;
    return user;
  }

  findProfile(userId: string): UserProfile | null {
    if (this.currentUser?.id === userId || userId === 'current_user') {
      return this.currentUser;
    }

    return null;
  }

  updatePreferences(userId: string, preferences: Partial<UserPreferences>): boolean {
    const profile = this.findProfile(userId);
    if (!profile) {
      return false;
    }

    this.currentUser = {
      ...profile,
      preferences: { ...profile.preferences, ...preferences }
    };
    return true;
  }

  addToWishlist(userId: string, campsiteId: string): boolean {
    const profile = this.findProfile(userId);
    if (!profile || profile.wishlist.includes(campsiteId)) {
      return false;
    }

    this.currentUser = { ...profile, wishlist: [...profile.wishlist, campsiteId] };
    return true;
  }

  removeFromWishlist(userId: string, campsiteId: string): boolean {
    const profile = this.findProfile(userId);
    if (!profile) {
      return false;
    }

    this.currentUser = { ...profile, wishlist: profile.wishlist.filter(id => id !== campsiteId) };
    return true;
  }

  private seedUsers(): void {
    for (let index = 0; index < 100; index += 1) {
      const id = `user_${String(index + 1).padStart(3, '0')}`;
      this.users.set(id, {
        id,
        name: `WildScape Explorer ${index + 1}`,
        email: `user${index + 1}@example.com`,
        joinDate: new Date(Date.now() - index * 24 * 60 * 60 * 1000).toISOString(),
        totalBookings: index % 10,
        favoriteActivities: defaultPreferences.favoriteActivities
      });
    }

    this.currentUser = {
      id: 'current_user',
      name: 'WildScape Explorer',
      email: 'explorer@wildscape.example',
      preferences: defaultPreferences,
      bookingHistory: ['booking_001', 'booking_002'],
      wishlist: ['camp_001', 'camp_005']
    };
  }
}
