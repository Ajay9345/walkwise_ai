import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { AlertTriangle, Clock, MapPin, User, CheckCircle, XCircle, AlertCircle, ArrowRight } from 'lucide-react';
import { cn } from '../utils/cn';

const mockReports = [
  {
    id: '1',
    type: 'Theft',
    location: 'Main St & 5th Ave',
    timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    status: 'verified',
    description: 'Phone snatching incident near subway entrance',
    severity: 'high'
  },
  {
    id: '2',
    type: 'Suspicious Activity',
    location: 'Central Park South',
    timestamp: new Date(Date.now() - 7200000), // 2 hours ago
    status: 'reviewing',
    description: 'Suspicious person loitering near ATMs',
    severity: 'medium'
  },
  {
    id: '3',
    type: 'Infrastructure',
    location: 'Broadway & 34th St',
    timestamp: new Date(Date.now() - 86400000), // 1 day ago
    status: 'pending',
    description: 'Broken streetlight creating dark area',
    severity: 'low'
  },
  {
    id: '4',
    type: 'Harassment',
    location: 'Times Square',
    timestamp: new Date(Date.now() - 172800000), // 2 days ago
    status: 'rejected',
    description: 'Verbal harassment incident',
    severity: 'medium'
  }
];

const getStatusColor = (status) => {
  switch (status) {
    case 'verified':
      return 'text-primary-500';
    case 'reviewing':
      return 'text-warning-500';
    case 'pending':
      return 'text-gray-500';
    case 'rejected':
      return 'text-danger-500';
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case 'verified':
      return <CheckCircle size={18} />;
    case 'reviewing':
      return <Clock size={18} />;
    case 'pending':
      return <AlertCircle size={18} />;
    case 'rejected':
      return <XCircle size={18} />;
  }
};

const getSeverityColor = (severity) => {
  switch (severity) {
    case 'high':
      return 'bg-danger-100 text-danger-700 dark:bg-danger-900/30 dark:text-danger-300';
    case 'medium':
      return 'bg-warning-100 text-warning-700 dark:bg-warning-900/30 dark:text-warning-300';
    case 'low':
      return 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300';
  }
};

export const ReportStatusPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Report Status</h1>
        <p className="text-text-light-secondary dark:text-text-dark-secondary">
          Track the status of your incident reports
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-full">
                  <AlertTriangle size={20} className="text-primary-500" />
                </div>
                <div>
                  <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">Total Reports</p>
                  <p className="text-2xl font-bold">24</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-primary-500">
                View All
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-warning-100 dark:bg-warning-900/30 rounded-full">
                  <Clock size={20} className="text-warning-500" />
                </div>
                <div>
                  <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">Pending Review</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-warning-500">
                Check Status
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-full">
                  <CheckCircle size={20} className="text-primary-500" />
                </div>
                <div>
                  <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">Verified</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-primary-500">
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-danger-100 dark:bg-danger-900/30 rounded-full">
                  <XCircle size={20} className="text-danger-500" />
                </div>
                <div>
                  <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">Rejected</p>
                  <p className="text-2xl font-bold">4</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-danger-500">
                See Why
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="text-primary-500" size={20} />
            Recent Reports
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockReports.map((report) => (
              <div
                key={report.id}
                className="p-4 border border-border-light dark:border-border-dark rounded-lg hover:border-primary-500 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{report.type}</h3>
                      <span className={cn(
                        'px-2 py-0.5 rounded-full text-xs font-medium',
                        getSeverityColor(report.severity)
                      )}>
                        {report.severity.charAt(0).toUpperCase() + report.severity.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                      {report.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-text-light-secondary dark:text-text-dark-secondary">
                      <div className="flex items-center gap-1">
                        <MapPin size={14} />
                        <span>{report.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{report.timestamp.toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className={cn(
                      'flex items-center gap-1 text-sm font-medium',
                      getStatusColor(report.status)
                    )}>
                      {getStatusIcon(report.status)}
                      <span>{report.status.charAt(0).toUpperCase() + report.status.slice(1)}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary-500"
                      rightIcon={<ArrowRight size={16} />}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
