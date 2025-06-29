import { Campsite, Review } from '@/types/campsite';
import { WeatherData } from '@/types/weather';

// Enhanced mock backend with realistic data generation
export class MockBackend {
  private static instance: MockBackend;
  private campsites: Campsite[] = [];
  private bookings: Map<string, any> = new Map();
  private users: Map<string, any> = new Map();
  private reviews: Map<string, Review[]> = new Map();
  private weatherCache: Map<string, WeatherData> = new Map();

  public static getInstance(): MockBackend {
    if (!MockBackend.instance) {
      MockBackend.instance = new MockBackend();
    }
    return MockBackend.instance;
  }

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    // Generate comprehensive campsite data
    this.campsites = this.generateCampsites();
    this.generateUsers();
    this.generateBookings();
    this.generateReviews();
  }

  private generateCampsites(): Campsite[] {
    const countries = [
      { name: 'Norway', regions: ['Lofoten Islands', 'Nordkapp', 'Tromsø', 'Bergen', 'Stavanger'], coords: [10.0, 60.0] },
      { name: 'Sweden', regions: ['Lapland', 'Gothenburg', 'Stockholm', 'Malmö', 'Kiruna'], coords: [15.0, 62.0] },
      { name: 'Finland', regions: ['Lapland', 'Helsinki', 'Turku', 'Rovaniemi', 'Oulu'], coords: [25.0, 64.0] },
      { name: 'Iceland', regions: ['Reykjavik', 'Akureyri', 'Westfjords', 'South Coast', 'Highlands'], coords: [-19.0, 64.0] },
      { name: 'Switzerland', regions: ['Bernese Oberland', 'Valais', 'Graubünden', 'Ticino', 'Central Switzerland'], coords: [8.0, 47.0] },
      { name: 'Austria', regions: ['Tyrol', 'Salzburg', 'Carinthia', 'Styria', 'Upper Austria'], coords: [14.0, 47.5] },
      { name: 'Germany', regions: ['Black Forest', 'Bavarian Alps', 'Saxon Switzerland', 'Harz Mountains', 'Eifel'], coords: [10.0, 51.0] },
      { name: 'France', regions: ['French Alps', 'Pyrenees', 'Provence', 'Brittany', 'Corsica'], coords: [2.0, 46.0] },
      { name: 'Italy', regions: ['Tuscany', 'Dolomites', 'Lake Como', 'Amalfi Coast', 'Sicily'], coords: [12.0, 42.0] },
      { name: 'Portugal', regions: ['Algarve Coast', 'Porto', 'Azores', 'Madeira', 'Central Portugal'], coords: [-8.0, 39.5] },
      { name: 'Spain', regions: ['Pyrenees', 'Andalusia', 'Galicia', 'Basque Country', 'Canary Islands'], coords: [-4.0, 40.0] },
      { name: 'Croatia', regions: ['Dalmatia', 'Istria', 'Plitvice', 'Krka', 'Kornati'], coords: [16.0, 45.0] },
      { name: 'Slovenia', regions: ['Julian Alps', 'Triglav', 'Lake Bled', 'Postojna', 'Maribor'], coords: [14.5, 46.0] },
      { name: 'Czech Republic', regions: ['Bohemian Paradise', 'Krkonoše', 'Šumava', 'Moravian Karst', 'Jeseníky'], coords: [15.5, 49.5] },
      { name: 'Poland', regions: ['Tatra Mountains', 'Zakopane', 'Białowieża', 'Mazury', 'Sudetes'], coords: [19.0, 52.0] }
    ];

    const amenities = [
      'aurora_viewing', 'hiking_trails', 'fishing', 'wildlife_watching', 'mountain_views',
      'beach_access', 'surfing', 'stargazing', 'photography', 'kayaking', 'rock_climbing',
      'hot_springs', 'lake_access', 'forest_trails', 'cycling', 'skiing', 'snowshoeing',
      'bird_watching', 'mushroom_foraging', 'meditation', 'yoga', 'spa_access', 'sauna',
      'wine_tasting', 'cooking_classes', 'cultural_tours', 'historical_sites', 'museums',
      'local_markets', 'festivals', 'concerts', 'art_galleries', 'craft_workshops'
    ];

    const difficulties = ['easy', 'moderate', 'challenging', 'expert'];
    const weatherConditions = ['clear', 'rain', 'snow', 'fog', 'cloudy'];

    const campsiteNames = [
      'Aurora Valley Wilderness', 'Alpine Serenity Base', 'Midnight Sun Fjord', 'Black Forest Sanctuary',
      'Coastal Dunes Paradise', 'Tuscany Hills Retreat', 'Nordic Lights Haven', 'Mountain Peak Lodge',
      'Forest Whisper Camp', 'Ocean Breeze Sanctuary', 'Starlight Meadows', 'Crystal Lake Retreat',
      'Wildflower Valley', 'Eagle\'s Nest Overlook', 'Moonbeam Clearing', 'Sunset Ridge Camp',
      'Whispering Pines', 'Golden Hour Plateau', 'Misty Mountain Base', 'Emerald Forest Lodge',
      'Silver Stream Camp', 'Thunder Valley Retreat', 'Peaceful Harbor', 'Adventure Peak Base',
      'Serenity Springs', 'Wilderness Edge Camp', 'Nature\'s Gateway', 'Harmony Hills',
      'Tranquil Waters', 'Explorer\'s Paradise', 'Hidden Gem Camp', 'Scenic Vista Lodge',
      'Pristine Wilderness', 'Adventure Basecamp', 'Natural Wonder Site', 'Outdoor Paradise',
      'Mountain Spirit Lodge', 'Forest Heart Camp', 'Lake Mirror Retreat', 'Sky High Base',
      'River Bend Camp', 'Valley View Lodge', 'Peak Performance Base', 'Nature\'s Embrace',
      'Wild Spirit Camp', 'Outdoor Adventure Hub', 'Mountain Echo Lodge', 'Forest Dream Camp',
      'Lake Serenity Base', 'Alpine Adventure Lodge', 'Wilderness Wonder Camp', 'Nature\'s Haven'
    ];

    const descriptions = [
      'Experience pristine wilderness with breathtaking views and untouched nature.',
      'Immerse yourself in the tranquility of ancient forests and crystal-clear streams.',
      'Discover the magic of the northern lights in this remote wilderness location.',
      'Enjoy panoramic mountain views from this elevated camping paradise.',
      'Relax by pristine lakes surrounded by towering peaks and alpine meadows.',
      'Explore diverse ecosystems and encounter local wildlife in their natural habitat.',
      'Perfect for stargazing with minimal light pollution and clear mountain air.',
      'Adventure awaits with hiking trails leading to spectacular viewpoints.',
      'Peaceful retreat offering meditation spaces and wellness activities.',
      'Family-friendly location with easy access to outdoor recreational activities.',
      'Photographer\'s paradise with stunning landscapes and golden hour lighting.',
      'Remote wilderness experience for those seeking solitude and adventure.',
      'Coastal camping with direct beach access and water sports opportunities.',
      'Mountain biking trails and rock climbing routes for adventure enthusiasts.',
      'Cultural immersion with nearby historical sites and local traditions.',
      'Luxury camping experience with premium amenities and services.',
      'Eco-friendly site promoting sustainable tourism and conservation.',
      'Seasonal camping with unique experiences throughout the year.',
      'Educational programs about local flora, fauna, and conservation efforts.',
      'Romantic getaway with private sites and scenic sunset views.'
    ];

    const campsites: Campsite[] = [];

    for (let i = 0; i < 150; i++) {
      const country = countries[Math.floor(Math.random() * countries.length)];
      const region = country.regions[Math.floor(Math.random() * country.regions.length)];
      const difficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
      const weatherCondition = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
      
      // Generate coordinates near the country center with some variation
      const lat = country.coords[1] + (Math.random() - 0.5) * 8;
      const lng = country.coords[0] + (Math.random() - 0.5) * 8;
      
      // Select random amenities (3-8 per campsite)
      const numAmenities = Math.floor(Math.random() * 6) + 3;
      const selectedAmenities = amenities
        .sort(() => 0.5 - Math.random())
        .slice(0, numAmenities);

      // Generate availability for next 30 days
      const availability: Record<string, boolean> = {};
      for (let day = 0; day < 30; day++) {
        const date = new Date();
        date.setDate(date.getDate() + day);
        const dateString = date.toISOString().split('T')[0];
        availability[dateString] = Math.random() > 0.3; // 70% availability
      }

      // Generate realistic pricing based on country and difficulty
      const basePrice = country.name === 'Switzerland' || country.name === 'Norway' ? 60 : 
                       country.name === 'Germany' || country.name === 'Austria' ? 45 :
                       country.name === 'Portugal' || country.name === 'Poland' ? 25 : 35;
      
      const difficultyMultiplier = difficulty === 'expert' ? 1.5 : 
                                  difficulty === 'challenging' ? 1.3 :
                                  difficulty === 'moderate' ? 1.1 : 1.0;
      
      const price = Math.round(basePrice * difficultyMultiplier + (Math.random() * 20 - 10));

      const campsite: Campsite = {
        id: `camp_${String(i + 1).padStart(3, '0')}`,
        name: campsiteNames[i % campsiteNames.length] + (i >= campsiteNames.length ? ` ${Math.floor(i / campsiteNames.length) + 1}` : ''),
        location: {
          country: country.name,
          region: region,
          coordinates: [lng, lat],
          elevation: Math.floor(Math.random() * 2000) + 100
        },
        description: descriptions[Math.floor(Math.random() * descriptions.length)],
        amenities: selectedAmenities,
        difficulty: difficulty as 'easy' | 'moderate' | 'challenging' | 'expert',
        capacity: Math.floor(Math.random() * 20) + 5,
        price_per_night: price,
        images: [
          'https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg',
          'https://images.pexels.com/photos/2422915/pexels-photo-2422915.jpeg',
          'https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg',
          'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg',
          'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg'
        ],
        weather: {
          current: weatherCondition as 'clear' | 'rain' | 'snow' | 'fog',
          temperature: Math.floor(Math.random() * 30) - 5,
          wind_speed: Math.floor(Math.random() * 25) + 5,
          aurora_probability: lat > 60 ? Math.floor(Math.random() * 100) : undefined
        },
        availability,
        rating: Math.round((Math.random() * 2 + 3) * 10) / 10, // 3.0 - 5.0 rating
        reviews: [], // Will be populated separately
        features: {
          has_aurora_viewing: lat > 60 && selectedAmenities.includes('aurora_viewing'),
          has_hot_springs: selectedAmenities.includes('hot_springs'),
          has_lake_access: selectedAmenities.includes('lake_access'),
          has_mountain_views: selectedAmenities.includes('mountain_views')
        }
      };

      campsites.push(campsite);
    }

    return campsites;
  }

  private generateUsers() {
    const names = [
      'Sarah Johnson', 'Erik Larsson', 'Maria Garcia', 'Hans Mueller', 'Anna Kowalski',
      'Luca Rossi', 'Emma Thompson', 'Pierre Dubois', 'Sofia Andersson', 'Marco Silva',
      'Isabella Rodriguez', 'Nils Petersen', 'Camila Santos', 'Oliver Schmidt', 'Lucia Fernandez',
      'Magnus Olsen', 'Elena Popov', 'Carlos Mendoza', 'Astrid Hansen', 'Diego Martinez'
    ];

    for (let i = 0; i < 100; i++) {
      const user = {
        id: `user_${String(i + 1).padStart(3, '0')}`,
        name: names[Math.floor(Math.random() * names.length)],
        email: `user${i + 1}@example.com`,
        joinDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
        totalBookings: Math.floor(Math.random() * 10),
        favoriteActivities: ['hiking', 'photography', 'stargazing', 'wildlife_watching'].slice(0, Math.floor(Math.random() * 3) + 1)
      };
      this.users.set(user.id, user);
    }
  }

  private generateBookings() {
    for (let i = 0; i < 200; i++) {
      const campsiteId = `camp_${String(Math.floor(Math.random() * 150) + 1).padStart(3, '0')}`;
      const userId = `user_${String(Math.floor(Math.random() * 100) + 1).padStart(3, '0')}`;
      
      const startDate = new Date();
      startDate.setDate(startDate.getDate() + Math.floor(Math.random() * 60) - 30);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + Math.floor(Math.random() * 7) + 1);

      const booking = {
        id: `booking_${String(i + 1).padStart(3, '0')}`,
        campsiteId,
        userId,
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        guests: Math.floor(Math.random() * 6) + 1,
        totalPrice: Math.floor(Math.random() * 500) + 100,
        status: ['confirmed', 'pending', 'cancelled'][Math.floor(Math.random() * 3)],
        createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
      };

      this.bookings.set(booking.id, booking);
    }
  }

  private generateReviews() {
    const reviewTexts = [
      'Absolutely stunning location with breathtaking views!',
      'Perfect for a peaceful getaway from city life.',
      'Great facilities and well-maintained campsite.',
      'Amazing stargazing opportunities on clear nights.',
      'Friendly staff and excellent customer service.',
      'Beautiful hiking trails nearby with varying difficulty levels.',
      'Clean facilities and well-organized camping areas.',
      'Incredible wildlife viewing opportunities.',
      'Perfect spot for photography enthusiasts.',
      'Peaceful and serene environment for relaxation.',
      'Great value for money with excellent amenities.',
      'Challenging terrain perfect for experienced campers.',
      'Family-friendly with activities for all ages.',
      'Spectacular sunrise and sunset views.',
      'Well-connected to local attractions and activities.',
      'Excellent weather during our stay.',
      'Memorable experience with unique local culture.',
      'Professional guides and informative tours.',
      'Outstanding natural beauty and pristine environment.',
      'Highly recommend for adventure seekers!'
    ];

    this.campsites.forEach(campsite => {
      const numReviews = Math.floor(Math.random() * 8) + 2; // 2-10 reviews per campsite
      const reviews: Review[] = [];

      for (let i = 0; i < numReviews; i++) {
        const userId = `user_${String(Math.floor(Math.random() * 100) + 1).padStart(3, '0')}`;
        const user = this.users.get(userId);
        
        const review: Review = {
          id: `review_${campsite.id}_${i + 1}`,
          user: user?.name || 'Anonymous User',
          rating: Math.floor(Math.random() * 2) + 4, // 4-5 star reviews mostly
          comment: reviewTexts[Math.floor(Math.random() * reviewTexts.length)],
          date: new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        };

        reviews.push(review);
      }

      campsite.reviews = reviews;
      this.reviews.set(campsite.id, reviews);
    });
  }

  // API Methods
  async getCampsites(): Promise<Campsite[]> {
    await this.delay(500);
    return [...this.campsites];
  }

  async getCampsiteById(id: string): Promise<Campsite | null> {
    await this.delay(200);
    return this.campsites.find(c => c.id === id) || null;
  }

  async searchCampsites(filters: any): Promise<Campsite[]> {
    await this.delay(400);
    
    return this.campsites.filter(campsite => {
      if (filters.query) {
        const query = filters.query.toLowerCase();
        const matchesName = campsite.name.toLowerCase().includes(query);
        const matchesCountry = campsite.location.country.toLowerCase().includes(query);
        const matchesRegion = campsite.location.region.toLowerCase().includes(query);
        
        if (!matchesName && !matchesCountry && !matchesRegion) {
          return false;
        }
      }

      if (filters.country && campsite.location.country.toLowerCase() !== filters.country.toLowerCase()) {
        return false;
      }

      if (filters.difficulty && campsite.difficulty !== filters.difficulty) {
        return false;
      }

      if (filters.priceRange) {
        const [min, max] = filters.priceRange;
        if (campsite.price_per_night < min || campsite.price_per_night > max) {
          return false;
        }
      }

      if (filters.capacity && campsite.capacity < filters.capacity) {
        return false;
      }

      if (filters.amenities && filters.amenities.length > 0) {
        const hasAllAmenities = filters.amenities.every((amenity: string) =>
          campsite.amenities.includes(amenity)
        );
        if (!hasAllAmenities) {
          return false;
        }
      }

      return true;
    });
  }

  async getWeatherData(coordinates: [number, number]): Promise<WeatherData> {
    await this.delay(300);
    
    const cacheKey = `${coordinates[0]}_${coordinates[1]}`;
    if (this.weatherCache.has(cacheKey)) {
      return this.weatherCache.get(cacheKey)!;
    }

    const conditions = ['clear', 'rain', 'snow', 'fog', 'cloudy'];
    const condition = conditions[Math.floor(Math.random() * conditions.length)];
    
    const weatherData: WeatherData = {
      temperature: Math.floor(Math.random() * 30) - 5,
      condition: condition as any,
      wind_speed: Math.floor(Math.random() * 25) + 5,
      humidity: Math.floor(Math.random() * 40) + 40,
      aurora_probability: coordinates[1] > 60 ? Math.floor(Math.random() * 100) : 0,
      forecast: this.generateForecast()
    };

    this.weatherCache.set(cacheKey, weatherData);
    return weatherData;
  }

  private generateForecast() {
    const forecast = [];
    const conditions = ['clear', 'cloudy', 'rain', 'snow', 'fog'];
    
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      
      forecast.push({
        date: date.toISOString().split('T')[0],
        temperature_high: Math.floor(Math.random() * 20 + 5),
        temperature_low: Math.floor(Math.random() * 10 - 5),
        condition: conditions[Math.floor(Math.random() * conditions.length)],
        precipitation_chance: Math.floor(Math.random() * 100)
      });
    }
    
    return forecast;
  }

  async submitBooking(bookingDetails: any): Promise<any> {
    await this.delay(1000);
    
    const bookingId = `booking_${Date.now()}`;
    const confirmationNumber = `WS${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
    
    const booking = {
      id: bookingId,
      ...bookingDetails,
      confirmationNumber,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };
    
    this.bookings.set(bookingId, booking);
    
    return {
      success: true,
      message: 'Booking confirmed successfully!',
      bookingId,
      confirmationNumber
    };
  }

  async getSuggestions(query: string): Promise<string[]> {
    await this.delay(150);
    
    if (!query || query.length < 2) return [];
    
    const suggestions = new Set<string>();
    const lowerQuery = query.toLowerCase();
    
    this.campsites.forEach(campsite => {
      if (campsite.name.toLowerCase().includes(lowerQuery)) {
        suggestions.add(campsite.name);
      }
      if (campsite.location.country.toLowerCase().includes(lowerQuery)) {
        suggestions.add(campsite.location.country);
      }
      if (campsite.location.region.toLowerCase().includes(lowerQuery)) {
        suggestions.add(campsite.location.region);
      }
    });
    
    const predefinedSuggestions = [
      'Northern Lights', 'Aurora Viewing', 'Mountain Camping', 'Forest Retreat',
      'Coastal Camping', 'Alpine Adventure', 'Wilderness Experience', 'Stargazing',
      'Hiking Trails', 'Photography', 'Wildlife Watching', 'Hot Springs'
    ];
    
    predefinedSuggestions.forEach(suggestion => {
      if (suggestion.toLowerCase().includes(lowerQuery)) {
        suggestions.add(suggestion);
      }
    });
    
    return Array.from(suggestions).slice(0, 8);
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const mockBackend = MockBackend.getInstance();