import React from 'react';
import { Search, Bell, UserCog } from 'lucide-react';
import ThemeToggleButton from '../ThemeToggleButton';

interface AdminHeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ theme, toggleTheme }) => {
  return (
    <header className="h-16 bg-white dark:bg-slate-800 flex items-center justify-between px-6 border-b border-slate-200 dark:border-slate-700 flex-shrink-0">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder="Rechercher une agence, un utilisateur..."
          className="w-full max-w-xs pl-10 pr-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-slate-50 dark:bg-slate-700 focus:ring-sky-500 focus:border-sky-500"
        />
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} />
        <button className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700">
          <Bell size={20} />
        </button>
        <div className="flex items-center gap-2">
            <UserCog size={28} className="text-red-500"/>
            <div>
                <p className="text-sm font-semibold">Admin Global</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Supervision</p>
            </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
