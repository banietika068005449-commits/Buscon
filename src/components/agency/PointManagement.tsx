import React from 'react';
import { PickupPoint } from '../../types';
import { PlusCircle, Edit, Trash2, MapPin, Clock } from 'lucide-react';

interface PointManagementProps {
  points: PickupPoint[];
}

const PointManagement: React.FC<PointManagementProps> = ({ points }) => {
  const sortedPoints = [...points].sort((a, b) => a.nom.localeCompare(b.nom));

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg">
      <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Points de Ramassage</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Gérez les points de montée pour vos trajets.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-sky-600 text-white font-semibold rounded-lg shadow-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-all">
          <PlusCircle size={18} />
          <span>Ajouter un point</span>
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 dark:bg-slate-900/50 text-xs text-slate-500 dark:text-slate-400 uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">Nom du point</th>
              <th scope="col" className="px-6 py-3">Adresse</th>
              <th scope="col" className="px-6 py-3">Horaire de passage type</th>
              <th scope="col" className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedPoints.map(point => (
              <tr key={point.id} className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50">
                <td className="px-6 py-4 font-semibold text-slate-800 dark:text-slate-100">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-slate-400" />
                    {point.nom}
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{point.adresse}</td>
                <td className="px-6 py-4">
                   <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                    <Clock size={16} className="text-slate-400" />
                    <span>{point.horaire_passage}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-4">
                    <button className="text-slate-500 hover:text-sky-600 transition-colors" title="Modifier">
                      <Edit size={16} />
                    </button>
                    <button className="text-slate-500 hover:text-red-600 transition-colors" title="Supprimer">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PointManagement;
