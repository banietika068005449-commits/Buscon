import React from 'react';
import { Clock, Users, MapPin } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { PickupPoint } from '../types';

interface PickupPointItemProps {
  point: PickupPoint;
  isSelected: boolean;
  onSelect: (id: string) => void;
  variants: Variants;
}

const PickupPointItem: React.FC<PickupPointItemProps> = ({ point, isSelected, onSelect, variants }) => {
  const isDisabled = point.places_dispo === 0;

  return (
    <motion.li
      variants={variants}
      whileHover={!isDisabled ? { scale: 1.02 } : {}}
      whileTap={!isDisabled ? { scale: 0.99 } : {}}
      className={`
        p-4 border rounded-lg transition-all duration-200 flex items-center justify-between
        ${isDisabled
          ? 'bg-slate-50 dark:bg-slate-800/50 opacity-60 cursor-not-allowed'
          : 'cursor-pointer'
        }
        ${isSelected
          ? 'bg-sky-50 dark:bg-sky-900/50 border-sky-500 ring-2 ring-sky-500'
          : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'
        }
      `}
      onClick={() => !isDisabled && onSelect(point.id)}
    >
      <div className="flex items-center gap-3">
        <input
          type="radio"
          name="pickup-point"
          id={point.id}
          checked={isSelected}
          disabled={isDisabled}
          onChange={() => onSelect(point.id)}
          className="form-radio h-5 w-5 text-sky-600 focus:ring-sky-500 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900"
          aria-labelledby={`label-${point.id}`}
        />
        <div className="flex items-center gap-2">
            <MapPin size={16} className="text-slate-400 dark:text-slate-500" />
            <label id={`label-${point.id}`} className={`font-semibold text-slate-800 dark:text-slate-100 ${isDisabled ? '' : 'cursor-pointer'}`}>
                {point.nom}
            </label>
        </div>
      </div>
      <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
        <div className="flex items-center gap-1.5" title="Heure de passage">
          <Clock size={14} />
          <span className="font-medium">{point.horaire_passage}</span>
        </div>
        <div 
          className={`flex items-center gap-1.5 ${point.places_dispo < 10 && point.places_dispo > 0 ? 'text-amber-600 dark:text-amber-400' : ''} ${isDisabled ? 'text-red-500 dark:text-red-600' : ''}`}
          title="Places disponibles"
        >
          <Users size={14} />
          <span className="font-medium">
            {point.places_dispo} {point.places_dispo > 1 ? 'places' : 'place'}
          </span>
        </div>
      </div>
    </motion.li>
  );
};

export default PickupPointItem;
