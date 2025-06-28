import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const useThree = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  return { groupRef };
};

export const useAuroraAnimation = () => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return { materialRef };
};

export const useParticleSystem = (count: number = 1000) => {
  const particlesRef = useRef<THREE.Points>(null);
  const positions = useRef<Float32Array>();
  const velocities = useRef<Float32Array>();

  useEffect(() => {
    positions.current = new Float32Array(count * 3);
    velocities.current = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions.current[i * 3] = (Math.random() - 0.5) * 100;
      positions.current[i * 3 + 1] = Math.random() * 50;
      positions.current[i * 3 + 2] = (Math.random() - 0.5) * 100;

      velocities.current[i * 3] = (Math.random() - 0.5) * 0.1;
      velocities.current[i * 3 + 1] = -Math.random() * 0.5;
      velocities.current[i * 3 + 2] = (Math.random() - 0.5) * 0.1;
    }
  }, [count]);

  useFrame((state, delta) => {
    if (particlesRef.current && positions.current && velocities.current) {
      for (let i = 0; i < count; i++) {
        positions.current[i * 3] += velocities.current[i * 3] * delta * 10;
        positions.current[i * 3 + 1] += velocities.current[i * 3 + 1] * delta * 10;
        positions.current[i * 3 + 2] += velocities.current[i * 3 + 2] * delta * 10;

        // Reset particles that fall below the ground
        if (positions.current[i * 3 + 1] < -25) {
          positions.current[i * 3 + 1] = 25;
        }
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return { particlesRef, positions: positions.current };
};