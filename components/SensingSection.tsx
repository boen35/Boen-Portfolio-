import React from 'react';
import { motion } from 'framer-motion';

const SensingSection: React.FC = () => {
  return (
    <section className="relative w-full pb-24">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative">

        {/* Top Left Image - Abstract Sphere */}
        <div className="col-span-1 md:col-span-5 relative z-10 md:pl-12">
           <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="overflow-hidden rounded-2xl md:rounded-3xl shadow-sm bg-white p-8 md:p-12 aspect-square flex items-center justify-center"
          >
            {/* Using an abstract minimal 3D shape if possible, or an image */}
            <div className="w-full h-full relative">
                <img 
                  src="https://picsum.photos/seed/sphere3d/600/600" 
                  alt="Abstract Sphere" 
                  className="w-full h-full object-contain grayscale hover:scale-105 transition-transform duration-700 ease-out mix-blend-multiply"
                />
            </div>
          </motion.div>
        </div>

        {/* Top Right Text Block */}
        <div className="col-span-1 md:col-span-5 md:col-start-7 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-[#F2F2F0] p-8 md:p-10 rounded-2xl"
          >
             <h3 className="font-serif italic text-xl mb-3">Sensing Interfaces,</h3>
            <p className="font-sans text-sm md:text-base text-text-muted leading-relaxed">
              what does it mean to connect through touch with something that is not present in the physical world? We investigate how feedback from digital systems can broaden the definition of tactile and bring more natural unpredictability into the virtual.
            </p>
          </motion.div>
        </div>

        {/* Bottom Left Image - Hand Interaction */}
        <div className="col-span-1 md:col-span-4 md:mt-[-50px] relative z-20">
           <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="overflow-hidden rounded-2xl md:rounded-3xl shadow-xl"
          >
            <img 
              src="https://picsum.photos/seed/darkhand/600/400" 
              alt="Hand Interface Interaction" 
              className="w-full h-auto object-cover aspect-[3/2] hover:scale-105 transition-transform duration-700 ease-out"
            />
          </motion.div>
        </div>

        {/* Bottom Right Image - White Geometric Shapes */}
        <div className="col-span-1 md:col-span-7 md:col-start-6 md:mt-24 relative z-10 md:-ml-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="overflow-hidden rounded-2xl md:rounded-3xl shadow-lg"
          >
            <img 
              src="https://picsum.photos/seed/minimalarch/1000/700" 
              alt="Minimal Geometric Forms" 
              className="w-full h-auto object-cover aspect-[16/10] hover:scale-105 transition-transform duration-700 ease-out"
            />
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default SensingSection;