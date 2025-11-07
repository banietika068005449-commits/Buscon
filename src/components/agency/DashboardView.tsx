import React from 'react';
import { BarChart, Users, Bus, Route } from 'lucide-react';

const kpiData = [
  { title: "Passagers aujourd'hui", value: "1,204", change: "+12%", icon: Users, color: "text-green-500" },
  { title: "Trajets en cours", value: "18", change: "", icon: Route, color: "text-sky-500" },
  { title: "Bus en service", value: "42 / 50", change: "", icon: Bus, color: "text-amber-500" },
  { title: "Taux de ponctualité", value: "98.2%", change: "-0.5%", icon: BarChart, color: "text-red-500" },
];

const DashboardView: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Tableau de bord</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map(kpi => (
          <div key={kpi.title} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg flex items-center gap-6">
            <div className={`p-3 rounded-full bg-slate-100 dark:bg-slate-700 ${kpi.color}`}>
              <kpi.icon size={28} />
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">{kpi.title}</p>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">{kpi.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Aperçu de l'activité</h2>
        <div className="h-64 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
          <p className="text-slate-400">Graphique de l'activité à venir</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
