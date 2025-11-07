import React, { useState, useMemo } from 'react';
import { Bus } from 'lucide-react';
import { motion } from 'framer-motion';
import { Trip, PickupPoint } from '../types';
import PickupPointItem from './PickupPointItem';
import PickupMap from './PickupMap';
import ThemeToggleButton from './ThemeToggleButton';

interface PickupPointSelectorProps {
  trip: Trip;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  onContinue: (selectedPoint: PickupPoint) => void;
}

const listContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const listItemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 120,
    },
  },
};

const PickupPointSelector: React.FC<PickupPointSelectorProps> = ({ trip, theme, toggleTheme, onContinue }) => {
  const [selectedPointId, setSelectedPointId] = useState<string | null>(null);

  const sortedPoints = useMemo(() => {
    return [...trip.points].sort((a, b) => a.horaire_passage.localeCompare(b.horaire_passage));
  }, [trip.points]);
  
  const handleContinue = () => {
    const selected = trip.points.find(p => p.id === selectedPointId);
    if (selected) {
      onContinue(selected);
    }
  };

  return (
    <motion.div 
      className="w-full max-w-6xl mx-auto"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl shadow-slate-200/60 dark:shadow-black/30 overflow-hidden transition-colors duration-300">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
              <div className="bg-sky-100 dark:bg-sky-900/50 p-3 rounded-full self-start">
                <Bus className="h-6 w-6 text-sky-600 dark:text-sky-400" />
              </div>
              <div className="mt-2 sm:mt-0">
                <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">{trip.agency} – {trip.origin} → {trip.destination}</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">Départ final du bus à {trip.finalDepartureTime}</p>
              </div>
            </div>
            <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="p-6 order-2 lg:order-1">
            <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-4">Choisissez votre point de montée :</h2>
            <motion.ul 
              className="space-y-3"
              variants={listContainerVariants}
              initial="hidden"
              animate="visible"
            >
              {sortedPoints.map(point => (
                <PickupPointItem
                  key={point.id}
                  point={point}
                  isSelected={selectedPointId === point.id}
                  onSelect={setSelectedPointId}
                  variants={listItemVariants}
                />
              ))}
            </motion.ul>
          </div>

          <div className="order-1 lg:order-2 min-h-[300px] lg:min-h-0 lg:p-6 lg:pl-0">
             <div className="h-full w-full overflow-hidden lg:rounded-lg">
                <PickupMap 
                    points={trip.points}
                    selectedPointId={selectedPointId}
                    onSelectPoint={setSelectedPointId}
                />
            </div>
          </div>
        </div>

        <div className="p-6 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex justify-end transition-colors duration-300">
          <button
            onClick={handleContinue}
            disabled={!selectedPointId}
            className="w-full sm:w-auto px-8 py-3 bg-sky-600 text-white font-semibold rounded-lg shadow-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed disabled:shadow-none transition-all duration-200"
          >
            Continuer
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PickupPointSelector;
