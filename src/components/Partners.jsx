import { useState } from 'react';
import { partners } from '../data/products';
import { ScrollReveal } from '../hooks/useScrollReveal';
import './Partners.css';

export default function Partners() {
  const [activePartner, setActivePartner] = useState(null);

  return (
    <section className="partners section">
      <div className="container">
        <ScrollReveal>
          <h2 className="heading-lg partners__heading">
            CÁC ĐỘI BÓNG ĐỒNG HÀNH CÙNG DRIBALL
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={1}>
          <div className="partners__grid">
            {partners.map(partner => (
              <button
                key={partner.id}
                className="partners__item"
                onClick={() => setActivePartner(partner)}
                aria-label={`Xem ${partner.name}`}
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="partners__logo"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </ScrollReveal>
      </div>

      {/* Partner detail modal */}
      <div
        className={`modal-overlay ${activePartner ? 'active' : ''}`}
        onClick={() => setActivePartner(null)}
      >
        {activePartner && (
          <div className="modal-content partners__modal" onClick={e => e.stopPropagation()}>
            <button
              className="partners__modal-close"
              onClick={() => setActivePartner(null)}
              aria-label="Đóng"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            <img
              src={activePartner.image}
              alt={activePartner.name}
              className="partners__modal-img"
            />
            <div className="partners__modal-body">
              <h3 className="partners__modal-name">{activePartner.name}</h3>
              <p className="partners__modal-text">
                Đội bóng đồng hành cùng Driball — Tin tưởng chất lượng, thiết kế và dịch vụ.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
