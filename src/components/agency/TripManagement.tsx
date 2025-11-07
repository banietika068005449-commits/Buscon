import React, { useState } from 'react';
import { Trajet, PickupPoint } from '../../types';
import { PlusCircle, Edit, Trash2, Route, Clock, CheckCircle, XCircle, PlayCircle, AlertCircle, Search } from 'lucide-react';
import Modal from './Modal';
import ConfirmationDialog from './ConfirmationDialog';

interface TripManagementProps {
  trips: Trajet[];
  setTrips: React.Dispatch<React.SetStateAction<Trajet[]>>;
  pickupPoints: PickupPoint[];
}

const statusIcons = {
  'Programmé': <Clock size={16} className="text-blue-500" />,
  'En cours': <PlayCircle size={16} className="text-green-500 animate-pulse" />,
  'Terminé': <CheckCircle size={16} className="text-slate-500" />,
  'Annulé': <XCircle size={16} className="text-red-500" />,
};

const TripManagement: React.FC<TripManagementProps> = ({ trips, setTrips, pickupPoints }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [currentTrip, setCurrentTrip] = useState<Trajet | null>(null);
  const [tripToDelete, setTripToDelete] = useState<Trajet | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAdd = () => {
    setCurrentTrip(null);
    setIsModalOpen(true);
  };

  const handleEdit = (trip: Trajet) => {
    setCurrentTrip(trip);
    setIsModalOpen(true);
  };

  const handleDelete = (trip: Trajet) => {
    setTripToDelete(trip);
    setIsConfirmOpen(true);
  };
  
  const confirmDelete = () => {
    if (tripToDelete) {
      setTrips(trips.filter(t => t.id !== tripToDelete.id));
      setIsConfirmOpen(false);
      setTripToDelete(null);
    }
  };

  const handleSave = (trip: Trajet) => {
    if (currentTrip) {
      setTrips(trips.map(t => t.id === trip.id ? trip : t));
    } else {
      setTrips([...trips, { ...trip, id: `t${Date.now()}` }]);
    }
    setIsModalOpen(false);
  };

  const filteredTrips = trips.filter(t =>
    t.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg">
      <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold">Gestion des Trajets</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Planifiez et gérez les itinéraires de vos bus.</p>
        </div>
        <button onClick={handleAdd} className="flex items-center gap-2 px-4 py-2 bg-sky-600 text-white font-semibold rounded-lg shadow-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-all">
          <PlusCircle size={18} />
          <span>Ajouter un trajet</span>
        </button>
      </div>
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher un trajet (ex: Brazzaville)..."
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
              <th scope="col" className="px-6 py-3">Trajet</th>
              <th scope="col" className="px-6 py-3">Heure Départ</th>
              <th scope="col" className="px-6 py-3">Statut</th>
              <th scope="col" className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTrips.map(trip => (
              <tr key={trip.id} className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50">
                <td className="px-6 py-4 font-semibold text-slate-800 dark:text-slate-100">
                  <div className="flex items-center gap-2">
                    <Route size={16} className="text-slate-400" />
                    <span>{trip.origin} → {trip.destination}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{trip.departureTime}</td>
                <td className="px-6 py-4">
                   <div className="flex items-center gap-2 font-medium">
                    {statusIcons[trip.status]}
                    <span>{trip.status}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-4">
                    <button onClick={() => handleEdit(trip)} className="text-slate-500 hover:text-sky-600 transition-colors" title="Modifier">
                      <Edit size={16} />
                    </button>
                    <button onClick={() => handleDelete(trip)} className="text-slate-500 hover:text-red-600 transition-colors" title="Supprimer">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={currentTrip ? 'Modifier le trajet' : 'Ajouter un trajet'}>
        <TripForm trip={currentTrip} pickupPoints={pickupPoints} onSave={handleSave} onCancel={() => setIsModalOpen(false)} />
      </Modal>

      <ConfirmationDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Confirmer la suppression"
        message={`Êtes-vous sûr de vouloir supprimer le trajet "${tripToDelete?.origin} → ${tripToDelete?.destination}" ?`}
      />
    </div>
  );
};

const TripForm: React.FC<{trip: Trajet | null, pickupPoints: PickupPoint[], onSave: (trip: Trajet) => void, onCancel: () => void}> = ({ trip, pickupPoints, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    origin: trip?.origin || '',
    destination: trip?.destination || '',
    departureTime: trip?.departureTime || '',
    status: trip?.status || 'Programmé',
    points: trip?.points || [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: trip?.id || '',
      ...formData
    } as Trajet);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">Origine</label>
          <input type="text" name="origin" value={formData.origin} onChange={handleChange} required className="mt-1 block w-full input-style" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">Destination</label>
          <input type="text" name="destination" value={formData.destination} onChange={handleChange} required className="mt-1 block w-full input-style" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">Heure de départ</label>
          <input type="time" name="departureTime" value={formData.departureTime} onChange={handleChange} required className="mt-1 block w-full input-style" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">Statut</label>
          <select name="status" value={formData.status} onChange={handleChange} className="mt-1 block w-full input-style">
            <option>Programmé</option>
            <option>En cours</option>
            <option>Terminé</option>
            <option>Annulé</option>
          </select>
        </div>
      </div>
      <div className="flex justify-end gap-4 pt-4">
        <button type="button" onClick={onCancel} className="btn-secondary">Annuler</button>
        <button type="submit" className="btn-primary">Enregistrer</button>
      </div>
    </form>
  );
};

export default TripManagement;
