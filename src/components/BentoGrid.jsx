import { useEffect, useState } from 'react';
import { ScrollReveal } from '../hooks/useScrollReveal';
import './BentoGrid.css';

const discoveryCards = [
  {
    id: 'lifestyle',
    type: 'image',
    eyebrow: 'COMING SOON',
    title: 'DRIBALL TRONG TỦ ĐỒ',
    subtitle: 'Blockcore, Lifestyle và đồ bán lẻ đang khởi động.',
    image: '/images/products/stripe-blue/details/lifestyle.jpg',
    emoji: '👕',
    detail: 'Driball đang phát triển các dòng Blockcore, Lifestyle và sản phẩm bán lẻ để tinh thần sân bóng có thể đi cùng bạn ra phố. Chưa mở bán vội — nhưng cũng không còn lâu nữa.',
    tags: ['BLOCKCORE', 'LIFESTYLE', 'RETAIL'],
  },
  {
    id: 'teams',
    type: 'stat',
    value: '70+',
    eyebrow: 'THE CLUB',
    title: 'CÁC ĐỘI BÓNG',
    accent: 'ĐỒNG HÀNH CÙNG DRI.',
    subtitle: 'Hơn 70 đội đã chọn Driball để cùng ra sân.',
    tone: 'periwinkle',
    emoji: '🤝',
    detail: 'Từ đội bạn thân cuối tuần đến câu lạc bộ thi đấu thường xuyên, hơn 70 tập thể đã cùng Driball biến ý tưởng của đội thành một bộ áo thật sự.',
    tags: ['70+ ĐỘI BÓNG', 'THIẾT KẾ RIÊNG', 'TOÀN QUỐC'],
  },
  {
    id: 'printing',
    type: 'image',
    eyebrow: 'MAKE IT YOURS',
    title: 'IN CHO RA CHẤT ĐỘI',
    subtitle: 'Logo, tên, số và tài trợ — đặt đúng chỗ.',
    image: '/images/in-an-chinh-chu.jpg',
    emoji: '✋',
    detail: 'Tên, số, logo đội và nhà tài trợ được căn chỉnh theo đúng tỉ lệ áo. Đội luôn được xem mockup trước khi sản xuất để mọi vị trí đều hợp lý và dễ đọc.',
    tags: ['LOGO', 'TÊN + SỐ', 'DTF'],
  },
  {
    id: 'delivery',
    type: 'stat',
    value: '14',
    unit: 'NGÀY',
    eyebrow: 'FROM PICK TO PITCH',
    title: 'CHỐT XONG, CHỜ RA SÂN',
    subtitle: 'Khoảng 14 ngày và giao hàng toàn quốc.',
    tone: 'coral',
    emoji: '📦',
    detail: 'Sau khi đội duyệt thiết kế, chốt size và đặt cọc, Driball bắt đầu sản xuất. Thời gian dự kiến khoảng 14 ngày, sau đó đóng gói và giao tận nơi trên toàn quốc.',
    tags: ['14 NGÀY', 'DUYỆT MOCKUP', 'SHIP TOÀN QUỐC'],
  },
  {
    id: 'community',
    type: 'image',
    eyebrow: 'DRIBALL COMMUNITY',
    title: 'ĐÁ CÙNG NHAU, ĐẸP CÙNG NHAU',
    subtitle: 'Một cộng đồng yêu bóng đá và yêu cả cách mình xuất hiện.',
    image: '/images/hero/HERO2.jpg',
    emoji: '⚽️',
    detail: 'Driball muốn kết nối những đội bóng có cá tính, kể câu chuyện của họ và tạo thêm nhiều sân chơi để mọi người gặp nhau bằng tình yêu bóng đá.',
    tags: ['FOOTBALL', 'CREATIVE', 'COMMUNITY'],
    gallery: [1, 2, 3, 7, 8, 9, 10, 11].map((number) => `/images/community/match-${number}.jpg`),
  },
];

export default function BentoGrid() {
  const [activePopup, setActivePopup] = useState(null);

  useEffect(() => {
    if (!activePopup) return undefined;
    const handleEscape = (event) => event.key === 'Escape' && setActivePopup(null);
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEscape);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [activePopup]);

  return (
    <section className="bento section" id="explore">
      <div className="bento__intro container">
        <ScrollReveal>
          <p className="bento__eyebrow">DRIBALL / MORE THAN A KIT</p>
          <h2 className="bento__heading">KHÁM PHÁ <em>DRIBALL. 👀</em></h2>
          <p className="bento__lead">Lật từng tấm thẻ để khám phá thêm những chuyện phía sau một bộ áo.</p>
        </ScrollReveal>
      </div>

      <ScrollReveal delay={1}>
        <div className="bento__stack" aria-label="Khám phá Driball">
          {discoveryCards.map((card, index) => (
            <article
              key={card.id}
              className={`bento__card bento__card--${card.type} ${card.tone ? `bento__card--${card.tone}` : ''}`}
              style={{ '--card-index': index }}
            >
              {card.type === 'image' ? (
                <>
                  <img src={card.image} alt="" loading="lazy" />
                  <div className="bento__card-shade" />
                </>
              ) : (
                <div className="bento__stat"><strong>{card.value}</strong>{card.unit && <span>{card.unit}</span>}</div>
              )}
              <button className="bento__card-hit" onClick={() => setActivePopup(card)} aria-label={`Xem ${card.title}`} />
              <span className="bento__plus" aria-hidden="true">+</span>
              <div className="bento__card-copy"><h3>{card.title}{card.accent && <><br /><em>{card.accent}</em></>}</h3><p>{card.subtitle}</p></div>
            </article>
          ))}
        </div>
        <p className="bento__swipe-hint">VUỐT ĐỂ KHÁM PHÁ →</p>
      </ScrollReveal>

      <div className={`modal-overlay ${activePopup ? 'active' : ''}`} onClick={() => setActivePopup(null)}>
        {activePopup && (
          <div className={`modal-content bento__modal bento__modal--${activePopup.tone || 'ink'}`} onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-label={activePopup.title}>
            <header className="bento__modal-header">
              <span>{activePopup.emoji} {activePopup.eyebrow}</span>
              <button className="bento__modal-close" onClick={() => setActivePopup(null)} aria-label="Đóng">×</button>
            </header>
            <div className="bento__modal-body">
              <h3 className="bento__modal-title">{activePopup.title}</h3>
              <p className="bento__modal-text">{activePopup.detail}</p>
              {activePopup.gallery && (
                <div className="bento__modal-gallery" aria-label="Hình ảnh cộng đồng Driball">
                  {activePopup.gallery.map((image, index) => <img key={image} src={image} alt={`Driball trên sân ${index + 1}`} loading="lazy" />)}
                </div>
              )}
              <div className="bento__modal-tags">{activePopup.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
