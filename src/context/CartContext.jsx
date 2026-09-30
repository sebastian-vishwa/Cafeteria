import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS } from '../data/products';

const CartContext = createContext();

const INITIAL_CART = [
  {
    ...PRODUCTS.find(p => p.id === 'golden-honeycomb-latte'),
    quantity: 1,
    customNote: 'Whole Milk, Extra Shot, 16oz'
  },
  {
    ...PRODUCTS.find(p => p.id === 'flaky-butter-croissant'),
    quantity: 2,
    customNote: 'Warmed Up, Extra Butter Flakes'
  },
  {
    ...PRODUCTS.find(p => p.id === 'avocado-brioche-tartine'),
    quantity: 1,
    customNote: 'Poached Egg add-on, Maldon Salt'
  }
];

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('amber_roast_cart');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_CART;
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [deliveryInstructions, setDeliveryInstructions] = useState('Gate code #4012, please do not ring doorbell.');
  const [tipRate, setTipRate] = useState(0.18); // 18% default from Cart drawer
  const [customTipAmount, setCustomTipAmount] = useState(null);
  const [promoCode, setPromoCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [toast, setToast] = useState(null);

  // Form Details
  const [checkoutData, setCheckoutData] = useState({
    fullName: 'Clara Montgomery',
    email: 'clara.m@example.com',
    phone: '+1(555) 349-8201',
    street: '742 Evergreen Terrace, Apt 4B',
    city: 'Portland',
    state: 'OR',
    zip: '97201',
    instructions: 'Gate code #4012, please do not ring doorbell.',
    deliveryWindow: 'asap', // 'asap' | 'scheduled'
    scheduledTime: '12:30 PM - 1:00 PM',
  });

  // Payment
  const [paymentData, setPaymentData] = useState({
    method: 'online', // 'online' | 'cod'
    cardNumber: '•••• •••• •••• 4242',
    cardExpiry: '12/28',
    cardCvc: '888',
    cardName: 'Clara Montgomery',
    codNeedChange: true,
    codBillAmount: '$50',
    sameBillingAddress: true,
  });

  // Active Order State
  const [latestOrder, setLatestOrder] = useState(null);

  useEffect(() => {
    localStorage.setItem('amber_roast_cart', JSON.stringify(cart));
  }, [cart]);

  const showToast = (message, icon = '☕') => {
    setToast({ message, icon, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 2800);
  };

  const addToCart = (product, customNote = null) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.id === product.id);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + 1,
        };
        return next;
      }
      return [
        ...prev,
        {
          ...product,
          quantity: 1,
          customNote: customNote || product.customizationNote || 'Standard Artisan Preparation'
        }
      ];
    });
    showToast(`Added ${product.name} to bag!`);
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => {
      return prev
        .map(item => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const removeFromCart = (id) => {
    const item = cart.find(i => i.id === id);
    setCart(prev => prev.filter(item => item.id !== id));
    if (item) {
      showToast(`Removed ${item.name}`, '🗑');
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  // Calculations
  const FREE_DELIVERY_THRESHOLD = 30.00;
  const itemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const itemsSubtotal = Number(cart.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2));
  
  const isFreeDelivery = itemsSubtotal >= FREE_DELIVERY_THRESHOLD;
  const deliveryGoalRemaining = isFreeDelivery ? 0 : Number((FREE_DELIVERY_THRESHOLD - itemsSubtotal).toFixed(2));
  const deliveryFee = itemsSubtotal === 0 ? 0 : (isFreeDelivery ? 0.00 : 2.50);
  
  const estimatedTax = Number((itemsSubtotal * 0.08).toFixed(2));
  const tipAmount = customTipAmount !== null 
    ? customTipAmount 
    : Number((itemsSubtotal * tipRate).toFixed(2));

  const totalBeforeDiscount = itemsSubtotal + deliveryFee + estimatedTax + tipAmount;
  const totalDue = Number(Math.max(0, totalBeforeDiscount - discountAmount).toFixed(2));

  const applyPromo = (code) => {
    const clean = code.trim().toUpperCase();
    if (!clean) {
      setPromoError('Please enter a voucher or promo code.');
      return;
    }
    if (clean === 'FREESHIP') {
      setDiscountAmount(deliveryFee);
      setPromoSuccess('Free delivery voucher applied!');
      setPromoError('');
    } else if (clean === 'AMBER10' || clean === 'WELCOME10') {
      const disc = Number((itemsSubtotal * 0.1).toFixed(2));
      setDiscountAmount(disc);
      setPromoSuccess(`10% discount applied: -$${disc.toFixed(2)}`);
      setPromoError('');
    } else {
      setPromoError('Invalid code. Try "AMBER10" or "FREESHIP"');
      setPromoSuccess('');
    }
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
        FREE_DELIVERY_THRESHOLD,
        isFreeDelivery,
        deliveryGoalRemaining,
        deliveryFee,
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
        promoSuccess,
        applyPromo,
        checkoutData,
        setCheckoutData,
        paymentData,
        setPaymentData,
        latestOrder,
        setLatestOrder,
        toast,
        showToast,
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
