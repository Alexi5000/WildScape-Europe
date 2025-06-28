import mapboxgl from 'mapbox-gl';

// Note: In production, use environment variables
const MAPBOX_TOKEN = 'pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjbGV4YW1wbGUifQ.example';

export class MapboxService {
  private static instance: MapboxService;
  
  public static getInstance(): MapboxService {
    if (!MapboxService.instance) {
      MapboxService.instance = new MapboxService();
    }
    return MapboxService.instance;
  }

  constructor() {
    mapboxgl.accessToken = MAPBOX_TOKEN;
  }

  createMap(container: HTMLElement, options: Partial<mapboxgl.MapboxOptions> = {}): mapboxgl.Map {
    const defaultOptions: mapboxgl.MapboxOptions = {
      container,
      style: 'mapbox://styles/mapbox/outdoors-v12',
      center: [10.0, 60.0],
      zoom: 4,
      pitch: 60,
      bearing: 0,
      antialias: true,
      ...options
    };

    return new mapboxgl.Map(defaultOptions);
  }

  addTerrainLayer(map: mapboxgl.Map): void {
    map.on('style.load', () => {
      // Add 3D terrain
      map.addSource('mapbox-dem', {
        type: 'raster-dem',
        url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
        tileSize: 512,
        maxzoom: 14
      });

      map.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 });

      // Add sky layer for atmosphere
      map.addLayer({
        id: 'sky',
        type: 'sky',
        paint: {
          'sky-type': 'atmosphere',
          'sky-atmosphere-sun': [0.0, 90.0],
          'sky-atmosphere-sun-intensity': 15
        }
      });
    });
  }

  addCampsiteMarkers(map: mapboxgl.Map, campsites: any[], onMarkerClick?: (campsite: any) => void): void {
    campsites.forEach((campsite) => {
      const markerElement = document.createElement('div');
      markerElement.className = 'campsite-marker';
      markerElement.innerHTML = `
        <div class="w-8 h-8 bg-primary rounded-full border-2 border-white shadow-lg cursor-pointer hover:scale-110 transition-transform duration-200 flex items-center justify-center">
          <span class="text-white text-xs">🏕️</span>
        </div>
      `;

      const marker = new mapboxgl.Marker(markerElement)
        .setLngLat(campsite.location.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25, className: 'campsite-popup' }).setHTML(`
            <div class="p-3">
              <h3 class="font-bold text-lg mb-2">${campsite.name}</h3>
              <p class="text-sm text-gray-600 mb-2">${campsite.description}</p>
              <div class="flex items-center justify-between">
                <span class="text-primary font-semibold">€${campsite.price_per_night}/night</span>
                <span class="text-xs bg-gray-100 px-2 py-1 rounded">${campsite.difficulty}</span>
              </div>
            </div>
          `)
        )
        .addTo(map);

      if (onMarkerClick) {
        markerElement.addEventListener('click', () => {
          onMarkerClick(campsite);
        });
      }
    });
  }

  flyToLocation(map: mapboxgl.Map, coordinates: [number, number], zoom: number = 12): void {
    map.flyTo({
      center: coordinates,
      zoom,
      pitch: 60,
      bearing: 0,
      duration: 2000
    });
  }
}

export const mapboxService = MapboxService.getInstance();