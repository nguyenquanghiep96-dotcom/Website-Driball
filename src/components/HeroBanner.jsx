import { Link } from 'react-router-dom';
import './HeroBanner.css';

export default function HeroBanner() {
  return (
    <section className="hero">
      <div className="hero__card">
        {/* Background watermark text — two lines */}
        <div className="hero__bg-text" aria-hidden="true">
          <span className="hero__bg-text-line">STARS</span>
          <span className="hero__bg-text-line">SERIES</span>
        </div>

        {/* Product image — positioned center-right */}
        <img
          src="/images/hero/hero.png"
          alt="Stars Series - Bộ sưu tập mới"
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
