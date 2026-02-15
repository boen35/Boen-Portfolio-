import React from 'react';
import { motion } from 'framer-motion';

const OperatorSection: React.FC = () => {
  return (
    <section className="relative w-full">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-4 relative">
        
        {/* Left Image - Courtyard AR */}
        <div className="col-span-1 md:col-span-4 md:row-span-2 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8 }}
            className="overflow-hidden rounded-2xl md:rounded-3xl shadow-lg"
          >
            <img 
              src="https://picsum.photos/seed/courtyard/600/800" 
              alt="AR Interface in Courtyard" 
              className="w-full h-auto object-cover aspect-[3/4] hover:scale-105 transition-transform duration-700 ease-out"
            />
          </motion.div>
          
          {/* Description Text - Positioned below the left image on desktop */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-8 md:mt-12 bg-[#F2F2F0] p-6 md:p-8 rounded-2xl md:max-w-sm ml-0 md:ml-4"
          >
            <h3 className="font-serif italic text-xl mb-2">OPERATOR,</h3>
            <p className="font-sans text-sm md:text-base text-text-muted leading-relaxed">
              a spatial music production tool and our first app produced for Apple Vision Pro. Inspired by industrial design and architectural models, OPERATOR provides an intuitive experience of arranging blocks into musical sequences.
            </p>
          </motion.div>
        </div>

        {/* Center Image - VR Man */}
        <div className="col-span-1 md:col-span-5 md:col-start-4 md:mt-32 relative z-20 md:-ml-12 lg:-ml-24">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="overflow-hidden rounded-2xl md:rounded-3xl shadow-xl"
          >
            <img 
              src="https://picsum.photos/seed/vrheadset/800/500" 
              alt="Man using VR Headset" 
              className="w-full h-auto object-cover aspect-[16/10] hover:scale-105 transition-transform duration-700 ease-out"
            />
          </motion.div>
        </div>

        {/* Right Image - Music Interface */}
        <div className="col-span-1 md:col-span-5 md:col-start-8 md:mt-64 relative z-0 md:-ml-12">
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="overflow-hidden rounded-2xl md:rounded-3xl shadow-lg"
          >
            <img 
              src="https://picsum.photos/seed/musicui/700/900" 
              alt="Spatial Music Interface" 
              className="w-full h-auto object-cover aspect-[4/5] hover:scale-105 transition-transform duration-700 ease-out"
            />
          </motion.div>
        </div>
        
      </div>
    </section>
  );
};

export default OperatorSection;