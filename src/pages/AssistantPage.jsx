import React from 'react';
import { ChatInterface } from '../components/assistant/ChatInterface';
import { LeafletMap } from '../components/map/LeafletMap';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { MapPin, Users, AlertTriangle, Clock } from 'lucide-react';

export const AssistantPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">AI Safety Assistant</h1>
        <p className="text-text-light-secondary dark:text-text-dark-secondary">
          Get personalized safety recommendations and guidance
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChatInterface />
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MapPin className="text-primary-500" size={20} />
                Current Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-3 rounded-lg overflow-hidden border border-border-light dark:border-border-dark h-[200px]">
                <LeafletMap className="h-full" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-text-light-secondary dark:text-text-dark-secondary">Address</span>
                  <span className="text-sm">123 Main St, New York, NY</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-text-light-secondary dark:text-text-dark-secondary">Neighborhood</span>
                  <span className="text-sm">Downtown</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-text-light-secondary dark:text-text-dark-secondary">Last Updated</span>
                  <span className="text-sm">2 minutes ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="text-primary-500" size={20} />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex gap-3 items-start">
                  <div className="bg-primary-100 dark:bg-primary-900 rounded-full p-1 h-7 w-7 flex items-center justify-center text-primary-500">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Safety route calculated</p>
                    <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary">10 minutes ago</p>
                  </div>
                </div>
                
                <div className="flex gap-3 items-start">
                  <div className="bg-warning-100 dark:bg-warning-900 rounded-full p-1 h-7 w-7 flex items-center justify-center text-warning-500">
                    <AlertTriangle size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Safety alert received</p>
                    <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary">1 hour ago</p>
                  </div>
                </div>
                
                <div className="flex gap-3 items-start">
                  <div className="bg-primary-100 dark:bg-primary-900 rounded-full p-1 h-7 w-7 flex items-center justify-center text-primary-500">
                    <Users size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Check-in sent to contacts</p>
                    <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary">3 hours ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertTriangle className="text-warning-500" size={20} />
                Safety Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
                  <p className="text-sm">
                    Stay in well-lit areas when walking at night
                  </p>
                </div>
                <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
                  <p className="text-sm">
                    Keep emergency contacts easily accessible
                  </p>
                </div>
                <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
                  <p className="text-sm">
                    Be aware of your surroundings, especially in busy areas
                  </p>
                </div>
                <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
                  <p className="text-sm">
                    Use the SOS button in case of emergency
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
