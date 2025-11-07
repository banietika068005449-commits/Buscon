import React from 'react';
import { MapPin, Calendar, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroProps {
  onStartBooking: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartBooking }) => {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 flex items-center justify-center text-center text-white">
      <div className="absolute inset-0 bg-slate-900">
        <img 
          src="https://images.unsplash.com/photo-1570125909232-eb263c186922?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          alt="Bus on a road" 
          className="w-full h-full object-cover opacity-30" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
      </div>

      <div className="relative container mx-auto px-6 z-10">
        <motion.h1 
          className="text-4xl md:text-6xl font-extrabold tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Réservez votre prochain voyage en bus au Congo
        </motion.h1>
        <motion.p 
          className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-slate-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Simple, rapide et sécurisé. Trouvez les meilleurs trajets entre Brazzaville, Pointe-Noire et au-delà.
        </motion.p>
        
        <motion.div 
          className="mt-10 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-white/10 backdrop-blur-lg p-2 rounded-xl">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-2xl text-left">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="origin" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Départ</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input type="text" id="origin" defaultValue="Brazzaville" className="w-full pl-10 pr-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 focus:ring-sky-500 focus:border-sky-500" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="destination" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Arrivée</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input type="text" id="destination" defaultValue="Dolisie" className="w-full pl-10 pr-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 focus:ring-sky-500 focus:border-sky-500" />
                    </div>
                  </div>
                </div>
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input type="text" id="date" defaultValue="5 Nov 2025" className="w-full pl-10 pr-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 focus:ring-sky-500 focus:border-sky-500" />
                  </div>
                </div>
                <button 
                  onClick={onStartBooking}
                  className="w-full bg-sky-600 text-white font-semibold py-2.5 rounded-lg shadow-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  Rechercher un bus <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
