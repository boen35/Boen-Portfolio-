import React, { useRef, useEffect, useState } from 'react';
import { motion, useSpring, useTransform, AnimatePresence, Variants } from 'framer-motion';

const cards = [
  {
    type: 'image',
    src: '/assets/CNN%20cover.webp',
    alt: 'CNN Money Design',
    rotation: -2,
    className: 'lg:mt-0',
    logo: '/assets/cnn%20logo.png',
    description: "I helped build the CNN website as part of the Product Design team in New York City."
  },
  {
    type: 'image',
    src: '/assets/OKC%20cover.jpg',
    alt: 'OKCupid Case Study',
    rotation: 3,
    className: 'lg:mt-8',
    logo: '/assets/OkCupid_logo.png',
    description: "As part of the OkCupid product team under Match Group, we revitalized the branding of this iconic dating app. We implemented new features to improve user experience and match rates, with my primary focus on monetization and paid features."
  },
  {
    type: 'video',
    src: '/assets/Luna%20Park%20Header%20card.mp4',
    alt: 'Luna Park 3D Character Loop',
    rotation: -3,
    className: 'lg:-mt-6',
    logo: '/assets/Luna%20Park%20logo.png',
    description: "During the 2020 lockdown, I joined a startup as Product Design Director to build something one-of-a-kind: an immersive virtual social gaming platform for millions unable to meet in person. From live-hosted game shows to a library of thousands of on-demand games, we built a platform loved by our customers."
  },
  {
    type: 'video',
    src: '/assets/Quinn%20header%20card.mp4', 
    alt: 'Quinn App Interface',
    rotation: 2,
    className: 'lg:mt-4',
    logo: '/assets/Quinn%20logo.png',
    description: "Leveraging our success with Luna Park, our team built an AI platform focused on employee training. From transforming SOPs into interactive courses to tracking results, Quinn has significantly boosted corporate training efficiency."
  }
];

const TypewriterText = ({ text }: { text: string }) => {
  const words = text.split(" ");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.008, delayChildren: 0 }
    }
  };

  const child: Variants = {
    hidden: { opacity: 0, y: 5 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.15, ease: "easeOut" } }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="inline-flex flex-wrap"
    >
      {words.map((word, index) => (
        <span key={index} className="mr-1 whitespace-nowrap">
          {word.split("").map((char, charIndex) => (
            <motion.span key={charIndex} variants={child} className="inline-block">
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.div>
  );
};

// Much faster speed for hero typewriter
const HERO_TYPE_SPEED = 0.002; 

// Component for the main hero text typewriter effect
const HeroTypewriter = ({ segments, delayStart = 0 }: { segments: { text: string; highlight?: boolean }[], delayStart: number }) => {
    let currentDelay = delayStart;

    return (
        <span className="inline text-[1.3rem] leading-relaxed tracking-wide text-text-muted">
            {segments.map((segment, i) => {
                const segmentLength = segment.text.length;
                const segmentDuration = segmentLength * HERO_TYPE_SPEED;
                const startDelay = currentDelay;
                currentDelay += segmentDuration;

                const isHighlight = segment.highlight;

                return (
                    <motion.span 
                        key={i} 
                        className={isHighlight ? "font-serif italic text-text px-1.5 py-0.5 rounded mx-0.5 box-decoration-clone" : ""}
                        style={isHighlight ? {
                            backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0.08))",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "left center",
                        } : {}}
                        initial={isHighlight ? { backgroundSize: "0% 100%" } : {}}
                        animate={isHighlight ? { backgroundSize: "100% 100%" } : {}}
                        transition={isHighlight ? { 
                            duration: 0.4, 
                            delay: startDelay + segmentDuration, // Animate background AFTER text is typed
                            ease: "easeOut" 
                        } : {}}
                    >
                        {segment.text.split("").map((char, ci) => (
                            <motion.span
                                key={ci}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0, delay: startDelay + (ci * HERO_TYPE_SPEED) }}
                            >
                                {char}
                            </motion.span>
                        ))}
                    </motion.span>
                );
            })}
        </span>
    );
};

interface FloatingHeaderProps {
    isVisible: boolean;
}

const FloatingHeader: React.FC<FloatingHeaderProps> = ({ isVisible }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: -100, x: "-50%", opacity: 0 }}
                    animate={{ y: 0, x: "-50%", opacity: 1 }}
                    exit={{ y: -100, x: "-50%", opacity: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="fixed top-6 left-1/2 z-50 flex items-center gap-3 pl-2 pr-5 py-2 bg-white/15 backdrop-blur-xl rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
                >
                    <div 
                        className="relative w-10 h-10 rounded-full overflow-hidden cursor-pointer"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                         <img 
                            src="/assets/B.gif" 
                            alt="Profile"
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
                         />
                         <img 
                            src="/assets/B%20profile.png" 
                            alt="Profile"
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                         />
                    </div>
                    <span className="font-sans font-medium text-sm text-text">Boen Jiang</span>
                </motion.div>
            )}
        </AnimatePresence>
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

  // Springs for smooth rotation - Increased stiffness for faster tracking
  const rotateX = useSpring(0, { stiffness: 250, damping: 20 });
  const rotateY = useSpring(0, { stiffness: 250, damping: 20 });

  // Map sheen opacity to rotation to create dynamic lighting effect
  const sheenOpacity = useTransform(rotateY, [-20, 20], [0.4, 0]); 

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      // Calculate center of the card
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate distance from center
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      // Max rotation (degrees) at full screen edge distance
      const maxRotation = 20; // Reduced to be more subtle
      
      // Calculate rotation based on normalized distance
      // Using window dimensions as the denominator ensures smooth scaling
      
      // Inverted Y rotation as requested (positive deltaX -> positive rotateY)
      // This makes the card tilt 'towards' the mouse on the x-axis rather than 'looking at' it
      const rY = (deltaX / window.innerWidth) * maxRotation; 
      
      // Keep X rotation standard (looks at cursor vertically)
      const rX = (deltaY / window.innerHeight) * maxRotation * -1;

      rotateX.set(rX);
      rotateY.set(rY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [rotateX, rotateY]);

  return (
    <motion.div
        ref={containerRef}
        className={`relative w-full aspect-[4/3] [perspective:1000px] ${card.className} cursor-pointer`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        initial={{ opacity: 0, rotateY: 90, y: 50, rotateZ: card.rotation }}
        animate={{ 
            opacity: isDimmed ? 0.4 : 1, 
            rotateY: 0,
            y: 0,
            rotateZ: card.rotation
        }}
        transition={{
            opacity: { duration: 0.4, ease: "easeInOut" }, // Faster transition for hover effect
            rotateY: { duration: 0.8, delay: 0.4 + index * 0.15, ease: "easeOut" },
            y: { duration: 0.8, delay: 0.4 + index * 0.15, ease: "easeOut" },
            rotateZ: { duration: 0 } // No transition for static rotation
        }}
    >
        <motion.div
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            animate={{ y: [0, -5, 0] }} // Floating animation reduced to 5px
            transition={{
                y: {
                    repeat: Infinity,
                    duration: 6,
                    ease: "easeInOut",
                    delay: 1.2 + index * 0.15 // Start floating after entrance
                }
            }}
            className="w-full h-full rounded-[3rem] overflow-hidden shadow-2xl bg-gray-200"
        >
            <div className="w-full h-full absolute inset-0 [transform:translateZ(0px)]">
               {card.type === 'video' ? (
                <video
                    src={card.src}
                    className="w-full h-full object-cover pointer-events-none block"
                    autoPlay
                    loop
                    muted
                    playsInline
                />
                ) : (
                <img
                    src={card.src}
                    alt={card.alt}
                    className="w-full h-full object-cover block"
                />
                )}
            </div>
             <motion.div 
                style={{
                    opacity: sheenOpacity,
                    background: "linear-gradient(to right, rgba(255,255,255,0.4), transparent)"
                }}
                className="absolute inset-0 pointer-events-none mix-blend-overlay z-10"
             />
        </motion.div>
    </motion.div>
  );
};

const Hero: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isProfileHovered, setIsProfileHovered] = useState(false);
  const [showFloatingHeader, setShowFloatingHeader] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (profileRef.current) {
        const rect = profileRef.current.getBoundingClientRect();
        // Show floating header when main profile picture scrolls out of view (top < 0 or bottom < 0)
        // Let's use bottom < 0 so it appears smoothly as the main one disappears
        setShowFloatingHeader(rect.bottom < 0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const paragraph1Segments = [
    { text: "In the years I’ve worked as a Product Designer, I’ve made it my mission to bring people closer together through a " },
    { text: "cutting-edge dating app", highlight: true },
    { text: ", an " },
    { text: "award-winning interactive news app", highlight: true },
    { text: ", and an interactive platform of " },
    { text: "immersive social games", highlight: true },
    { text: " for virtual team building." }
  ];

  const paragraph2Segments = [
    { text: "I have grown into a designer who seamlessly brings " },
    { text: "business", highlight: true },
    { text: " and " },
    { text: "design", highlight: true },
    { text: " together." }
  ];

  // Calculate roughly when p2 should start based on p1 length
  const p1Length = paragraph1Segments.reduce((acc, seg) => acc + seg.text.length, 0);
  const p1Duration = p1Length * HERO_TYPE_SPEED + 0.5; // duration + offset

  return (
    <section className="relative flex flex-col items-center justify-between min-h-[90vh] sm:min-h-screen py-12 text-center w-full mx-auto">
      
      <FloatingHeader isVisible={showFloatingHeader} />

      <div className="flex flex-col items-center justify-center mt-8 sm:mt-16 w-full">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="font-sans font-bold text-[1.3rem] mb-6 text-text"
        >
          Boen Jiang
        </motion.div>
        
        <div className="font-serif font-light w-[85%] md:w-[70%] lg:w-[60%] px-0 text-center">
            <div className="mb-4">
                <HeroTypewriter segments={paragraph1Segments} delayStart={0.6} />
            </div>
            <div>
                <HeroTypewriter segments={paragraph2Segments} delayStart={0.6 + p1Duration} />
            </div>
        </div>

        <motion.div
          ref={profileRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-10 mb-2 w-[60px] h-[60px] cursor-pointer relative"
          onMouseEnter={() => setIsProfileHovered(true)}
          onMouseLeave={() => setIsProfileHovered(false)}
        >
             <img 
                src="/assets/B.gif"
                alt="Profile Animation"
                className={`w-full h-full object-contain absolute inset-0 transition-opacity duration-300 ${isProfileHovered ? 'opacity-0' : 'opacity-100'}`}
             />
             <img 
                src="/assets/B%20profile.png"
                alt="Profile Static"
                className={`w-full h-full object-contain absolute inset-0 transition-opacity duration-300 ${isProfileHovered ? 'opacity-100' : 'opacity-0'}`}
             />
        </motion.div>
      </div>

      <div className="w-full flex flex-col items-center justify-end mb-12">
        {/* Info Display Area */}
        <div className="w-full max-w-6xl px-4 md:px-8 min-h-[140px] mb-8 relative flex items-center justify-start pointer-events-none z-20">
          <AnimatePresence mode="wait">
            {hoveredIndex !== null && (
              <motion.div
                key={hoveredIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex flex-row items-center text-left w-full"
              >
                {cards[hoveredIndex].logo && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="flex-shrink-0 mr-8"
                  >
                    <img 
                      src={cards[hoveredIndex].logo} 
                      alt={`${cards[hoveredIndex].alt} logo`}
                      className="h-12 md:h-16 w-auto object-contain"
                    />
                  </motion.div>
                )}
                <div className="font-sans text-sm md:text-base text-text leading-relaxed max-w-4xl">
                  <TypewriterText text={cards[hoveredIndex].description} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full px-4 [perspective:2000px]">
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

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="fixed bottom-12 right-8 z-50 flex flex-col items-center gap-2"
      >
        <div className="flex flex-col items-center gap-2">
            <motion.span 
              animate={{ color: ["#FF4500", "#8ACE00", "#87CEEB", "#FF69B4", "#FF4500"] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="text-[10px] font-sans uppercase tracking-[0.2em] vertical-rl hidden md:block" 
              style={{ writingMode: 'vertical-rl' }}
            >
              Scroll
            </motion.span>
            <motion.div
            animate={{ y: [0, 8, 0], color: ["#FF4500", "#8ACE00", "#87CEEB", "#FF69B4", "#FF4500"] }}
            transition={{ 
              y: { repeat: Infinity, duration: 2, ease: "easeInOut" },
              color: { duration: 8, repeat: Infinity, ease: "linear" }
            }}
            >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
                <path d="M12 4V20M12 20L18 14M12 20L6 14" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;