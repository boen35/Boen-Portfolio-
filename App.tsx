import React from 'react';
import Hero from './components/Hero';
import Footer from './components/Footer';
import { motion } from 'framer-motion';

const App: React.FC = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-background selection:bg-black selection:text-white">
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
        <Hero />
        <div className="w-full flex justify-center py-20">
             <motion.p 
               animate={{ opacity: [0.3, 1, 0.3] }}
               transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
               className="font-serif italic text-xl text-text-muted"
             >
                more details about Luna Park and Quinn coming soon...
             </motion.p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;