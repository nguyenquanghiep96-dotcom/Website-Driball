import { useEffect, useState } from 'react';
import { partners } from '../data/products';
import { ScrollReveal } from '../hooks/useScrollReveal';
import './Partners.css';

const communityMarks = [
  { id: 'mark-1', name: 'Northside FC', mark: 'N/S' },
  { id: 'mark-2', name: 'District XI', mark: 'D.XI' },
  { id: 'mark-3', name: 'Sunday Club', mark: 'SUN' },
  { id: 'mark-4', name: 'Rovers 07', mark: 'R07' },
  { id: 'mark-5', name: 'Local United', mark: 'LU' },
  { id: 'mark-6', name: 'The Kickoff', mark: 'KO' },
];

export default function Partners() {
  const [activePartner, setActivePartner] = useState(null);
  const logoCloud = [...partners, ...communityMarks];

  useEffect(() => {
    if (!activePartner) return undefined;
    const onKeyDown = (event) => event.key === 'Escape' && setActivePartner(null);
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
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
          {[logoCloud, [...logoCloud].reverse()].map((row, rowIndex) => (
            <div className={`partners__track ${rowIndex ? 'partners__track--reverse' : ''}`} key={rowIndex}>
              {[...row, ...row].map((partner, index) => (
                <button key={`${rowIndex}-${partner.id}-${index}`} className={`partners__item partners__item--${((index + rowIndex) % 4) + 1}`} onClick={() => setActivePartner(partner)} aria-label={`Xem ${partner.name}`}>
                  {partner.logo ? <img src={partner.logo} alt="" loading="lazy" /> : <strong>{partner.mark}</strong>}
                  <span>{partner.name}</span>
                </button>
              ))}
            </div>
          ))}
        </div>
      </ScrollReveal>

      <div className={`modal-overlay ${activePartner ? 'active' : ''}`} onClick={() => setActivePartner(null)}>
        {activePartner && (
          <div className="modal-content partners__modal" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-label={activePartner.name}>
            <button className="partners__modal-close" onClick={() => setActivePartner(null)} aria-label="Đóng">×</button>
            <div className="partners__modal-mark">
              {activePartner.logo ? <img src={activePartner.logo} alt={activePartner.name} /> : <strong>{activePartner.mark}</strong>}
            </div>
            <div className="partners__modal-body">
              <span>DRIBALL COMMUNITY</span>
              <h3>{activePartner.name}</h3>
              <p>Một trong những đội bóng góp mặt trong cộng đồng Driball — nơi cá tính riêng được mặc lên sân.</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
