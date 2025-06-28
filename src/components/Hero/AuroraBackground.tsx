import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const AuroraParticles = () => {
  const ref = useRef<THREE.Points>(null);
  const sphereRef = useRef<THREE.Mesh>(null);
  
  const particles = useMemo(() => {
    const positions = new Float32Array(8000 * 3);
    const colors = new Float32Array(8000 * 3);
    
    for (let i = 0; i < 8000; i++) {
      // Create aurora wave pattern
      const x = (Math.random() - 0.5) * 200;
      const y = Math.random() * 80 + 20;
      const z = (Math.random() - 0.5) * 200;
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y + Math.sin(x * 0.01) * 20;
      positions[i * 3 + 2] = z;
      
      // Aurora colors with intensity variation
      const intensity = Math.random() * 0.8 + 0.2;
      const colorChoice = Math.random();
      
      if (colorChoice < 0.4) {
        // Green aurora
        colors[i * 3] = 0.0;
        colors[i * 3 + 1] = intensity;
        colors[i * 3 + 2] = intensity * 0.3;
      } else if (colorChoice < 0.7) {
        // Purple aurora
        colors[i * 3] = intensity * 0.8;
        colors[i * 3 + 1] = 0.0;
        colors[i * 3 + 2] = intensity;
      } else {
        // Blue aurora
        colors[i * 3] = 0.0;
        colors[i * 3 + 1] = intensity * 0.5;
        colors[i * 3 + 2] = intensity;
      }
    }
    
    return { positions, colors };
  }, []);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
      
      // Animate aurora waves
      const positions = ref.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(state.clock.elapsedTime + positions[i] * 0.01) * 0.1;
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });
  
  return (
    <>
      <Points ref={ref} positions={particles.positions} colors={particles.colors}>
        <PointMaterial
          size={1.5}
          vertexColors
          transparent
          opacity={0.6}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </Points>
      
      {/* Atmospheric glow */}
      <mesh ref={sphereRef} position={[0, 0, -50]}>
        <sphereGeometry args={[100, 32, 32]} />
        <meshBasicMaterial 
          color="#8B5CF6" 
          transparent 
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>
    </>
  );
};

export const AuroraBackground = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 50], fov: 75 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[0, 50, 0]} intensity={0.5} color="#8B5CF6" />
        <AuroraParticles />
        <fog attach="fog" args={['#0F172A', 50, 200]} />
      </Canvas>
    </div>
  );
};