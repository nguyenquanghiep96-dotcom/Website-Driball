import Navbar from '../components/Navbar';
import HeroBanner from '../components/HeroBanner';
import ProductGrid from '../components/ProductGrid';
import BrandMarquee from '../components/BrandMarquee';
import BentoGrid from '../components/BentoGrid';
import Partners from '../components/Partners';
import Footer from '../components/Footer';
import { ScrollReveal } from '../hooks/useScrollReveal';
import './HomePage.css';

export default function HomePage() {
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
      <Footer />
    </div>
  );
}
