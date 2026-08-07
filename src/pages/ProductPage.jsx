import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ScrollReveal } from '../hooks/useScrollReveal';
import { products, partners, ZALO_LINK } from '../data/products';
import './ProductPage.css';

const FEATURES = [
  {
    title: 'Chất liệu cao cấp.',
    desc: 'Vải co giãn 4 chiều, siêu nhẹ, siêu thoáng mát, hỗ trợ mọi chuyển động.',
    image: '/images/hero/HERO1.jpg',
  },
  {
    title: 'Công nghệ in sắc nét.',
    desc: 'Sử dụng công nghệ DTF tiên tiến cho logo chân thực, không bong tróc.',
    image: '/images/hero/HERO2.jpg',
  },
  {
    title: 'Đường may tinh xảo.',
    desc: 'Form áo cứng cáp chuẩn thể thao, hoàn thiện tỉ mỉ từng chi tiết nhỏ.',
    image: '/images/hero/HERO3.jpg',
  }
];

const PROCESS = [
  { step: '01', title: 'Chọn mẫu & Tư vấn', desc: 'Lựa chọn thiết kế yêu thích và liên hệ Zalo để chốt ý tưởng, số lượng.' },
  { step: '02', title: 'Thiết kế Demo', desc: 'Driball sẽ lên mockup 3D với logo và màu sắc của đội bạn hoàn toàn miễn phí.' },
  { step: '03', title: 'Sản xuất', desc: 'Tiến hành may và in ấn với thời gian chuẩn 14 ngày kể từ khi đặt cọc.' },
  { step: '04', title: 'Giao hàng', desc: 'Kiểm tra chất lượng tỉ mỉ và giao tận tay đến đội bóng của bạn.' },
];

export default function ProductPage() {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!product) {
    return (
      <>
        <Navbar />
        <main className="showcase">
          <div className="sc-container">
            <div className="sc-not-found">
              <h1>Không tìm thấy sản phẩm</h1>
              <Link to="/" className="btn btn-primary">Quay lại trang chủ</Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="showcase">
        
        {/* 1. Hero Full Width */}
        <section className="sc-hero">
          <div className="sc-hero__bg">
            <img src={product.heroImage} alt={product.name} />
          </div>
          <div className="sc-hero__overlay"></div>
          <div className="sc-hero__content">
            <ScrollReveal>
              <h1 className="sc-hero__title">{product.name}</h1>
              <p className="sc-hero__tagline">{product.tagline}</p>
            </ScrollReveal>
          </div>
          <div className="sc-hero__scroll-hint">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M19 12l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </section>

        {/* 2. Feature Slider */}
        <section className="sc-features">
          <div className="sc-container">
            <ScrollReveal>
              <h2 className="sc-section-title">Thiết kế hoàn hảo.<br/>Từng chi tiết.</h2>
            </ScrollReveal>
          </div>
          
          <div className="sc-slider-wrapper">
            <div className="sc-slider">
              {FEATURES.map((feature, i) => (
                <div key={i} className="sc-slider__slide">
                  <div className="sc-slider__img-wrapper">
                    <img src={feature.image} alt={feature.title} className="sc-slider__img" />
                  </div>
                  <div className="sc-slider__content">
                    <h3>{feature.title}</h3>
                    <p>{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Teams & Process */}
        <section className="sc-info">
          <div className="sc-container">
            
            {/* Teams */}
            <div className="sc-teams">
              <ScrollReveal>
                <h2 className="sc-section-title">Niềm tin của<br/>hơn {partners.length}0+ đội bóng.</h2>
              </ScrollReveal>
              <div className="sc-teams__grid">
                {partners.slice(0, 6).map((team, i) => (
                  <ScrollReveal key={team.id} delay={i % 3 + 1}>
                    <div className="sc-teams__card">
                      <img src={team.logo} alt={team.name} />
                      <span>{team.name}</span>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/* Process */}
            <div className="sc-process">
              <ScrollReveal>
                <h2 className="sc-section-title">Quy trình đặt đội.<br/>Nhanh chóng, rõ ràng.</h2>
              </ScrollReveal>
              <div className="sc-process__grid">
                {PROCESS.map((step, i) => (
                  <ScrollReveal key={i} delay={i + 1}>
                    <div className="sc-process__step">
                      <div className="sc-process__num">{step.step}</div>
                      <h4 className="sc-process__title">{step.title}</h4>
                      <p className="sc-process__desc">{step.desc}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/* Final CTA */}
            <div className="sc-final-cta">
              <ScrollReveal>
                <h2 className="sc-final-cta__title">Sẵn sàng ra sân?</h2>
                <a href={ZALO_LINK} target="_blank" rel="noopener noreferrer" className="btn btn-primary sc-final-cta__btn">
                  Liên hệ Zalo báo giá ngay
                </a>
              </ScrollReveal>
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
