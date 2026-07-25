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

  return (
    <>
      <Navbar />
      <main className="pdp">

        {/* ═══ Section 1: Hero Full Viewport ═══ */}
        <section className="pdp-hero">
          <div className="pdp-hero__bg">
            <img
              src={product.heroImage}
              alt={product.name}
              className="pdp-hero__image"
            />
          </div>
          <div className="pdp-hero__content">
            <ScrollReveal>
              <h1 className="pdp-hero__title">{product.name}</h1>
              <p className="pdp-hero__tagline">{product.tagline}</p>
            </ScrollReveal>
          </div>
          <div className="pdp-hero__scroll-hint" aria-hidden="true">
            <span>Cuộn xuống</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </section>

        {/* ═══ Section 2: Overview ═══ */}
        <section className="pdp-overview section">
          <div className="container">
            <div className="pdp-overview__grid">
              <ScrollReveal>
                <div className="pdp-overview__info">
                  <span className={`pdp-badge ${isInStock ? 'pdp-badge--stock' : 'pdp-badge--preorder'}`}>
                    {isInStock ? '● Có sẵn' : '○ Pre-Order · 14 ngày'}
                  </span>
                  <h2 className="pdp-overview__name">{product.name}</h2>
                  <p className="pdp-overview__desc">{product.description}</p>

                  <div className="pdp-overview__price-block">
                    <div className="pdp-overview__price">{formatPrice(product.price)}</div>
                    {product.bulkPrice && (
                      <div className="pdp-overview__bulk">
                        Đặt từ {product.bulkMinQty} bộ: {formatPrice(product.bulkPrice)}/bộ
                      </div>
                    )}
                    <div className="pdp-overview__delivery">
                      🚚 Giao hàng: {DELIVERY_TIME}
                    </div>
                  </div>

                  <Link to={`/quote/${product.slug}`} className="btn btn-primary pdp-overview__cta">
                    Tính giá đặt đội
                  </Link>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={1}>
                <div className="pdp-overview__visual">
                  <img src={product.heroImage} alt={product.name} />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ═══ Section 3: Front / Back Views ═══ */}
        <section className="pdp-views section">
          <div className="container">
            <ScrollReveal>
              <h2 className="pdp-section-title">Thiết kế chi tiết</h2>
              <p className="pdp-section-subtitle">Mặt trước & mặt sau</p>
            </ScrollReveal>
            <div className="pdp-views__grid">
              <ScrollReveal delay={1}>
                <div className="pdp-views__card">
                  <img src={product.frontImage} alt={`${product.name} - Mặt trước`} />
                  <span className="pdp-views__label">Mặt trước</span>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={2}>
                <div className="pdp-views__card">
                  <img src={product.backImage} alt={`${product.name} - Mặt sau`} />
                  <span className="pdp-views__label">Mặt sau</span>
                </div>
              </ScrollReveal>
            </div>

            {/* Material + Colors */}
            <ScrollReveal delay={1}>
              <div className="pdp-material">
                <div className="pdp-material__item">
                  <span className="pdp-material__label">Chất liệu</span>
                  <span className="pdp-material__value">{product.material}</span>
                </div>
                {product.colors.length > 0 && (
                  <div className="pdp-material__item">
                    <span className="pdp-material__label">Màu sắc</span>
                    <div className="pdp-material__colors">
                      {product.colors.map((color, i) => (
                        <button
                          key={color.name}
                          className={`pdp-color-dot ${i === selectedColor ? 'active' : ''}`}
                          style={{ backgroundColor: color.hex }}
                          onClick={() => setSelectedColor(i)}
                          title={color.name}
                        />
                      ))}
                      <span className="pdp-material__color-name">{currentColor?.name}</span>
                    </div>
                  </div>
                )}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ═══ Section 4: Print Options ═══ */}
        <section className="pdp-print section">
          <div className="container">
            <ScrollReveal>
              <h2 className="pdp-section-title">Tuỳ chọn in ấn</h2>
              <p className="pdp-section-subtitle">Cá nhân hoá áo đấu cho đội của bạn</p>
            </ScrollReveal>

            <div className="pdp-print__grid">
              {PRINT_OPTIONS.map((opt, i) => (
                <ScrollReveal key={opt.id} delay={i + 1}>
                  <div className="pdp-print__card">
                    <div className="pdp-print__card-header">
                      <h3 className="pdp-print__card-name">{opt.name}</h3>
                      <span className="pdp-print__card-price">{formatPrice(opt.price)}</span>
                    </div>
                    <p className="pdp-print__card-desc">{opt.description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Upgrade */}
            <ScrollReveal delay={3}>
              <div className="pdp-print__upgrade">
                {UPGRADE_OPTIONS.map(opt => (
                  <div key={opt.id} className="pdp-print__upgrade-item">
                    <div>
                      <strong>{opt.name}</strong>
                      <p>{opt.description}</p>
                    </div>
                    <span className="pdp-print__upgrade-price">
                      +{formatPrice(opt.price)}{opt.unit}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ═══ Section 5: Size Chart ═══ */}
        <section className="pdp-size section">
          <div className="container">
            <ScrollReveal>
              <h2 className="pdp-section-title">Bảng size</h2>
              <p className="pdp-section-subtitle">Đơn vị: cm</p>
            </ScrollReveal>
            <ScrollReveal delay={1}>
              <div className="pdp-size__table-wrap">
                <table className="pdp-size__table">
                  <thead>
                    <tr>
                      <th>Size</th>
                      <th>Ngực</th>
                      <th>Dài áo</th>
                      <th>Vai</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SIZE_CHART.map(row => (
                      <tr key={row.size}>
                        <td><strong>{row.size}</strong></td>
                        <td>{row.chest}</td>
                        <td>{row.length}</td>
                        <td>{row.shoulder}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ═══ Section 6: Teams Showcase ═══ */}
        <section className="pdp-teams section">
          <div className="container">
            <ScrollReveal>
              <h2 className="pdp-section-title">Đội bóng đã sử dụng</h2>
              <p className="pdp-section-subtitle">Hơn {partners.length}0+ đội bóng tin tưởng Driball</p>
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

        {/* ═══ Section 7: Final CTA ═══ */}
        <section className="pdp-final-cta section">
          <div className="container">
            <ScrollReveal>
              <div className="pdp-final-cta__box">
                <h2 className="pdp-final-cta__title">{product.name}</h2>
                <div className="pdp-final-cta__price">
                  Từ {formatPrice(product.price)}/bộ
                </div>
                <div className="pdp-final-cta__actions">
                  <Link to={`/quote/${product.slug}`} className="btn btn-primary pdp-final-cta__btn">
                    Tính giá đặt đội
                  </Link>
                  <a
                    href={ZALO_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline pdp-final-cta__zalo"
                  >
                    Liên hệ Zalo
                  </a>
                </div>
              </div>
            </ScrollReveal>
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
