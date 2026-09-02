import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer" id="about">
      <div className="footer__inner container">
        <div className="footer__nav">
          <div><span>CATALOG</span><Link to="/catalog">Tất cả mẫu áo</Link><Link to="/product/stripe-series-blue">Stripe Series</Link><Link to="/quote/stripe-series-blue">Tính báo giá</Link></div>
          <div><span>HỖ TRỢ</span><Link to="/product/stripe-series-blue#process">Quy trình 14 ngày</Link><Link to="/product/stripe-series-blue#printing">In ấn</Link><Link to="/product/stripe-series-blue#specs">Bảng size</Link></div>
          <div><span>THEO DÕI</span><a href="https://facebook.com/driball.vietnam" target="_blank" rel="noopener noreferrer">Facebook <span className="material-symbols-outlined icon-call-made" aria-hidden="true">call_made</span></a><a href="https://instagram.com/driball.vietnam" target="_blank" rel="noopener noreferrer">Instagram <span className="material-symbols-outlined icon-call-made" aria-hidden="true">call_made</span></a><a href="https://zalo.me/0000000000" target="_blank" rel="noopener noreferrer">Zalo <span className="material-symbols-outlined icon-call-made" aria-hidden="true">call_made</span></a></div>
        </div>

        <div className="footer__wordmark" aria-hidden="true"><img src="/images/driball-logo.svg" alt="" /></div>
        <div className="footer__bottom"><span>© {new Date().getFullYear()} DRIBALL</span><span>MADE FOR THE GAME · BUILT FOR THE TEAM</span></div>
      </div>
    </footer>
  );
}
