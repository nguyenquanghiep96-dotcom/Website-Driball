import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroBanner from '../components/HeroBanner';
import ProductGrid from '../components/ProductGrid';
import BrandMarquee from '../components/BrandMarquee';
import BentoGrid from '../components/BentoGrid';
import Partners from '../components/Partners';
import Footer from '../components/Footer';
import FooterCta from '../components/FooterCta';
import { ScrollReveal } from '../hooks/useScrollReveal';
import './HomePage.css';

export default function HomePage() {
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const anchor = window.location.hash && document.querySelector(window.location.hash);
      if (anchor) anchor.scrollIntoView();
      else window.scrollTo(0, 0);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="home-page">
      <Navbar />
      <main>
        <ScrollReveal>
          <HeroBanner mode="product" />
        </ScrollReveal>

        <ProductGrid />

        <ScrollReveal>
          <BrandMarquee />
        </ScrollReveal>

        <BentoGrid />

        <Partners />
      </main>
      <FooterCta />
      <Footer />
    </div>
  );
}
