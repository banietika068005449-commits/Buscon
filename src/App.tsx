import React, { useState } from 'react';
import HomePage from './components/landing/HomePage';
import PickupPointSelector from './components/PickupPointSelector';
import SeatSelection from './components/SeatSelection';
import Payment from './components/Payment';
import Ticket from './components/Ticket';
import AgencyDashboard from './components/agency/AgencyDashboard';
import { Trip, PickupPoint, SeatData, PassengerInfo } from './types';
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
};

type AppStep = 'home' | 'pickup' | 'seats' | 'payment' | 'ticket' | 'agencyDashboard';

function App() {
  const [theme, toggleTheme] = useTheme();
  const [step, setStep] = useState<AppStep>('home');
  const [selectedPoint, setSelectedPoint] = useState<PickupPoint | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<SeatData[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [passengerInfo, setPassengerInfo] = useState<PassengerInfo | null>(null);

  const handleStartBooking = () => {
    setStep('pickup');
  };
  
  const handleOpenDashboard = () => {
    setStep('agencyDashboard');
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

  const renderStep = () => {
    switch (step) {
      case 'home':
        return (
          <HomePage
            theme={theme}
            toggleTheme={toggleTheme}
            onStartBooking={handleStartBooking}
            onOpenDashboard={handleOpenDashboard}
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
          <AgencyDashboard 
            points={mockTrip.points} 
            onBackToHome={handleNewBooking} 
            theme={theme}
            toggleTheme={toggleTheme}
          />
        );
      default:
        return <HomePage theme={theme} toggleTheme={toggleTheme} onStartBooking={handleStartBooking} onOpenDashboard={handleOpenDashboard} />;
    }
  }

  return (
    <>
      {renderStep()}
    </>
  );
}

export default App;
