import { useState } from 'react';
import { Coffee, Menu, ShoppingBag, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Header = ({ activePage, setActivePage }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemsCount, setIsCartOpen } = useCart();

  const navigate = (page) => {
    setMenuOpen(false);
    setActivePage(page);
  };

  return (
    <header className="jc-header">
      <div className="jc-wrap jc-header-row">
        <button
          type="button"
          className="jc-brand"
          onClick={() => navigate('home')}
          aria-label="Josh Cafe home"
        >
          <span>Josh<span className="jc-brand-accent">cafe</span></span>
          <Coffee size={25} aria-hidden="true" />
        </button>

        <nav className="jc-desktop-nav" aria-label="Main navigation">
          <button
            type="button"
            aria-current={activePage === 'home' ? 'page' : undefined}
            onClick={() => navigate('home')}
          >
            Home
          </button>
          <button
            type="button"
            aria-current={activePage === 'menu' ? 'page' : undefined}
            onClick={() => navigate('menu')}
          >
            Menu
          </button>
        </nav>

        <div className="jc-header-actions">
          <button
            id="cart-trigger-btn"
            type="button"
            className="jc-button jc-header-cart"
            onClick={() => setIsCartOpen(true)}
            aria-label={`Your order, ${itemsCount} items`}
          >
            <ShoppingBag size={19} aria-hidden="true" />
            <span className="jc-order-label">Your order</span>
            <span className="jc-count">{itemsCount}</span>
          </button>

          <button
            type="button"
            className="jc-icon-button jc-nav-toggle"
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={menuOpen}
            aria-controls="jc-mobile-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          id="jc-mobile-nav"
          className="jc-mobile-nav"
          aria-label="Mobile navigation"
          onKeyDown={(event) => {
            if (event.key === 'Escape') setMenuOpen(false);
          }}
        >
          <button type="button" onClick={() => navigate('home')}>
            Home
          </button>
          <button type="button" onClick={() => navigate('menu')}>
            Browse menu
          </button>
        </nav>
      )}
    </header>
  );
};