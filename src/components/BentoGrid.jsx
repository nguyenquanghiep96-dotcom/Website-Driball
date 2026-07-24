import { useState } from 'react';
import { ScrollReveal } from '../hooks/useScrollReveal';
import './BentoGrid.css';

const bentoItems = [
  {
    id: 'lifestyle',
    title: 'DRIBALL LIFE STYLE',
    subtitle: 'Từ sân bóng đến đường phố — Phong cách thể thao đường phố.',
    image: '/images/driball-life-style.jpg',
    detail: 'Driball không chỉ là đồ bóng đá. Chúng tôi tạo ra những sản phẩm mà bạn tự hào mặc cả ngoài sân cỏ. Phong cách thể thao đường phố, chất liệu cao cấp, thiết kế độc quyền.',
  },
  {
    id: 'printing',
    title: 'IN ẤN CHỈNH CHU',
    subtitle: 'In số, tên, logo chất lượng cao với công nghệ DTF.',
    image: '/images/in-an-chinh-chu.jpg',
    detail: 'Công nghệ in DTF hiện đại, bền màu sau nhiều lần giặt. In số, tên cầu thủ, logo đội bóng với độ chi tiết cao. Hỗ trợ thiết kế miễn phí.',
  },
];

export default function BentoGrid() {
  const [activePopup, setActivePopup] = useState(null);

  const closePopup = () => setActivePopup(null);

  return (
    <section className="bento section">
      <div className="container">
        <ScrollReveal>
          <h2 className="heading-xl bento__heading">KHÁM PHÁ THÊM</h2>
        </ScrollReveal>

        <ScrollReveal delay={1}>
          <div className="bento__grid">
            {/* Cell 1: Tall lifestyle (row 1-2, col 1) */}
            <div className="bento__cell bento__cell--tall bento__cell--image">
              <img src={bentoItems[0].image} alt={bentoItems[0].title} className="bento__cell-img" />
              <div className="bento__cell-overlay">
                <h3 className="bento__cell-title">{bentoItems[0].title}</h3>
                <p className="bento__cell-subtitle">{bentoItems[0].subtitle}</p>
              </div>
              <button className="bento__plus" onClick={() => setActivePopup(bentoItems[0])} aria-label="Xem thêm">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 5V19M5 12H19" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* Cell 2: Blue block (row 1, col 2-3) */}
            <div className="bento__cell bento__cell--wide bento__cell--blue">
              <div className="bento__blue-content">
                <span className="bento__blue-tag">CHẤT LƯỢNG</span>
                <h3 className="bento__blue-title">VẢI CAO CẤP<br/>THIẾT KẾ ĐỘC QUYỀN</h3>
              </div>
            </div>

            {/* Cell 3: Printing image (row 2, col 2) */}
            <div className="bento__cell bento__cell--image">
              <img src={bentoItems[1].image} alt={bentoItems[1].title} className="bento__cell-img" />
              <div className="bento__cell-overlay">
                <h3 className="bento__cell-title">{bentoItems[1].title}</h3>
                <p className="bento__cell-subtitle">{bentoItems[1].subtitle}</p>
              </div>
              <button className="bento__plus" onClick={() => setActivePopup(bentoItems[1])} aria-label="Xem thêm">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 5V19M5 12H19" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* Cell 4: Blue block alt (row 2, col 3) */}
            <div className="bento__cell bento__cell--blue bento__cell--blue-alt">
              <div className="bento__blue-content">
                <span className="bento__blue-tag">DỊCH VỤ</span>
                <h3 className="bento__blue-title">GIAO HÀNG<br/>TOÀN QUỐC</h3>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Popup modal */}
      <div className={`modal-overlay ${activePopup ? 'active' : ''}`} onClick={closePopup}>
        {activePopup && (
          <div className="modal-content bento__modal" onClick={e => e.stopPropagation()}>
            <button className="bento__modal-close" onClick={closePopup} aria-label="Đóng">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            <img src={activePopup.image} alt={activePopup.title} className="bento__modal-img" />
            <div className="bento__modal-body">
              <h3 className="bento__modal-title">{activePopup.title}</h3>
              <p className="bento__modal-text">{activePopup.detail}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
