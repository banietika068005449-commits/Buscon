import React, { useState } from 'react';
import Sidebar from './Sidebar';
import DashboardHeader from './DashboardHeader';
import PointManagement from './PointManagement';
import TripManagement from './TripManagement';
import BusManagement from './BusManagement';
import DashboardView from './DashboardView';
import PassengersView from './PassengersView';
import { PickupPoint, Trajet, Bus } from '../../types';
import { motion, AnimatePresence } from 'framer-motion';

type DashboardViewType = 'dashboard' | 'points' | 'trips' | 'buses' | 'passengers';

interface AgencyDashboardProps {
  initialPoints: PickupPoint[];
  initialTrips: Trajet[];
  initialBuses: Bus[];
  onBackToHome: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const AgencyDashboard: React.FC<AgencyDashboardProps> = ({ initialPoints, initialTrips, initialBuses, onBackToHome, theme, toggleTheme }) => {
  const [currentView, setCurrentView] = useState<DashboardViewType>('dashboard');
  
  const [points, setPoints] = useState<PickupPoint[]>(initialPoints);
  const [trips, setTrips] = useState<Trajet[]>(initialTrips);
  const [buses, setBuses] = useState<Bus[]>(initialBuses);

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView />;
      case 'points':
        return <PointManagement points={points} setPoints={setPoints} />;
      case 'trips':
        return <TripManagement trips={trips} setTrips={setTrips} pickupPoints={points} />;
      case 'buses':
        return <BusManagement buses={buses} setBuses={setBuses} />;
      case 'passengers':
        return <PassengersView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-sans">
      <Sidebar onBackToHome={onBackToHome} currentView={currentView} setCurrentView={setCurrentView} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader theme={theme} toggleTheme={toggleTheme} />
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

export default AgencyDashboard;
