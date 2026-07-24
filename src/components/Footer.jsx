import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer" id="about">
      <div className="footer__inner container">
        <div className="footer__brand">
          <span className="footer__logo">DRIBALL</span>
          <p className="footer__tagline">Từ sân bóng đến đường phố.</p>
        </div>

        <div className="footer__social">
          <a
            href="https://facebook.com/driball.vietnam"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__social-link"
            aria-label="Facebook"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
            </svg>
          </a>
          <a
            href="https://instagram.com/driball.vietnam"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__social-link"
            aria-label="Instagram"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
          </a>
        </div>

        <div className="footer__copyright">
          © 2024 Driball. Từ sân bóng đến đường phố.
        </div>
      </div>
    </footer>
  );
}
