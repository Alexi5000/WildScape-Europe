import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { WeatherParticlesProps } from '@/types/weather';

const ParticleSystem = ({ condition, intensity = 1 }: WeatherParticlesProps) => {
  const ref = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const count = condition === 'clear' ? 0 : 2000 * intensity;
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // Position
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = Math.random() * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
      
      // Velocity based on weather type
      switch (condition) {
        case 'rain':
          velocities[i * 3] = (Math.random() - 0.5) * 0.1;
          velocities[i * 3 + 1] = -Math.random() * 2 - 1;
          velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.1;
          // Blue-white color for rain
          colors[i * 3] = 0.7;
          colors[i * 3 + 1] = 0.8;
          colors[i * 3 + 2] = 1.0;
          break;
          
        case 'snow':
          velocities[i * 3] = (Math.random() - 0.5) * 0.2;
          velocities[i * 3 + 1] = -Math.random() * 0.5 - 0.2;
          velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.2;
          // White color for snow
          colors[i * 3] = 1.0;
          colors[i * 3 + 1] = 1.0;
          colors[i * 3 + 2] = 1.0;
          break;
          
        case 'fog':
          velocities[i * 3] = (Math.random() - 0.5) * 0.05;
          velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.05;
          velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.05;
          // Gray color for fog
          colors[i * 3] = 0.8;
          colors[i * 3 + 1] = 0.8;
          colors[i * 3 + 2] = 0.8;
          break;

        case 'cloudy':
          velocities[i * 3] = (Math.random() - 0.5) * 0.03;
          velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.03;
          velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.03;
          // Light gray color for clouds
          colors[i * 3] = 0.9;
          colors[i * 3 + 1] = 0.9;
          colors[i * 3 + 2] = 0.9;
          break;
      }
    }
    
    return { positions, velocities, colors, count };
  }, [condition, intensity]);
  
  useFrame(() => {
    if (!ref.current || condition === 'clear') return;
    
    const positions = ref.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < particles.count; i++) {
      // Update positions based on velocities
      positions[i * 3] += particles.velocities[i * 3];
      positions[i * 3 + 1] += particles.velocities[i * 3 + 1];
      positions[i * 3 + 2] += particles.velocities[i * 3 + 2];
      
      // Reset particles that fall below the ground
      if (positions[i * 3 + 1] < -10) {
        positions[i * 3] = (Math.random() - 0.5) * 100;
        positions[i * 3 + 1] = 50;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
      }
      
      // Wrap particles horizontally
      if (Math.abs(positions[i * 3]) > 50) {
        positions[i * 3] = -positions[i * 3];
      }
      if (Math.abs(positions[i * 3 + 2]) > 50) {
        positions[i * 3 + 2] = -positions[i * 3 + 2];
      }
    }
    
    ref.current.geometry.attributes.position.needsUpdate = true;
  });
  
  if (condition === 'clear' || particles.count === 0) return null;
  
  return (
    <Points ref={ref} positions={particles.positions} colors={particles.colors}>
      <PointMaterial
        size={condition === 'fog' || condition === 'cloudy' ? 3 : 1}
        vertexColors
        transparent
        opacity={condition === 'fog' || condition === 'cloudy' ? 0.3 : 0.8}
        sizeAttenuation
        blending={condition === 'fog' || condition === 'cloudy' ? THREE.NormalBlending : THREE.AdditiveBlending}
      />
    </Points>
  );
};

export const WeatherParticles = ({ condition, intensity }: WeatherParticlesProps) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-20">
      <Canvas camera={{ position: [0, 0, 30], fov: 75 }}>
        <ParticleSystem condition={condition} intensity={intensity} />
      </Canvas>
    </div>
  );
};