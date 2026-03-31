import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Leaf, Users, Recycle, ShieldCheck } from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';

const whyUs = [
  { n: '01', title: 'Fresh Daily',       desc: 'Every ingredient sourced and prepared fresh, every single day - no shortcuts.' },
  { n: '02', title: 'Bold Recipes',      desc: 'Handcrafted sauces and seasonings you won\'t find anywhere else in the city.' },
  { n: '03', title: 'Fast Service',      desc: 'Counter-to-hand in minutes - because great food shouldn\'t make you wait.' },
  { n: '04', title: 'Hygienic Kitchen',  desc: 'Strict hygiene standards maintained across every station, every single shift.' },
];

const RevealText = ({
  text, style, delay = 0, stagger = 0.04,
}: {
  text: string; style?: React.CSSProperties; delay?: number; stagger?: number;
}) => {
  const words = text.split(' ');
  const container = { hidden: {}, visible: { transition: { staggerChildren: stagger, delayChildren: delay } } };
  const word = {
    hidden: { y: '110%', opacity: 0 },
    visible: { y: '0%', opacity: 1, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number] } },
  };
  return (
    <motion.span
      style={{ display: 'flex', flexWrap: 'wrap', gap: '0 0.28em', ...style }}
      variants={container} initial="hidden"
      whileInView="visible" viewport={{ once: false, margin: '-60px' }}
    >
      {words.map((w, i) => (
        <span key={i} style={{ overflow: 'hidden', display: 'inline-block' }}>
          <motion.span style={{ display: 'inline-block' }} variants={word}>{w}</motion.span>
        </span>
      ))}
    </motion.span>
  );
};

const values = [
  { Icon: Leaf,        label: 'Farm Fresh',    desc: 'Every ingredient is sourced fresh from local farms.',     color: '#22a855' },
  { Icon: Users,       label: 'Community',     desc: 'We believe food brings people together.',                 color: '#fd0802' },
  { Icon: Recycle,     label: 'Sustainable',   desc: 'We use eco friendly packaging and reduce waste.',         color: '#0ea5e9' },
  { Icon: ShieldCheck, label: 'Quality First', desc: 'No shortcuts only the best makes it to your plate.',   color: '#f5a623' },
];

const stats = [
  { number: '10K+', label: 'Happy Customers Daily' },
  { number: '40+',  label: 'Menu Items' },
  { number: '100%', label: 'Fresh Ingredients' },
];

const About = () => {
  const statsRef   = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const valuesRef  = useRef<HTMLDivElement>(null);

  const statsInView   = useInView(statsRef,   { once: true, margin: '-80px' });
  const missionInView = useInView(missionRef, { once: true, margin: '-80px' });
  const valuesInView  = useInView(valuesRef,  { once: true, margin: '-80px' });


  return (
    <MainLayout>
      <div style={{ backgroundColor: '#faf8f5', minHeight: '100vh' }}>

        {/* ── Hero ── */}
        <section style={{ position: 'relative', backgroundColor: '#1a0f06', overflow: 'hidden', padding: 'clamp(36px, 6vw, 60px) 24px clamp(40px, 6vw, 64px)' }}>
          {/* Animated glow orbs */}
          <motion.div
            style={{ position: 'absolute', top: '50%', left: '50%', translateX: '-50%', translateY: '-50%', width: '700px', height: '700px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(233,108,51,0.20) 0%, transparent 70%)', pointerEvents: 'none' }}
            animate={{ scale: [1, 1.18, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            style={{ position: 'absolute', top: '30%', left: '20%', width: '280px', height: '280px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,166,35,0.10) 0%, transparent 70%)', pointerEvents: 'none' }}
            animate={{ x: [0, 30, -20, 0], y: [0, -20, 10, 0], scale: [1, 1.2, 0.9, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            style={{ position: 'absolute', bottom: '20%', right: '15%', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(233,108,51,0.12) 0%, transparent 70%)', pointerEvents: 'none' }}
            animate={{ x: [0, -25, 15, 0], y: [0, 15, -10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />

          <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.18em', color: '#fd0802', textTransform: 'uppercase', marginBottom: '16px' }}
            >
              Our Story
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              style={{ fontSize: 'clamp(2rem, 5vw, 3.4rem)', fontWeight: 900, color: '#fff', lineHeight: 1.15, margin: '0 0 28px', letterSpacing: '-0.02em' }}
            >
              How It All <span style={{ color: '#fd0802' }}>Started</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              style={{ fontSize: '1.05rem', color: '#c8b49a', lineHeight: 1.9, margin: '0 0 18px' }}
            >
              Dip & Dash began as a small kitchen experiment - a founder's obsession with creating the perfect dip.
              What started as jars gifted to friends and family quickly grew into a beloved local food brand.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.44 }}
              style={{ fontSize: '1.05rem', color: '#c8b49a', lineHeight: 1.9, margin: 0 }}
            >
              Today, we serve hundreds of happy customers every week, staying true to our roots: bold flavors,
              honest ingredients, and food made with love.
            </motion.p>

            {/* Scroll hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                style={{ width: '1.5px', height: '36px', background: 'linear-gradient(180deg, rgba(233,108,51,0.8), transparent)', borderRadius: '2px' }}
              />
            </motion.div>
          </div>
        </section>

        {/* ── Stats Bar ── */}
        <section ref={statsRef} style={{ backgroundColor: '#fd0802', padding: '16px 24px' }}>
          <div className="grid grid-cols-3 gap-4 text-center" style={{ maxWidth: '680px', margin: '0 auto' }}>
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 22 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <p style={{ fontSize: 'clamp(1.6rem, 3vw, 2.3rem)', fontWeight: 900, color: '#fff', margin: '0 0 4px', letterSpacing: '-0.02em' }}>{s.number}</p>
                <p style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.85)', fontWeight: 600, letterSpacing: '0.07em', margin: 0, textTransform: 'uppercase' }}>{s.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Mission ── */}
        <section ref={missionRef} style={{ padding: '80px 24px' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center" style={{ maxWidth: '920px', margin: '0 auto' }}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={missionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.34, 1.1, 0.64, 1] }}
            >
              <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.18em', color: '#fd0802', textTransform: 'uppercase', marginBottom: '12px' }}>Our Mission</p>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.3rem)', fontWeight: 900, color: '#1a0f06', lineHeight: 1.2, margin: '0 0 22px', letterSpacing: '-0.02em' }}>
                Bold Flavours,<br />Honest Ingredients
              </h2>
              <p style={{ fontSize: '0.96rem', color: '#6b5744', lineHeight: 1.85, margin: '0 0 16px' }}>
                Every item on our menu is crafted with care no shortcuts, no compromises. We source the freshest produce,
                partner with trusted suppliers, and cook everything with passion.
              </p>
              <p style={{ fontSize: '0.96rem', color: '#6b5744', lineHeight: 1.85, margin: 0 }}>
                From our signature dips to our stacked burgers, every bite is a promise we keep.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50, rotate: 3 }}
              animate={missionInView ? { opacity: 1, x: 0, rotate: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.15, ease: [0.34, 1.1, 0.64, 1] }}
              style={{ borderRadius: '24px', background: 'linear-gradient(135deg, #1a0f06 0%, #2d1a08 100%)', padding: 'clamp(28px, 5vw, 44px) clamp(20px, 4vw, 36px)', boxShadow: '0 20px 60px rgba(233,108,51,0.22)', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
            >
              {/* Glow behind logo */}
              <motion.div
                animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0.9, 0.5] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{ position: 'absolute', top: '50%', left: '50%', translateX: '-50%', translateY: '-50%', width: '260px', height: '260px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(233,108,51,0.18) 0%, transparent 70%)', pointerEvents: 'none' }}
              />
              {/* Logo */}
              <motion.img
                src="/title_logo.png"
                alt="Dip & Dash"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{ width: '160px', objectFit: 'contain', marginBottom: '28px', filter: 'drop-shadow(0 12px 32px rgba(233,108,51,0.35))', position: 'relative', zIndex: 1 }}
              />
              <p style={{ fontSize: '1.25rem', fontWeight: 900, color: '#fff', margin: '0 0 10px', lineHeight: 1.4, position: 'relative', zIndex: 1 }}>
                "Made with love,<br />served with pride."
              </p>
              <p style={{ fontSize: '0.82rem', color: '#c8a07a', margin: 0, fontStyle: 'italic', position: 'relative', zIndex: 1 }}> The Dip & Dash Team</p>
              <div style={{ marginTop: '22px', width: '44px', height: '3px', background: 'linear-gradient(90deg, #fd0802, #f5a623)', borderRadius: '2px', position: 'relative', zIndex: 1 }} />
            </motion.div>
          </div>
        </section>

        {/* ── Values ── */}
        <section ref={valuesRef} style={{ backgroundColor: '#ede0ce', padding: 'clamp(48px, 8vw, 80px) 24px' }}>
          <div style={{ maxWidth: '960px', margin: '0 auto' }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={valuesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              style={{ textAlign: 'center', marginBottom: '52px' }}
            >
              <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.18em', color: '#fd0802', textTransform: 'uppercase', marginBottom: '12px' }}>What We Stand For</p>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 900, color: '#1a0f06', margin: 0, letterSpacing: '-0.02em' }}>Our Values</h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {values.map((v, i) => (
                <motion.div
                  key={v.label}
                  initial={{ opacity: 0, y: 40, scale: 0.92 }}
                  animate={valuesInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ duration: 0.55, delay: i * 0.12, ease: [0.34, 1.2, 0.64, 1] }}
                  whileHover={{ y: -6, boxShadow: '0 20px 48px rgba(233,108,51,0.18)', transition: { duration: 0.22 } }}
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: '16px',
                    padding: 'clamp(18px, 4vw, 32px) clamp(14px, 3vw, 24px) clamp(16px, 3vw, 28px)',
                    textAlign: 'center',
                    borderTop: '3px solid #fd0802',
                    boxShadow: '0 4px 20px rgba(100,50,0,0.08)',
                    cursor: 'default',
                  }}
                >
                  <div style={{ fontSize: '0.6rem', fontWeight: 800, color: '#fd0802', letterSpacing: '0.12em', marginBottom: '14px' }}>
                    0{i + 1}
                  </div>
                  <div
                    style={{ width: 'clamp(44px, 9vw, 60px)', height: 'clamp(44px, 9vw, 60px)', borderRadius: '14px', background: 'linear-gradient(135deg, rgba(233,108,51,0.10), rgba(233,108,51,0.18))', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}
                  >
                    <v.Icon size={26} color="#1a0f06" strokeWidth={1.8} />
                  </div>
                  <h3 style={{ fontWeight: 900, fontSize: 'clamp(0.85rem, 2vw, 1rem)', color: '#1a0f06', margin: '0 0 10px' }}>{v.label}</h3>
                  <div style={{ width: '24px', height: '2px', background: '#fd0802', borderRadius: '2px', margin: '0 auto 12px' }} />
                  <p style={{ fontSize: 'clamp(0.72rem, 1.8vw, 0.82rem)', color: '#7a5c44', lineHeight: 1.7, margin: 0 }}>{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Our Story ── */}
        <section style={{ backgroundColor: '#ede0ce', padding: '60px 24px 40px' }}>
          <div style={{ maxWidth: '760px', margin: '0 auto' }} className="flex flex-col gap-4">
            <motion.p
              style={{ color: '#e96c33', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.26em', textTransform: 'uppercase', margin: 0 }}
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false }} transition={{ duration: 0.5 }}
            >
              Our Story
            </motion.p>
            <RevealText
              text="Bold Flavors. Real Ingredients."
              style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)', fontWeight: 900, color: '#1a1a1a', lineHeight: 1.1, letterSpacing: '-0.02em' }}
              delay={0.1}
            />
            <motion.p
              style={{ color: '#333', fontSize: '1rem', lineHeight: 1.9, margin: 0 }}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 0.42, delay: 0.16 }}
            >
              Born from a passion for good food, Dip &amp; Dash is where premium ingredients meet bold seasoning - every item on our menu is crafted to leave you coming back for more.
            </motion.p>
            <div className="flex flex-col gap-0" style={{ marginTop: '16px' }}>
              {[
                { n: '50+',  label: 'Items on the menu',      sub: 'Burgers, sides, shakes & more' },
                { n: '10K+', label: 'Happy customers served', sub: 'And counting every single day' },
                { n: '100%', label: 'Fresh every day',        sub: 'No freezer shortcuts, ever'    },
              ].map((stat, i) => (
                <motion.div
                  key={stat.n}
                  style={{ borderTop: '1px solid #f0e8d8', padding: '20px 0', display: 'grid', gridTemplateColumns: '100px 1fr', gap: '20px', alignItems: 'center' }}
                  initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false }}
                  transition={{ duration: 0.42, delay: i * 0.07, ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number] }}
                >
                  <span style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 900, color: '#e96c33', letterSpacing: '-0.02em', lineHeight: 1 }}>{stat.n}</span>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: '0.9rem', color: '#1a1a1a', margin: '0 0 3px' }}>{stat.label}</p>
                    <p style={{ fontSize: '0.76rem', color: '#444', margin: 0 }}>{stat.sub}</p>
                  </div>
                </motion.div>
              ))}
              <div style={{ borderTop: '1px solid #f0e8d8' }} />
            </div>
          </div>
        </section>

        {/* ── Our Promise ── */}
        <section style={{ backgroundColor: '#ede0ce', padding: '40px 24px 60px' }}>
          <div style={{ maxWidth: '760px', margin: '0 auto' }} className="flex flex-col">
            <motion.p
              style={{ color: '#e96c33', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.26em', textTransform: 'uppercase', margin: '0 0 6px' }}
              initial={{ opacity: 0, y: 18, letterSpacing: '0.4em' }}
              whileInView={{ opacity: 1, y: 0, letterSpacing: '0.26em' }}
              viewport={{ once: false }}
              transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number] }}
            >
              Our Promise
            </motion.p>
            <RevealText
              text="Why Choose Dip & Dash"
              style={{ fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', fontWeight: 900, color: '#1a1a1a', lineHeight: 1.1, letterSpacing: '-0.02em' }}
            />
            <motion.p
              style={{ color: '#333', fontSize: '0.92rem', lineHeight: 1.8, marginTop: '8px', marginBottom: '0' }}
              initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: false }}
              transition={{ duration: 0.44, delay: 0.12, ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number] }}
            >
              We built Dip &amp; Dash on one idea - food should be fresh, fast, and full of flavour. Every decision we make starts there.
            </motion.p>
            <motion.div
              style={{ marginTop: '12px', marginBottom: '14px', width: '72px', height: '6px', backgroundColor: '#e96c33', borderRadius: '3px' }}
              initial={{ scaleX: 0, originX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.36, delay: 0.18, ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number] }}
            />
            <div className="flex flex-col">
              {whyUs.map((item, i) => (
                <motion.div
                  key={item.n}
                  initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, margin: '-50px' }}
                  transition={{ duration: 0.42, delay: i * 0.06, ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number] }}
                  style={{ borderTop: '1px solid #f0e8d8', padding: '14px 0', display: 'flex', alignItems: 'flex-start', gap: '18px' }}
                >
                  <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#e96c33', letterSpacing: '0.1em', marginTop: '5px', minWidth: '28px' }}>{item.n}</span>
                  <div>
                    <h3 style={{ fontWeight: 800, fontSize: '1.15rem', color: '#1a1a1a', margin: '0 0 4px', letterSpacing: '-0.01em' }}>{item.title}</h3>
                    <p style={{ fontSize: '0.88rem', color: '#333', lineHeight: 1.8, margin: 0 }}>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
              <div style={{ borderTop: '1px solid #f0e8d8' }} />
            </div>
          </div>
        </section>

      </div>
    </MainLayout>
  );
};

export default About;
