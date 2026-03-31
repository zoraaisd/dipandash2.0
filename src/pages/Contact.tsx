import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';

const contactDetails = [
  { Icon: MapPin,  label: 'Address',       value: 'Chennai, India',                  color: '#fd0802' },
  { Icon: Phone,   label: 'Phone',         value: '+91 98765 43210',                 color: '#fd0802' },
  { Icon: Mail,    label: 'Email',         value: 'support@dipanddash.com',          color: '#fd0802' },
  { Icon: Clock,   label: 'Opening Hours', value: 'Mon – Sun: 10:00 AM – 10:00 PM', color: '#fd0802' },
];

const Contact = () => {
  const leftRef    = useRef<HTMLDivElement>(null);
  const leftInView = useInView(leftRef, { once: true, margin: '-60px' });

  return (
    <MainLayout>
      <div style={{ backgroundColor: '#faf8f5', minHeight: '100vh' }}>

        {/* Hero banner */}
        <section style={{ position: 'relative', backgroundColor: '#1a0f06', overflow: 'hidden', padding: '36px 24px 40px', textAlign: 'center' }}>
          <motion.div
            style={{ position: 'absolute', top: '50%', left: '50%', translateX: '-50%', translateY: '-50%', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(233,108,51,0.18) 0%, transparent 70%)', pointerEvents: 'none' }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.18em', color: '#fd0802', textTransform: 'uppercase', marginBottom: '14px' }}
            >
              Get In Touch
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.15 }}
              style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 900, color: '#fff', margin: '0 0 16px', letterSpacing: '-0.02em' }}
            >
              We'd Love to <span style={{ color: '#fd0802' }}>Hear From You</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{ fontSize: '1rem', color: '#c8b49a', maxWidth: '480px', margin: '0 auto', lineHeight: 1.8 }}
            >
              Visit us, call us - we're here every day for you.
            </motion.p>
          </div>
        </section>

        {/* Main content */}
        <section style={{ padding: '64px 24px', maxWidth: '600px', margin: '0 auto' }}>

          {/* LEFT - contact info */}
          <motion.div
            ref={leftRef}
            initial={{ opacity: 0, x: -40 }}
            animate={leftInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.34, 1.1, 0.64, 1] }}
            style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
          >
            <div style={{ marginBottom: '8px' }}>
              <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.18em', color: '#fd0802', textTransform: 'uppercase', marginBottom: '10px' }}>Find Us</p>
              <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 900, color: '#1a0f06', margin: 0, letterSpacing: '-0.02em' }}>Contact Details</h2>
            </div>

            {contactDetails.map((d, i) => (
              <motion.div
                key={d.label}
                initial={{ opacity: 0, y: 20 }}
                animate={leftInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{ display: 'flex', alignItems: 'center', gap: '18px', backgroundColor: '#fff', borderRadius: '16px', padding: '20px 22px', boxShadow: '0 4px 20px rgba(100,50,0,0.08)', border: '1px solid #f0e8d8', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'default' }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 10px 30px rgba(100,50,0,0.13)`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 20px rgba(100,50,0,0.08)';
                }}
              >
                <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: `linear-gradient(135deg, ${d.color}18, ${d.color}30)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: `0 4px 12px ${d.color}22` }}>
                  <d.Icon size={22} color="#1a0f06" strokeWidth={2} />
                </div>
                <div>
                  <p style={{ fontSize: '0.62rem', fontWeight: 800, color: d.color, letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 4px' }}>{d.label}</p>
                  <p style={{ fontSize: '0.92rem', fontWeight: 600, color: '#1a0f06', margin: 0 }}>{d.value}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>


        </section>
      </div>
    </MainLayout>
  );
};

export default Contact;
