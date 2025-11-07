import React from 'react';
import { Bus, Menu, X } from 'lucide-react';
import ThemeToggleButton from '../ThemeToggleButton';
import { motion } from 'framer-motion';

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  onOpenDashboard: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme, onOpenDashboard }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navItems = ["Trajets", "Agences", "Aide"];

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Bus className="h-8 w-8 text-sky-500" />
            <span className="text-2xl font-bold text-slate-800 dark:text-white">BusCongo</span>
          </motion.div>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a key={item} href="#" className="text-slate-600 dark:text-slate-300 font-medium hover:text-sky-500 dark:hover:text-sky-400 transition-colors">
                {item}
              </a>
            ))}
          </div>

          <motion.div 
            className="hidden md:flex items-center gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} />
            <button 
              onClick={onOpenDashboard}
              className="bg-sky-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-sky-600 transition-all shadow-md"
            >
              Espace Agence
            </button>
          </motion.div>

          <div className="md:hidden flex items-center gap-2">
            <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} />
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-md text-slate-600 dark:text-slate-300">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <motion.div 
            className="mt-4 md:hidden bg-white dark:bg-slate-800 rounded-lg shadow-lg p-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a key={item} href="#" className="text-slate-600 dark:text-slate-300 font-medium hover:text-sky-500 dark:hover:text-sky-400 transition-colors">
                  {item}
                </a>
              ))}
              <hr className="border-slate-200 dark:border-slate-700"/>
              <button 
                onClick={() => {
                  onOpenDashboard();
                  setIsMenuOpen(false);
                }}
                className="bg-sky-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-sky-600 transition-all w-full"
              >
                Espace Agence
              </button>
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  );
};

export default Header;
