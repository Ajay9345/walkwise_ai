import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Bell, Moon, Sun, Globe, Shield, Smartphone, Bell as BellIcon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils/cn';

export const SettingsPage = () => {
  const { theme, toggleTheme } = useTheme();
  const [emailNotifications, setEmailNotifications] = useState({
    safetyAlerts: true,
    weeklyReports: true,
    communityUpdates: false,
    routeChanges: true,
  });

  const [pushNotifications, setPushNotifications] = useState({
    instantAlerts: true,
    nearbyIncidents: true,
    routeUpdates: true,
    checkInReminders: false,
  });

  const [privacySettings, setPrivacySettings] = useState({
    shareLocation: true,
    shareRoutes: false,
    publicProfile: false,
    anonymousReporting: true,
  });

  const toggleSetting = (category, setting, value) => {
    switch (category) {
      case 'email':
        setEmailNotifications(prev => ({ ...prev, [setting]: value }));
        break;
      case 'push':
        setPushNotifications(prev => ({ ...prev, [setting]: value }));
        break;
      case 'privacy':
        setPrivacySettings(prev => ({ ...prev, [setting]: value }));
        break;
    }
  };

  const ToggleButton = ({ enabled, onChange }) => (
    <button
      className={cn(
        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
        enabled ? "bg-primary-500" : "bg-gray-200 dark:bg-gray-700"
      )}
      onClick={() => onChange(!enabled)}
    >
      <span
        className={cn(
          "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
          enabled ? "translate-x-6" : "translate-x-1"
        )}
      />
    </button>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-text-light-secondary dark:text-text-dark-secondary">
          Customize your WalkWise.AI experience
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BellIcon className="text-primary-500" size={20} />
              Email Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(emailNotifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                  <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                    Receive email notifications for {key.toLowerCase()}
                  </p>
                </div>
                <ToggleButton
                  enabled={value}
                  onChange={(newValue) => toggleSetting('email', key, newValue)}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="text-primary-500" size={20} />
              Push Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(pushNotifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                  <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                    Get push notifications for {key.toLowerCase()}
                  </p>
                </div>
                <ToggleButton
                  enabled={value}
                  onChange={(newValue) => toggleSetting('push', key, newValue)}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="text-primary-500" size={20} />
              Privacy & Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(privacySettings).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                  <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                    Control your {key.toLowerCase()} settings
                  </p>
                </div>
                <ToggleButton
                  enabled={value}
                  onChange={(newValue) => toggleSetting('privacy', key, newValue)}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="text-primary-500" size={20} />
              Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Theme</p>
                <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                  Choose your preferred theme
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={toggleTheme}
                leftIcon={theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              >
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Language</p>
                <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                  Select your preferred language
                </p>
              </div>
              <select className="rounded-md border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark px-3 py-1.5 text-sm">
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Distance Unit</p>
                <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                  Choose your preferred unit
                </p>
              </div>
              <select className="rounded-md border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark px-3 py-1.5 text-sm">
                <option value="mi">Miles</option>
                <option value="km">Kilometers</option>
              </select>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
