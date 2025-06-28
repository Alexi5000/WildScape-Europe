import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const AuroraParticles = () => {
  const ref = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const positions = new Float32Array(5000 * 3);
    const colors = new Float32Array(5000 * 3);
    
    for (let i = 0; i < 5000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = Math.random() * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
      
      // Aurora colors: purple, green, blue
      const colorChoice = Math.random();
      if (colorChoice < 0.33) {
        colors[i * 3] = 0.5; colors[i * 3 + 1] = 0.0; colors[i * 3 + 2] = 1.0; // Purple
      } else if (colorChoice < 0.66) {
        colors[i * 3] = 0.0; colors[i * 3 + 1] = 1.0; colors[i * 3 + 2] = 0.5; // Green
      } else {
        colors[i * 3] = 0.0; colors[i * 3 + 1] = 0.5; colors[i * 3 + 2] = 1.0; // Blue
      }
    }
    
    return { positions, colors };
  }, []);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.05;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });
  
  return (
    <Points ref={ref} positions={particles.positions} colors={particles.colors}>
      <PointMaterial
        size={0.5}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

const AuroraWaves = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(200, 100, 100, 50);
    return geo;
  }, []);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColorA: { value: new THREE.Color('#8B5CF6') },
        uColorB: { value: new THREE.Color('#06D6A0') },
      },
      vertexShader: `
        uniform float uTime;
        varying vec2 vUv;
        varying float vWave;
        
        void main() {
          vUv = uv;
          
          vec3 pos = position;
          float wave1 = sin(pos.x * 0.02 + uTime * 0.5) * 10.0;
          float wave2 = sin(pos.x * 0.03 + uTime * 0.3) * 5.0;
          
          pos.z += wave1 + wave2;
          vWave = wave1 + wave2;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColorA;
        uniform vec3 uColorB;
        varying vec2 vUv;
        varying float vWave;
        
        void main() {
          float mixStrength = (vWave + 15.0) / 30.0;
          vec3 color = mix(uColorA, uColorB, mixStrength);
          
          float alpha = sin(vUv.y * 3.14159) * 0.3;
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    });
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      material.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry} material={material} position={[0, 0, -50]} />
  );
};

export const AuroraBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-gradient-to-b from-dark via-purple-900/20 to-dark">
      <Canvas camera={{ position: [0, 0, 30], fov: 75 }}>
        <ambientLight intensity={0.1} />
        <AuroraParticles />
        <AuroraWaves />
      </Canvas>
    </div>
  );
};