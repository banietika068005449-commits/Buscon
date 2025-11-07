import React from 'react';
import Sidebar from './Sidebar';
import DashboardHeader from './DashboardHeader';
import PointManagement from './PointManagement';
import { PickupPoint } from '../../types';
import { motion } from 'framer-motion';

interface AgencyDashboardProps {
  points: PickupPoint[];
  onBackToHome: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const AgencyDashboard: React.FC<AgencyDashboardProps> = ({ points, onBackToHome, theme, toggleTheme }) => {
  return (
    <div className="flex h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-sans">
      <Sidebar onBackToHome={onBackToHome} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader theme={theme} toggleTheme={toggleTheme} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-100 dark:bg-slate-900 p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <PointManagement points={points} />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default AgencyDashboard;
