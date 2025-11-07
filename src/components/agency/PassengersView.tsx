import React from 'react';
import { Users } from 'lucide-react';

const PassengersView: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg">
      <div className="p-6 border-b border-slate-200 dark:border-slate-700">
        <h1 className="text-xl font-bold">Gestion des Passagers</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Consultez les listes de passagers par trajet.</p>
      </div>
      <div className="p-10 flex flex-col items-center justify-center text-center">
        <Users size={48} className="text-slate-300 dark:text-slate-600 mb-4" />
        <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-300">Page en construction</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">La fonctionnalité de gestion des passagers sera bientôt disponible.</p>
      </div>
    </div>
  );
};

export default PassengersView;
