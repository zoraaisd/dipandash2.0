import { motion } from 'framer-motion';

const foodItems = [
  { src: '/heroimg/img1.png', cx: 158,  cy: -55,  size: 218, ix: 500,  iy: -150, rot:  8, z: 2, delay: 1.30 },
  { src: '/heroimg/img7.png', cx: -135, cy: -55,  size: 245, ix: -420, iy: -300, rot: -15, z: 3, delay: 0.85 },
  { src: '/heroimg/img5.png', cx: -40,  cy: -42,  size: 195, ix: 0,    iy: -460, rot:  0, z: 4, delay: 1.00 },
  { src: '/heroimg/img3.png', cx:  65,  cy: -22,  size: 152, ix: 430,  iy: -200, rot: 12, z: 5, delay: 1.15 },
  { src: '/heroimg/img9.png', cx:  95,  cy:  50,  size:  88, ix: 0,    iy:    0, rot:  0, z: 8, delay: 1.90 },
  { src: '/heroimg/img2.png', cx: -155, cy:  38,  size: 188, ix: -400, iy:  280, rot: -12, z: 4, delay: 1.45 },
  { src: '/heroimg/img4.png', cx: -50,  cy:  40,  size: 115, ix: 0,    iy:  430, rot:  0, z: 6, delay: 1.60 },
  { src: '/heroimg/img8.png', cx:  42,  cy:  60,  size:  74, ix: 0,    iy:    0, rot:  0, z: 7, delay: 1.75 },
];

const HeroAnimation = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'relative', width: '600px', height: '580px', flexShrink: 0 }}>

        {/* Plate shadow */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: '4%', left: '50%',
            translateX: '-50%',
            width: '420px', height: '40px',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.06) 55%, transparent 100%)',
            filter: 'blur(10px)',
            zIndex: 0,
            pointerEvents: 'none',
          }}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        />

        {/* Plate */}
        <motion.img
          src="/heroimg/img6.png"
          style={{
            position: 'absolute', top: '52%', left: '50%',
            translateX: '-50%', translateY: '-50%',
            width: '560px', height: '560px',
            objectFit: 'contain', zIndex: 1,
            filter: 'drop-shadow(0 18px 40px rgba(0,0,0,0.22))',
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.65, delay: 0.4, ease: [0.34, 1.56, 0.64, 1] as [number,number,number,number] }}
        />

        {/* Food items fly in */}
        {foodItems.map((item, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: '52%', left: '50%',
              marginLeft: item.cx - item.size / 2,
              marginTop:  item.cy - item.size / 2,
              width: item.size, height: item.size,
              zIndex: item.z,
            }}
          >
            <motion.img
              src={item.src}
              style={{
                width: '100%', height: '100%',
                objectFit: 'contain',
                filter: 'drop-shadow(0 7px 18px rgba(0,0,0,0.24))',
              }}
              initial={{ x: item.ix, y: item.iy, opacity: 0, scale: 0.3, rotate: item.rot }}
              animate={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.7, delay: item.delay, ease: [0.34, 1.15, 0.64, 1] as [number,number,number,number] }}
            />
          </div>
        ))}

      </div>
    </div>
  );
};

export default HeroAnimation;
