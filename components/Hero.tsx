import React, { useRef, useEffect, useState } from 'react';
import { motion, useSpring, useTransform, AnimatePresence, Variants } from 'framer-motion';

const cards = [
  {
    type: 'image',
    src: 'assets/CNN cover.webp',
    alt: 'CNN Money Design',
    rotation: -2,
    className: 'lg:mt-0',
    logo: 'assets/cnn logo.png',
    description: "I helped build the CNN website as part of the Product Design team in New York City."
  },
  {
    type: 'image',
    src: 'assets/OKC cover.jpg',
    alt: 'OKCupid Case Study',
    rotation: 3,
    className: 'lg:mt-8',
    logo: 'assets/OkCupid_logo.png',
    description: "As part of the OkCupid product team under Match Group, we revitalized the branding of this iconic dating app."
  },
  {
    type: 'video',
    src: 'assets/Luna Park Header card.mp4',
    alt: 'Luna Park 3D Character Loop',
    rotation: -3,
    className: 'lg:-mt-6',
    logo: 'assets/Luna Park logo.png',
    description: "I joined a startup as Product Design Director to build an immersive virtual social gaming platform."
  },
  {
    type: 'video',
    src: 'assets/Quinn header card.mp4', 
    alt: 'Quinn App Interface',
    rotation: 2,
    className: 'lg:mt-4',
    logo: 'assets/Quinn logo.png',
    description: "Leveraging our success with Luna Park, our team built an AI platform focused on employee training."
  }
];

const HERO_TYPE_SPEED = 0.006; 

const TypewriterText = ({ text }: { text: string }) => {
  const words = text.split(" ");
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.012 } }
  };
  const child: Variants = {
    hidden: { opacity: 0, y: 5 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: "easeOut" } }
  };

  return (
    <motion.div variants={container} initial="hidden" animate="visible" className="inline-flex flex-wrap">
      {words.map((word, index) => (
        <span key={index} className="mr-1 whitespace-nowrap">
          {word.split("").map((char, charIndex) => (
            <motion.span key={charIndex} variants={child} className="inline-block">{char}</motion.span>
          ))}
        </span>
      ))}
    </motion.div>
  );
};

const HeroTypewriter = ({ segments, delayStart = 0 }: { segments: { text: string; highlight?: boolean }[], delayStart: number }) => {
    let currentDelay = delayStart;
    return (
        <span className="inline text-[1.4rem] md:text-[1.6rem] leading-relaxed tracking-wide text-text-muted">
            {segments.map((segment, i) => {
                const segmentLength = segment.text.length;
                const segmentDuration = segmentLength * HERO_TYPE_SPEED;
                const startDelay = currentDelay;
                currentDelay += segmentDuration;
                return (
                    <motion.span 
                        key={i} 
                        className={segment.highlight ? "font-serif italic text-text px-1.5 py-0.5 rounded mx-0.5" : ""}
                        style={segment.highlight ? { backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.06), rgba(0, 0, 0, 0.06))", backgroundRepeat: "no-repeat", backgroundPosition: "left center" } : {}}
                        initial={segment.highlight ? { backgroundSize: "0% 100%" } : {}}
                        animate={segment.highlight ? { backgroundSize: "100% 100%" } : {}}
                        transition={segment.highlight ? { duration: 0.5, delay: startDelay + segmentDuration, ease: "easeOut" } : {}}
                    >
                        {segment.text.split("").map((char, ci) => (
                            <motion.span key={ci} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0, delay: startDelay + (ci * HERO_TYPE_SPEED) }}>
                                {char}
                            </motion.span>
                        ))}
                    </motion.span>
                );
            })}
        </span>
    );
};

interface CardProps {
  card: typeof cards[0];
  index: number;
  isDimmed: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const Card: React.FC<CardProps> = ({ card, index, isDimmed, onMouseEnter, onMouseLeave }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(0, { stiffness: 150, damping: 20 });
  const rotateY = useSpring(0, { stiffness: 150, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) / (window.innerWidth / 2);
      const deltaY = (e.clientY - centerY) / (window.innerHeight / 2);
      rotateY.set(deltaX * 15);
      rotateX.set(deltaY * -15);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
        ref={containerRef}
        className={`relative aspect-[4/3] cursor-pointer ${card.className} perspective-2000`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        initial={{ opacity: 0, y: 50, rotate: card.rotation }}
        animate={{ 
            opacity: isDimmed ? 0.35 : 1, 
            y: 0,
            rotate: card.rotation,
            scale: isDimmed ? 0.98 : 1
        }}
        transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
    >
        <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 5 + index, ease: "easeInOut" }}
            className="w-full h-full rounded-[2.5rem] overflow-hidden shadow-2xl bg-gray-200"
        >
            {card.type === 'video' ? (
                <video src={card.src} className="w-full h-full object-cover" autoPlay loop muted playsInline />
            ) : (
                <img src={card.src} alt={card.alt} className="w-full h-full object-cover" />
            )}
        </motion.div>
    </motion.div>
  );
};

const Hero: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isProfileHovered, setIsProfileHovered] = useState(false);

  const paragraph1Segments = [
    { text: "In the years I’ve worked as a Product Designer, I’ve made it my mission to bring people closer together through a " },
    { text: "cutting-edge dating app", highlight: true },
    { text: ", an " },
    { text: "award-winning interactive news app", highlight: true },
    { text: ", and an interactive platform of " },
    { text: "immersive social games", highlight: true },
    { text: " for virtual team building." }
  ];

  const p1Duration = paragraph1Segments.reduce((acc, s) => acc + s.text.length, 0) * HERO_TYPE_SPEED;

  return (
    <section className="relative flex flex-col items-center justify-between min-h-screen py-16 text-center w-full max-w-7xl mx-auto">
      <div className="flex flex-col items-center justify-center mt-8 w-full px-6">
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }} 
          className="font-sans font-semibold text-lg mb-10 tracking-tight"
        >
          Boen Jiang
        </motion.div>
        
        <div className="font-serif font-light text-center leading-relaxed max-w-4xl">
            <HeroTypewriter segments={paragraph1Segments} delayStart={0.8} />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 + p1Duration, duration: 1 }}
          className="mt-14 w-20 h-20 cursor-pointer relative"
          onMouseEnter={() => setIsProfileHovered(true)}
          onMouseLeave={() => setIsProfileHovered(false)}
        >
             <img 
                src="assets/B.gif"
                alt="Profile Animation"
                className={`w-full h-full object-cover rounded-full absolute inset-0 transition-opacity duration-500 ${isProfileHovered ? 'opacity-0' : 'opacity-100'}`}
             />
             <img 
                src="assets/B profile.png"
                alt="Profile Static"
                className={`w-full h-full object-cover rounded-full absolute inset-0 transition-opacity duration-500 ${isProfileHovered ? 'opacity-100' : 'opacity-0'}`}
             />
        </motion.div>
      </div>

      <div className="w-full mt-24">
        {/* Info Display Area */}
        <div className="w-full px-10 h-32 mb-10 relative flex items-center justify-start pointer-events-none">
          <AnimatePresence mode="wait">
            {hoveredIndex !== null && (
              <motion.div 
                key={hoveredIndex} 
                initial={{ opacity: 0, x: -10 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: 10 }} 
                className="flex items-center text-left"
              >
                {cards[hoveredIndex].logo && (
                  <motion.img 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    src={cards[hoveredIndex].logo} 
                    alt="logo" 
                    className="h-14 mr-8 object-contain" 
                  />
                )}
                <div className="font-sans text-lg text-text leading-snug max-w-3xl font-medium">
                  <TypewriterText text={cards[hoveredIndex].description} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
          {cards.map((card, index) => (
            <Card 
              key={index} 
              card={card} 
              index={index} 
              isDimmed={hoveredIndex !== null && hoveredIndex !== index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;