import { useEffect, useState } from 'react';
import { ScrollReveal } from '../hooks/useScrollReveal';
import './Partners.css';

const partnerLogos = Array.from(
  { length: 23 },
  (_, index) => ({ id: index + 1, logo: `/images/partners/Frame ${index + 1}.png` })
);

const PLACEHOLDER_TEAM_IMAGE = '/images/products/stripe-blue/details/lifestyle.jpg';

export default function Partners() {
  const [activePartner, setActivePartner] = useState(null);

  useEffect(() => {
    if (!activePartner) return undefined;
    const onKeyDown = (event) => event.key === 'Escape' && setActivePartner(null);
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activePartner]);

  return (
    <section className="partners section">
      <div className="partners__head container">
        <ScrollReveal>
          <p>70+ TEAMS / ONE COMMUNITY</p>
          <h2>CÁC ĐỘI BÓNG<br /><em>ĐỒNG HÀNH CÙNG DRI.</em></h2>
        </ScrollReveal>
        <p className="partners__intro">Mỗi logo là một câu chuyện. Mỗi bộ áo là một lần cả đội cùng xuất hiện.</p>
      </div>

      <ScrollReveal delay={1}>
        <div className="partners__marquee" aria-label="Các đội bóng đồng hành">
          {[partnerLogos, [...partnerLogos].reverse()].map((row, rowIndex) => (
            <div className={`partners__track ${rowIndex ? 'partners__track--reverse' : ''}`} key={rowIndex}>
              {[...row, ...row].map((partner, index) => (
                <button key={`${rowIndex}-${partner.id}-${index}`} className="partners__item" onClick={() => setActivePartner(partner)} aria-label={`Xem hình đội bóng ${partner.id}`}>
                  <img src={partner.logo} alt="" loading="lazy" />
                </button>
              ))}
            </div>
          ))}
        </div>
      </ScrollReveal>

      <div className={`modal-overlay partners__overlay ${activePartner ? 'active' : ''}`} onClick={() => setActivePartner(null)}>
        {activePartner && (
          <div className="modal-content partners__modal" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-label="Hình ảnh đội bóng đồng hành">
            <button className="partners__modal-close" onClick={() => setActivePartner(null)} aria-label="Đóng">×</button>
            <img className="partners__modal-image" src={PLACEHOLDER_TEAM_IMAGE} alt="Hình ảnh đội bóng đồng hành cùng Driball" />
          </div>
        )}
      </div>
    </section>
  );
}
