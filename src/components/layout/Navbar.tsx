import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import ROUTES from '../../routes/routePaths';
import GooeyNav from '../GooeyNav';

const gooeyItems = [
  { label: 'Home',          href: ROUTES.HOME },
  { label: 'Food & Drinks', href: ROUTES.FOOD_AND_DRINKS },
  { label: 'Combos',        href: ROUTES.COMBOS },
  { label: 'About',         href: ROUTES.ABOUT },
  { label: 'Contact',       href: ROUTES.CONTACT },
];

const navLinks = [
  { label: 'Home',          to: ROUTES.HOME },
  { label: 'Food & Drinks', to: ROUTES.FOOD_AND_DRINKS },
  { label: 'Combos',        to: ROUTES.COMBOS },
  { label: 'About',         to: ROUTES.ABOUT },
  { label: 'Contact',       to: ROUTES.CONTACT },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const activeIndex = gooeyItems.findIndex(item =>
    item.href === '/' ? location.pathname === '/' : location.pathname.startsWith(item.href)
  );

  return (
    <nav
      style={{ background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)', borderBottom: '1px solid rgba(233,108,51,0.15)', overflow: 'visible' }}
      className="sticky top-0 z-50"
    >
      {/* ── Main bar ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between gap-6" style={{ height: '56px', overflow: 'visible' }}>

          {/* Logo */}
          <NavLink to={ROUTES.HOME} className="flex items-center gap-3 shrink-0" style={{ overflow: 'visible' }}>
            <img
              src="/nav_logo.png"
              alt="Dip & Dash"
              style={{ height: '240px', width: 'auto', maxWidth: '460px', objectFit: 'contain', position: 'relative', zIndex: 51, marginLeft: '-180px', marginBottom: '-20px' }}
            />
          </NavLink>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center flex-1 justify-end">
            <div style={{ background: 'transparent', borderRadius: '100vw', padding: '0', border: 'none', boxShadow: 'none' }}>
              <GooeyNav
                items={gooeyItems}
                initialActiveIndex={activeIndex >= 0 ? activeIndex : 0}
                particleCount={15}
                colors={[1, 2, 3, 1, 2, 3, 1, 4]}
              />
            </div>
          </div>

          {/* Right: CTA + hamburger */}
          <div className="flex items-center gap-3 shrink-0">
            <NavLink
              to={ROUTES.CONTACT}
              className="hidden lg:inline-flex items-center px-5 py-2 rounded-full text-white text-sm font-bold transition-colors"
              style={{ backgroundColor: '#fd0802' }}
            >
              Visit Us
            </NavLink>

            {/* Hamburger - mobile only */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors"
              aria-label="Toggle navigation"
            >
              <span style={{ display: 'block', width: '20px', height: '2px', backgroundColor: '#333', borderRadius: '2px', transition: 'all 0.3s', transform: isOpen ? 'rotate(45deg) translateY(7px)' : 'none' }} />
              <span style={{ display: 'block', width: '20px', height: '2px', backgroundColor: '#333', borderRadius: '2px', transition: 'all 0.3s', opacity: isOpen ? 0 : 1 }} />
              <span style={{ display: 'block', width: '20px', height: '2px', backgroundColor: '#333', borderRadius: '2px', transition: 'all 0.3s', transform: isOpen ? 'rotate(-45deg) translateY(-7px)' : 'none' }} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile dropdown ── */}
      {isOpen && (
        <div
          style={{ backgroundColor: '#ffffff', borderTop: '1px solid rgba(0,0,0,0.08)' }}
          className="md:hidden px-4 py-3 flex flex-col gap-1"
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === ROUTES.HOME}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 rounded-xl text-sm font-semibold transition-colors"
              style={({ isActive }) =>
                isActive
                  ? { color: '#fd0802', backgroundColor: 'rgba(245,168,0,0.10)', border: '1px solid rgba(245,168,0,0.20)' }
                  : { color: '#444444' }
              }
            >
              {link.label}
            </NavLink>
          ))}

          <NavLink
            to={ROUTES.CONTACT}
            onClick={() => setIsOpen(false)}
            className="mt-2 block text-center px-4 py-3 rounded-xl text-white text-sm font-bold"
            style={{ backgroundColor: '#fd0802' }}
          >
            Visit Us
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
