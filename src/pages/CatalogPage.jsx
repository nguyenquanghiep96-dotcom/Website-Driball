import { useEffect, useMemo, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FooterCta from '../components/FooterCta';
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const activeColor = useMemo(() => COLOR_FILTERS.find((color) => color.id === activeColorId), [activeColorId]);
  const visibleProducts = useMemo(
    () => availabilityFilter === 'all' ? products : products.filter((product) => product.availability === availabilityFilter),
    [availabilityFilter]
  );

  return (
    <>
      <Navbar />
      <main className="catalog-listing">
        <header className="catalog-listing__hero container">
          <h1>NHỮNG MẪU ÁO</h1>
        </header>

        <section className="catalog-listing__content container">
          <div className="catalog-listing__toolbar">
            <div className="catalog-listing__badges" aria-label="Lọc tình trạng sản phẩm">
              {AVAILABILITY_FILTERS.map(([id, label]) => <button key={id} className={availabilityFilter === id ? 'is-active' : ''} onClick={() => setAvailabilityFilter(id)}>{label}</button>)}
            </div>
            <div className="catalog-listing__colors" aria-label="Lọc màu sản phẩm">
              {COLOR_FILTERS.map((color) => <button key={color.id} className={activeColorId === color.id ? 'is-active' : ''} onClick={() => setActiveColorId(color.id)} aria-label={color.label} aria-pressed={activeColorId === color.id} title={color.label}><span style={{ background: color.hex }} /></button>)}
            </div>
            <span>{visibleProducts.length} MẪU ÁO</span>
          </div>
          <div className="catalog-listing__grid">
            {visibleProducts.map((product) => <ProductCard key={product.id} product={product} globalColor={activeColorId === 'all' ? null : activeColor} />)}
          </div>
        </section>
      </main>
      <FooterCta />
      <Footer />
    </>
  );
}
