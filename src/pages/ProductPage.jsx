import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ScrollReveal } from '../hooks/useScrollReveal';
import {
  products,
  formatPrice,
  PRINT_OPTIONS,
  ZALO_LINK,
} from '../data/products';
import './ProductPage.css';

export default function ProductPage() {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug);
  const [selectedColor, setSelectedColor] = useState(0);
  const [imageTransition, setImageTransition] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!product) {
    return (
      <>
        <Navbar />
        <main className="product-page">
          <div className="container">
            <div className="product-not-found">
              <div className="product-not-found__icon">🔍</div>
              <h1 className="product-not-found__title">
                Không tìm thấy sản phẩm
              </h1>
              <p className="product-not-found__text">
                Sản phẩm bạn tìm kiếm không tồn tại hoặc đã bị xoá.
              </p>
              <Link to="/" className="product-not-found__link">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Quay lại trang chủ
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const currentColor = product.colors[selectedColor];
  const currentImage = currentColor?.image || product.heroImage;

  const handleColorChange = (index) => {
    if (index === selectedColor) return;
    setImageTransition(true);
    setTimeout(() => {
      setSelectedColor(index);
      setImageTransition(false);
    }, 200);
  };

  const isLightColor = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return (r * 299 + g * 587 + b * 114) / 1000 > 200;
  };

  return (
    <>
      <Navbar />
      <main className="product-page">
        <div className="container">
          {/* Back Button */}
          <ScrollReveal>
            <Link to="/" className="product-back">
              <span className="product-back__arrow">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              Quay lại
            </Link>
          </ScrollReveal>

          {/* Hero: Image + Info */}
          <div className="product-hero">
            {/* Gallery */}
            <ScrollReveal className="product-gallery">
              <div className="product-gallery__main">
                <img
                  src={currentImage}
                  alt={`${product.name} — ${currentColor?.name || ''}`}
                  className={imageTransition ? 'image-entering' : ''}
                />
              </div>

              {product.images.length > 1 && (
                <div className="product-gallery__thumbs">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      className={`product-gallery__thumb ${
                        currentImage === img ? 'active' : ''
                      }`}
                      onClick={() => {
                        // Find the color that matches this image
                        const colorIndex = product.colors.findIndex(
                          (c) => c.image === img
                        );
                        if (colorIndex !== -1) {
                          handleColorChange(colorIndex);
                        }
                      }}
                      aria-label={`Xem ảnh ${i + 1}`}
                    >
                      <img src={img} alt="" />
                    </button>
                  ))}
                </div>
              )}
            </ScrollReveal>

            {/* Product Info */}
            <div className="product-info">
              <ScrollReveal>
                <h1 className="product-info__name">{product.name}</h1>
              </ScrollReveal>

              <ScrollReveal delay={1}>
                <div className="product-info__pricing">
                  <div className="product-info__price">
                    {formatPrice(product.price)}
                  </div>
                  {product.bulkPrice && (
                    <div className="product-info__bulk-price">
                      <span className="product-info__bulk-badge">
                        Ưu đãi đội
                      </span>
                      Đặt từ {product.bulkMinQty} bộ giá còn{' '}
                      {formatPrice(product.bulkPrice)}
                    </div>
                  )}
                </div>
              </ScrollReveal>

              <ScrollReveal delay={2}>
                <p className="product-info__description">
                  {product.description}
                </p>
              </ScrollReveal>

              {/* Material */}
              <ScrollReveal delay={2}>
                <div className="product-info__material">
                  <svg
                    className="product-info__material-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M20.38 3.46L16 2 12 3.46 8 2 3.62 3.46a.84.84 0 00-.62.82v16.15c0 .48.49.83.94.68L8 19.54l4 1.46 4-1.46 4.38 1.57c.45.15.94-.2.94-.68V4.28c0-.36-.22-.67-.56-.82z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="product-info__material-text">
                    <span className="product-info__material-label">
                      Chất liệu
                    </span>
                    {product.material}
                  </div>
                </div>
              </ScrollReveal>

              {/* Color Selection */}
              {product.colors.length > 0 && (
                <ScrollReveal delay={3}>
                  <div className="product-colors">
                    <div className="product-colors__label">
                      Màu sắc:{' '}
                      <span className="product-colors__selected-name">
                        {currentColor?.name}
                      </span>
                    </div>
                    <div className="product-colors__swatches">
                      {product.colors.map((color, i) => (
                        <button
                          key={color.name}
                          className={`product-color-swatch ${
                            i === selectedColor ? 'active' : ''
                          } ${
                            isLightColor(color.hex)
                              ? 'product-color-swatch--light'
                              : ''
                          }`}
                          style={{ backgroundColor: color.hex }}
                          onClick={() => handleColorChange(i)}
                          aria-label={`Chọn màu ${color.name}`}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              )}

              {/* Print Options Preview */}
              <ScrollReveal delay={3}>
                <div className="product-print-options">
                  <h3 className="product-print-options__title">
                    Tuỳ chọn in ấn
                  </h3>
                  {PRINT_OPTIONS.map((opt) => (
                    <div key={opt.id} className="product-print-option">
                      <div className="product-print-option__icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" strokeLinecap="round" strokeLinejoin="round" />
                          <rect x="6" y="14" width="12" height="8" rx="1" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div className="product-print-option__info">
                        <div className="product-print-option__name">
                          {opt.name}
                        </div>
                        <div className="product-print-option__desc">
                          {opt.description}
                        </div>
                      </div>
                      <div className="product-print-option__price">
                        +{formatPrice(opt.price)}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              {/* Desktop CTA */}
              <ScrollReveal delay={4}>
                <div className="product-cta">
                  <div className="product-cta__inner">
                    <Link
                      to={`/quote/${product.slug}`}
                      className="product-cta__button"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" strokeLinecap="round" strokeLinejoin="round" />
                        <rect x="9" y="3" width="6" height="4" rx="1" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M9 14l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Báo giá đặt đội
                    </Link>
                    <a
                      href={ZALO_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="product-cta__zalo"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Liên hệ Zalo
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>

        {/* Mobile Sticky CTA */}
        <div className="product-sticky-cta">
          <div className="product-sticky-cta__inner">
            <div className="product-sticky-cta__price">
              <span className="product-sticky-cta__price-value">
                {formatPrice(product.price)}
              </span>
              <span className="product-sticky-cta__price-label">
                /bộ
              </span>
            </div>
            <Link
              to={`/quote/${product.slug}`}
              className="product-sticky-cta__button"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="9" y="3" width="6" height="4" rx="1" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9 14l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Báo giá đặt đội
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
