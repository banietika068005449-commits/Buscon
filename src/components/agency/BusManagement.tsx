import React, { useState, useMemo, useEffect } from 'react';
import { Bus as BusType } from '../../types';
import { PlusCircle, Edit, Trash2, Bus as BusIcon, Gauge, Wrench, AlertTriangle, ShieldCheck, Search, Calendar, Map } from 'lucide-react';
import Modal from './Modal';
import ConfirmationDialog from './ConfirmationDialog';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

interface BusManagementProps {
  buses: BusType[];
  setBuses: React.Dispatch<React.SetStateAction<BusType[]>>;
}

const statusInfo = {
  'En service': { icon: ShieldCheck, color: 'text-green-500', marker: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png' },
  'En maintenance': { icon: Wrench, color: 'text-blue-500', marker: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png' },
  'En panne': { icon: AlertTriangle, color: 'text-red-500', marker: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png' },
  'Au dépôt': { icon: BusIcon, color: 'text-slate-500', marker: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png' },
};

const createIcon = (url: string) => new L.Icon({
    iconUrl: url,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const ChangeView: React.FC<{ center: [number, number], zoom: number }> = ({ center, zoom }) => {
    const map = useMap();
    useEffect(() => {
        map.flyTo(center, zoom, { duration: 1 });
    }, [center, zoom, map]);
    return null;
}

const BusManagement: React.FC<BusManagementProps> = ({ buses, setBuses }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [currentBus, setCurrentBus] = useState<BusType | null>(null);
  const [busToDelete, setBusToDelete] = useState<BusType | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBusId, setSelectedBusId] = useState<string | null>(null);

  const handleAdd = () => {
    setCurrentBus(null);
    setIsModalOpen(true);
  };

  const handleEdit = (bus: BusType) => {
    setCurrentBus(bus);
    setIsModalOpen(true);
  };

  const handleDelete = (bus: BusType) => {
    setBusToDelete(bus);
    setIsConfirmOpen(true);
  };
  
  const confirmDelete = () => {
    if (busToDelete) {
      setBuses(buses.filter(b => b.id !== busToDelete.id));
      setIsConfirmOpen(false);
      setBusToDelete(null);
    }
  };

  const handleSave = (bus: BusType) => {
    if (currentBus) {
      setBuses(buses.map(b => b.id === bus.id ? bus : b));
    } else {
      const newBus = { ...bus, id: `b${Date.now()}` };
      setBuses([...buses, newBus]);
    }
    setIsModalOpen(false);
  };

  const filteredBuses = buses.filter(b =>
    b.immatriculation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.modele.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const mapCenter: [number, number] = useMemo(() => {
    const selectedBus = buses.find(b => b.id === selectedBusId);
    if (selectedBus && selectedBus.coordinates) return selectedBus.coordinates;
    if (buses.length > 0 && buses[0].coordinates) return buses[0].coordinates;
    return [-4.26, 15.28]; // Default to Brazzaville
  }, [selectedBusId, buses]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Gestion des Bus</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Suivez votre flotte en temps réel et gérez vos véhicules.</p>
        </div>
        <button onClick={handleAdd} className="flex items-center gap-2 px-4 py-2 bg-sky-600 text-white font-semibold rounded-lg shadow-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-all">
          <PlusCircle size={18} />
          <span>Ajouter un bus</span>
        </button>
      </div>
      
      {/* Map View */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-4">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><Map size={20}/> Vue de la flotte</h2>
        <div className="h-96 w-full rounded-lg overflow-hidden">
          <MapContainer center={mapCenter} zoom={8} scrollWheelZoom={false} className="h-full w-full z-0">
            <ChangeView center={mapCenter} zoom={selectedBusId ? 13 : 8} />
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {buses.filter(b => b.coordinates).map((bus) => {
              const markerIconUrl = statusInfo[bus.statut].marker;
              const icon = createIcon(markerIconUrl);
              const selectedIcon = createIcon('https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png');
              
              return (
                <Marker
                    key={bus.id}
                    position={bus.coordinates!}
                    icon={bus.id === selectedBusId ? selectedIcon : icon}
                    eventHandlers={{ click: () => setSelectedBusId(bus.id) }}
                >
                  <Popup>
                    <div className="font-sans">
                      <b className="font-bold">{bus.immatriculation}</b><br />
                      {bus.modele}<br/>
                      Statut: {bus.statut}
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>
      </div>

      {/* Table View */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg">
        <div className="p-4 border-b border-slate-200 dark:border-slate-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher un bus (immatriculation, modèle)..."
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
                <th scope="col" className="px-6 py-3">Immatriculation</th>
                <th scope="col" className="px-6 py-3">Modèle</th>
                <th scope="col" className="px-6 py-3">Kilométrage</th>
                <th scope="col" className="px-6 py-3">Dernière révision</th>
                <th scope="col" className="px-6 py-3">Statut</th>
                <th scope="col" className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBuses.map(bus => {
                const StatusIcon = statusInfo[bus.statut].icon;
                const statusColor = statusInfo[bus.statut].color;
                return (
                  <tr 
                    key={bus.id} 
                    className={`border-b border-slate-200 dark:border-slate-700 transition-colors duration-300 cursor-pointer ${selectedBusId === bus.id ? 'bg-sky-50 dark:bg-sky-900/40' : 'hover:bg-slate-50 dark:hover:bg-slate-700/50'}`}
                    onClick={() => setSelectedBusId(bus.id)}
                  >
                    <td className="px-6 py-4 font-semibold text-slate-800 dark:text-slate-100">{bus.immatriculation}</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{bus.modele} ({bus.capacite} places)</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                        <Gauge size={16} className="text-slate-400" />
                        <span>{bus.kilometrage.toLocaleString('fr-FR')} km</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                        <Calendar size={16} className="text-slate-400" />
                        <span>{new Date(bus.derniereRevision).toLocaleDateString('fr-FR')}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`flex items-center gap-2 font-medium ${statusColor}`}>
                        <StatusIcon size={16} />
                        <span>{bus.statut}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-4" onClick={e => e.stopPropagation()}>
                        <button onClick={() => handleEdit(bus)} className="text-slate-500 hover:text-sky-600 transition-colors" title="Modifier">
                          <Edit size={16} />
                        </button>
                        <button onClick={() => handleDelete(bus)} className="text-slate-500 hover:text-red-600 transition-colors" title="Supprimer">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={currentBus ? 'Modifier le bus' : 'Ajouter un bus'}>
        <BusForm bus={currentBus} onSave={handleSave} onCancel={() => setIsModalOpen(false)} />
      </Modal>

      <ConfirmationDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Confirmer la suppression"
        message={`Êtes-vous sûr de vouloir supprimer le bus immatriculé "${busToDelete?.immatriculation}" ?`}
      />
    </div>
  );
};

const BusForm: React.FC<{bus: BusType | null, onSave: (bus: BusType) => void, onCancel: () => void}> = ({ bus, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    immatriculation: bus?.immatriculation || '',
    modele: bus?.modele || '',
    capacite: bus?.capacite || 30,
    kilometrage: bus?.kilometrage || 0,
    derniereRevision: bus?.derniereRevision || new Date().toISOString().split('T')[0],
    statut: bus?.statut || 'En service',
    lat: bus?.coordinates?.[0] || '',
    lng: bus?.coordinates?.[1] || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'number' ? Number(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ 
      id: bus?.id || '', 
      immatriculation: formData.immatriculation,
      modele: formData.modele,
      capacite: Number(formData.capacite),
      kilometrage: Number(formData.kilometrage),
      derniereRevision: formData.derniereRevision,
      statut: formData.statut as BusType['statut'],
      coordinates: formData.lat && formData.lng ? [Number(formData.lat), Number(formData.lng)] : undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">Immatriculation</label>
          <input type="text" name="immatriculation" value={formData.immatriculation} onChange={handleChange} required className="mt-1 block w-full input-style" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">Modèle</label>
          <input type="text" name="modele" value={formData.modele} onChange={handleChange} required className="mt-1 block w-full input-style" />
        </div>
      </div>
       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">Capacité</label>
          <input type="number" name="capacite" value={formData.capacite} onChange={handleChange} required className="mt-1 block w-full input-style" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">Kilométrage</label>
          <input type="number" name="kilometrage" value={formData.kilometrage} onChange={handleChange} required className="mt-1 block w-full input-style" />
        </div>
      </div>
       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">Dernière révision</label>
          <input type="date" name="derniereRevision" value={formData.derniereRevision} onChange={handleChange} required className="mt-1 block w-full input-style" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">Statut</label>
          <select name="statut" value={formData.statut} onChange={handleChange} className="mt-1 block w-full input-style">
            <option>En service</option>
            <option>En maintenance</option>
            <option>En panne</option>
            <option>Au dépôt</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">Latitude</label>
          <input type="number" step="any" name="lat" value={formData.lat} onChange={handleChange} placeholder="-4.2612" className="mt-1 block w-full input-style" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">Longitude</label>
          <input type="number" step="any" name="lng" value={formData.lng} onChange={handleChange} placeholder="15.2832" className="mt-1 block w-full input-style" />
        </div>
      </div>
      <div className="flex justify-end gap-4 pt-4">
        <button type="button" onClick={onCancel} className="btn-secondary">Annuler</button>
        <button type="submit" className="btn-primary">Enregistrer</button>
      </div>
    </form>
  );
};

export default BusManagement;
