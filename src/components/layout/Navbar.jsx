import React, { useState, useRef, useEffect } from 'react';
import { Bell, Search, Globe, User, MapPin, AlertTriangle, Clock, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { Button } from '../ui/Button';
import  { cn } from '../../utils/cn';

// Removed interface NavbarProps and Notification type annotations
const mockNotifications = [
  {
    id: '1',
    type: 'alert',
    title: 'Safety Alert',
    message: 'Increased incidents reported near Central Park',
    timestamp: new Date(Date.now() - 1800000),
    read: false
  },
  {
    id: '2',
    type: 'info',
    title: 'Route Update',
    message: 'Your usual route has a new safety score',
    timestamp: new Date(Date.now() - 3600000),
    read: false
  },
  {
    id: '3',
    type: 'warning',
    title: 'Area Advisory',
    message: 'Construction work affecting safe paths on 5th Ave',
    timestamp: new Date(Date.now() - 7200000),
    read: false
  }
];

export const Navbar = ({ sidebarCollapsed }) => {
  const { user } = useAuth();
  const { currentLanguage, setLanguage, languages } = useLanguage();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLanguages, setShowLanguages] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const notificationRef = useRef(null);
  const languageRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (languageRef.current && !languageRef.current.contains(event.target)) {
        setShowLanguages(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const removeNotification = (id) => {
    setNotifications(prev =>
      prev.filter(notification => notification.id !== id)
    );
  };

  const getTimeAgo = (date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 60) return 'just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString();
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'alert':
        return <AlertTriangle size={16} className="text-danger-500" />;
      case 'warning':
        return <AlertTriangle size={16} className="text-warning-500" />;
      case 'info':
        return <MapPin size={16} className="text-primary-500" />;
    }
  };

  return (
    <header className={cn(
      "fixed top-0 right-0 z-[1000] flex h-16 items-center border-b border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark px-4 transition-all duration-300",
      sidebarCollapsed ? 'left-16' : 'left-64'
    )}>
      <div className="flex-1 ml-4">
        <div className="relative md:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-text-light-secondary dark:text-text-dark-secondary" />
          <input
            type="search"
            placeholder="Search locations, incidents..."
            className="h-9 w-full rounded-md border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark pl-8 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="relative" ref={notificationRef}>
          <Button
            variant="ghost"
            size="sm"
            className="relative p-2"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-danger-500 text-[10px] font-medium text-white">
                {unreadCount}
              </span>
            )}
          </Button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-lg border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark shadow-elevation-2">
              <div className="flex items-center justify-between p-3 border-b border-border-light dark:border-border-dark">
                <h3 className="font-semibold">Notifications</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-sm"
                  onClick={markAllAsRead}
                >
                  Mark all as read
                </Button>
              </div>

              <div className="max-h-[400px] overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-text-light-secondary dark:text-text-dark-secondary">
                    No notifications
                  </div>
                ) : (
                  notifications.map(notification => (
                    <div
                      key={notification.id}
                      className={cn(
                        "p-3 border-b border-border-light dark:border-border-dark hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer",
                        !notification.read && "bg-primary-50 dark:bg-primary-900/20"
                      )}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <p className="font-medium text-sm">{notification.title}</p>
                            <button
                              className="text-text-light-secondary dark:text-text-dark-secondary hover:text-danger-500"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeNotification(notification.id);
                              }}
                            >
                              <X size={14} />
                            </button>
                          </div>
                          <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                            {notification.message}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Clock size={12} className="text-text-light-secondary dark:text-text-dark-secondary" />
                            <span className="text-xs text-text-light-secondary dark:text-text-dark-secondary">
                              {getTimeAgo(notification.timestamp)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
        
        <div className="relative" ref={languageRef}>
          <Button
            variant="ghost"
            size="sm"
            className="p-2"
            onClick={() => setShowLanguages(!showLanguages)}
          >
            <Globe size={20} />
          </Button>

          {showLanguages && (
            <div className="absolute right-0 mt-2 w-56 rounded-lg border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark shadow-elevation-2">
              <div className="p-2">
                <div className="text-sm font-medium px-2 py-1.5 text-text-light-secondary dark:text-text-dark-secondary">
                  Select Language
                </div>
                <div className="mt-1 max-h-[300px] overflow-y-auto">
                  {languages.map(language => (
                    <button
                      key={language.code}
                      className={cn(
                        "w-full px-3 py-2 text-left text-sm rounded-md flex items-center gap-2",
                        "hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors",
                        currentLanguage.code === language.code && "bg-primary-50 dark:bg-primary-900/20 text-primary-500"
                      )}
                      onClick={() => {
                        setLanguage(language);
                        setShowLanguages(false);
                      }}
                    >
                      <span className="text-base">{language.flag}</span>
                      <div>
                        <div>{language.nativeName}</div>
                        {language.name !== language.nativeName && (
                          <div className="text-xs text-text-light-secondary dark:text-text-dark-secondary">
                            {language.name}
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="ml-4 flex items-center gap-2">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="h-8 w-8 rounded-full object-cover ring-2 ring-primary-500/20"
            />
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900">
              <User size={16} className="text-primary-500" />
            </div>
          )}
          
          <div className="hidden md:block">
            <p className="text-sm font-medium leading-tight">{user?.name || 'Guest'}</p>
            <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary">
              {user?.role === 'admin' ? 'Administrator' : 'User'}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};
