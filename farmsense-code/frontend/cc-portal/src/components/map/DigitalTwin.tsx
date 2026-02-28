'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stars, Grid, Environment } from '@react-three/drei';
import { Suspense } from 'react';
import { SpatialOpsOverlay } from '@/components/map/SpatialOpsOverlay';

export default function DigitalTwin() {
  return (
    <div className="absolute inset-0 z-0 bg-slate-950">
      <Canvas shadows gl={{ antialias: true, alpha: true }}>
        <PerspectiveCamera makeDefault position={[50, 50, 50]} fov={45} />
        <OrbitControls
          maxPolarAngle={Math.PI / 2.1}
          makeDefault
          enableDamping
          dampingFactor={0.05}
          minDistance={10}
          maxDistance={500}
        />

        <ambientLight intensity={0.2} />
        <pointLight position={[100, 100, 100]} intensity={1} castShadow />
        <directionalLight
          position={[-50, 50, -50]}
          intensity={0.5}
          color="#3b82f6"
        />

        <Suspense fallback={null}>
          {/* Spatial Grid representing the subdistrict */}
          <Grid
            infiniteGrid
            fadeDistance={500}
            fadeStrength={5}
            sectionThickness={1.5}
            sectionColor="#1e293b"
            cellColor="#334155"
            cellSize={10}
            sectionSize={100}
          />

          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

          {/* Placeholder for the 1m resolution terrain/mesh */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <planeGeometry args={[1000, 1000]} />
            <meshStandardMaterial color="#020617" />
          </mesh>

          {/* Simulated PMT/Node marker */}
          <mesh position={[0, 0, 0]} castShadow>
            <cylinderGeometry args={[0.5, 0.5, 2, 32]} />
            <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={2} />
          </mesh>
          <mesh position={[0, 1.5, 0]}>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={5} />
          </mesh>
          {/* Spatial Ops Crews */}
          <SpatialOpsOverlay />

          <Environment preset="night" />
        </Suspense>
      </Canvas>

      {/* 3D Overlays/HUD Elements */}
      <div className="absolute bottom-6 right-6 pointer-events-none">
        <div className="glass-panel p-4 tactical-border text-[10px] font-mono leading-none">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-tactical-green animate-pulse" />
            <span className="text-tactical-green glow-text-blue font-bold uppercase tracking-widest">Oracle Compute: Active</span>
          </div>
          <div className="text-slate-500 uppercase tracking-tighter mb-1">Spatial Fidelity</div>
          <div className="text-white text-lg font-black tracking-tighter">1.0m <span className="text-slate-600 text-[8px]">Kriging</span></div>
        </div>
      </div>
    </div>
  );
}
