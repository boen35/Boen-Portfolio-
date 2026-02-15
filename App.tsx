import React from 'react';
import Hero from './components/Hero';
import OperatorSection from './components/OperatorSection';
import SensingSection from './components/SensingSection';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-background selection:bg-black selection:text-white">
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-24">
        <Hero />
        <div className="space-y-32 sm:space-y-64 mt-24 sm:mt-40">
          <OperatorSection />
          <SensingSection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;