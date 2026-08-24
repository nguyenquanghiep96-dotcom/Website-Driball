import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { products, CATEGORIES } from '../data/products';
import { ScrollReveal } from '../hooks/useScrollReveal';
import ProductCard from './ProductCard';
import './ProductGrid.css';

const COLOR_FILTERS = [
  { id: 'red', label: 'Đỏ', hex: '#cf151b', matches: ['đỏ', 'red'] },
  { id: 'blue', label: 'Xanh', hex: '#164bd9', matches: ['xanh', 'blue', 'navy'] },
  { id: 'white', label: 'Trắng', hex: '#f3f1eb', matches: ['trắng', 'white'] },
  { id: 'orange', label: 'Cam', hex: '#ef6d34', matches: ['cam', 'orange'] },
  { id: 'yellow', label: 'Vàng', hex: '#f2c400', matches: ['vàng', 'yellow'] },
  { id: 'black', label: 'Đen', hex: '#1b1c20', matches: ['đen', 'black'] },
];

function ColorFilterDots({ activeColor, onChange, className = '' }) {
  return (
    <div className={`product-grid__color-filters liquid-color-nav ${className}`} aria-label="Lọc màu sản phẩm">
      {COLOR_FILTERS.map((color) => (
        <button
          key={color.id}
          className={activeColor?.id === color.id ? 'is-active' : ''}
          onClick={() => onChange(activeColor?.id === color.id ? null : color)}
          aria-label={`Lọc màu ${color.label}`}
          aria-pressed={activeColor?.id === color.id}
          title={color.label}
        ><span style={{ background: color.hex }} /></button>
      ))}
    </div>
  );
}

export default function ProductGrid() {
  const [activeCategory, setActiveCategory] = useState('new');
  const [activeColor, setActiveColor] = useState(null);
  const scrollRef = useRef(null);
  const endRef = useRef(null);
  const [isLastCardVisible, setIsLastCardVisible] = useState(false);

  const availableCategories = CATEGORIES.filter((category) =>
    products.some((product) => product.category === category.id)
  );
  const filtered = products.filter(p => p.category === activeCategory);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollLeft = 0;
  }, [activeCategory]);

  useEffect(() => {
    if (!scrollRef.current || !endRef.current) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => setIsLastCardVisible(entry.isIntersecting),
      { root: scrollRef.current, threshold: 0.9 }
    );
    observer.observe(endRef.current);
    return () => observer.disconnect();
  }, [activeCategory]);

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
            <div className="product-grid__header-actions">
              <Link to="/catalog" className="product-grid__view-all">XEM TẤT CẢ <span>↗</span></Link>
              <div className="product-grid__nav-arrows">
                <button className="product-grid__arrow" onClick={() => scroll('prev')} aria-label="Mẫu trước">
                  <img src="/icons/Frame 21.svg" alt="" width="24" height="24" />
                </button>
                <button className="product-grid__arrow" onClick={() => scroll('next')} aria-label="Mẫu tiếp theo">
                  <img src="/icons/Frame 21-1.svg" alt="" width="24" height="24" />
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {availableCategories.length > 1 && (
          <ScrollReveal delay={1}>
            <div className="product-grid__tabs">
              {availableCategories.map(cat => (
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
        )}

      </div>

      {/* Cards: full-viewport scroll container */}
      <div className="product-grid__scroll" ref={scrollRef}>
        {filtered.map(product => <ProductCard key={product.id} product={product} globalColor={activeColor} />)}
        <span className="product-grid__scroll-end" ref={endRef} aria-hidden="true" />
      </div>
      <div className="product-grid__filters container">
        <ColorFilterDots activeColor={activeColor} onChange={setActiveColor} />
      </div>
      {isLastCardVisible && <div className="product-grid__mobile-view-all container"><Link to="/catalog" className="product-grid__view-all">XEM TẤT CẢ <span>↗</span></Link></div>}
    </section>
  );
}
