import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  Clock, 
  MapPin, 
  Mail, 
  Phone, 
  Coffee, 
  Zap, 
  ShieldCheck, 
  ArrowRight, 
  Printer, 
  Sparkles,
  Check
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CheckoutConfirmationPage = ({ onBackToMenu }) => {
  const { latestOrder, checkoutData } = useCart();
  const [activeStep, setActiveStep] = useState(2);
  const [countdownMinutes, setCountdownMinutes] = useState(28);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdownMinutes(prev => (prev > 1 ? prev - 1 : 1));
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const orderNumber = latestOrder?.orderId || 'AR-849201';
  const customerEmail = latestOrder?.checkoutData?.email || checkoutData.email;
  const customerPhone = latestOrder?.checkoutData?.phone || checkoutData.phone;
  const address = latestOrder?.checkoutData?.street || checkoutData.street;
  const city = `${latestOrder?.checkoutData?.city || checkoutData.city}, ${latestOrder?.checkoutData?.state || checkoutData.state} ${latestOrder?.checkoutData?.zip || checkoutData.zip}`;

  return (
    <div className="animate-fade-in" style={{ padding: '36px 0 70px 0' }}>
      <div className="container" style={{ maxWidth: '880px' }}>
        {/* Stepper Header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '12px',
          marginBottom: '32px',
        }}>
          {/* Step 1: Done */}
          <div style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #BBF7D0',
            borderRadius: '16px',
            padding: '12px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}>
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: '#16A34A',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
            }}>
              <Check size={14} />
            </div>
            <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-dark)' }}>
              1. Delivery Details
            </div>
          </div>

          {/* Step 2: Done */}
          <div style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #BBF7D0',
            borderRadius: '16px',
            padding: '12px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}>
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: '#16A34A',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
            }}>
              <Check size={14} />
            </div>
            <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-dark)' }}>
              2. Payment Done
            </div>
          </div>

          {/* Step 3: Active */}
          <div style={{
            backgroundColor: '#FFFFFF',
            border: '2px solid var(--amber-secondary)',
            borderRadius: '16px',
            padding: '12px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            boxShadow: '0 4px 12px rgba(194, 94, 0, 0.12)',
          }}>
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: 'var(--amber-banner)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: '800',
            }}>
              3
            </div>
            <div>
              <div style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text-dark)' }}>
                3. Live Confirmation
              </div>
            </div>
          </div>
        </div>

        {/* Celebration Hero Box */}
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #EEDCCE',
          borderRadius: '24px',
          padding: '40px 32px',
          textAlign: 'center',
          boxShadow: 'var(--shadow-md)',
          marginBottom: '28px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '6px',
            background: 'linear-gradient(90deg, #E06D10 0%, #C25E00 50%, #9C430B 100%)',
          }} />

          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: '#FAF0E6',
            color: 'var(--amber-banner)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 18px auto',
            border: '2px solid #F1E2D4',
          }}>
            <Coffee size={32} />
          </div>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: '#F0FDF4',
            color: '#166534',
            border: '1px solid #BBF7D0',
            padding: '4px 14px',
            borderRadius: '9999px',
            fontSize: '12px',
            fontWeight: '700',
            marginBottom: '12px',
          }}>
            <CheckCircle size={14} />
            <span>Order Confirmed &amp; Dispatched to Hearth</span>
          </div>

          <h1 style={{
            fontSize: '32px',
            fontWeight: '800',
            color: 'var(--text-dark)',
            marginBottom: '10px',
          }}>
            Thank You! Your Brew is Being Pulled.
          </h1>

          <p style={{
            fontSize: '14.5px',
            color: 'var(--text-body)',
            lineHeight: 1.6,
            maxWidth: '560px',
            margin: '0 auto 24px auto',
          }}>
            Your order <strong>#{orderNumber}</strong> has entered our 30-minute hot delivery queue.
            We ensure coffee leaves the portafilter hot and pastries exit the stone oven crisp.
          </p>

          {/* Email & SMS notification banners */}
          <div style={{
            backgroundColor: '#FFF9F3',
            border: '1px solid #F2DFD0',
            borderRadius: '16px',
            padding: '16px 20px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '24px',
            fontSize: '13px',
            color: 'var(--text-body)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Mail size={16} color="var(--amber-secondary)" />
              <span>Receipt &amp; Live Tracking sent to <strong>{customerEmail}</strong></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Phone size={16} color="var(--amber-secondary)" />
              <span>SMS updates sent to <strong>{customerPhone}</strong></span>
            </div>
          </div>
        </div>

        {/* Live Courier Tracking Protocol */}
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #EEDCCE',
          borderRadius: '24px',
          padding: '28px',
          boxShadow: 'var(--shadow-sm)',
          marginBottom: '28px',
        }}>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            marginBottom: '24px',
            paddingBottom: '16px',
            borderBottom: '1px solid #F1E5D8',
          }}>
            <div>
              <div style={{
                fontSize: '11px',
                fontWeight: '800',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--amber-secondary)',
                marginBottom: '2px',
              }}>
                The Artisan Live Protocol
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-dark)' }}>
                Live Delivery Tracker
              </h2>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: '#FAF0E6',
              border: '1px solid #EEDCCE',
              padding: '8px 16px',
              borderRadius: '9999px',
            }}>
              <Clock size={16} color="var(--amber-primary)" />
              <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-dark)' }}>
                Estimated Doorstep Arrival: ~{countdownMinutes} mins
              </span>
            </div>
          </div>

          {/* Stepper Timeline */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '14px',
            marginBottom: '24px',
          }}>
            {[
              { title: '1. Extraction & Bake', desc: 'Pulled fresh upon order', status: 'done' },
              { title: '2. Insulated Box', desc: '145°F thermal seal', status: 'active' },
              { title: '3. Courier En Route', desc: 'Neighborhood e-bike', status: 'next' },
              { title: '4. At Your Doorstep', desc: 'Ring bell & handoff', status: 'next' },
            ].map((step, idx) => {
              const isDone = step.status === 'done';
              const isActive = step.status === 'active';
              return (
                <div
                  key={idx}
                  style={{
                    backgroundColor: isActive ? '#FFF9F3' : '#FFFFFF',
                    border: isActive
                      ? '2px solid var(--amber-secondary)'
                      : isDone
                      ? '1px solid #BBF7D0'
                      : '1px solid #EEDCCE',
                    borderRadius: '16px',
                    padding: '16px',
                    boxShadow: isActive ? 'var(--shadow-sm)' : 'none',
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '11px',
                    fontWeight: '800',
                    color: isDone ? '#16A34A' : isActive ? 'var(--amber-banner)' : 'var(--text-muted)',
                    marginBottom: '4px',
                  }}>
                    {isDone && <Check size={14} />}
                    {isActive && <Zap size={14} fill="var(--amber-banner)" />}
                    <span>{isDone ? 'Completed' : isActive ? 'In Progress' : 'Up Next'}</span>
                  </div>
                  <div style={{ fontSize: '13.5px', fontWeight: '800', color: 'var(--text-dark)' }}>
                    {step.title}
                  </div>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {step.desc}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Courier Card & Destination */}
          <div style={{
            backgroundColor: '#FAF0E6',
            borderRadius: '16px',
            padding: '16px 20px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <img
                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&q=80"
                alt="Courier Rider"
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid #FFFFFF',
                }}
              />
              <div>
                <div style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text-dark)' }}>
                  Liam M. • Dedicated Neighborhood Courier
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  Dispatched on E-Cargo Bike #4 with thermal-vented carrying vault
                </div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '13px',
              fontWeight: '700',
              color: 'var(--text-dark)',
            }}>
              <MapPin size={16} color="var(--amber-secondary)" />
              <span>{address}, {city}</span>
            </div>
          </div>
        </div>

        {/* Buttons / Actions */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
        }}>
          <button
            onClick={() => window.print()}
            className="btn-secondary"
            style={{ padding: '12px 24px' }}
          >
            <Printer size={16} />
            <span>Print Receipt</span>
          </button>

          <button
            onClick={onBackToMenu}
            className="btn-primary"
            style={{ padding: '14px 28px', fontSize: '15px' }}
          >
            <span>Order More Fresh Provisions</span>
            <ArrowRight size={17} />
          </button>
        </div>
      </div>
    </div>
  );
};
