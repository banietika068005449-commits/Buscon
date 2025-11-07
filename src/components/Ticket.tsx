import React from 'react';
import { motion } from 'framer-motion';
import { Trip, PickupPoint, SeatData, PassengerInfo } from '../types';
import { CheckCircle, Download, Calendar, User, Armchair, MapPin, Clock, Phone } from 'lucide-react';
import QRCode from './QRCode';

interface TicketProps {
  trip: Trip;
  selectedPoint: PickupPoint;
  selectedSeats: SeatData[];
  passengerInfo: PassengerInfo;
  onNewBooking: () => void;
}

const Ticket: React.FC<TicketProps> = ({ trip, selectedPoint, selectedSeats, passengerInfo, onNewBooking }) => {
  return (
    <motion.div
      className="w-full max-w-lg mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="text-center mb-8">
        <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-800 dark:text-white sm:text-4xl">Réservation confirmée !</h1>
        <p className="mt-2 text-base text-slate-600 dark:text-slate-400">Votre e-ticket est prêt. Bon voyage !</p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl shadow-slate-200/60 dark:shadow-black/30 overflow-hidden">
        <div className="p-6 bg-slate-900 dark:bg-black text-center">
            <h2 className="text-2xl font-bold text-white tracking-wider">BUSCONGO E-TICKET</h2>
        </div>
        
        <div className="p-6 space-y-6">
            {/* Trip Info */}
            <div className="text-center">
                <p className="text-slate-500 dark:text-slate-400">Trajet</p>
                <p className="text-xl font-bold text-slate-800 dark:text-slate-100">{trip.origin} → {trip.destination}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-start gap-3">
                    <Calendar size={18} className="text-slate-400 mt-0.5" />
                    <div>
                        <p className="text-slate-500 dark:text-slate-400">Date</p>
                        <p className="font-semibold text-slate-700 dark:text-slate-200">05/11/2025</p>
                    </div>
                </div>
                 <div className="flex items-start gap-3">
                    <Armchair size={18} className="text-slate-400 mt-0.5" />
                    <div>
                        <p className="text-slate-500 dark:text-slate-400">Siège(s)</p>
                        <p className="font-semibold text-slate-700 dark:text-slate-200">{selectedSeats.map(s => s.number).join(', ')}</p>
                    </div>
                </div>
                 <div className="flex items-start gap-3 col-span-2">
                    <User size={18} className="text-slate-400 mt-0.5" />
                    <div>
                        <p className="text-slate-500 dark:text-slate-400">Passager</p>
                        <p className="font-semibold text-slate-700 dark:text-slate-200">{passengerInfo.fullName}</p>
                    </div>
                </div>
            </div>
            
            <hr className="border-slate-200 dark:border-slate-700" />

            {/* Pickup Point */}
            <div className="bg-sky-50 dark:bg-sky-900/50 p-4 rounded-lg">
                <h3 className="font-bold text-sky-800 dark:text-sky-200 mb-3 text-center">VOTRE POINT DE MONTÉE</h3>
                <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                        <MapPin size={18} className="text-sky-600 dark:text-sky-400 flex-shrink-0" />
                        <span className="font-semibold text-slate-700 dark:text-slate-200">{selectedPoint.nom} – {selectedPoint.adresse}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Clock size={18} className="text-sky-600 dark:text-sky-400 flex-shrink-0" />
                        <span className="font-semibold text-slate-700 dark:text-slate-200">Heure: <b className="text-lg">{selectedPoint.horaire_passage}</b></span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Phone size={18} className="text-sky-600 dark:text-sky-400 flex-shrink-0" />
                        <span className="font-semibold text-slate-700 dark:text-slate-200">Contact agence: {selectedPoint.contact}</span>
                    </div>
                </div>
            </div>

            {/* QR Code */}
            <div className="w-40 h-40 mx-auto mt-4">
                <QRCode />
            </div>
            <p className="text-xs text-center text-slate-500 dark:text-slate-400">Valable avec une pièce d’identité.</p>

        </div>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
        <button className="w-full sm:w-auto px-6 py-3 bg-sky-600 text-white font-semibold rounded-lg shadow-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-all duration-200 flex items-center justify-center gap-2">
            <Download size={18} />
            Télécharger le PDF
        </button>
        <button onClick={onNewBooking} className="w-full sm:w-auto px-6 py-3 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-all duration-200">
            Nouvelle réservation
        </button>
      </div>
    </motion.div>
  );
};

export default Ticket;
