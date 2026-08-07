import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ScrollReveal } from '../hooks/useScrollReveal';
import {
  products,
  partners,
  formatPrice,
  PRINT_OPTIONS,
  UPGRADE_OPTIONS,
  SIZE_CHART,
  DELIVERY_TIME,
  ZALO_LINK,
} from '../data/products';
import './ProductPage.css';

export default function ProductPage() {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!product) {
    return (
      <>
        <Navbar />
        <main className="pdp">
          <div className="container">
            <div className="pdp-not-found">
              <div className="pdp-not-found__icon">🔍</div>
              <h1 className="pdp-not-found__title">Không tìm thấy sản phẩm</h1>
              <p className="pdp-not-found__text">
                Sản phẩm bạn tìm kiếm không tồn tại hoặc đã bị xoá.
              </p>
              <Link to="/" className="btn btn-primary">Quay lại trang chủ</Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const currentColor = product.colors[selectedColor];
  const isInStock = product.availability === 'in-stock';

  // Gather all unique images for the gallery
  const galleryImages = Array.from(new Set([
    product.heroImage,
    product.frontImage,
    product.backImage,
    ...(product.images || [])
  ])).filter(Boolean);

  return (
    <>
      <Navbar />
      <main className="pdp">
        <div className="pdp-container">
          
          {/* Breadcrumb */}
          <div className="pdp-breadcrumb">
            <Link to="/">Trang chủ</Link> / <span>{product.name}</span>
          </div>

          <div className="pdp-layout">
            
            {/* ═══ Left Column: Gallery ═══ */}
            <div className="pdp-gallery">
              <div className="pdp-gallery__grid">
                {galleryImages.map((img, i) => (
                  <div key={i} className="pdp-gallery__item">
                    <img src={img} alt={`${product.name} - ${i + 1}`} />
                  </div>
                ))}
              </div>
            </div>

            {/* ═══ Right Column: Details & Actions ═══ */}
            <div className="pdp-details">
              
              <div className="pdp-details__header">
                <span className={`pdp-badge ${isInStock ? 'pdp-badge--stock' : 'pdp-badge--preorder'}`}>
                  {isInStock ? '● Có sẵn' : '○ Pre-Order · 14 ngày'}
                </span>
                <h1 className="pdp-details__title">{product.name}</h1>
                <p className="pdp-details__tagline">{product.tagline}</p>
                <div className="pdp-details__price">{formatPrice(product.price)}</div>
                
                {product.bulkPrice && (
                  <div className="pdp-details__bulk">
                    Đặt từ {product.bulkMinQty} bộ: <strong>{formatPrice(product.bulkPrice)}/bộ</strong>
                  </div>
                )}
              </div>

              {/* Color Selection */}
              {product.colors.length > 0 && (
                <div className="pdp-section">
                  <div className="pdp-section__header">
                    <span className="pdp-section__title">Màu sắc</span>
                    <span className="pdp-section__value">{currentColor?.name}</span>
                  </div>
                  <div className="pdp-colors">
                    {product.colors.map((color, i) => (
                      <button
                        key={color.name}
                        className={`pdp-color-btn ${i === selectedColor ? 'active' : ''}`}
                        onClick={() => setSelectedColor(i)}
                        title={color.name}
                      >
                        <span className="pdp-color-swatch" style={{ backgroundColor: color.hex }} />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              <div className="pdp-section">
                <div className="pdp-section__header">
                  <span className="pdp-section__title">Kích cỡ</span>
                  <button className="pdp-size-guide-btn">Bảng size</button>
                </div>
                <div className="pdp-sizes">
                  {SIZE_CHART.map((sizeObj) => (
                    <button
                      key={sizeObj.size}
                      className={`pdp-size-btn ${selectedSize === sizeObj.size ? 'active' : ''}`}
                      onClick={() => setSelectedSize(sizeObj.size)}
                    >
                      {sizeObj.size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Print Options List */}
              <div className="pdp-section">
                <h3 className="pdp-section__title">Tuỳ chọn in ấn</h3>
                <div className="pdp-print-options">
                  {PRINT_OPTIONS.map((opt) => (
                    <div key={opt.id} className="pdp-print-item">
                      <div className="pdp-print-item__info">
                        <strong>{opt.name}</strong>
                        <p>{opt.description}</p>
                      </div>
                      <div className="pdp-print-item__price">
                        +{formatPrice(opt.price)}
                      </div>
                    </div>
                  ))}
                  {UPGRADE_OPTIONS.map(opt => (
                     <div key={opt.id} className="pdp-print-item">
                     <div className="pdp-print-item__info">
                       <strong>{opt.name}</strong>
                       <p>{opt.description}</p>
                     </div>
                     <div className="pdp-print-item__price">
                       +{formatPrice(opt.price)}{opt.unit}
                     </div>
                   </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pdp-actions">
                <Link to={`/quote/${product.slug}`} className="btn btn-primary pdp-actions__primary">
                  Tính giá đặt đội
                </Link>
                <a
                  href={ZALO_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline pdp-actions__secondary"
                >
                  Liên hệ Zalo
                </a>
                <div className="pdp-delivery-info">
                  🚚 Giao hàng: {DELIVERY_TIME}
                </div>
              </div>

              {/* Description & Material Accordion-style */}
              <div className="pdp-info-blocks">
                <div className="pdp-info-block">
                  <h4 className="pdp-info-block__title">Mô tả sản phẩm</h4>
                  <p className="pdp-info-block__content">{product.description}</p>
                </div>
                <div className="pdp-info-block">
                  <h4 className="pdp-info-block__title">Chất liệu</h4>
                  <p className="pdp-info-block__content">{product.material}</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ═══ Section: Teams Showcase (Full Width below details) ═══ */}
        <section className="pdp-teams section">
          <div className="container">
            <ScrollReveal>
              <h2 className="pdp-teams__title">Đội bóng đã sử dụng</h2>
              <p className="pdp-teams__subtitle">Hơn {partners.length}0+ đội bóng tin tưởng Driball</p>
            </ScrollReveal>
            <div className="pdp-teams__grid">
              {partners.slice(0, 6).map((team, i) => (
                <ScrollReveal key={team.id} delay={i % 3 + 1}>
                  <div className="pdp-teams__card">
                    <img src={team.logo} alt={team.name} className="pdp-teams__logo" />
                    <span className="pdp-teams__name">{team.name}</span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Mobile Sticky CTA */}
        <div className="pdp-sticky-cta">
          <div className="pdp-sticky-cta__inner">
            <div className="pdp-sticky-cta__price">
              <span className="pdp-sticky-cta__price-value">{formatPrice(product.price)}</span>
              <span className="pdp-sticky-cta__price-label">/bộ</span>
            </div>
            <Link to={`/quote/${product.slug}`} className="btn btn-primary pdp-sticky-cta__btn">
              Tính giá đặt đội
            </Link>
          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}
