import React, { useState, useEffect } from 'react';
import HomePage from './components/landing/HomePage';
import PickupPointSelector from './components/PickupPointSelector';
import SeatSelection from './components/SeatSelection';
import Payment from './components/Payment';
import Ticket from './components/Ticket';
import AgencyDashboard from './components/agency/AgencyDashboard';
import GlobalAdminDashboard from './components/admin/GlobalAdminDashboard';
import Login from './components/auth/Login';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Trip, PickupPoint, SeatData, PassengerInfo, Trajet, Bus, Agence } from './types';
import { useTheme } from './hooks/useTheme';

const mockTrip: Trip = {
  agency: 'TransCongo',
  origin: 'Brazzaville',
  destination: 'Dolisie',
  finalDepartureTime: '14:00',
  points: [
    { id: 'p2', nom: 'Makélékélé', horaire_passage: '13:30', places_dispo: 8, coordinates: [-4.28, 15.25], adresse: 'Face marché Total', contact: '+242 06 123 4567' },
    { id: 'p3', nom: 'Talangaï', horaire_passage: '14:00', places_dispo: 12, coordinates: [-4.23, 15.30], adresse: 'Arrêt de bus TBC', contact: '+242 06 123 4568' },
    { id: 'p1', nom: 'Mfilou', horaire_passage: '13:15', places_dispo: 3, coordinates: [-4.30, 15.23], adresse: 'Près de la Mairie', contact: '+242 06 123 4569' },
    { id: 'p4', nom: 'Arrêt Marché', horaire_passage: '13:45', places_dispo: 0, coordinates: [-4.26, 15.27], adresse: 'Devant le grand marché', contact: '+242 06 123 4570' },
  ],
  trajets: [
      { id: 't1', origin: 'Brazzaville', destination: 'Pointe-Noire', departureTime: '08:00', status: 'Programmé', points: ['p1', 'p2'] },
      { id: 't2', origin: 'Brazzaville', destination: 'Dolisie', departureTime: '13:00', status: 'En cours', points: ['p1', 'p2', 'p3'] },
      { id: 't3', origin: 'Pointe-Noire', destination: 'Brazzaville', departureTime: '20:00', status: 'Terminé', points: [] },
  ],
  buses: [
      { id: 'b1', immatriculation: '1234 AB 5', modele: 'Toyota Coaster', capacite: 30, kilometrage: 150000, derniereRevision: '2025-10-15', statut: 'En service', coordinates: [-4.26, 15.28] },
      { id: 'b2', immatriculation: '5678 CD 6', modele: 'Mercedes Sprinter', capacite: 22, kilometrage: 85000, derniereRevision: '2025-09-01', statut: 'En maintenance', coordinates: [-4.78, 11.86] },
      { id: 'b3', immatriculation: '9101 EF 7', modele: 'Toyota Hiace', capacite: 18, kilometrage: 210000, derniereRevision: '2025-08-20', statut: 'En panne', coordinates: [-4.20, 12.67] },
      { id: 'b4', immatriculation: '2424 GH 8', modele: 'Hyundai County', capacite: 28, kilometrage: 12000, derniereRevision: '2025-11-01', statut: 'Au dépôt', coordinates: [-4.25, 15.26] },
  ],
  agences: [
    { id: 'ag1', nom: 'TransCongo', ville: 'Brazzaville', adresse: '123 Av. de la République', telephone: '+242 05 555 0101', email: 'contact@transcongo.cg', responsable: { nom: 'Jean Dupont', email: 'j.dupont@transcongo.cg', telephone: '+242 06 111 2233' }, statut: 'Actif', date_creation: '2022-01-15', busActifs: 45, totalBus: 50, disponibilite: 90 },
    { id: 'ag2', nom: 'Ocean du Nord', ville: 'Pointe-Noire', adresse: '456 Bd. de la Liberté', telephone: '+242 05 555 0202', email: 'contact@oceandunord.cg', responsable: { nom: 'Marie Dubois', email: 'm.dubois@oceandunord.cg', telephone: '+242 06 444 5566' }, statut: 'Actif', date_creation: '2021-03-20', busActifs: 28, totalBus: 35, disponibilite: 80 },
    { id: 'ag3', nom: 'Voyages Express', ville: 'Dolisie', adresse: '789 Rue de la Paix', telephone: '+242 05 555 0303', email: 'contact@voyagesexpress.cg', responsable: { nom: 'Paul Martin', email: 'p.martin@voyagesexpress.cg', telephone: '+242 06 777 8899' }, statut: 'Inactif', date_creation: '2023-05-10', busActifs: 10, totalBus: 20, disponibilite: 50 },
  ]
};

type AppStep = 'home' | 'pickup' | 'seats' | 'payment' | 'ticket' | 'login' | 'agencyDashboard' | 'adminDashboard';

// Composant interne qui utilise l'authentification
const AppContent: React.FC = () => {
  const { isAuthenticated, user, loading } = useAuth();
  const [theme, toggleTheme] = useTheme();
  const [step, setStep] = useState<AppStep>('home');
  const [selectedPoint, setSelectedPoint] = useState<PickupPoint | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<SeatData[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [passengerInfo, setPassengerInfo] = useState<PassengerInfo | null>(null);

  // Redirection automatique après connexion selon le rôle
  useEffect(() => {
    if (!loading && isAuthenticated && user) {
      if (user.role === 'admin') {
        setStep('adminDashboard');
      } else if (user.role === 'agence') {
        setStep('agencyDashboard');
      }
    } else if (!loading && !isAuthenticated && (step === 'agencyDashboard' || step === 'adminDashboard')) {
      // Si déconnecté et sur un dashboard, rediriger vers login
      setStep('login');
    }
  }, [isAuthenticated, user, loading, step]);

  const handleStartBooking = () => {
    setStep('pickup');
  };
  
  const handleOpenDashboard = () => {
    if (isAuthenticated && user?.role === 'agence') {
      setStep('agencyDashboard');
    } else {
      setStep('login');
    }
  };
  
  const handleOpenAdminDashboard = () => {
    if (isAuthenticated && user?.role === 'admin') {
      setStep('adminDashboard');
    } else {
      setStep('login');
    }
  };

  const handleLoginSuccess = () => {
    // La redirection sera gérée par useEffect
  };

  const handlePickupContinue = (point: PickupPoint) => {
    setSelectedPoint(point);
    setStep('seats');
  };
  
  const handleBackToPickup = () => {
    setSelectedPoint(null);
    setStep('pickup');
  };

  const handleSeatContinue = (seats: SeatData[], price: number) => {
    setSelectedSeats(seats);
    setTotalPrice(price);
    setStep('payment');
  };

  const handleBackToSeats = () => {
    setStep('seats');
  };

  const handlePaymentConfirm = (info: PassengerInfo) => {
    setPassengerInfo(info);
    setStep('ticket');
  };

  const handleNewBooking = () => {
    setStep('home');
    setSelectedPoint(null);
    setSelectedSeats([]);
    setTotalPrice(0);
    setPassengerInfo(null);
  };
  
  const handleBackToHome = () => {
    setStep('home');
  };

  const handleLogout = () => {
    setStep('home');
  };

  const renderStep = () => {
    switch (step) {
      case 'login':
        return (
          <Login onLoginSuccess={handleLoginSuccess} />
        );
      case 'home':
        return (
          <HomePage
            theme={theme}
            toggleTheme={toggleTheme}
            onStartBooking={handleStartBooking}
            onOpenDashboard={handleOpenDashboard}
            onOpenAdminDashboard={handleOpenAdminDashboard}
          />
        );
      case 'pickup':
        return (
          <div className="min-h-screen w-full flex items-center justify-center font-sans p-4">
            <PickupPointSelector 
              trip={mockTrip} 
              theme={theme} 
              toggleTheme={toggleTheme}
              onContinue={handlePickupContinue}
            />
          </div>
        );
      case 'seats':
        if (selectedPoint) {
          return (
             <div className="min-h-screen w-full flex items-center justify-center font-sans p-4">
              <SeatSelection
                trip={mockTrip}
                selectedPoint={selectedPoint}
                onBack={handleBackToPickup}
                onContinue={handleSeatContinue}
                theme={theme}
                toggleTheme={toggleTheme}
              />
            </div>
          );
        }
        return null;
      case 'payment':
        if (selectedPoint) {
          return (
            <div className="min-h-screen w-full flex items-center justify-center font-sans p-4">
              <Payment
                trip={mockTrip}
                selectedPoint={selectedPoint}
                selectedSeats={selectedSeats}
                totalPrice={totalPrice}
                onBack={handleBackToSeats}
                onConfirm={handlePaymentConfirm}
                theme={theme}
                toggleTheme={toggleTheme}
              />
            </div>
          );
        }
        return null;
      case 'ticket':
        if (selectedPoint && passengerInfo) {
          return (
            <div className="min-h-screen w-full flex items-center justify-center font-sans p-4">
              <Ticket
                trip={mockTrip}
                selectedPoint={selectedPoint}
                selectedSeats={selectedSeats}
                passengerInfo={passengerInfo}
                onNewBooking={handleNewBooking}
              />
            </div>
          );
        }
        return null;
      case 'agencyDashboard':
        return (
          <ProtectedRoute requiredRole="agence">
            <AgencyDashboard 
              initialPoints={mockTrip.points}
              initialTrips={mockTrip.trajets}
              initialBuses={mockTrip.buses}
              onBackToHome={handleBackToHome} 
              theme={theme}
              toggleTheme={toggleTheme}
            />
          </ProtectedRoute>
        );
      case 'adminDashboard':
        return (
          <ProtectedRoute requiredRole="admin">
            <GlobalAdminDashboard
              initialAgences={mockTrip.agences}
              onBackToHome={handleBackToHome}
              theme={theme}
              toggleTheme={toggleTheme}
            />
          </ProtectedRoute>
        );
      default:
        return <HomePage theme={theme} toggleTheme={toggleTheme} onStartBooking={handleStartBooking} onOpenDashboard={handleOpenDashboard} onOpenAdminDashboard={handleOpenAdminDashboard} />;
    }
  }

  return (
    <>
      {renderStep()}
    </>
  );
};

// Composant principal avec AuthProvider
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
