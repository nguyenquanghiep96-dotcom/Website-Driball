import { Link } from 'react-router-dom';
import { formatPrice } from '../data/products';
import './ProductCard.css';

export default function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.slug}`} className="product-card">
      <div className="product-card__image-wrapper">
        <img
          src={product.heroImage}
          alt={product.name}
          className="product-card__image"
          loading="lazy"
        />
      </div>
      <div className="product-card__info">
        <h3 className="product-card__name">{product.name}</h3>
        <p className="product-card__price">
          {formatPrice(product.price)}
          {product.bulkPrice && (
            <span className="product-card__bulk">
              {' '}/ Đặt từ {product.bulkMinQty} bộ giá còn {formatPrice(product.bulkPrice)}
            </span>
          )}
        </p>
      </div>
    </Link>
  );
}
