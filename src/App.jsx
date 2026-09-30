import React, { useState, useEffect } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { Toast } from './components/Toast';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { AboutUsPage } from './pages/AboutUsPage';
import { CheckoutDetailsPage } from './pages/CheckoutDetailsPage';
import { CheckoutPaymentPage } from './pages/CheckoutPaymentPage';
import { CheckoutConfirmationPage } from './pages/CheckoutConfirmationPage';

const MainApp = () => {
  const [activePage, setActivePage] = useState('home');
  const { setIsCartOpen } = useCart();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  const handleNavigate = (page) => {
    setActivePage(page);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'var(--bg-page)',
    }}>
      {/* Top Header */}
      <Header
        activePage={activePage}
        setActivePage={handleNavigate}
      />

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        onNavigateToCheckout={() => handleNavigate('checkout-details')}
      />

      {/* Main Page View */}
      <main style={{ flex: 1 }}>
        {activePage === 'home' && (
          <HomePage onNavigate={handleNavigate} />
        )}
        {activePage === 'menu' && (
          <ProductsPage onNavigate={handleNavigate} />
        )}
        {activePage === 'about' && (
          <AboutUsPage onNavigate={handleNavigate} />
        )}
        {activePage === 'checkout-details' && (
          <CheckoutDetailsPage
            onContinueToPayment={() => handleNavigate('checkout-payment')}
            onModifyCart={() => setIsCartOpen(true)}
          />
        )}
        {activePage === 'checkout-payment' && (
          <CheckoutPaymentPage
            onBackToDetails={() => handleNavigate('checkout-details')}
            onOrderSuccess={() => handleNavigate('checkout-confirmation')}
          />
        )}
        {activePage === 'checkout-confirmation' && (
          <CheckoutConfirmationPage
            onBackToMenu={() => handleNavigate('menu')}
          />
        )}
      </main>

      {/* Global Toast */}
      <Toast />

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <MainApp />
    </CartProvider>
  );
}
