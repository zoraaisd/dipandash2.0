import { useRef, useEffect, useState } from 'react';
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
  const [orderHover, setOrderHover] = useState(false);
  const [exploreHover, setExploreHover] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const { scrollYProgress: heroP } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroTextY = useTransform(heroP, [0, 1], [0, 70]);
  const heroOp = useTransform(heroP, [0, 0.6], [1, 0]);
  const smoothTextY = useSpring(heroTextY, { stiffness: 80, damping: 20 });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {});
    video.addEventListener('ended', () => setVideoEnded(true));
    return () => video.removeEventListener('ended', () => setVideoEnded(true));
  }, []);

  return (
    <section
      ref={heroRef}
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'flex-start',
        position: 'relative',
        overflow: 'visible',
        background: '#000000',
        padding: '60px 24px 40px',
      }}
    >
      <div className="max-w-7xl mx-auto w-full" style={{ position: 'relative', zIndex: 3 }}>
        <motion.div style={{ y: smoothTextY, opacity: heroOp }}>
          <div className="grid grid-cols-1 lg:grid-cols-[1.08fr_0.92fr] gap-4 lg:gap-6 items-center" style={{ minHeight: 'min(20vh, 200px)' }}>
            <div className="flex flex-col gap-4" style={{ padding: 'clamp(4px, 1vw, 10px)' }}>
              <div style={{ overflow: 'visible', paddingTop: '8px' }}>
                <motion.div
                  style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6em', alignItems: 'center' }}
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
                        fontFamily: "'Great Vibes', cursive",
                        fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                        fontWeight: 400,
                        letterSpacing: '0.02em',
                        color: word === 'Dip' || word === '&' ? '#f5c800' : word === 'Dash' ? '#fd0802' : '#ffffff',
                        WebkitTextStroke: word === 'Dip' || word === '&' ? '0.6px #f5c800' : word === 'Dash' ? '0.6px #fd0802' : '0.6px #ffffff',
                        transformOrigin: 'bottom',
                        lineHeight: 1.1,
                        filter:
                          word === 'Dip' || word === '&'
                            ? 'drop-shadow(0 0 6px rgba(245,200,0,1)) drop-shadow(0 0 18px rgba(245,150,0,0.8))'
                            : word === 'Dash'
                            ? 'drop-shadow(0 0 6px rgba(253,8,2,1)) drop-shadow(0 0 18px rgba(253,8,2,0.8))'
                            : 'drop-shadow(0 0 4px rgba(255,255,255,0.6))',
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
                    boxShadow: '0 0 8px rgba(253,8,2,0.8)',
                  }}
                />
              </div>

              <div>
                <motion.h1
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
                    fontWeight: 900,
                    lineHeight: 1,
                    margin: 0,
                    letterSpacing: '-0.01em',
                    background: 'linear-gradient(180deg, #fff5a0 0%, #f5c800 45%, #e07800 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: 'drop-shadow(0 0 12px rgba(245,200,0,0.95)) drop-shadow(0 0 30px rgba(245,150,0,0.6)) drop-shadow(0 2px 6px rgba(80,30,0,0.9))',
                  }}
                  initial={{ opacity: 0, y: 70 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.85, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
                >
                  Fresh Food
                </motion.h1>
                <motion.h1
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
                    fontWeight: 900,
                    lineHeight: 1,
                    margin: 0,
                    letterSpacing: '-0.01em',
                    background: 'linear-gradient(180deg, #ffd060 0%, #ff6a00 50%, #cc2200 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: 'drop-shadow(0 0 12px rgba(255,100,0,0.95)) drop-shadow(0 0 30px rgba(220,50,0,0.6)) drop-shadow(0 2px 6px rgba(80,10,0,0.9))',
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
                  color: '#ffffff',
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  lineHeight: 1.85,
                  maxWidth: '520px',
                  margin: 0,
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
              >
                Experience the Perfect Blend of Freshness, Flavor, and Fast Service Designed to Satisfy Your Cravings Anytime, Every Time.
              </motion.p>

              <motion.div
                className="flex gap-4 flex-wrap"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.75 }}
              >
                <NavLink
                  to={ROUTES.FOOD_AND_DRINKS}
                  onMouseEnter={() => setOrderHover(true)}
                  onMouseLeave={() => setOrderHover(false)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 28px',
                    borderRadius: '50px',
                    backgroundColor: orderHover ? '#fd0802' : 'transparent',
                    color: '#ffffff',
                    fontWeight: 800,
                    fontSize: '0.9rem',
                    textDecoration: 'none',
                    border: '2px solid #fd0802',
                    boxShadow: orderHover ? '0 0 24px rgba(253,8,2,1), 0 0 50px rgba(253,8,2,0.6)' : '0 0 14px rgba(253,8,2,0.8), 0 0 30px rgba(253,8,2,0.4)',
                    letterSpacing: '0.01em',
                    transition: 'background-color 0.25s ease, box-shadow 0.25s ease',
                  }}
                >
                  Order Now
                </NavLink>
                <NavLink
                  to={ROUTES.FOOD_AND_DRINKS}
                  onMouseEnter={() => setExploreHover(true)}
                  onMouseLeave={() => setExploreHover(false)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '10px 28px',
                    borderRadius: '50px',
                    backgroundColor: exploreHover ? '#f5c800' : 'transparent',
                    border: '2px solid #f5c800',
                    color: exploreHover ? '#000000' : '#f5c800',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    textDecoration: 'none',
                    boxShadow: exploreHover ? '0 0 24px rgba(245,200,0,1), 0 0 50px rgba(245,200,0,0.6)' : '0 0 14px rgba(245,200,0,0.7), 0 0 30px rgba(245,200,0,0.3)',
                    transition: 'background-color 0.25s ease, color 0.25s ease, box-shadow 0.25s ease',
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
                style={{ marginTop: '0px' }}
              >
                {stats.map((s) => (
                  <div key={s.l}>
                    <p style={{ fontWeight: 900, fontSize: '1.6rem', color: '#f5c800', margin: '0 0 2px', letterSpacing: '-0.02em', textShadow: '0 0 12px rgba(245,200,0,0.9), 0 0 28px rgba(245,200,0,0.5)' }}>{s.n}</p>
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
                  width: '100%',
                  height: '560px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'visible',
                }}
              >
                {/* Video - always takes space, just fades out */}
                <video
                  ref={videoRef}
                  muted
                  autoPlay
                  playsInline
                  preload="metadata"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'opacity 0.8s ease',
                    opacity: videoEnded ? 0 : 1,
                  }}
                >
                  <source src="/media/foodVideo.mp4" type="video/mp4" />
                </video>

                {/* Title logo - zooms in when video ends */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  pointerEvents: 'none',
                  zIndex: 4,
                }}>
                  <motion.img
                    src="/title_logo.png"
                    alt="Dip & Dash"
                    initial={{ opacity: 0, scale: 0.3 }}
                    animate={videoEnded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.3 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      width: '700px',
                      height: '700px',
                      objectFit: 'contain',
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
