import { NavLink } from 'react-router-dom';
import ROUTES from '../../routes/routePaths';

const quickLinks = [
  { label: 'Home',          to: ROUTES.HOME },
  { label: 'Food & Drinks', to: ROUTES.FOOD_AND_DRINKS },
  { label: 'Combos',        to: ROUTES.COMBOS },
  { label: 'About',         to: ROUTES.ABOUT },
  { label: 'Contact',       to: ROUTES.CONTACT },
];

const contactInfo = [
  { icon: '📍', value: 'Chennai, India' },
  { icon: '📞', value: '+91 98765 43210' },
  { icon: '✉️', value: 'support@dipanddash.com' },
  { icon: '🕐', value: 'Mon–Sun: 10am – 10pm' },
];

const socials = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/dip_dash_/?hl=en',
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/people/Dip-Dash/61588653539803/',
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/@DipandDash2.o',
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
      </svg>
    ),
  },
];

const Footer = () => {
  return (
    <>
      {/* ── Gold separator band ── */}
      <div style={{
        background: 'linear-gradient(90deg, #fd0802, #e08c00, #fd0802)',
        padding: '16px 24px',
        textAlign: 'center',
      }}>
        <p style={{ color: '#000', fontWeight: 800, fontSize: '0.82rem', letterSpacing: '0.22em', textTransform: 'uppercase', margin: 0 }}>
          🍔 Bold Flavors · Fresh Every Day · Dip &amp; Dash
        </p>
      </div>

      {/* ── Footer body ── */}
      <footer style={{ backgroundColor: '#1a1a1a' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10">

            {/* Brand */}
            <div className="col-span-2 lg:col-span-1">
              <div className="mb-4 flex items-center gap-3">
                <img
                  src="/Transperent Logo.png"
                  alt="Dip & Dash"
                  style={{ height: '40px', width: 'auto', objectFit: 'contain' }}
                />
                <span style={{ color: '#ffffff', fontWeight: 800, fontSize: '1.1rem' }}>
                  Dip <span style={{ color: '#fd0802' }}>&</span> Dash
                </span>
              </div>
              <p style={{ color: '#a1a1aa', fontSize: '0.85rem', lineHeight: 1.7, margin: 0 }}>
                Bold flavors, fresh ingredients, and a passion for great food - served with love every single day.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 style={{ color: '#fd0802', fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '16px' }}>
                Quick Links
              </h4>
              <ul className="flex flex-col gap-2" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {quickLinks.map((link) => (
                  <li key={link.to} className="flex items-center gap-2">
                    <span style={{ color: '#fd0802', fontSize: '0.6rem' }}>▶</span>
                    <NavLink
                      to={link.to}
                      style={{ color: '#a1a1aa', fontSize: '0.875rem', textDecoration: 'none' }}
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Follow Us */}
            <div>
              <h4 style={{ color: '#fd0802', fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '16px' }}>
                Follow Us
              </h4>
              <div className="flex flex-col gap-3">
                {socials.map((s) => (
                  <a key={s.name} href={'href' in s ? s.href : undefined} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2" style={{ color: '#a1a1aa', fontSize: '0.875rem', textDecoration: 'none', cursor: 'href' in s ? 'pointer' : 'default' }}>
                    <span>{s.svg}</span>
                    <span>{s.name}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="col-span-2 lg:col-span-1">
              <h4 style={{ color: '#fd0802', fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '16px' }}>
                Contact
              </h4>
              <ul className="flex flex-col gap-3" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {contactInfo.map((item) => (
                  <li key={item.value} className="flex items-start gap-2" style={{ color: '#a1a1aa', fontSize: '0.875rem' }}>
                    <span>{item.icon}</span>
                    <span>{item.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
};

export default Footer;
