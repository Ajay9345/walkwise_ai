import React, { useState } from 'react';
import { Search, Navigation, MapPin, Clock, Shield, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { cn } from '../../utils/cn';

export const DirectionsPanel = ({ onRouteSelect, onClose }) => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [showRoutes, setShowRoutes] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);

  // Mock routes data
  const routes = [
    {
      id: '1',
      name: 'Safest Route',
      type: 'safest',
      duration: 25,
      distance: 2.1,
      safetyScore: 98,
      path: [[40.7128, -74.006], [40.7139, -74.007], [40.7148, -74.008]],
      via: ['Main St', 'Safety Ave', 'Secure Blvd']
    },
    {
      id: '2',
      name: 'Fastest Route',
      type: 'fastest',
      duration: 18,
      distance: 1.8,
      safetyScore: 75,
      path: [[40.7128, -74.006], [40.7135, -74.008], [40.7148, -74.008]],
      via: ['Express Way', 'Quick St']
    },
    {
      id: '3',
      name: 'Balanced Route',
      type: 'balanced',
      duration: 22,
      distance: 2.0,
      safetyScore: 85,
      path: [[40.7128, -74.006], [40.7137, -74.007], [40.7148, -74.008]],
      via: ['Central Ave', 'Balance Rd']
    }
  ];

  const handleSearch = () => {
    if (origin && destination) {
      setShowRoutes(true);
      // In a real app, this would fetch routes from a routing service
    }
  };

  const handleRouteSelect = (route) => {
    setSelectedRoute(route);
    onRouteSelect(route);
  };

  const handleUseCurrentLocation = () => {
    // In a real app, this would use the Geolocation API
    setOrigin('Current Location');
  };

  return (
    <div className="absolute top-4 left-4 z-[400] bg-white dark:bg-card-dark rounded-lg shadow-elevation-2 border border-border-light dark:border-border-dark w-96">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Navigation size={20} className="text-primary-500" />
            Get Directions
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            ×
          </Button>
        </div>

        <div className="space-y-3">
          <div className="relative">
            <Input
              placeholder="Starting point"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              leftIcon={<MapPin size={18} />}
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-primary-500"
              onClick={handleUseCurrentLocation}
            >
              Use Current
            </Button>
          </div>

          <Input
            placeholder="Where to?"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            leftIcon={<Search size={18} />}
          />

          <Button
            variant="primary"
            className="w-full"
            onClick={handleSearch}
            disabled={!origin || !destination}
          >
            Find Routes
          </Button>
        </div>

        {showRoutes && (
          <div className="mt-4 space-y-3">
            <div className="border-t border-border-light dark:border-border-dark pt-4">
              <h3 className="text-sm font-medium mb-2">Suggested Routes</h3>
              {routes.map((route) => (
                <div
                  key={route.id}
                  className={cn(
                    "p-3 rounded-lg border cursor-pointer transition-all mb-2",
                    selectedRoute?.id === route.id
                      ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                      : "border-border-light dark:border-border-dark hover:border-primary-500"
                  )}
                  onClick={() => handleRouteSelect(route)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "h-3 w-3 rounded-full",
                        route.type === 'safest' ? "bg-primary-500" :
                        route.type === 'fastest' ? "bg-danger-500" :
                        "bg-warning-500"
                      )} />
                      <span className="font-medium">{route.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-text-light-secondary dark:text-text-dark-secondary">
                      <Clock size={14} />
                      <span>{route.duration} min</span>
                    </div>
                  </div>

                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span>{route.distance} miles</span>
                    <div className="flex items-center gap-1">
                      <Shield size={14} className={cn(
                        route.safetyScore >= 90 ? "text-primary-500" :
                        route.safetyScore >= 80 ? "text-warning-500" :
                        "text-danger-500"
                      )} />
                      <span className={cn(
                        route.safetyScore >= 90 ? "text-primary-600 dark:text-primary-400" :
                        route.safetyScore >= 80 ? "text-warning-600 dark:text-warning-400" :
                        "text-danger-600 dark:text-danger-400"
                      )}>
                        {route.safetyScore}% safe
                      </span>
                    </div>
                  </div>

                  <div className="mt-2 flex items-center gap-1 text-xs text-text-light-secondary dark:text-text-dark-secondary">
                    <ArrowRight size={12} />
                    <span>via {route.via.join(', ')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
