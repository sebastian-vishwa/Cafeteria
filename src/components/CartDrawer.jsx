import React from 'react';
import { X, Trash2, Plus, Minus, Truck, FileText, Heart, ArrowRight, Zap } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer = ({ onNavigateToCheckout }) => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    itemsSubtotal,
    FREE_DELIVERY_THRESHOLD,
    isFreeDelivery,
    deliveryGoalRemaining,
    deliveryInstructions,
    setDeliveryInstructions,
    tipRate,
    setTipRate,
    tipAmount,
    totalDue,
  } = useCart();

  if (!isCartOpen) return null;

  const tipOptions = [
    { label: '15%', rate: 0.15 },
    { label: '18%', rate: 0.18 },
    { label: '20%', rate: 0.20 },
  ];

  const progressPercent = Math.min(100, Math.round((itemsSubtotal / FREE_DELIVERY_THRESHOLD) * 100));

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    onNavigateToCheckout();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 999,
      display: 'flex',
      justifyContent: 'flex-end',
    }}>
      {/* Blurred Backdrop */}
      <div 
        onClick={() => setIsCartOpen(false)}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(34, 20, 13, 0.45)',
          backdropFilter: 'blur(3px)',
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Drawer Panel */}
      <div 
        className="animate-slide-in"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '460px',
          height: '100%',
          backgroundColor: '#FFFDF9',
          boxShadow: '-8px 0 32px rgba(34, 20, 13, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 1000,
          overflow: 'hidden',
        }}
      >
        {/* Drawer Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid #F1E5D8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#FFFBF6',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: '#FEEEDD',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Zap size={16} color="var(--amber-accent)" fill="var(--amber-accent)" />
            </div>
            <h2 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-dark)' }}>
              Your Artisan Bag
            </h2>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            style={{
              padding: '6px',
              borderRadius: '50%',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#F5ECE3'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}>
          {/* Free Delivery Goal Bar */}
          <div style={{
            backgroundColor: '#FFF7F0',
            border: '1px solid #F6DFCE',
            borderRadius: '16px',
            padding: '16px 18px',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '10px',
              fontSize: '13px',
              fontWeight: '700',
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-dark)' }}>
                <Truck size={16} color="var(--amber-primary)" />
                Free Delivery Goal
              </span>
              <span style={{ color: isFreeDelivery ? '#15803D' : 'var(--amber-secondary)' }}>
                {isFreeDelivery 
                  ? '🎉 Free Delivery Unlocked!' 
                  : `Add $${deliveryGoalRemaining.toFixed(2)} more for Free Delivery!`}
              </span>
            </div>

            {/* Progress bar line */}
            <div style={{
              height: '7px',
              width: '100%',
              backgroundColor: '#EED9C7',
              borderRadius: '9999px',
              overflow: 'hidden',
              marginBottom: '8px',
            }}>
              <div style={{
                height: '100%',
                width: `${progressPercent}%`,
                background: 'linear-gradient(90deg, #E06D10 0%, #9C430B 100%)',
                borderRadius: '9999px',
                transition: 'width 0.4s ease',
              }} />
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '11px',
              color: 'var(--text-muted)',
              fontWeight: '600',
            }}>
              <span>Current: ${itemsSubtotal.toFixed(2)}</span>
              <span>Target: ${FREE_DELIVERY_THRESHOLD.toFixed(2)}</span>
            </div>
          </div>

          {/* Cart Items List */}
          {cart.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '48px 0',
              color: 'var(--text-muted)',
            }}>
              <div style={{ fontSize: '42px', marginBottom: '12px' }}>☕</div>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-dark)', marginBottom: '6px' }}>
                Your bag is empty
              </h3>
              <p style={{ fontSize: '13px' }}>Explore our fresh oven pastries and heirloom brews.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {cart.map((item) => (
                <div
                  key={item.id}
                  style={{
                    backgroundColor: '#FFF8F2',
                    border: '1px solid #F2DFD0',
                    borderRadius: '16px',
                    padding: '14px',
                    display: 'flex',
                    gap: '14px',
                    position: 'relative',
                    transition: 'transform 0.15s ease',
                  }}
                >
                  {/* Thumbnail */}
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: '74px',
                      height: '74px',
                      borderRadius: '12px',
                      objectFit: 'cover',
                      border: '1px solid #EBD5C2',
                      flexShrink: 0,
                    }}
                  />

                  {/* Item Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingRight: '16px' }}>
                      <h4 style={{
                        fontSize: '14.5px',
                        fontWeight: '700',
                        color: 'var(--text-dark)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}>
                        {item.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px',
                          color: 'var(--text-muted)',
                          padding: '4px',
                          transition: 'color 0.15s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.color = '#DC2626'}
                        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                        title="Remove item"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <p style={{
                      fontSize: '12px',
                      color: 'var(--text-muted)',
                      marginTop: '2px',
                      marginBottom: '10px',
                    }}>
                      {item.customNote || item.customizationNote}
                    </p>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                      {/* Quantity Stepper */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #E3D1C2',
                        borderRadius: '9999px',
                        padding: '2px 8px',
                      }}>
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          style={{
                            padding: '3px',
                            display: 'flex',
                            color: 'var(--text-dark)',
                          }}
                        >
                          <Minus size={13} />
                        </button>
                        <span style={{
                          fontSize: '13px',
                          fontWeight: '700',
                          minWidth: '16px',
                          textAlign: 'center',
                          color: 'var(--text-dark)',
                        }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          style={{
                            padding: '3px',
                            display: 'flex',
                            color: 'var(--text-dark)',
                          }}
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      {/* Price */}
                      <div style={{ textAlign: 'right' }}>
                        <div style={{
                          fontSize: '14.5px',
                          fontWeight: '800',
                          color: 'var(--text-dark)',
                        }}>
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                        {item.quantity > 1 && (
                          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                            (${item.price.toFixed(2)} ea)
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Delivery Instructions for Courier */}
          <div style={{
            backgroundColor: '#FFF8F2',
            border: '1px solid #F2DFD0',
            borderRadius: '16px',
            padding: '14px 16px',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12.5px',
              fontWeight: '700',
              color: 'var(--text-dark)',
              marginBottom: '8px',
            }}>
              <FileText size={15} color="var(--amber-secondary)" />
              Delivery Instructions for Courier
            </div>
            <input
              type="text"
              value={deliveryInstructions}
              onChange={(e) => setDeliveryInstructions(e.target.value)}
              placeholder="e.g. Leave at front porch, ring bell, gate code #401"
              style={{
                width: '100%',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E7D5C5',
                borderRadius: '10px',
                padding: '9px 12px',
                fontSize: '12.5px',
                color: 'var(--text-dark)',
              }}
            />
          </div>

          {/* Support Roastery Crew Tip */}
          <div style={{
            backgroundColor: '#FFF8F2',
            border: '1px solid #F2DFD0',
            borderRadius: '16px',
            padding: '14px 16px',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '10px',
              fontSize: '12.5px',
              fontWeight: '700',
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-dark)' }}>
                <Heart size={15} color="var(--amber-accent)" fill="var(--amber-accent)" />
                Support Roastery Crew Tip
              </span>
              <span style={{ color: 'var(--amber-primary)', fontWeight: '800' }}>
                ${tipAmount.toFixed(2)} ({(tipRate * 100).toFixed(0)}%)
              </span>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '8px',
            }}>
              {tipOptions.map((opt) => {
                const isSelected = tipRate === opt.rate;
                const optDollar = (itemsSubtotal * opt.rate).toFixed(2);
                return (
                  <button
                    key={opt.label}
                    onClick={() => setTipRate(opt.rate)}
                    style={{
                      padding: '8px 4px',
                      borderRadius: '10px',
                      fontSize: '12px',
                      fontWeight: '700',
                      textAlign: 'center',
                      backgroundColor: isSelected ? 'var(--amber-banner)' : '#FFFFFF',
                      color: isSelected ? '#FFFFFF' : 'var(--text-dark)',
                      border: isSelected ? '1px solid var(--amber-banner)' : '1px solid #E7D5C5',
                      boxShadow: isSelected ? '0 2px 6px rgba(153, 59, 0, 0.25)' : 'none',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <div>{opt.label}</div>
                    <div style={{
                      fontSize: '11px',
                      fontWeight: '600',
                      opacity: isSelected ? 0.9 : 0.7,
                      marginTop: '2px',
                    }}>
                      ${optDollar}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Drawer Footer with Subtotal & Buy Now */}
        <div style={{
          padding: '20px 24px',
          borderTop: '1px solid #F1E5D8',
          backgroundColor: '#FFFBF6',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
          }}>
            <div>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Estimated Total</span>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                {isFreeDelivery ? 'Free Delivery included' : '+$2.50 Courier fee'}
              </div>
            </div>
            <div style={{
              fontSize: '22px',
              fontWeight: '800',
              color: 'var(--text-dark)',
              fontFamily: 'var(--font-heading)',
            }}>
              ${totalDue.toFixed(2)}
            </div>
          </div>

          <button
            onClick={handleCheckoutClick}
            disabled={cart.length === 0}
            className="btn-primary"
            style={{
              width: '100%',
              padding: '14px',
              fontSize: '15px',
              opacity: cart.length === 0 ? 0.6 : 1,
              cursor: cart.length === 0 ? 'not-allowed' : 'pointer',
            }}
          >
            <span>Proceed to Checkout</span>
            <ArrowRight size={17} />
          </button>
        </div>
      </div>
    </div>
  );
};
