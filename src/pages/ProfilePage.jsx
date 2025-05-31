import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Shield,
  AlertTriangle,
  Clock,
  Users,
  Camera,
  Edit2,
  Save,
  X,
  Lock,
  Smartphone
} from 'lucide-react';

export const ProfilePage = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    emergencyContacts: [
      { name: 'Jane Doe', relation: 'Sister', phone: '+1 (555) 987-6543' },
      { name: 'John Smith', relation: 'Friend', phone: '+1 (555) 456-7890' }
    ]
  });

  const stats = {
    reportedIncidents: 12,
    safeRoutes: 45,
    checkIns: 89,
    trustScore: 95
  };

  const handleSave = () => {
    // In a real app, this would save to the backend
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="text-text-light-secondary dark:text-text-dark-secondary">
          Manage your account and safety preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <User className="text-primary-500" size={20} />
                  Personal Information
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                  leftIcon={isEditing ? <X size={16} /> : <Edit2 size={16} />}
                >
                  {isEditing ? 'Cancel' : 'Edit'}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <div className="h-24 w-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="h-full w-full rounded-full object-cover"
                      />
                    ) : (
                      <User size={40} className="text-gray-400" />
                    )}
                  </div>
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 bg-primary-500 text-white p-1.5 rounded-full shadow-lg">
                      <Camera size={14} />
                    </button>
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{profileData.name}</h3>
                  <p className="text-text-light-secondary dark:text-text-dark-secondary">
                    Member since January 2024
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  disabled={!isEditing}
                  leftIcon={<User size={18} />}
                />
                <Input
                  label="Email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  disabled={!isEditing}
                  leftIcon={<Mail size={18} />}
                />
                <Input
                  label="Phone"
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  disabled={!isEditing}
                  leftIcon={<Phone size={18} />}
                />
                <Input
                  label="Location"
                  value={profileData.location}
                  onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                  disabled={!isEditing}
                  leftIcon={<MapPin size={18} />}
                />
              </div>

              {isEditing && (
                <div className="flex justify-end mt-4">
                  <Button
                    variant="primary"
                    onClick={handleSave}
                    leftIcon={<Save size={18} />}
                  >
                    Save Changes
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="text-primary-500" size={20} />
                Emergency Contacts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {profileData.emergencyContacts.map((contact, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border border-border-light dark:border-border-dark rounded-lg"
                  >
                    <div>
                      <h4 className="font-medium">{contact.name}</h4>
                      <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                        {contact.relation}
                      </p>
                      <p className="text-sm">{contact.phone}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Edit2 size={16} />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  className="w-full"
                  leftIcon={<Users size={18} />}
                >
                  Add Emergency Contact
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="text-primary-500" size={20} />
                Safety Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                  <div className="text-3xl font-bold text-primary-500">
                    {stats.trustScore}%
                  </div>
                  <div className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                    Trust Score
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 border border-border-light dark:border-border-dark rounded-lg">
                    <AlertTriangle size={20} className="mx-auto mb-1 text-warning-500" />
                    <div className="text-xl font-bold">{stats.reportedIncidents}</div>
                    <div className="text-xs text-text-light-secondary dark:text-text-dark-secondary">
                      Incidents Reported
                    </div>
                  </div>

                  <div className="text-center p-3 border border-border-light dark:border-border-dark rounded-lg">
                    <MapPin size={20} className="mx-auto mb-1 text-primary-500" />
                    <div className="text-xl font-bold">{stats.safeRoutes}</div>
                    <div className="text-xs text-text-light-secondary dark:text-text-dark-secondary">
                      Safe Routes Used
                    </div>
                  </div>

                  <div className="text-center p-3 border border-border-light dark:border-border-dark rounded-lg">
                    <Clock size={20} className="mx-auto mb-1 text-primary-500" />
                    <div className="text-xl font-bold">{stats.checkIns}</div>
                    <div className="text-xs text-text-light-secondary dark:text-text-dark-secondary">
                      Check-ins
                    </div>
                  </div>

                  <div className="text-center p-3 border border-border-light dark:border-border-dark rounded-lg">
                    <Users size={20} className="mx-auto mb-1 text-primary-500" />
                    <div className="text-xl font-bold">2</div>
                    <div className="text-xs text-text-light-secondary dark:text-text-dark-secondary">
                      Emergency Contacts
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="text-primary-500" size={20} />
                Account Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                variant="outline"
                className="w-full justify-start"
                leftIcon={<Lock size={18} />}
              >
                Change Password
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                leftIcon={<Smartphone size={18} />}
              >
                Two-Factor Authentication
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                leftIcon={<AlertTriangle size={18} />}
              >
                Security Log
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
