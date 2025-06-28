import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useParticleSystem } from '@/hooks/useThree';

interface WeatherParticlesProps {
  condition: 'clear' | 'rain' | 'snow' | 'fog' | 'cloudy';
  intensity?: number;
}

const RainParticles = ({ count = 500 }: { count?: number }) => {
  const { particlesRef, positions } = useParticleSystem(count);

  return (
    <Points ref={particlesRef} positions={positions}>
      <PointMaterial
        size={0.1}
        color="#3B82F6"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </Points>
  );
};

const SnowParticles = ({ count = 300 }: { count?: number }) => {
  const { particlesRef, positions } = useParticleSystem(count);

  return (
    <Points ref={particlesRef} positions={positions}>
      <PointMaterial
        size={0.3}
        color="#FFFFFF"
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </Points>
  );
};

const FogParticles = ({ count = 100 }: { count?: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const geometry = useMemo(() => {
    return new THREE.SphereGeometry(50, 32, 32);
  }, []);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uOpacity: { value: 0.1 },
      },
      vertexShader: `
        uniform float uTime;
        varying vec3 vPosition;
        
        void main() {
          vPosition = position;
          vec3 pos = position;
          pos.y += sin(pos.x * 0.1 + uTime) * 2.0;
          pos.x += cos(pos.z * 0.1 + uTime) * 1.0;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uOpacity;
        varying vec3 vPosition;
        
        void main() {
          float alpha = uOpacity * (1.0 - length(vPosition) / 50.0);
          gl_FragColor = vec4(0.8, 0.8, 0.9, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    });
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      material.uniforms.uTime.value = state.clock.elapsedTime * 0.5;
    }
  });

  return <mesh ref={meshRef} geometry={geometry} material={material} />;
};

export const WeatherParticles: React.FC<WeatherParticlesProps> = ({ 
  condition, 
  intensity = 1 
}) => {
  const renderParticles = () => {
    switch (condition) {
      case 'rain':
        return <RainParticles count={Math.floor(500 * intensity)} />;
      case 'snow':
        return <SnowParticles count={Math.floor(300 * intensity)} />;
      case 'fog':
        return <FogParticles />;
      default:
        return null;
    }
  };

  if (condition === 'clear') return null;

  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 30], fov: 75 }}>
        <ambientLight intensity={0.2} />
        {renderParticles()}
      </Canvas>
    </div>
  );
};