export interface PickupPoint {
  id: string;
  nom: string;
  adresse: string;
  contact: string;
  horaire_passage: string;
  places_dispo: number;
  coordinates: [number, number]; // [latitude, longitude]
}

export interface Trip {
  agency: string;
  origin: string;
  destination: string;
  finalDepartureTime: string;
  points: PickupPoint[];
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
