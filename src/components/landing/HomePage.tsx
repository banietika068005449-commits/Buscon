import React from 'react';
import Header from './Header';
import Hero from './Hero';
import Features from './Features';
import Footer from './Footer';

interface HomePageProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  onStartBooking: () => void;
  onOpenDashboard: () => void;
  onOpenAdminDashboard: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ theme, toggleTheme, onStartBooking, onOpenDashboard, onOpenAdminDashboard }) => {
  return (
    <div className="bg-white dark:bg-slate-900">
      <Header theme={theme} toggleTheme={toggleTheme} onOpenDashboard={onOpenDashboard} />
      <main>
        <Hero onStartBooking={onStartBooking} />
        <Features />
      </main>
      <Footer onOpenDashboard={onOpenDashboard} onOpenAdminDashboard={onOpenAdminDashboard} />
    </div>
  );
};

export default HomePage;
