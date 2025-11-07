import axios, { AxiosInstance, AxiosError } from 'axios';
import { User, AuthResponse, LoginCredentials, Bus, Agence, PickupPoint, Trajet } from '../types';

// Configuration de l'API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// Création de l'instance Axios
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token à chaque requête
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs 401 (non autorisé)
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Token expiré ou invalide
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Détection de l'environnement (mock en développement si pas d'API)
const USE_MOCK_API = !import.meta.env.VITE_API_BASE_URL || import.meta.env.DEV;

// Service d'authentification
export const authService = {
  /**
   * Connexion utilisateur
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // Utiliser le mock API en développement
    if (USE_MOCK_API) {
      // Simuler un délai réseau
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Utilisateurs de test
      const mockUsers: { [key: string]: { user: User; password: string } } = {
        'admin@transbus.tn': {
          user: {
            id: 1,
            email: 'admin@transbus.tn',
            nom: 'Admin TransBus',
            role: 'admin',
          },
          password: 'admin123',
        },
        'agence@transbus.tn': {
          user: {
            id: 2,
            email: 'agence@transbus.tn',
            nom: 'Agence Tunis',
            role: 'agence',
            agence_id: 5,
            agence_nom: 'Agence Tunis',
          },
          password: 'agence123',
        },
      };

      const userData = mockUsers[credentials.email];
      
      if (!userData || userData.password !== credentials.password) {
        throw new Error('Email ou mot de passe incorrect');
      }

      const token = `mock_token_${userData.user.id}_${Date.now()}`;
      const response: AuthResponse = {
        token,
        user: userData.user,
        expires_in: 3600,
      };

      // Stocker le token et les infos utilisateur
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      return response;
    }

    // Appel API réel
    try {
      const response = await api.post<AuthResponse>('/auth/login', credentials);
      
      // Stocker le token et les infos utilisateur
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Erreur de connexion');
      }
      throw error;
    }
  },

  /**
   * Déconnexion
   */
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  /**
   * Récupérer l'utilisateur actuel depuis le localStorage
   */
  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },

  /**
   * Vérifier si l'utilisateur est authentifié
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  },

  /**
   * Vérifier si l'utilisateur a un rôle spécifique
   */
  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user?.role === role;
  },
};

// Service pour les bus (avec filtrage automatique selon le rôle)
export const busService = {
  /**
   * Récupérer tous les bus (filtrés automatiquement selon le rôle)
   */
  async getAll(agenceIds?: number[]): Promise<Bus[]> {
    const params: Record<string, string> = {};
    if (agenceIds && agenceIds.length > 0) {
      params.agences = agenceIds.join(',');
    }

    const response = await api.get<Bus[]>('/bus', { params });
    return response.data;
  },

  /**
   * Récupérer un bus par ID
   */
  async getById(id: string): Promise<Bus> {
    const response = await api.get<Bus>(`/bus/${id}`);
    return response.data;
  },

  /**
   * Créer un nouveau bus
   */
  async create(bus: Omit<Bus, 'id'>): Promise<Bus> {
    const response = await api.post<Bus>('/bus', bus);
    return response.data;
  },

  /**
   * Mettre à jour un bus
   */
  async update(id: string, bus: Partial<Bus>): Promise<Bus> {
    const response = await api.put<Bus>(`/bus/${id}`, bus);
    return response.data;
  },

  /**
   * Supprimer un bus
   */
  async delete(id: string): Promise<void> {
    await api.delete(`/bus/${id}`);
  },
};

// Service pour les agences
export const agenceService = {
  /**
   * Récupérer toutes les agences (admin uniquement)
   */
  async getAll(): Promise<Agence[]> {
    const response = await api.get<Agence[]>('/agences');
    return response.data;
  },

  /**
   * Récupérer une agence par ID
   */
  async getById(id: string): Promise<Agence> {
    const response = await api.get<Agence>(`/agences/${id}`);
    return response.data;
  },

  /**
   * Créer une nouvelle agence (admin uniquement)
   */
  async create(agence: Omit<Agence, 'id'>): Promise<Agence> {
    const response = await api.post<Agence>('/agences', agence);
    return response.data;
  },

  /**
   * Mettre à jour une agence
   */
  async update(id: string, agence: Partial<Agence>): Promise<Agence> {
    const response = await api.put<Agence>(`/agences/${id}`, agence);
    return response.data;
  },
};

// Service pour les points de ramassage
export const pickupPointService = {
  /**
   * Récupérer tous les points (filtrés selon le rôle)
   */
  async getAll(): Promise<PickupPoint[]> {
    const response = await api.get<PickupPoint[]>('/pickup-points');
    return response.data;
  },

  /**
   * Créer un nouveau point
   */
  async create(point: Omit<PickupPoint, 'id'>): Promise<PickupPoint> {
    const response = await api.post<PickupPoint>('/pickup-points', point);
    return response.data;
  },
};

// Service pour les trajets
export const trajetService = {
  /**
   * Récupérer tous les trajets (filtrés selon le rôle)
   */
  async getAll(): Promise<Trajet[]> {
    const response = await api.get<Trajet[]>('/trajets');
    return response.data;
  },

  /**
   * Créer un nouveau trajet
   */
  async create(trajet: Omit<Trajet, 'id'>): Promise<Trajet> {
    const response = await api.post<Trajet>('/trajets', trajet);
    return response.data;
  },
};

export default api;

