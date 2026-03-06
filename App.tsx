import React, { useEffect } from 'react';
import Hero from './components/Hero';
import SecondSection from './components/SecondSection';
import Footer from './components/Footer';
import { motion, useScroll, useTransform } from 'framer-motion';

const App: React.FC = () => {
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  const { scrollY } = useScroll();
  const scrollHintOpacity = useTransform(scrollY, [0, 90], [1, 0]);
  const scrollHintScale = useTransform(scrollY, [0, 120], [1, 0.96]);

  return (
    <div className="min-h-screen w-full overflow-clip bg-background selection:bg-black selection:text-white">
      <main className="max-w-[1600px] mx-auto">
        <Hero />
      </main>

      {/* Bottom-centered shimmer scroll hint, fades as user scrolls */}
      <motion.div
        style={{ opacity: scrollHintOpacity, scale: scrollHintScale }}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2, ease: 'easeOut' }}
        className="pointer-events-none fixed bottom-6 inset-x-0 z-40 flex justify-center"
      >
        <div className="rounded-full bg-white/10 backdrop-blur-xl px-6 py-2 shadow-2xl border border-white/25 text-center">
          <motion.span
            animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="block font-sans text-xs md:text-sm tracking-[0.18em] uppercase text-transparent bg-clip-text"
            style={{
              backgroundImage:
                'linear-gradient(120deg, #ff4fd8, #ff9f1c, #ffe66d, #4ef2c2, #6ea8ff, #b37dff, #ff4fd8)',
              backgroundSize: '220% 220%',
            }}
          >
              Scroll for more story
          </motion.span>
        </div>
      </motion.div>

      <SecondSection />

      <main className="max-w-[1600px] mx-auto">
        <div className="w-full flex justify-center py-40">
             <motion.p 
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 0.5 }}
               viewport={{ once: true }}
               animate={{ opacity: [0.2, 0.5, 0.2] }}
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
               className="font-serif italic text-2xl text-text-muted text-center"
             >
               With the learning from Luna Park and the rise of AI, we built Quinn...
             </motion.p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;