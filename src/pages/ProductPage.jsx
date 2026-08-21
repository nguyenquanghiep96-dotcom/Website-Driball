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
    eyebrow: 'CHỌN MỨC HOÀN THIỆN',
    title: 'Các gói in ấn',
    subtitle: '03 gói từ cơ bản đến nhận diện đầy đủ',
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
    eyebrow: 'PLAYER ID',
    title: 'Font số',
    subtitle: 'Chọn cá tính cho tên và số cầu thủ',
    detail: 'Từ nét thể thao cổ điển đến kiểu chữ hiện đại, font số là chi tiết giúp cả đội thống nhất khi nhìn từ xa.',
    galleryPlaceholder: 'Bộ font số sẽ được bổ sung tại đây.',
    tags: ['FONT TÊN', 'FONT SỐ', 'PLAYER ID'],
  },
  {
    id: 'layout-guide',
    eyebrow: 'PLACEMENT PLAYBOOK',
    title: 'Layout gợi ý',
    subtitle: 'Logo, tài trợ và số áo đúng vị trí',
    detail: 'Các layout mẫu giúp đội hình dung nhanh cách sắp xếp logo, tài trợ, tên và số trước khi Driball dựng mockup riêng.',
    galleryPlaceholder: 'Bộ layout minh hoạ sẽ được bổ sung tại đây.',
    tags: ['NGỰC ÁO', 'TAY ÁO', 'LƯNG ÁO'],
  },
  {
    id: 'material-upgrade',
    eyebrow: 'DTF UPGRADE',
    title: 'Nâng cấp chất liệu',
    subtitle: 'Logo sắc nét hơn, hoàn thiện nổi bật hơn',
    detail: 'Logo DTF tái hiện tốt các chi tiết nhỏ và dải màu phức tạp, bề mặt sắc nét, bền màu và phù hợp với huy hiệu cần độ nhận diện cao.',
    image: '/images/in-an-chinh-chu.jpg',
    tags: ['DTF', 'SẮC NÉT', 'BỀN MÀU'],
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
  const [selectedColorId, setSelectedColorId] = useState(null);
  const [materialIndex, setMaterialIndex] = useState(0);
  const [activePrintPackage, setActivePrintPackage] = useState(null);
  const [isSizeChartOpen, setSizeChartOpen] = useState(false);

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
    setMaterialIndex(0);
  }, [slug]);

  useEffect(() => {
    if (!activePrintPackage && !isSizeChartOpen) return undefined;
    const handleEscape = (event) => {
      if (event.key !== 'Escape') return;
      setActivePrintPackage(null);
      setSizeChartOpen(false);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEscape);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [activePrintPackage, isSizeChartOpen]);

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
  const materialImages = product.materialImages || [
    { image: product.frontImage || product.heroImage, title: `${product.name} mặt trước`, fit: 'contain' },
  ];
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

  return (
    <>
      <Navbar />
      <main className="catalog-product">
        <section className="catalog-hero">
          <div className="catalog-hero__visual" aria-hidden="true">
            <div className="catalog-hero__orb catalog-hero__orb--one" />
            <div className="catalog-hero__orb catalog-hero__orb--two" />
            <img src={product.detailHeroImage || product.heroImage} alt="" />
          </div>
        </section>

        <section className="catalog-intro catalog-shell">
          <ScrollReveal>
            <h2>Mang thiết kế biểu tượng<br />trở lại sân cỏ.</h2>
            <p className="catalog-intro__series">STRIPE SERIES</p>
            <p className="catalog-intro__price">Từ {formatPrice(product.bulkPrice)} / bộ · từ {product.bulkMinQty} bộ</p>
          </ScrollReveal>
        </section>

        <section className="catalog-close-look" id="details">
          <div className="catalog-shell close-look__topbar">
            <div className="colorway-dots" aria-label="Chọn màu áo">
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
            <div className="close-look__tools">
              <div className="close-look__controls" aria-label="Điều khiển bộ ảnh">
                <button onClick={() => scrollCloseLook(-1)} aria-label="Ảnh trước">←</button>
                <button onClick={() => scrollCloseLook(1)} aria-label="Ảnh tiếp theo">→</button>
              </div>
            </div>
          </div>
          <div className="close-look__track" ref={closeLookRef}>
            {detailStories.map((story, index) => (
              <article className="close-look__item" key={`${story.title}-${index}`}>
                <figure className={`close-look__visual close-look__visual--${(index % 3) + 1}`}>
                  <img className={story.fit === 'contain' ? 'is-contain' : ''} src={story.image} alt={story.title} loading={index > 1 ? 'lazy' : 'eager'} />
                  <span>{String(index + 1).padStart(2, '0')}</span>
                </figure>
              </article>
            ))}
          </div>
        </section>

        <section className="print-layouts catalog-shell" id="specs">
          <div className="catalog-section-heading catalog-spec-intro">
            <div><h2>Mô tả sản phẩm.</h2></div>
          </div>

          <div className="catalog-spec catalog-spec--embedded">
            <div className="catalog-spec__product">
              <span className="catalog-spec__word">DRIBALL</span>
              <img
                className={materialImages[materialIndex].fit === 'contain' ? 'is-contain' : ''}
                src={materialImages[materialIndex].image}
                alt={materialImages[materialIndex].title}
              />
              <div className="material-dots" aria-label="Chọn ảnh chất liệu">
                {materialImages.map((image, index) => (
                  <button
                    key={`${image.image}-${index}`}
                    className={index === materialIndex ? 'active' : ''}
                    onClick={() => setMaterialIndex(index)}
                    aria-label={`Ảnh chất liệu ${index + 1}`}
                    aria-pressed={index === materialIndex}
                  ><span /></button>
                ))}
              </div>
            </div>
            <div className="catalog-spec__facts">
              <div className="catalog-spec__grid">
                <div><span>Chất liệu</span><strong>100% Polyester 150gsm</strong></div>
                <div className="catalog-spec__size"><span>Form áo</span><strong>Regular fit/Sport fit</strong><button onClick={() => setSizeChartOpen(true)}>Xem bảng size ↗</button></div>
                <div><span>Tính năng</span><strong>Quick-dry</strong></div>
                <div><span>Hoạt động</span><strong>Bóng đá</strong></div>
              </div>
            </div>
          </div>

          <div className="catalog-section-heading print-layouts__heading print-layouts__heading--after-spec" id="printing">
            <div>
              <p className="catalog-eyebrow">MAKE IT YOURS</p>
              <h2>Tạo dấu ấn riêng<br />cho team bạn.</h2>
            </div>
            <p>Từ gói in tên số, font thi đấu, vị trí logo đến chất liệu DTF — chọn từng lớp nhận diện để bộ áo trông đúng là của đội bạn.</p>
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
            <p className="catalog-eyebrow">STRIPE SERIES / TEAM PICK</p>
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

        <div className={`modal-overlay ${activePrintPackage ? 'active' : ''}`} onClick={() => setActivePrintPackage(null)}>
          {activePrintPackage && (
            <div className="modal-content printing-modal" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-label={activePrintPackage.title}>
              <header className="printing-modal__header">
                <span>✨ {activePrintPackage.eyebrow}</span>
                <button onClick={() => setActivePrintPackage(null)} aria-label="Đóng">×</button>
              </header>
              <div className="printing-modal__body">
                <h3>{activePrintPackage.title}</h3>
                <p>{activePrintPackage.detail}</p>
                {activePrintPackage.image && <img className="printing-modal__image" src={activePrintPackage.image} alt={activePrintPackage.title} />}
                {activePrintPackage.packages && (
                  <div className="printing-modal__packages">
                    {activePrintPackage.packages.map((item, index) => (
                      <article key={item.name}><span>0{index + 1}</span><div><strong>{item.name}</strong><p>{item.text}</p></div></article>
                    ))}
                  </div>
                )}
                {activePrintPackage.galleryPlaceholder && <div className="printing-modal__placeholder"><span>+</span><p>{activePrintPackage.galleryPlaceholder}</p></div>}
                <div className="printing-modal__tags">{activePrintPackage.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
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
      </main>
      <Footer />
    </>
  );
}
