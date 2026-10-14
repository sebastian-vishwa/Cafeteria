import { useEffect, useState } from 'react';
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

import './App.css';

const MainApp = () => {
  const [activePage, setActivePage] = useState('home');
  const [navigationCount, setNavigationCount] = useState(0);
  const { setIsCartOpen } = useCart();

  const isStorefront =
    activePage === 'home' || activePage === 'menu';

  const handleNavigate = (page) => {
    setIsCartOpen(false);
    setActivePage(page);

    // Allows repeated Menu clicks to scroll to the menu again.
    setNavigationCount((count) => count + 1);
  };

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const behavior = reduceMotion ? 'auto' : 'smooth';

    if (activePage === 'menu') {
      document.getElementById('cafe-menu')?.scrollIntoView({
        behavior,
        block: 'start',
      });
    } else {
      window.scrollTo({ top: 0, behavior });
    }
  }, [activePage, navigationCount]);

  return (
    <div className="josh-app">
      <Header
        activePage={activePage}
        setActivePage={handleNavigate}
      />

      <CartDrawer
        onNavigateToCheckout={() =>
          handleNavigate('checkout-details')
        }
      />

      <main className="josh-main">
        {isStorefront && (
          <>
            <HomePage onNavigate={handleNavigate} />

            <section
              id="cafe-menu"
              className="josh-menu-section"
              aria-label="Josh Cafe food and drinks menu"
            >
              <ProductsPage onNavigate={handleNavigate} />
            </section>
          </>
        )}

        {activePage === 'about' && (
          <AboutUsPage onNavigate={handleNavigate} />
        )}

        {activePage === 'checkout-details' && (
          <CheckoutDetailsPage
            onContinueToPayment={() =>
              handleNavigate('checkout-payment')
            }
            onModifyCart={() => setIsCartOpen(true)}
          />
        )}

        {activePage === 'checkout-payment' && (
          <CheckoutPaymentPage
            onBackToDetails={() =>
              handleNavigate('checkout-details')
            }
            onOrderSuccess={() =>
              handleNavigate('checkout-confirmation')
            }
          />
        )}

        {activePage === 'checkout-confirmation' && (
          <CheckoutConfirmationPage
            onBackToMenu={() => handleNavigate('menu')}
          />
        )}
      </main>

      <Toast />

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