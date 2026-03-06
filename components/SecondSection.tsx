import React, { useRef, useEffect, useState, useMemo } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

// Quick typewriter line
const TypewriterLine = ({
  text,
  className,
  active,
  speed = 0.015,
  highlightWords = [],
  highlightPhrases = [],
}: {
  text: string;
  className?: string;
  active: boolean;
  speed?: number;
  highlightWords?: string[];
  highlightPhrases?: string[];
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (active) setVisible(true);
  }, [active]);

  if (!visible) return null;

  const words = text.split(' ');
  const normalizeWord = (word: string) => word.toLowerCase().replace(/[^\w$]/g, '');
  const normalizedWords = words.map((word) => normalizeWord(word));
  const normalizedHighlights = highlightWords.map((word) => normalizeWord(word));
  const normalizedPhrases = highlightPhrases
    .map((phrase) => phrase.split(' ').map((word) => normalizeWord(word)).filter(Boolean))
    .filter((parts) => parts.length > 0)
    .sort((a, b) => b.length - a.length);

  const segments: Array<{ text: string; highlighted: boolean }> = [];
  let index = 0;
  while (index < words.length) {
    let matchedPhraseLength = 0;

    for (const phraseParts of normalizedPhrases) {
      const candidate = normalizedWords.slice(index, index + phraseParts.length);
      if (candidate.length === phraseParts.length && candidate.every((part, i) => part === phraseParts[i])) {
        matchedPhraseLength = phraseParts.length;
        break;
      }
    }

    if (matchedPhraseLength > 0) {
      segments.push({
        text: words.slice(index, index + matchedPhraseLength).join(' '),
        highlighted: true,
      });
      index += matchedPhraseLength;
      continue;
    }

    segments.push({
      text: words[index],
      highlighted: normalizedHighlights.includes(normalizedWords[index]),
    });
    index += 1;
  }

  let charCursor = 0;

  return (
    <span className={className} aria-label={text}>
      {segments.map((segment, segmentIndex) => {
        const delayBase = charCursor * speed;
        const chars = Array.from(segment.text);
        charCursor += chars.length;
        const hasTrailingSpace = segmentIndex < segments.length - 1;
        const trailingSpaceDelay = charCursor * speed;
        if (hasTrailingSpace) {
          charCursor += 1;
        }

        return (
          <React.Fragment key={`${segment.text}-${segmentIndex}`}>
            <span
              className={`inline-block whitespace-nowrap ${segment.highlighted ? 'text-[#4CE3B3] font-semibold italic' : ''}`}
            >
              {chars.map((char, charIndex) => (
                <motion.span
                  key={`${segment.text}-${segmentIndex}-${charIndex}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: delayBase + charIndex * speed, duration: 0 }}
                  className="inline-block"
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </span>
            {hasTrailingSpace && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: trailingSpaceDelay, duration: 0 }}
                className="inline-block"
              >
                &nbsp;
              </motion.span>
            )}
          </React.Fragment>
        );
      })}
    </span>
  );
};

const PlayerVideo = ({
  src,
  x,
  y,
  rotation,
}: {
  src: string;
  x: MotionValue<string>;
  y: MotionValue<string>;
  rotation: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{ x, y, rotate: rotation, perspective: 2000 }}
      className="absolute top-1/2 left-1/2 w-[68px] h-[68px] -mt-[34px] -ml-[34px] md:w-[112px] md:h-[112px] md:-mt-[56px] md:-ml-[56px] z-20"
    >
      <div className="w-full h-full rounded-[16px] md:rounded-[25px] overflow-hidden shadow-2xl bg-black/50 border border-white/10">
        <video
          src={src}
          className="w-full h-full object-cover pointer-events-none"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
    </motion.div>
  );
};

const gameCoversList = [
  '8BitClassics.jpg',
  'ActionPacked-Layers.png',
  'Are You Afraid Of The Park.png',
  'Art-Trivia.png',
  'Charades.png',
  'CincoDeMayoMadness_no tag.png',
  'Codenames.png',
  'Clock_s-Ticking.png',
  'Food-trivia.png',
  'Fright-Club.png',
  'GamePackIllo_HumThatTune.jpg',
  'GeneralTrivia.jpg',
  'Geography-trivia.png',
  'Global-sports-tricia.png',
  'Going-For-Gold.png',
  'Great-Moments-In-Sports.png',
  'Happy-Hour-Hero.png',
  'Holiday Classic.png',
  'Holiday-Break.png',
  'Ice-Cream-Social.png',
  'Independent-Play.png',
  'Karaoke-roulette——2.png',
  'May The 4th Be With You_no tag.png',
  'Mini Game To Annoy You.png',
  'Movie trivia hard.png',
  'Name-That-Tune.png',
  'Never-Have-I-Ever.png',
  'OpportunityKnocks.png',
  'TV-trivia.png',
  'The-Best-Hour.png',
  'US-sports-trivia.png',
  'Unique-UK.png',
];

interface CoverLayout {
  x: number;
  y: number;
  r: number;
  delay: number;
  topple: number;
}

const generateCoverLayout = (count: number, isMobile: boolean): CoverLayout[] => {
  const layouts: CoverLayout[] = [];
  const horizontalOffset = isMobile ? -40 : -10;
  const cardW = isMobile ? 24 : 14;
  const cardH = (cardW * 9) / 16;
  const xAbsMax = isMobile ? 50 - cardW / 2 - 1 + cardW * 0.75 : 50 - cardW / 2 - 1;
  const yAbsMax = isMobile ? 50 - cardH / 2 - 7 + cardH * 0.45 : 50 - cardH / 2 - 7;
  const xMin = -xAbsMax;
  const xMax = xAbsMax;
  const yMin = isMobile ? -yAbsMax * 0.95 : -yAbsMax * 0.72;
  const yMax = isMobile ? yAbsMax * 0.98 : yAbsMax * 0.9;
  const minXGap = cardW * (isMobile ? 0.46 : 0.72);
  const minYGap = cardH * (isMobile ? 0.5 : 0.74);

  let attempts = 0;
  while (layouts.length < count && attempts < 16000) {
    attempts += 1;
    const candidateX = xMin + Math.random() * (xMax - xMin);
    const candidateY = yMin + Math.random() * (yMax - yMin);

    const overlapsTooMuch = layouts.some((item) => {
      const dx = Math.abs(item.x - candidateX);
      const dy = Math.abs(item.y - candidateY);
      return dx < minXGap && dy < minYGap;
    });

    if (!overlapsTooMuch) {
      const shiftedX = Math.max(xMin, Math.min(xMax, candidateX + horizontalOffset));
      layouts.push({
        x: shiftedX,
        y: candidateY,
        r: -20 + Math.random() * 40,
        delay: Math.random() * 0.16,
        topple: layouts.length % 5 === 0 ? (Math.random() > 0.5 ? -14 : 14) : 0,
      });
    }
  }

  while (layouts.length < count) {
    const fallbackX = xMin + Math.random() * (xMax - xMin);
    const shiftedFallbackX = Math.max(xMin, Math.min(xMax, fallbackX + horizontalOffset));
    layouts.push({
      x: shiftedFallbackX,
      y: yMin + Math.random() * (yMax - yMin),
      r: -12 + Math.random() * 24,
      delay: Math.random() * 0.12,
      topple: 0,
    });
  }

  return layouts;
};

const GameCoverDrop = ({
  src,
  index,
  started,
  layout,
  isMobile,
}: {
  src: string;
  index: number;
  started: boolean;
  layout: CoverLayout;
  isMobile: boolean;
}) => {
  const delay = layout.delay + (index % 3) * 0.02;

  return (
    <motion.div
      initial={{ x: `${layout.x}vw`, y: '-120vh', rotate: layout.r * 1.6, scale: 1.05, opacity: 0 }}
      animate={
        started
          ? {
              x: `${layout.x}vw`,
              y: ['-120vh', `${layout.y + 4}vh`, `${layout.y - 1.5}vh`, `${layout.y}vh`],
              rotate: [layout.r * 1.6, layout.r - 8, layout.r + 4, layout.r + layout.topple],
              scale: [1.05, 0.98, 1.01, 1],
              opacity: 1,
            }
          : { x: `${layout.x}vw`, y: '-120vh', rotate: layout.r * 1.6, scale: 1.05, opacity: 0 }
      }
      transition={{
        y: { duration: 1.2, times: [0, 0.78, 0.9, 1], ease: ['easeIn', 'easeOut', 'easeOut', 'easeOut'], delay },
        rotate: { duration: 1.2, times: [0, 0.7, 0.88, 1], ease: 'easeOut', delay },
        scale: { duration: 1.2, times: [0, 0.78, 0.9, 1], ease: 'easeOut', delay },
        opacity: { duration: 0.16, delay },
      }}
      style={{ zIndex: 20 + (index % 8) }}
      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${isMobile ? 'w-[60vw] max-w-[560px]' : 'w-[14vw] max-w-[230px]'} aspect-video shadow-2xl rounded-md md:rounded-2xl overflow-hidden border border-white/20`}
    >
      <img
        src={`/assets/game covers/${src}`}
        alt="Game cover"
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
};

const SecondSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [dropStarted, setDropStarted] = useState(false);
  const [dropNonce, setDropNonce] = useState(0);
  const [dropFinished, setDropFinished] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const { scrollYProgress: visibilityProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const totalHeight = '1240vh';

  // Background video visibility as soon as section begins entering
  const videoOpacity = useTransform(visibilityProgress, [0, 0.2], [0, 1]);
  const overlayOpacity = useTransform(visibilityProgress, [0.05, 0.25], [0, 0.78]);

  // Text opacity envelopes (non-overlapping)
  const text1Opacity = useTransform(scrollYProgress, [0.08, 0.14, 0.22, 0.28], [0, 1, 1, 0]);
  const text2Opacity = useTransform(scrollYProgress, [0.28, 0.32, 0.39, 0.43], [0, 1, 1, 0]);

  const playersOpacity = useTransform(scrollYProgress, [0.30, 0.34, 0.52, 0.58], [0, 1, 1, 0]);
  const connectOpacity = useTransform(scrollYProgress, [0.40, 0.44, 0.52, 0.58], [0, 1, 1, 0]);
  const gameplayOpacity = useTransform(scrollYProgress, [0.42, 0.46, 0.54, 0.60], [0, 1, 1, 0]);

  // Post-cover phases
  const hostedSectionOpacity = useTransform(scrollYProgress, [0.76, 0.80, 0.90, 0.93], [0, 1, 1, 0]);
  const hostedTextOpacity = useTransform(scrollYProgress, [0.78, 0.81, 0.84, 0.865], [0, 1, 1, 0]);
  const hostedVideosOpacity = useTransform(scrollYProgress, [0.865, 0.89, 0.92, 0.94], [0, 1, 1, 0]);
  const hostedSectionY = useTransform(scrollYProgress, [0.80, 0.93], ['8vh', '-10vh']);
  const bg2Opacity = useTransform(scrollYProgress, [0.94, 0.965], [0, 1]);
  const growthOpacity = useTransform(scrollYProgress, [0.968, 0.984, 0.992, 0.996], [0, 1, 1, 0]);
  const closingOpacity = useTransform(scrollYProgress, [0.997, 0.9992, 1], [0, 1, 1]);
  const closingY = useTransform(scrollYProgress, [0.997, 1], ['10vh', '-6vh']);

  // Typewriter triggers
  const [text1Active, setText1Active] = useState(false);
  const [text2Active, setText2Active] = useState(false);
  const [connectActive, setConnectActive] = useState(false);
  const [finalActive, setFinalActive] = useState(false);
  const [hostedActive, setHostedActive] = useState(false);
  const [growthActive, setGrowthActive] = useState(false);
  const [closingActive, setClosingActive] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(mq.matches);
    update();
    if (mq.addEventListener) mq.addEventListener('change', update);
    else mq.addListener(update);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', update);
      else mq.removeListener(update);
    };
  }, []);

  const coverLayouts = useMemo(() => {
    return generateCoverLayout(gameCoversList.length, isMobile);
  }, [isMobile, dropNonce]);

  useEffect(() => {
    let t1 = false;
    let t2 = false;
    let t3 = false;
    let t4 = false;
    let t5 = false;
    let t6 = false;
    let t7 = false;
    let dropped = false;

    const unsub = scrollYProgress.on('change', (v) => {
      if (!t1 && v > 0.1) {
        setText1Active(true);
        t1 = true;
      }
      if (!t2 && v > 0.33) {
        setText2Active(true);
        t2 = true;
      }
      if (!t3 && v > 0.38) {
        setConnectActive(true);
        t3 = true;
      }
      if (!t4 && v > 0.73) t4 = true;
      if (!t5 && v > 0.82) {
        setHostedActive(true);
        t5 = true;
      }
      if (!t6 && v > 0.968) {
        setGrowthActive(true);
        t6 = true;
      }
      if (!t7 && v > 0.997) {
        setClosingActive(true);
        t7 = true;
      }
      if (!dropped && v > 0.62) {
        setDropStarted(true);
        setDropFinished(false);
        setDropNonce((value) => value + 1);
        dropped = true;
      }
      if (dropped && v < 0.56) {
        setDropStarted(false);
        setDropFinished(false);
        dropped = false;
      }
    });

    return () => {
      unsub();
    };
  }, [scrollYProgress]);

  useEffect(() => {
    if (!dropStarted) return;
    const timer = window.setTimeout(() => {
      setDropFinished(true);
      setFinalActive(true);
    }, 1450);
    return () => window.clearTimeout(timer);
  }, [dropStarted]);

  // Player videos positions: loose circle -> tight top row
  const stages = [0.30, 0.36, 0.42, 0.48];
  const finalXs = isMobile ? [-30, -15, 0, 15, 30] : [-18, -9, 0, 9, 18];

  const x1 = useTransform(scrollYProgress, stages, ['-50vw', '-16vw', '-16vw', `${finalXs[0]}vw`]);
  const y1 = useTransform(scrollYProgress, stages, ['-50vh', '-10vh', '-10vh', '-32vh']);
  const r1 = useTransform(scrollYProgress, stages, [-40, -12, -12, -8]);

  const x2 = useTransform(scrollYProgress, stages, ['-50vw', '-8vw', '-8vw', `${finalXs[1]}vw`]);
  const y2 = useTransform(scrollYProgress, stages, ['50vh', '16vh', '16vh', '-32vh']);
  const r2 = useTransform(scrollYProgress, stages, [40, 10, 10, -4]);

  const x3 = useTransform(scrollYProgress, stages, ['0vw', '0vw', '0vw', `${finalXs[2]}vw`]);
  const y3 = useTransform(scrollYProgress, stages, ['-50vh', '-20vh', '-20vh', '-32vh']);
  const r3 = useTransform(scrollYProgress, stages, [0, -6, -6, 0]);

  const x4 = useTransform(scrollYProgress, stages, ['50vw', '8vw', '8vw', `${finalXs[3]}vw`]);
  const y4 = useTransform(scrollYProgress, stages, ['50vh', '16vh', '16vh', '-32vh']);
  const r4 = useTransform(scrollYProgress, stages, [-40, 8, 8, 4]);

  const x5 = useTransform(scrollYProgress, stages, ['50vw', '16vw', '16vw', `${finalXs[4]}vw`]);
  const y5 = useTransform(scrollYProgress, stages, ['-50vh', '-10vh', '-10vh', '-32vh']);
  const r5 = useTransform(scrollYProgress, stages, [40, -10, -10, 8]);

  // Final "We built hundreds of them..." title and fade-out of covers
  const finalTitleOpacity = useTransform(scrollYProgress, [0.66, 0.69, 0.79, 0.82], [0, 1, 1, 0]);
  const finalTitleY = useTransform(scrollYProgress, [0.66, 0.69], ['8vh', '0vh']);
  const gameCoversFadeOut = useTransform(scrollYProgress, [0.78, 0.83], [1, 0]);

  return (
    <div ref={containerRef} style={{ height: totalHeight }} className="relative w-full">
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

        {/* Dark overlay behind everything */}
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-black pointer-events-none"
        />

        {/* Intro text lines */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
          <motion.div
            style={{ opacity: text1Opacity }}
            className="absolute px-4 text-white text-3xl md:text-5xl font-serif font-light text-center max-w-4xl drop-shadow-lg leading-[1.45] md:leading-[1.55] [word-break:keep-all]"
          >
            <TypewriterLine
              text="During the 2020 COVID lockdown, I joined a team to build an immersive virtual playground to help people connect and share moments of joy."
              active={text1Active}
              speed={0.012}
            />
          </motion.div>

          <motion.div
            style={{ opacity: text2Opacity }}
            className="absolute px-4 text-white text-3xl md:text-5xl font-serif font-light text-center max-w-4xl drop-shadow-lg leading-[1.45] md:leading-[1.55] [word-break:keep-all]"
          >
            <TypewriterLine
              text="A space where distance didn't mean disconnection."
              active={text2Active}
              speed={0.012}
            />
          </motion.div>
        </div>

        {/* Phase 2: Players row, connection text, gameplay video */}
        <motion.div style={{ opacity: playersOpacity }} className="absolute inset-0 z-20 pointer-events-none">
          <div className="w-full h-full relative pointer-events-auto">
            <PlayerVideo src="/assets/Player 1.mp4" x={x1} y={y1} rotation={r1} />
            <PlayerVideo src="/assets/Player 2.mp4" x={x2} y={y2} rotation={r2} />
            <PlayerVideo src="/assets/Player 3.mp4" x={x3} y={y3} rotation={r3} />
            <PlayerVideo src="/assets/Player 4.mp4" x={x4} y={y4} rotation={r4} />
            <PlayerVideo src="/assets/Player 5.mp4" x={x5} y={y5} rotation={r5} />
          </div>
        </motion.div>

        {/* Connection text between players and gameplay video */}
        <motion.div
          style={{ opacity: connectOpacity }}
          className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
        >
          <div className="translate-y-[-21vh] md:translate-y-[-18vh] px-4 text-white text-2xl md:text-3xl font-serif font-light text-center md:whitespace-nowrap max-w-none drop-shadow-lg leading-[1.5] [word-break:keep-all]">
            <TypewriterLine
              text="We connect people through immersive interactive social games."
              active={connectActive}
              speed={0.012}
              highlightWords={['immersive', 'interactive']}
            />
          </div>
        </motion.div>

        {/* Gameplay video, responsive + full-width with 8px padding on mobile */}
        <motion.div
          style={{ opacity: gameplayOpacity }}
          className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none px-2 md:px-0"
        >
          <div className="translate-y-[11vh] md:translate-y-[10vh] w-full md:w-[60vw] max-w-[700px] aspect-video rounded-[20px] overflow-hidden shadow-2xl border border-white/10 pointer-events-auto">
            <video
              src="/assets/Interactive gameplay.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Phase 3: Game covers drop and final title */}
        <motion.div
          style={{ opacity: gameCoversFadeOut }}
          animate={dropStarted ? { rotate: [0, -2.5, 3, 0] } : { rotate: 0 }}
          transition={{ duration: 2.8, ease: 'easeOut' }}
          className="absolute inset-0 z-30 pointer-events-none overflow-hidden"
        >
          {gameCoversList.map((src, index) => (
            <GameCoverDrop
              key={src}
              src={src}
              index={index}
              started={dropStarted}
              layout={coverLayouts[index]}
              isMobile={isMobile}
            />
          ))}

          <motion.div
            style={{ opacity: dropFinished ? finalTitleOpacity : 0, y: finalTitleY }}
            className="absolute inset-0 flex items-center justify-center z-[120] pointer-events-none"
          >
            <div className="bg-black/35 backdrop-blur-xl px-8 md:px-10 py-4 md:py-6 rounded-full border border-white/15 shadow-2xl">
              <TypewriterLine
                text="We built hundreds of them..."
                active={finalActive && dropFinished}
                speed={0.018}
                className="text-3xl md:text-5xl font-serif font-light text-center drop-shadow-2xl tracking-wide [word-break:keep-all] text-transparent bg-clip-text bg-[length:220%_220%] bg-[linear-gradient(120deg,#ff4fd8,#ff9f1c,#ffe66d,#4ef2c2,#6ea8ff,#b37dff,#ff4fd8)]"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Phase 4: Hosted games montage */}
        <motion.div style={{ opacity: hostedSectionOpacity, y: hostedSectionY }} className="absolute inset-0 z-[130] flex flex-col items-center justify-center pointer-events-none px-2 md:px-4">
          <motion.div
            style={{ opacity: isMobile ? hostedTextOpacity : hostedSectionOpacity }}
            initial={{ opacity: 0, y: 10 }}
            animate={hostedActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="mb-5 md:mb-8 max-w-5xl text-center text-white text-2xl md:text-3xl font-serif font-light leading-[1.5] md:leading-[1.6] [word-break:keep-all]"
          >
            <TypewriterLine
              text="The best part? Our Live-hosted comedian games became a hit—creating joyful moments for people who couldn’t be together in person."
              active={hostedActive}
              speed={0.012}
              highlightPhrases={['live-hosted', 'comedian']}
            />
          </motion.div>
          {isMobile ? (
            <motion.div
              style={{ opacity: hostedVideosOpacity }}
              className="absolute inset-x-2 top-2 bottom-2 grid grid-rows-4 gap-2 overflow-hidden"
            >
              {['/assets/hosted_1.mp4', '/assets/hosted_3.mp4', '/assets/hosted_2.mp4', '/assets/Shareable Joy capture.mp4'].map((videoSrc) => (
                <div key={videoSrc} className="w-full h-full rounded-xl overflow-hidden border border-white/20 shadow-2xl">
                  <video src={videoSrc} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              style={{ opacity: hostedVideosOpacity }}
              className="relative grid md:grid-cols-2 gap-4 w-full max-w-[920px] mt-6"
            >
              {['/assets/hosted_1.mp4', '/assets/hosted_3.mp4', '/assets/hosted_2.mp4', '/assets/Shareable Joy capture.mp4'].map((videoSrc, index) => (
                <motion.div
                  key={videoSrc}
                  initial={{ opacity: 0, y: 8 }}
                  animate={hostedActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                  transition={{ duration: 0.35, ease: 'easeOut', delay: 0.08 * index }}
                  className="aspect-video w-full rounded-2xl overflow-hidden border border-white/20 shadow-2xl"
                >
                  <video src={videoSrc} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Phase 5: Intro video 2 + growth story */}
        <motion.div style={{ opacity: bg2Opacity }} className="absolute inset-0 z-[140] pointer-events-none">
          <video
            src="/assets/intro video_2.mp4"
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="absolute inset-0 bg-black/65" />

          <motion.div style={{ opacity: growthOpacity }} className="absolute inset-0 flex flex-col items-center justify-center px-4">
            <div className="text-white text-4xl md:text-5xl font-serif font-light text-center max-w-5xl leading-[1.5] md:leading-[1.6] mb-6 md:mb-10 [word-break:keep-all]">
              <TypewriterLine
                text="We raised $20M in funding, reached $1M ARR, and sold the company in 2025."
                active={growthActive}
                speed={0.012}
                highlightWords={['$20m', '$1m', 'sold']}
              />
            </div>
          </motion.div>

          <motion.div style={{ opacity: closingOpacity, y: closingY }} className="absolute inset-0 flex items-center justify-center px-4">
            <div className="text-white text-3xl md:text-5xl font-serif font-light text-center max-w-6xl leading-relaxed [word-break:keep-all]">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={closingActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="space-y-3 md:space-y-4"
              >
                <div className="leading-[1.5] md:leading-[1.6]">
                  As
                  {' '}
                  <TypewriterLine text="Lead Designer" active={closingActive} speed={0.014} highlightPhrases={['Lead Designer']} className="font-medium" />
                </div>

                <div className="leading-[1.5] md:leading-[1.6]">
                  <TypewriterLine text="I shaped everything you see here." active={closingActive} speed={0.012} />
                </div>

                <div className="text-2xl md:text-4xl leading-[1.65] flex flex-col items-center gap-2">
                  <TypewriterLine text="Product Design" active={closingActive} speed={0.012} highlightPhrases={['Product Design']} />
                  <TypewriterLine text="Marketing Site" active={closingActive} speed={0.012} highlightPhrases={['Marketing Site']} />
                  <TypewriterLine text="Social Outreach" active={closingActive} speed={0.012} highlightPhrases={['Social Outreach']} />
                  <TypewriterLine text="This Fun Video" active={closingActive} speed={0.012} highlightPhrases={['This Fun Video']} />
                </div>

                <div className="pt-6 md:pt-8 text-sm md:text-xl text-white/90 max-w-4xl mx-auto leading-[1.7] font-sans">
                  <TypewriterLine text="If the AI era had arrived a little earlier, this would have been even more fun." active={closingActive} speed={0.01} />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SecondSection;
