import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ZALO_LINK } from '../data/products';
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
          <li><a href="#products">SHOP</a></li>
          <li><a href={ZALO_LINK} target="_blank" rel="noopener noreferrer">ĐẶT ĐỘI</a></li>
          <li><a href="#about">VỀ DRIBALL</a></li>
        </ul>

        {/* Desktop CTA */}
        <a
          href={ZALO_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary navbar__cta"
        >
          BÁO GIÁ ĐẶT ĐỘI
        </a>

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
          <li><a href="#products" onClick={() => setMenuOpen(false)}>SHOP</a></li>
          <li><a href={ZALO_LINK} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>ĐẶT ĐỘI</a></li>
          <li><a href="#about" onClick={() => setMenuOpen(false)}>VỀ DRIBALL</a></li>
          <li>
            <a
              href={ZALO_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary navbar__drawer-cta"
              onClick={() => setMenuOpen(false)}
            >
              BÁO GIÁ ĐẶT ĐỘI
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
