import React from 'react';
import Hero from './components/Hero';
import Footer from './components/Footer';
import { motion } from 'framer-motion';

const App: React.FC = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-background selection:bg-black selection:text-white">
      <main className="max-w-[1600px] mx-auto">
        <Hero />
        
        <div className="w-full flex justify-center py-40">
             <motion.p 
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 0.5 }}
               viewport={{ once: true }}
               animate={{ opacity: [0.2, 0.5, 0.2] }}
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
               className="font-serif italic text-2xl text-text-muted text-center"
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