import { useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  motion,
  useInView,
} from 'framer-motion';
import { MapPin } from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';
import ROUTES from '../routes/routePaths';
import HeroSection from '../components/sections/HeroSection';


/* ─── Word-by-word reveal ─── */
const RevealText = ({
  text,
  style,
  delay = 0,
  stagger = 0.04,
  animate = false,
}: {
  text: string;
  style?: React.CSSProperties;
  delay?: number;
  stagger?: number;
  animate?: boolean;
}) => {
  const words = text.split(' ');
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const word = {
    hidden: { y: '110%', opacity: 0 },
    visible: {
      y: '0%',
      opacity: 1,
      transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
    },
  };
  return (
    <motion.span
      style={{ display: 'flex', flexWrap: 'wrap', gap: '0 0.28em', ...style }}
      variants={container}
      initial="hidden"
      {...(animate ? { animate: 'visible' } : { whileInView: 'visible' as const, viewport: { once: false, margin: '-60px' } })}
    >
      {words.map((w, i) => (
        <span key={i} style={{ overflow: 'hidden', display: 'inline-block' }}>
          <motion.span style={{ display: 'inline-block' }} variants={word}>
            {w}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
};

/* ─── Marquee strip ─── */
const items = ['Smash Burgers', 'Crispy Fries', 'Hot Wings', 'Premium Shakes', 'Chicken Pops', 'Korean Kick', 'Mojito Bar', 'Dessert Zone'];
const Marquee = ({ reverse = false, light = false }: { reverse?: boolean; light?: boolean }) => {
  const dup = [...items, ...items];
  return (
    <div style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
      <motion.div
        style={{ display: 'inline-flex' }}
        animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
      >
        {dup.map((item, i) => (
          <span
            key={i}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '16px',
              padding: '0 28px',
              fontSize: '0.72rem', fontWeight: 700,
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: light ? 'rgba(255,255,255,0.72)' : 'rgba(255,248,232,0.88)',
            }}
          >
            {item}
            <span style={{ color: '#fd0802', fontSize: '0.55rem' }}>◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};


/* ══════════════════════════════════════════════
   HOME
══════════════════════════════════════════════ */
const Home = () => {
  const navigate = useNavigate();

  /* Burger section scroll-replay */
  const burgerRef = useRef<HTMLDivElement>(null);
  const burgerInView = useInView(burgerRef, { amount: 0.15 });

  /* Burger list scroll-replay (independent) */
  const burgerListRef = useRef<HTMLDivElement>(null);
  const burgerListInView = useInView(burgerListRef, { amount: 0.2 });

  /* Drinks list scroll-replay (independent) */
  const drinksListRef = useRef<HTMLDivElement>(null);
  const drinksListInView = useInView(drinksListRef, { amount: 0.2 });

  /* Drinks section scroll-replay */
  const drinksRef = useRef<HTMLDivElement>(null);
  const drinksInView = useInView(drinksRef, { amount: 0.15 });

  return (
    <MainLayout>

      {/* ══════════════════════════════
          §1  HERO
      ══════════════════════════════ */}
      <HeroSection />


      {/* ══════════════════════════════
          s2  BURGER SECTION
      ══════════════════════════════ */}
      

      <section style={{ position: 'relative', overflow: 'hidden', backgroundColor: '#ede0ce' }}>

        {/* Body */}
        <div style={{ backgroundColor: '#ede0ce', position: 'relative', padding: '20px 0 30px' }}>

          {/* ── Background effects ── */}
          <motion.div
            style={{ position: 'absolute', top: '-60px', right: '-80px', width: '480px', height: '480px', borderRadius: '50%', background: 'radial-gradient(circle at 60% 40%, rgba(233,108,51,0.20) 0%, rgba(245,140,0,0.08) 50%, transparent 75%)', pointerEvents: 'none', filter: 'blur(38px)' }}
            animate={{ scale: [1, 1.15, 1], x: [0, -25, 0], y: [0, 18, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            style={{ position: 'absolute', bottom: '-50px', left: '-60px', width: '420px', height: '420px', borderRadius: '50%', background: 'radial-gradient(circle at 40% 60%, rgba(180,90,20,0.13) 0%, rgba(233,108,51,0.07) 50%, transparent 75%)', pointerEvents: 'none', filter: 'blur(34px)' }}
            animate={{ scale: [1, 1.2, 1], x: [0, 22, 0] }}
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />
          {[
            { top: '12%', left: '38%',  size: 8,  color: '#fd0802', dur: 4.0, delay: 0.0 },
            { top: '70%', right: '30%', size: 6,  color: '#f5a800', dur: 5.2, delay: 0.7 },
            { top: '40%', left: '5%',   size: 7,  color: '#fd0802', dur: 4.8, delay: 1.2 },
            { top: '80%', right: '6%',  size: 9,  color: '#f5a800', dur: 6.0, delay: 0.4 },
            { top: '22%', right: '5%',  size: 5,  color: '#fd0802', dur: 5.5, delay: 1.5 },
          ].map((d, i) => (
            <motion.div key={i}
              style={{ position: 'absolute', top: d.top, left: (d as any).left, right: (d as any).right, width: d.size, height: d.size, borderRadius: '50%', backgroundColor: d.color, opacity: 0.5, pointerEvents: 'none' }}
              animate={{ y: [0, -16, 0], opacity: [0.5, 0.85, 0.5], scale: [1, 1.3, 1] }}
              transition={{ duration: d.dur, repeat: Infinity, ease: 'easeInOut', delay: d.delay }}
            />
          ))}
          {[
            { top: '15%', left: '32%', size: 44, delay: 0.0 },
            { top: '60%', right: '3%', size: 32, delay: 1.2 },
            { top: '25%', right: '22%',size: 38, delay: 0.6 },
          ].map((r, i) => (
            <motion.div key={i}
              style={{ position: 'absolute', top: r.top, left: (r as any).left, right: (r as any).right, width: r.size, height: r.size, borderRadius: '50%', border: '2px solid rgba(233,108,51,0.3)', pointerEvents: 'none' }}
              animate={{ scale: [1, 1.7, 1], opacity: [0.45, 0.08, 0.45] }}
              transition={{ duration: 4.5 + i * 0.7, repeat: Infinity, ease: 'easeInOut', delay: r.delay }}
            />
          ))}

          <div className="max-w-7xl mx-auto px-6 lg:px-16" style={{ position: 'relative', zIndex: 1 }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

              {/* LEFT - burger image with background */}
              <motion.div
                ref={burgerRef}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '420px', position: 'relative' }}
                initial="hidden"
                animate={burgerInView ? 'visible' : 'hidden'}
              >
                <div style={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                {/* Warm glow circle behind burger */}
                <motion.div
                  style={{ position: 'absolute', top: '50%', left: '50%', translateX: '-50%', translateY: '-50%', width: '320px', height: '320px', borderRadius: '50%', background: 'radial-gradient(circle at 45% 40%, #f5c898 0%, #ebb87a 55%, #d9925a 100%)', zIndex: 0, pointerEvents: 'none' }}
                  variants={{ hidden: { opacity: 0, scale: 0.5 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.6, delay: 1.1 } } }}
                />
                {/* Spinning dashed ring */}
                <motion.div
                  style={{ position: 'absolute', top: '50%', left: '50%', translateX: '-50%', translateY: '-50%', width: '370px', height: '370px', borderRadius: '50%', border: '2px dashed rgba(233,108,51,0.45)', zIndex: 0, pointerEvents: 'none' }}
                  variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.4, delay: 1.25 } } }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
                />
                {/* Orbiting dot */}
                <motion.div
                  style={{ position: 'absolute', top: '50%', left: '50%', translateX: '-50%', translateY: '-50%', width: '370px', height: '370px', borderRadius: '50%', zIndex: 0, pointerEvents: 'none' }}
                  variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.3, delay: 1.3 } } }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
                >
                  <div style={{ position: 'absolute', top: '-6px', left: '50%', transform: 'translateX(-50%)', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#fd0802', boxShadow: '0 0 8px rgba(233,108,51,0.7)' }} />
                </motion.div>

                {/* Burger image - flies in from left */}
                <motion.img
                  src="/home/aniburger.png"
                  alt="Smash Burger"
                  style={{ width: '360px', height: '360px', objectFit: 'contain', position: 'relative', zIndex: 2, filter: 'drop-shadow(0 14px 32px rgba(150,70,0,0.25))' }}
                  variants={{
                    hidden:  { x: '-280%', y: '0%', rotate: -30, opacity: 0 },
                    visible: { x: '0%',   y: '0%',  rotate: 0,   opacity: 1,
                      transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number] }
                    },
                  }}
                />
                </div>
              </motion.div>

              {/* RIGHT - title + burger list */}
              <div className="flex flex-col gap-5">

                {/* Title */}
                <motion.p
                  style={{ color: '#fd0802', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.26em', textTransform: 'uppercase', margin: 0 }}
                  initial={{ opacity: 0, x: 30 }}
                  animate={burgerInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Smash Burgers
                </motion.p>

                <motion.div
                  style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 900, color: '#1a1a1a', lineHeight: 1.1, letterSpacing: '-0.02em' }}
                  initial={{ opacity: 0, x: 30 }}
                  animate={burgerInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  Bold. Juicy.<br />Unforgettable.
                </motion.div>

                {/* Burger list */}
                <div ref={burgerListRef} className="flex flex-col gap-5" style={{ marginTop: '12px' }}>
                  {[
                    { img: '/home/burger1.png', name: 'Chicken Burgers', tag: 'Fan Favourite',  size: '88px', category: 'Chicken Burgers' },
                    { img: '/home/burger2.png', name: 'Beef Burgers',    tag: 'Bestseller',     size: '74px', category: 'Beef Burgers'    },
                    { img: '/home/burger3.png', name: 'Fish Burgers',    tag: 'Light & Crispy', size: '88px', category: 'Fish Burgers'    },
                  ].map((b, i) => (
                    <motion.div
                      key={i}
                      onClick={() => navigate(ROUTES.FOOD_AND_DRINKS, { state: { category: b.category } })}
                      style={{ position: 'relative', cursor: 'pointer', minHeight: '98px', display: 'grid', gridTemplateColumns: '94px minmax(0, 1fr)', alignItems: 'center', columnGap: '2px' }}
                      initial={{ opacity: 0, x: 90, rotate: 4 }}
                      animate={burgerListInView ? { opacity: 1, x: 0, rotate: 0 } : { opacity: 0, x: 90, rotate: 4 }}
                      transition={{ duration: 0.65, delay: i * 0.16, ease: [0.34, 1.2, 0.64, 1] as [number,number,number,number] }}
                    >
                      {/* Image on pole */}
                      <motion.div
                        style={{ gridColumn: '1 / 2', justifySelf: 'center', alignSelf: 'center', zIndex: 3, width: '84px', height: '84px', borderRadius: '50%', background: 'radial-gradient(circle at 35% 30%, rgba(255,244,214,0.96) 0%, rgba(245,210,140,0.9) 58%, rgba(230,170,78,0.75) 100%)', border: '1px solid rgba(233,108,51,0.18)', boxShadow: '0 10px 24px rgba(180,110,20,0.22), inset 0 1px 0 rgba(255,255,255,0.72)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        initial={{ scale: 0, rotate: -30, opacity: 0 }}
                        animate={burgerListInView ? { scale: 1, rotate: 0, opacity: 1 } : { scale: 0, rotate: -30, opacity: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 + i * 0.16, ease: [0.34, 1.56, 0.64, 1] as [number,number,number,number] }}
                        whileHover={{ scale: 1.16, rotate: -10, y: -5, transition: { duration: 0.25 } }}
                      >
                        <img src={b.img} alt={b.name} style={{ width: b.size, height: b.size, objectFit: 'contain', filter: 'drop-shadow(0 14px 28px rgba(0,0,0,0.28))' }} />
                      </motion.div>

                      {/* Flag / pennant shape */}
                      <motion.div
                        style={{ gridColumn: '2 / 3', clipPath: 'polygon(0 0, 91% 0, 100% 50%, 91% 100%, 0 100%)', background: 'linear-gradient(125deg, #f7e8c8 0%, #edd9a3 45%, #e2c87a 100%)', padding: '16px 44px 16px 24px', position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', boxShadow: '2px 4px 18px rgba(100,60,0,0.22), inset 0 1px 0 rgba(255,255,255,0.5)' }}
                        whileHover={{ x: 7, boxShadow: '4px 8px 28px rgba(100,60,0,0.30), inset 0 1px 0 rgba(255,255,255,0.5)', transition: { duration: 0.22 } }}
                      >
                        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(160,100,20,0.04) 3px, rgba(160,100,20,0.04) 4px)', pointerEvents: 'none' }} />
                        <p style={{ margin: '0 0 3px', fontSize: '0.62rem', fontStyle: 'italic', fontWeight: 600, color: '#9a6520', letterSpacing: '0.08em' }}>- 0{i + 1} · {b.tag}</p>
                        <p style={{ margin: '0 0 4px', fontSize: '1.22rem', fontWeight: 900, color: '#2c1504', letterSpacing: '-0.01em', lineHeight: 1.1 }}>{b.name}</p>
                        <div style={{ width: '36px', height: '1.5px', background: 'linear-gradient(90deg, #c87820, rgba(200,120,32,0))', borderRadius: '2px' }} />
                      </motion.div>
                    </motion.div>
                  ))}
                </div>

                {/* Button */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={burgerListInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  style={{ marginTop: '8px', paddingLeft: '72px' }}
                >
                  <NavLink
                    to={ROUTES.FOOD_AND_DRINKS}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '13px 32px', borderRadius: '50px', border: '1.5px solid #fd0802', color: '#fd0802', fontWeight: 700, fontSize: '0.88rem', textDecoration: 'none' }}
                  >
                    See All Burgers →
                  </NavLink>
                </motion.div>

              </div>

            </div>
          </div>
        </div>

        {/* Wave bottom */}
        <div style={{ lineHeight: 0, backgroundColor: '#ede0ce' }}>
          <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%' }}>
            <path d="M0,40 C180,0 360,80 540,40 C720,0 900,80 1080,40 C1260,0 1380,60 1440,40 L1440,80 L0,80 Z" fill="#ede0ce" />
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════
          §3  DRINK - single image slide-in
      ══════════════════════════════ */}
      <section style={{ position: 'relative', overflow: 'hidden', backgroundColor: '#ede0ce' }}>

        {/* Wave top */}
        <div style={{ lineHeight: 0 }}>
          <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%' }}>
            <path d="M0,40 C180,80 360,0 540,40 C720,80 900,0 1080,40 C1260,80 1380,20 1440,40 L1440,0 L0,0 Z" fill="#ede0ce" />
          </svg>
        </div>

        {/* Body */}
        <div style={{ backgroundColor: '#ede0ce', position: 'relative', padding: '20px 0 30px' }}>

          {/* ── Background animations ── */}

          {/* Large gradient orb - top left */}
          <motion.div
            style={{ position: 'absolute', top: '-80px', left: '-80px', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle at 40% 40%, rgba(233,108,51,0.22) 0%, rgba(245,168,0,0.10) 50%, transparent 75%)', pointerEvents: 'none', filter: 'blur(40px)' }}
            animate={{ scale: [1, 1.15, 1], x: [0, 30, 0], y: [0, 20, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Large gradient orb - bottom right */}
          <motion.div
            style={{ position: 'absolute', bottom: '-60px', right: '-60px', width: '460px', height: '460px', borderRadius: '50%', background: 'radial-gradient(circle at 60% 60%, rgba(249,176,184,0.35) 0%, rgba(233,108,51,0.12) 50%, transparent 75%)', pointerEvents: 'none', filter: 'blur(36px)' }}
            animate={{ scale: [1, 1.2, 1], x: [0, -25, 0], y: [0, -15, 0] }}
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          />
          {/* Mid accent orb */}
          <motion.div
            style={{ position: 'absolute', top: '20%', left: '38%', width: '280px', height: '280px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,168,0,0.14) 0%, transparent 70%)', pointerEvents: 'none', filter: 'blur(28px)' }}
            animate={{ scale: [1, 1.35, 1], y: [0, -30, 0] }}
            transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          />

          {/* Floating dots */}
          {[
            { top: '10%', left: '6%',   size: 10, color: '#fd0802', dur: 4.0, delay: 0.0 },
            { top: '72%', left: '4%',   size: 7,  color: '#f5a800', dur: 5.5, delay: 0.9 },
            { top: '18%', left: '26%',  size: 6,  color: '#fd0802', dur: 3.8, delay: 1.3 },
            { top: '60%', left: '20%',  size: 9,  color: '#f9b0b8', dur: 6.2, delay: 0.5 },
            { top: '85%', left: '42%',  size: 6,  color: '#fd0802', dur: 4.8, delay: 1.6 },
            { top: '8%',  right: '20%', size: 7,  color: '#f5a800', dur: 5.0, delay: 0.7 },
            { top: '78%', right: '4%',  size: 10, color: '#fd0802', dur: 4.5, delay: 1.1 },
            { top: '42%', left: '10%',  size: 5,  color: '#f5a800', dur: 7.0, delay: 2.0 },
            { top: '35%', right: '12%', size: 6,  color: '#f9b0b8', dur: 5.8, delay: 0.3 },
          ].map((d, i) => (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                top: d.top, left: (d as any).left, right: (d as any).right,
                width: d.size, height: d.size,
                borderRadius: '50%',
                backgroundColor: d.color,
                opacity: 0.55,
                pointerEvents: 'none',
              }}
              animate={{ y: [0, -18, 0], opacity: [0.55, 0.9, 0.55], scale: [1, 1.3, 1] }}
              transition={{ duration: d.dur, repeat: Infinity, ease: 'easeInOut', delay: d.delay }}
            />
          ))}

          {/* Pulsing rings */}
          {[
            { top: '14%', left: '12%',  size: 50, delay: 0.0 },
            { top: '68%', left: '30%',  size: 36, delay: 1.4 },
            { top: '20%', right: '16%', size: 44, delay: 0.8 },
            { top: '55%', right: '8%',  size: 30, delay: 2.0 },
          ].map((r, i) => (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                top: r.top, left: (r as any).left, right: (r as any).right,
                width: r.size, height: r.size,
                borderRadius: '50%',
                border: '2px solid rgba(233,108,51,0.35)',
                pointerEvents: 'none',
              }}
              animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0.1, 0.5] }}
              transition={{ duration: 4 + i * 0.8, repeat: Infinity, ease: 'easeInOut', delay: r.delay }}
            />
          ))}

          {/* Sparkle crosses */}
          {[
            { top: '30%', left: '3%',   delay: 0.5 },
            { top: '50%', left: '33%',  delay: 1.8 },
            { top: '15%', right: '10%', delay: 1.0 },
          ].map((s, i) => (
            <motion.div
              key={i}
              style={{ position: 'absolute', top: s.top, left: (s as any).left, right: (s as any).right, pointerEvents: 'none' }}
              animate={{ rotate: [0, 90, 180], opacity: [0.5, 1, 0.5], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 3.5 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: s.delay }}
            >
              <div style={{ position: 'relative', width: '16px', height: '16px' }}>
                <div style={{ position: 'absolute', top: '50%', left: 0, width: '100%', height: '2px', backgroundColor: '#fd0802', transform: 'translateY(-50%)', borderRadius: '2px', opacity: 0.6 }} />
                <div style={{ position: 'absolute', left: '50%', top: 0, width: '2px', height: '100%', backgroundColor: '#fd0802', transform: 'translateX(-50%)', borderRadius: '2px', opacity: 0.6 }} />
              </div>
            </motion.div>
          ))}

          <div className="max-w-7xl mx-auto px-6 lg:px-16" style={{ position: 'relative', zIndex: 1 }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

              {/* LEFT - title + drinks list */}
              <div className="flex flex-col gap-5">

                {/* Title */}
                <motion.p
                  style={{ color: '#fd0802', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.26em', textTransform: 'uppercase', margin: 0 }}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Premium Drinks
                </motion.p>
                <motion.div
                  style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 900, color: '#1a1a1a', lineHeight: 1.1, letterSpacing: '-0.02em' }}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  Crafted for Every<br />Craving.
                </motion.div>

                {/* Drinks list */}
                <div ref={drinksListRef} className="flex flex-col gap-5" style={{ marginTop: '12px' }}>
                  {[
                    { img: '/home/coldcoffee.png', name: 'Cold Coffee',    tag: 'Smooth & Creamy',   category: 'Premium Shakes' },
                    { img: '/home/mojito.png',     name: 'Blue Mojito',    tag: 'Cool & Refreshing', category: 'Mojito Bar'     },
                    { img: '/home/dessert.png',    name: 'Dessert Special',tag: 'Sweet & Indulgent', category: 'Dessert Zone'   },
                  ].map((d, i) => (
                    <motion.div
                      key={i}
                      onClick={() => navigate(ROUTES.FOOD_AND_DRINKS, { state: { category: d.category } })}
                      style={{ position: 'relative', cursor: 'pointer', minHeight: '98px', display: 'grid', gridTemplateColumns: '94px minmax(0, 1fr)', alignItems: 'center', columnGap: '2px' }}
                      initial={{ opacity: 0, x: -90, rotate: -4 }}
                      animate={drinksListInView ? { opacity: 1, x: 0, rotate: 0 } : { opacity: 0, x: -90, rotate: -4 }}
                      transition={{ duration: 0.65, delay: i * 0.16, ease: [0.34, 1.2, 0.64, 1] as [number,number,number,number] }}
                    >
                      {/* Image on pole */}
                      <motion.div
                        style={{ gridColumn: '1 / 2', justifySelf: 'center', alignSelf: 'center', zIndex: 3, width: '84px', height: '84px', borderRadius: '50%', background: 'radial-gradient(circle at 35% 30%, rgba(255,244,214,0.96) 0%, rgba(245,210,140,0.9) 58%, rgba(230,170,78,0.75) 100%)', border: '1px solid rgba(233,108,51,0.18)', boxShadow: '0 10px 24px rgba(180,110,20,0.22), inset 0 1px 0 rgba(255,255,255,0.72)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        initial={{ scale: 0, rotate: 30, opacity: 0 }}
                        animate={drinksListInView ? { scale: 1, rotate: 0, opacity: 1 } : { scale: 0, rotate: 30, opacity: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 + i * 0.16, ease: [0.34, 1.56, 0.64, 1] as [number,number,number,number] }}
                        whileHover={{ scale: 1.16, rotate: 10, y: -5, transition: { duration: 0.25 } }}
                      >
                        <img src={d.img} alt={d.name} style={{ width: '88px', height: '88px', objectFit: 'contain', filter: 'drop-shadow(0 14px 28px rgba(0,0,0,0.28))' }} />
                      </motion.div>

                      {/* Flag / pennant shape */}
                      <motion.div
                        style={{ gridColumn: '2 / 3', clipPath: 'polygon(0 0, 91% 0, 100% 50%, 91% 100%, 0 100%)', background: 'linear-gradient(125deg, #f7e8c8 0%, #edd9a3 45%, #e2c87a 100%)', padding: '16px 44px 16px 24px', position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', boxShadow: '2px 4px 18px rgba(100,60,0,0.22), inset 0 1px 0 rgba(255,255,255,0.5)' }}
                        whileHover={{ x: 7, boxShadow: '4px 8px 28px rgba(100,60,0,0.30), inset 0 1px 0 rgba(255,255,255,0.5)', transition: { duration: 0.22 } }}
                      >
                        {/* Subtle paper grain */}
                        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(160,100,20,0.04) 3px, rgba(160,100,20,0.04) 4px)', pointerEvents: 'none' }} />
                        {/* Number italic tag */}
                        <p style={{ margin: '0 0 3px', fontSize: '0.62rem', fontStyle: 'italic', fontWeight: 600, color: '#9a6520', letterSpacing: '0.08em' }}>- 0{i + 1} · {d.tag}</p>
                        {/* Name */}
                        <p style={{ margin: '0 0 4px', fontSize: '1.22rem', fontWeight: 900, color: '#2c1504', letterSpacing: '-0.01em', lineHeight: 1.1 }}>{d.name}</p>
                        {/* Thin divider */}
                        <div style={{ width: '36px', height: '1.5px', background: 'linear-gradient(90deg, #c87820, rgba(200,120,32,0))', borderRadius: '2px' }} />
                      </motion.div>
                    </motion.div>
                  ))}
                </div>

                {/* Button */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={drinksListInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  style={{ marginTop: '8px', paddingLeft: '96px' }}
                >
                  <NavLink
                    to={ROUTES.FOOD_AND_DRINKS}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '13px 32px', borderRadius: '50px', border: '1.5px solid #fd0802', color: '#fd0802', fontWeight: 700, fontSize: '0.88rem', textDecoration: 'none' }}
                  >
                    See All Drinks →
                  </NavLink>
                </motion.div>

              </div>

              {/* RIGHT - drink composition: choco | strawberry | orange, bottom-aligned */}
              <motion.div
                ref={drinksRef}
                style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '0px', minHeight: '420px', overflow: 'visible' }}
                initial="hidden"
                animate={drinksInView ? 'visible' : 'hidden'}
              >
                {/* LEFT - animage3 choco swirl, emerges from behind strawberry to the left */}
                <motion.img
                  src="/home/animage3.png"
                  alt="Choco Swirl"
                  style={{ width: '210px', height: '260px', objectFit: 'contain', position: 'relative', zIndex: 2, marginRight: '-160px', flexShrink: 0, filter: 'drop-shadow(0 6px 14px rgba(0,0,0,0.18))' }}
                  variants={{
                    hidden:  { opacity: 0, x: 120, scale: 0.75 },
                    visible: { opacity: 1, x: 0,   scale: 1,
                      transition: { duration: 0.6, delay: 1.3, ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number] }
                    },
                  }}
                />

                {/* CENTER - strawberry wrapper (BG + image together) */}
                <motion.div
                  style={{ position: 'relative', width: '380px', height: '470px', flexShrink: 0 }}
                  variants={{}}
                >
                  {/* Pink glow circle - centered on strawberry */}
                  <motion.div
                    style={{
                      position: 'absolute', top: '50%', left: '50%',
                      translateX: '-50%', translateY: '-50%',
                      width: '260px', height: '260px', borderRadius: '50%',
                      background: 'radial-gradient(circle at 40% 35%, #f5c898 0%, #e8aa78 55%, #d9925a 100%)',
                      zIndex: 0, pointerEvents: 'none',
                    }}
                    variants={{
                      hidden:  { opacity: 0, scale: 0.5 },
                      visible: { opacity: 1, scale: 1, transition: { duration: 0.55, delay: 1.2 } },
                    }}
                  />
                  {/* Spinning dashed ring */}
                  <motion.div
                    style={{
                      position: 'absolute', top: '50%', left: '50%',
                      translateX: '-50%', translateY: '-50%',
                      width: '300px', height: '300px', borderRadius: '50%',
                      border: '2px dashed rgba(233,108,51,0.4)',
                      zIndex: 0, pointerEvents: 'none',
                    }}
                    variants={{
                      hidden:  { opacity: 0 },
                      visible: { opacity: 1, transition: { duration: 0.4, delay: 1.35 } },
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                  />
                  {/* Orbiting dot */}
                  <motion.div
                    style={{
                      position: 'absolute', top: '50%', left: '50%',
                      translateX: '-50%', translateY: '-50%',
                      width: '300px', height: '300px', borderRadius: '50%',
                      zIndex: 0, pointerEvents: 'none',
                    }}
                    variants={{
                      hidden:  { opacity: 0 },
                      visible: { opacity: 1, transition: { duration: 0.3, delay: 1.4 } },
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                  >
                    <div style={{
                      position: 'absolute', top: '-6px', left: '50%', transform: 'translateX(-50%)',
                      width: '12px', height: '12px', borderRadius: '50%',
                      backgroundColor: '#fd0802', boxShadow: '0 0 8px rgba(233,108,51,0.7)',
                    }} />
                  </motion.div>

                  {/* Strawberry - flies from top-left, lands center */}
                  <motion.img
                    src="/home/animage1.png"
                    alt="Strawberry Blast"
                    style={{ width: '380px', height: '470px', objectFit: 'contain', position: 'relative', zIndex: 3, filter: 'drop-shadow(0 12px 28px rgba(200,60,60,0.22))' }}
                    variants={{
                      hidden:  { x: '240%', y: '-140%', rotate: 115, opacity: 0 },
                      visible: { x: '0%',    y: '0%',    rotate: 0,     opacity: 1,
                        transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number] }
                      },
                    }}
                  />
                </motion.div>

                {/* RIGHT - animage2, emerges from behind strawberry to the right */}
                <motion.img
                  src="/home/animage2.png"
                  alt="Orange Squeeze"
                  style={{ width: '210px', height: '260px', objectFit: 'contain', position: 'relative', zIndex: 2, marginLeft: '-160px', flexShrink: 0, filter: 'drop-shadow(0 6px 14px rgba(0,0,0,0.18))' }}
                  variants={{
                    hidden:  { opacity: 0, x: -120, scale: 0.75 },
                    visible: { opacity: 1, x: 0,    scale: 1,
                      transition: { duration: 0.6, delay: 1.45, ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number] }
                    },
                  }}
                />
              </motion.div>

            </div>
          </div>
        </div>

        {/* Wave bottom */}
        <div style={{ lineHeight: 0, backgroundColor: '#ede0ce' }}>
          <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%' }}>
            <path d="M0,40 C180,0 360,80 540,40 C720,0 900,80 1080,40 C1260,0 1380,60 1440,40 L1440,80 L0,80 Z" fill="#ede0ce" />
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════
          MARQUEE 1
      ══════════════════════════════ */}


      {/* ══════════════════════════════
          §4  FINAL CTA (light, orange accent)
      ══════════════════════════════ */}
      <section style={{ position: 'relative', overflow: 'hidden', backgroundColor: '#ede0ce' }}>
        {/* Decorative orange blobs */}
        <motion.div
          style={{
            position: 'absolute', top: '-80px', right: '-80px',
            width: '400px', height: '400px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(233,108,51,0.1) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          style={{
            position: 'absolute', bottom: '-80px', left: '-80px',
            width: '360px', height: '360px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(233,108,51,0.07) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />

        <div style={{ background: 'linear-gradient(90deg, #fd0802, #e08c00, #fd0802)', padding: '18px 0', borderTop: '1px solid #d97914', borderBottom: '1px solid #d97914' }}>
          <Marquee />
        </div>

        {/* Content */}
        <div
          className="max-w-7xl mx-auto px-6 lg:px-16"
          style={{ position: 'relative', zIndex: 1, padding: '84px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '20px' }}
        >
          <motion.p
            style={{ color: '#fd0802', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.26em', textTransform: 'uppercase', margin: 0 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Come Visit Us
          </motion.p>

          <RevealText
            text="Experience the Bold Flavors In Person"
            style={{
              fontSize: 'clamp(2.4rem, 5.5vw, 4.4rem)', fontWeight: 900,
              color: '#1a1a1a', lineHeight: 1.05, letterSpacing: '-0.03em',
              maxWidth: '720px', justifyContent: 'center',
            }}
            delay={0.1}
          />

          <motion.p
            style={{ color: '#5f5648', fontSize: '0.95rem', lineHeight: 1.85, maxWidth: '400px', margin: 0, fontWeight: 500 }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Mon – Sun · 10 am – 10 pm<br />
            Chennai, India · +91 98765 43210
          </motion.p>

          <motion.div
            className="flex gap-4 flex-wrap justify-center"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.55 }}
          >
            <NavLink
              to={ROUTES.CONTACT}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '16px 40px', borderRadius: '50px',
                backgroundColor: '#fd0802', color: '#000',
                fontWeight: 800, fontSize: '0.9rem', textDecoration: 'none',
                boxShadow: '0 8px 40px rgba(233,108,51,0.3)',
              }}
            >
              <MapPin size={16} strokeWidth={2.2} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px', marginTop: '-2px' }} />
              Find Us
            </NavLink>
            <NavLink
              to={ROUTES.FOOD_AND_DRINKS}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '16px 40px', borderRadius: '50px',
                backgroundColor: 'transparent', color: '#1a1a1a',
                border: '1.5px solid rgba(26,26,26,0.18)',
                fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none',
              }}
            >
              See Our Menu
            </NavLink>
          </motion.div>
        </div>
      </section>

    </MainLayout>
  );
};

export default Home;
