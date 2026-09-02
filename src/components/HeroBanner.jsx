import './HeroBanner.css';

export default function HeroBanner() {
  return (
    <section className="hero" aria-label="Bộ sưu tập Driball">
      <div className="hero__card">
        <picture className="hero__visual">
          <source media="(max-width: 640px)" srcSet="/images/hero-slides/mobile-hero.jpg" />
          <img
            src="/images/hero-slides/desktop-hero.jpg"
            alt="Bộ sưu tập áo đấu Driball"
            fetchPriority="high"
          />
        </picture>
        <div className="hero__ticker" aria-hidden="true"><span>FOOTBALL</span><span>STYLE</span><span>YOUR TEAM</span><span>DRIBALL</span></div>
      </div>
    </section>
  );
}
