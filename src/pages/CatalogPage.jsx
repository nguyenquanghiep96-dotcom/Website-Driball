import { useEffect, useMemo, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import './CatalogPage.css';

const COLOR_FILTERS = [
  { id: 'all', label: 'Tất cả màu', hex: 'conic-gradient(#cf151b 0 16%, #164bd9 16% 32%, #f3f1eb 32% 48%, #ef6d34 48% 64%, #f2c400 64% 80%, #1b1c20 80%)' },
  { id: 'red', label: 'Đỏ', hex: '#cf151b', matches: ['đỏ', 'red'] },
  { id: 'blue', label: 'Xanh', hex: '#164bd9', matches: ['xanh', 'blue', 'navy'] },
  { id: 'white', label: 'Trắng', hex: '#f3f1eb', matches: ['trắng', 'white'] },
  { id: 'orange', label: 'Cam', hex: '#ef6d34', matches: ['cam', 'orange'] },
  { id: 'yellow', label: 'Vàng', hex: '#f2c400', matches: ['vàng', 'yellow'] },
  { id: 'black', label: 'Đen', hex: '#1b1c20', matches: ['đen', 'black'] },
];

const AVAILABILITY_FILTERS = [
  ['all', 'Tất cả'],
  ['in-stock', 'Có sẵn'],
  ['pre-order', 'Pre-Order'],
];

export default function CatalogPage() {
  const [activeColorId, setActiveColorId] = useState('all');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');
  const [filterOpen, setFilterOpen] = useState(false);
  const [colorOpen, setColorOpen] = useState(false);
  const [viewMode, setViewMode] = useState('standard');
  const [showStickyColors, setShowStickyColors] = useState(false);
  const gridRef = useRef(null);

  const activeColor = useMemo(() => COLOR_FILTERS.find((color) => color.id === activeColorId), [activeColorId]);
  const visibleProducts = useMemo(
    () => availabilityFilter === 'all' ? products : products.filter((product) => product.availability === availabilityFilter),
    [availabilityFilter]
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const updateStickyColors = () => {
      if (!gridRef.current) {
        setShowStickyColors(false);
        return;
      }
      const rect = gridRef.current.getBoundingClientRect();
      setShowStickyColors(window.scrollY > 4 && rect.bottom > 84);
    };
    updateStickyColors();
    window.addEventListener('scroll', updateStickyColors, { passive: true });
    window.addEventListener('resize', updateStickyColors);
    return () => {
      window.removeEventListener('scroll', updateStickyColors);
      window.removeEventListener('resize', updateStickyColors);
    };
  }, [visibleProducts.length]);

  return (
    <>
      <Navbar />
      <main className="catalog-listing">
        <header className="catalog-listing__hero container">
          <h1>NHỮNG MẪU ÁO</h1>
        </header>

        <section className="catalog-listing__content container">
          <div className="catalog-listing__toolbar">
            <button className="catalog-listing__filter-toggle" onClick={() => setFilterOpen((value) => !value)} aria-expanded={filterOpen}>
              <span aria-hidden="true">☷</span> BỘ LỌC
            </button>
            <div className={`catalog-listing__badges ${filterOpen ? 'is-open' : ''}`} aria-label="Lọc tình trạng sản phẩm">
              {AVAILABILITY_FILTERS.map(([id, label]) => <button key={id} className={availabilityFilter === id ? 'is-active' : ''} onClick={() => setAvailabilityFilter(id)}>{label}</button>)}
              <div className={`catalog-listing__color-control ${colorOpen ? 'is-open' : ''}`}>
                <button className="catalog-listing__color-toggle" onClick={() => setColorOpen((value) => !value)} aria-expanded={colorOpen}>
                  COLOR <span className="catalog-listing__rainbow-dot" />
                </button>
                <div className="catalog-listing__colors" aria-label="Lọc màu sản phẩm">
                  {COLOR_FILTERS.map((color) => <button key={color.id} className={activeColorId === color.id ? 'is-active' : ''} onClick={() => setActiveColorId(color.id)} aria-label={color.label} aria-pressed={activeColorId === color.id} title={color.label}><span style={{ background: color.hex }} /></button>)}
                </div>
              </div>
            </div>
            <div className="catalog-listing__view-toggle" aria-label="Chế độ hiển thị sản phẩm">
              <button className={viewMode === 'standard' ? 'is-active' : ''} onClick={() => setViewMode('standard')} aria-pressed={viewMode === 'standard'}>VIEW 1</button>
              <button className={viewMode === 'mixed' ? 'is-active' : ''} onClick={() => setViewMode('mixed')} aria-pressed={viewMode === 'mixed'}>VIEW 2</button>
            </div>
            <span>{visibleProducts.length} MẪU ÁO</span>
          </div>
          <div className="catalog-listing__grid" ref={gridRef}>
            {visibleProducts.map((product, index) => <ProductCard key={product.id} product={product} globalColor={activeColorId === 'all' ? null : activeColor} reverseImages={viewMode === 'mixed' && index % 2 === 1} />)}
          </div>
        </section>
      </main>
      {showStickyColors && (
        <div className="catalog-listing__sticky-colors liquid-color-nav" aria-label="Đổi nhanh màu sản phẩm">
          <span className="catalog-listing__sticky-label">Màu:</span>
          {COLOR_FILTERS.filter((color) => color.id !== 'all').slice(0, 6).map((color) => <button key={color.id} className={activeColorId === color.id ? 'is-active' : ''} onClick={() => setActiveColorId(color.id)} aria-label={color.label} aria-pressed={activeColorId === color.id}><span style={{ background: color.hex }} /></button>)}
        </div>
      )}
      <Footer />
    </>
  );
}
