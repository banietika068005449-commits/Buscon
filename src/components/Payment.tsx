import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Trip, PickupPoint, SeatData, PassengerInfo } from '../types';
import ThemeToggleButton from './ThemeToggleButton';
import { ArrowLeft, Bus, MapPin, Clock, Calendar, Armchair, User, Phone, Mail, Wallet } from 'lucide-react';

interface PaymentProps {
  trip: Trip;
  selectedPoint: PickupPoint;
  selectedSeats: SeatData[];
  totalPrice: number;
  onBack: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Payment: React.FC<PaymentProps> = ({ trip, selectedPoint, selectedSeats, totalPrice, onBack, theme, toggleTheme }) => {
  const [passengerInfo, setPassengerInfo] = useState<PassengerInfo>({ fullName: '', phoneNumber: '', email: '' });
  const [paymentMethod, setPaymentMethod] = useState<string>('');

  const serviceFee = 500;
  const finalTotal = totalPrice + serviceFee;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPassengerInfo(prev => ({ ...prev, [name]: value }));
  };

  const isFormValid = useMemo(() => {
    return passengerInfo.fullName.trim() !== '' && passengerInfo.phoneNumber.trim() !== '' && paymentMethod !== '';
  }, [passengerInfo, paymentMethod]);
  
  return (
    <motion.div
      className="w-full max-w-4xl mx-auto"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl shadow-slate-200/60 dark:shadow-black/30 overflow-hidden transition-colors duration-300">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <button onClick={onBack} className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                <ArrowLeft size={20} />
              </button>
              <div>
                <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">Paiement & Confirmation</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">Finalisez votre réservation</p>
              </div>
            </div>
            <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} />
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column: Forms */}
          <div className="space-y-8">
            {/* Passenger Info */}
            <section>
              <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-4">Vos informations</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Nom complet</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input type="text" id="fullName" name="fullName" value={passengerInfo.fullName} onChange={handleInputChange} className="w-full pl-10 pr-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-900 focus:ring-sky-500 focus:border-sky-500" placeholder="Ex: Marie Lounda" />
                  </div>
                </div>
                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Numéro de téléphone</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input type="tel" id="phoneNumber" name="phoneNumber" value={passengerInfo.phoneNumber} onChange={handleInputChange} className="w-full pl-10 pr-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-900 focus:ring-sky-500 focus:border-sky-500" placeholder="+242 06 123 4567" />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Adresse e-mail <span className="text-slate-400">(optionnel)</span></label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input type="email" id="email" name="email" value={passengerInfo.email} onChange={handleInputChange} className="w-full pl-10 pr-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-900 focus:ring-sky-500 focus:border-sky-500" placeholder="marie.lounda@email.com" />
                  </div>
                </div>
              </div>
            </section>
            
            {/* Payment Method */}
            <section>
              <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-4">Méthode de paiement</h2>
              <div className="space-y-3">
                {['Airtel Money', 'MTN MoMo'].map(method => (
                  <label key={method} className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-all ${paymentMethod === method ? 'bg-sky-50 dark:bg-sky-900/50 border-sky-500 ring-2 ring-sky-500' : 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700'}`}>
                    <input type="radio" name="paymentMethod" value={method} checked={paymentMethod === method} onChange={(e) => setPaymentMethod(e.target.value)} className="form-radio h-5 w-5 text-sky-600 focus:ring-sky-500 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900" />
                    <Wallet className="w-6 h-6 text-slate-500 dark:text-slate-400" />
                    <span className="font-semibold text-slate-700 dark:text-slate-200">{method}</span>
                  </label>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Summary */}
          <div className="bg-slate-50 dark:bg-slate-900/70 rounded-xl p-6 border border-slate-200 dark:border-slate-700 h-fit">
            <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-4">Résumé de la commande</h2>
            <div className="space-y-4 text-sm">
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                    <Bus size={18} className="text-slate-400" />
                    <span><b>{trip.origin} → {trip.destination}</b> via {trip.agency}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                    <Calendar size={18} className="text-slate-400" />
                    <span>Mardi 5 nov. 2025</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                    <MapPin size={18} className="text-slate-400" />
                    <span>Montée à <b>{selectedPoint.nom} ({selectedPoint.horaire_passage})</b></span>
                </div>
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                    <Armchair size={18} className="text-slate-400" />
                    <span>Siège(s): <b>{selectedSeats.map(s => s.number).join(', ')}</b></span>
                </div>
            </div>
            <hr className="my-6 border-slate-200 dark:border-slate-700" />
            <div className="space-y-2">
                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                    <span>{selectedSeats.length} siège(s) × {totalPrice / selectedSeats.length} XAF</span>
                    <span>{totalPrice.toLocaleString('fr-FR')} XAF</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                    <span>Frais de service</span>
                    <span>{serviceFee.toLocaleString('fr-FR')} XAF</span>
                </div>
                <div className="flex justify-between font-bold text-slate-800 dark:text-white text-lg mt-2">
                    <span>Total</span>
                    <span>{finalTotal.toLocaleString('fr-FR')} XAF</span>
                </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex justify-end transition-colors duration-300">
          <button
            disabled={!isFormValid}
            className="w-full sm:w-auto px-8 py-3 bg-sky-600 text-white font-semibold rounded-lg shadow-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed disabled:shadow-none transition-all duration-200"
          >
            Payer {finalTotal.toLocaleString('fr-FR')} XAF
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Payment;
