
import React, { useMemo, useState, useEffect, useRef, useCallback } from 'react';
import { Lock, Navigation, Layers, Droplets } from 'lucide-react';
import Map, { Source, Layer, NavigationControl, ScaleControl, useControl } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import mapStyle from '../../styles/agri-map-style.json';
import { api } from '../../services/api';

// Custom Mapbox Draw React hook
function DrawControl(props: any) {
    useControl(
        () => new MapboxDraw(props),
        ({ map }) => {
            map.on('draw.create', props.onCreate);
            map.on('draw.update', props.onUpdate);
            map.on('draw.delete', props.onDelete);
        },
        ({ map }) => {
            map.off('draw.create', props.onCreate);
            map.off('draw.update', props.onUpdate);
            map.off('draw.delete', props.onDelete);
        },
        { position: props.position }
    );
    return null;
}

// Types for props (can be expanded)
interface AgriMapProps {
    initialViewState?: {
        longitude: number;
        latitude: number;
        Zoom: number;
    };
    isEnterprise?: boolean;
}

const AgriMap: React.FC<AgriMapProps> = ({
    initialViewState = {
        longitude: -105.00, // Matching demo seed data
        latitude: 40.00,
        Zoom: 15,
        pitch: 60,
        bearing: -20
    },
    isEnterprise = false
}) => {
    const [gridData, setGridData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [ZoomLevel, setZoomLevel] = useState(initialViewState.Zoom);
    const [ZoneStats, setZoneStats] = useState<any>(null);
    const [analyzingZone, setAnalyzingZone] = useState(false);

    const showResolutionPop = ZoomLevel >= 15.5 && !isEnterprise;

    useEffect(() => {
        const fetchGrid = async () => {
            setLoading(true);
            try {
                // Fetching 20m grid for field_demo_001
                const data = await api.get20mGrid('field_demo_001');

                // Convert to GeoJSON
                const geojson = {
                    type: 'FeatureCollection',
                    features: data.map((point: any) => ({
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: [point.longitude, point.latitude]
                        },
                        properties: {
                            moisture: point.moisture_surface,
                            stress: point.stress_index,
                            id: point.grid_id
                        }
                    }))
                };
                setGridData(geojson);
            } catch (error) {
                console.error('Failed to fetch grid data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchGrid();
    }, []);

    const style = useMemo(() => {
        return mapStyle as any; // Type assertion for MapLibre style compatibility
    }, []);

    const handlePolygonDrawn = useCallback(async (e: any) => {
        const data = e.features;
        if (data && data.length > 0) {
            setAnalyzingZone(true);
            try {
                // Get the most recent drawn polygon
                const latestPolygon = data[data.length - 1];
                const stats = await api.analyzeZone('field_demo_001', latestPolygon.geometry);
                setZoneStats(stats);
            } catch (err) {
                console.error("Zone analysis failed:", err);
            } finally {
                setAnalyzingZone(false);
            }
        }
    }, []);

    const handlePolygonDeleted = useCallback(() => {
        setZoneStats(null);
    }, []);

    return (
        <div className="w-full h-full relative">
            <Map
                initialViewState={initialViewState}
                style={{ width: '100%', height: '100%' }}
                mapStyle={style}
                onMove={evt => setZoomLevel(evt.viewState.Zoom)}
                pitchWithGestures={true}
                dragRotate={true}
                maxPitch={85}
                terrain={{ source: 'mapbox-dem', exaggeration: 1.5 }}
            >
                <Source
                    id="mapbox-dem"
                    type="raster-dem"
                    url="mapbox://mapbox.mapbox-terrain-dem-v1"
                    tileSize={512}
                    maxZoom={14}
                />
                
                {/* 3D Buildings Layer (mocked for SLV region) */}
                <Layer 
                    id="3d-buildings"
                    source="composite"
                    source-layer="building"
                    filter={['==', 'extrude', 'true']}
                    type="fill-extrusion"
                    minZoom={15}
                    paint={{
                        'fill-extrusion-color': '#aaa',
                        'fill-extrusion-height': ['get', 'height'],
                        'fill-extrusion-base': ['get', 'min_height'],
                        'fill-extrusion-opacity': 0.6
                    }}
                />

                <NavigationControl position="bottom-right" />
                <ScaleControl />
                <DrawControl
                    position="top-right"
                    displayControlsDefault={false}
                    controls={{
                        polygon: true,
                        trash: true
                    }}
                    onCreate={handlePolygonDrawn}
                    onUpdate={handlePolygonDrawn}
                    onDelete={handlePolygonDeleted}
                />

                {gridData && (
                    <Source id="grid-source" type="geojson" data={gridData}>
                        <Layer
                            id="grid-layer"
                            type="circle"
                            paint={{
                                'circle-radius': 8,
                                'circle-color': [
                                    'interpolate',
                                    ['linear'],
                                    ['get', 'moisture'],
                                    0, '#ff0000',
                                    0.5, '#ffff00',
                                    1, '#00ff00'
                                ],
                                'circle-opacity': 0.7,
                                'circle-stroke-width': 1,
                                'circle-stroke-color': '#fff'
                            }}
                        />
                    </Source>
                )}
            </Map>

            {showResolutionPop && (
                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl z-20 flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-300">
                    <div className="bg-emerald-500/20 p-4 rounded-full mb-4 ring-1 ring-emerald-500/50 shadow-2xl shadow-emerald-500/20">
                        <Lock className="w-12 h-12 text-emerald-400" />
                    </div>
                    <h2 className="text-3xl font-black mb-2 text-white tracking-tight drop-shadow-md">
                        1M HIGH-RESOLUTION AERIAL AUDIT
                    </h2>
                    <p className="text-slate-300 font-medium mb-6 max-w-lg leading-relaxed drop-shadow-sm">
                        CSE has detected a multispectral variance in this sector via the Aerial Fleet.
                        Upgrade to Enterprise to unlock <strong className="text-white">0.7cm/px M3M orthomosaics</strong> and verify the ground truth.
                    </p>
                    <button className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 font-bold tracking-widest uppercase rounded shadow-lg shadow-emerald-900/50 text-white transition-all active:scale-95 border border-emerald-400/50">
                        Unlock Enterprise Data
                    </button>
                </div>
            )}

            {/* Overlay controls or legend could go here */}
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm p-5 rounded-xl shadow-2xl z-10 border border-green-900/10 w-80 transition-all">
                <div className="flex items-center gap-2 mb-2">
                    <Navigation className="w-5 h-5 text-green-700" />
                    <h3 className="font-bold text-lg text-green-800 tracking-tight">FarmSense Field View</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4 pb-4 border-b border-gray-100">Region: North Field (Demo)</p>

                {loading && <p className="text-xs text-blue-500 animate-pulse font-medium">Synchronizing 20m virtual sensor grid...</p>}
                {!loading && gridData && !ZoneStats && (
                    <div className="space-y-4">
                        <p className="text-sm font-medium text-gray-700 flex items-center justify-between">
                            <span>Active Sensors:</span>
                            <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs font-bold">{gridData.features.length}</span>
                        </p>
                        <div className="pt-2">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 border-b border-gray-100 pb-2">Moisture Legend</p>
                            <div className="flex flex-col gap-2.5">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="w-3 h-3 rounded-full bg-[#00ff00] shadow-[0_0_8px_rgba(0,255,0,0.4)]"></span>
                                        <span className="text-sm font-medium text-gray-700">Optimal</span>
                                    </div>
                                    <span className="text-xs text-gray-400">70-100%</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="w-3 h-3 rounded-full bg-[#ffff00] shadow-[0_0_8px_rgba(255,255,0,0.4)]"></span>
                                        <span className="text-sm font-medium text-gray-700">Moderate Warning</span>
                                    </div>
                                    <span className="text-xs text-gray-400">40-70%</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="w-3 h-3 rounded-full bg-[#ff0000] shadow-[0_0_8px_rgba(255,0,0,0.4)]"></span>
                                        <span className="text-sm font-medium text-gray-700">Critical Drought</span>
                                    </div>
                                    <span className="text-xs text-gray-400">< 40%</span>
                                </div>
                            </div>

                            <div className="mt-6 p-3 bg-blue-50/50 rounded-lg shrink-0 w-full border border-blue-100">
                                <p className="text-xs text-blue-700 font-medium">Draw a custom polygon on the right to analyze specific Zone conditions.</p>
                            </div>
                        </div>
                    </div>
                )}

                {analyzingZone && (
                    <p className="text-xs text-blue-500 animate-pulse font-medium mt-4">Running spatial query on Zone endpoints...</p>
                )}

                {ZoneStats && !analyzingZone && (
                    <div className="mt-2 space-y-4 animate-in fade-in duration-300">
                        <div className="flex items-center gap-2 mb-1">
                            <Layers className="w-4 h-4 text-emerald-600" />
                            <p className="text-sm font-bold text-emerald-800 uppercase tracking-wider">Custom Zone Stats</p>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                                <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">Area</p>
                                <p className="font-bold text-gray-800">{(ZoneStats.Zone_area_sqm / 10000).toFixed(2)} ha</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                                <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">Sensors Included</p>
                                <p className="font-bold text-gray-800">{ZoneStats.intersecting_points_count}</p>
                            </div>
                        </div>

                        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mt-2 flex flex-col items-center justify-center text-center">
                            <Droplets className="w-6 h-6 text-blue-500 mb-2" />
                            <p className="text-[10px] uppercase font-bold text-blue-400 mb-1 tracking-widest">Est. Water Deficit</p>
                            <p className="text-2xl font-black text-blue-700 tabular-nums leading-none">
                                {ZoneStats.estimated_water_deficit_mm.toFixed(1)} <span className="text-sm">mm</span>
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mt-2">
                            <div>
                                <p className="text-[10px] uppercase font-bold text-gray-400 mb-0.5">Avg Moisture</p>
                                <p className="font-medium text-gray-700">{(ZoneStats.avg_moisture * 100).toFixed(1)}%</p>
                            </div>
                            <div>
                                <p className="text-[10px] uppercase font-bold text-gray-400 mb-0.5">Avg Temp</p>
                                <p className="font-medium text-gray-700">{ZoneStats.avg_temperature.toFixed(1)}°C</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AgriMap;
