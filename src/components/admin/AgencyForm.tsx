import React, { useState } from 'react';
import { Agence, Responsable } from '../../types';

interface AgencyFormProps {
    agence: Agence | null;
    onSave: (agence: Agence) => void;
    onCancel: () => void;
}

const AgencyForm: React.FC<AgencyFormProps> = ({ agence, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    nom: agence?.nom || '',
    ville: agence?.ville || 'Brazzaville',
    adresse: agence?.adresse || '',
    telephone: agence?.telephone || '',
    email: agence?.email || '',
    responsableNom: agence?.responsable.nom || '',
    responsableEmail: agence?.responsable.email || '',
    responsableTelephone: agence?.responsable.telephone || '',
    statut: agence?.statut || 'Actif',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const responsable: Responsable = {
        nom: formData.responsableNom,
        email: formData.responsableEmail,
        telephone: formData.responsableTelephone,
    };
    onSave({
      id: agence?.id || '',
      nom: formData.nom,
      ville: formData.ville,
      adresse: formData.adresse,
      telephone: formData.telephone,
      email: formData.email,
      responsable,
      statut: formData.statut as 'Actif' | 'Inactif',
      date_creation: agence?.date_creation || new Date().toISOString().split('T')[0],
      busActifs: agence?.busActifs || 0,
      totalBus: agence?.totalBus || 0,
      disponibilite: agence?.disponibilite || 0,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
        <h3 className="font-semibold text-lg mb-4 text-slate-800 dark:text-slate-100">Informations sur l'agence</h3>
        <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">Nom de l'agence</label>
                    <input type="text" name="nom" value={formData.nom} onChange={handleChange} required className="mt-1 block w-full input-style" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">Ville</label>
                    <select name="ville" value={formData.ville} onChange={handleChange} className="mt-1 block w-full input-style">
                        <option>Brazzaville</option>
                        <option>Pointe-Noire</option>
                        <option>Dolisie</option>
                        <option>Nkayi</option>
                    </select>
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">Adresse complète</label>
                <input type="text" name="adresse" value={formData.adresse} onChange={handleChange} required className="mt-1 block w-full input-style" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">Téléphone</label>
                    <input type="tel" name="telephone" value={formData.telephone} onChange={handleChange} required className="mt-1 block w-full input-style" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">Email de contact</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full input-style" />
                </div>
            </div>
        </div>
      </div>

      <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
        <h3 className="font-semibold text-lg mb-4 text-slate-800 dark:text-slate-100">Informations du responsable</h3>
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">Nom complet du responsable</label>
                <input type="text" name="responsableNom" value={formData.responsableNom} onChange={handleChange} required className="mt-1 block w-full input-style" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">Email du responsable</label>
                    <input type="email" name="responsableEmail" value={formData.responsableEmail} onChange={handleChange} required className="mt-1 block w-full input-style" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-600 dark:text-slate-300">Téléphone du responsable</label>
                    <input type="tel" name="responsableTelephone" value={formData.responsableTelephone} onChange={handleChange} required className="mt-1 block w-full input-style" />
                </div>
            </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-4">
        <button type="button" onClick={onCancel} className="btn-secondary">Annuler</button>
        <button type="submit" className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all">Enregistrer</button>
      </div>
    </form>
  );
};

export default AgencyForm;
