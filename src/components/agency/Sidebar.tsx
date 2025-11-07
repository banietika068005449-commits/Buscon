import React from 'react';
import { Bus, LayoutDashboard, MapPin, Route, Users, LogOut } from 'lucide-react';

interface SidebarProps {
  onBackToHome: () => void;
}

const navItems = [
  { icon: LayoutDashboard, label: 'Tableau de bord' },
  { icon: MapPin, label: 'Points de ramassage', active: true },
  { icon: Route, label: 'Trajets' },
  { icon: Users, label: 'Passagers' },
];

const Sidebar: React.FC<SidebarProps> = ({ onBackToHome }) => {
  return (
    <div className="w-64 bg-white dark:bg-slate-800 flex-shrink-0 flex flex-col border-r border-slate-200 dark:border-slate-700">
      <div className="h-16 flex items-center justify-center px-4 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2 cursor-pointer" onClick={onBackToHome}>
          <Bus className="h-7 w-7 text-sky-500" />
          <span className="text-xl font-bold text-slate-800 dark:text-white">BusCongo</span>
        </div>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map(item => (
          <a
            key={item.label}
            href="#"
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              item.active
                ? 'bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </a>
        ))}
      </nav>
      <div className="px-4 py-4 border-t border-slate-200 dark:border-slate-700">
         <a
            href="#"
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <LogOut size={20} />
            <span>Déconnexion</span>
          </a>
      </div>
    </div>
  );
};

export default Sidebar;
