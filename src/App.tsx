import React, { useState } from 'react';
import PickupPointSelector from './components/PickupPointSelector';
import SeatSelection from './components/SeatSelection';
import Payment from './components/Payment';
import { Trip, PickupPoint, SeatData } from './types';
import { useTheme } from './hooks/useTheme';

const mockTrip: Trip = {
  agency: 'TransCongo',
  origin: 'Brazzaville',
  destination: 'Dolisie',
  finalDepartureTime: '14:00',
  points: [
    { id: 'p2', nom: 'Makélékélé', horaire_passage: '13:30', places_dispo: 8, coordinates: [-4.28, 15.25] },
    { id: 'p3', nom: 'Talangaï', horaire_passage: '14:00', places_dispo: 12, coordinates: [-4.23, 15.30] },
    { id: 'p1', nom: 'Mfilou', horaire_passage: '13:15', places_dispo: 3, coordinates: [-4.30, 15.23] },
    { id: 'p4', nom: 'Arrêt Marché', horaire_passage: '13:45', places_dispo: 0, coordinates: [-4.26, 15.27] },
  ],
};

type AppStep = 'pickup' | 'seats' | 'payment';

function App() {
  const [theme, toggleTheme] = useTheme();
  const [step, setStep] = useState<AppStep>('pickup');
  const [selectedPoint, setSelectedPoint] = useState<PickupPoint | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<SeatData[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

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

  return (
    <main className="min-h-screen w-full flex items-center justify-center font-sans p-4">
      {step === 'pickup' && (
        <PickupPointSelector 
          trip={mockTrip} 
          theme={theme} 
          toggleTheme={toggleTheme}
          onContinue={handlePickupContinue}
        />
      )}
      {step === 'seats' && selectedPoint && (
        <SeatSelection
          trip={mockTrip}
          selectedPoint={selectedPoint}
          onBack={handleBackToPickup}
          onContinue={handleSeatContinue}
          theme={theme}
          toggleTheme={toggleTheme}
        />
      )}
      {step === 'payment' && selectedPoint && (
        <Payment
          trip={mockTrip}
          selectedPoint={selectedPoint}
          selectedSeats={selectedSeats}
          totalPrice={totalPrice}
          onBack={handleBackToSeats}
          theme={theme}
          toggleTheme={toggleTheme}
        />
      )}
    </main>
  );
}

export default App;
