import { useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import ROUTES from '../../routes/routePaths';

const stats = [
  { n: '40+', l: 'Menu Items' },
  { n: '10K+', l: 'Customers' },
  { n: '5★', l: 'Rating' },
];

const HeroSection = () => {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress: heroP } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroTextY = useTransform(heroP, [0, 1], [0, 70]);
  const heroOp = useTransform(heroP, [0, 0.6], [1, 0]);
  const smoothTextY = useSpring(heroTextY, { stiffness: 80, damping: 20 });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.currentTime = 0;
          video.playbackRate = 2.5;
          video.play();
        } else {
          video.pause();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={heroRef}
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: '#ede0ce',
        padding: '40px 24px',
      }}
    >
      <div className="max-w-7xl mx-auto w-full" style={{ position: 'relative', zIndex: 3 }}>
        <motion.div style={{ y: smoothTextY, opacity: heroOp }}>
          {/* Black card */}
          <div
            style={{
              background: '#000000',
              borderRadius: '32px',
              overflow: 'hidden',
              boxShadow: '0 32px 80px rgba(0,0,0,0.35)',
              padding: '24px',
            }}
          >
          <div className="grid grid-cols-1 lg:grid-cols-[1.08fr_0.92fr] gap-8 lg:gap-10 items-center" style={{ minHeight: 'min(38vh, 380px)' }}>
            <div className="flex flex-col gap-7" style={{ padding: 'clamp(8px, 2vw, 18px)' }}>
              <div style={{ overflow: 'hidden' }}>
                <motion.div
                  style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3em', alignItems: 'center' }}
                  initial="hidden"
                  animate="visible"
                  variants={{ visible: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } } }}
                >
                  {['Welcome', 'to', 'Dip', '&', 'Dash'].map((word, i) => (
                    <motion.span
                      key={i}
                      variants={{
                        hidden: { opacity: 0, y: 40, rotateX: -90 },
                        visible: { opacity: 1, y: 0, rotateX: 0 },
                      }}
                      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                      style={{
                        display: 'inline-block',
                        fontSize: 'clamp(1.4rem, 3.5vw, 2.4rem)',
                        fontWeight: 900,
                        letterSpacing: '-0.02em',
                        color: word === 'Dip' || word === '&' || word === 'Dash' ? '#fd0802' : '#ffffff',
                        transformOrigin: 'bottom',
                        lineHeight: 1.1,
                      }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    height: '3px',
                    background: 'linear-gradient(90deg, #fd0802, #f5a623, transparent)',
                    borderRadius: '2px',
                    transformOrigin: 'left',
                    marginTop: '6px',
                    width: '60%',
                  }}
                />
              </div>

              <div>
                <motion.h1
                  style={{
                    fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
                    fontWeight: 900,
                    lineHeight: 1,
                    color: '#ffffff',
                    margin: 0,
                    letterSpacing: '-0.03em',
                  }}
                  initial={{ opacity: 0, y: 70 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.85, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
                >
                  Fresh Food
                </motion.h1>
                <motion.h1
                  style={{
                    fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
                    fontWeight: 900,
                    lineHeight: 1,
                    color: '#fd0802',
                    margin: 0,
                    letterSpacing: '-0.03em',
                  }}
                  initial={{ opacity: 0, y: 70 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.85, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
                >
                  Fast Service
                </motion.h1>
              </div>

              <motion.p
                style={{
                  color: 'rgba(255,255,255,0.82)',
                  fontSize: '1.05rem',
                  lineHeight: 1.85,
                  maxWidth: '520px',
                  margin: 0,
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
              >
                Handcrafted burgers, crispy bites and refreshing drinks made fresh every single day and served with love.
              </motion.p>

              <motion.div
                className="flex gap-4 flex-wrap"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.75 }}
              >
                <NavLink
                  to={ROUTES.FOOD_AND_DRINKS}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '15px 36px',
                    borderRadius: '50px',
                    backgroundColor: '#fd0802',
                    color: '#000',
                    fontWeight: 800,
                    fontSize: '0.9rem',
                    textDecoration: 'none',
                    boxShadow: '0 8px 32px rgba(233,108,51,0.4)',
                    letterSpacing: '0.01em',
                  }}
                >
                  Order Now
                </NavLink>
                <NavLink
                  to={ROUTES.FOOD_AND_DRINKS}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '15px 36px',
                    borderRadius: '50px',
                    backgroundColor: 'rgba(255,255,255,0.06)',
                    border: '1.5px solid rgba(255,255,255,0.18)',
                    color: '#ffffff',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    textDecoration: 'none',
                  }}
                >
                  Explore Menu
                </NavLink>
              </motion.div>

              <motion.div
                className="flex gap-10 flex-wrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                style={{ marginTop: '8px' }}
              >
                {stats.map((s) => (
                  <div key={s.l}>
                    <p style={{ fontWeight: 900, fontSize: '1.6rem', color: '#ffffff', margin: '0 0 2px', letterSpacing: '-0.02em' }}>{s.n}</p>
                    <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.7)', margin: 0, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{s.l}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '320px',
                justifySelf: 'center',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: '0',
                  minHeight: '260px',
                  background: 'none',
                  border: 'none',
                  boxShadow: 'none',
                }}
              >
                <video
                  ref={videoRef}
                  muted
                  playsInline
                  preload="auto"
                  style={{
                    width: '100%',
                    height: '100%',
                    minHeight: '260px',
                    objectFit: 'cover',
                  }}
                >
                  <source src="/media/foodVideo.mp4" type="video/mp4" />
                </video>
              </div>
            </motion.div>
          </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
