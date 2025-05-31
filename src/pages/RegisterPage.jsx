import React from 'react';
import { Navigate } from 'react-router-dom';
import { RegisterForm } from '../components/auth/RegisterForm';
import { useAuth } from '../context/AuthContext';
import { MapPin } from 'lucide-react';

export const RegisterPage = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background-dark flex">
      {/* Left side - Image and info */}
      <div
        className="hidden lg:block w-1/2 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/2129796/pexels-photo-2129796.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
        }}
      >
        <div className="h-full w-full bg-primary-900/30 backdrop-blur-sm flex items-center p-12">
          <div className="max-w-xl text-white">
            <h2 className="text-3xl font-bold mb-4">Join WalkWise.AI</h2>
            <p className="text-lg mb-6">
              Create your account to access personalized safety features and AI-powered
              navigation assistance tailored to your needs.
            </p>
            <div className="space-y-4">
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
                <h3 className="font-semibold mb-2">Privacy First</h3>
                <p className="text-sm">
                  Your data is encrypted and never shared without your consent
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
                <h3 className="font-semibold mb-2">Personalized Safety</h3>
                <p className="text-sm">
                  Set your safety preferences and emergency contacts for a tailored experience
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
                <h3 className="font-semibold mb-2">Community Insights</h3>
                <p className="text-sm">
                  Contribute to and benefit from crowdsourced safety data
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Register form */}
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

          <RegisterForm />
        </div>
      </div>
    </div>
  );
};
