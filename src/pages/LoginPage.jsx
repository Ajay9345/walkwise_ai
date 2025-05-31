import React from 'react';
import { Navigate } from 'react-router-dom';
import { LoginForm } from '../components/auth/LoginForm';
import { useAuth } from '../context/AuthContext';
import { MapPin } from 'lucide-react';

export const LoginPage = () => {
  const { isAuthenticated } = useAuth();
  
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background-dark flex">
      {/* Left side - Login form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900 mb-4">
              <MapPin className="h-6 w-6 text-primary-500" />
            </div>
            <h1 className="text-2xl font-bold text-text-light-primary dark:text-text-dark-primary">
              WalkWise.AI
            </h1>
            <p className="text-text-light-secondary dark:text-text-dark-secondary mt-2">
              AI-powered urban safety and navigation
            </p>
          </div>
          
          <LoginForm />
        </div>
      </div>
      
      {/* Right side - Image and info */}
      <div
        className="hidden lg:block w-1/2 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/1034662/pexels-photo-1034662.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')"
        }}
      >
        <div className="h-full w-full bg-primary-900/30 backdrop-blur-sm flex items-center p-12">
          <div className="max-w-xl text-white">
            <h2 className="text-3xl font-bold mb-4">Navigate Safely with AI</h2>
            <p className="text-lg mb-6">
              WalkWise.AI helps you stay safe in urban environments with real-time
              safety data, AI-powered route recommendations, and emergency features.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
                <h3 className="font-semibold mb-2">Real-time Safety Maps</h3>
                <p className="text-sm">
                  Visualize crime data, crowd density, and safe routes in real-time
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
                <h3 className="font-semibold mb-2">AI Assistant</h3>
                <p className="text-sm">
                  Get contextual safety recommendations and navigate with confidence
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
                <h3 className="font-semibold mb-2">SOS Features</h3>
                <p className="text-sm">
                  One-tap emergency alerts and location sharing with contacts
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
                <h3 className="font-semibold mb-2">Incident Reporting</h3>
                <p className="text-sm">
                  Report and view safety incidents to help your community
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
