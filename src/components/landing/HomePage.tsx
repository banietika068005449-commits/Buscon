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
}

const HomePage: React.FC<HomePageProps> = ({ theme, toggleTheme, onStartBooking, onOpenDashboard }) => {
  return (
    <div className="bg-white dark:bg-slate-900">
      <Header theme={theme} toggleTheme={toggleTheme} onOpenDashboard={onOpenDashboard} />
      <main>
        <Hero onStartBooking={onStartBooking} />
        <Features />
      </main>
      <Footer onOpenDashboard={onOpenDashboard} />
    </div>
  );
};

export default HomePage;
