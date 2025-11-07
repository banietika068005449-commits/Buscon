/**
 * Mock API pour le développement
 * Simule les appels API avec des données de test
 */

import { AuthResponse, LoginCredentials, User, Bus, Agence, PickupPoint, Trajet } from '../types';

// Utilisateurs de test
const mockUsers: User[] = [
  {
    id: 1,
    email: 'admin@transbus.tn',
    nom: 'Admin TransBus',
    role: 'admin',
  },
  {
    id: 2,
    email: 'agence@transbus.tn',
    nom: 'Agence Tunis',
    role: 'agence',
    agence_id: 5,
    agence_nom: 'Agence Tunis',
  },
];

// Simuler un délai réseau
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockAuthService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    await delay(800); // Simuler la latence réseau

    const user = mockUsers.find(
      u => u.email === credentials.email && 
      (credentials.password === 'admin123' || credentials.password === 'agence123')
    );

    if (!user) {
      throw new Error('Email ou mot de passe incorrect');
    }

    // Générer un token mock (en production, ce serait un vrai JWT)
    const token = `mock_token_${user.id}_${Date.now()}`;

    return {
      token,
      user,
      expires_in: 3600,
    };
  },
};

// Mock des données
const mockBuses: Bus[] = [
  { id: 'b1', immatriculation: '1234 AB 5', modele: 'Toyota Coaster', capacite: 30, kilometrage: 150000, derniereRevision: '2025-10-15', statut: 'En service', coordinates: [-4.26, 15.28] },
  { id: 'b2', immatriculation: '5678 CD 6', modele: 'Mercedes Sprinter', capacite: 22, kilometrage: 85000, derniereRevision: '2025-09-01', statut: 'En maintenance', coordinates: [-4.78, 11.86] },
  { id: 'b3', immatriculation: '9101 EF 7', modele: 'Toyota Hiace', capacite: 18, kilometrage: 210000, derniereRevision: '2025-08-20', statut: 'En panne', coordinates: [-4.20, 12.67] },
  { id: 'b4', immatriculation: '2424 GH 8', modele: 'Hyundai County', capacite: 28, kilometrage: 12000, derniereRevision: '2025-11-01', statut: 'Au dépôt', coordinates: [-4.25, 15.26] },
];

const mockAgences: Agence[] = [
  { id: 'ag1', nom: 'TransCongo', ville: 'Brazzaville', adresse: '123 Av. de la République', telephone: '+242 05 555 0101', email: 'contact@transcongo.cg', responsable: { nom: 'Jean Dupont', email: 'j.dupont@transcongo.cg', telephone: '+242 06 111 2233' }, statut: 'Actif', date_creation: '2022-01-15', busActifs: 45, totalBus: 50, disponibilite: 90 },
  { id: 'ag2', nom: 'Ocean du Nord', ville: 'Pointe-Noire', adresse: '456 Bd. de la Liberté', telephone: '+242 05 555 0202', email: 'contact@oceandunord.cg', responsable: { nom: 'Marie Dubois', email: 'm.dubois@oceandunord.cg', telephone: '+242 06 444 5566' }, statut: 'Actif', date_creation: '2021-03-20', busActifs: 28, totalBus: 35, disponibilite: 80 },
  { id: 'ag3', nom: 'Voyages Express', ville: 'Dolisie', adresse: '789 Rue de la Paix', telephone: '+242 05 555 0303', email: 'contact@voyagesexpress.cg', responsable: { nom: 'Paul Martin', email: 'p.martin@voyagesexpress.cg', telephone: '+242 06 777 8899' }, statut: 'Inactif', date_creation: '2023-05-10', busActifs: 10, totalBus: 20, disponibilite: 50 },
];

// Intercepter les appels API et retourner des données mock
export const setupMockApi = () => {
  // Intercepter les appels à /api/auth/login
  if (typeof window !== 'undefined') {
    // Cette fonction sera utilisée par le service API réel
    console.log('Mock API activé pour le développement');
  }
};

