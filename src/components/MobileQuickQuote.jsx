import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './MobileQuickQuote.css';

export default function MobileQuickQuote() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      const productGrid = document.querySelector('.product-grid');
      if (!window.matchMedia('(max-width: 768px)').matches || !productGrid) {
        setVisible(false);
        return;
      }
      const productGridTop = productGrid.getBoundingClientRect().top;
      const partnersTop = document.querySelector('.partners')?.getBoundingClientRect().top ?? Infinity;
      setVisible(productGridTop <= 84 && partnersTop > window.innerHeight);
    };
    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
    window.addEventListener('resize', updateVisibility);
    return () => {
      window.removeEventListener('scroll', updateVisibility);
      window.removeEventListener('resize', updateVisibility);
    };
  }, []);

  if (!visible) return null;
  return <Link to="/quote/stripe-series-blue" className="product-grid__quick-quote btn btn-primary">TÍNH GIÁ NHANH <span>↗</span></Link>;
}
