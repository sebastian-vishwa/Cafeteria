import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { PRODUCTS } from '../data/products';

const CartContext = createContext(null);
const STORAGE_KEY = 'josh_cafe_cart_v1';

function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

    if (!Array.isArray(saved)) return [];

    return saved.flatMap((item) => {
      if (!item || typeof item !== 'object') return [];

      const product = PRODUCTS.find((entry) => entry.id === item.id);

      if (
        !product ||
        product.available === false ||
        !Number.isInteger(item.quantity) ||
        item.quantity < 1
      ) {
        return [];
      }

      return [{
        ...product,
        quantity: Math.min(item.quantity, 99),
        customNote:
          typeof item.customNote === 'string' ? item.customNote : '',
      }];
    });
  } catch {
    return [];
  }
}

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(loadCart);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [deliveryInstructions, setDeliveryInstructions] = useState('');
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  const [checkoutData, setCheckoutData] = useState({
    fullName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    instructions: '',
    fulfillment: 'pickup',
    deliveryWindow: 'asap',
    scheduledTime: '',
  });

  const [paymentData, setPaymentData] = useState({
    method: 'cod',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    cardName: '',
    codNeedChange: false,
    codBillAmount: '',
    sameBillingAddress: true,
  });

  const [latestOrder, setLatestOrder] = useState(null);

  // Retained for compatibility with the existing checkout components.
  const [tipRate, setTipRate] = useState(0);
  const [customTipAmount, setCustomTipAmount] = useState(null);
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(
          cart.map(({ id, quantity, customNote }) => ({
            id,
            quantity,
            customNote,
          }))
        )
      );
    } catch {
      // The cart still works if browser storage is unavailable.
    }
  }, [cart]);

  useEffect(() => {
    return () => clearTimeout(toastTimer.current);
  }, []);

  const showToast = (message, icon = '☕') => {
    clearTimeout(toastTimer.current);
    setToast({ message, icon, id: Date.now() });

    toastTimer.current = setTimeout(() => {
      setToast(null);
    }, 2800);
  };

  const addToCart = (product, customNote = '') => {
    const menuProduct = PRODUCTS.find((item) => item.id === product.id);

    if (!menuProduct || menuProduct.available === false) {
      showToast('This item is currently unavailable.');
      return;
    }

    const current = cart.find((item) => item.id === menuProduct.id);

    if (current?.quantity >= 99) {
      showToast('Maximum quantity is 99 per item.');
      return;
    }

    setCart((previous) => {
      const exists = previous.some((item) => item.id === menuProduct.id);

      if (exists) {
        return previous.map((item) =>
          item.id === menuProduct.id
            ? { ...item, quantity: Math.min(99, item.quantity + 1) }
            : item
        );
      }

      return [
        ...previous,
        { ...menuProduct, quantity: 1, customNote },
      ];
    });

    showToast(`Added ${menuProduct.name} to your order.`);
  };

  const updateQuantity = (id, delta) => {
    if (!Number.isInteger(delta)) return;

    setCart((previous) =>
      previous
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: Math.min(99, item.quantity + delta),
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart((previous) => previous.filter((item) => item.id !== id));
    showToast('Item removed from your order.');
  };

  const clearCart = () => setCart([]);

  const itemsCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const itemsSubtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // No delivery pricing, tips, tax or promotions configured yet.
  const deliveryFee = 0;
  const estimatedTax = 0;
  const tipAmount = 0;
  const discountAmount = 0;
  const totalDue = itemsSubtotal;

  const deliveryFeePending =
    checkoutData.fulfillment === 'delivery';

  const applyPromo = () => {
    setPromoError('Promo codes are not available yet.');
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        itemsCount,
        itemsSubtotal,
        deliveryFee,
        deliveryFeePending,
        estimatedTax,
        tipRate,
        setTipRate,
        customTipAmount,
        setCustomTipAmount,
        tipAmount,
        totalDue,
        deliveryInstructions,
        setDeliveryInstructions,
        promoCode,
        setPromoCode,
        discountAmount,
        promoError,
        promoSuccess: '',
        applyPromo,
        checkoutData,
        setCheckoutData,
        paymentData,
        setPaymentData,
        latestOrder,
        setLatestOrder,
        toast,
        showToast,
        FREE_DELIVERY_THRESHOLD: Infinity,
        isFreeDelivery: false,
        deliveryGoalRemaining: 0,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};