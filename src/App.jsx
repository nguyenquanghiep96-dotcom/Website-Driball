import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import QuotePage from './pages/QuotePage';
import CatalogPage from './pages/CatalogPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/product/:slug" element={<ProductPage />} />
        <Route path="/quote/:slug" element={<QuotePage />} />
      </Routes>
    </BrowserRouter>
  );
}
