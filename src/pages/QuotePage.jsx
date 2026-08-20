import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
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
  const navigate = useNavigate();
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
    return PRINT_OPTIONS.some((option) => option.id === requested) ? requested : 'basic';
  });
  const [selectedUpgradeOptions, setSelectedUpgradeOptions] = useState(() => {
    const requested = (getInitialParams().get('upgrades') || '').split(',').filter(Boolean);
    return requested.filter((id) => UPGRADE_OPTIONS.some((option) => option.id === id));
  });
  const [notice, setNotice] = useState('');
  const [priceAnimating, setPriceAnimating] = useState(false);

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

  const pricing = useMemo(() => {
    if (!product) return {};
    const baseUnitPrice = getUnitPrice(product.price, quantity);
    const printPrice = PRINT_OPTIONS.find((option) => option.id === selectedPrintOption)?.price || 0;
    const upgradesPrice = selectedUpgradeOptions.reduce(
      (total, id) => total + (UPGRADE_OPTIONS.find((option) => option.id === id)?.price || 0),
      0
    );
    const pricePerUnit = baseUnitPrice + printPrice + upgradesPrice;
    return {
      baseUnitPrice,
      printPrice,
      upgradesPrice,
      pricePerUnit,
      totalPrice: pricePerUnit * quantity,
    };
  }, [product, quantity, selectedPrintOption, selectedUpgradeOptions]);

  const activeTier = useMemo(() => {
    const tiers = [...PRICE_TIERS].sort((a, b) => b.minQty - a.minQty);
    return tiers.find((tier) => quantity >= tier.minQty);
  }, [quantity]);

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
    const nextSlug = overrides.slug || product.slug;
    return `${window.location.origin}/quote/${nextSlug}?${params.toString()}`;
  };

  const changeProduct = (nextSlug) => {
    if (nextSlug === product.slug) return;
    setSelectedColor(0);
    navigate(buildShareUrl({ slug: nextSlug, color: 0 }).replace(window.location.origin, ''));
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

  const Summary = () => (
    <>
      <div className="quote-summary__eyebrow">BÁO GIÁ THAM KHẢO</div>
      <div className="quote-summary__product">
        <img src={currentImage} alt="" />
        <div>
          <strong>{product.name}</strong>
          <span>{currentColor?.name || 'Màu tiêu chuẩn'}</span>
        </div>
      </div>

      <div className="quote-summary__lines">
        <div><span>Áo · {quantity} bộ</span><strong>{formatPrice(pricing.baseUnitPrice)}/bộ</strong></div>
        <div><span>{selectedPrint?.name}</span><strong>{pricing.printPrice ? `+${formatPrice(pricing.printPrice)}` : '0đ'}</strong></div>
        {selectedUpgrades.map((option) => (
          <div key={option.id}><span>{option.name}</span><strong>+{formatPrice(option.price)}</strong></div>
        ))}
      </div>

      <div className="quote-summary__total">
        <span>Tạm tính</span>
        <strong className={priceAnimating ? 'is-updating' : ''}>{formatPrice(pricing.totalPrice)}</strong>
        <small>{formatPrice(pricing.pricePerUnit)} / bộ</small>
      </div>

      <button className="quote-action quote-action--zalo" onClick={sendToZalo}>
        Gửi Driball qua Zalo <span>↗</span>
      </button>
      <button className="quote-action quote-action--save" onClick={saveQuote}>
        Lưu & sao chép link cho team
      </button>
      <p className="quote-summary__note">Giá cuối cùng được xác nhận sau khi duyệt thiết kế và số lượng thực tế.</p>
    </>
  );

  return (
    <>
      <Navbar />
      <main className="quote-page">
        <header className="quote-cover">
          <div>
            <span>DRIBALL KIT CONFIGURATOR</span>
            <h1>Tự phối.<br />Tự tính.</h1>
          </div>
          <p>Chọn mẫu, số lượng và cách in. Giá thay đổi ngay khi bạn chọn.</p>
          <Link to={`/product/${product.slug}`}>← Xem lại chi tiết mẫu</Link>
        </header>

        <div className="quote-workspace">
          <div className="quote-builder">
            <section className="quote-block quote-block--products">
              <div className="quote-block__heading">
                <span>01</span>
                <div>
                  <p>CHỌN MẪU</p>
                  <h2>{product.name}</h2>
                </div>
              </div>

              <div className="quote-product-picker">
                <article className="quote-product-current">
                  <div className="quote-product-current__visual"><img src={currentImage} alt={product.name} /></div>
                  <div className="quote-product-current__copy">
                    <span>MẪU ĐANG CHỌN</span>
                    <h3>{product.name}</h3>
                    <p>{product.tagline}</p>
                    <label>
                      <span>Đổi sang mẫu khác</span>
                      <select value={product.slug} onChange={(event) => changeProduct(event.target.value)}>
                        {products.map((item) => <option value={item.slug} key={item.id}>{item.name} · {item.colors[0]?.name}</option>)}
                      </select>
                    </label>
                  </div>
                </article>
              </div>
            </section>

            <section className="quote-block quote-block--quantity">
              <div className="quote-block__heading">
                <span>02</span>
                <div>
                  <p>SỐ LƯỢNG</p>
                  <h2>Càng đông, giá càng tốt.</h2>
                </div>
              </div>

              <div className="quote-quantity-control">
                <button onClick={() => setQuantity((value) => Math.max(1, value - 1))} disabled={quantity === 1} aria-label="Giảm số lượng">−</button>
                <label>
                  <input
                    type="number"
                    min="1"
                    max="999"
                    value={quantity}
                    onChange={(event) => setQuantity(Math.max(1, Math.min(999, Number(event.target.value) || 1)))}
                    aria-label="Số lượng bộ"
                  />
                  <span>BỘ</span>
                </label>
                <button onClick={() => setQuantity((value) => Math.min(999, value + 1))} aria-label="Tăng số lượng">+</button>
              </div>

              <div className="quote-quick-quantities">
                {[10, 20, 30, 50].map((value) => (
                  <button key={value} onClick={() => setQuantity(value)} className={quantity === value ? 'is-active' : ''}>{value} bộ</button>
                ))}
              </div>

              <div className="quote-tiers">
                {PRICE_TIERS.map((tier) => (
                  <button
                    key={tier.minQty}
                    className={activeTier?.minQty === tier.minQty ? 'is-active' : ''}
                    onClick={() => setQuantity(tier.minQty)}
                  >
                    <span>{tier.label}</span>
                    <strong>{formatPrice(product.price - tier.discount)}</strong>
                  </button>
                ))}
              </div>
            </section>

            <section className="quote-block quote-block--print">
              <div className="quote-block__heading">
                <span>03</span>
                <div>
                  <p>IN ẤN</p>
                  <h2>Đặt dấu ấn của đội.</h2>
                </div>
              </div>

              <div className="quote-option-grid">
                {PRINT_OPTIONS.map((option, index) => (
                  <button
                    key={option.id}
                    className={selectedPrintOption === option.id ? 'is-active' : ''}
                    onClick={() => setSelectedPrintOption(option.id)}
                    aria-pressed={selectedPrintOption === option.id}
                  >
                    <span>0{index + 1}</span>
                    <h3>{option.name}</h3>
                    <p>{option.description}</p>
                    <strong>{option.price ? `+${formatPrice(option.price)} / bộ` : 'Không cộng thêm'}</strong>
                    <i>{selectedPrintOption === option.id ? 'Đã chọn' : 'Chọn'}</i>
                  </button>
                ))}
              </div>
            </section>

            <section className="quote-block quote-block--upgrade">
              <div className="quote-block__heading">
                <span>04</span>
                <div>
                  <p>NÂNG CẤP</p>
                  <h2>Thêm nếu bạn muốn.</h2>
                </div>
              </div>

              <div className="quote-upgrades">
                {UPGRADE_OPTIONS.map((option) => {
                  const selected = selectedUpgradeOptions.includes(option.id);
                  return (
                    <button key={option.id} onClick={() => toggleUpgrade(option.id)} className={selected ? 'is-active' : ''} aria-pressed={selected}>
                      <span className="quote-upgrades__check">{selected ? '✓' : '+'}</span>
                      <div><h3>{option.name}</h3><p>{option.description}</p></div>
                      <strong>+{formatPrice(option.price)}{option.unit}</strong>
                    </button>
                  );
                })}
              </div>
            </section>
          </div>

          <aside className="quote-summary"><Summary /></aside>
        </div>

        <div className="quote-mobile-bar">
          <div className="quote-mobile-bar__price">
            <span>{quantity} bộ · {selectedPrint?.name}</span>
            <strong>{formatPrice(pricing.totalPrice)}</strong>
            <small>Áo {formatPrice(pricing.baseUnitPrice)} + in {pricing.printPrice ? formatPrice(pricing.printPrice) : '0đ'} · <b>{formatPrice(pricing.pricePerUnit)}/bộ sau in</b></small>
          </div>
          <button onClick={sendToZalo}>Gửi Zalo ↗</button>
        </div>

        {notice && <div className="quote-notice" role="status">{notice}</div>}
      </main>
      <Footer />
    </>
  );
}
