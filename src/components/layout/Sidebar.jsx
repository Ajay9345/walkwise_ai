import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { 
  MapPin, 
  MessageSquare, 
  AlertTriangle, 
  FileText, 
  Settings, 
  User, 
  Home, 
  Moon, 
  Sun, 
  Menu, 
  X, 
  LogOut,
  Shield
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { Button } from '../ui/Button';

const SidebarLink = ({ to, icon, label, collapsed }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => cn(
        'flex items-center gap-3 rounded-lg px-3 py-2 transition-colors',
        'hover:bg-gray-100 dark:hover:bg-gray-800',
        isActive 
          ? 'bg-primary-50 text-primary-600 dark:bg-gray-800 dark:text-primary-400' 
          : 'text-gray-700 dark:text-gray-300',
        collapsed ? 'justify-center' : ''
      )}
    >
      <div className="text-lg">{icon}</div>
      {!collapsed && <span className="text-sm font-medium">{label}</span>}
    </NavLink>
  );
};

export const Sidebar = ({ collapsed, onToggle }) => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  
  return (
    <aside className={cn(
      'fixed inset-y-0 left-0 z-[1001] flex flex-col border-r border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark transition-all duration-300',
      collapsed ? 'w-16' : 'w-64'
    )}>
      <div className="flex h-16 items-center justify-between px-4">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <MapPin className="h-6 w-6 text-primary-500" />
            <span className="text-lg font-semibold">WalkWise.AI</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          className={cn("p-1", collapsed && "mx-auto")}
          onClick={onToggle}
        >
          {collapsed ? <Menu size={20} /> : <X size={20} />}
        </Button>
      </div>
      
      <nav className="flex-1 space-y-1 px-2 py-4">
        <SidebarLink to="/" icon={<Home />} label="Home" collapsed={collapsed} />
        <SidebarLink to="/map" icon={<MapPin />} label="Live Map" collapsed={collapsed} />
        <SidebarLink to="/assistant" icon={<MessageSquare />} label="AI Assistant" collapsed={collapsed} />
        <SidebarLink to="/incidents" icon={<AlertTriangle />} label="Incidents" collapsed={collapsed} />
        <SidebarLink to="/reports" icon={<FileText />} label="Reports" collapsed={collapsed} />
        
        {user?.role === 'admin' && (
          <SidebarLink to="/admin" icon={<Shield />} label="Admin Panel" collapsed={collapsed} />
        )}
      </nav>
      
      <div className="mt-auto border-t border-border-light dark:border-border-dark p-2 space-y-1">
        <SidebarLink to="/settings" icon={<Settings />} label="Settings" collapsed={collapsed} />
        <SidebarLink to="/profile" icon={<User />} label="Profile" collapsed={collapsed} />
        
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            'flex w-full items-center gap-3 rounded-lg px-3 py-2',
            collapsed ? 'justify-center' : ''
          )}
          onClick={toggleTheme}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          {!collapsed && <span className="text-sm font-medium">
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </span>}
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-danger-500 hover:bg-danger-50 dark:hover:bg-danger-900/20',
            collapsed ? 'justify-center' : ''
          )}
          onClick={logout}
        >
          <LogOut size={20} />
          {!collapsed && <span className="text-sm font-medium">Logout</span>}
        </Button>
      </div>
    </aside>
  );
};
