import { CCStoreState, DHUTelemetry, SpatialOpsCrew, RSSTelemetry, LedgerEntry, AssetFilterType } from '@/types/cc';

export const useCCStore = create<CCStoreState>((set) => ({
    rss: null,
    dhus: {},
    fleet: {},
    ledgerRecent: [],
    assetFilter: 'ALL',

    updateDHU: (data: DHUTelemetry) =>
        set((state) => ({
            dhus: { ...state.dhus, [data.id]: data }
        })),

    updateFleet: (data: SpatialOpsCrew) =>
        set((state) => ({
            fleet: { ...state.fleet, [data.id]: data }
        })),

    addLedgerEntry: (entry: LedgerEntry) =>
        set((state) => ({
            ledgerRecent: [entry, ...state.ledgerRecent].slice(0, 100) // Keep last 100 entries for the HUD
        })),

    setRSS: (data: RSSTelemetry) =>
        set(() => ({ rss: data })),

    setAssetFilter: (filter: AssetFilterType) =>
        set(() => ({ assetFilter: filter })),
}));
