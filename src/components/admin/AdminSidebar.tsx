import React from 'react';
import { Bus, Shield, Users, BarChart3, LogOut } from 'lucide-react';

type AdminViewType = 'agencies' | 'users' | 'reports';

interface AdminSidebarProps {
  onBackToHome: () => void;
  currentView: AdminViewType;
  setCurrentView: (view: AdminViewType) => void;
}

const navItems = [
  { view: 'agencies', icon: Shield, label: 'Gestion des Agences' },
  { view: 'users', icon: Users, label: 'Utilisateurs' },
  { view: 'reports', icon: BarChart3, label: 'Rapports Globaux' },
];

const AdminSidebar: React.FC<AdminSidebarProps> = ({ onBackToHome, currentView, setCurrentView }) => {
  return (
    <div className="w-64 bg-white dark:bg-slate-800 flex-shrink-0 flex flex-col border-r border-slate-200 dark:border-slate-700 transition-colors">
      <div className="h-16 flex items-center justify-center px-4 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2 cursor-pointer" onClick={onBackToHome}>
          <Bus className="h-7 w-7 text-red-500" />
          <span className="text-xl font-bold text-slate-800 dark:text-white">BusCongo <span className="text-red-500 text-sm font-semibold">Admin</span></span>
        </div>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map(item => (
          <button
            key={item.view}
            onClick={() => setCurrentView(item.view as AdminViewType)}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${
              currentView === item.view
                ? 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="px-4 py-4 border-t border-slate-200 dark:border-slate-700">
         <button
            onClick={onBackToHome}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-left"
          >
            <LogOut size={20} />
            <span>Retour à l'accueil</span>
          </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
