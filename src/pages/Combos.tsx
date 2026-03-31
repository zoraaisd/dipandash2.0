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
    desc: 'Every bite of the Crunch Combo is packed with crispy coated pieces, golden fries, and a chilled drink — a perfectly balanced everyday indulgence.',
    highlights: ['Crispy Chicken Bites', 'Golden Fries', 'Dipping Sauce', 'Chilled Drink'],
    image: '/compos/CrunchCombo.jpg',
    blob: '#f4a62a',
    accent: '#b07500',
  },
  {
    name: 'Fish &\nChips',
    label: 'Ocean Classic',
    tagline: 'Light. Fresh. Satisfying.',
    desc: 'A timeless classic reimagined — tender golden fish fillets with perfectly crisp chips and a side of tartar sauce. The sea never tasted this good.',
    highlights: ['Fish Fillet', 'Crispy Chips', 'Tartar Sauce', 'Lemon Wedge'],
    image: '/compos/fishchips.jpg',
    blob: '#d4a843',
    accent: '#7a5a10',
  },
  {
    name: 'Party\nBox',
    label: 'Share the Joy',
    tagline: 'Made to Share. Built to Impress.',
    desc: 'The Party Box is your go-to for group hangouts, game nights, and celebrations. Loaded with a mix of crowd-pleasers every single time.',
    highlights: ['Mixed Snacks', 'Loaded Fries', 'Dips Platter', 'Group Drinks'],
    image: '/compos/partybox.jpeg',
    blob: '#e07b3a',
    accent: '#8a3a10',
  },
  {
    name: 'Prawn\nCombo',
    label: 'Premium Seafood',
    tagline: 'Bold. Juicy. Premium.',
    desc: 'The Prawn Combo brings the ocean to your table — plump, seasoned prawns with crispy sides and a premium presentation that looks as good as it tastes.',
    highlights: ['Seasoned Prawns', 'Crispy Sides', 'Signature Sauce', 'Premium Plating'],
    image: '/compos/prawn.jpg',
    blob: '#e8845a',
    accent: '#9a3820',
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
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });

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
  const orbitRadius = 35;
  const circleLeft = '0%';
  const orbitDepth = orbitRadius * 0.92;

  // Circle rotates on scroll
  const rotation = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const reverseRotation = useTransform(scrollYProgress, [0, 1], [0, -220]);
  const orbitAngle = useTransform(scrollYProgress, [0, 1], [-90, 90]);
  const imageTilt = useTransform(scrollYProgress, [0, 0.5, 1], [-12, 0, 12]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1.02, 0.95]);

  // Image orbits the oval: starts at top (-90°) clockwise to 270° (full lap)
  // Oval semi-axes: a=32vh (horizontal), b=22vh (vertical) — matches the ring dimensions
  const orbitX = useTransform(orbitAngle, (a) => (window.innerHeight / 100) * orbitRadius * Math.cos((a * Math.PI) / 180));
  const orbitY = useTransform(orbitAngle, (a) => (window.innerHeight / 100) * orbitDepth * Math.sin((a * Math.PI) / 180));

  return (
    <div ref={containerRef} style={{ height: `${showcaseCombos.length * 100}vh`, marginTop: '80px', position: 'relative' }}>

      {/* ── Sticky full-screen frame ── */}
      <div style={{
        position: 'sticky', top: '56px',
        height: 'calc(100vh - 56px)',
        borderRadius: '28px',
        overflow: 'hidden',
        background: '#eeece8',
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
        <div style={{ position: 'absolute', left: '24px', top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: '10px', zIndex: 5 }}>
          {showcaseCombos.map((_, i) => (
            <motion.div
              key={i}
              animate={{ height: active === i ? 28 : 7, backgroundColor: active === i ? combo.blob : 'rgba(0,0,0,0.18)' }}
              transition={{ duration: 0.35 }}
              style={{ width: 4, borderRadius: 99 }}
            />
          ))}
        </div>

        {/* ── Animated circle stack ── */}
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.22, 0.34, 0.22],
          }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            width: `${orbitRadius * 2 + 10}vh`,
            height: `${orbitRadius * 2 + 10}vh`,
            borderRadius: '50%',
            top: '50%',
            left: circleLeft,
            x: '-50%',
            y: '-50%',
            zIndex: 1,
            background: `radial-gradient(circle, ${combo.blob}10 0%, ${combo.blob}08 38%, transparent 68%)`,
            filter: 'blur(14px)',
          }}
        />

        <motion.div
          animate={{ opacity: [0.12, 0.22, 0.12] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            width: `${orbitRadius * 2 + 16}vh`,
            height: `${orbitRadius * 2 + 16}vh`,
            borderRadius: '50%',
            top: '50%',
            left: circleLeft,
            x: '-50%',
            y: '-50%',
            zIndex: 1,
            border: `3px solid ${combo.blob}14`,
            boxShadow: `0 0 0 10px ${combo.blob}08`,
          }}
        />

        <motion.div
          animate={{ opacity: [0.14, 0.26, 0.14], scale: [1, 1.03, 1] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            width: `${orbitRadius * 2 + 20}vh`,
            height: `${orbitRadius * 2 + 20}vh`,
            borderRadius: '50%',
            top: '50%',
            left: circleLeft,
            x: '-50%',
            y: '-50%',
            zIndex: 1,
            border: `1.5px solid ${combo.blob}16`,
            boxShadow: `inset 0 0 0 1px ${combo.blob}10`,
          }}
        />

        <motion.div
          style={{
            position: 'absolute',
            width: `${orbitRadius * 2 + 7}vh`,
            height: `${orbitRadius * 2 + 7}vh`,
            borderRadius: '50%',
            top: '50%',
            left: circleLeft,
            x: '-50%',
            y: '-50%',
            rotate: reverseRotation,
            zIndex: 1,
            background: `conic-gradient(from 0deg, transparent 0deg, transparent 240deg, ${combo.blob}00 252deg, ${combo.blob}90 286deg, #fff9 304deg, ${combo.blob}70 325deg, transparent 360deg)`,
            boxShadow: `0 0 24px ${combo.blob}40`,
            WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 11px), #000 calc(100% - 11px), #000 calc(100% - 5px), transparent calc(100% - 5px))',
            mask: 'radial-gradient(farthest-side, transparent calc(100% - 11px), #000 calc(100% - 11px), #000 calc(100% - 5px), transparent calc(100% - 5px))',
          }}
        />

        <motion.div
          style={{
            position: 'absolute',
            width: `${orbitRadius * 2 + 5}vh`,
            height: `${orbitRadius * 2 + 5}vh`,
            borderRadius: '50%',
            top: '50%',
            left: circleLeft,
            x: '-50%',
            y: '-50%',
            rotate: reverseRotation,
            zIndex: 1,
            background: `conic-gradient(from 180deg, transparent 0deg, transparent 130deg, ${combo.blob}10 152deg, ${combo.blob}50 198deg, transparent 236deg, transparent 360deg)`,
            WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 14px), #000 calc(100% - 14px), #000 calc(100% - 10px), transparent calc(100% - 10px))',
            mask: 'radial-gradient(farthest-side, transparent calc(100% - 14px), #000 calc(100% - 14px), #000 calc(100% - 10px), transparent calc(100% - 10px))',
          }}
        />

        <motion.div
          style={{
            position: 'absolute',
            width: `${orbitRadius * 2 + 3}vh`,
            height: `${orbitRadius * 2 + 3}vh`,
            borderRadius: '50%',
            top: '50%',
            left: circleLeft,
            x: '-50%',
            y: '-50%',
            rotate: rotation,
            zIndex: 1,
            background: `conic-gradient(from 45deg, transparent 0deg, ${combo.blob}25 40deg, ${combo.blob}80 92deg, #fff7 112deg, transparent 150deg, transparent 360deg)`,
            WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 9px), #000 calc(100% - 9px), #000 calc(100% - 3px), transparent calc(100% - 3px))',
            mask: 'radial-gradient(farthest-side, transparent calc(100% - 9px), #000 calc(100% - 9px), #000 calc(100% - 3px), transparent calc(100% - 3px))',
          }}
        />

        <motion.div
          animate={{ opacity: [0.28, 0.46, 0.28] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            width: `${orbitRadius * 2 + 1}vh`,
            height: `${orbitRadius * 2 + 1}vh`,
            borderRadius: '50%',
            top: '50%',
            left: circleLeft,
            x: '-50%',
            y: '-50%',
            zIndex: 1,
            border: `2px solid ${combo.blob}35`,
            boxShadow: `0 0 18px ${combo.blob}18 inset`,
          }}
        />

        <motion.div
          animate={{
            boxShadow: [
              `0 0 0 2px ${combo.blob}35, 0 0 24px ${combo.blob}20, inset 0 0 0 2px ${combo.blob}18`,
              `0 0 0 3px ${combo.blob}60, 0 0 52px ${combo.blob}35, inset 0 0 0 4px ${combo.blob}22`,
              `0 0 0 2px ${combo.blob}35, 0 0 24px ${combo.blob}20, inset 0 0 0 2px ${combo.blob}18`,
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
            border: `4px solid ${combo.blob}`,
            transition: 'border-color 0.65s ease',
          }}
        />

        <motion.div
          animate={{ opacity: [0.26, 0.5, 0.26] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            width: `${orbitRadius * 2 - 4}vh`,
            height: `${orbitRadius * 2 - 4}vh`,
            borderRadius: '50%',
            top: '50%',
            left: circleLeft,
            x: '-50%',
            y: '-50%',
            zIndex: 1,
            border: `2px solid ${combo.blob}55`,
            boxShadow: `inset 0 0 28px ${combo.blob}14`,
          }}
        />

        <motion.div
          animate={{ opacity: [0.16, 0.3, 0.16] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            width: `${orbitRadius * 2 - 10}vh`,
            height: `${orbitRadius * 2 - 10}vh`,
            borderRadius: '50%',
            top: '50%',
            left: circleLeft,
            x: '-50%',
            y: '-50%',
            zIndex: 1,
            border: `1.5px solid ${combo.blob}35`,
          }}
        />

        <motion.div
          animate={{ opacity: [0.18, 0.34, 0.18] }}
          transition={{ duration: 3.1, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            width: `${orbitRadius * 2 - 16}vh`,
            height: `${orbitRadius * 2 - 16}vh`,
            borderRadius: '50%',
            top: '50%',
            left: circleLeft,
            x: '-50%',
            y: '-50%',
            zIndex: 1,
            background: `radial-gradient(circle, ${combo.blob}08 0%, transparent 62%)`,
            boxShadow: `inset 0 0 40px ${combo.blob}10`,
          }}
        />

        {/* ── FOOD IMAGE — orbits the oval clockwise from top on scroll ── */}
        {/* x/y offset from oval center computed from ellipse parametric equations */}
        <motion.div
          style={{
            position: 'absolute',
            top: '50%', left: circleLeft,
            width: 0, height: 0,
            zIndex: 3,
            x: orbitX,
            y: orbitY,
          }}
        >
          <motion.div
            style={{
              position: 'absolute',
              x: '-50%', y: '-50%',
              width: '25vh',
              rotate: imageTilt,
              scale: imageScale,
            }}
          >
            <motion.div
              animate={{ scale: [0.96, 1.02, 0.96], opacity: [0.2, 0.35, 0.2] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                inset: '-8%',
                borderRadius: '32px',
                background: `radial-gradient(circle, ${combo.blob}22 0%, transparent 72%)`,
                filter: 'blur(16px)',
                zIndex: 0,
              }}
            />
            <AnimatePresence mode="sync">
              <motion.img
                key={`img-${active}`}
                src={combo.image}
                alt={combo.name}
                initial={{ opacity: 0, scale: 0.7, filter: 'blur(12px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.1, filter: 'blur(8px)' }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  width: '100%', height: 'auto', objectFit: 'contain', display: 'block',
                  position: 'relative',
                  zIndex: 1,
                  borderRadius: '24px',
                  filter: 'drop-shadow(0 22px 44px rgba(0,0,0,0.22))',
                }}
              />
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* ── RIGHT GLASSMORPHISM CARD ── */}
        <div style={{
          position: 'absolute', right: '3%', top: '50%', transform: 'translateY(-50%)',
          width: 'min(600px, 48vw)', // Much larger width
          background: 'rgba(255,255,255,0.78)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderRadius: '24px',
          padding: '22px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.10), 0 0 0 1px rgba(255,255,255,0.65)',
          zIndex: 5,
        }}>
          {/* Section Title */}
          <h2 style={{
            fontSize: '1.35rem',
            fontWeight: 900,
            color: '#d97706',
            margin: '0 0 18px 0',
            letterSpacing: '-0.01em',
            lineHeight: 1.1,
            textTransform: 'uppercase',
            textAlign: 'left',
          }}>
            Combo Details
          </h2>
          <div style={{ display: 'flex', gap: '18px', marginBottom: '18px', borderBottom: '1px solid rgba(0,0,0,0.07)', paddingBottom: '12px' }}>
            <motion.span
              animate={{ color: '#1a1008', borderBottomColor: combo.blob }}
              transition={{ duration: 0.4 }}
              style={{ fontSize: '0.8rem', fontWeight: 800, paddingBottom: '12px', marginBottom: '-13px', borderBottom: '2.5px solid' }}
            >
              Overview
            </motion.span>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#bbb' }}>Highlights</span>
          </div>

          <AnimatePresence mode="sync">
            <motion.div
              key={`card-${active}`}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.42 }}
            >
              <motion.div
                animate={{ backgroundColor: combo.blob }}
                transition={{ duration: 0.5 }}
                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 48, height: 48, borderRadius: '14px', marginBottom: '12px' }}
              >
                <span style={{ fontSize: '1.3rem', fontWeight: 900, color: '#fff' }}>0{active + 1}</span>
              </motion.div>

              <h3 style={{ margin: '0 0 4px', color: '#1a1008', fontSize: 'clamp(1rem, 1.8vw, 1.35rem)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                {combo.name.replace('\n', ' ')}
              </h3>
              <p style={{ margin: '0 0 12px', color: combo.blob, fontSize: '0.68rem', fontWeight: 700 }}>
                {combo.label}
              </p>
              <p style={{ margin: '0 0 14px', color: '#6b5744', fontSize: '0.76rem', lineHeight: 1.72 }}>
                {combo.desc}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '18px' }}>
                {combo.highlights.map((h) => (
                  <span key={h} style={{ padding: '3px 9px', borderRadius: '999px', background: `${combo.blob}20`, color: combo.accent, fontSize: '0.66rem', fontWeight: 700 }}>
                    {h}
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <motion.button
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  animate={{ backgroundColor: combo.blob }}
                  transition={{ duration: 0.4 }}
                  style={{ flex: 1, padding: '10px', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '0.76rem', fontWeight: 800, cursor: 'pointer' }}
                >
                  Order Now
                </motion.button>
                <button style={{ width: 38, height: 38, borderRadius: '12px', border: '1.5px solid rgba(0,0,0,0.1)', background: 'transparent', cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>♡</button>
                <button style={{ width: 38, height: 38, borderRadius: '12px', border: '1.5px solid rgba(0,0,0,0.1)', background: 'transparent', cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>☆</button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── BOTTOM THUMBNAIL ROW WITH ARROWS ── */}
        <div style={{
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
        style={{ position: 'relative', background: 'linear-gradient(160deg, #faf8f5 0%, #f4ead8 100%)', overflow: 'clip' }}
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
