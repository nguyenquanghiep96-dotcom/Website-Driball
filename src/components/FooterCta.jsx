import { Link } from 'react-router-dom';
import './FooterCta.css';

export default function FooterCta() {
  return (
    <section className="footer-cta" aria-label="Bắt đầu tính giá">
      <div className="footer-cta__inner container">
        <div><span>ĐỘI ĐÃ ĐỦ NGƯỜI?</span><h2>CHỐT KÈO<br />ÁO ĐẸP.</h2></div>
        <Link to="/quote/stripe-series-blue" className="btn btn-primary">ĐẶT HÀNG <span className="material-symbols-outlined icon-call-made" aria-hidden="true">call_made</span></Link>
      </div>
    </section>
  );
}
