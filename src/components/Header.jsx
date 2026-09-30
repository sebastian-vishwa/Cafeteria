import React from 'react';
import { ShoppingBag, User } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Header = ({ activePage, setActivePage }) => {
  const { itemsCount, setIsCartOpen } = useCart();

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Menu & Order' },
    { id: 'about', label: 'About Us' },
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: 'rgba(252, 248, 243, 0.95)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid #F0E3D5',
      transition: 'all 0.2s ease',
      width: '100%',
    }}>
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '76px',
          width: '100%',
          maxWidth: '100%',
          padding: '0 40px',
          boxSizing: 'border-box',
        }}
      >
        {/* Far Left: Brand Logo & Subtitle */}
        <div style={{
          flex: '1 1 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}>
          <div 
            onClick={() => setActivePage('home')}
            style={{ 
              cursor: 'pointer', 
              display: 'flex', 
              flexDirection: 'column',
              userSelect: 'none',
            }}
          >
            <span style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '22px',
              fontWeight: '800',
              letterSpacing: '-0.02em',
              color: 'var(--text-dark)',
              lineHeight: 1.1,
            }}>
              Amber &amp; Roast
            </span>
            <span style={{
              fontSize: '9.5px',
              fontWeight: '700',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--amber-secondary)',
              marginTop: '2px',
            }}>
              Artisanal Roastery
            </span>
          </div>
        </div>

        {/* Center: Navigation Links perfectly centered in available space */}
        <nav 
          aria-label="Main Navigation"
          style={{
            flex: '0 0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          {navItems.map(item => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                style={{
                  padding: '8px 20px',
                  borderRadius: '9999px',
                  fontSize: '14px',
                  fontWeight: isActive ? '700' : '600',
                  color: isActive ? '#FFFFFF' : 'var(--text-body)',
                  backgroundColor: isActive ? 'var(--amber-primary)' : 'transparent',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: isActive ? '0 2px 8px rgba(156, 67, 11, 0.25)' : 'none',
                }}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Far Right: Cart Button (with badge) & Circular User Profile Icon */}
        <div style={{
          flex: '1 1 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: '14px',
        }}>
          {/* Cart Button with Notification Badge */}
          <button
            id="cart-trigger-btn"
            onClick={() => setIsCartOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: '9999px',
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--border-card)',
              boxShadow: 'var(--shadow-sm)',
              fontSize: '14px',
              fontWeight: '600',
              color: 'var(--text-dark)',
              position: 'relative',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--amber-gold)';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border-card)';
              e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
            }}
          >
            <ShoppingBag size={17} color="#22140D" />
            <span>Cart</span>
            {itemsCount > 0 && (
              <span style={{
                backgroundColor: 'var(--amber-accent)',
                color: '#FFFFFF',
                fontSize: '11px',
                fontWeight: '800',
                padding: '2px 7px',
                borderRadius: '9999px',
                minWidth: '20px',
                textAlign: 'center',
                boxShadow: '0 2px 6px rgba(224, 109, 16, 0.4)',
                transform: 'scale(1)',
                transition: 'transform 0.15s ease',
              }}>
                {itemsCount}
              </span>
            )}
          </button>

          {/* Circular User Profile / Guest Icon */}
          <div 
            title="Guest Patron (Instant Checkout)"
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: 'var(--amber-banner)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              border: '2px solid #FFFFFF',
              boxShadow: 'var(--shadow-sm)',
              transition: 'transform 0.2s ease',
              flexShrink: 0,
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <User size={18} color="#FFFFFF" />
          </div>
        </div>
      </div>
    </header>
  );
};
