import { useState, useRef, useEffect, useCallback } from 'react';
import { products, CATEGORIES } from '../data/products';
import { ScrollReveal } from '../hooks/useScrollReveal';
import ProductCard from './ProductCard';
import './ProductGrid.css';

/**
 * Apple MacBook Air "Highlights" style horizontal storytelling.
 * Vertical scroll drives horizontal translateX on a sticky viewport.
 */
export default function ProductGrid() {
  const [activeCategory, setActiveCategory] = useState('new');
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const dimsRef = useRef({ maxTranslateX: 0, scrollDistance: 0 });

  const filtered = products.filter(p => p.category === activeCategory);

  // Calculate dimensions and section height
  const updateDimensions = useCallback(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Card sizing
    const CARD_WIDTH = Math.min(vw * 0.75, 900);
    const GAP = Math.min(50, vw * 0.035);

    // Left padding = align with container content edge
    const maxWidth = 1800;
    const contentPadding = vw <= 480 ? 16 : vw <= 768 ? 20 : vw <= 1024 ? 40 : 60;
    const leftPadding = Math.max(contentPadding, (vw - maxWidth) / 2 + contentPadding);

    const numCards = track.querySelectorAll('.product-grid__card').length;
    if (numCards === 0) return;

    // Total track width
    const totalTrackWidth = leftPadding + numCards * CARD_WIDTH + (numCards - 1) * GAP + contentPadding;
    const maxTranslateX = Math.max(0, totalTrackWidth - vw);

    // Section height = viewport + horizontal scroll distance
    const scrollDistance = maxTranslateX;
    section.style.height = `${vh + scrollDistance}px`;

    dimsRef.current = { maxTranslateX, scrollDistance };
  }, [filtered.length]);

  useEffect(() => {
    updateDimensions();

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const section = sectionRef.current;
        const track = trackRef.current;
        if (!section || !track) { ticking = false; return; }

        const { maxTranslateX, scrollDistance } = dimsRef.current;
        if (scrollDistance <= 0) { ticking = false; return; }

        const rect = section.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, -rect.top / scrollDistance));
        const tx = -progress * maxTranslateX;

        track.style.transform = `translate3d(${tx}px, 0, 0)`;
        ticking = false;
      });
    };

    const onResize = () => {
      updateDimensions();
      onScroll();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });

    // Initial position
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [updateDimensions]);

  return (
    <section ref={sectionRef} className="product-grid" id="products">
      <div className="product-grid__sticky">
        {/* Header inside container */}
        <div className="product-grid__header-container container">
          <ScrollReveal>
            <div className="product-grid__header">
              <h2 className="heading-xl">NHỮNG MẪU ĐẶT ĐỘI</h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={1}>
            <div className="product-grid__tabs">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  className={`product-grid__tab ${activeCategory === cat.id ? 'product-grid__tab--active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Horizontal track — driven by vertical scroll */}
        <div className="product-grid__viewport">
          <div ref={trackRef} className="product-grid__track">
            {filtered.map(product => (
              <div className="product-grid__card" key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
