import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../data/products';
import './ProductCard.css';

const colorMatchesFilter = (color, filter) => {
  if (!filter) return false;
  const name = color.name.toLowerCase();
  return filter.matches.some((term) => name.includes(term));
};

export default function ProductCard({ product, globalColor, reverseImages = false }) {
  const defaultColor = useMemo(
    () => product.colors?.find((color) => color.image === product.heroImage) || product.colors?.[0],
    [product]
  );
  const activeColor = globalColor
    ? product.colors?.find((color) => colorMatchesFilter(color, globalColor)) || defaultColor
    : defaultColor;
  const defaultPrimaryImage = activeColor?.image || product.heroImage;
  const defaultHoverImage = activeColor?.hoverImage || product.cardHoverImage || product.modelImage || defaultPrimaryImage;
  const primaryImage = reverseImages ? defaultHoverImage : defaultPrimaryImage;
  const hoverImage = reverseImages ? defaultPrimaryImage : defaultHoverImage;
  const isInStock = product.availability === 'in-stock';

  return (
    <article className="product-card">
      <Link to={`/product/${product.slug}`} className="product-card__link" aria-label={`Xem ${product.name}`}>
        <div className="product-card__image-wrapper">
          <img src={primaryImage} alt={product.name} className="product-card__image product-card__image--primary" loading="lazy" />
          <img src={hoverImage} alt="" aria-hidden="true" className="product-card__image product-card__image--hover" loading="lazy" />
        </div>
        <div className="product-card__info">
          <div className="product-card__title-row">
            <h3 className="product-card__name">{product.name}</h3>
            <span className={`product-card__badge ${isInStock ? 'product-card__badge--stock' : 'product-card__badge--preorder'}`}>
              {isInStock ? 'Có sẵn' : 'Pre-Order'}
            </span>
          </div>
          <p className="product-card__price">
            {formatPrice(product.price)}
            {product.bulkPrice && <span className="product-card__bulk"> / Đặt từ {product.bulkMinQty} bộ giá còn {formatPrice(product.bulkPrice)}</span>}
          </p>
        </div>
      </Link>
    </article>
  );
}
