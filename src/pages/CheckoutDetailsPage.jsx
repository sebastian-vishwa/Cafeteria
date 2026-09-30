import React, { useState } from 'react';
import { 
  Lock, 
  ArrowRight, 
  Clock, 
  MapPin, 
  User, 
  ShieldCheck, 
  Check, 
  Zap, 
  Tag, 
  Calendar,
  Sparkles
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CheckoutDetailsPage = ({ onContinueToPayment, onModifyCart }) => {
  const {
    cart,
    itemsCount,
    itemsSubtotal,
    isFreeDelivery,
    deliveryFee,
    estimatedTax,
    tipRate,
    setTipRate,
    customTipAmount,
    setCustomTipAmount,
    tipAmount,
    totalDue,
    promoCode,
    setPromoCode,
    discountAmount,
    promoError,
    promoSuccess,
    applyPromo,
    checkoutData,
    setCheckoutData,
  } = useCart();

  const [formErrors, setFormErrors] = useState({});
  const [promoInput, setPromoInput] = useState(promoCode);
  const [isCustomTipOpen, setIsCustomTipOpen] = useState(false);
  const [customInputVal, setCustomInputVal] = useState('');

  const tipOptions = [
    { label: '10%', rate: 0.10 },
    { label: '15%', rate: 0.15 },
    { label: '20%', rate: 0.20 },
  ];

  const handleInputChange = (field, value) => {
    setCheckoutData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateAndProceed = (e) => {
    e.preventDefault();
    const errors = {};
    if (!checkoutData.fullName.trim()) errors.fullName = 'Please enter your full name';
    if (!checkoutData.email.trim() || !checkoutData.email.includes('@')) errors.email = 'Please provide a valid email';
    if (!checkoutData.phone.trim()) errors.phone = 'Please provide your phone number';
    if (!checkoutData.street.trim()) errors.street = 'Street address is required';
    if (!checkoutData.city.trim()) errors.city = 'City is required';
    if (!checkoutData.zip.trim()) errors.zip = 'ZIP code is required';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    onContinueToPayment();
  };

  return (
    <div className="animate-fade-in" style={{ padding: '36px 0 70px 0' }}>
      <div className="container">
        {/* Stepper Header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '12px',
          marginBottom: '32px',
        }}>
          {/* Step 1: Active */}
          <div style={{
            backgroundColor: '#FFFFFF',
            border: '2px solid var(--amber-secondary)',
            borderRadius: '16px',
            padding: '12px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: '0 4px 12px rgba(194, 94, 0, 0.12)',
          }}>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: 'var(--amber-banner)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '800',
              fontSize: '13px',
            }}>
              1
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text-dark)' }}>
                Delivery Details
              </div>
              <div style={{ fontSize: '11px', color: 'var(--amber-secondary)', fontWeight: '700' }}>
                In Progress
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #EEDCCE',
            borderRadius: '16px',
            padding: '12px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            opacity: 0.7,
          }}>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: '#FAF0E6',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '800',
              fontSize: '13px',
            }}>
              2
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-dark)' }}>
                Payment
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                Cards, Apple Pay, COD
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #EEDCCE',
            borderRadius: '16px',
            padding: '12px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            opacity: 0.7,
          }}>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: '#FAF0E6',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '800',
              fontSize: '13px',
            }}>
              3
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-dark)' }}>
                Confirmation
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                Live Barista &amp; Courier Tracking
              </div>
            </div>
          </div>
        </div>

        {/* Title & Badge */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: '16px',
          marginBottom: '28px',
        }}>
          <div>
            <div style={{
              fontSize: '11px',
              fontWeight: '800',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--amber-secondary)',
              marginBottom: '4px',
            }}>
              Express Artisan Checkout
            </div>
            <h1 style={{ fontSize: '30px', fontWeight: '800', color: 'var(--text-dark)' }}>
              Complete Your Fresh Order
            </h1>
          </div>

          <div style={{
            backgroundColor: '#FAF0E6',
            border: '1px solid #EEDCCE',
            borderRadius: '9999px',
            padding: '8px 16px',
            fontSize: '12px',
            fontWeight: '700',
            color: 'var(--amber-primary)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}>
            <span>☕ Packed fresh upon rider arrival</span>
          </div>
        </div>

        {/* Main Two-Column Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.25fr) minmax(320px, 0.9fr)',
          gap: '32px',
          alignItems: 'start',
        }}>
          {/* LEFT: FORM SECTIONS */}
          <form onSubmit={validateAndProceed} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* 1. Contact & Delivery Information */}
            <div style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #EEDCCE',
              borderRadius: '20px',
              padding: '28px',
              boxShadow: 'var(--shadow-sm)',
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '20px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '10px',
                  backgroundColor: '#FAF0E6',
                  color: 'var(--amber-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: '2px',
                }}>
                  <User size={18} />
                </div>
                <div>
                  <h2 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-dark)' }}>
                    1. Contact &amp; Delivery Information
                  </h2>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    Instant guest checkout — no login or password required.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label className="cafe-label">Full Name *</label>
                  <input
                    type="text"
                    value={checkoutData.fullName}
                    onChange={e => handleInputChange('fullName', e.target.value)}
                    placeholder="Clara Montgomery"
                    className="cafe-input"
                    style={{ borderColor: formErrors.fullName ? '#DC2626' : undefined }}
                  />
                  {formErrors.fullName && (
                    <div style={{ fontSize: '11px', color: '#DC2626', marginTop: '4px' }}>
                      {formErrors.fullName}
                    </div>
                  )}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label className="cafe-label">Email Address *</label>
                    <input
                      type="email"
                      value={checkoutData.email}
                      onChange={e => handleInputChange('email', e.target.value)}
                      placeholder="clara.m@example.com"
                      className="cafe-input"
                      style={{ borderColor: formErrors.email ? '#DC2626' : undefined }}
                    />
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
                      For digital receipt &amp; live roasted bean tracking.
                    </div>
                    {formErrors.email && (
                      <div style={{ fontSize: '11px', color: '#DC2626', marginTop: '4px' }}>
                        {formErrors.email}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="cafe-label">Phone Number *</label>
                    <input
                      type="tel"
                      value={checkoutData.phone}
                      onChange={e => handleInputChange('phone', e.target.value)}
                      placeholder="+1(555) 349-8201"
                      className="cafe-input"
                      style={{ borderColor: formErrors.phone ? '#DC2626' : undefined }}
                    />
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
                      For delivery courier SMS updates.
                    </div>
                    {formErrors.phone && (
                      <div style={{ fontSize: '11px', color: '#DC2626', marginTop: '4px' }}>
                        {formErrors.phone}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Delivery Location */}
            <div style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #EEDCCE',
              borderRadius: '20px',
              padding: '28px',
              boxShadow: 'var(--shadow-sm)',
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '20px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '10px',
                  backgroundColor: '#FAF0E6',
                  color: 'var(--amber-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: '2px',
                }}>
                  <MapPin size={18} />
                </div>
                <div>
                  <h2 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-dark)' }}>
                    Delivery Location
                  </h2>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    We ensure hot coffee arrives inside insulated thermals.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label className="cafe-label">Street Address &amp; Apt / Suite *</label>
                  <input
                    type="text"
                    value={checkoutData.street}
                    onChange={e => handleInputChange('street', e.target.value)}
                    placeholder="742 Evergreen Terrace, Apt 4B"
                    className="cafe-input"
                    style={{ borderColor: formErrors.street ? '#DC2626' : undefined }}
                  />
                  {formErrors.street && (
                    <div style={{ fontSize: '11px', color: '#DC2626', marginTop: '4px' }}>
                      {formErrors.street}
                    </div>
                  )}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 0.8fr 1fr', gap: '12px' }}>
                  <div>
                    <label className="cafe-label">City *</label>
                    <input
                      type="text"
                      value={checkoutData.city}
                      onChange={e => handleInputChange('city', e.target.value)}
                      placeholder="Portland"
                      className="cafe-input"
                      style={{ borderColor: formErrors.city ? '#DC2626' : undefined }}
                    />
                  </div>
                  <div>
                    <label className="cafe-label">State *</label>
                    <input
                      type="text"
                      value={checkoutData.state}
                      onChange={e => handleInputChange('state', e.target.value)}
                      placeholder="OR"
                      className="cafe-input"
                    />
                  </div>
                  <div>
                    <label className="cafe-label">ZIP Code *</label>
                    <input
                      type="text"
                      value={checkoutData.zip}
                      onChange={e => handleInputChange('zip', e.target.value)}
                      placeholder="97201"
                      className="cafe-input"
                      style={{ borderColor: formErrors.zip ? '#DC2626' : undefined }}
                    />
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label className="cafe-label">Courier Delivery Instructions</label>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Optional</span>
                  </div>
                  <input
                    type="text"
                    value={checkoutData.instructions}
                    onChange={e => handleInputChange('instructions', e.target.value)}
                    placeholder="Gate code #4012, please do not ring doorbell."
                    className="cafe-input"
                  />
                </div>
              </div>
            </div>

            {/* 3. Delivery Window */}
            <div style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #EEDCCE',
              borderRadius: '20px',
              padding: '28px',
              boxShadow: 'var(--shadow-sm)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div>
                  <h2 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-dark)' }}>
                    Delivery Window
                  </h2>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    Prepared to temperature when dispatched.
                  </p>
                </div>
                <Clock size={18} color="var(--amber-secondary)" />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                {/* ASAP Delivery option */}
                <div
                  onClick={() => handleInputChange('deliveryWindow', 'asap')}
                  style={{
                    border: checkoutData.deliveryWindow === 'asap'
                      ? '2px solid var(--amber-secondary)'
                      : '1px solid #EEDCCE',
                    backgroundColor: checkoutData.deliveryWindow === 'asap' ? '#FFF9F3' : '#FFFFFF',
                    borderRadius: '16px',
                    padding: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    position: 'relative',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{
                      fontSize: '12px',
                      fontWeight: '700',
                      color: 'var(--amber-banner)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}>
                      <Zap size={13} fill="var(--amber-banner)" />
                      ASAP Delivery
                    </span>
                    <input
                      type="radio"
                      checked={checkoutData.deliveryWindow === 'asap'}
                      onChange={() => handleInputChange('deliveryWindow', 'asap')}
                      style={{ accentColor: 'var(--amber-banner)' }}
                    />
                  </div>
                  <div style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-dark)', marginTop: '4px' }}>
                    25–35 min
                  </div>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Barista pulls shots right as rider arrives.
                  </div>
                </div>

                {/* Schedule Later */}
                <div
                  onClick={() => handleInputChange('deliveryWindow', 'scheduled')}
                  style={{
                    border: checkoutData.deliveryWindow === 'scheduled'
                      ? '2px solid var(--amber-secondary)'
                      : '1px solid #EEDCCE',
                    backgroundColor: checkoutData.deliveryWindow === 'scheduled' ? '#FFF9F3' : '#FFFFFF',
                    borderRadius: '16px',
                    padding: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{
                      fontSize: '12px',
                      fontWeight: '700',
                      color: 'var(--text-dark)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}>
                      <Calendar size={13} />
                      Schedule Later
                    </span>
                    <input
                      type="radio"
                      checked={checkoutData.deliveryWindow === 'scheduled'}
                      onChange={() => handleInputChange('deliveryWindow', 'scheduled')}
                      style={{ accentColor: 'var(--amber-banner)' }}
                    />
                  </div>
                  <div style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-dark)', marginTop: '4px' }}>
                    Pick Time
                  </div>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Reserve warm pastries for afternoon meetings.
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Proceed Button */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              paddingTop: '8px',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '12.5px',
                color: 'var(--text-muted)',
              }}>
                <Lock size={15} color="var(--amber-secondary)" />
                <span>256-bit Encrypted Checkout</span>
              </div>

              <button
                type="submit"
                id="continue-to-payment-btn"
                className="btn-primary"
                style={{ padding: '15px 32px', fontSize: '15px' }}
              >
                <span>Continue to Payment Method</span>
                <ArrowRight size={17} />
              </button>
            </div>
          </form>

          {/* RIGHT: YOUR BAG & PRICE SUMMARY */}
          <aside style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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
                paddingBottom: '14px',
                borderBottom: '1px solid #F1E5D8',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h3 style={{ fontSize: '17px', fontWeight: '800', color: 'var(--text-dark)' }}>
                    Your Bag
                  </h3>
                  <span style={{
                    backgroundColor: '#FAF0E6',
                    color: 'var(--amber-banner)',
                    fontSize: '11px',
                    fontWeight: '800',
                    padding: '2px 8px',
                    borderRadius: '9999px',
                  }}>
                    {itemsCount} items
                  </span>
                </div>

                <button
                  onClick={onModifyCart}
                  style={{
                    fontSize: '12.5px',
                    fontWeight: '700',
                    color: 'var(--amber-primary)',
                    textDecoration: 'underline',
                  }}
                >
                  Modify Cart
                </button>
              </div>

              {/* Items List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '22px' }}>
                {cart.map(item => (
                  <div key={item.id} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <div style={{ position: 'relative' }}>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: '52px',
                          height: '52px',
                          borderRadius: '10px',
                          objectFit: 'cover',
                          border: '1px solid #EEDCCE',
                        }}
                      />
                      <span style={{
                        position: 'absolute',
                        bottom: '-4px',
                        right: '-4px',
                        backgroundColor: 'var(--amber-banner)',
                        color: '#FFFFFF',
                        fontSize: '10px',
                        fontWeight: '800',
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        {item.quantity}×
                      </span>
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontSize: '13.5px',
                        fontWeight: '700',
                        color: 'var(--text-dark)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}>
                        {item.name}
                      </div>
                      <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                        {item.customNote || item.customizationNote}
                      </div>
                    </div>

                    <div style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text-dark)' }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Code Input */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{
                  display: 'flex',
                  gap: '8px',
                }}>
                  <div style={{ position: 'relative', flex: 1 }}>
                    <Tag size={14} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                      type="text"
                      value={promoInput}
                      onChange={e => setPromoInput(e.target.value)}
                      placeholder="Promo code or gift voucher"
                      style={{
                        width: '100%',
                        backgroundColor: '#FCF5EE',
                        border: '1px solid #EEDCCE',
                        borderRadius: '10px',
                        padding: '9px 12px 9px 34px',
                        fontSize: '12.5px',
                        color: 'var(--text-dark)',
                      }}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => applyPromo(promoInput)}
                    style={{
                      backgroundColor: '#FAF0E6',
                      border: '1px solid #DFC7B4',
                      borderRadius: '10px',
                      padding: '9px 16px',
                      fontSize: '12.5px',
                      fontWeight: '700',
                      color: 'var(--amber-banner)',
                    }}
                  >
                    Apply
                  </button>
                </div>

                {promoError && (
                  <div style={{ fontSize: '11px', color: '#DC2626', marginTop: '4px' }}>
                    {promoError}
                  </div>
                )}
                {promoSuccess && (
                  <div style={{ fontSize: '11px', color: '#16A34A', marginTop: '4px', fontWeight: '600' }}>
                    {promoSuccess}
                  </div>
                )}
              </div>

              {/* Pricing breakdown */}
              <div style={{
                borderTop: '1px solid #F1E5D8',
                paddingTop: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                fontSize: '13px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-body)' }}>
                  <span>Items Subtotal</span>
                  <span style={{ fontWeight: '600' }}>${itemsSubtotal.toFixed(2)}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-body)' }}>
                  <span>Direct Courier Courier</span>
                  <span style={{ fontWeight: '600', color: isFreeDelivery ? '#15803D' : 'inherit' }}>
                    {isFreeDelivery ? 'FREE' : `$${deliveryFee.toFixed(2)}`}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-body)' }}>
                  <span>Estimated Sales Tax</span>
                  <span style={{ fontWeight: '600' }}>${estimatedTax.toFixed(2)}</span>
                </div>

                {discountAmount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#16A34A' }}>
                    <span>Voucher Discount</span>
                    <span style={{ fontWeight: '700' }}>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                {/* Tip selector row */}
                <div style={{
                  padding: '10px 0',
                  borderTop: '1px dashed #EEDCCE',
                  borderBottom: '1px dashed #EEDCCE',
                  margin: '4px 0',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontWeight: '600', color: 'var(--text-dark)' }}>
                      Barista &amp; Rider Tip ({customTipAmount !== null ? 'Custom' : `${(tipRate * 100).toFixed(0)}%`})
                    </span>
                    <span style={{ fontWeight: '700', color: 'var(--amber-banner)' }}>
                      ${tipAmount.toFixed(2)}
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
                    {tipOptions.map(opt => {
                      const isSel = customTipAmount === null && tipRate === opt.rate;
                      return (
                        <button
                          type="button"
                          key={opt.label}
                          onClick={() => {
                            setCustomTipAmount(null);
                            setTipRate(opt.rate);
                          }}
                          style={{
                            padding: '6px 2px',
                            borderRadius: '8px',
                            fontSize: '11.5px',
                            fontWeight: '700',
                            backgroundColor: isSel ? 'var(--amber-banner)' : '#FAF0E6',
                            color: isSel ? '#FFFFFF' : 'var(--text-dark)',
                            border: isSel ? '1px solid var(--amber-banner)' : '1px solid #EEDCCE',
                          }}
                        >
                          {opt.label}
                        </button>
                      );
                    })}

                    <button
                      type="button"
                      onClick={() => setIsCustomTipOpen(!isCustomTipOpen)}
                      style={{
                        padding: '6px 2px',
                        borderRadius: '8px',
                        fontSize: '11.5px',
                        fontWeight: '700',
                        backgroundColor: customTipAmount !== null ? 'var(--amber-banner)' : '#FAF0E6',
                        color: customTipAmount !== null ? '#FFFFFF' : 'var(--text-dark)',
                        border: '1px solid #EEDCCE',
                      }}
                    >
                      Custom
                    </button>
                  </div>

                  {isCustomTipOpen && (
                    <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
                      <input
                        type="number"
                        step="0.5"
                        placeholder="Tip $ (e.g. 5.00)"
                        value={customInputVal}
                        onChange={e => setCustomInputVal(e.target.value)}
                        className="cafe-input"
                        style={{ padding: '6px 10px', fontSize: '12px' }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const val = parseFloat(customInputVal);
                          if (!isNaN(val) && val >= 0) {
                            setCustomTipAmount(val);
                            setIsCustomTipOpen(false);
                          }
                        }}
                        className="btn-primary"
                        style={{ padding: '6px 14px', fontSize: '12px' }}
                      >
                        Set
                      </button>
                    </div>
                  )}
                </div>

                {/* Total */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  paddingTop: '6px',
                }}>
                  <div>
                    <span style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-dark)' }}>
                      Total Due
                    </span>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Includes all taxes and tips</div>
                  </div>
                  <span style={{
                    fontSize: '26px',
                    fontWeight: '800',
                    color: 'var(--amber-banner)',
                    fontFamily: 'var(--font-heading)',
                  }}>
                    ${totalDue.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Freshness Guarantee Card */}
            <div style={{
              backgroundColor: '#FFF9F3',
              border: '1px solid #F2DFD0',
              borderRadius: '20px',
              padding: '20px',
              fontSize: '12px',
              color: 'var(--text-body)',
              lineHeight: 1.55,
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: '700',
                color: 'var(--amber-primary)',
                marginBottom: '6px',
              }}>
                <ShieldCheck size={16} />
                <span>Amber &amp; Roast Freshness Guarantee</span>
              </div>
              <p style={{ marginBottom: '10px' }}>
                If your coffee isn't piping hot or your brioche arrives flattened, contact our barista within 15 minutes for an instant refund or fresh remake.
              </p>
              <div style={{
                fontSize: '11px',
                fontWeight: '700',
                color: 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}>
                <span>🌱 100% Compostable Cups &amp; Plant-Fiber Bags</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
