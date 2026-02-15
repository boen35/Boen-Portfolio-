import React from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <section className="relative flex flex-col items-center justify-start py-0 text-center w-full mx-auto">
      <motion.div
         initial={{ opacity: 0, y: 10 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.6, ease: "easeOut" }}
         className="font-sans font-bold text-lg mb-2 text-text"
      >
        Boen Jiang
      </motion.div>
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="font-sans font-light text-sm sm:text-base leading-relaxed tracking-wide text-text-muted w-[60%] px-0"
      >
        In the years I’ve worked as a Product Designer, I’ve made it my mission to bring people closer together through a <span className="font-serif italic text-base sm:text-lg md:text-xl text-text">cutting-edge dating app</span>, an <span className="font-serif italic text-base sm:text-lg md:text-xl text-text">award-winning interactive news app</span>, and an interactive platform of <span className="font-serif italic text-base sm:text-lg md:text-xl text-text">immersive social games</span> for virtual team building.
        <br className="block my-2" />
        I have grown into a designer who seamlessly brings <span className="font-serif italic text-base sm:text-lg md:text-xl text-text">business</span> and <span className="font-serif italic text-base sm:text-lg md:text-xl text-text">design</span> together.
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="fixed bottom-12 right-8 z-50 flex flex-col items-center gap-2 mix-blend-difference text-text-muted md:text-text"
      >
        <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] font-sans uppercase tracking-[0.2em] vertical-rl hidden md:block" style={{ writingMode: 'vertical-rl' }}>Scroll</span>
            <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 opacity-70">
                <path d="M12 4V20M12 20L18 14M12 20L6 14" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;