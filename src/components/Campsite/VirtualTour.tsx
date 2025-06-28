import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Text } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

interface VirtualTourProps {
  campsite: any;
}

const CampsiteScene = () => {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#4ade80" />
      </mesh>

      {/* Tent */}
      <mesh
        position={[0, 0, 0]}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <coneGeometry args={[2, 3, 8]} />
        <meshStandardMaterial color={hovered ? "#f97316" : "#059669"} />
      </mesh>

      {/* Trees */}
      {Array.from({ length: 8 }).map((_, i) => (
        <group key={i} position={[
          Math.cos(i * Math.PI / 4) * 8,
          0,
          Math.sin(i * Math.PI / 4) * 8
        ]}>
          {/* Trunk */}
          <mesh position={[0, 1, 0]}>
            <cylinderGeometry args={[0.3, 0.3, 2]} />
            <meshStandardMaterial color="#8b4513" />
          </mesh>
          {/* Leaves */}
          <mesh position={[0, 3, 0]}>
            <coneGeometry args={[1.5, 3, 8]} />
            <meshStandardMaterial color="#228b22" />
          </mesh>
        </group>
      ))}

      {/* Campfire */}
      <group position={[3, -1.5, 2]}>
        <mesh>
          <cylinderGeometry args={[0.8, 0.8, 0.2]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        {/* Fire effect */}
        <mesh position={[0, 0.5, 0]}>
          <coneGeometry args={[0.3, 1, 6]} />
          <meshStandardMaterial 
            color="#ff4500" 
            transparent 
            opacity={0.8}
            emissive="#ff4500"
            emissiveIntensity={0.5}
          />
        </mesh>
      </group>

      {/* Mountains in background */}
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            (i - 2) * 8,
            2,
            -15
          ]}
        >
          <coneGeometry args={[3, 6, 8]} />
          <meshStandardMaterial color="#708090" />
        </mesh>
      ))}

      {/* Floating text */}
      <Text
        position={[0, 5, 0]}
        fontSize={1}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        360° Virtual Tour
      </Text>
    </group>
  );
};

export const VirtualTour: React.FC<VirtualTourProps> = ({ campsite }) => {
  return (
    <motion.div
      className="w-full h-96 bg-gradient-to-b from-blue-400 to-green-400 rounded-xl overflow-hidden"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Canvas camera={{ position: [0, 5, 10], fov: 60 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[3, 2, 2]} intensity={0.5} color="#ff4500" />
        
        <CampsiteScene />
        
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          minDistance={5}
          maxDistance={20}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
      
      <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-3">
        <h3 className="text-white font-semibold mb-1">{campsite.name}</h3>
        <p className="text-white/80 text-sm">
          Use your mouse to explore this 360° virtual tour of the campsite
        </p>
      </div>
    </motion.div>
  );
};