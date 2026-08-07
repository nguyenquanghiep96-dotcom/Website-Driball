import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HeroBanner.css';

const HERO_IMAGES = [
  '/images/hero/HERO1.jpg',
  '/images/hero/HERO2.jpg',
  '/images/hero/HERO3.jpg',
];

/**
 * Hero Banner with 2 display modes:
 *   mode="image"   → Full cover image (default, current HERO1.jpg)
 *   mode="product"  → Transparent product image + large typo text (Apple iPad Air style)
 *
 * Switch by changing the mode prop from HomePage.
 */
export default function HeroBanner({ mode = 'image' }) {
  const isProduct = mode === 'product';
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!isProduct) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isProduct]);

  return (
    <section className="hero">
      <div className={`hero__card ${isProduct ? 'hero__card--product' : 'hero__card--image'}`}>
        {/* Mode: Full cover image */}
        {!isProduct && (
          <img
            src="/images/hero/HERO1.jpg"
            alt="Driball - Bộ sưu tập mới"
            className="hero__cover"
          />
        )}

        {/* Mode: Product with typo / slider */}
        {isProduct && (
          <>
            <div className="hero__typo" aria-hidden="true" style={{ display: 'none' }}>
              <span className="hero__typo-line">STARS</span>
              <span className="hero__typo-line">SERIES</span>
            </div>
            
            {/* Slider Images */}
            {HERO_IMAGES.map((src, index) => (
              <img
                key={src}
                src={src}
                alt={`Hero ${index + 1}`}
                className={`hero__slider-img ${index === currentSlide ? 'hero__slider-img--active' : ''}`}
              />
            ))}
          </>
        )}

        {/* Overlay content — always bottom-left */}
        <div className="hero__overlay">
          <h1 className="hero__tag">#NEW ARRIVALS</h1>
          <p className="hero__description">
            Những chiếc áo với thiết kế và gam màu mang
            tính biểu tượng, cảm hứng từ bóng đá Anh
            cuối thập niên 90.
          </p>
          <Link to="/product/stripe-series-blue" className="btn btn-primary hero__cta">
            BÁO GIÁ ĐẶT ĐỘI
          </Link>
        </div>
      </div>
    </section>
  );
}
