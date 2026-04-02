import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import MainLayout from '../components/layout/MainLayout';

/* ─── Data ─── */
const featuredCombos = [
  {
    category: 'Crunch Combo',
    name: 'Crunch Combo',
    desc: 'Crispy bites, fries, and drink packed into one satisfying everyday combo.',
    image: '/compos/CrunchCombo.jpg',
    accent: '#f4a62a',
    contentBg: 'linear-gradient(135deg, #fff8e6 0%, #ffe0a0 100%)',
    titleColor: '#b07500',
  },
  {
    category: 'Fish & Chips',
    name: 'Fish Chips Combo',
    desc: 'Golden fish, crisp fries, and a balanced plate that feels light but filling.',
    image: '/compos/fishchips.jpg',
    accent: '#e47b2d',
    contentBg: 'linear-gradient(135deg, #fff3eb 0%, #ffd0a8 100%)',
    titleColor: '#a04a10',
  },
  {
    category: 'Party Box',
    name: 'Party Box',
    desc: 'A sharing-friendly combo made for group cravings, snack runs, and fun nights.',
    image: '/compos/partybox.jpeg',
    accent: '#d97706',
    contentBg: 'linear-gradient(135deg, #fefce8 0%, #fde68a 100%)',
    titleColor: '#92580a',
  },
  {
    category: 'Prawn Special',
    name: 'Prawn Combo',
    desc: 'Bold seafood flavor with crispy sides and a premium combo presentation.',
    image: '/compos/prawn.jpg',
    accent: '#ff8a65',
    contentBg: 'linear-gradient(135deg, #fff1ee 0%, #ffcab8 100%)',
    titleColor: '#c0391a',
  },
];

const showcaseCombos = [
  {
    name: 'Crunch\nCombo',
    label: 'Crispy Favourite',
    tagline: 'Golden. Crispy. Irresistible.',
    desc: 'Every bite of the Crunch Combo is packed with crispy coated pieces, golden fries, and a chilled drink - a perfectly balanced everyday indulgence.',
    highlights: ['Crispy Chicken Bites', 'Golden Fries', 'Dipping Sauce', 'Chilled Drink'],
    image: '/compos/fish_crunch.png',
    blob: '#f4a62a',
    accent: '#b07500',
    ringOuter: '#f4a62a',
    ringInner: '#d97706',
  },
  {
    name: 'Fish &\nChips',
    label: 'Ocean Classic',
    tagline: 'Light. Fresh. Satisfying.',
    desc: 'A timeless classic reimagined - tender golden fish fillets with perfectly crisp chips and a side of tartar sauce. The sea never tasted this good.',
    highlights: ['Fish Fillet', 'Crispy Chips', 'Tartar Sauce', 'Lemon Wedge'],
    image: '/compos/oceanChips.png',
    blob: '#d4a843',
    accent: '#7a5a10',
    ringOuter: '#d1b66f',
    ringInner: '#8a6a24',
  },
  {
    name: 'Party\nBox',
    label: 'Share the Joy',
    tagline: 'Made to Share. Built to Impress.',
    desc: 'The Party Box is your go-to for group hangouts, game nights, and celebrations. Loaded with a mix of crowd-pleasers every single time.',
    highlights: ['Mixed Snacks', 'Loaded Fries', 'Dips Platter', 'Group Drinks'],
    image: '/compos/party_Box.png',
    blob: '#e07b3a',
    accent: '#8a3a10',
    ringOuter: '#e07b3a',
    ringInner: '#c34b1a',
  },
  {
    name: 'Prawn\nCombo',
    label: 'Premium Seafood',
    tagline: 'Bold. Juicy. Premium.',
    desc: 'The Prawn Combo brings the ocean to your table - plump, seasoned prawns with crispy sides and a premium presentation that looks as good as it tastes.',
    highlights: ['Seasoned Prawns', 'Crispy Sides', 'Signature Sauce', 'Premium Plating'],
    image: '/compos/prawnCompo.png',
    blob: '#e8845a',
    accent: '#9a3820',
    ringOuter: '#f28b74',
    ringInner: '#c7513a',
  },
];

const floatingBlobs = [
  { size: 420, x: '-8%',  y: '5%',   color: 'rgba(233,108,51,0.10)', duration: 9,  delay: 0   },
  { size: 320, x: '72%',  y: '-10%', color: 'rgba(244,166,42,0.12)', duration: 11, delay: 2   },
  { size: 260, x: '55%',  y: '62%',  color: 'rgba(255,138,80,0.08)', duration: 13, delay: 1   },
  { size: 180, x: '10%',  y: '70%',  color: 'rgba(217,119,6,0.10)',  duration: 8,  delay: 3   },
  { size: 140, x: '85%',  y: '40%',  color: 'rgba(233,108,51,0.07)', duration: 10, delay: 1.5 },
];

const particles = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  x: `${Math.round((i * 47 + 5) % 96)}%`,
  y: `${Math.round((i * 31 + 8) % 92)}%`,
  size: i % 3 === 0 ? 6 : i % 3 === 1 ? 4 : 3,
  duration: 5 + (i % 5) * 1.4,
  delay: (i * 0.37) % 4,
  opacity: i % 4 === 0 ? 0.45 : 0.22,
}));

/* ─── Blob shapes for organic morph ─── */
const blobShapes = [
  '60% 40% 65% 35% / 50% 55% 45% 60%',
  '45% 55% 40% 60% / 60% 45% 55% 40%',
  '55% 45% 60% 40% / 45% 60% 40% 55%',
  '65% 35% 50% 50% / 40% 60% 50% 50%',
];
void blobShapes;

/* ─── Image slide variants with direction ─── */
const imgVariants = {
  enter: (dir: number) => ({
    x: dir * 320, opacity: 0, scale: 0.86, rotateY: dir * 22, filter: 'blur(14px)',
  }),
  center: {
    x: 0, opacity: 1, scale: 1, rotateY: 0, filter: 'blur(0px)',
    transition: {
      x:       { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
      opacity: { duration: 0.5 },
      scale:   { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
      rotateY: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
      filter:  { duration: 0.5 },
    },
  },
  exit: (dir: number) => ({
    x: dir * -280, opacity: 0, scale: 0.92, rotateY: dir * -18, filter: 'blur(10px)',
    transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
  }),
};
void imgVariants;

/* ─── Scroll-based showcase section ─── */
const ScrollShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const prevIdx = useRef(0);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  useEffect(() => {
    const N = showcaseCombos.length;
    return scrollYProgress.on('change', (v) => {
      const idx = Math.min(Math.floor(v * N), N - 1);
      if (idx !== prevIdx.current) {
        setActive(idx);
        prevIdx.current = idx;
      }
    });
  }, [scrollYProgress]);

  const combo = showcaseCombos[active];
  // Round animatic behind the food image
  const orbitRadius = 32;           // smaller rings
  const circleLeft = '-4%';         // shift left so the image sits toward the right edge of the rings
  const orbitDepth = orbitRadius * 0.22;

  // Circle rotates on scroll
  const rotation = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const reverseRotation = useTransform(scrollYProgress, [0, 1], [0, -220]);
  const orbitAngle = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const imageTilt = useTransform(scrollYProgress, [0, 0.5, 1], [-12, 0, 12]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1.02, 0.95]);

  const orbitX = useTransform(orbitAngle, (a) => (window.innerHeight / 100) * orbitRadius * Math.cos((a * Math.PI) / 180));
  const orbitY = useTransform(orbitAngle, (a) => (window.innerHeight / 100) * orbitDepth * Math.sin((a * Math.PI) / 180));

  // Each combo: image moves from start (black mark) to end (red mark) independently

  /* ── Mobile layout ── */
  if (isMobile) {
    return (
      <div style={{ marginTop: '40px', padding: '0 16px 40px' }}>
        {showcaseCombos.map((item, i) => (
          <div key={i} style={{
            marginBottom: '32px',
            borderRadius: '24px',
            overflow: 'hidden',
            background: `linear-gradient(135deg, ${item.ringOuter}14 0%, #fffaf4 50%, ${item.ringInner}12 100%)`,
            boxShadow: `0 12px 40px ${item.blob}22`,
            border: `1px solid ${item.blob}25`,
          }}>
            {/* Image */}
            <div style={{ width: '100%', background: `radial-gradient(ellipse at 50% 50%, ${item.blob}28 0%, transparent 70%)`, padding: '24px 16px 8px', display: 'flex', justifyContent: 'center' }}>
              <img src={item.image} alt={item.name} style={{ width: '70%', maxWidth: '240px', height: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 16px 32px rgba(0,0,0,0.22))' }} />
            </div>
            {/* Content */}
            <div style={{ padding: '16px 20px 24px', display: 'grid', gap: '10px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 44, height: 44, borderRadius: '12px', background: item.blob, color: '#fff', fontWeight: 900, fontSize: '1.1rem', boxShadow: `0 8px 24px ${item.blob}55` }}>
                0{i + 1}
              </div>
              <div>
                <h3 style={{ margin: 0, color: '#130c06', fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-0.02em' }}>{item.name.replace('\n', ' ')}</h3>
                <p style={{ margin: '4px 0 0', color: item.blob, fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em' }}>{item.label}</p>
              </div>
              <p style={{ margin: 0, color: '#4c3a2a', fontSize: '0.88rem', lineHeight: 1.7 }}>{item.desc}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {item.highlights.map((h) => (
                  <span key={h} style={{ padding: '5px 12px', borderRadius: '999px', background: `${item.blob}18`, color: item.accent, fontSize: '0.75rem', fontWeight: 800, border: `1px solid ${item.blob}28` }}>{h}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={containerRef} style={{ height: `${showcaseCombos.length * 100}vh`, marginTop: '80px', position: 'relative' }}>

      {/* ── Sticky full-screen frame ── */}
      <div className="showcase-sticky" style={{
        position: 'sticky', top: '56px',
        height: 'calc(100vh - 56px)',
        borderRadius: '28px',
        overflow: 'hidden',
        background: `linear-gradient(160deg, ${(combo as any).ringOuter ?? combo.blob}12 0%, #fffaf4 45%, ${(combo as any).ringInner ?? combo.accent}10 100%)`,
        boxShadow: '0 24px 70px rgba(0,0,0,0.10)',
      }}>

        {/* Background glow */}
        <motion.div
          animate={{ background: `radial-gradient(ellipse at 32% 50%, ${combo.blob}28 0%, transparent 58%)` }}
          transition={{ duration: 0.85 }}
          style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}
        />

        <motion.div
          animate={{
            background: `radial-gradient(circle at 18% 50%, ${combo.blob}18 0%, transparent 34%), radial-gradient(circle at 68% 18%, ${combo.blob}10 0%, transparent 24%), linear-gradient(135deg, rgba(255,255,255,0.72) 0%, rgba(255,250,242,0.92) 45%, rgba(248,239,226,0.96) 100%)`,
          }}
          transition={{ duration: 0.85 }}
          style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}
        />

        <motion.div
          animate={{ x: [0, 26, 0], y: [0, -14, 0], opacity: [0.22, 0.34, 0.22] }}
          transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            width: '42vh',
            height: '42vh',
            left: '6%',
            top: '12%',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${combo.blob}18 0%, ${combo.blob}06 42%, transparent 72%)`,
            filter: 'blur(18px)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        <motion.div
          animate={{ x: [0, -18, 0], y: [0, 18, 0], opacity: [0.1, 0.18, 0.1] }}
          transition={{ duration: 8.4, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            width: '30vh',
            height: '30vh',
            left: '24%',
            bottom: '10%',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${combo.blob}15 0%, transparent 70%)`,
            filter: 'blur(14px)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        {/* ── LEFT VERTICAL DOTS ── */}
        <div className="showcase-dots" style={{ position: 'absolute', left: '24px', top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: '10px', zIndex: 5 }}>
          {showcaseCombos.map((_, i) => (
            <motion.div
              key={i}
              animate={{ height: active === i ? 28 : 7, backgroundColor: active === i ? combo.blob : 'rgba(0,0,0,0.18)' }}
              transition={{ duration: 0.35 }}
              style={{ width: 8, borderRadius: 99 }}
            />
          ))}
        </div>

        {/* ── Animated circle stack (pastel double rings + bubbles) ── */}
        <motion.div
          animate={{ scale: [1, 1.02, 1], opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            width: `${orbitRadius * 2 + 26}vh`,
            height: `${orbitRadius * 2 + 26}vh`,
            borderRadius: '50%',
            top: '50%',
            left: circleLeft,
            x: '-50%',
            y: '-50%',
            border: `16px solid ${(combo as any).ringOuter ?? combo.blob}55`, // outer ring keyed to combo
            boxShadow: `0 0 32px ${(combo as any).ringOuter ?? combo.blob}33`,
            zIndex: 1,
          }}
        />
        <motion.div
          animate={{ scale: [1, 0.98, 1], opacity: [0.6, 0.8, 0.6] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
          style={{
            position: 'absolute',
            width: `${orbitRadius * 2 + 8}vh`,
            height: `${orbitRadius * 2 + 8}vh`,
            borderRadius: '50%',
            top: '50%',
            left: circleLeft,
            x: '-50%',
            y: '-50%',
            border: `14px solid ${(combo as any).ringInner ?? combo.accent}55`, // inner ring keyed to accent
            boxShadow: `0 0 26px ${(combo as any).ringInner ?? combo.accent}33`,
            zIndex: 1,
          }}
        />
        {/* orbiting highlight */}
        <motion.div
          style={{
            position: 'absolute',
            width: `${orbitRadius * 2 + 26}vh`,
            height: `${orbitRadius * 2 + 26}vh`,
            borderRadius: '50%',
            top: '50%',
            left: circleLeft,
            x: '-50%',
            y: '-50%',
            zIndex: 2,
            pointerEvents: 'none',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        >
          <div style={{
            position: 'absolute',
            top: '-10px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '18px',
            height: '18px',
            borderRadius: '50%',
            background: `radial-gradient(circle, #fff 0%, ${(combo as any).ringOuter ?? combo.blob}44 60%, ${(combo as any).ringInner ?? combo.blob}cc 95%)`,
            boxShadow: `0 0 24px ${(combo as any).ringOuter ?? combo.blob}aa`,
          }} />
        </motion.div>
        {/* soft bubbles */}
        {[
          { x: '18%', y: '18%', size: 46, delay: 0 },
          { x: '42%', y: '8%',  size: 36, delay: 0.8 },
          { x: '10%', y: '65%', size: 30, delay: 0.4 },
          { x: '34%', y: '78%', size: 54, delay: 1.2 },
        ].map((b, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -8, 0], x: [0, 6, 0], opacity: [0.65, 0.9, 0.65] }}
            transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut', delay: b.delay }}
            style={{
              position: 'absolute',
              top: b.y,
              left: b.x,
              width: b.size,
              height: b.size,
              borderRadius: '50%',
              background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9) 0%, ${(combo as any).ringOuter ?? combo.blob}aa 55%, ${(combo as any).ringInner ?? combo.blob}55 75%, transparent 100%)`,
              boxShadow: `0 8px 18px ${(combo as any).ringOuter ?? combo.blob}33`,
              backdropFilter: 'blur(4px)',
              zIndex: 1,
            }}
          />
        ))}

        <motion.div
          animate={{ opacity: [0.32, 0.52, 0.32] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            width: `${orbitRadius * 2 + 2}vh`,
            height: `${orbitRadius * 2 + 2}vh`,
            borderRadius: '50%',
            top: '50%',
            left: circleLeft,
            x: '-50%',
            y: '-50%',
            zIndex: 1,
            border: `3.5px solid ${combo.blob}60`,
            boxShadow: `0 0 26px ${combo.blob}30 inset`,
          }}
        />

        <motion.div
          animate={{
            boxShadow: [
              `0 0 0 2px ${combo.blob}40, 0 0 32px ${combo.blob}26, inset 0 0 0 2px ${combo.blob}1c`,
              `0 0 0 4px ${combo.blob}70, 0 0 60px ${combo.blob}42, inset 0 0 0 4px ${combo.blob}26`,
              `0 0 0 2px ${combo.blob}40, 0 0 32px ${combo.blob}26, inset 0 0 0 2px ${combo.blob}1c`,
            ],
          }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            width: `${orbitRadius * 2}vh`,
            height: `${orbitRadius * 2}vh`,
            borderRadius: '50%',
            top: '50%',
            left: circleLeft,
            x: '-50%',
            y: '-50%',
            rotate: rotation,
            zIndex: 1,
            background: `radial-gradient(circle, transparent 72%, ${combo.blob}10 79%, transparent 100%)`,
            border: `5px solid ${combo.blob}dd`,
            transition: 'border-color 0.65s ease',
          }}
        />

        <motion.div
          animate={{ opacity: [0.32, 0.56, 0.32] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            width: `${orbitRadius * 2 - 2}vh`,
            height: `${orbitRadius * 2 - 2}vh`,
            borderRadius: '50%',
            top: '50%',
            left: circleLeft,
            x: '-50%',
            y: '-50%',
            zIndex: 1,
            border: `2.5px solid ${combo.blob}80`,
            boxShadow: `inset 0 0 34px ${combo.blob}22`,
          }}
        />

        <motion.div
          animate={{ opacity: [0.2, 0.38, 0.2] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            width: `${orbitRadius * 2 - 8}vh`,
            height: `${orbitRadius * 2 - 8}vh`,
            borderRadius: '50%',
            top: '50%',
            left: circleLeft,
            x: '-50%',
            y: '-50%',
            zIndex: 1,
            border: `2px solid ${combo.blob}55`,
          }}
        />

        <motion.div
          animate={{ opacity: [0.22, 0.42, 0.22] }}
          transition={{ duration: 3.1, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            width: `${orbitRadius * 2 - 14}vh`,
            height: `${orbitRadius * 2 - 14}vh`,
            borderRadius: '50%',
            top: '50%',
            left: circleLeft,
            x: '-50%',
            y: '-50%',
            zIndex: 1,
            background: `radial-gradient(circle, ${combo.blob}20 0%, transparent 66%)`,
            boxShadow: `inset 0 0 48px ${combo.blob}20`,
          }}
        />

        {/* ── FOOD IMAGE - slides from above, time-based with active change ── */}
        <div
          className="showcase-image-wrap"
          style={{
            position: 'absolute',
            top: '45%',
            left: '18%',
            transform: 'translate(-50%, -50%)',
            width: '46vh',
            zIndex: 3,
          }}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={`img-${active}`}
              src={combo.image}
              alt={combo.name}
              initial={{ opacity: 0, scale: 0.88, rotate: -4, filter: 'blur(10px)' }}
              animate={{
                opacity: 1,
                scale: [0.88, 1.06, 1],
                rotate: [-4, 1.5, 0],
                filter: ['blur(10px)', 'blur(2px)', 'blur(0px)'],
              }}
              exit={{ opacity: 0, scale: 0.94, rotate: -2, filter: 'blur(8px)' }}
              transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
              style={{
                width: '100%', height: 'auto', objectFit: 'contain', display: 'block',
                borderRadius: '24px',
                filter: 'drop-shadow(0 22px 44px rgba(0,0,0,0.22))',
              }}
            />
          </AnimatePresence>
        </div>

        {/* ── RIGHT GLASSMORPHISM CARD ── */}
        <div className="showcase-card" style={{
          position: 'absolute', right: '3%', top: '50%', transform: 'translateY(-50%)',
          width: 'min(640px, 50vw)',
          zIndex: 5,
          padding: '12px',
        }}>
          <div style={{
            position: 'relative',
            borderRadius: '24px',
            overflow: 'hidden',
            background: `linear-gradient(120deg, ${(combo as any).ringOuter ?? combo.blob}14 0%, #fff 45%, ${(combo as any).ringInner ?? combo.accent}12 100%)`,
            boxShadow: `0 28px 80px ${(combo as any).ringInner ?? combo.accent}25`,
            border: `1px solid ${(combo as any).ringOuter ?? combo.blob}30`,
            backdropFilter: 'blur(6px)',
          }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.5) 0%, transparent 45%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', right: 18, top: 18, width: 64, height: 64, borderRadius: '50%', background: `${combo.blob}18`, filter: 'blur(12px)' }} />

            <AnimatePresence mode="wait">
              <motion.div
                key={`card-${active}`}
                initial={{ opacity: 0, x: 60, rotate: 2 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                exit={{ opacity: 0, x: -40, rotate: -2 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{ position: 'relative', padding: '26px 28px 26px 26px', display: 'grid', gap: '10px' }}
              >
                <motion.div
                  animate={{ backgroundColor: combo.blob, boxShadow: `0 10px 30px ${combo.blob}55` }}
                  transition={{ duration: 0.45 }}
                  style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 56, height: 56, borderRadius: '16px', color: '#fff', fontWeight: 900, fontSize: '1.3rem', letterSpacing: '-0.02em' }}
                >
                  0{active + 1}
                </motion.div>

                <div style={{ display: 'grid', gap: '6px' }}>
                  <motion.h3
                    style={{ margin: 0, color: '#130c06', fontSize: 'clamp(1.25rem, 2.4vw, 1.8rem)', fontWeight: 900, letterSpacing: '-0.03em' }}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.05 }}
                  >
                    {combo.name.replace('\n', ' ')}
                  </motion.h3>
                  <motion.p
                    style={{ margin: 0, color: combo.blob, fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em' }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.12 }}
                  >
                    {combo.label}
                  </motion.p>
                </div>

                <motion.p
                  style={{ margin: '2px 0 6px', color: '#4c3a2a', fontSize: '0.9rem', lineHeight: 1.75, maxWidth: '520px' }}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.18 }}
                >
                  {combo.desc}
                </motion.p>

                <motion.div
                  style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.06, delayChildren: 0.24 } },
                  }}
                >
                  {combo.highlights.map((h) => (
                    <motion.span
                      key={h}
                      variants={{ hidden: { y: 10, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '999px',
                        background: `${combo.blob}16`,
                        color: combo.accent,
                        fontSize: '0.78rem',
                        fontWeight: 800,
                        letterSpacing: '0.02em',
                        boxShadow: `0 6px 16px ${combo.blob}20`,
                        border: `1px solid ${combo.blob}28`,
                      }}
                    >
                      {h}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── BOTTOM THUMBNAIL ROW WITH ARROWS ── */}
        <div className="showcase-thumbnails" style={{
          position: 'absolute', bottom: '5%', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', alignItems: 'center', gap: '18px', zIndex: 5,
        }}>
          <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(0,0,0,0.1)', fontSize: '1.2rem', color: '#555', userSelect: 'none' }}>‹</div>

          {showcaseCombos.map((item, i) => {
            const isActive = i === active;
            return (
              <motion.div
                key={i}
                animate={{ scale: isActive ? 1.22 : 0.88, y: isActive ? -10 : 0 }}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '7px' }}
              >
                <motion.div
                  animate={{ boxShadow: isActive ? `0 10px 30px ${item.blob}60, 0 0 0 3px ${item.blob}` : '0 4px 12px rgba(0,0,0,0.10)' }}
                  transition={{ duration: 0.4 }}
                  style={{ width: 68, height: 68, borderRadius: '50%', overflow: 'hidden', border: isActive ? `2.5px solid ${item.blob}` : '2px solid rgba(255,255,255,0.8)', background: '#fff' }}
                >
                  <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </motion.div>
                <motion.span
                  animate={{ color: isActive ? item.blob : '#999', fontWeight: isActive ? 700 : 400 }}
                  style={{ fontSize: '0.6rem', textAlign: 'center', lineHeight: 1.2, maxWidth: '72px' }}
                >
                  {item.name.replace('\n', ' ')}
                </motion.span>
              </motion.div>
            );
          })}

          <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(0,0,0,0.1)', fontSize: '1.2rem', color: '#555', userSelect: 'none' }}>›</div>
        </div>

      </div>
    </div>
  );
};

/* ─── Main Combos Page ─── */
const Combos = () => {
  const items = useMemo(() => featuredCombos, []);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, 2800);
    return () => window.clearInterval(timer);
  }, [items.length]);

  return (
    <MainLayout>
      <section
        className="min-h-screen"
        style={{
          position: 'relative',
          background: `linear-gradient(160deg, ${items[activeIndex].accent}0f 0%, #faf8f5 45%, ${items[activeIndex].accent}12 100%)`,
          overflow: 'clip',
          transition: 'background 0.6s ease',
        }}
      >
        {/* Blobs */}
        {floatingBlobs.map((blob, i) => (
          <motion.div key={i}
            style={{ position: 'absolute', width: blob.size, height: blob.size, borderRadius: '50%', background: `radial-gradient(circle, ${blob.color} 0%, transparent 70%)`, left: blob.x, top: blob.y, filter: 'blur(18px)', pointerEvents: 'none', zIndex: 0 }}
            animate={{ scale: [1, 1.18, 0.92, 1.12, 1], x: [0, 28, -18, 14, 0], y: [0, -20, 24, -10, 0] }}
            transition={{ duration: blob.duration, delay: blob.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}

        {/* Particles */}
        {particles.map((p) => (
          <motion.div key={p.id}
            style={{ position: 'absolute', left: p.x, top: p.y, width: p.size, height: p.size, borderRadius: '50%', background: p.id % 2 === 0 ? '#fd0802' : '#f4a62a', opacity: p.opacity, pointerEvents: 'none', zIndex: 0 }}
            animate={{ y: [0, -18, 6, -12, 0], x: [0, 8, -6, 4, 0], scale: [1, 1.3, 0.8, 1.1, 1] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}

        {/* Rings */}
        <motion.div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', border: '1.5px solid rgba(233,108,51,0.15)', left: '-120px', top: '30%', pointerEvents: 'none', zIndex: 0 }}
          animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }} />
        <motion.div style={{ position: 'absolute', width: 340, height: 340, borderRadius: '50%', border: '1px solid rgba(244,166,42,0.15)', right: '-60px', top: '-60px', pointerEvents: 'none', zIndex: 0 }}
          animate={{ rotate: -360 }} transition={{ duration: 22, repeat: Infinity, ease: 'linear' }} />

        <main className="max-w-7xl mx-auto px-6 py-4 lg:px-10 lg:py-6" style={{ position: 'relative', zIndex: 1 }}>

          {/* ── HERO CAROUSEL ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" style={{ minHeight: '78vh' }}>
            <motion.div
              initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: '-80px' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: 'flex', flexDirection: 'column', gap: '18px', maxWidth: '540px' }}
            >
              <motion.p
                initial={{ opacity: 0, y: -16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: '-80px' }}
                transition={{ duration: 0.6, delay: 0.1 }}
                style={{ margin: 0, color: '#fd0802', fontSize: '0.78rem', fontWeight: 800, letterSpacing: '0.28em', textTransform: 'uppercase' }}
              >
                Combo Spotlight
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: '-80px' }}
                transition={{ duration: 0.75, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
                style={{ fontSize: 'clamp(2.3rem, 5vw, 4.4rem)', fontWeight: 900, color: '#1a1008', margin: 0, lineHeight: 0.94, letterSpacing: '-0.05em' }}
              >
                Pick Your Perfect Combo
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: '-80px' }}
                transition={{ duration: 0.65, delay: 0.28 }}
                style={{ color: '#6b5744', fontSize: '1rem', margin: 0, lineHeight: 1.85 }}
              >
                A focused combo experience works best here. The left side explains the offer, while the right side keeps all the attention on a rotating premium card showcase.
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: '-80px' }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              style={{ position: 'relative', minHeight: '620px', display: 'flex', alignItems: 'center', justifyContent: 'center', perspective: '1800px', overflow: 'hidden', padding: '28px 18px' }}
            >
              <div style={{ position: 'absolute', inset: '10% 8%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(233,108,51,0.18) 0%, rgba(255,200,120,0.08) 40%, transparent 72%)', filter: 'blur(12px)' }} />

              {items.map((item, index) => {
                let offset = index - activeIndex;
                if (offset > items.length / 2) offset -= items.length;
                if (offset < -items.length / 2) offset += items.length;
                const isActive = offset === 0;
                const absOffset = Math.abs(offset);
                const x = offset * 150;
                const y = absOffset === 0 ? 0 : absOffset === 1 ? 26 : 42;
                const scale = isActive ? 1 : absOffset === 1 ? 0.87 : 0.76;
                const rotateY = isActive ? 0 : offset > 0 ? -34 : 34;
                const opacity = isActive ? 1 : absOffset === 1 ? 0.78 : 0.3;
                const zIndex = isActive ? 30 : absOffset === 1 ? 20 : 10;
                return (
                  <motion.button key={item.name} type="button" onClick={() => setActiveIndex(index)}
                    initial={false}
                    animate={{ x, y, scale, rotateY, opacity }}
                    transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
                    style={{ position: 'absolute', width: 'min(100%, 360px)', borderRadius: '28px', overflow: 'hidden', border: isActive ? `2px solid ${item.accent}` : `1px solid ${item.accent}55`, background: isActive ? `linear-gradient(160deg, #ffffff 0%, ${item.accent}18 60%, ${item.accent}30 100%)` : '#fffdf9', boxShadow: isActive ? `0 32px 70px ${item.accent}55` : `0 16px 34px ${item.accent}28`, display: 'flex', flexDirection: 'column', transformStyle: 'preserve-3d', zIndex, cursor: 'pointer', textAlign: 'left' }}
                  >
                    <div style={{ position: 'relative', height: isActive ? '310px' : '260px' }}>
                      <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', top: '16px', left: '16px', display: 'inline-flex', alignItems: 'center', padding: '8px 12px', borderRadius: '999px', backgroundColor: 'rgba(255,248,237,0.86)', color: item.accent, fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', backdropFilter: 'blur(8px)' }}>
                        {item.category}
                      </div>
                    </div>
                    {isActive && (
                      <div style={{ padding: '16px 20px 20px', display: 'flex', flexDirection: 'column', gap: '8px', background: item.contentBg }}>
                        <h3 style={{ margin: 0, color: item.titleColor, fontSize: '1.15rem', fontWeight: 900, lineHeight: 1.1 }}>{item.name}</h3>
                        <p style={{ margin: 0, color: '#6b5744', fontSize: '0.82rem', lineHeight: 1.6 }}>{item.desc}</p>
                      </div>
                    )}
                  </motion.button>
                );
              })}
            </motion.div>
          </div>

          {/* Dots */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
            {items.map((item, index) => (
              <button key={item.name} type="button" onClick={() => setActiveIndex(index)}
                style={{ width: activeIndex === index ? '40px' : '10px', height: '10px', borderRadius: '999px', border: 'none', backgroundColor: activeIndex === index ? '#fd0802' : 'rgba(233,108,51,0.22)', transition: 'all 0.25s ease', cursor: 'pointer' }}
              />
            ))}
          </div>

          {/* ── SCROLL SHOWCASE ── */}
          <ScrollShowcase />

        </main>
      </section>
    </MainLayout>
  );
};

export default Combos;
