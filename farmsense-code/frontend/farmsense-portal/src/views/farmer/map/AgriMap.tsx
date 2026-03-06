import { useState } from 'react';
import Map, { NavigationControl, ScaleControl } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

export default function AgriMap() {
  const [viewState, setViewState] = useState({
    longitude: -106.1,
    latitude: 37.5,
    zoom: 12
  });

  return (
    <div className="h-full w-full relative">
      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        style={{ width: '100%', height: '100%' }}
        mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
      >
        <NavigationControl position="top-right" />
        <ScaleControl position="bottom-left" />
      </Map>
      
      <div className="absolute bottom-4 right-4 bg-white p-3 rounded-lg shadow-lg">
        <p className="text-sm font-semibold">Field Overview</p>
        <p className="text-xs text-gray-600">Center: {viewState.latitude.toFixed(4)}, {viewState.longitude.toFixed(4)}</p>
        <p className="text-xs text-gray-600">Zoom: {viewState.zoom.toFixed(1)}</p>
      </div>
    </div>
  );
}
