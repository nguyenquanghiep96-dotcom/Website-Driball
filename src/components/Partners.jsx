import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ScrollReveal } from '../hooks/useScrollReveal';
import './Partners.css';

const partnerLogos = Array.from(
  { length: 23 },
  (_, index) => ({ id: index + 1, logo: `/images/partners/Frame ${index + 1}.png` })
);

const PLACEHOLDER_TEAM_IMAGE = '/images/products/stripe-blue/details/lifestyle.jpg';

export default function Partners() {
  const [activePartner, setActivePartner] = useState(null);
  const marqueeRef = useRef(null);
  const motionRef = useRef({
    rows: [],
    dragging: false,
    moved: false,
    hovered: false,
    lastX: 0,
    lastY: 0,
    lastPointerTime: 0,
    dragVelocity: 0,
    momentum: 0,
    scrollBoost: 0,
    pressedPartnerId: null,
  });

  const startDrag = (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    const marquee = marqueeRef.current;
    if (!marquee) return;
    const motion = motionRef.current;
    motion.dragging = true;
    motion.moved = false;
    motion.lastX = event.clientX;
    motion.lastY = event.clientY;
    motion.lastPointerTime = performance.now();
    motion.dragVelocity = 0;
    motion.momentum = 0;
    motion.pressedPartnerId = event.target.closest('.partners__item')?.dataset.partnerId || null;
    marquee.setPointerCapture(event.pointerId);
  };

  const moveDrag = (event) => {
    const marquee = marqueeRef.current;
    const motion = motionRef.current;
    if (!marquee || !motion.dragging) return;
    const deltaX = event.clientX - motion.lastX;
    const deltaY = event.clientY - motion.lastY;

    if (!motion.moved) {
      if (Math.abs(deltaX) < 5 || Math.abs(deltaX) <= Math.abs(deltaY)) return;
      motion.moved = true;
      marquee.classList.add('is-dragging');
    }

    const now = performance.now();
    const elapsed = Math.max(now - motion.lastPointerTime, 8);
    motion.dragVelocity = (deltaX / elapsed) * 1000;
    motion.rows.forEach((row) => { row.x += deltaX; });
    motion.lastX = event.clientX;
    motion.lastY = event.clientY;
    motion.lastPointerTime = now;
    event.preventDefault();
  };

  const finishDrag = (event) => {
    const marquee = marqueeRef.current;
    const motion = motionRef.current;
    if (!marquee || !motion.dragging) return;
    const moved = motion.moved;
    motion.dragging = false;
    motion.momentum = moved ? Math.max(-1400, Math.min(1400, motion.dragVelocity)) : 0;
    marquee.classList.remove('is-dragging');
    if (marquee.hasPointerCapture(event.pointerId)) marquee.releasePointerCapture(event.pointerId);
    if (!moved && motion.pressedPartnerId) {
      const partner = partnerLogos.find((item) => String(item.id) === motion.pressedPartnerId);
      if (partner) setActivePartner(partner);
    }
    motion.pressedPartnerId = null;
  };

  const openPartner = (partner) => {
    setActivePartner(partner);
  };

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const tracks = [...marquee.querySelectorAll('.partners__track')];
    const motion = motionRef.current;
    motion.rows = tracks.map((track, index) => {
      const cycleWidth = track.scrollWidth / 2;
      return { track, cycleWidth, x: index ? -cycleWidth : 0, direction: index ? 1 : -1, speed: index ? 48 : 54 };
    });

    const wrapRow = (row) => {
      if (!row.cycleWidth) return;
      while (row.x <= -row.cycleWidth) row.x += row.cycleWidth;
      while (row.x > 0) row.x -= row.cycleWidth;
    };

    const renderRows = () => {
      motion.rows.forEach((row) => {
        wrapRow(row);
        row.track.style.transform = `translate3d(${row.x}px, 0, 0)`;
      });
    };

    let hoverFactor = 1;
    let previousTime = performance.now();
    let previousScrollY = window.scrollY;
    let previousScrollTime = previousTime;
    let frameId;

    const onScroll = () => {
      const now = performance.now();
      const elapsed = Math.max(now - previousScrollTime, 16);
      const scrollVelocity = Math.abs(window.scrollY - previousScrollY) / elapsed;
      motion.scrollBoost = Math.min(2.2, scrollVelocity * .22);
      previousScrollY = window.scrollY;
      previousScrollTime = now;
    };

    const animate = (time) => {
      const delta = Math.min(time - previousTime, 40);
      const seconds = delta / 1000;
      previousTime = time;
      const hoverTarget = motion.hovered && !motion.dragging ? .3 : 1;
      hoverFactor += (hoverTarget - hoverFactor) * (1 - Math.exp(-delta / 180));

      if (!motion.dragging) {
        motion.rows.forEach((row) => {
          const autoFactor = motion.hovered ? 0 : hoverFactor;
          row.x += ((row.direction * row.speed * (1 + motion.scrollBoost) * autoFactor) + motion.momentum) * seconds;
        });
        motion.momentum *= Math.exp(-delta / 720);
        if (Math.abs(motion.momentum) < .5) motion.momentum = 0;
      }

      motion.scrollBoost *= Math.exp(-delta / 420);
      renderRows();
      frameId = window.requestAnimationFrame(animate);
    };

    renderRows();
    window.addEventListener('scroll', onScroll, { passive: true });
    frameId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', onScroll);
      tracks.forEach((track) => { track.style.transform = ''; });
      motion.rows = [];
    };
  }, []);

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
        <div
          className="partners__marquee"
          ref={marqueeRef}
          aria-label="Các đội bóng đồng hành"
          onPointerDown={startDrag}
          onPointerMove={moveDrag}
          onPointerUp={finishDrag}
          onPointerCancel={finishDrag}
          onPointerEnter={() => { motionRef.current.hovered = true; }}
          onPointerLeave={() => { motionRef.current.hovered = false; }}
        >
          {[partnerLogos, [...partnerLogos].reverse()].map((row, rowIndex) => (
            <div className={`partners__track ${rowIndex ? 'partners__track--reverse' : ''}`} key={rowIndex}>
              {[...row, ...row].map((partner, index) => (
                <button key={`${rowIndex}-${partner.id}-${index}`} className="partners__item" data-partner-id={partner.id} onClick={(event) => event.detail === 0 && openPartner(partner)} aria-label={`Xem hình đội bóng ${partner.id}`}>
                  <img src={partner.logo} alt="" loading="lazy" />
                </button>
              ))}
            </div>
          ))}
        </div>
      </ScrollReveal>

      {createPortal(
        <div className={`modal-overlay partners__overlay ${activePartner ? 'active' : ''}`} onClick={() => setActivePartner(null)}>
          {activePartner && (
            <div className="modal-content partners__modal" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-label="Hình ảnh đội bóng đồng hành">
              <button className="partners__modal-close" onClick={() => setActivePartner(null)} aria-label="Đóng">×</button>
              <img className="partners__modal-image" src={PLACEHOLDER_TEAM_IMAGE} alt="Hình ảnh đội bóng đồng hành cùng Driball" />
            </div>
          )}
        </div>,
        document.body
      )}
    </section>
  );
}
