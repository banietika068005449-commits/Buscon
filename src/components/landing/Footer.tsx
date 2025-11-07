import React from 'react';
import { Bus, Facebook, Twitter, Instagram } from 'lucide-react';

interface FooterProps {
  onOpenDashboard: () => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenDashboard }) => {
  return (
    <footer className="bg-slate-800 dark:bg-slate-900 text-slate-300">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Bus className="h-8 w-8 text-sky-400" />
              <span className="text-2xl font-bold text-white">BusCongo</span>
            </div>
            <p className="text-sm text-slate-400">La plateforme N°1 pour la réservation de bus au Congo.</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Entreprise</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-sky-400 transition-colors">À propos</a></li>
              <li><a href="#" className="hover:text-sky-400 transition-colors">Carrières</a></li>
              <li><a href="#" className="hover:text-sky-400 transition-colors">Presse</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Partenaires</h4>
            <ul className="space-y-2">
              <li><button onClick={onOpenDashboard} className="hover:text-sky-400 transition-colors text-left w-full">Espace Agence</button></li>
              <li><a href="#" className="hover:text-sky-400 transition-colors">Devenir partenaire</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Légal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-sky-400 transition-colors">Conditions d'utilisation</a></li>
              <li><a href="#" className="hover:text-sky-400 transition-colors">Politique de confidentialité</a></li>
            </ul>
          </div>
        </div>
        <hr className="my-8 border-slate-700" />
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <p className="text-sm text-slate-400">&copy; 2025 BusCongo. Tous droits réservés.</p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <a href="#" className="hover:text-white"><Facebook size={20} /></a>
            <a href="#" className="hover:text-white"><Twitter size={20} /></a>
            <a href="#" className="hover:text-white"><Instagram size={20} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
