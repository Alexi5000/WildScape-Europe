import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const AuroraShader = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec2 uResolution;
        varying vec2 vUv;
        
        vec3 aurora(vec2 uv, float time) {
          vec2 p = uv * 2.0 - 1.0;
          p.y += 0.3;
          
          float wave1 = sin(p.x * 3.0 + time * 0.5) * 0.1;
          float wave2 = sin(p.x * 5.0 + time * 0.3) * 0.05;
          float wave3 = sin(p.x * 7.0 + time * 0.7) * 0.03;
          
          float y = p.y - wave1 - wave2 - wave3;
          
          float aurora1 = 1.0 / (abs(y) * 20.0 + 1.0);
          float aurora2 = 1.0 / (abs(y + 0.1) * 15.0 + 1.0);
          float aurora3 = 1.0 / (abs(y - 0.1) * 25.0 + 1.0);
          
          vec3 color1 = vec3(0.0, 1.0, 0.5) * aurora1;
          vec3 color2 = vec3(0.5, 0.0, 1.0) * aurora2;
          vec3 color3 = vec3(0.0, 0.5, 1.0) * aurora3;
          
          return color1 + color2 + color3;
        }
        
        void main() {
          vec2 uv = vUv;
          vec3 color = aurora(uv, uTime);
          
          // Add stars
          vec2 starUv = uv * 50.0;
          vec2 starId = floor(starUv);
          vec2 starPos = fract(starUv) - 0.5;
          
          float star = smoothstep(0.05, 0.0, length(starPos)) * 
                      (sin(dot(starId, vec2(12.9898, 78.233))) * 43758.5453);
          star = max(0.0, star);
          
          color += vec3(star * 0.5);
          
          // Fade to black at bottom
          color *= smoothstep(0.0, 0.3, uv.y);
          
          gl_FragColor = vec4(color, 1.0);
        }
      `,
      transparent: true,
    });
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      material.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef} material={material}>
      <planeGeometry args={[2, 2]} />
    </mesh>
  );
};

export const AuroraEffect: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        style={{ background: 'linear-gradient(to bottom, #0F172A, #1E293B)' }}
      >
        <AuroraShader />
      </Canvas>
    </div>
  );
};