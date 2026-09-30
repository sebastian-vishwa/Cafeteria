import { useState } from 'react';
import {
  ArrowRight,
  Plus,
  Search,
  ShoppingBag,
  Star,
} from 'lucide-react';

import {CATEGORIES,PRODUCTS,formatPrice,} from '../data/products';
import { useCart } from '../context/CartContext';


function ProductImage({ product }) {
  const [failed, setFailed] = useState(false);

  if (!product.image || failed) {
    return (
      <div className="jc-image-placeholder">
        <ShoppingBag size={30} aria-hidden="true" />
        <span>Photo coming soon</span>
      </div>
    );
  }

  return (
    <img
      src={product.image}
      alt={product.name}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

export const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const {
    addToCart,
    itemsCount,
    itemsSubtotal,
    setIsCartOpen,
  } = useCart();

  const query = searchQuery.trim().toLowerCase();

  const categories = [
    { id: 'all', name: 'All' },
    ...CATEGORIES.filter((category) => category.id !== 'all'),
  ];

  const visibleProducts = PRODUCTS.filter((product) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      product.category === selectedCategory;

    const searchableText = [
      product.name,
      product.description,
      ...(product.tags || []),
    ]
      .join(' ')
      .toLowerCase();

    return matchesCategory && searchableText.includes(query);
  });

  const resetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
  };

  return (
    <div className="jc-menu">
      <div className="jc-wrap">
        <div className="jc-menu-heading">
          <div>
            <p className="jc-eyebrow">SOMETHING FOR EVERY CRAVING</p>
            <h2>What are you craving?</h2>
            <p>Find your favourite. Make it your order.</p>
          </div>

          <label className="jc-search">
            <Search size={19} aria-hidden="true" />
            <input
              type="search"
              aria-label="Search the menu"
              placeholder="Search the menu..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </label>
        </div>

        <div className="jc-categories" aria-label="Food categories">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              className={
                selectedCategory === category.id
                  ? 'jc-category is-active'
                  : 'jc-category'
              }
              aria-pressed={selectedCategory === category.id}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        <p className="jc-results" role="status">
          {visibleProducts.length}{' '}
          {visibleProducts.length === 1 ? 'item' : 'items'}
          {query && ` matching “${searchQuery.trim()}”`}
        </p>

        {visibleProducts.length === 0 ? (
          <div className="jc-empty">
            <Search size={32} aria-hidden="true" />
            <h3>No matching items</h3>
            <p>Try another search or browse all categories.</p>
            <button
              type="button"
              className="jc-button"
              onClick={resetFilters}
            >
              Show all items
            </button>
          </div>
        ) : (
          <div className="jc-product-grid">
            {visibleProducts.map((product) => {
              const unavailable = product.available === false;
              const hasRating =
                Number(product.reviewsCount) > 0 &&
                Number.isFinite(Number(product.rating));

              return (
                <article className="jc-product" key={product.id}>
                  <div className="jc-product-photo">
                    <ProductImage product={product} />

                    {unavailable && (
                      <span className="jc-sold-out">Sold out</span>
                    )}
                  </div>

                  <div className="jc-product-content">
                    <h3>{product.name}</h3>
                    <p className="jc-product-description">
                      {product.description}
                    </p>

                    <div className="jc-rating">
                      {hasRating ? (
                        <>
                          <Star
                            size={15}
                            fill="currentColor"
                            aria-hidden="true"
                          />
                          <span>
                            {Number(product.rating).toFixed(1)}
                          </span>
                          <span className="jc-review-count">
                            ({product.reviewsCount})
                          </span>
                        </>
                      ) : (
                        <span className="jc-review-count">
                          No reviews yet
                        </span>
                      )}
                    </div>

                    <div className="jc-product-bottom">
                      <strong>{formatPrice(product.price)}</strong>

                      <button
                        type="button"
                        className="jc-button jc-add-button"
                        disabled={unavailable}
                        aria-label={`Add ${product.name} to order`}
                        onClick={() => addToCart(product)}
                      >
                        <Plus size={16} aria-hidden="true" />
                        {unavailable ? 'Sold out' : 'Add to order'}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        <p className="jc-menu-note">
          Sample menu and ratings for preview.
        </p>
      </div>

      {itemsCount > 0 && (
        <div className="jc-mobile-order">
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            aria-label={`View order with ${itemsCount} items`}
          >
            <ShoppingBag size={20} aria-hidden="true" />

            <span>
              {itemsCount} {itemsCount === 1 ? 'item' : 'items'}
              <small>
                Subtotal · {formatPrice(itemsSubtotal)}
              </small>
            </span>

            <strong>View order</strong>
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
};