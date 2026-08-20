import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../data/products';
import './ProductCard.css';

const colorMatchesFilter = (color, filter) => {
  if (!filter) return false;
  const name = color.name.toLowerCase();
  return filter.matches.some((term) => name.includes(term));
};

export default function ProductCard({ product, globalColor }) {
  const defaultColor = useMemo(
    () => product.colors?.find((color) => color.image === product.heroImage) || product.colors?.[0],
    [product]
  );
  const [activeColorName, setActiveColorName] = useState(defaultColor?.name);

  useEffect(() => {
    if (!globalColor) {
      setActiveColorName(defaultColor?.name);
      return;
    }
    const matchingColor = product.colors?.find((color) => colorMatchesFilter(color, globalColor));
    if (matchingColor) setActiveColorName(matchingColor.name);
  }, [defaultColor?.name, globalColor, product.colors]);

  const activeColor = product.colors?.find((color) => color.name === activeColorName) || defaultColor;
  const primaryImage = activeColor?.image || product.heroImage;
  const hoverImage = activeColor?.hoverImage || product.cardHoverImage || product.modelImage || primaryImage;
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
      {product.colors?.length > 1 && (
        <div className="product-card__colors" aria-label={`Chọn màu ${product.name}`}>
          {product.colors.map((color) => (
            <button
              key={color.name}
              className={color.name === activeColor?.name ? 'is-active' : ''}
              onClick={() => setActiveColorName(color.name)}
              aria-label={color.name}
              aria-pressed={color.name === activeColor?.name}
              title={color.name}
            ><span style={{ background: color.hex }} /></button>
          ))}
        </div>
      )}
    </article>
  );
}
