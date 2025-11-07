import React, { useState } from 'react';
import { Search, Bell, UserCircle, LogOut, ChevronDown } from 'lucide-react';
import ThemeToggleButton from '../ThemeToggleButton';
import { useAuth } from '../../contexts/AuthContext';

interface DashboardHeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  onLogout?: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ theme, toggleTheme, onLogout }) => {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    logout();
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <header className="h-16 bg-white dark:bg-slate-800 flex items-center justify-between px-6 border-b border-slate-200 dark:border-slate-700 flex-shrink-0">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder="Rechercher..."
          className="w-full max-w-xs pl-10 pr-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-slate-50 dark:bg-slate-700 focus:ring-sky-500 focus:border-sky-500"
        />
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} />
        <button className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700">
          <Bell size={20} />
        </button>
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg px-3 py-2 transition"
          >
            <UserCircle size={28} className="text-slate-500 dark:text-slate-400"/>
            <div className="text-left">
              <p className="text-sm font-semibold">{user?.nom || 'Utilisateur'}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {user?.agence_nom || 'Agence'}
              </p>
            </div>
            <ChevronDown size={16} className="text-slate-400" />
          </button>
          
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1 z-50">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
              >
                <LogOut size={16} />
                <span>Déconnexion</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
