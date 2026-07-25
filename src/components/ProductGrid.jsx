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
    const card = scrollRef.current.querySelector('.product-card');
    const scrollAmount = card ? card.offsetWidth + 16 : scrollRef.current.offsetWidth * 0.3;
    scrollRef.current.scrollBy({
      left: direction === 'next' ? scrollAmount : -scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="product-grid section" id="products">
      {/* Header + Tabs: inside container for alignment */}
      <div className="container">
        <ScrollReveal>
          <div className="product-grid__header">
            <h2 className="heading-xl">NHỮNG MẪU ĐẶT ĐỘI</h2>
            <div className="product-grid__nav-arrows">
              <button className="product-grid__arrow" onClick={() => scroll('prev')} aria-label="Previous">
                <img src="/icons/Frame 21.svg" alt="" width="24" height="24" />
              </button>
              <button className="product-grid__arrow" onClick={() => scroll('next')} aria-label="Next">
                <img src="/icons/Frame 21-1.svg" alt="" width="24" height="24" />
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
      </div>

      {/* Cards: full-viewport scroll container */}
      <ScrollReveal delay={2}>
        <div className="product-grid__scroll" ref={scrollRef}>
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
