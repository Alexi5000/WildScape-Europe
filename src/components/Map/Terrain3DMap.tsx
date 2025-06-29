import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { motion } from 'framer-motion';
import { Campsite } from '@/types/campsite';
import 'mapbox-gl/dist/mapbox-gl.css';

// Use environment variable or demo token
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN || 'pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjbGV4YW1wbGUifQ.example';

interface Terrain3DMapProps {
  campsites: Campsite[];
  onCampsiteSelect: (campsite: Campsite) => void;
  selectedCampsite?: Campsite | null;
  currentWeatherCondition?: 'clear' | 'rain' | 'snow' | 'fog' | 'cloudy';
}

export const Terrain3DMap = ({ 
  campsites, 
  onCampsiteSelect, 
  selectedCampsite,
  currentWeatherCondition = 'clear'
}: Terrain3DMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/outdoors-v12',
      center: [10.0, 60.0], // Center on Europe
      zoom: 4,
      pitch: 60,
      bearing: 0,
      antialias: true,
      attributionControl: false
    });

    map.current.on('load', () => {
      setMapLoaded(true);
      
      // Add 3D terrain
      map.current?.addSource('mapbox-dem', {
        type: 'raster-dem',
        url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
        tileSize: 512,
        maxzoom: 14
      });

      map.current?.setTerrain({ source: 'mapbox-dem', exaggeration: 2 });

      // Add atmospheric sky
      map.current?.addLayer({
        id: 'sky',
        type: 'sky',
        paint: {
          'sky-type': 'atmosphere',
          'sky-atmosphere-sun': [0.0, 90.0],
          'sky-atmosphere-sun-intensity': 15
        }
      });

      // Add custom forest layer
      map.current?.addLayer({
        id: 'forest-glow',
        type: 'fill',
        source: {
          type: 'vector',
          url: 'mapbox://mapbox.landcover-v1'
        },
        'source-layer': 'landcover',
        filter: ['==', 'class', 'wood'],
        paint: {
          'fill-color': '#059669',
          'fill-opacity': 0.3,
          'fill-outline-color': '#064E3B'
        }
      });

      // Add campsite markers with custom styling
      campsites.forEach((campsite) => {
        // Create custom marker element
        const markerEl = document.createElement('div');
        markerEl.className = 'campsite-marker';
        markerEl.innerHTML = `
          <div class="marker-pulse"></div>
          <div class="marker-icon">🏕️</div>
        `;
        
        // Add custom styles
        markerEl.style.cssText = `
          position: relative;
          width: 40px;
          height: 40px;
          cursor: pointer;
          transform-origin: center;
          transition: transform 0.3s ease;
        `;

        const marker = new mapboxgl.Marker(markerEl)
          .setLngLat(campsite.location.coordinates)
          .addTo(map.current!);

        // Add hover effects
        markerEl.addEventListener('mouseenter', () => {
          markerEl.style.transform = 'scale(1.2)';
        });

        markerEl.addEventListener('mouseleave', () => {
          markerEl.style.transform = 'scale(1)';
        });

        // Add click handler
        markerEl.addEventListener('click', () => {
          onCampsiteSelect(campsite);
          
          // Fly to campsite
          map.current?.flyTo({
            center: campsite.location.coordinates,
            zoom: 12,
            pitch: 70,
            bearing: 0,
            duration: 2000
          });
        });

        // Create popup with rich content
        const popup = new mapboxgl.Popup({ 
          offset: 25,
          className: 'campsite-popup'
        }).setHTML(`
          <div class="p-4 bg-gradient-to-br from-emerald-900/90 to-teal-900/90 backdrop-blur-sm rounded-lg border border-emerald-500/30">
            <h3 class="text-lg font-bold text-white mb-2">${campsite.name}</h3>
            <p class="text-emerald-100 text-sm mb-3">${campsite.description}</p>
            <div class="flex items-center justify-between">
              <span class="text-emerald-300 font-semibold">€${campsite.price_per_night}/night</span>
              <span class="text-xs text-emerald-200">${campsite.difficulty}</span>
            </div>
            <div class="mt-3 flex flex-wrap gap-1">
              ${campsite.amenities.slice(0, 3).map(amenity => 
                `<span class="text-xs bg-emerald-500/30 text-emerald-100 px-2 py-1 rounded">${amenity.replace('_', ' ')}</span>`
              ).join('')}
            </div>
          </div>
        `);

        marker.setPopup(popup);
      });
    });

    // Add custom CSS for markers
    const style = document.createElement('style');
    style.textContent = `
      .marker-pulse {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 60px;
        height: 60px;
        background: radial-gradient(circle, rgba(5, 150, 105, 0.4) 0%, transparent 70%);
        border-radius: 50%;
        animation: pulse 2s infinite;
      }
      
      .marker-icon {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 20px;
        filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
      }
      
      @keyframes pulse {
        0% { transform: translate(-50%, -50%) scale(0.8); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
      }
      
      .campsite-popup .mapboxgl-popup-content {
        background: transparent !important;
        padding: 0 !important;
        box-shadow: 0 20px 40px rgba(0,0,0,0.3) !important;
      }
      
      .campsite-popup .mapboxgl-popup-tip {
        border-top-color: rgba(5, 150, 105, 0.9) !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      map.current?.remove();
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, [campsites, onCampsiteSelect]);

  // Weather effect overlay
  const weatherEffects = {
    rain: '☔',
    snow: '❄️',
    fog: '🌫️',
    clear: '☀️',
    cloudy: '☁️'
  };

  return (
    <div className="relative w-full h-full">
      {/* Map container */}
      <div 
        ref={mapContainer} 
        className="w-full h-full rounded-xl overflow-hidden shadow-2xl"
        style={{ minHeight: '600px' }}
      />
      
      {/* Loading overlay */}
      {!mapLoaded && (
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-emerald-900/50 to-teal-900/50 backdrop-blur-sm flex items-center justify-center rounded-xl"
          initial={{ opacity: 1 }}
          animate={{ opacity: mapLoaded ? 0 : 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center text-white">
            <motion.div
              className="w-12 h-12 border-4 border-emerald-400 border-t-transparent rounded-full mx-auto mb-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <p className="text-lg font-semibold">Loading 3D Terrain...</p>
          </div>
        </motion.div>
      )}

      {/* Map controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <motion.button
          className="p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 text-white hover:bg-white/20 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            map.current?.flyTo({
              center: [10.0, 60.0],
              zoom: 4,
              pitch: 60,
              bearing: 0,
              duration: 2000
            });
          }}
        >
          🏠
        </motion.button>
        
        <motion.button
          className="p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 text-white hover:bg-white/20 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {weatherEffects[currentWeatherCondition]}
        </motion.button>
      </div>

      {/* Selected campsite info */}
      {selectedCampsite && (
        <motion.div
          className="absolute bottom-4 left-4 right-4 bg-gradient-to-r from-emerald-900/90 to-teal-900/90 backdrop-blur-xl rounded-xl p-6 border border-emerald-500/30"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-bold text-white mb-2">{selectedCampsite.name}</h3>
          <p className="text-emerald-100 mb-4">{selectedCampsite.description}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-emerald-300 font-semibold text-lg">€{selectedCampsite.price_per_night}/night</span>
              <span className="text-sm text-emerald-200 bg-emerald-500/30 px-3 py-1 rounded-full">
                {selectedCampsite.difficulty}
              </span>
            </div>
            <motion.button
              className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-emerald-500/25 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book Now
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
};