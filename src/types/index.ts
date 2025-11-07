export interface PickupPoint {
  id: string;
  nom: string;
  adresse: string;
  contact: string;
  horaire_passage: string;
  places_dispo: number;
  coordinates: [number, number]; // [latitude, longitude]
}

export interface Trajet {
  id: string;
  origin: string;
  destination: string;
  departureTime: string;
  status: 'Programmé' | 'En cours' | 'Terminé' | 'Annulé';
  points: string[]; // array of pickup point IDs
}

export interface Bus {
  id: string;
  immatriculation: string;
  modele: string;
  capacite: number;
  kilometrage: number;
  derniereRevision: string; // date string
  statut: 'En service' | 'En panne' | 'En maintenance' | 'Au dépôt';
}

export interface Trip {
  agency: string;
  origin: string;
  destination: string;
  finalDepartureTime: string;
  points: PickupPoint[];
  trajets: Trajet[];
  buses: Bus[];
}

export type SeatStatus = 'available' | 'occupied' | 'selected' | 'driver';

export interface SeatData {
  id: string; // e.g., '1A', '1B', or 'spacer'
  number?: number;
  status: SeatStatus;
  price?: number;
}

export interface PassengerInfo {
  fullName: string;
  phoneNumber: string;
  email?: string;
}
