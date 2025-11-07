import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import AgencyManagement from './AgencyManagement';
import { Agence } from '../../types';
import { motion, AnimatePresence } from 'framer-motion';

type AdminViewType = 'agencies' | 'users' | 'reports';

interface GlobalAdminDashboardProps {
  initialAgences: Agence[];
  onBackToHome: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const GlobalAdminDashboard: React.FC<GlobalAdminDashboardProps> = ({ initialAgences, onBackToHome, theme, toggleTheme }) => {
  const [currentView, setCurrentView] = useState<AdminViewType>('agencies');
  
  const [agences, setAgences] = useState<Agence[]>(initialAgences);

  const renderView = () => {
    switch (currentView) {
      case 'agencies':
        return <AgencyManagement agences={agences} setAgences={setAgences} />;
      // Add cases for 'users' and 'reports' here in the future
      default:
        return <AgencyManagement agences={agences} setAgences={setAgences} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-sans">
      <AdminSidebar onBackToHome={onBackToHome} currentView={currentView} setCurrentView={setCurrentView} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader theme={theme} toggleTheme={toggleTheme} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-100 dark:bg-slate-900 p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default GlobalAdminDashboard;
