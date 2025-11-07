import React, { useState } from 'react';
import { Agence } from '../../types';
import { PlusCircle, Edit, Trash2, Search, Shield, BarChartHorizontal, User, CheckCircle, XCircle } from 'lucide-react';
import Modal from '../agency/Modal';
import ConfirmationDialog from '../agency/ConfirmationDialog';
import AgencyForm from './AgencyForm';

interface AgencyManagementProps {
  agences: Agence[];
  setAgences: React.Dispatch<React.SetStateAction<Agence[]>>;
}

const AgencyManagement: React.FC<AgencyManagementProps> = ({ agences, setAgences }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [currentAgence, setCurrentAgence] = useState<Agence | null>(null);
  const [agenceToDeactivate, setAgenceToDeactivate] = useState<Agence | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAdd = () => {
    setCurrentAgence(null);
    setIsModalOpen(true);
  };

  const handleEdit = (agence: Agence) => {
    setCurrentAgence(agence);
    setIsModalOpen(true);
  };

  const handleDeactivate = (agence: Agence) => {
    setAgenceToDeactivate(agence);
    setIsConfirmOpen(true);
  };
  
  const confirmDeactivate = () => {
    if (agenceToDeactivate) {
      setAgences(agences.map(a => a.id === agenceToDeactivate.id ? {...a, statut: 'Inactif'} : a));
      setIsConfirmOpen(false);
      setAgenceToDeactivate(null);
    }
  };

  const handleSave = (agence: Agence) => {
    if (currentAgence) {
      setAgences(agences.map(a => a.id === agence.id ? agence : a));
    } else {
      setAgences([...agences, { ...agence, id: `ag${Date.now()}` }]);
    }
    setIsModalOpen(false);
  };

  const filteredAgences = agences.filter(a =>
    a.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.ville.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getDisponibiliteColor = (dispo: number) => {
    if (dispo >= 90) return 'bg-green-500';
    if (dispo >= 70) return 'bg-amber-500';
    return 'bg-red-500';
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg">
      <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold">Gestion des Agences</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Supervisez et gérez toutes les agences partenaires.</p>
        </div>
        <button onClick={handleAdd} className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all">
          <PlusCircle size={18} />
          <span>Créer une agence</span>
        </button>
      </div>
       <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher une agence..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-sm pl-10 pr-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 focus:ring-sky-500 focus:border-sky-500"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 dark:bg-slate-900/50 text-xs text-slate-500 dark:text-slate-400 uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">Agence</th>
              <th scope="col" className="px-6 py-3">Bus (Actifs/Total)</th>
              <th scope="col" className="px-6 py-3">Disponibilité</th>
              <th scope="col" className="px-6 py-3">Responsable</th>
              <th scope="col" className="px-6 py-3">Statut</th>
              <th scope="col" className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAgences.map(agence => (
              <tr key={agence.id} className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50">
                <td className="px-6 py-4 font-semibold">
                    <p className="text-slate-800 dark:text-slate-100">{agence.nom}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{agence.ville}</p>
                </td>
                <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{agence.busActifs} / {agence.totalBus}</td>
                <td className="px-6 py-4">
                   <div className="flex items-center gap-2">
                        <span className="font-bold w-12">{agence.disponibilite}%</span>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                            <div className={`h-2 rounded-full ${getDisponibiliteColor(agence.disponibilite)}`} style={{width: `${agence.disponibilite}%`}}></div>
                        </div>
                   </div>
                </td>
                <td className="px-6 py-4">
                    <p className="font-medium text-slate-700 dark:text-slate-200">{agence.responsable.nom}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{agence.responsable.email}</p>
                </td>
                <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${agence.statut === 'Actif' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-300'}`}>
                        {agence.statut}
                    </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-4">
                    <button onClick={() => handleEdit(agence)} className="text-slate-500 hover:text-sky-600 transition-colors" title="Modifier">
                      <Edit size={16} />
                    </button>
                    <button onClick={() => handleDeactivate(agence)} className="text-slate-500 hover:text-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" title="Désactiver" disabled={agence.statut === 'Inactif'}>
                      <Trash2 size={16} />
                    </button>
                     <button className="text-slate-500 hover:text-indigo-600 transition-colors" title="Voir détails">
                      <BarChartHorizontal size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={currentAgence ? 'Modifier l\'agence' : 'Créer une nouvelle agence'}>
        <AgencyForm agence={currentAgence} onSave={handleSave} onCancel={() => setIsModalOpen(false)} />
      </Modal>

      <ConfirmationDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDeactivate}
        title="Confirmer la désactivation"
        message={`Êtes-vous sûr de vouloir désactiver l'agence "${agenceToDeactivate?.nom}" ? L'agence ne sera pas supprimée mais ne sera plus visible publiquement.`}
      />
    </div>
  );
};

export default AgencyManagement;
