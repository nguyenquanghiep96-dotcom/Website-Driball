import './BrandMarquee.css';

export default function BrandMarquee() {
  const text = 'TỪ SÂN BÓNG ĐẾN ĐƯỜNG PHỐ';

  return (
    <section className="marquee-section">
      {/* Floating product image */}
      <div className="marquee-section__product">
        <img
          src="/images/products/orange.png"
          alt="Stars Series Orange"
          className="marquee-section__product-img"
        />
      </div>

      {/* Rotating Driball badge */}
      <div className="marquee-section__badge">
        <img
          src="/images/products/withlove.png"
          alt="Driball Badge"
          className="marquee-section__badge-img"
        />
      </div>

      {/* Marquee scrolling text */}
      <div className="marquee">
        <div className="marquee__track">
          <span className="marquee__text">{text}</span>
          <span className="marquee__text" aria-hidden="true">{text}</span>
          <span className="marquee__text" aria-hidden="true">{text}</span>
          <span className="marquee__text" aria-hidden="true">{text}</span>
        </div>
      </div>
    </section>
  );
}
