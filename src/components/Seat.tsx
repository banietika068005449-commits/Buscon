import React from 'react';
import { motion } from 'framer-motion';
import { Armchair, LifeBuoy } from 'lucide-react';
import { SeatData } from '../types';

interface SeatProps {
  seat: SeatData;
  onSelect: (id: string) => void;
}

const Seat: React.FC<SeatProps> = ({ seat, onSelect }) => {
  const { id, status, number } = seat;

  if (status === 'driver') {
    return (
      <div className="w-10 h-10 flex items-center justify-center" title="Conducteur">
        <LifeBuoy className="w-8 h-8 text-slate-500 dark:text-slate-400" />
      </div>
    );
  }

  if (id.includes('spacer')) {
    return <div className="w-10 h-10" />;
  }

  const isAvailable = status === 'available';
  const isSelected = status === 'selected';
  const isOccupied = status === 'occupied';

  const baseClasses = "w-10 h-10 rounded-md flex items-center justify-center transition-all duration-200 border-2";
  const statusClasses = 
    isOccupied ? "bg-slate-200 dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-400 dark:text-slate-500 cursor-not-allowed" :
    isSelected ? "bg-sky-500 border-sky-600 text-white" :
    isAvailable ? "bg-sky-100 dark:bg-sky-900/50 border-sky-200 dark:border-sky-800 text-sky-800 dark:text-sky-300 cursor-pointer hover:bg-sky-200 dark:hover:bg-sky-800" :
    "";

  return (
    <motion.button
      onClick={() => isAvailable && onSelect(id)}
      disabled={!isAvailable}
      className={`${baseClasses} ${statusClasses}`}
      aria-label={`Siège ${number}`}
      whileHover={isAvailable ? { scale: 1.1, y: -2 } : {}}
      whileTap={isAvailable ? { scale: 0.95 } : {}}
    >
      <span className="text-xs font-bold">{number}</span>
    </motion.button>
  );
};

export default Seat;
