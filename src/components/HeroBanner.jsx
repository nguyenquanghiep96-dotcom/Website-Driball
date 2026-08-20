import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './HeroBanner.css';

const HERO_SLIDES = [
  {
    eyebrow: 'DRIBALL / NEW SEASON 2026',
    title: <>DRIBALL<br /><em>TRONG TỦ ĐỒ.</em></>,
    description: 'Mẫu áo có chất sân cỏ, nhưng không chịu đứng yên trong sân.',
    image: '/images/products/stripe-blue/details/lifestyle.jpg',
    alt: 'Hai người mẫu mặc áo Driball Stripe Series',
    product: '/product/stripe-series-blue',
    quote: '/quote/stripe-series-blue',
    label: 'STRIPE SERIES',
    kind: 'photo',
  },
  {
    eyebrow: 'RAGLAN MOTION / FIRST LOOK',
    title: <>ÁO ĐẸP.<br /><em>KÈO THÊM NHIỆT.</em></>,
    description: 'Vai raglan chuyển động linh hoạt, đồ hoạ đủ nổi để nhận ra đội bạn từ xa.',
    image: '/images/products/raglan/blue.jpg',
    alt: 'Áo Driball Raglan Motion màu navy',
    product: '/product/raglan-motion-series',
    quote: '/quote/raglan-motion-series',
    label: 'RAGLAN MOTION',
    kind: 'render',
  },
  {
    eyebrow: 'FROM THE PITCH TO THE STREET',
    title: <>RA SÂN.<br /><em>RA CHẤT.</em></>,
    description: 'Một form áo thể thao đủ sạch để thi đấu, đủ cá tính để mặc tiếp sau trận.',
    image: '/images/hero-slides/red-white-editorial.jpg',
    alt: 'Người mẫu Driball với áo bóng đá đỏ và trắng',
    product: '/catalog',
    quote: '/quote/stripe-series-red',
    label: 'MATCH & LIFESTYLE',
    kind: 'editorial',
  },
];

export default function HeroBanner() {
  const [activeSlide, setActiveSlide] = useState(0);
  const slide = HERO_SLIDES[activeSlide];

  useEffect(() => {
    const timer = window.setInterval(() => setActiveSlide((value) => (value + 1) % HERO_SLIDES.length), 6500);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="hero" aria-roledescription="carousel" aria-label="Bộ sưu tập Driball">
      <div className="hero__card">
        <div className="hero__copy" key={`copy-${activeSlide}`}>
          <p className="hero__eyebrow">{slide.eyebrow}</p>
          <h1>{slide.title}</h1>
          <p className="hero__description">{slide.description}</p>
          <div className="hero__actions">
            <Link to={slide.product} className="btn btn-primary">KHÁM PHÁ MẪU ÁO <span>↗</span></Link>
            <Link to={slide.quote} className="hero__text-link">TÍNH GIÁ NHANH →</Link>
          </div>
        </div>

        <div className={`hero__visual hero__visual--${slide.kind}`}>
          {HERO_SLIDES.map((item, index) => (
            <img key={item.image} src={item.image} alt={index === activeSlide ? item.alt : ''} className={index === activeSlide ? 'is-active' : ''} aria-hidden={index !== activeSlide} />
          ))}
          <div className="hero__chip hero__chip--top"><span>0{activeSlide + 1}</span><strong>{slide.label}</strong></div>
          <div className="hero__chip hero__chip--bottom"><strong>{activeSlide === 1 ? '4' : '320K'}</strong><span>{activeSlide === 1 ? 'PHỐI MÀU' : 'TỪ 10 BỘ'}</span></div>
        </div>

        <div className="hero__pager">
          {HERO_SLIDES.map((item, index) => (
            <button key={item.label} className={index === activeSlide ? 'is-active' : ''} onClick={() => setActiveSlide(index)} aria-label={`Xem slide ${index + 1}: ${item.label}`}><span /></button>
          ))}
        </div>
        <div className="hero__ticker" aria-hidden="true"><span>FOOTBALL</span><span>STYLE</span><span>YOUR TEAM</span><span>DRIBALL</span></div>
      </div>
    </section>
  );
}
