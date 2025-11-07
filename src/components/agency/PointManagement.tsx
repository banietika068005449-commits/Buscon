import React, { useState } from 'react';
import { PickupPoint } from '../../types';
import { PlusCircle, Edit, Trash2, MapPin, Clock, Search } from 'lucide-react';
import Modal from './Modal';
import ConfirmationDialog from './ConfirmationDialog';

interface PointManagementProps {
  points: PickupPoint[];
  setPoints: React.Dispatch<React.SetStateAction<PickupPoint[]>>;
}

const PointManagement: React.FC<PointManagementProps> = ({ points, setPoints }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [currentPoint, setCurrentPoint] = useState<PickupPoint | null>(null);
  const [pointToDelete, setPointToDelete] = useState<PickupPoint | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAdd = () => {
    setCurrentPoint(null);
    setIsModalOpen(true);
  };

  const handleEdit = (point: PickupPoint) => {
    setCurrentPoint(point);
    setIsModalOpen(true);
  };

  const handleDelete = (point: PickupPoint) => {
    setPointToDelete(point);
    setIsConfirmOpen(true);
  };
  
  const confirmDelete = () => {
    if (pointToDelete) {
      setPoints(points.filter(p => p.id !== pointToDelete.id));
      setIsConfirmOpen(false);
      setPointToDelete(null);
    }
  };

  const handleSave = (point: PickupPoint) => {
    if (currentPoint) {
      setPoints(points.map(p => p.id === point.id ? point : p));
    } else {
      setPoints([...points, { ...point, id: `p${Date.now()}` }]);
    }
    setIsModalOpen(false);
  };

  const filteredPoints = points.filter(p =>
    p.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.adresse.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => a.nom.localeCompare(b.nom));

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg">
      <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold">Points de Ramassage</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Gérez les points de montée pour vos trajets.</p>
        </div>
        <button onClick={handleAdd} className="flex items-center gap-2 px-4 py-2 bg-sky-600 text-white font-semibold rounded-lg shadow-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-all">
          <PlusCircle size={18} />
          <span>Ajouter un point</span>
        </button>
      </div>
       <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher un point..."
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
              <th scope="col" className="px-6 py-3">Nom du point</th>
              <th scope="col" className="px-6 py-3">Adresse</th>
              <th scope="col" className="px-6 py-3">Horaire type</th>
              <th scope="col" className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPoints.map(point => (
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
                    <button onClick={() => handleEdit(point)} className="text-slate-500 hover:text-sky-600 transition-colors" title="Modifier">
                      <Edit size={16} />
                    </button>
                    <button onClick={() => handleDelete(point)} className="text-slate-500 hover:text-red-600 transition-colors" title="Supprimer">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={currentPoint ? 'Modifier le point' : 'Ajouter un point'}>
        <PointForm point={currentPoint} onSave={handleSave} onCancel={() => setIsModalOpen(false)} />
      </Modal>

      <ConfirmationDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Confirmer la suppression"
        message={`Êtes-vous sûr de vouloir supprimer le point "${pointToDelete?.nom}" ? Cette action est irréversible.`}
      />
    </div>
  );
};

const PointForm: React.FC<{point: PickupPoint | null, onSave: (point: PickupPoint) => void, onCancel: () => void}> = ({ point, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    nom: point?.nom || '',
    adresse: point?.adresse || '',
    horaire_passage: point?.horaire_passage || '',
    contact: point?.contact || '',
    lat: point?.coordinates[0] || -4.26,
    lng: point?.coordinates[1] || 15.28,
    places_dispo: point?.places_dispo || 10,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: point?.id || '',
      nom: formData.nom,
      adresse: formData.adresse,
      horaire_passage: formData.horaire_passage,
      contact: formData.contact,
      coordinates: [Number(formData.lat), Number(formData.lng)],
      places_dispo: Number(formData.places_dispo),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">Nom du point</label>
        <input type="text" name="nom" value={formData.nom} onChange={handleChange} required className="mt-1 block w-full input-style" />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">Adresse</label>
        <input type="text" name="adresse" value={formData.adresse} onChange={handleChange} required className="mt-1 block w-full input-style" />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">Horaire de passage type</label>
        <input type="time" name="horaire_passage" value={formData.horaire_passage} onChange={handleChange} required className="mt-1 block w-full input-style" />
      </div>
      <div className="flex justify-end gap-4 pt-4">
        <button type="button" onClick={onCancel} className="btn-secondary">Annuler</button>
        <button type="submit" className="btn-primary">Enregistrer</button>
      </div>
    </form>
  );
};

export default PointManagement;
