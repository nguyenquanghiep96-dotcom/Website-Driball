import { Link } from 'react-router-dom';
import './HeroBanner.css';

export default function HeroBanner() {
  return (
    <section className="hero">
      <div className="hero__card">
        {/* Full-bleed hero image */}
        <img
          src="/images/hero/HERO1.jpg"
          alt="Driball - Bộ sưu tập mới"
          className="hero__image"
        />

        {/* Bottom-left overlay content */}
        <div className="hero__overlay">
          <h1 className="hero__tag">#NEW ARRIVALS</h1>
          <p className="hero__description">
            Những chiếc áo với thiết kế và gam màu mang
            tính biểu tượng, cảm hứng từ bóng đá Anh
            cuối thập niên 90.
          </p>
          <Link to="/product/stripe-series-blue" className="btn btn-primary hero__cta">
            ĐẶT ĐỘI
          </Link>
        </div>
      </div>
    </section>
  );
}
