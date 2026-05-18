import mapboxgl from 'mapbox-gl';
import type { Campsite } from '@/types/campsite';
import type { MapViewState } from '@/types/map';

export class MapboxService {
  private static instance: MapboxService;
  private readonly accessToken: string;

  constructor() {
    this.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN ?? 'pk.placeholder-token';
    mapboxgl.accessToken = this.accessToken;
  }

  public static getInstance(): MapboxService {
    if (!MapboxService.instance) {
      MapboxService.instance = new MapboxService();
    }

    return MapboxService.instance;
  }

  createMap(container: HTMLElement, initialViewState?: Partial<MapViewState>): mapboxgl.Map {
    return new mapboxgl.Map({
      container,
      style: 'mapbox://styles/mapbox/outdoors-v12',
      center: [initialViewState?.longitude ?? 10.0, initialViewState?.latitude ?? 60.0],
      zoom: initialViewState?.zoom ?? 4,
      pitch: initialViewState?.pitch ?? 60,
      bearing: initialViewState?.bearing ?? 0,
      projection: { name: 'globe' }
    });
  }

  addTerrainLayer(map: mapboxgl.Map): void {
    map.on('style.load', () => {
      if (!map.getSource('mapbox-dem')) {
        map.addSource('mapbox-dem', {
          type: 'raster-dem',
          url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
          tileSize: 512,
          maxzoom: 14
        });
      }

      map.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 });

      if (!map.getLayer('sky')) {
        map.addLayer({
          id: 'sky',
          type: 'sky',
          paint: {
            'sky-type': 'atmosphere',
            'sky-atmosphere-sun': [0.0, 0.0],
            'sky-atmosphere-sun-intensity': 15
          }
        });
      }
    });
  }

  addCampsiteMarkers(map: mapboxgl.Map, campsites: Campsite[], onMarkerClick?: (campsite: Campsite) => void): void {
    document.querySelectorAll('.campsite-marker').forEach(marker => marker.remove());

    campsites.forEach(campsite => {
      const markerElement = document.createElement('div');
      markerElement.className = 'campsite-marker';
      markerElement.innerHTML = this.createMarkerHtml(campsite);
      markerElement.addEventListener('click', () => onMarkerClick?.(campsite));

      new mapboxgl.Marker(markerElement)
        .setLngLat(campsite.location.coordinates)
        .setPopup(this.createPopup(campsite))
        .addTo(map);
    });
  }

  flyToLocation(map: mapboxgl.Map, coordinates: [number, number], zoom = 12): void {
    map.flyTo({ center: coordinates, zoom, duration: 2000 });
  }

  private createMarkerHtml(campsite: Campsite): string {
    return `
      <div class="relative group cursor-pointer">
        <div class="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-700 rounded-full border-2 border-white shadow-lg flex items-center justify-center transform transition-transform group-hover:scale-110">
          <span class="text-white text-xs font-bold">€${campsite.price_per_night}</span>
        </div>
        <div class="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full border border-white"></div>
      </div>
    `;
  }

  private createPopup(campsite: Campsite): mapboxgl.Popup {
    return new mapboxgl.Popup({ offset: 25 }).setHTML(`
      <div class="p-3 max-w-xs">
        <img src="${campsite.images[0]}" alt="${campsite.name}" class="w-full h-32 object-cover rounded-lg mb-2" />
        <h3 class="font-bold text-lg mb-1">${campsite.name}</h3>
        <p class="text-sm text-gray-600 mb-2">${campsite.location.region}, ${campsite.location.country}</p>
        <div class="flex items-center justify-between mb-2">
          <span class="text-yellow-500">★ ${campsite.rating}</span>
          <span class="font-bold text-green-600">€${campsite.price_per_night}/night</span>
        </div>
        <p class="text-sm text-gray-700 line-clamp-2">${campsite.description}</p>
      </div>
    `);
  }
}

export const mapboxService = MapboxService.getInstance();
