import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  MapPin, 
  TrendingUp, 
  AlertTriangle, 
  Users, 
  MessageSquare, 
  Shield,
  ArrowRight,
  Info,
  Trophy,
  Calendar,
  Github
} from 'lucide-react';

export const HomePage = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">Welcome to WalkWise.AI</h1>
          <p className="text-text-light-secondary dark:text-text-dark-secondary mb-6">
            Your AI-powered companion for safe urban navigation and exploration
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertTriangle className="text-warning-500" size={20} />
                  Active Incidents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">12</div>
                <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                  In your area today
                </p>
                <div className="mt-2">
                  <Link to="/incidents">
                    <Button variant="ghost" size="sm" className="text-primary-500" rightIcon={<ArrowRight size={16} />}>
                      View Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <MapPin className="text-primary-500" size={20} />
                  Suggested Routes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">3</div>
                <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                  Safe paths available
                </p>
                <div className="mt-2">
                  <Link to="/map">
                    <Button variant="ghost" size="sm" className="text-primary-500" rightIcon={<ArrowRight size={16} />}>
                      Open Map
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="text-danger-500" size={20} />
                  Crime Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">-8%</div>
                <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                  Decrease since last month
                </p>
                <div className="mt-2">
                  <Link to="/reports">
                    <Button variant="ghost" size="sm" className="text-primary-500" rightIcon={<ArrowRight size={16} />}>
                      View Analytics
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="text-primary-500" size={20} />
                  Community Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">124</div>
                <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                  Submitted this week
                </p>
                <div className="mt-2">
                  <Link to="/incidents">
                    <Button variant="ghost" size="sm" className="text-primary-500" rightIcon={<ArrowRight size={16} />}>
                      Report Incident
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link to="/map" className="block">
              <div className="group relative rounded-lg overflow-hidden border border-border-light dark:border-border-dark h-[200px] transition-all hover:shadow-elevation-2">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 z-10" />
                <img 
                  src="https://images.pexels.com/photos/7412095/pexels-photo-7412095.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Live Map"
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 z-20 p-4 text-white">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <MapPin size={20} />
                    Live Safety Map
                  </h3>
                  <p className="text-sm text-white/80">
                    View real-time safety data and navigation
                  </p>
                </div>
              </div>
            </Link>
            
            <Link to="/assistant" className="block">
              <div className="group relative rounded-lg overflow-hidden border border-border-light dark:border-border-dark h-[200px] transition-all hover:shadow-elevation-2">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 z-10" />
                <img 
                  src="https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="AI Assistant"
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 z-20 p-4 text-white">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <MessageSquare size={20} />
                    AI Safety Assistant
                  </h3>
                  <p className="text-sm text-white/80">
                    Get personalized safety recommendations
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
        
        <div className="w-full md:w-80 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="text-primary-500" size={20} />
                Safety Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center mb-2">
                <div className="relative h-32 w-32">
                  <svg className="h-full w-full" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#E0E0E0"
                      strokeWidth="3"
                      strokeDasharray="100, 100"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#4CAF50"
                      strokeWidth="3"
                      strokeDasharray="85, 100"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-3xl font-bold">85%</span>
                    <span className="text-xs text-text-light-secondary dark:text-text-dark-secondary">Area Safety</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span>Crime Rate</span>
                  <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-primary-500 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>CCTV Coverage</span>
                  <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-primary-500 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Lighting</span>
                  <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-primary-500 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Public Transit</span>
                  <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-primary-500 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertTriangle className="text-warning-500" size={20} />
                Recent Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="border-l-4 border-warning-500 pl-3 py-1">
                  <p className="text-sm font-medium">Increased Theft Reports</p>
                  <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary">3 hrs ago • 0.5 miles away</p>
                </div>
                <div className="border-l-4 border-primary-500 pl-3 py-1">
                  <p className="text-sm font-medium">Road Closure on Main St</p>
                  <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary">5 hrs ago • 1.2 miles away</p>
                </div>
                <div className="border-l-4 border-danger-500 pl-3 py-1">
                  <p className="text-sm font-medium">Flooding Alert</p>
                  <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary">Yesterday • 2.1 miles away</p>
                </div>
              </div>
              <div className="mt-3">
                <Link to="/reports">
                  <Button variant="outline" size="sm" className="w-full" rightIcon={<ArrowRight size={16} />}>
                    View All Alerts
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Card className="bg-primary-50 dark:bg-primary-900/20 border-primary-100 dark:border-primary-800">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="bg-primary-100 dark:bg-primary-800 rounded-full p-3 text-primary-700 dark:text-primary-300">
              <Info size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">About WalkWise.AI</h3>
              <p className="text-sm mb-4">
                WalkWise.AI is a comprehensive urban safety and navigation platform that uses advanced AI to provide real-time safety insights, 
                optimal routing, and emergency assistance for urban travelers. Our mission is to make cities safer and more accessible for everyone.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                <div>
                  <h4 className="font-medium mb-1">Frontend</h4>
                  <p className="text-text-light-secondary dark:text-text-dark-secondary">React.js, TailwindCSS</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Backend</h4>
                  <p className="text-text-light-secondary dark:text-text-dark-secondary">FastAPI, MongoDB</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Mapping</h4>
                  <p className="text-text-light-secondary dark:text-text-dark-secondary">Leaflet, OpenStreetMap</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">AI Technologies</h4>
                  <p className="text-text-light-secondary dark:text-text-dark-secondary">TensorFlow, NLP, Computer Vision</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-900/20 dark:to-primary-800/20 border-primary-100 dark:border-primary-800">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="text-primary-500" size={24} />
                <h3 className="text-xl font-semibold">HackVortex 2025 Project</h3>
              </div>
              <p className="text-sm mb-4">
                This prototype was developed to enhance navigation safety for prioritized individuals, focusing on real-time safety monitoring and AI-powered route optimization.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Calendar size={18} className="text-primary-500" />
                  <span className="text-sm">Created: May 30, 2025</span>
                </div>
                <div className="flex items-center gap-2">
                  <Github size={18} className="text-primary-500" />
                  <span className="text-sm">Team StackScape</span>
                </div>
              </div>
            </div>
            <div className="border-l border-primary-200 dark:border-primary-700 pl-6">
              <h4 className="font-semibold mb-3">Development Team</h4>
              <div className="space-y-3">
                <div>
                  <div className="font-medium">Team Leader</div>
                  <div className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                    Praveen Kumar Mohan
                  </div>
                </div>
                <div>
                  <div className="font-medium">Team Member</div>
                  <div className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                    Ajay R
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>


      
      <footer className="text-center py-4 text-sm text-text-light-secondary dark:text-text-dark-secondary">
        &copy; 2025 WalkWise.AI — Built with javascript using React and Node.js
      </footer>
    </div>
  );
};
