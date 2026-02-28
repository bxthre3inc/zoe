/**
 * C&C Portal Type Definitions
 * Version: 1.0.0
 * Focus: Real-time Telemetry & Water Ledger
 */

export interface TerrainData {
    elevation: number[][];
    size: number;
    resolution: string;
    center: {
        lat: number;
        lon: number;
    };
}

/**
 * Represents a single transaction in the Water Ledger.
 * Each entry is cryptographically signed and immutable.
 */
export interface LedgerEntry {
    id: string;
    timestamp: string;
    dhu_id: string;
    field_id: string;
    liters: number;
    gallons: number;
    vibration_harmonics: number[]; // From PFA CT clamps
    signature: string; // AES-128 cryptographic signature
    status: 'PENDING' | 'VERIFIED' | 'DISPUTED';
}

/**
 * Real-time state of a District Hub (DHU).
 */
export interface DHUTelemetry {
    id: string;
    status: 'ONLINE' | 'OFFLINE' | 'DEGRADED';
    active_fields: number;
    cpu_usage: number; // Percentage
    gpu_temp: number;  // Celsius (Jetson Nano)
    mesh_nodes_active: number;
    backhaul_latency: number; // ms
    total_field_flow: number; // GPM aggregate
}

/**
 * Real-time state of the Regional Superstation (RSS).
 */
export interface RSSTelemetry {
    id: string;
    oracle_compute_status: 'ACTIVE' | 'IDLE' | 'MAINTENANCE';
    current_spatial_fidelity: '1m' | '10m' | '20m';
    total_storage_used: number; // TB
    active_fleet_crews: number;
    fiber_uplink_status: boolean;
    starlink_backup_status: boolean;
}

/**
 * Spatial Ops: Asset tracking for all field entities.
 */
export type AssetType = 'HUMAN' | 'ROBOTIC' | 'TRACTOR' | 'DATA_GRID' | 'CUSTOM';

export interface SpatialOpsCrew {
    id: string;
    lead_technician: string;
    asset_type: AssetType;
    coordinates: {
        lat: number;
        lng: number;
    };
    rtk_lock: boolean;
    active_pins_count: number;
    completed_pins_count: number;
    status: 'IN_TRANSIT' | 'DEPLOYING' | 'CALIBRATING' | 'ACTIVE';
}

export type AssetFilterType = 'ALL' | AssetType;

/**
 * Master State Store structure for C&C Portal.
 */
export interface CCStoreState {
    rss: RSSTelemetry | null;
    dhus: Record<string, DHUTelemetry>;
    fleet: Record<string, SpatialOpsCrew>;
    ledgerRecent: LedgerEntry[];
    assetFilter: AssetFilterType;
    terrain: TerrainData | null;

    // Actions
    updateDHU: (data: DHUTelemetry) => void;
    updateFleet: (data: SpatialOpsCrew) => void;
    addLedgerEntry: (entry: LedgerEntry) => void;
    setRSS: (data: RSSTelemetry) => void;
    setAssetFilter: (filter: AssetFilterType) => void;
    setTerrain: (data: TerrainData) => void;
}
