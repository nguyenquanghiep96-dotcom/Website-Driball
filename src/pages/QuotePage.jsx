import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ScrollReveal } from '../hooks/useScrollReveal';
import {
  products,
  formatPrice,
  getUnitPrice,
  buildZaloMessage,
  PRICE_TIERS,
  PRINT_OPTIONS,
  UPGRADE_OPTIONS,
  ZALO_LINK,
} from '../data/products';
import './QuotePage.css';

export default function QuotePage() {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug);

  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedPrintOptions, setSelectedPrintOptions] = useState([]);
  const [selectedUpgradeOptions, setSelectedUpgradeOptions] = useState([]);
  const [priceAnimating, setPriceAnimating] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Animate price on change
  useEffect(() => {
    setPriceAnimating(true);
    const timer = setTimeout(() => setPriceAnimating(false), 300);
    return () => clearTimeout(timer);
  }, [quantity, selectedPrintOptions.length, selectedUpgradeOptions.length]);

  // Pricing calculations
  const pricing = useMemo(() => {
    if (!product) return {};

    const unitPrice = getUnitPrice(product.price, quantity);
    const printTotal = selectedPrintOptions.reduce(
      (sum, id) => sum + (PRINT_OPTIONS.find((o) => o.id === id)?.price || 0),
      0
    );
    const upgradeTotal = selectedUpgradeOptions.reduce(
      (sum, id) => sum + (UPGRADE_OPTIONS.find((o) => o.id === id)?.price || 0),
      0
    );
    const optionsTotal = printTotal + upgradeTotal;
    const pricePerUnit = unitPrice + optionsTotal;
    const totalPrice = pricePerUnit * quantity;

    return { unitPrice, optionsTotal, pricePerUnit, totalPrice };
  }, [product, quantity, selectedPrintOptions, selectedUpgradeOptions]);

  // Active tier
  const activeTier = useMemo(() => {
    const sorted = [...PRICE_TIERS].sort((a, b) => b.minQty - a.minQty);
    return sorted.find((t) => quantity >= t.minQty);
  }, [quantity]);

  if (!product) {
    return (
      <>
        <Navbar />
        <main className="quote-page">
          <div className="container">
            <div className="quote-not-found">
              <div className="quote-not-found__icon">🔍</div>
              <h1 className="quote-not-found__title">
                Không tìm thấy sản phẩm
              </h1>
              <p className="quote-not-found__text">
                Sản phẩm bạn tìm kiếm không tồn tại hoặc đã bị xoá.
              </p>
              <Link to="/" className="quote-not-found__link">
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

  const isLightColor = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return (r * 299 + g * 587 + b * 114) / 1000 > 200;
  };

  const togglePrintOption = (id) => {
    setSelectedPrintOptions((prev) =>
      prev.includes(id) ? prev.filter((o) => o !== id) : [...prev, id]
    );
  };

  const toggleUpgradeOption = (id) => {
    setSelectedUpgradeOptions((prev) =>
      prev.includes(id) ? prev.filter((o) => o !== id) : [...prev, id]
    );
  };

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleSendZalo = () => {
    const selectedPrintObjs = PRINT_OPTIONS.filter((o) =>
      selectedPrintOptions.includes(o.id)
    );
    const selectedUpgradeObjs = UPGRADE_OPTIONS.filter((o) =>
      selectedUpgradeOptions.includes(o.id)
    );

    const message = buildZaloMessage({
      product,
      color: currentColor?.name,
      quantity,
      unitPrice: pricing.pricePerUnit,
      totalPrice: pricing.totalPrice,
      printOptions: selectedPrintObjs,
      upgradeOptions: selectedUpgradeObjs,
    });

    window.open(
      ZALO_LINK + '?text=' + encodeURIComponent(message),
      '_blank',
      'noopener,noreferrer'
    );
  };

  // Summary content (shared between desktop and mobile)
  const SummaryContent = () => (
    <>
      <div className="quote-summary__title">Tóm tắt đơn hàng</div>

      <div className="quote-summary__row">
        <span className="quote-summary__row-label">{product.name}</span>
        <span className="quote-summary__row-value">
          {currentColor?.name}
        </span>
      </div>

      <div className="quote-summary__row">
        <span className="quote-summary__row-label">Số lượng</span>
        <span className="quote-summary__row-value">{quantity} bộ</span>
      </div>

      <div className="quote-summary__row">
        <span className="quote-summary__row-label">Đơn giá gốc</span>
        <span className="quote-summary__row-value">
          {formatPrice(pricing.unitPrice)}
        </span>
      </div>

      {(selectedPrintOptions.length > 0 || selectedUpgradeOptions.length > 0) && (
        <>
          <hr className="quote-summary__divider" />

          {selectedPrintOptions.map((id) => {
            const opt = PRINT_OPTIONS.find((o) => o.id === id);
            if (!opt) return null;
            return (
              <div key={id} className="quote-summary__option">
                <span className="quote-summary__option-name">
                  <span className="quote-summary__option-dot" />
                  {opt.name}
                </span>
                <span className="quote-summary__option-price">
                  +{formatPrice(opt.price)}
                </span>
              </div>
            );
          })}

          {selectedUpgradeOptions.map((id) => {
            const opt = UPGRADE_OPTIONS.find((o) => o.id === id);
            if (!opt) return null;
            return (
              <div key={id} className="quote-summary__option">
                <span className="quote-summary__option-name">
                  <span className="quote-summary__option-dot" />
                  {opt.name}
                </span>
                <span className="quote-summary__option-price">
                  +{formatPrice(opt.price)}
                </span>
              </div>
            );
          })}
        </>
      )}

      <hr className="quote-summary__divider" />

      <div className="quote-summary__total-row">
        <span className="quote-summary__total-label">Tổng cộng</span>
        <span
          className={`quote-summary__total-price quote-price-animated ${
            priceAnimating ? 'updating' : ''
          }`}
        >
          {formatPrice(pricing.totalPrice)}
        </span>
      </div>

      <div className="quote-summary__per-unit">
        {formatPrice(pricing.pricePerUnit)}/bộ × {quantity} bộ
      </div>

      <button className="quote-summary__cta" onClick={handleSendZalo}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Gửi báo giá qua Zalo
      </button>
    </>
  );

  return (
    <>
      <Navbar />
      <main className="quote-page">
        <div className="container">
          {/* Back Button */}
          <ScrollReveal>
            <Link to={`/product/${product.slug}`} className="quote-back">
              <span className="quote-back__arrow">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              Quay lại sản phẩm
            </Link>
          </ScrollReveal>

          {/* Header */}
          <ScrollReveal>
            <div className="quote-header">
              <h1 className="quote-header__title">Báo giá đặt đội</h1>
              <p className="quote-header__subtitle">
                Tuỳ chỉnh và nhận báo giá ngay — nhanh chóng, minh bạch.
              </p>
            </div>
          </ScrollReveal>

          {/* Layout: Steps + Summary */}
          <div className="quote-layout">
            {/* Steps Column */}
            <div className="quote-steps">
              {/* Step 1: Product Confirmation */}
              <ScrollReveal>
                <div className="quote-step">
                  <span className="quote-step__number">1</span>
                  <h2 className="quote-step__title">Sản phẩm đã chọn</h2>

                  <div className="quote-product">
                    <div className="quote-product__image">
                      <img
                        src={currentImage}
                        alt={product.name}
                      />
                    </div>
                    <div className="quote-product__details">
                      <h3 className="quote-product__name">{product.name}</h3>
                      <div className="quote-product__price">
                        {formatPrice(pricing.unitPrice)}/bộ
                      </div>

                      {product.colors.length > 1 && (
                        <div>
                          <div className="quote-colors__label">
                            Màu:{' '}
                            <span className="quote-colors__selected-name">
                              {currentColor?.name}
                            </span>
                          </div>
                          <div className="quote-colors__swatches">
                            {product.colors.map((color, i) => (
                              <button
                                key={color.name}
                                className={`quote-color-swatch ${
                                  i === selectedColor ? 'active' : ''
                                } ${
                                  isLightColor(color.hex)
                                    ? 'quote-color-swatch--light'
                                    : ''
                                }`}
                                style={{ backgroundColor: color.hex }}
                                onClick={() => setSelectedColor(i)}
                                aria-label={`Chọn màu ${color.name}`}
                                title={color.name}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Step 2: Quantity */}
              <ScrollReveal>
                <div className="quote-step">
                  <span className="quote-step__number">2</span>
                  <h2 className="quote-step__title">Chọn số lượng</h2>

                  <div className="quote-quantity">
                    <div className="quote-quantity__input-row">
                      <button
                        className="quote-quantity__btn"
                        onClick={() => handleQuantityChange(-1)}
                        disabled={quantity <= 1}
                        aria-label="Giảm số lượng"
                      >
                        −
                      </button>
                      <span className="quote-quantity__value">
                        {quantity}
                        <span className="quote-quantity__unit"> bộ</span>
                      </span>
                      <button
                        className="quote-quantity__btn"
                        onClick={() => handleQuantityChange(1)}
                        aria-label="Tăng số lượng"
                      >
                        +
                      </button>
                    </div>

                    <div className="quote-tiers">
                      {PRICE_TIERS.map((tier) => (
                        <div
                          key={tier.minQty}
                          className={`quote-tier ${
                            activeTier?.minQty === tier.minQty ? 'active' : ''
                          }`}
                        >
                          <div className="quote-tier__label">{tier.label}</div>
                          <div className="quote-tier__price">
                            {formatPrice(product.price - tier.discount)}
                            /bộ
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Step 3: Print Options */}
              <ScrollReveal>
                <div className="quote-step">
                  <span className="quote-step__number">3</span>
                  <h2 className="quote-step__title">Tuỳ chọn in ấn</h2>

                  <div className="quote-options">
                    {PRINT_OPTIONS.map((opt) => (
                      <div
                        key={opt.id}
                        className={`quote-option-card ${
                          selectedPrintOptions.includes(opt.id) ? 'selected' : ''
                        }`}
                        onClick={() => togglePrintOption(opt.id)}
                        role="checkbox"
                        aria-checked={selectedPrintOptions.includes(opt.id)}
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            togglePrintOption(opt.id);
                          }
                        }}
                      >
                        <div className="quote-option-card__check">
                          <svg
                            className="quote-option-card__check-icon"
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                          >
                            <path
                              d="M3 7L6 10L11 4"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div className="quote-option-card__info">
                          <div className="quote-option-card__name">
                            {opt.name}
                          </div>
                          <div className="quote-option-card__desc">
                            {opt.description}
                          </div>
                        </div>
                        <div className="quote-option-card__price">
                          +{formatPrice(opt.price)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              {/* Step 4: Upgrades */}
              <ScrollReveal>
                <div className="quote-step">
                  <span className="quote-step__number">4</span>
                  <h2 className="quote-step__title">Nâng cấp</h2>

                  <div className="quote-options">
                    {UPGRADE_OPTIONS.map((opt) => (
                      <div
                        key={opt.id}
                        className={`quote-option-card ${
                          selectedUpgradeOptions.includes(opt.id)
                            ? 'selected'
                            : ''
                        }`}
                        onClick={() => toggleUpgradeOption(opt.id)}
                        role="checkbox"
                        aria-checked={selectedUpgradeOptions.includes(opt.id)}
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            toggleUpgradeOption(opt.id);
                          }
                        }}
                      >
                        <div className="quote-option-card__check">
                          <svg
                            className="quote-option-card__check-icon"
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                          >
                            <path
                              d="M3 7L6 10L11 4"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div className="quote-option-card__info">
                          <div className="quote-option-card__name">
                            {opt.name}
                          </div>
                          <div className="quote-option-card__desc">
                            {opt.description}
                          </div>
                        </div>
                        <div className="quote-option-card__price">
                          +{formatPrice(opt.price)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Desktop Summary Sidebar */}
            <div className="quote-summary-wrapper">
              <div className="quote-summary">
                <SummaryContent />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Sticky Summary */}
        <div className="quote-mobile-summary">
          <div className="quote-mobile-summary__inner">
            <div className="quote-mobile-summary__top">
              <span className="quote-mobile-summary__label">
                {quantity} bộ × {formatPrice(pricing.pricePerUnit)}
              </span>
              <span
                className={`quote-mobile-summary__total quote-price-animated ${
                  priceAnimating ? 'updating' : ''
                }`}
              >
                {formatPrice(pricing.totalPrice)}
              </span>
            </div>
            <button
              className="quote-mobile-summary__cta"
              onClick={handleSendZalo}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Gửi báo giá qua Zalo
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
