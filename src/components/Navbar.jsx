import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        <Link to="/" className="navbar__logo" onClick={() => setMenuOpen(false)}>
          <img src="/images/Driball logo.svg" alt="Driball" className="navbar__logo-img" />
        </Link>

        {/* Desktop nav links */}
        <ul className="navbar__links">
          <li><Link to="/catalog">CATALOG</Link></li>
          <li><Link to="/quote/stripe-series-blue">ĐẶT ĐỘI</Link></li>
          <li><Link to="/#about">VỀ DRIBALL</Link></li>
        </ul>

        {/* Desktop CTA */}
        <Link
          to="/quote/stripe-series-blue"
          className="btn btn-primary navbar__cta"
        >
          TÍNH GIÁ NHANH
        </Link>

        {/* Mobile hamburger */}
        <button
          className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={`navbar__drawer ${menuOpen ? 'navbar__drawer--open' : ''}`}>
        <ul className="navbar__drawer-links">
          <li><Link to="/catalog" onClick={() => setMenuOpen(false)}>CATALOG</Link></li>
          <li><Link to="/quote/stripe-series-blue" onClick={() => setMenuOpen(false)}>ĐẶT ĐỘI</Link></li>
          <li><Link to="/#about" onClick={() => setMenuOpen(false)}>VỀ DRIBALL</Link></li>
          <li>
            <Link
              to="/quote/stripe-series-blue"
              className="btn btn-primary navbar__drawer-cta"
              onClick={() => setMenuOpen(false)}
            >
              TÍNH GIÁ NHANH
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
