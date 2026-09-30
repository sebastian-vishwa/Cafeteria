import React, { useState } from 'react';
import { 
  CreditCard, 
  Lock, 
  ShieldCheck, 
  MapPin, 
  Check, 
  Coffee, 
  FileText, 
  Info, 
  Banknote, 
  Calendar, 
  User, 
  Wifi, 
  CheckCircle,
  HelpCircle,
  Printer,
  X
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import confetti from 'canvas-confetti';

export const CheckoutPaymentPage = ({ onBackToDetails, onOrderSuccess }) => {
  const {
    checkoutData,
    latestOrder,
    setLatestOrder,
  } = useCart();

  const [paymentOption, setPaymentOption] = useState('online'); // 'online' | 'cod'
  const [showOrderBanner, setShowOrderBanner] = useState(true); // Matches the screenshot reference!
  const [isProcessing, setIsProcessing] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [showCvcHelp, setShowCvcHelp] = useState(false);

  // Form states matching the exact screenshot
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8841');
  const [expiryDate, setExpiryDate] = useState('09/27');
  const [cvc, setCvc] = useState('782');
  const [cardholderName, setCardholderName] = useState('Clara Montgomery');

  const customerName = checkoutData.fullName || 'Clara';
  const customerEmail = checkoutData.email || 'clara.m@example.com';
  const addressStreet = checkoutData.street || '782 Pinecrest Avenue, Capitol Hill';
  const addressInstructions = checkoutData.instructions || 'Ring bell, leave with doorman';

  const handlePlaceOrder = (e) => {
    if (e) e.preventDefault();
    setIsProcessing(true);

    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#C25E00', '#EA580C', '#D97706', '#F59E0B', '#78350F'],
      });
    } catch (err) {
      // ignore
    }

    setTimeout(() => {
      setIsProcessing(false);
      setShowOrderBanner(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 600);
  };

  return (
    <div className="animate-fade-in" style={{ padding: '32px 0 70px 0' }}>
      <div className="container" style={{ maxWidth: '1100px' }}>
        
        {/* Top 3-Step Indicator matching screenshot */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '28px',
          padding: '0 8px',
        }}>
          {/* STEP 1 */}
          <div 
            onClick={onBackToDetails}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
          >
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: '#EA580C',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: '800',
              flexShrink: 0,
            }}>
              <Check size={14} strokeWidth={3} />
            </div>
            <div>
              <div style={{ fontSize: '10px', fontWeight: '800', letterSpacing: '0.06em', color: 'var(--text-muted)' }}>
                STEP 1
              </div>
              <div style={{ fontSize: '12.5px', fontWeight: '700', color: 'var(--text-dark)' }}>
                Delivery Details
              </div>
            </div>
          </div>

          <div style={{ flex: 1, height: '1px', backgroundColor: '#EADCCE', margin: '0 16px' }} />

          {/* STEP 2 • ACTIVE */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: '#8F3903',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '11.5px',
              fontWeight: '800',
              flexShrink: 0,
            }}>
              2
            </div>
            <div>
              <div style={{ fontSize: '10px', fontWeight: '800', letterSpacing: '0.06em', color: '#C25E00' }}>
                STEP 2 • ACTIVE
              </div>
              <div style={{ fontSize: '12.5px', fontWeight: '800', color: 'var(--text-dark)' }}>
                Payment &amp; Security
              </div>
            </div>
          </div>

          <div style={{ flex: 1, height: '1px', backgroundColor: '#EADCCE', margin: '0 16px' }} />

          {/* STEP 3 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', opacity: 0.65 }}>
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: '#EAE1D7',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '11.5px',
              fontWeight: '800',
              flexShrink: 0,
            }}>
              3
            </div>
            <div>
              <div style={{ fontSize: '10px', fontWeight: '800', letterSpacing: '0.06em', color: 'var(--text-muted)' }}>
                STEP 3
              </div>
              <div style={{ fontSize: '12.5px', fontWeight: '700', color: 'var(--text-dark)' }}>
                Live Tracking
              </div>
            </div>
          </div>
        </div>

        {/* ORDER CONFIRMED BANNER (Matches screenshot!) */}
        {showOrderBanner && (
          <div style={{
            backgroundColor: '#FCEDE1',
            background: 'linear-gradient(90deg, #FDEEE3 0%, #FAEDE2 100%)',
            border: '1px solid #F5D7C2',
            borderRadius: '20px',
            padding: '24px 28px',
            marginBottom: '32px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px',
            boxShadow: '0 4px 16px rgba(194, 94, 0, 0.08)',
            animation: 'fadeIn 0.3s ease-out',
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '18px', maxWidth: '780px' }}>
              {/* Checkmark square */}
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '14px',
                backgroundColor: '#E55812',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 4px 10px rgba(229, 88, 18, 0.3)',
              }}>
                <Check size={26} strokeWidth={3} />
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '6px' }}>
                  <h2 style={{ fontSize: '19px', fontWeight: '800', color: 'var(--text-dark)' }}>
                    Order Confirmed! Thank you, Clara!
                  </h2>
                  <span style={{
                    backgroundColor: '#8F3903',
                    color: '#FFFFFF',
                    fontSize: '10.5px',
                    fontWeight: '800',
                    padding: '3px 8px',
                    borderRadius: '6px',
                    letterSpacing: '0.04em',
                  }}>
                    KITCHEN ORDER #AR-8902
                  </span>
                </div>

                <p style={{ fontSize: '13px', color: 'var(--text-body)', lineHeight: 1.55, marginBottom: '12px' }}>
                  Your order has been received and our baristas are preparing your items. A full confirmation email with real-time tracking details has been sent to both your email (<strong>{customerEmail}</strong>) and our kitchen team (<strong>orders@amberandroast.com</strong>).
                </p>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '12px',
                  color: 'var(--text-body)',
                  flexWrap: 'wrap',
                  fontWeight: '600',
                }}>
                  <span>🚚 Estimated Delivery: <strong>Today at 9:45 AM (approx. 28 mins)</strong></span>
                  <span style={{ color: '#D4C3B5' }}>•</span>
                  <span>Courier: Marcus V. • Heated Bag #4</span>
                </div>
              </div>
            </div>

            {/* View Receipt button */}
            <button
              onClick={() => setShowReceiptModal(true)}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #DFC8B6',
                borderRadius: '10px',
                padding: '10px 18px',
                fontSize: '13px',
                fontWeight: '700',
                color: 'var(--text-dark)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: 'var(--shadow-sm)',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#FFF8F2'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#FFFFFF'}
            >
              <FileText size={16} />
              <span>View Receipt</span>
            </button>
          </div>
        )}

        {/* MAIN TWO-COLUMN CONTENT */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.28fr) minmax(340px, 0.95fr)',
          gap: '32px',
          alignItems: 'start',
        }}>
          
          {/* LEFT: PAYMENT METHOD SELECTOR */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '18px',
            }}>
              <div>
                <div style={{
                  fontSize: '11px',
                  fontWeight: '800',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  marginBottom: '2px',
                }}>
                  STEP 2 OF 3
                </div>
                <h1 style={{ fontSize: '26px', fontWeight: '800', color: 'var(--text-dark)' }}>
                  Select Payment Method
                </h1>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '12px',
                color: 'var(--text-muted)',
                fontWeight: '600',
              }}>
                <Lock size={13} color="var(--amber-secondary)" />
                <span>256-bit Encrypted</span>
              </div>
            </div>

            {/* CARD 1: PAY ONLINE (Active) */}
            <div style={{
              backgroundColor: '#FFFFFF',
              border: paymentOption === 'online' ? '2px solid #8F3903' : '1px solid #EEDCCE',
              borderRadius: '20px',
              padding: '24px',
              marginBottom: '16px',
              boxShadow: paymentOption === 'online' ? '0 4px 16px rgba(143, 57, 3, 0.08)' : 'none',
              transition: 'all 0.2s ease',
            }}>
              {/* Header with radio */}
              <div 
                onClick={() => setPaymentOption('online')}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  marginBottom: '18px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {/* Custom Radio Dot */}
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    border: '2px solid #8F3903',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    {paymentOption === 'online' && (
                      <div style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        backgroundColor: '#8F3903',
                      }} />
                    )}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '17px', fontWeight: '800', color: 'var(--text-dark)' }}>
                      Pay Online
                    </h3>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                      Instant, contactless checkout with fraud protection
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}>
                  <CreditCard size={18} />
                  <Wifi size={16} />
                </div>
              </div>

              {/* Express One-Touch Pay */}
              <div style={{ marginBottom: '18px' }}>
                <div style={{
                  fontSize: '10.5px',
                  fontWeight: '800',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  marginBottom: '10px',
                }}>
                  EXPRESS ONE-TOUCH PAY
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <button
                    type="button"
                    onClick={handlePlaceOrder}
                    style={{
                      backgroundColor: '#1C1917',
                      color: '#FFFFFF',
                      borderRadius: '12px',
                      padding: '12px',
                      fontSize: '13.5px',
                      fontWeight: '700',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                    }}
                  >
                    <span>📱 Apple Pay</span>
                  </button>

                  <button
                    type="button"
                    onClick={handlePlaceOrder}
                    style={{
                      backgroundColor: '#FAF0E6',
                      border: '1px solid #E4D2C3',
                      color: 'var(--text-dark)',
                      borderRadius: '12px',
                      padding: '12px',
                      fontSize: '13.5px',
                      fontWeight: '700',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                    }}
                  >
                    <span style={{ fontWeight: '800' }}>G</span>
                    <span>Google Pay</span>
                  </button>
                </div>
              </div>

              {/* Divider */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                margin: '18px 0',
                fontSize: '11px',
                fontWeight: '700',
                letterSpacing: '0.06em',
                color: 'var(--text-muted)',
              }}>
                <div style={{ flex: 1, height: '1px', backgroundColor: '#EEDCCE' }} />
                <span>OR PAY WITH CARD</span>
                <div style={{ flex: 1, height: '1px', backgroundColor: '#EEDCCE' }} />
              </div>

              {/* Card Inputs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {/* Card Number */}
                <div>
                  <label className="cafe-label" style={{ fontSize: '12px' }}>Card Number</label>
                  <div style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                  }}>
                    <CreditCard
                      size={18}
                      color="var(--text-muted)"
                      style={{ position: 'absolute', left: '14px' }}
                    />
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={e => setCardNumber(e.target.value)}
                      className="cafe-input"
                      style={{
                        paddingLeft: '44px',
                        paddingRight: '60px',
                        fontWeight: '600',
                        letterSpacing: '0.03em',
                      }}
                    />
                    <span style={{
                      position: 'absolute',
                      right: '12px',
                      backgroundColor: '#9A3412',
                      color: '#FFFFFF',
                      fontSize: '10px',
                      fontWeight: '900',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      letterSpacing: '0.06em',
                    }}>
                      VISA
                    </span>
                  </div>
                </div>

                {/* Expiry & CVC */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label className="cafe-label" style={{ fontSize: '12px' }}>Expiry Date</label>
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                      <Calendar
                        size={17}
                        color="var(--text-muted)"
                        style={{ position: 'absolute', left: '14px' }}
                      />
                      <input
                        type="text"
                        value={expiryDate}
                        onChange={e => setExpiryDate(e.target.value)}
                        className="cafe-input"
                        style={{ paddingLeft: '42px', fontWeight: '600' }}
                      />
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <label className="cafe-label" style={{ fontSize: '12px', marginBottom: 0 }}>CVC / CVV</label>
                      <button
                        type="button"
                        onClick={() => setShowCvcHelp(!showCvcHelp)}
                        style={{ fontSize: '11px', color: 'var(--amber-secondary)', fontWeight: '600', textDecoration: 'underline' }}
                      >
                        What is this?
                      </button>
                    </div>
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                      <Lock
                        size={16}
                        color="var(--text-muted)"
                        style={{ position: 'absolute', left: '14px' }}
                      />
                      <input
                        type="password"
                        value={cvc}
                        onChange={e => setCvc(e.target.value)}
                        className="cafe-input"
                        style={{ paddingLeft: '42px', fontWeight: '600' }}
                      />
                    </div>
                    {showCvcHelp && (
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px', fontStyle: 'italic' }}>
                        3 digits on the back of your card.
                      </div>
                    )}
                  </div>
                </div>

                {/* Cardholder Name */}
                <div>
                  <label className="cafe-label" style={{ fontSize: '12px' }}>Cardholder Name</label>
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <User
                      size={17}
                      color="var(--text-muted)"
                      style={{ position: 'absolute', left: '14px' }}
                    />
                    <input
                      type="text"
                      value={cardholderName}
                      onChange={e => setCardholderName(e.target.value)}
                      className="cafe-input"
                      style={{ paddingLeft: '42px', fontWeight: '600' }}
                    />
                  </div>
                </div>

                {/* SSL encryption info box inside card */}
                <div style={{
                  backgroundColor: '#FFF9F3',
                  border: '1px solid #F1E2D4',
                  borderRadius: '12px',
                  padding: '12px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: '11.5px',
                  color: 'var(--text-muted)',
                  marginTop: '4px',
                }}>
                  <ShieldCheck size={16} color="var(--amber-secondary)" style={{ flexShrink: 0 }} />
                  <span>SSL 256-bit encryption safeguards your transaction. Amber &amp; Roast never stores full card details.</span>
                </div>
              </div>
            </div>

            {/* CARD 2: CASH OR TERMINAL ON DELIVERY */}
            <div 
              onClick={() => setPaymentOption('cod')}
              style={{
                backgroundColor: paymentOption === 'cod' ? '#FFF9F3' : '#FFFFFF',
                border: paymentOption === 'cod' ? '2px solid #8F3903' : '1px solid #EEDCCE',
                borderRadius: '20px',
                padding: '20px 24px',
                cursor: 'pointer',
                marginBottom: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all 0.15s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  border: '2px solid #8F3903',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  {paymentOption === 'cod' && (
                    <div style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: '#8F3903',
                    }} />
                  )}
                </div>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-dark)' }}>
                    Cash or Terminal on Delivery
                  </h3>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    Pay with physical currency or tap your card at your doorstep
                  </p>
                </div>
              </div>

              <Banknote size={20} color="var(--text-muted)" />
            </div>

            {/* PLACE ORDER PRIMARY BUTTON */}
            <button
              onClick={handlePlaceOrder}
              disabled={isProcessing}
              id="confirm-place-order-btn"
              style={{
                width: '100%',
                backgroundColor: '#9C3E04',
                background: 'linear-gradient(180deg, #B54E0A 0%, #8F3903 100%)',
                color: '#FFFFFF',
                fontSize: '16px',
                fontWeight: '700',
                padding: '16px 24px',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                boxShadow: '0 6px 20px rgba(143, 57, 3, 0.3)',
                cursor: 'pointer',
                transition: 'transform 0.15s ease, box-shadow 0.15s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1.5px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <Lock size={18} />
              <span>{isProcessing ? 'Processing Order...' : 'Place Order ($35.40)'}</span>
            </button>

            {/* Bottom guarantee bullets */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
              fontSize: '12px',
              color: 'var(--text-muted)',
              marginTop: '14px',
              flexWrap: 'wrap',
            }}>
              <span>🌱 Zero single-use plastic packaging</span>
              <span style={{ color: '#D4C3B5' }}>•</span>
              <span>☕ 30-min guaranteed heat</span>
            </div>
          </div>

          {/* RIGHT: ORDER SUMMARY (Matching exact items and numbers from screenshot!) */}
          <aside>
            <div style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #EEDCCE',
              borderRadius: '20px',
              padding: '24px',
              boxShadow: 'var(--shadow-sm)',
            }}>
              {/* Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '18px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-dark)' }}>
                    Order Summary
                  </h3>
                </div>

                <span style={{
                  backgroundColor: '#FAF0E6',
                  color: 'var(--amber-banner)',
                  fontSize: '11px',
                  fontWeight: '800',
                  padding: '3px 10px',
                  borderRadius: '9999px',
                }}>
                  3 Items
                </span>
              </div>

              {/* Delivery Address Card */}
              <div style={{
                backgroundColor: '#FFF8F2',
                border: '1px solid #F2DFD0',
                borderRadius: '14px',
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                marginBottom: '20px',
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #EBD5C2',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--amber-primary)',
                  flexShrink: 0,
                  marginTop: '2px',
                }}>
                  <MapPin size={16} />
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '13.5px', fontWeight: '800', color: 'var(--text-dark)' }}>
                      Apartment 4B (Home)
                    </span>
                    <button
                      onClick={onBackToDetails}
                      style={{
                        fontSize: '12px',
                        fontWeight: '700',
                        color: 'var(--amber-primary)',
                        textDecoration: 'underline',
                      }}
                    >
                      Edit
                    </button>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-body)', marginTop: '2px' }}>
                    782 Pinecrest Avenue, Capitol Hill
                  </div>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    Instruction: Ring bell, leave with doorman
                  </div>
                </div>
              </div>

              {/* ITEM BREAKDOWN */}
              <div style={{
                fontSize: '10.5px',
                fontWeight: '800',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                marginBottom: '14px',
              }}>
                ITEM BREAKDOWN
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '20px' }}>
                {/* Item 1 */}
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <img
                    src="https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=140&q=80"
                    alt="Amber Velvet Cappuccino"
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '10px',
                      objectFit: 'cover',
                      border: '1px solid #EEDCCE',
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13.5px', fontWeight: '800', color: 'var(--text-dark)' }}>
                      Amber Velvet Cappuccino
                    </div>
                    <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                      Oat Milk • Extra Hot • Madagascar Vanilla
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                      Qty: 1
                    </div>
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text-dark)' }}>
                    $6.75
                  </div>
                </div>

                {/* Item 2 */}
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <img
                    src="https://images.unsplash.com/photo-1530610476181-d83430b64dcd?auto=format&fit=crop&w=140&q=80"
                    alt="Toasted Almond Brioche"
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '10px',
                      objectFit: 'cover',
                      border: '1px solid #EEDCCE',
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13.5px', fontWeight: '800', color: 'var(--text-dark)' }}>
                      Toasted Almond Brioche
                    </div>
                    <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                      Warmed • Salted caramel glaze on side
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                      Qty: 1
                    </div>
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text-dark)' }}>
                    $7.50
                  </div>
                </div>

                {/* Item 3 */}
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <img
                    src="https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=140&q=80"
                    alt="Cascara Cold Brew"
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '10px',
                      objectFit: 'cover',
                      border: '1px solid #EEDCCE',
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13.5px', fontWeight: '800', color: 'var(--text-dark)' }}>
                      Cascara Cold Brew (Large)
                    </div>
                    <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                      Single Origin Ethiopia • Light Ice
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                      Qty: 2 ($7.00 ea)
                    </div>
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text-dark)' }}>
                    $14.00
                  </div>
                </div>
              </div>

              {/* Pricing breakdown matching exact numbers: $28.25, $3.50, $2.65, -$1.00, $2.00 => $35.40 */}
              <div style={{
                borderTop: '1px solid #F1E5D8',
                paddingTop: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '9px',
                fontSize: '13px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-body)' }}>
                  <span>Items Subtotal</span>
                  <span style={{ fontWeight: '600' }}>$28.25</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-body)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    Handcrafted Delivery <Info size={13} color="var(--text-muted)" />
                  </span>
                  <span style={{ fontWeight: '600' }}>$3.50</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-body)' }}>
                  <span>Local Food &amp; Beverage Tax (9.5%)</span>
                  <span style={{ fontWeight: '600' }}>$2.65</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#9C3E04' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '700' }}>
                    ☕ Barista Loyalty Perk applied
                  </span>
                  <span style={{ fontWeight: '700' }}>-$1.00</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-body)' }}>
                  <span>Courier Gratuity</span>
                  <span style={{ fontWeight: '600' }}>$2.00</span>
                </div>

                {/* Total row */}
                <div style={{
                  borderTop: '1px solid #EEDCCE',
                  paddingTop: '14px',
                  marginTop: '6px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                }}>
                  <div>
                    <span style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-dark)' }}>
                      Total Amount
                    </span>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      Inclusive of all taxes &amp; delivery fees
                    </div>
                  </div>

                  <span style={{
                    fontSize: '28px',
                    fontWeight: '800',
                    color: '#9C3E04',
                    fontFamily: 'var(--font-heading)',
                  }}>
                    $35.40
                  </span>
                </div>
              </div>
            </div>

            {/* Freshness Promise footnote */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '11.5px',
              color: 'var(--text-muted)',
              marginTop: '16px',
              padding: '0 6px',
            }}>
              <Coffee size={15} color="var(--amber-secondary)" style={{ flexShrink: 0 }} />
              <span>Amber &amp; Roast Freshness Promise: Hot drinks arrive at 155°F or we re-brew instantly.</span>
            </div>
          </aside>
        </div>

        {/* Modal for View Receipt */}
        {showReceiptModal && (
          <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 2000,
            backgroundColor: 'rgba(34, 20, 13, 0.6)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}>
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              maxWidth: '500px',
              width: '100%',
              padding: '32px',
              boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
              border: '1px solid #EEDCCE',
              animation: 'fadeIn 0.2s ease-out',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-dark)' }}>
                    Receipt #AR-8902
                  </h3>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    Amber &amp; Roast Artisanal Roastery
                  </div>
                </div>
                <button
                  onClick={() => setShowReceiptModal(false)}
                  style={{ fontSize: '18px', color: 'var(--text-muted)' }}
                >
                  <X size={20} />
                </button>
              </div>

              <div style={{
                fontSize: '13px',
                borderBottom: '1px dashed #EEDCCE',
                paddingBottom: '14px',
                marginBottom: '14px',
                lineHeight: 1.6,
              }}>
                <div><strong>Patron:</strong> Clara Montgomery</div>
                <div><strong>Delivery Address:</strong> 782 Pinecrest Avenue, Capitol Hill</div>
                <div><strong>Payment:</strong> Visa ending in 8841 (SSL Encrypted)</div>
                <div><strong>Status:</strong> Dispatched to Kitchen Hearth</div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>1× Amber Velvet Cappuccino</span>
                  <span>$6.75</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>1× Toasted Almond Brioche</span>
                  <span>$7.50</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>2× Cascara Cold Brew (Large)</span>
                  <span>$14.00</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                  <span>Delivery &amp; Tax</span>
                  <span>$6.15</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#9C3E04' }}>
                  <span>Loyalty Perk</span>
                  <span>-$1.00</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                  <span>Courier Gratuity</span>
                  <span>$2.00</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontWeight: '800',
                  fontSize: '16px',
                  borderTop: '1px solid #EEDCCE',
                  paddingTop: '8px',
                  marginTop: '4px',
                }}>
                  <span>Total Paid</span>
                  <span>$35.40</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => window.print()}
                  className="btn-secondary"
                  style={{ flex: 1, padding: '10px' }}
                >
                  <Printer size={15} />
                  <span>Print Receipt</span>
                </button>
                <button
                  onClick={() => setShowReceiptModal(false)}
                  className="btn-primary"
                  style={{ flex: 1, padding: '10px' }}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
