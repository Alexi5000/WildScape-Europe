import type { Campsite, Review } from '@/types/campsite';
import type { CampsiteSearchFilters } from '@/types/api';
import type { Difficulty, WeatherCondition } from '@/types/common';

interface CountryRegion {
  name: string;
  regions: string[];
  coords: [number, number];
}

const COUNTRIES: CountryRegion[] = [
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

const AMENITIES = [
  'aurora_viewing', 'hiking_trails', 'fishing', 'wildlife_watching', 'mountain_views',
  'beach_access', 'surfing', 'stargazing', 'photography', 'kayaking', 'rock_climbing',
  'hot_springs', 'lake_access', 'forest_trails', 'cycling', 'skiing', 'snowshoeing',
  'bird_watching', 'mushroom_foraging', 'meditation', 'yoga', 'spa_access', 'sauna',
  'wine_tasting', 'cooking_classes', 'cultural_tours', 'historical_sites', 'museums',
  'local_markets', 'festivals', 'concerts', 'art_galleries', 'craft_workshops'
];

const DIFFICULTIES: Difficulty[] = ['easy', 'moderate', 'challenging', 'expert'];
const WEATHER_CONDITIONS: WeatherCondition[] = ['clear', 'rain', 'snow', 'fog', 'cloudy'];

const CAMPSITE_NAMES = [
  'Aurora Valley Wilderness', 'Alpine Serenity Base', 'Midnight Sun Fjord', 'Black Forest Sanctuary',
  'Coastal Dunes Paradise', 'Tuscany Hills Retreat', 'Nordic Lights Haven', 'Mountain Peak Lodge',
  'Forest Whisper Camp', 'Ocean Breeze Sanctuary', 'Starlight Meadows', 'Crystal Lake Retreat',
  'Wildflower Valley', "Eagle's Nest Overlook", 'Moonbeam Clearing', 'Sunset Ridge Camp',
  'Whispering Pines', 'Golden Hour Plateau', 'Misty Mountain Base', 'Emerald Forest Lodge',
  'Silver Stream Camp', 'Thunder Valley Retreat', 'Peaceful Harbor', 'Adventure Peak Base',
  'Serenity Springs', 'Wilderness Edge Camp', "Nature's Gateway", 'Harmony Hills',
  'Tranquil Waters', "Explorer's Paradise", 'Hidden Gem Camp', 'Scenic Vista Lodge',
  'Pristine Wilderness', 'Adventure Basecamp', 'Natural Wonder Site', 'Outdoor Paradise'
];

const DESCRIPTIONS = [
  'Experience pristine wilderness with breathtaking views and untouched nature.',
  'Immerse yourself in the tranquility of ancient forests and crystal-clear streams.',
  'Discover the magic of the northern lights in this remote wilderness location.',
  'Enjoy panoramic mountain views from this elevated camping paradise.',
  'Relax by pristine lakes surrounded by towering peaks and alpine meadows.',
  'Explore diverse ecosystems and encounter local wildlife in their natural habitat.',
  'Perfect for stargazing with minimal light pollution and clear mountain air.',
  'Adventure awaits with hiking trails leading to spectacular viewpoints.',
  'Peaceful retreat offering meditation spaces and wellness activities.',
  'Family-friendly location with easy access to outdoor recreational activities.'
];

const REVIEW_TEXTS = [
  'Absolutely stunning location with breathtaking views!',
  'Perfect for a peaceful getaway from city life.',
  'Great facilities and well-maintained campsite.',
  'Amazing stargazing opportunities on clear nights.',
  'Friendly staff and excellent customer service.',
  'Beautiful hiking trails nearby with varying difficulty levels.',
  'Clean facilities and well-organized camping areas.',
  'Incredible wildlife viewing opportunities.'
];

const imagePool = [
  'https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg',
  'https://images.pexels.com/photos/2422915/pexels-photo-2422915.jpeg',
  'https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg',
  'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg',
  'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg'
];

const pick = <T>(items: readonly T[], index: number): T => items[index % items.length];
const fractional = (seed: number): number => Math.abs(Math.sin(seed * 12.9898) * 43758.5453) % 1;
const seededNumber = (seed: number, min: number, max: number): number => Math.floor(fractional(seed) * (max - min + 1)) + min;

export class CampsiteRepository {
  private readonly campsites: Campsite[];

  constructor() {
    this.campsites = this.generateCampsites();
  }

  findAll(): Campsite[] {
    return this.campsites.map(campsite => ({ ...campsite, reviews: [...campsite.reviews] }));
  }

  findById(id: string): Campsite | null {
    const campsite = this.campsites.find(item => item.id === id);
    return campsite ? { ...campsite, reviews: [...campsite.reviews] } : null;
  }

  search(filters: CampsiteSearchFilters): Campsite[] {
    return this.findAll().filter(campsite => this.matchesFilters(campsite, filters));
  }

  suggestions(query: string): string[] {
    if (!query || query.length < 2) {
      return [];
    }

    const lowerQuery = query.toLowerCase();
    const suggestions = new Set<string>();

    this.campsites.forEach(campsite => {
      [campsite.name, campsite.location.country, campsite.location.region].forEach(value => {
        if (value.toLowerCase().includes(lowerQuery)) {
          suggestions.add(value);
        }
      });
    });

    ['Northern Lights', 'Aurora Viewing', 'Mountain Camping', 'Forest Retreat', 'Coastal Camping', 'Alpine Adventure', 'Wilderness Experience', 'Stargazing'].forEach(value => {
      if (value.toLowerCase().includes(lowerQuery)) {
        suggestions.add(value);
      }
    });

    return Array.from(suggestions).slice(0, 8);
  }

  private matchesFilters(campsite: Campsite, filters: CampsiteSearchFilters): boolean {
    if (filters.query) {
      const query = filters.query.toLowerCase();
      const values = [campsite.name, campsite.location.country, campsite.location.region];
      if (!values.some(value => value.toLowerCase().includes(query))) {
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

    if (filters.amenities?.length) {
      return filters.amenities.every(amenity => campsite.amenities.includes(amenity));
    }

    return true;
  }

  private generateCampsites(): Campsite[] {
    return Array.from({ length: 150 }, (_, index) => this.createCampsite(index));
  }

  private createCampsite(index: number): Campsite {
    const country = pick(COUNTRIES, index * 7);
    const region = pick(country.regions, index * 3);
    const difficulty = pick(DIFFICULTIES, index * 5);
    const lat = country.coords[1] + (fractional(index + 11) - 0.5) * 8;
    const lng = country.coords[0] + (fractional(index + 17) - 0.5) * 8;
    const selectedAmenities = AMENITIES.slice(index % 8, (index % 8) + 7);
    const basePrice = country.name === 'Switzerland' || country.name === 'Norway' ? 60 : country.name === 'Germany' || country.name === 'Austria' ? 45 : country.name === 'Portugal' || country.name === 'Poland' ? 25 : 35;
    const difficultyMultiplier = difficulty === 'expert' ? 1.5 : difficulty === 'challenging' ? 1.3 : difficulty === 'moderate' ? 1.1 : 1.0;
    const availability: Record<string, boolean> = {};

    for (let day = 0; day < 30; day += 1) {
      const date = new Date();
      date.setDate(date.getDate() + day);
      availability[date.toISOString().split('T')[0]] = seededNumber(index + day, 0, 100) > 28;
    }

    const campsite: Campsite = {
      id: `camp_${String(index + 1).padStart(3, '0')}`,
      name: `${pick(CAMPSITE_NAMES, index)}${index >= CAMPSITE_NAMES.length ? ` ${Math.floor(index / CAMPSITE_NAMES.length) + 1}` : ''}`,
      location: {
        country: country.name,
        region,
        coordinates: [Number(lng.toFixed(4)), Number(lat.toFixed(4))],
        elevation: seededNumber(index + 23, 100, 2100)
      },
      description: pick(DESCRIPTIONS, index * 2),
      amenities: selectedAmenities,
      difficulty,
      capacity: seededNumber(index + 29, 5, 24),
      price_per_night: Math.round(basePrice * difficultyMultiplier + seededNumber(index + 31, -10, 10)),
      images: imagePool,
      weather: {
        current: pick(WEATHER_CONDITIONS, index * 4),
        temperature: seededNumber(index + 37, -5, 25),
        wind_speed: seededNumber(index + 41, 5, 30),
        aurora_probability: lat > 60 ? seededNumber(index + 43, 5, 95) : undefined
      },
      availability,
      rating: Math.round((3 + fractional(index + 47) * 2) * 10) / 10,
      reviews: [],
      features: {
        has_aurora_viewing: lat > 60 && selectedAmenities.includes('aurora_viewing'),
        has_hot_springs: selectedAmenities.includes('hot_springs'),
        has_lake_access: selectedAmenities.includes('lake_access'),
        has_mountain_views: selectedAmenities.includes('mountain_views')
      }
    };

    campsite.reviews = this.createReviews(campsite.id, index);
    return campsite;
  }

  private createReviews(campsiteId: string, index: number): Review[] {
    const count = seededNumber(index + 53, 2, 10);
    return Array.from({ length: count }, (_, reviewIndex) => ({
      id: `review_${campsiteId}_${reviewIndex + 1}`,
      user: `WildScape Guest ${seededNumber(index + reviewIndex + 59, 1, 100)}`,
      rating: seededNumber(index + reviewIndex + 61, 4, 5),
      comment: pick(REVIEW_TEXTS, index + reviewIndex),
      date: new Date(Date.now() - seededNumber(index + reviewIndex + 67, 1, 180) * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    }));
  }
}
