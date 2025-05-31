import React from 'react';
import { LeafletMap } from '../components/map/LeafletMap';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Navigation, Route, AlertTriangle, Camera, Shield } from 'lucide-react';

export const MapPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Live Safety Map</h1>
          <p className="text-text-light-secondary dark:text-text-dark-secondary">
            Explore real-time safety data and navigation options
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            leftIcon={<AlertTriangle size={16} />}
          >
            Report Incident
          </Button>
          <Button
            variant="primary"
            leftIcon={<Navigation size={16} />}
          >
            Get Directions
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-3">
          <LeafletMap className="h-[calc(100vh-230px)]" />
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Route size={20} className="text-primary-500" />
                Route Options
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-lg p-3 border-primary-100 dark:border-primary-800 bg-primary-50 dark:bg-primary-900/20">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-primary-500"></div>
                    <h3 className="font-medium">Safest Route</h3>
                  </div>
                  <span className="text-sm text-text-light-secondary dark:text-text-dark-secondary">15 min</span>
                </div>
                <div className="mt-2 space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>1.2 miles</span>
                    <span className="text-primary-600 dark:text-primary-400">95% safe</span>
                  </div>
                  <div className="text-xs text-text-light-secondary dark:text-text-dark-secondary">
                    Via Main St, Park Ave
                  </div>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full mt-3"
                >
                  Use This Route
                </Button>
              </div>
              
              <div className="border rounded-lg p-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-danger-500"></div>
                    <h3 className="font-medium">Fastest Route</h3>
                  </div>
                  <span className="text-sm text-text-light-secondary dark:text-text-dark-secondary">10 min</span>
                </div>
                <div className="mt-2 space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>1.0 miles</span>
                    <span className="text-danger-600 dark:text-danger-400">70% safe</span>
                  </div>
                  <div className="text-xs text-text-light-secondary dark:text-text-dark-secondary">
                    Via Broad St, High St
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-3"
                >
                  Use This Route
                </Button>
              </div>
              
              <div className="border rounded-lg p-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-warning-500"></div>
                    <h3 className="font-medium">Balanced Route</h3>
                  </div>
                  <span className="text-sm text-text-light-secondary dark:text-text-dark-secondary">12 min</span>
                </div>
                <div className="mt-2 space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>1.1 miles</span>
                    <span className="text-warning-600 dark:text-warning-400">85% safe</span>
                  </div>
                  <div className="text-xs text-text-light-secondary dark:text-text-dark-secondary">
                    Via Oak St, River Rd
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-3"
                >
                  Use This Route
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield size={20} className="text-primary-500" />
                Safety Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Camera size={16} className="text-primary-500" />
                    <span className="text-sm">CCTV Cameras</span>
                  </div>
                  <span className="text-sm font-medium">12 nearby</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle size={16} className="text-warning-500" />
                    <span className="text-sm">Recent Incidents</span>
                  </div>
                  <span className="text-sm font-medium">3 this week</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield size={16} className="text-primary-500" />
                    <span className="text-sm">Police Stations</span>
                  </div>
                  <span className="text-sm font-medium">1 within 1 mile</span>
                </div>
              </div>
              
              <div className="border-t pt-3">
                <h4 className="font-medium text-sm mb-2">Area Safety Score</h4>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-primary-500 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <span className="text-sm font-medium">85%</span>
                </div>
                <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary mt-1">
                  This area is generally safe during daylight hours
                </p>
              </div>
              
              <div className="p-3 bg-warning-50 dark:bg-warning-900/20 rounded-lg border border-warning-100 dark:border-warning-800">
                <div className="flex items-start gap-2">
                  <AlertTriangle size={18} className="text-warning-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-sm">Evening Safety Advisory</h4>
                    <p className="text-xs mt-1">
                      This area has reduced visibility after 9 PM. Consider using the safest route or alternative transportation.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
