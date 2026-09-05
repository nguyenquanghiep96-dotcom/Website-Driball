import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
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

const getInitialParams = () => new URLSearchParams(window.location.search);

const getOutfitDescription = (product, color) => {
  const [shirt = 'tiêu chuẩn', shorts = 'đen'] = (color?.name || '').split('/');
  const shirtStyle = product.name.includes('STRIPE') ? 'sọc' : 'phối';
  return `Áo ${shirtStyle} ${shirt.toLowerCase()}, quần ${shorts.toLowerCase()}`;
};

const formatCompactPrice = (price) => price >= 1000 && price % 1000 === 0
  ? `${new Intl.NumberFormat('vi-VN').format(price / 1000)}k`
  : formatPrice(price);

const PRINTING_INFO = [
  {
    title: 'In ấn thăng hoa',
    text: 'Hình in thấm trực tiếp vào sợi vải, nhẹ, bền màu và không bong tróc. Phù hợp cho bộ áo đội cần tối ưu chi phí.',
    image: '/images/products/stripe-blue/details/print-layout-01.jpg',
  },
  {
    title: 'In ép nhiệt PET (DTF)/Decal',
    text: 'Bề mặt in mịn, sắc nét và có độ hoàn thiện chuyên nghiệp. Phù hợp cho tên số, logo và các chi tiết nhận diện thi đấu.',
    image: '/images/products/stripe-blue/details/print-layout-02.jpg',
  },
  {
    title: 'Logo đội hiệu ứng 3D',
    text: 'Logo được làm nổi với độ dày tiêu chuẩn 1mm, tạo chiều sâu và tăng cảm giác cao cấp cho áo đấu.',
    image: '/images/products/stripe-blue/details/chest-logo.jpg',
  },
];

const copyText = async (text) => {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
};

export default function QuotePage() {
  const { slug } = useParams();
  const product = products.find((item) => item.slug === slug);

  const [selectedColor, setSelectedColor] = useState(() => Number(getInitialParams().get('color')) || 0);
  const [quantity, setQuantity] = useState(() => {
    const requestedQuantity = getInitialParams().get('qty');
    if (!requestedQuantity) return 10;
    const parsed = Number(requestedQuantity);
    return Number.isFinite(parsed) ? Math.max(1, Math.min(999, parsed)) : 10;
  });
  const [selectedPrintOption, setSelectedPrintOption] = useState(() => {
    const requested = getInitialParams().get('print');
    return PRINT_OPTIONS.some((option) => option.id === requested) ? requested : 'sublimation';
  });
  const [selectedUpgradeOptions, setSelectedUpgradeOptions] = useState(() => {
    const requested = (getInitialParams().get('upgrades') || '').split(',').filter(Boolean);
    return requested.filter((id) => UPGRADE_OPTIONS.some((option) => option.id === id));
  });
  const [notice, setNotice] = useState('');
  const [priceAnimating, setPriceAnimating] = useState(false);
  const [selectedTierQty, setSelectedTierQty] = useState(null);
  const [freeShippingSelected, setFreeShippingSelected] = useState(() => getInitialParams().get('ship') !== '0');
  const [giftSelected, setGiftSelected] = useState(() => getInitialParams().get('gift') !== '0');
  const [isPrintingInfoOpen, setPrintingInfoOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    setPriceAnimating(true);
    const timer = window.setTimeout(() => setPriceAnimating(false), 260);
    return () => window.clearTimeout(timer);
  }, [quantity, selectedPrintOption, selectedUpgradeOptions, slug]);

  useEffect(() => {
    if (!notice) return undefined;
    const timer = window.setTimeout(() => setNotice(''), 2800);
    return () => window.clearTimeout(timer);
  }, [notice]);

  useEffect(() => {
    if (!isPrintingInfoOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    const handleEscape = (event) => {
      if (event.key === 'Escape') setPrintingInfoOpen(false);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isPrintingInfoOpen]);

  const pricing = useMemo(() => {
    if (!product) return {};
    const baseUnitPrice = getUnitPrice(product.price, quantity);
    const printPrice = PRINT_OPTIONS.find((option) => option.id === selectedPrintOption)?.price || 0;
    const upgradesPrice = selectedUpgradeOptions.reduce(
      (total, id) => total + (UPGRADE_OPTIONS.find((option) => option.id === id)?.price || 0),
      0
    );
    const pricePerUnit = baseUnitPrice + printPrice + upgradesPrice;
    const merchandiseTotal = pricePerUnit * quantity;
    const shippingPrice = quantity >= 5 && freeShippingSelected ? 0 : 30000;
    return {
      baseUnitPrice,
      printPrice,
      upgradesPrice,
      pricePerUnit,
      merchandiseTotal,
      shippingPrice,
      savings: Math.max(0, (product.price - baseUnitPrice) * quantity),
      totalPrice: merchandiseTotal + shippingPrice,
    };
  }, [product, quantity, selectedPrintOption, selectedUpgradeOptions, freeShippingSelected]);

  if (!product) {
    return (
      <>
        <Navbar />
        <main className="quote-page quote-page--empty">
          <h1>Không tìm thấy mẫu áo.</h1>
          <Link to="/">Xem catalog</Link>
        </main>
        <Footer />
      </>
    );
  }

  const safeColorIndex = Math.min(selectedColor, Math.max(product.colors.length - 1, 0));
  const currentColor = product.colors[safeColorIndex];
  const currentImage = currentColor?.image || product.heroImage;
  const selectedPrint = PRINT_OPTIONS.find((option) => option.id === selectedPrintOption);
  const selectedUpgrades = UPGRADE_OPTIONS.filter((option) => selectedUpgradeOptions.includes(option.id));

  const buildShareUrl = (overrides = {}) => {
    const params = new URLSearchParams();
    params.set('qty', String(overrides.quantity ?? quantity));
    params.set('print', overrides.print ?? selectedPrintOption);
    params.set('color', String(overrides.color ?? safeColorIndex));
    const upgrades = overrides.upgrades ?? selectedUpgradeOptions;
    if (upgrades.length) params.set('upgrades', upgrades.join(','));
    if (!freeShippingSelected) params.set('ship', '0');
    if (!giftSelected) params.set('gift', '0');
    const nextSlug = overrides.slug || product.slug;
    return `${window.location.origin}/quote/${nextSlug}?${params.toString()}`;
  };

  const toggleUpgrade = (id) => {
    setSelectedUpgradeOptions((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  };

  const saveQuote = async () => {
    const quoteUrl = buildShareUrl();
    const savedQuote = {
      product: product.slug,
      quantity,
      print: selectedPrintOption,
      upgrades: selectedUpgradeOptions,
      color: safeColorIndex,
      freeShipping: freeShippingSelected,
      gift: giftSelected,
      url: quoteUrl,
      savedAt: new Date().toISOString(),
    };

    localStorage.setItem('driball-saved-quote', JSON.stringify(savedQuote));

    try {
      await copyText(quoteUrl);
      setNotice('Đã lưu và sao chép link báo giá');
    } catch {
      setNotice('Đã lưu báo giá trên thiết bị này');
    }
  };

  const sendToZalo = async () => {
    const quoteUrl = buildShareUrl();
    const message = buildZaloMessage({
      product,
      color: currentColor?.name,
      quantity,
      unitPrice: pricing.pricePerUnit,
      totalPrice: pricing.totalPrice,
      printOptions: selectedPrint?.price ? [selectedPrint] : [],
      upgradeOptions: selectedUpgrades,
      quoteUrl,
    });

    try {
      await copyText(message);
      setNotice('Đã sao chép báo giá — dán vào Zalo để gửi');
    } catch {
      setNotice('Đang mở Zalo');
    }

    window.open(`${ZALO_LINK}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  const Summary = ({ title = 'BÁO GIÁ THAM KHẢO', compact = false }) => (
    <>
      <div className="quote-summary__eyebrow">{title}</div>
      <div className={`quote-summary__product ${compact ? 'quote-summary__product--compact' : ''}`}>
        <img src={currentImage} alt="" />
        <div>
          <strong>{product.name}</strong>
          <span>{currentColor?.name || 'Màu tiêu chuẩn'}</span>
        </div>
      </div>

      <div className="quote-summary__lines">
        <div className="quote-summary__base-line">
          <span>{product.name} · Đơn giá</span>
          <span className="quote-summary__line-value"><strong>{formatPrice(pricing.baseUnitPrice)}/bộ</strong>{pricing.savings > 0 && <small>Đã giảm {formatCompactPrice(product.price - pricing.baseUnitPrice)}/bộ</small>}</span>
        </div>
        <div className="quote-summary__print-line"><span>{selectedPrint?.summaryName || selectedPrint?.name}</span><strong>+{formatPrice(pricing.printPrice)}/bộ</strong></div>
        {selectedUpgrades.map((option) => (
          <div key={option.id}><span>{option.summaryName || option.name}</span><strong>+{formatPrice(option.price)}{option.unit}</strong></div>
        ))}
        <div className="quote-summary__unit-total"><span>Chi phí cả bộ hoàn thiện</span><strong>{formatPrice(pricing.pricePerUnit)}/bộ</strong></div>
        <div className="quote-summary__shipping">
          <span><span className="material-symbols-outlined" aria-hidden="true">delivery_truck_speed</span>Phí vận chuyển</span>
          <strong>{pricing.shippingPrice === 0 ? 'Miễn phí' : formatPrice(pricing.shippingPrice)}</strong>
        </div>
        {quantity >= 10 && giftSelected && (
          <div className="quote-summary__gift">
            <img src="/images/products/captain-armband.svg" alt="" />
            <span><b><span className="material-symbols-outlined" aria-hidden="true">featured_seasonal_and_gifts</span>QUÀ TẶNG</b><em>01 Băng đội trưởng Driball</em></span>
          </div>
        )}
      </div>

      <div className="quote-summary__total">
        <span>Tổng đơn tạm tính</span>
        <strong className={priceAnimating ? 'is-updating' : ''}>{formatPrice(pricing.totalPrice)}</strong>
        <small>{pricing.savings > 0 ? `Đã giảm ${formatPrice(pricing.savings)} trên tổng đơn` : 'Giá tiêu chuẩn'}</small>
      </div>

      <button className="quote-action quote-action--zalo" onClick={sendToZalo}>
        Đặt hàng qua Zalo
      </button>
      <button className="quote-action quote-action--save" onClick={saveQuote}>
        Sao chép liên kết gửi cho đội bóng
      </button>
    </>
  );

  return (
    <>
      <Navbar />
      <main className="quote-page">
        <div className="quote-workspace">
          <div className="quote-builder">
            <section className="quote-block quote-block--products">
              <div className="quote-config-heading quote-config-heading--order">
                <h2>Đặt hàng</h2>
              </div>
              <div className="quote-product-picker">
                <article className="quote-product-current">
                  <div className="quote-product-current__visual"><img src={currentImage} alt={product.name} /></div>
                  <div className="quote-product-current__copy">
                    <h3>{product.name}</h3>
                    <p className="quote-product-current__outfit">{getOutfitDescription(product, currentColor)}</p>
                    <div className="quote-product-current__colors" aria-label="Chọn màu sản phẩm">
                      {product.colors.map((color, index) => (
                        <button key={`${color.name}-${index}`} className={safeColorIndex === index ? 'is-active' : ''} onClick={() => setSelectedColor(index)} aria-label={color.name} aria-pressed={safeColorIndex === index} title={color.name}><span style={{ background: color.hex }} /></button>
                      ))}
                    </div>
                    <strong className="quote-product-current__price">{formatPrice(product.price)} / bộ</strong>
                  </div>
                </article>
              </div>

              <div className="quote-config-heading">
                <h2>Chọn số lượng</h2>
                <p>Nhiều ưu đãi lớn khi đặt theo đội.</p>
              </div>
              <section className="quote-config-card quote-block--quantity" aria-label="Số lượng">
              <div className="quote-quantity-control">
                <button onClick={() => { setSelectedTierQty(null); setQuantity((value) => Math.max(1, value - 1)); }} disabled={quantity === 1} aria-label="Giảm số lượng">−</button>
                <label>
                  <input
                    type="number"
                    min="1"
                    max="999"
                    value={quantity}
                    onChange={(event) => { setSelectedTierQty(null); setQuantity(Math.max(1, Math.min(999, Number(event.target.value) || 1))); }}
                    aria-label="Số lượng bộ"
                  />
                  <span>BỘ</span>
                </label>
                <button onClick={() => { setSelectedTierQty(null); setQuantity((value) => Math.min(999, value + 1)); }} aria-label="Tăng số lượng">+</button>
              </div>

              <div className="quote-tiers">
                {PRICE_TIERS.map((tier) => (
                  <button
                    key={tier.minQty}
                    className={selectedTierQty === tier.minQty ? 'is-active' : ''}
                    onClick={() => { setSelectedTierQty(tier.minQty); setQuantity(tier.minQty); }}
                  >
                    <span>{tier.label}</span>
                    <strong>{formatPrice(product.price - tier.discount)}/bộ</strong>
                  </button>
                ))}
              </div>
              <div className="quote-quantity-benefits" aria-live="polite">
                {quantity >= 5 ? (
                  <button className={freeShippingSelected ? 'is-active' : ''} onClick={() => setFreeShippingSelected((value) => !value)} aria-pressed={freeShippingSelected}>
                    <span className="quote-benefit__icon material-symbols-outlined" aria-hidden="true">delivery_truck_speed</span>
                    <span><strong>Miễn phí vận chuyển</strong></span>
                    <i className="quote-benefit__check" aria-hidden="true">{freeShippingSelected && <span className="material-symbols-outlined">check</span>}</i>
                  </button>
                ) : (
                  <div className="quote-benefit quote-benefit--disabled">
                    <span className="quote-benefit__icon material-symbols-outlined" aria-hidden="true">delivery_truck_speed</span>
                    <span><strong>Phí vận chuyển 30.000đ</strong></span>
                  </div>
                )}
                {quantity >= 10 && (
                  <button className={`quote-benefit--gift ${giftSelected ? 'is-active' : ''}`} onClick={() => setGiftSelected((value) => !value)} aria-pressed={giftSelected}>
                    <img src="/images/products/captain-armband.svg" alt="" />
                    <span><b><span className="material-symbols-outlined" aria-hidden="true">featured_seasonal_and_gifts</span>QUÀ TẶNG</b><strong>01 Băng đội trưởng Driball</strong></span>
                    <i className="quote-benefit__check" aria-hidden="true">{giftSelected && <span className="material-symbols-outlined">check</span>}</i>
                  </button>
                )}
              </div>
              </section>

              <div className="quote-config-heading">
                <h2>Chọn gói in ấn</h2>
              </div>
              <section className="quote-config-card quote-block--print" aria-label="In ấn">
              <div className="quote-option-list">
                {PRINT_OPTIONS.map((option) => (
                  <button
                    key={option.id}
                    className={selectedPrintOption === option.id ? 'is-active' : ''}
                    onClick={() => setSelectedPrintOption(option.id)}
                    aria-pressed={selectedPrintOption === option.id}
                  >
                    <div className="quote-option-list__copy">
                      <div className="quote-option-list__heading">
                        <h3>{option.name}</h3>
                        {option.id !== 'none' && <strong>{option.price ? `+ ${formatPrice(option.price)}/bộ` : 'Miễn phí'}</strong>}
                      </div>
                      <p>{option.description}</p>
                    </div>
                    <i className="quote-option-list__status" aria-hidden="true">
                      {selectedPrintOption === option.id && <span className="material-symbols-outlined">check</span>}
                    </i>
                  </button>
                ))}
              </div>
              </section>

              <div className="quote-config-heading">
                <h2 className="quote-upgrade-heading">Nâng cấp in ấn</h2>
              </div>
              <section className="quote-config-card quote-block--upgrade-options" aria-label="Nâng cấp">
              <div className="quote-option-list quote-option-list--upgrades">
                {UPGRADE_OPTIONS.map((option) => {
                  const selected = selectedUpgradeOptions.includes(option.id);
                  return (
                    <button key={option.id} onClick={() => toggleUpgrade(option.id)} className={`quote-option-list__upgrade ${selected ? 'is-active' : ''}`} aria-pressed={selected}>
                      <div className="quote-option-list__copy">
                        <div className="quote-option-list__heading"><h3>{option.name}</h3><strong>+ {formatPrice(option.price)}{option.unit}</strong></div>
                        <p>{option.description}</p>
                      </div>
                      <i className="quote-option-list__status" aria-hidden="true">
                        {selected && <span className="material-symbols-outlined">check</span>}
                      </i>
                    </button>
                  );
                })}
              </div>
              </section>
              <button className="quote-printing-learn" onClick={() => setPrintingInfoOpen(true)}>
                <span><small>TÌM HIỂU THÊM</small><strong>Cách thức và chất liệu in ấn</strong></span>
                <i aria-hidden="true">+</i>
              </button>
            </section>
          </div>

          <aside className="quote-summary"><Summary /></aside>
        </div>

        <section className="quote-mobile-summary">
          <Summary title={`CHI TIẾT ĐƠN HÀNG · ${quantity} BỘ`} compact />
        </section>

        <div className={`modal-overlay quote-printing-info-overlay ${isPrintingInfoOpen ? 'active' : ''}`} onClick={() => setPrintingInfoOpen(false)}>
          {isPrintingInfoOpen && (
            <div className="modal-content quote-printing-info" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-label="Cách thức và chất liệu in ấn">
              <button className="quote-printing-info__close" onClick={() => setPrintingInfoOpen(false)} aria-label="Đóng">×</button>
              <header><span>DRIBALL PRINTING</span><h2>Cách thức và chất liệu in ấn</h2></header>
              <div className="quote-printing-info__list">
                {PRINTING_INFO.map((item) => (
                  <article key={item.title}>
                    <img src={item.image} alt="" />
                    <div><h3>{item.title}</h3><p>{item.text}</p></div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>

        {notice && <div className="quote-notice" role="status">{notice}</div>}
      </main>
      <Footer />
    </>
  );
}
