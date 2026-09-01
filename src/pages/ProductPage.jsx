import { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ScrollReveal } from '../hooks/useScrollReveal';
import {
  products,
  formatPrice,
  SIZE_CHART,
} from '../data/products';
import './ProductPage.css';

const FALLBACK_DETAILS = [
  {
    eyebrow: '01 / CHẤT VẢI',
    title: 'Nhẹ trên người. Bền trên sân.',
    caption: 'Polyester thể thao co giãn 4 chiều, thoát ẩm nhanh.',
    image: '/images/hero/HERO1.jpg',
  },
  {
    eyebrow: '02 / BỀ MẶT',
    title: 'Thoáng khí trong từng chuyển động.',
    caption: 'Bề mặt vải mịn, khô nhanh và giữ form sau nhiều trận.',
    image: '/images/driball-life-style.jpg',
  },
  {
    eyebrow: '03 / HOÀN THIỆN',
    title: 'Từng đường may đều có lý do.',
    caption: 'Form thể thao gọn, đường may chắc và thoải mái khi vận động.',
    image: '/images/hero/HERO3.jpg',
  },
];

const CUSTOMIZATION_CARDS = [
  {
    id: 'print-packages',
    journeyTitle: 'In ấn theo đội',
    eyebrow: 'CHỌN MỨC HOÀN THIỆN',
    title: 'Các gói in ấn',
    subtitle: '02 phương pháp hoàn thiện theo nhu cầu đội',
    detail: 'Chọn lượng thông tin vừa đủ với nhu cầu của đội. Driball sẽ căn tỉ lệ từng vị trí theo size áo và gửi mockup trước khi sản xuất.',
    packages: [
      { name: 'Gói cơ bản', text: 'Logo đội, tên và số áo.' },
      { name: 'Gói nâng cao', text: 'Logo đội, logo nhà tài trợ ở ngực, tên và số sau lưng.' },
      { name: 'Gói nhận diện đầy đủ', text: 'Logo đội, nhà tài trợ, tên, số và một điểm nhấn phụ để hoàn thiện bản sắc team.' },
    ],
    tags: ['CƠ BẢN', 'NÂNG CAO', 'FULL IDENTITY'],
  },
  {
    id: 'number-fonts',
    journeyTitle: 'Font số',
    title: 'Font số',
    subtitle: 'Chọn cá tính cho tên và số cầu thủ',
    detail: 'Driball cung cấp font số được thiết kế riêng biệt, tỉ lệ và kích thước theo tiêu chuẩn hiện đại và chuyên nghiệp.',
    image: '/images/products/stripe-blue/details/font-number-set.png',
    tags: ['FONT TÊN', 'FONT SỐ', 'TIÊU CHUẨN THI ĐẤU'],
  },
  {
    id: 'layout-guide',
    journeyTitle: 'Layout gợi ý',
    eyebrow: 'PLACEMENT PLAYBOOK',
    title: 'Layout gợi ý',
    subtitle: 'Logo, tài trợ và số áo đúng vị trí',
    detail: 'Các layout mẫu giúp đội hình dung nhanh cách sắp xếp logo, tài trợ, tên và số trước khi Driball dựng mockup riêng.',
    galleryPlaceholder: 'Bộ layout minh hoạ sẽ được bổ sung tại đây.',
    tags: ['NGỰC ÁO', 'TAY ÁO', 'LƯNG ÁO'],
  },
  {
    id: 'material-upgrade',
    journeyTitle: 'Nâng cấp chất liệu',
    eyebrow: 'DTF UPGRADE',
    title: 'Nâng cấp chất liệu',
    subtitle: 'Logo sắc nét hơn, hoàn thiện nổi bật hơn',
    detail: 'Logo DTF tái hiện tốt các chi tiết nhỏ và dải màu phức tạp, bề mặt sắc nét, bền màu và phù hợp với huy hiệu cần độ nhận diện cao.',
    image: '/images/in-an-chinh-chu.jpg',
    tags: ['DTF', 'SẮC NÉT', 'BỀN MÀU'],
  },
];

const PRODUCT_FEATURES = [
  { icon: 'laundry', label: 'Chất liệu', value: '100% Polyester' },
  { icon: 'directions_run', label: 'Form áo', value: 'Regular', sizeGuide: true },
  { icon: 'cool_to_dry', label: 'Tính năng', value: 'Thoáng mát' },
  { icon: 'sports_and_outdoors', label: 'Hoạt động', value: 'Bóng đá & More' },
];

const PRINTING_METHODS = [
  {
    id: 'sublimation',
    tab: 'In thăng hoa',
    title: 'Gói in ấn thăng hoa (Heat Transfer)',
    description: 'In trực tiếp vào áo để màu và hình ảnh thấm sâu vào sợi vải. Bề mặt vẫn nhẹ, sắc nét, không bong tróc và giữ màu ổn định theo thời gian.',
    price: 'Miễn phí 5 vị trí: Logo đội ở ngực, nhà tài trợ ở bụng, tên, số và số quần',
    extra: 'Thêm 1 vị trí khác: +10.000đ/vị trí',
    upgrade: 'Nâng cấp logo 3D DTF cao cấp: +15.000đ/logo',
    image: '/images/products/stripe-blue/details/print-layout-01.jpg',
  },
  {
    id: 'dtf',
    tab: 'PET / DTF',
    title: 'Gói in PET chuyển nhiệt (DTF) / Decal',
    description: 'Các chi tiết được hoàn thiện bằng một màng decal mỏng, bề mặt mịn và phù hợp với vận động thể thao. Hình in sắc nét, chuyên nghiệp, tạo cảm giác cao cấp cho toàn bộ áo đấu.',
    price: 'Gói 5 vị trí: +35.000đ/bộ — Logo đội ở ngực, nhà tài trợ ở bụng, tên, số và số quần',
    extra: 'Thêm 1 vị trí khác: +10.000đ/vị trí',
    upgrade: 'Nâng cấp logo 3D DTF cao cấp: +15.000đ/logo',
    image: '/images/products/stripe-blue/details/print-layout-02.jpg',
  },
];

const PROCESS = [
  { number: '01', title: 'Chọn mẫu', text: 'Bạn chọn mẫu ưng ý, tính giá và gửi cho Driball.', image: '/images/products/stripe-blue.png' },
  { number: '02', title: 'Demo', text: 'Driball liên hệ và gửi bạn demo.', image: '/images/products/stripe-blue/details/print-layout-01.jpg' },
  { number: '03', title: 'Chốt danh sách', text: 'Bạn gửi Dri danh sách đội, tên và số in ấn.', image: '/images/products/stripe-blue/details/print-layout-02.jpg' },
  { number: '04', title: 'Nhận áo', text: 'Thời gian sản xuất khoảng 14 ngày.', image: '/images/products/stripe-series-colors.png' },
];

export default function ProductPage() {
  const { slug } = useParams();
  const product = products.find((item) => item.slug === slug);
  const closeLookRef = useRef(null);
  const printingModalRef = useRef(null);
  const printingOverlayRef = useRef(null);
  const mobileGalleryRef = useRef(null);
  const mobileGalleryOverlayRef = useRef(null);
  const galleryGestureRef = useRef({ startX: 0, startY: 0, deltaY: 0, vertical: false, active: false });
  const [selectedColorId, setSelectedColorId] = useState(null);
  const [activePrintPackage, setActivePrintPackage] = useState(null);
  const [activePrintingTab, setActivePrintingTab] = useState('sublimation');
  const [isSizeChartOpen, setSizeChartOpen] = useState(false);
  const [mobileGalleryIndex, setMobileGalleryIndex] = useState(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const anchor = window.location.hash && document.querySelector(window.location.hash);
      if (anchor) anchor.scrollIntoView();
      else window.scrollTo(0, 0);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [slug]);

  useEffect(() => {
    setSelectedColorId(null);
  }, [slug]);

  useEffect(() => {
    if (!activePrintPackage && !isSizeChartOpen && mobileGalleryIndex === null) return undefined;
    const handleEscape = (event) => {
      if (event.key !== 'Escape') return;
      setActivePrintPackage(null);
      setSizeChartOpen(false);
      setMobileGalleryIndex(null);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEscape);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [activePrintPackage, isSizeChartOpen, mobileGalleryIndex]);

  useEffect(() => {
    if (mobileGalleryIndex === null) {
      if (mobileGalleryRef.current) {
        mobileGalleryRef.current.style.transform = '';
        mobileGalleryRef.current.style.transition = '';
      }
      if (mobileGalleryOverlayRef.current) mobileGalleryOverlayRef.current.style.backgroundColor = '';
      return;
    }
    if (!mobileGalleryRef.current) return;
    const frame = window.requestAnimationFrame(() => {
      const track = mobileGalleryRef.current;
      track.scrollTo({ left: track.clientWidth * mobileGalleryIndex, behavior: 'auto' });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [mobileGalleryIndex]);

  useEffect(() => {
    if (!activePrintPackage || !printingModalRef.current) return;
    const frame = window.requestAnimationFrame(() => {
      const target = printingModalRef.current?.querySelector(`[data-print-section="${activePrintPackage.id}"]`);
      if (target && printingOverlayRef.current) {
        printingOverlayRef.current.scrollTop = Math.max(0, target.offsetTop - 20);
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, [activePrintPackage]);

  if (!product) {
    return (
      <>
        <Navbar />
        <main className="catalog-product">
          <div className="catalog-shell catalog-not-found">
            <p>Không tìm thấy sản phẩm.</p>
            <Link to="/" className="catalog-button catalog-button--primary">Về trang chủ</Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const colorways = product.detailColorways || [{
    id: 'default',
    name: product.colors?.[0]?.name || product.name,
    hex: product.colors?.[0]?.hex || '#173dca',
    images: product.detailImages || FALLBACK_DETAILS,
  }];
  const defaultColorway = colorways.find((colorway) => colorway.default) || colorways[0];
  const activeColorway = colorways.find((colorway) => colorway.id === selectedColorId) || defaultColorway;
  const detailStories = activeColorway.images;
  const scrollCloseLook = (direction) => {
    closeLookRef.current?.scrollBy({
      left: direction * Math.min(window.innerWidth * 0.72, 900),
      behavior: 'smooth',
    });
  };
  const selectColorway = (colorway) => {
    setSelectedColorId(colorway.id);
    closeLookRef.current?.scrollTo({ left: 0, behavior: 'smooth' });
  };
  const openMobileGallery = (index) => {
    if (!window.matchMedia('(max-width: 640px)').matches) return;
    setMobileGalleryIndex(index);
  };
  const handleGalleryPointerStart = (event) => {
    galleryGestureRef.current = { startX: event.clientX, startY: event.clientY, deltaY: 0, vertical: false, active: true };
    if (mobileGalleryRef.current) mobileGalleryRef.current.style.transition = 'none';
  };
  const handleGalleryPointerMove = (event) => {
    const gesture = galleryGestureRef.current;
    if (!gesture.active) return;
    const deltaX = event.clientX - gesture.startX;
    const deltaY = Math.max(0, event.clientY - gesture.startY);
    gesture.vertical = deltaY > 8 && deltaY > Math.abs(deltaX) * 1.15;
    gesture.deltaY = gesture.vertical ? deltaY : 0;
    if (!gesture.vertical) return;
    if (mobileGalleryRef.current) mobileGalleryRef.current.style.transform = `translateY(${Math.min(deltaY, 260)}px)`;
    if (mobileGalleryOverlayRef.current) {
      const alpha = Math.max(.42, 1 - deltaY / 440);
      mobileGalleryOverlayRef.current.style.backgroundColor = `rgba(24, 25, 35, ${alpha})`;
    }
  };
  const handleGalleryPointerEnd = () => {
    if (!galleryGestureRef.current.active) return;
    galleryGestureRef.current.active = false;
    const shouldClose = galleryGestureRef.current.vertical && galleryGestureRef.current.deltaY > 90;
    if (shouldClose) {
      setMobileGalleryIndex(null);
      return;
    }
    if (mobileGalleryRef.current) {
      mobileGalleryRef.current.style.transition = 'transform .28s cubic-bezier(.2,.8,.2,1)';
      mobileGalleryRef.current.style.transform = 'translateY(0)';
    }
    if (mobileGalleryOverlayRef.current) mobileGalleryOverlayRef.current.style.backgroundColor = '';
  };

  return (
    <>
      <Navbar />
      <main className="catalog-product">
        <section className="catalog-hero">
          <div className="catalog-hero__visual" aria-hidden="true">
            <div className="catalog-hero__image-frame">
              <img src={product.detailHeroImage || product.heroImage} alt="" />
            </div>
          </div>
        </section>

        <section className="catalog-intro catalog-shell">
          <ScrollReveal>
            <p className="catalog-intro__series">STRIPE SERIES</p>
            <h2>Mang thiết kế biểu tượng<br />trở lại sân cỏ.</h2>
            <p className="catalog-intro__price">Từ {formatPrice(product.bulkPrice)} / bộ · từ {product.bulkMinQty} bộ</p>
          </ScrollReveal>
        </section>

        <section className="catalog-close-look" id="details">
          <div className="close-look__track" ref={closeLookRef}>
            {detailStories.map((story, index) => (
              <article className="close-look__item" key={`${story.title}-${index}`}>
                <figure className={`close-look__visual close-look__visual--${(index % 3) + 1}`}>
                  <button className="close-look__open" onClick={() => openMobileGallery(index)} aria-label={`Mở ảnh ${index + 1}`}>
                    <img className={story.fit === 'contain' ? 'is-contain' : ''} src={story.image} alt={story.title} loading={index > 1 ? 'lazy' : 'eager'} />
                  </button>
                </figure>
              </article>
            ))}
          </div>
          <div className="catalog-shell close-look__nav">
            <div className="colorway-dots close-look__colorways liquid-color-nav" aria-label="Chọn màu áo">
              <span className="liquid-color-nav__label">Màu:</span>
              {colorways.map((colorway) => (
                <button
                  key={colorway.id}
                  className={colorway.id === activeColorway.id ? 'active' : ''}
                  onClick={() => selectColorway(colorway)}
                  aria-label={colorway.name}
                  aria-pressed={colorway.id === activeColorway.id}
                  title={colorway.name}
                >
                  <span style={{ background: colorway.hex, borderColor: colorway.border || colorway.hex }} />
                </button>
              ))}
            </div>
            <div className="close-look__controls" aria-label="Điều khiển bộ ảnh">
              <button onClick={() => scrollCloseLook(-1)} aria-label="Ảnh trước"><img src="/icons/Frame 21.svg" alt="" /></button>
              <button onClick={() => scrollCloseLook(1)} aria-label="Ảnh tiếp theo"><img src="/icons/Frame 21-1.svg" alt="" /></button>
            </div>
          </div>
        </section>

        <section className="product-description" id="specs">
          <div className="catalog-shell product-description__inner">
            <div className="product-description__intro">
              <p className="catalog-eyebrow">STRIPE SERIES / MÔ TẢ SẢN PHẨM</p>
              <h2>Tôn trọng. Cổ điển.</h2>
              <p>Với 3 phối màu cùng 3 tỷ lệ sọc khác nhau, kết hợp cùng những chi tiết và chất liệu hoàn toàn mới lần đầu tiên xuất hiện trên áo đấu DRIBALL, tất cả được tạo nên để mang đến cảm giác của một phiên bản Player chỉn chu hơn, cao cấp hơn và đậm chất áo đấu hơn.</p>
            </div>
            <div className="product-description__features">
              {PRODUCT_FEATURES.map((feature) => (
                <article key={feature.label}>
                  <span className="product-description__icon material-symbols-outlined" aria-hidden="true">{feature.icon}</span>
                  <small>{feature.label}</small>
                  <strong>{feature.value}</strong>
                  {feature.sizeGuide && <button onClick={() => setSizeChartOpen(true)}>Xem bảng size ↗</button>}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="print-layouts catalog-shell" id="printing">
          <div className="catalog-section-heading print-layouts__heading print-layouts__heading--after-spec" id="printing">
            <div>
              <p className="catalog-eyebrow">DRIBALL PRINTING</p>
              <h2>Tạo dấu ấn riêng<br />cho team bạn.</h2>
            </div>
            <p>Sốp cung cấp các gói in ấn phù hợp cho từng nhu cầu của đội bóng. Khâu in ấn luôn chỉn chu và tỉ mỉ.</p>
          </div>

          <div className="printing-stack" aria-label="Các gói layout in ấn">
            {CUSTOMIZATION_CARDS.map((item, index) => (
              <article className={`printing-stack__card printing-stack__card--${index + 1}`} key={item.id} style={{ '--print-index': index }}>
                <button className="printing-stack__hit" onClick={() => setActivePrintPackage(item)} aria-label={`Xem chi tiết ${item.title}`} />
                <span className="printing-stack__plus" aria-hidden="true">+</span>
                <div>
                  <span>0{index + 1}</span>
                  <h3>{item.title}</h3>
                  <p>{item.subtitle}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="catalog-process catalog-shell" id="process">
          <div className="catalog-section-heading">
            <div><h2>Quy trình đặt đội</h2></div>
          </div>
          <div className="process-track">
            {PROCESS.map((step) => (
              <article key={step.number}>
                <div className="process-track__copy">
                  <span>{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
                <figure><img src={step.image} alt="" loading="lazy" /></figure>
              </article>
            ))}
          </div>
        </section>

        <section className="product-close catalog-shell">
          <div className="product-close__copy">
            <div className="product-close__team-tag"><strong>16</strong><span>ĐỘI ĐÃ LỰA CHỌN<br />STRIPE SERIES</span></div>
            <h2>Chốt mẫu này?</h2>
            <p>Chọn màu đội thích, thêm các lựa chọn in ấn và xem ngay mức giá theo số lượng.</p>
            <div className="product-close__colors colorway-dots" aria-label="Chọn màu áo để tính giá">
              {colorways.map((colorway) => (
                <button
                  key={colorway.id}
                  className={colorway.id === activeColorway.id ? 'active' : ''}
                  onClick={() => setSelectedColorId(colorway.id)}
                  aria-label={colorway.name}
                  aria-pressed={colorway.id === activeColorway.id}
                  title={colorway.name}
                ><span style={{ background: colorway.hex, borderColor: colorway.border || colorway.hex }} /></button>
              ))}
            </div>
            <Link to={`/quote/${product.slug}`} className="catalog-button catalog-button--light">
              Bắt đầu tính giá <span>↗</span>
            </Link>
          </div>
          <div className="product-close__visual">
            <img src={activeColorway.ctaImage || product.frontImage || product.heroImage} alt={`${product.name} màu ${activeColorway.name}`} />
          </div>
        </section>

        <div ref={printingOverlayRef} className={`modal-overlay printing-modal-overlay ${activePrintPackage ? 'active' : ''}`} onClick={() => setActivePrintPackage(null)}>
          {activePrintPackage && (
            <div className="modal-content printing-modal printing-modal--journey" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-label="Driball Printing">
              <div className="printing-modal__close-wrap">
                <button className="printing-modal__close" onClick={() => setActivePrintPackage(null)} aria-label="Đóng">×</button>
              </div>
              <div className="printing-modal__scroller" ref={printingModalRef}>
                {CUSTOMIZATION_CARDS.map((item, index) => (
                  <section className="printing-journey" data-print-section={item.id} key={item.id}>
                    <div className="printing-journey__heading">
                      <span>0{index + 1}</span>
                      <h2>{item.journeyTitle || item.title}</h2>
                    </div>
                    {item.id === 'print-packages' ? (
                      <>
                        <div className="printing-method-tabs" role="tablist" aria-label="Chọn phương pháp in">
                          {PRINTING_METHODS.map((method) => <button key={method.id} role="tab" aria-selected={activePrintingTab === method.id} className={activePrintingTab === method.id ? 'is-active' : ''} onClick={() => setActivePrintingTab(method.id)}>{method.tab}</button>)}
                        </div>
                        {PRINTING_METHODS.filter((method) => method.id === activePrintingTab).map((method) => (
                          <div className="printing-method" key={method.id}>
                            <img src={method.image} alt={`Minh hoạ ${method.title}`} />
                            <div className="printing-method__copy">
                              <h3>{method.title}</h3>
                              <p>{method.description}</p>
                              <div className="printing-method__pricing">
                                <strong>Chi phí in ấn</strong>
                                <span>{method.price}</span>
                                <span>{method.extra}</span>
                                <span>{method.upgrade}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </>
                    ) : (
                      <div className="printing-modal__body">
                        <p>{item.detail}</p>
                        {item.image && <img className={`printing-modal__image printing-modal__image--${item.id}`} src={item.image} alt={item.title} />}
                        {item.galleryPlaceholder && <div className="printing-modal__placeholder"><span>+</span><p>{item.galleryPlaceholder}</p></div>}
                        <div className="printing-modal__tags">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                      </div>
                    )}
                  </section>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className={`modal-overlay ${isSizeChartOpen ? 'active' : ''}`} onClick={() => setSizeChartOpen(false)}>
          {isSizeChartOpen && (
            <div className="modal-content size-modal" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-label="Bảng size Stripe Series">
              <header className="printing-modal__header">
                <span>📏 STRIPE SERIES / SIZE GUIDE</span>
                <button onClick={() => setSizeChartOpen(false)} aria-label="Đóng">×</button>
              </header>
              <div className="size-modal__body">
                <h3>Chọn size<br />vừa trận.</h3>
                <p>Số đo tính bằng centimet. Nếu nằm giữa hai size, ưu tiên size lớn hơn để vận động thoải mái.</p>
                <div className="size-table-wrap">
                  <table>
                    <thead><tr><th>Size</th><th>Ngực</th><th>Dài áo</th><th>Vai</th></tr></thead>
                    <tbody>{SIZE_CHART.map((row) => <tr key={row.size}><th>{row.size}</th><td>{row.chest}</td><td>{row.length}</td><td>{row.shoulder}</td></tr>)}</tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>

        <div ref={mobileGalleryOverlayRef} className={`mobile-gallery ${mobileGalleryIndex !== null ? 'active' : ''}`} role="dialog" aria-modal="true" aria-label="Xem ảnh sản phẩm" onClick={() => setMobileGalleryIndex(null)}>
          <button className="mobile-gallery__close" onClick={() => setMobileGalleryIndex(null)} aria-label="Đóng thư viện ảnh">×</button>
          <div className="mobile-gallery__track" ref={mobileGalleryRef} onClick={(event) => event.stopPropagation()} onPointerDown={handleGalleryPointerStart} onPointerMove={handleGalleryPointerMove} onPointerUp={handleGalleryPointerEnd} onPointerCancel={handleGalleryPointerEnd}>
            {detailStories.map((story, index) => (
              <figure className="mobile-gallery__slide" key={`gallery-${story.title}-${index}`}>
                <div className="mobile-gallery__media">
                  <img src={story.image} alt={story.title} />
                </div>
              </figure>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
