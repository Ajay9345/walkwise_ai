import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { SosButton } from '../sos/SosButton';
import { cn } from '../../utils/cn';

export const Layout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-text-light-primary dark:text-text-dark-primary">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <Navbar sidebarCollapsed={sidebarCollapsed} />
      
      <main className={cn(
        "pt-16 min-h-screen transition-all duration-300 relative",
        sidebarCollapsed ? 'ml-16' : 'ml-64'
      )}>
        <div className="container mx-auto p-6 relative">
          <Outlet />
        </div>
      </main>
      
      <SosButton />
    </div>
  );
};
