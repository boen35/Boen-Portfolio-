import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const SecondSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const videoOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div ref={containerRef} className="relative w-full h-[300vh]">
      <motion.div 
        style={{ opacity: videoOpacity }} 
        className="sticky top-0 w-full h-screen overflow-hidden bg-black"
      >
        <video
          src="/assets/intro video.mp4"
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>
      <div className="relative z-10 w-full -mt-[100vh]">
        <div className="h-screen w-full flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-white text-3xl md:text-5xl font-serif text-center max-w-4xl px-4 drop-shadow-lg leading-relaxed mix-blend-difference"
          >
            During the 2025 COVID lockdown, I joined a team to build an immersive virtual playground to help people connect and share moments of joy.
          </motion.div>
        </div>
        <div className="h-screen w-full flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-white text-3xl md:text-5xl font-serif text-center max-w-4xl px-4 drop-shadow-lg leading-relaxed mix-blend-difference"
          >
            A space where distance didn't mean disconnection.
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SecondSection;
