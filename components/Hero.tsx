import React, { useRef, useEffect, useState } from 'react';
import { motion, useSpring, AnimatePresence, Variants } from 'framer-motion';

const cards = [
  {
    type: 'image',
    src: '/assets/cnn-cover.webp',
    alt: 'CNN Money Design',
    rotation: -2,
    className: 'lg:mt-0',
    logo: '/assets/cnn-logo.png',
    description: "As a member of the Product Design team in New York, I helped shape the CNN Money experience — designing clear, fast interfaces for millions of readers."
  },
  {
    type: 'image',
    src: '/assets/okc-cover.jpg',
    alt: 'OKCupid Case Study',
    rotation: 3,
    className: 'lg:mt-8',
    logo: '/assets/okcupid-logo.png',
    description: "At OkCupid (Match Group) I helped refresh the product and brand, and led work on monetization and premium features to increase engagement and revenue."
  },
  {
    type: 'video',
    src: '/assets/luna-park-header-card.mp4',
    alt: 'Luna Park 3D Character Loop',
    rotation: -3,
    className: 'lg:-mt-6',
    logo: '/assets/luna-park-logo.png',
    description: "As Product Design Director at Luna Park, I led design for an immersive social gaming platform — live hosted game shows and hundreds of on‑demand games that connected people and brought moments of joy during COVID."
  },
  {
    type: 'video',
    src: '/assets/quinn-header-card.mp4',
    alt: 'Quinn App Interface',
    rotation: 2,
    className: 'lg:mt-4',
    logo: '/assets/quinn-logo.png',
    description: "We built Quinn — an AI-powered platform that turns SOPs into interactive courses and helps organizations track employee skills and training outcomes. We're continuing to grow the product and its impact."
  }
];

const HERO_TYPE_SPEED = 0.006;

const TypewriterText = ({ text }: { text: string }) => {
  const words = text.split(' ');
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.012 } },
  };
  const child: Variants = {
    hidden: { opacity: 0, y: 5 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' } },
  };

  return (
    <motion.div variants={container} initial="hidden" animate="visible" className="inline-flex flex-wrap">
      {words.map((word, index) => (
        <span key={index} className="mr-1 whitespace-nowrap">
          {word.split('').map((char, charIndex) => (
            <motion.span key={charIndex} variants={child} className="inline-block">
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.div>
  );
};

const HeroTypewriter = ({ segments, delayStart = 0 }: { segments: { text: string; highlight?: boolean }[]; delayStart?: number }) => {
  let currentDelay = delayStart ?? 0;
  return (
    <span className="inline text-[14px] md:text-[20px] leading-relaxed tracking-wide text-text-muted">
      {segments.map((segment, i) => {
        const segmentLength = segment.text.length;
        const segmentDuration = segmentLength * HERO_TYPE_SPEED;
        const startDelay = currentDelay;
        currentDelay += segmentDuration;
        return (
          <motion.span
            key={i}
            className={segment.highlight ? 'font-serif italic text-text px-1.5 py-0.5 rounded mx-0.5' : ''}
            style={
              segment.highlight
                ? { backgroundImage: 'linear-gradient(rgba(0,0,0,0.06), rgba(0,0,0,0.06))', backgroundRepeat: 'no-repeat', backgroundPosition: 'left center' }
                : {}
            }
            initial={segment.highlight ? { backgroundSize: '0% 100%' } : {}}
            animate={segment.highlight ? { backgroundSize: '100% 100%' } : {}}
            transition={segment.highlight ? { duration: 0.5, delay: startDelay + segmentDuration, ease: 'easeOut' } : {}}
          >
            {segment.text.split('').map((char, ci) => (
              <motion.span key={ci} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0, delay: startDelay + ci * HERO_TYPE_SPEED }}>
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
  draggable?: boolean;
  onDragEnd?: (event: any, info: any) => void;
  style?: React.CSSProperties;
  isTop?: boolean;
  tilt?: { x: number; y: number } | null;
}

const Card: React.FC<CardProps> = ({ card, index, isDimmed, onMouseEnter, onMouseLeave, draggable, onDragEnd, style, isTop, tilt }) => {
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

  // apply device tilt when provided (mobile)
  useEffect(() => {
    if (!tilt || !isTop) return;
    rotateX.set(tilt.x);
    rotateY.set(tilt.y);
  }, [tilt, isTop]);

  return (
    <motion.div
      ref={containerRef}
      style={style}
      className={`relative aspect-[4/3] cursor-pointer ${card.className} perspective-2000`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      initial={{ opacity: 0, y: 50, rotate: card.rotation }}
      animate={{ opacity: isDimmed ? 0.35 : 1, y: 0, rotate: card.rotation, scale: isDimmed ? 0.98 : 1 }}
      transition={{
        // keep entrance delay but make hover/dim changes smoother
        delay: 0.5 + index * 0.1,
        default: { duration: 0.8 },
        opacity: { duration: 0.25, ease: 'easeOut' },
        scale: { duration: 0.25, ease: 'easeOut' },
      }}
      drag={draggable ? 'x' : undefined}
      dragConstraints={draggable ? { left: 0, right: 0 } : undefined}
      onDragEnd={onDragEnd}
    >
      <motion.div style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }} animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 5 + index, ease: 'easeInOut' }} className="w-full h-full rounded-[2.5rem] overflow-hidden shadow-2xl bg-gray-200">
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
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [peek, setPeek] = useState(32); // pixels to peek on each side
  const [tilt, setTilt] = useState<{ x: number; y: number } | null>(null);
  const gifRef = useRef<HTMLDivElement | null>(null);
  const [showPinned, setShowPinned] = useState(false);

  const paragraph1SegmentsLine1 = [
    { text: "In the years I’ve worked as a Product Designer, I’ve aimed to bring people closer together through a " },
    { text: 'cutting-edge dating app', highlight: true },
    { text: ', an ' },
    { text: 'award-winning interactive news app', highlight: true },
    { text: ', and an immersive ' },
    { text: 'social games platform', highlight: true },
    { text: ' for virtual team building.' },
    { text: ' Now I’m building an ' },
    { text: 'AI-powered platform', highlight: true },
    { text: ' focused on training.' },
  ];

  const paragraph1SegmentsLine2 = [
    { text: 'I have grown as a designer who brings ' },
    { text: 'business and design', highlight: true },
    { text: ' together.' },
  ];

  const p1DurationLine1 = paragraph1SegmentsLine1.reduce((acc, s) => acc + s.text.length, 0) * HERO_TYPE_SPEED;
  const p1DurationLine2 = paragraph1SegmentsLine2.reduce((acc, s) => acc + s.text.length, 0) * HERO_TYPE_SPEED;
  const p1Duration = p1DurationLine1 + p1DurationLine2;

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)');
    const update = () => setIsMobile(mq.matches);
    update();
    if (mq.addEventListener) mq.addEventListener('change', update);
    else mq.addListener(update);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', update);
      else mq.removeListener(update);
    };
  }, []);

  // compute slide width and handle resize
  useEffect(() => {
    const update = () => {
      const peekPx = 32; // keep small peek both sides
      setPeek(peekPx);
      setCardWidth(window.innerWidth - peekPx * 2);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // device orientation tilt for mobile
  useEffect(() => {
    if (!('DeviceOrientationEvent' in window)) return;
    const handler = (e: DeviceOrientationEvent) => {
      // gamma: left-to-right tilt [-90,90], beta: front-back [-180,180]
      const gamma = e.gamma ?? 0;
      const beta = e.beta ?? 0;
      // scale down for subtle effect
      const rotateY = Math.max(Math.min(gamma * 0.6, 12), -12);
      const rotateX = Math.max(Math.min((beta - 45) * -0.4, 12), -12);
      setTilt({ x: rotateX, y: rotateY });
    };
    window.addEventListener('deviceorientation', handler);
    return () => window.removeEventListener('deviceorientation', handler);
  }, []);

  // show pinned pill when gif scrolls past
  useEffect(() => {
    const onScroll = () => {
      if (!gifRef.current) return;
      const rect = gifRef.current.getBoundingClientRect();
      // if bottom of gif is above the viewport top, mark as passed
      setShowPinned(rect.bottom < 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // autoplay on mobile
  useEffect(() => {
    if (!isMobile) return;
    const id = setInterval(() => setActiveIndex(i => (i + 1) % cards.length), 4000);
    return () => clearInterval(id);
  }, [isMobile]);

  // sync hovered display with active mobile card
  useEffect(() => {
    if (isMobile) setHoveredIndex(activeIndex);
  }, [activeIndex, isMobile]);

  // legacy per-card drag handler removed; container drag is used instead
  const handleMobileDragEnd = (_index: number) => (_event: any, _info: any) => {};

  return (
    <section className="relative flex flex-col items-center justify-between min-h-screen py-16 text-center w-full max-w-[100rem] mx-auto">
      <div className="flex flex-col items-center justify-center mt-4 w-full px-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="font-sans font-semibold text-base md:text-lg mb-6 tracking-tight">
          Boen Jiang
        </motion.div>

        <div className="font-serif font-light text-center leading-relaxed max-w-4xl">
          <HeroTypewriter segments={paragraph1SegmentsLine1} delayStart={0.8} />
          <div className="mt-2">
            <HeroTypewriter segments={paragraph1SegmentsLine2} delayStart={0.8 + p1DurationLine1} />
          </div>
        </div>

        <motion.div ref={gifRef} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1 + p1Duration, duration: 1 }} className="mt-8 w-20 h-20 cursor-pointer relative" onMouseEnter={() => setIsProfileHovered(true)} onMouseLeave={() => setIsProfileHovered(false)}>
          <img src="/assets/b.gif" alt="Profile Animation" className={`w-full h-full object-cover rounded-full absolute inset-0 transition-opacity duration-500 ${isProfileHovered ? 'opacity-0' : 'opacity-100'}`} />
          <img src="/assets/b-profile.png" alt="Profile Static" className={`w-full h-full object-cover rounded-full absolute inset-0 transition-opacity duration-500 ${isProfileHovered ? 'opacity-100' : 'opacity-0'}`} />
        </motion.div>
      </div>
      {/* Pinned small pill that appears after GIF scrolls past */}
      <div
        className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-opacity duration-300 ${showPinned ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        aria-hidden={!showPinned}
      >
            <div
            className="flex items-center rounded-full px-3 py-1 backdrop-blur-sm"
            style={{ backgroundColor: 'rgba(255,255,255,0.4)' }}
          onMouseEnter={() => setIsProfileHovered(true)}
          onMouseLeave={() => setIsProfileHovered(false)}
        >
          <div className="relative w-8 h-8 flex-shrink-0 mr-3">
            <img src="/assets/b.gif" alt="Profile Animation" className={`w-full h-full object-cover rounded-full absolute inset-0 transition-opacity duration-500 ${isProfileHovered ? 'opacity-0' : 'opacity-100'}`} />
            <img src="/assets/b-profile.png" alt="Profile Static" className={`w-full h-full object-cover rounded-full absolute inset-0 transition-opacity duration-500 ${isProfileHovered ? 'opacity-100' : 'opacity-0'}`} />
          </div>
          <div className="font-sans font-medium text-xs md:text-sm">Boen Jiang</div>
        </div>
      </div>

      <div className="w-full mt-10">
        <div className="w-full px-4 h-32 mb-10 relative flex items-center justify-center pointer-events-none">
          {hoveredIndex !== null && (
            <div className="flex flex-col sm:flex-row items-center text-center">
              {cards[hoveredIndex].logo && (
                <img src={cards[hoveredIndex].logo} alt="logo" className="h-6 sm:h-8 mb-2 sm:mb-0 sm:mr-6 object-contain" style={{ width: 'auto' }} />
              )}
              <div className="font-sans text-sm md:text-base text-text leading-snug max-w-3xl font-medium text-center">
                <TypewriterText text={cards[hoveredIndex].description} />
              </div>
            </div>
          )}
        </div>
        {/* Mobile horizontal carousel */}
        <div className="block sm:hidden" style={{ paddingLeft: peek, paddingRight: peek }}>
          <div className="relative w-full overflow-visible">
            <motion.div
              className="flex"
              style={{ width: `${cards.length * cardWidth}px` }}
              animate={{ x: cardWidth ? -activeIndex * cardWidth : 0 }}
              transition={{ type: 'tween', duration: 0.45 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={(e, info) => {
                if (info.offset.x < -50) setActiveIndex(i => (i + 1) % cards.length);
                else if (info.offset.x > 50) setActiveIndex(i => (i - 1 + cards.length) % cards.length);
              }}
            >
              {cards.map((card, index) => (
                <div key={index} className="flex-shrink-0" style={{ width: cardWidth }}>
                  <Card
                    card={card}
                    index={index}
                    isDimmed={hoveredIndex !== null && hoveredIndex !== index}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    style={{ width: '100%', height: 'min(50vh, 56vw)' }}
                    isTop={index === activeIndex}
                    tilt={index === activeIndex ? tilt : null}
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Desktop grid */}
        <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
          {cards.map((card, index) => (
            <Card key={index} card={card} index={index} isDimmed={hoveredIndex !== null && hoveredIndex !== index} onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
