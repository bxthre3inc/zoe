'use client';

import { useCCStore } from '@/store/useCCStore';
import { Html } from '@react-three/drei';
import { Activity, MapPin, User, Cpu, Tractor, Wifi } from 'lucide-react';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { SpatialOpsCrew } from '@/types/cc';

export function SpatialOpsOverlay() {
    const fleet = useCCStore((state) => state.fleet);
    const assetFilter = useCCStore((state) => state.assetFilter);
    const crews = Object.values(fleet).filter(c => assetFilter === 'ALL' || c.asset_type === assetFilter);

    return (
        <group>
            {crews.map((crew) => (
                <CrewMarker key={crew.id} crew={crew} />
            ))}
        </group>
    );
}

function CrewMarker({ crew }: { crew: SpatialOpsCrew }) {
    const groupRef = useRef<THREE.Group>(null);
    const terrain = useCCStore((state) => state.terrain);

    // Map lat/lng to generic 3D space for the mockup (x, z)
    // The terrain is centered at 37.5851, -106.1478
    const x = (crew.coordinates.lng + 106.1478) * 10000;
    const z = (crew.coordinates.lat - 37.5851) * -10000;

    // Sample terrain height
    let terrainHeight = 0;
    if (terrain) {
        const gridX = Math.round(x + terrain.size / 2);
        const gridY = Math.round(z + terrain.size / 2);

        if (terrain.elevation[gridY] && terrain.elevation[gridY][gridX] !== undefined) {
            terrainHeight = (terrain.elevation[gridY][gridX] - 2336.0) * 2.0;
        }
    }

    // Animate the marker slightly to simulate movement/status
    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.position.y = terrainHeight + Math.sin(state.clock.elapsedTime * 2 + parseInt(crew.id.split('-')[1] || '0')) * 0.5 + 1;
        }
    });

    return (
        <group ref={groupRef} position={[x, terrainHeight, z]}>
            {/* 3D Base Marker */}
            <mesh position={[0, -0.5, 0]}>
                <cylinderGeometry args={[1, 1, 0.2, 16]} />
                <meshStandardMaterial color={crew.status === 'DEPLOYING' ? "#10b981" : "#f59e0b"} emissive={crew.status === 'DEPLOYING' ? "#10b981" : "#f59e0b"} emissiveIntensity={0.5} opacity={0.5} transparent />
            </mesh>

            <mesh position={[0, 0, 0]}>
                <octahedronGeometry args={[0.5, 0]} />
                <meshStandardMaterial color={crew.status === 'DEPLOYING' ? "#10b981" : "#f59e0b"} emissive={crew.status === 'DEPLOYING' ? "#10b981" : "#f59e0b"} emissiveIntensity={2} />
            </mesh>

            {/* HTML Overlay for UI */}
            <Html position={[0, 1.5, 0]} center>
                <div className="flex flex-col items-center pointer-events-none w-32">
                    <div className={`glass-panel p-1.5 border ${crew.status === 'DEPLOYING' ? 'border-tactical-green/50 bg-tactical-green/10' : 'border-tactical-amber/50 bg-tactical-amber/10'} rounded shadow-lg backdrop-blur-md flex items-center gap-2`}>
                        {crew.asset_type === 'HUMAN' && <User className="w-3 h-3 text-tactical-green" />}
                        {crew.asset_type === 'ROBOTIC' && <Cpu className="w-3 h-3 text-indigo-400" />}
                        {crew.asset_type === 'TRACTOR' && <Tractor className="w-3 h-3 text-tactical-amber" />}
                        {crew.asset_type === 'DATA_GRID' && <Wifi className="w-3 h-3 text-tactical-blue" />}

                        <div className="flex flex-col">
                            <span className="text-[8px] font-black text-white tracking-widest uppercase">{crew.lead_technician}</span>
                            <span className={`text-[6px] font-bold tracking-widest uppercase ${crew.status === 'DEPLOYING' ? 'text-tactical-green' : 'text-tactical-amber'}`}>{crew.status}</span>
                        </div>
                    </div>

                    {crew.rtk_lock && (
                        <div className="mt-1 px-1.5 py-0.5 rounded bg-indigo-500/20 border border-indigo-500/40 text-[6px] font-black text-indigo-300 uppercase tracking-widest">
                            RTK LOCK
                        </div>
                    )}
                </div>
            </Html>
        </group>
    );
}
