import { useState, useRef } from 'react';
import { products, CATEGORIES } from '../data/products';
import { ScrollReveal } from '../hooks/useScrollReveal';
import ProductCard from './ProductCard';
import './ProductGrid.css';

export default function ProductGrid() {
  const [activeCategory, setActiveCategory] = useState('new');
  const scrollRef = useRef(null);

  const filtered = products.filter(p => p.category === activeCategory);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    // Scroll by one card width + gap
    const card = scrollRef.current.querySelector('.product-card');
    const scrollAmount = card ? card.offsetWidth + 20 : scrollRef.current.offsetWidth * 0.3;
    scrollRef.current.scrollBy({
      left: direction === 'next' ? scrollAmount : -scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="product-grid section" id="products">
      <div className="container">
        <ScrollReveal>
          <div className="product-grid__header">
            <h2 className="heading-xl">NHỮNG MẪU ĐẶT ĐỘI</h2>
            <div className="product-grid__nav-arrows">
              <button className="product-grid__arrow" onClick={() => scroll('prev')} aria-label="Previous">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M12 5L7 10L12 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button className="product-grid__arrow" onClick={() => scroll('next')} aria-label="Next">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M8 5L13 10L8 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
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

        {/* Scroll starts inside container, overflows right on scroll */}
        <ScrollReveal delay={2}>
          <div className="product-grid__scroll" ref={scrollRef}>
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
