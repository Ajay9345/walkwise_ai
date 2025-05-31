import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { cn } from '../../utils/cn';
import { Button } from '../ui/Button';
import { DirectionsPanel } from './DirectionsPanel';
import { 
  Camera, 
  AlertTriangle, 
  Users, 
  Navigation, 
  ShieldAlert,
  Map,
  Layers,
  Search,
  LocateFixed,
  ArrowRight
} from 'lucide-react';

const INITIAL_POSITION = [40.7128, -74.0060]; // New York
const ZOOM_LEVEL = 13;

const cameraLocations = [
  { id: '1', position: [40.7128, -74.0060], name: 'Times Square Camera 1', status: 'active' },
  { id: '2', position: [40.7200, -74.0100], name: 'Central Park South', status: 'active' },
  { id: '3', position: [40.7180, -73.9950], name: 'Grand Central', status: 'maintenance' },
  { id: '4', position: [40.7080, -74.0120], name: 'Financial District', status: 'inactive' },
  { id: '5', position: [40.7220, -74.0000], name: 'Midtown East', status: 'active' },
];

const crimeZones = [
  { id: '1', center: [40.7150, -74.0080], radius: 200, level: 'high', description: 'High theft area' },
  { id: '2', center: [40.7100, -74.0020], radius: 300, level: 'medium', description: 'Medium risk zone' },
  { id: '3', center: [40.7230, -74.0050], radius: 250, level: 'low', description: 'Low risk area' },
];

const routeOptions = [
  {
    id: '1',
    name: 'Safest Route',
    type: 'safest',
    path: [
      [40.7128, -74.0060],
      [40.7150, -74.0030],
      [40.7180, -74.0010],
      [40.7200, -74.0000],
    ],
    duration: 15,
    distance: 1.2,
    safetyScore: 95,
  },
  {
    id: '2',
    name: 'Fastest Route',
    type: 'fastest',
    path: [
      [40.7128, -74.0060],
      [40.7140, -74.0050],
      [40.7160, -74.0030],
      [40.7200, -74.0000],
    ],
    duration: 10,
    distance: 1.0,
    safetyScore: 70,
  },
  {
    id: '3',
    name: 'Balanced Route',
    type: 'balanced',
    path: [
      [40.7128, -74.0060],
      [40.7145, -74.0040],
      [40.7170, -74.0020],
      [40.7200, -74.0000],
    ],
    duration: 12,
    distance: 1.1,
    safetyScore: 85,
  },
];

const createIcon = (color) => {
  return L.divIcon({
    className: 'custom-div-icon',
    html: `
      <div style="background-color: ${color}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 4px rgba(0,0,0,0.4);">
      </div>
    `,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
};

const MapControls = () => {
  const map = useMap();

  return (
    <div className="absolute top-4 right-4 z-[400] flex flex-col gap-2">
      <div className="bg-white dark:bg-card-dark p-2 rounded-md shadow-elevation-1 border border-border-light dark:border-border-dark">
        <div className="flex flex-col gap-1">
          <Button size="sm" variant="primary" className="flex justify-start" leftIcon={<Camera size={16} />}>
            CCTV Cameras
          </Button>
          <Button size="sm" variant="primary" className="flex justify-start" leftIcon={<AlertTriangle size={16} />}>
            Crime Zones
          </Button>
          <Button size="sm" variant="primary" className="flex justify-start" leftIcon={<Navigation size={16} />}>
            Routes
          </Button>
        </div>
      </div>
      <div className="bg-white dark:bg-card-dark p-2 rounded-md shadow-elevation-1 border border-border-light dark:border-border-dark">
        <div className="flex flex-col gap-1">
          <Button size="sm" variant="outline" className="flex justify-start" onClick={() => map.locate({ setView: true, maxZoom: 16 })} leftIcon={<Map size={16} />}>
            My Location
          </Button>
          <Button size="sm" variant="outline" className="flex justify-start" onClick={() => map.setView(INITIAL_POSITION, ZOOM_LEVEL)} leftIcon={<Layers size={16} />}>
            Reset View
          </Button>
        </div>
      </div>
    </div>
  );
};

export const LeafletMap = ({ className }) => {
  const [showDirections, setShowDirections] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);

  const getRouteColor = (type) => {
    switch (type) {
      case 'safest': return '#4CAF50';
      case 'fastest': return '#F44336';
      case 'balanced': return '#FF9800';
      default: return '#3388ff';
    }
  };

  const getCrimeZoneColor = (level) => {
    switch (level) {
      case 'low': return 'rgba(76, 175, 80, 0.2)';
      case 'medium': return 'rgba(255, 152, 0, 0.2)';
      case 'high': return 'rgba(244, 67, 54, 0.2)';
      default: return 'rgba(0, 0, 0, 0.1)';
    }
  };

  const getCrimeZoneBorderColor = (level) => {
    switch (level) {
      case 'low': return '#4CAF50';
      case 'medium': return '#FF9800';
      case 'high': return '#F44336';
      default: return '#000000';
    }
  };

  const getCameraIcon = (status) => {
    switch (status) {
      case 'active': return createIcon('#4CAF50');
      case 'inactive': return createIcon('#F44336');
      case 'maintenance': return createIcon('#FF9800');
      default: return createIcon('#3388ff');
    }
  };

  const handleRouteSelect = (route) => {
    const matchingRoute = routeOptions.find(r => r.type === route.type);
    setSelectedRoute(matchingRoute || null);
  };

  return (
    <div className={cn("relative w-full h-[calc(100vh-8rem)] rounded-lg overflow-hidden border border-border-light dark:border-border-dark", className)}>
      <MapContainer center={INITIAL_POSITION} zoom={ZOOM_LEVEL} style={{ height: '100%', width: '100%' }} className="z-[300]">
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        
        {cameraLocations.map(camera => (
          <Marker key={camera.id} position={camera.position} icon={getCameraIcon(camera.status)}>
            <Popup>
              <div className="p-1">
                <h3 className="font-medium">{camera.name}</h3>
                <p className={cn("text-sm", camera.status === 'active' ? 'text-primary-500' : camera.status === 'inactive' ? 'text-danger-500' : 'text-warning-500')}>
                  Status: {camera.status.charAt(0).toUpperCase() + camera.status.slice(1)}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}

        {crimeZones.map(zone => (
          <Circle key={zone.id} center={zone.center} radius={zone.radius} pathOptions={{ fillColor: getCrimeZoneColor(zone.level), fillOpacity: 0.5, color: getCrimeZoneBorderColor(zone.level), weight: 2 }}>
            <Popup>
              <div className="p-1">
                <h3 className="font-medium">Risk Area</h3>
                <p className={cn("text-sm", zone.level === 'low' ? 'text-primary-500' : zone.level === 'medium' ? 'text-warning-500' : 'text-danger-500')}>
                  Level: {zone.level.charAt(0).toUpperCase() + zone.level.slice(1)}
                </p>
                <p className="text-sm">{zone.description}</p>
              </div>
            </Popup>
          </Circle>
        ))}

        {selectedRoute && (
          <Polyline positions={selectedRoute.path} pathOptions={{ color: getRouteColor(selectedRoute.type), weight: 5, opacity: 0.7 }}>
            <Popup>
              <div className="p-1">
                <h3 className="font-medium">{selectedRoute.name}</h3>
                <div className="grid grid-cols-2 gap-1 text-sm mt-1">
                  <p>Distance: {selectedRoute.distance} mi</p>
                  <p>Duration: {selectedRoute.duration} min</p>
                </div>
                <div className="mt-1">
                  <div className="flex items-center">
                    <span className="text-sm mr-2">Safety:</span>
                    <div className="h-2 bg-gray-200 rounded-full flex-1">
                      <div className={cn("h-full rounded-full", selectedRoute.safetyScore > 90 ? "bg-primary-500" : selectedRoute.safetyScore > 75 ? "bg-warning-500" : "bg-danger-500")} style={{ width: `${selectedRoute.safetyScore}%` }}></div>
                    </div>
                    <span className="text-sm ml-2">{selectedRoute.safetyScore}%</span>
                  </div>
                </div>
              </div>
            </Popup>
          </Polyline>
        )}

        {showDirections && <DirectionsPanel onRouteSelect={handleRouteSelect} onClose={() => setShowDirections(false)} />}
        <MapControls />
        {!showDirections && (
          <div className="absolute top-4 left-4 z-[400]">
            <Button variant="primary" className="shadow-elevation-2" onClick={() => setShowDirections(true)} leftIcon={<Navigation size={18} />}>
              Get Directions
            </Button>
          </div>
        )}
      </MapContainer>
    </div>
  );
};
