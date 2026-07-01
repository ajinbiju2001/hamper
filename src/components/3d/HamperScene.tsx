'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float, ContactShadows } from '@react-three/drei';
import { useBuilderStore } from '@/store/useBuilderStore';
import * as THREE from 'three';

// A mock open box to represent the hamper
function HamperBox({ boxType, themeColor }: { boxType: string, themeColor: string }) {
  const meshRef = useRef<THREE.Group>(null);
  
  // Map theme color to hex
  const colorMap: Record<string, string> = {
    'Pink': '#FFC4D6',
    'Red': '#ff4d4d',
    'White': '#ffffff',
    'Purple': '#d9b3ff',
    'Rose Gold': '#D89CA6',
    'Gold': '#F3E5AB'
  };
  
  const boxColor = colorMap[themeColor] || '#FFC4D6';

  // Map box type to dimensions
  let scale = [3, 1, 3] as [number, number, number];
  if (boxType === 'Small') scale = [2, 0.8, 2];
  if (boxType === 'Luxury') scale = [3.5, 1.2, 3.5];

  return (
    <group ref={meshRef}>
      {/* Base of the box */}
      <mesh position={[0, -scale[1]/2 + 0.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[scale[0], 0.2, scale[2]]} />
        <meshStandardMaterial color={boxColor} roughness={0.2} metalness={0.1} />
      </mesh>
      
      {/* Walls */}
      <mesh position={[0, 0, scale[2]/2]} castShadow receiveShadow>
        <boxGeometry args={[scale[0], scale[1], 0.2]} />
        <meshStandardMaterial color={boxColor} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0, -scale[2]/2]} castShadow receiveShadow>
        <boxGeometry args={[scale[0], scale[1], 0.2]} />
        <meshStandardMaterial color={boxColor} roughness={0.2} />
      </mesh>
      <mesh position={[scale[0]/2, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.2, scale[1], scale[2]]} />
        <meshStandardMaterial color={boxColor} roughness={0.2} />
      </mesh>
      <mesh position={[-scale[0]/2, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.2, scale[1], scale[2]]} />
        <meshStandardMaterial color={boxColor} roughness={0.2} />
      </mesh>
    </group>
  );
}

// A mock item that is added to the hamper
function HamperItem({ position, category }: { position: [number, number, number], category: string }) {
  // Different shapes for different categories since we don't have models
  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh position={position} castShadow receiveShadow>
        {category === 'Chocolate' && <boxGeometry args={[0.4, 0.4, 0.4]} />}
        {category === 'Flowers' && <sphereGeometry args={[0.3, 32, 32]} />}
        {category === 'Perfumes' && <cylinderGeometry args={[0.15, 0.15, 0.6, 32]} />}
        {category === 'Soft Toys' && <torusKnotGeometry args={[0.2, 0.08, 64, 8]} />}
        {category === 'Candles' && <cylinderGeometry args={[0.2, 0.2, 0.4, 32]} />}
        {!['Chocolate', 'Flowers', 'Perfumes', 'Soft Toys', 'Candles'].includes(category) && <boxGeometry args={[0.3, 0.3, 0.3]} />}
        
        <meshPhysicalMaterial 
          color={category === 'Chocolate' ? '#5c4033' : category === 'Flowers' ? '#ff3366' : category === 'Perfumes' ? '#ffffff' : '#f0d080'} 
          roughness={category === 'Perfumes' ? 0.1 : 0.4} 
          metalness={category === 'Perfumes' ? 0.5 : 0.1}
          transmission={category === 'Perfumes' ? 0.9 : 0} 
          thickness={category === 'Perfumes' ? 1.5 : 0}
        />
      </mesh>
    </Float>
  );
}

export default function HamperScene() {
  const { boxType, themeColor, items } = useBuilderStore();

  // Create an array of individual items to render based on quantities
  const renderedItems: { id: string; category: string; position: [number, number, number] }[] = [];
  
  let i = 0;
  items.forEach(item => {
    for (let q = 0; q < item.quantity; q++) {
      // Calculate a spiral or grid position inside the box
      // For simplicity, we just place them in a rough circle/grid based on index
      const angle = i * Math.PI * 2.39996; // Golden ratio angle
      const radius = 0.3 * Math.sqrt(i);
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      // Y depends on how many items we have so they pile up
      const y = (i * 0.1) - 0.2; // Start a bit low
      
      renderedItems.push({
        id: `${item.id}-${q}`,
        category: item.category,
        position: [x, y, z]
      });
      i++;
    }
  });

  return (
    <Canvas shadows camera={{ position: [0, 5, 8], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <directionalLight 
        position={[5, 10, 5]} 
        intensity={1} 
        castShadow 
        shadow-mapSize-width={2048} 
        shadow-mapSize-height={2048} 
      />
      <Environment preset="studio" />
      
      <group position={[0, -1, 0]}>
        <HamperBox boxType={boxType} themeColor={themeColor} />
        
        {renderedItems.map(item => (
          <HamperItem key={item.id} position={item.position} category={item.category} />
        ))}
        
        <ContactShadows position={[0, -0.6, 0]} opacity={0.5} scale={10} blur={2} far={4} />
      </group>

      <OrbitControls 
        makeDefault 
        minPolarAngle={0} 
        maxPolarAngle={Math.PI / 2 + 0.1} 
        minDistance={3} 
        maxDistance={15} 
      />
    </Canvas>
  );
}
