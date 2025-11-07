import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Trip, PickupPoint, SeatData } from '../types';
import ThemeToggleButton from './ThemeToggleButton';
import Seat from './Seat';
import { ArrowLeft, MapPin, Clock } from 'lucide-react';

// Mock data for seat layout
const generateSeats = (): SeatData[] => {
  const layout = [
    ['driver', 'spacer', 'spacer', 'spacer', 'spacer'],
    [1, 2, 'spacer', 3, 4],
    [5, 6, 'spacer', 7, 8],
    [9, 10, 'spacer', 11, 12],
    [13, 14, 'spacer', 15, 16],
    [17, 18, 'spacer', 19, 20],
    [21, 22, 'spacer', 23, 24],
    [25, 26, 'spacer', 27, 28],
    [29, 30, 'spacer', 31, 32],
    [33, 34, 35, 36, 37],
  ];

  const occupiedSeats = [3, 4, 15, 22, 35];

  let seats: SeatData[] = [];
  let seatCounter = 1;
  layout.forEach((row, rowIndex) => {
    row.forEach((item, colIndex) => {
      const id = `r${rowIndex}c${colIndex}`;
      if (item === 'spacer') {
        seats.push({ id: `${id}-spacer`, status: 'available' });
      } else if (item === 'driver') {
        seats.push({ id, status: 'driver' });
      } else {
        const seatNumber = item as number;
        seats.push({
          id: seatNumber.toString(),
          number: seatNumber,
          status: occupiedSeats.includes(seatNumber) ? 'occupied' : 'available',
          price: 15000, // Example price in XAF
        });
      }
    });
  });
  return seats;
};


interface SeatSelectionProps {
  trip: Trip;
  selectedPoint: PickupPoint;
  onBack: () => void;
  onContinue: (selectedSeats: SeatData[], totalPrice: number) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const SeatSelection: React.FC<SeatSelectionProps> = ({ trip, selectedPoint, onBack, onContinue, theme, toggleTheme }) => {
  const [seats, setSeats] = useState<SeatData[]>(generateSeats());

  const handleSelectSeat = (seatId: string) => {
    setSeats(currentSeats =>
      currentSeats.map(seat => {
        if (seat.id === seatId) {
          // Can't select non-seat items
          if (seat.status === 'driver' || !seat.number) return seat;
          return { ...seat, status: seat.status === 'selected' ? 'available' : 'selected' };
        }
        return seat;
      })
    );
  };

  const selectedSeats = useMemo(() => seats.filter(s => s.status === 'selected'), [seats]);
  const totalPrice = useMemo(() => selectedSeats.reduce((sum, seat) => sum + (seat.price || 0), 0), [selectedSeats]);

  return (
    <motion.div
      className="w-full max-w-4xl mx-auto"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl shadow-slate-200/60 dark:shadow-black/30 overflow-hidden transition-colors duration-300">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <button onClick={onBack} className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                <ArrowLeft size={20} />
              </button>
              <div>
                <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">{trip.origin} → {trip.destination}</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">Avec {trip.agency}</p>
              </div>
            </div>
            <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} />
          </div>
          <div className="mt-4 ml-14 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                  <MapPin size={14}/> <span>Montée à <b>{selectedPoint.nom}</b></span>
              </div>
              <div className="flex items-center gap-1.5">
                  <Clock size={14}/> <span>À <b>{selectedPoint.horaire_passage}</b></span>
              </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Bus Layout */}
          <div className="md:col-span-2">
            <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-4">Choisissez votre siège</h2>
            <div className="p-6 bg-slate-50 dark:bg-slate-900/70 rounded-xl border border-slate-200 dark:border-slate-700">
              <div className="grid grid-cols-5 gap-2 max-w-xs mx-auto">
                {seats.map(seat => (
                  <Seat key={seat.id} seat={seat} onSelect={handleSelectSeat} />
                ))}
              </div>
            </div>
             {/* Legend */}
            <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
                <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-sky-100 dark:bg-sky-900/50 border-2 border-sky-200 dark:border-sky-800"></div><span className="text-slate-600 dark:text-slate-400">Disponible</span></div>
                <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-sky-500 border-2 border-sky-600"></div><span className="text-slate-600 dark:text-slate-400">Sélectionné</span></div>
                <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-slate-200 dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-600"></div><span className="text-slate-600 dark:text-slate-400">Occupé</span></div>
            </div>
          </div>

          {/* Summary */}
          <div className="md:col-span-1">
             <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-4">Résumé</h2>
             <div className="bg-slate-50 dark:bg-slate-900/70 rounded-xl p-6 space-y-4 border border-slate-200 dark:border-slate-700">
                <div>
                    <h3 className="font-semibold text-slate-600 dark:text-slate-300">Sièges sélectionnés</h3>
                    {selectedSeats.length > 0 ? (
                        <p className="text-2xl font-bold text-sky-600 dark:text-sky-400 mt-1">
                            {selectedSeats.map(s => s.number).join(', ')}
                        </p>
                    ) : (
                        <p className="text-slate-400 dark:text-slate-500 italic mt-1">Aucun siège</p>
                    )}
                </div>
                 <div>
                    <h3 className="font-semibold text-slate-600 dark:text-slate-300">Total à payer</h3>
                    <p className="text-2xl font-bold text-slate-800 dark:text-white mt-1">
                        {totalPrice.toLocaleString('fr-FR')} XAF
                    </p>
                </div>
             </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex justify-end transition-colors duration-300">
          <button
            onClick={() => onContinue(selectedSeats, totalPrice)}
            disabled={selectedSeats.length === 0}
            className="w-full sm:w-auto px-8 py-3 bg-sky-600 text-white font-semibold rounded-lg shadow-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed disabled:shadow-none transition-all duration-200"
          >
            Réserver ({selectedSeats.length})
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default SeatSelection;
