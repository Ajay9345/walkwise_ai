import React, { useState } from 'react';
import { ReportIncident } from '../components/incidents/ReportIncident';
import { LeafletMap } from '../components/map/LeafletMap';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { AlertTriangle, List, MapPin, Clock, FileText, CheckCircle, X } from 'lucide-react';

export const IncidentPage = () => {
  const [isReporting, setIsReporting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const handleSubmit = (data) => {
    console.log('Submitted incident data:', data);
    setIsReporting(false);
    setSubmitSuccess(true);
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      setSubmitSuccess(false);
    }, 5000);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Incident Reports</h1>
          <p className="text-text-light-secondary dark:text-text-dark-secondary">
            View and report safety incidents in your area
          </p>
        </div>
        <Button
          variant={isReporting ? "outline" : "primary"}
          leftIcon={isReporting ? <X size={16} /> : <AlertTriangle size={16} />}
          onClick={() => setIsReporting(!isReporting)}
        >
          {isReporting ? "Cancel Report" : "Report Incident"}
        </Button>
      </div>
      
      {submitSuccess && (
        <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800 rounded-lg p-4 flex items-center gap-3 animate-fade-in">
          <CheckCircle className="text-primary-500" size={24} />
          <div>
            <h3 className="font-medium">Incident Report Submitted</h3>
            <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
              Thank you for your report. It will be reviewed by our team.
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="ml-auto"
            onClick={() => setSubmitSuccess(false)}
          >
            <X size={16} />
          </Button>
        </div>
      )}
      
      {isReporting ? (
        <ReportIncident 
          onSubmit={handleSubmit} 
          onCancel={() => setIsReporting(false)} 
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MapPin className="text-primary-500" size={20} />
                  Incident Map
                </CardTitle>
              </CardHeader>
              <CardContent>
                <LeafletMap className="h-[400px]" />
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-danger-500"></div>
                    <span className="text-sm">High Risk</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-warning-500"></div>
                    <span className="text-sm">Medium Risk</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-primary-500"></div>
                    <span className="text-sm">Low Risk</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<List size={16} />}
                >
                  Filter Incidents
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertTriangle className="text-warning-500" size={20} />
                  Recent Incidents
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-l-4 border-danger-500 pl-3 py-2">
                  <div className="flex justify-between">
                    <h3 className="font-medium">Theft Reported</h3>
                    <span className="text-xs bg-danger-100 text-danger-700 dark:bg-danger-900 dark:text-danger-300 px-2 py-0.5 rounded-full">
                      High
                    </span>
                  </div>
                  <div className="flex items-center text-xs text-text-light-secondary dark:text-text-dark-secondary mt-1">
                    <MapPin size={12} className="mr-1" />
                    <span>Broad St & 5th Ave</span>
                    <span className="mx-2">•</span>
                    <Clock size={12} className="mr-1" />
                    <span>2 hours ago</span>
                  </div>
                  <p className="text-sm mt-1">
                    Phone snatching reported near the subway entrance.
                  </p>
                </div>
                
                <div className="border-l-4 border-warning-500 pl-3 py-2">
                  <div className="flex justify-between">
                    <h3 className="font-medium">Suspicious Activity</h3>
                    <span className="text-xs bg-warning-100 text-warning-700 dark:bg-warning-900 dark:text-warning-300 px-2 py-0.5 rounded-full">
                      Medium
                    </span>
                  </div>
                  <div className="flex items-center text-xs text-text-light-secondary dark:text-text-dark-secondary mt-1">
                    <MapPin size={12} className="mr-1" />
                    <span>Park Ave & Main St</span>
                    <span className="mx-2">•</span>
                    <Clock size={12} className="mr-1" />
                    <span>Yesterday</span>
                  </div>
                  <p className="text-sm mt-1">
                    Suspicious person loitering near ATMs in the evening.
                  </p>
                </div>
                
                <div className="border-l-4 border-primary-500 pl-3 py-2">
                  <div className="flex justify-between">
                    <h3 className="font-medium">Broken Streetlight</h3>
                    <span className="text-xs bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300 px-2 py-0.5 rounded-full">
                      Low
                    </span>
                  </div>
                  <div className="flex items-center text-xs text-text-light-secondary dark:text-text-dark-secondary mt-1">
                    <MapPin size={12} className="mr-1" />
                    <span>Oak St & River Rd</span>
                    <span className="mx-2">•</span>
                    <Clock size={12} className="mr-1" />
                    <span>2 days ago</span>
                  </div>
                  <p className="text-sm mt-1">
                    Streetlight out creating a dark area at night.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  View All Incidents
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="text-primary-500" size={20} />
                  Incident Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Incidents by Type</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Theft</span>
                        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-danger-500 rounded-full" style={{ width: '40%' }}></div>
                        </div>
                        <span className="text-sm">40%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Suspicious</span>
                        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-warning-500 rounded-full" style={{ width: '30%' }}></div>
                        </div>
                        <span className="text-sm">30%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Infrastructure</span>
                        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-primary-500 rounded-full" style={{ width: '20%' }}></div>
                        </div>
                        <span className="text-sm">20%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Other</span>
                        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-gray-500 rounded-full" style={{ width: '10%' }}></div>
                        </div>
                        <span className="text-sm">10%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-border-light dark:border-border-dark">
                    <h3 className="text-sm font-medium mb-2">Incident Trends</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold">
                          <span className="text-danger-500">↑</span> 12%
                        </p>
                        <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary">
                          Increase this month
                        </p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold">124</p>
                        <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary">
                          Total reports
                        </p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold">87%</p>
                        <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary">
                          Verification rate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};
