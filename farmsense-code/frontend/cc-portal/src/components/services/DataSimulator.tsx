'use client';

import { useEffect, useRef } from 'react';
import { useCCStore } from '@/store/useCCStore';

/**
 * DataSimulator
 * Provids high-frequency mock data streams to the Zustand store 
 * by simulating binary payload parsing through the FXRP Web Worker.
 */
export default function DataSimulator() {
    const store = useCCStore();
    const workerRef = useRef<Worker | null>(null);

    useEffect(() => {
        // Initialize FXRP decoding worker to offload processing
        workerRef.current = new Worker(new URL('../workers/fxrp.worker.ts', import.meta.url));

        // Listen for decrypted/decoded payloads from the worker
        workerRef.current.onmessage = (e) => {
            const { type, data } = e.data;
            if (type === 'FXRP_DECODED') {
                if (data.recordType === 'LEDGER') {
                    store.addLedgerEntry(data.payload);
                } else if (data.recordType === 'DHU') {
                    store.updateDHU(data.payload);
                } else if (data.recordType === 'FLEET') {
                    store.updateFleet(data.payload);
                }
            }
        };

        // Helper to encode JSON into a binary buffer to simulate incoming raw network packets
        const simulateNetworkBuffer = (recordType: string, payload: any) => {
            const raw = JSON.stringify({ recordType, payload });
            const buffer = new TextEncoder().encode(raw);
            workerRef.current?.postMessage({ type: 'DECODE_FXRP_BUFFER', payload: buffer });
        };

        // 1. Initial RSS State
        store.setRSS({
            id: 'RSS-MONTE-VISTA',
            oracle_compute_status: 'ACTIVE',
            current_spatial_fidelity: '1m',
            total_storage_used: 12.4,
            active_fleet_crews: 4,
            fiber_uplink_status: true,
            starlink_backup_status: true,
        });

        // 2. Mock DHU Telemetry (Sent through worker)
        const dhuIds = ['DHU-01', 'DHU-04', 'DHU-09', 'DHU-12', 'DHU-25'];
        dhuIds.forEach(id => {
            simulateNetworkBuffer('DHU', {
                id,
                status: 'ONLINE',
                active_fields: Math.floor(Math.random() * 5) + 3,
                cpu_usage: 15 + Math.random() * 20,
                gpu_temp: 35 + Math.random() * 10,
                mesh_nodes_active: 150 + Math.floor(Math.random() * 50),
                backhaul_latency: 18 + Math.random() * 5,
                total_field_flow: 600 + Math.random() * 400,
            });
        });

        // 2.5 Mock Spatial Ops Crews (Sent through worker)
        const crews: { id: string, tech: string, lat: number, lng: number, type: any }[] = [
            { id: 'CREW-ALPHA', tech: 'Reyes, M.', lat: 37.5901, lng: -106.1528, type: 'HUMAN' },
            { id: 'CREW-BRAVO', tech: 'Chen, L.', lat: 37.5810, lng: -106.1380, type: 'HUMAN' },
            { id: 'ROVER-7', tech: 'AUTO-NAV', lat: 37.5880, lng: -106.1450, type: 'ROBOTIC' },
            { id: 'TRACTOR-02', tech: 'Deere 9RX', lat: 37.5750, lng: -106.1550, type: 'TRACTOR' },
            { id: 'NODE-X12', tech: 'VFA-TRUTH', lat: 37.5820, lng: -106.1400, type: 'DATA_GRID' }
        ];

        crews.forEach(c => {
            simulateNetworkBuffer('FLEET', {
                id: c.id,
                lead_technician: c.tech,
                asset_type: c.type,
                coordinates: {
                    lat: c.lat,
                    lng: c.lng
                },
                rtk_lock: true,
                active_pins_count: Math.floor(Math.random() * 20) + 5,
                completed_pins_count: Math.floor(Math.random() * 100) + 20,
                status: Math.random() > 0.3 ? 'DEPLOYING' : 'IN_TRANSIT',
            });
        });

        // 3. Simulated Transaction intervals (Sent through worker to simulate real-time ledger)
        const ledgerInterval = setInterval(() => {
            const entryId = Math.random().toString(36).substr(2, 9).toUpperCase();
            const fieldId = `FIELD-${['A', 'B', 'C', 'D'][Math.floor(Math.random() * 4)]}${Math.floor(Math.random() * 50)}`;
            const gallons = Math.floor(Math.random() * 2500) + 500;

            simulateNetworkBuffer('LEDGER', {
                id: entryId,
                timestamp: new Date().toISOString(),
                dhu_id: dhuIds[Math.floor(Math.random() * dhuIds.length)],
                field_id: fieldId,
                liters: gallons * 3.785,
                gallons,
                vibration_harmonics: [0.1, 0.2, 0.15],
                signature: `sha256_${Math.random().toString(36).substr(2, 16)}`,
                status: 'VERIFIED',
            });
        }, 3500); // New water event every 3.5 seconds

        return () => {
            clearInterval(ledgerInterval);
            workerRef.current?.terminate();
        };
    }, []);

    return null; // Side-effect only component
}
