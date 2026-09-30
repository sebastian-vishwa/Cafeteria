import React, { useState } from 'react';
import { 
  ArrowRight, 
  Play, 
  Zap, 
  Flame, 
  Coffee, 
  Package, 
  Plus, 
  Check, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';
import { PRODUCTS, HOMEPAGE_FAVORITES } from '../data/products';
import { useCart } from '../context/CartContext';

export const HomePage = ({ onNavigate }) => {
  const { addToCart } = useCart();
  const [zipInput, setZipInput] = useState('');
  const [zipStatus, setZipStatus] = useState(null);
  const [showHowDeliveryWorks, setShowHowDeliveryWorks] = useState(false);

  const favoriteProducts = PRODUCTS.filter(p => HOMEPAGE_FAVORITES.includes(p.id));

  const handleZipCheck = (e) => {
    e.preventDefault();
    const clean = zipInput.trim().toLowerCase();
    if (!clean) {
      setZipStatus({ success: false, message: 'Please enter your street name or ZIP code.' });
      return;
    }
    
    // Simulate valid neighborhoods in Seattle / Portland
    const valid = ['97201', '98101', '98102', '98109', '98121', 'belltown', 'capitol hill', 'downtown', 'south lake union'];
    const isAvailable = valid.some(v => clean.includes(v));

    if (isAvailable || clean.length >= 3) {
      setZipStatus({
        success: true,
        message: `Great news! "${zipInput}" is inside our 30-minute hot delivery radius.`
      });
    } else {
      setZipStatus({
        success: false,
        message: `We're expanding rapidly! Currently prioritizing Downtown, Belltown & Capitol Hill.`
      });
    }
  };

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '70px' }}>
      {/* Full-Screen Hero Section */}
      <section style={{
        position: 'relative',
        minHeight: 'calc(100vh - 76px)',
        display: 'flex',
        alignItems: 'center',
        backgroundImage: `url('https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1920&q=85')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center right',
        backgroundRepeat: 'no-repeat',
        overflow: 'hidden',
      }}>
        {/* Subtle warm gradient overlay to guarantee perfect contrast and readability */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, rgba(253, 248, 243, 0.97) 0%, rgba(253, 248, 243, 0.92) 40%, rgba(253, 248, 243, 0.55) 68%, rgba(253, 248, 243, 0.15) 100%)',
          zIndex: 1,
        }} />

        {/* Content Container floating over background image on the left side */}
        <div className="container" style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          paddingTop: '40px',
          paddingBottom: '40px',
        }}>
          <div style={{ maxWidth: '600px' }}>
            {/* Eyebrow tag */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '9999px',
              backgroundColor: '#FAF0E6',
              border: '1px solid #EEDCCE',
              color: 'var(--amber-banner)',
              fontSize: '12px',
              fontWeight: '700',
              letterSpacing: '0.04em',
              marginBottom: '20px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
            }}>
              <Coffee size={14} color="var(--amber-secondary)" />
              <span>Micro-Roastery &amp; Warm Oven</span>
            </div>

            {/* Headline */}
            <h1 style={{
              fontSize: 'clamp(34px, 4.8vw, 52px)',
              fontWeight: '800',
              lineHeight: 1.15,
              color: 'var(--text-dark)',
              marginBottom: '18px',
              letterSpacing: '-0.02em',
            }}>
              Handcrafted Coffee &amp; Oven-Fresh Bakery,{' '}
              <span style={{ color: 'var(--amber-secondary)' }}>Delivered To You.</span>
            </h1>

            {/* Subtitle */}
            <p style={{
              fontSize: '16.5px',
              color: 'var(--text-body)',
              lineHeight: 1.65,
              marginBottom: '32px',
              maxWidth: '520px',
            }}>
              Artisanal roasts, golden pastries, and wholesome breakfast bowls crafted with passion.
              Fast local delivery in under 30 minutes, packaged warm and crisp.
            </p>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginBottom: '32px' }}>
              <button
                id="hero-order-now-btn"
                onClick={() => onNavigate('menu')}
                className="btn-primary"
                style={{ padding: '15px 30px', fontSize: '15px' }}
              >
                <span>View Menu &amp; Order Now</span>
                <ArrowRight size={17} />
              </button>

              <button
                onClick={() => setShowHowDeliveryWorks(true)}
                className="btn-secondary"
                style={{ padding: '15px 24px', fontSize: '15px', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
              >
                <Play size={15} fill="var(--amber-secondary)" color="var(--amber-secondary)" />
                <span>How Delivery Works</span>
              </button>
            </div>

            {/* Social proof line */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: '13.5px',
              fontWeight: '600',
              color: 'var(--text-body)',
            }}>
              <div style={{ display: 'flex', color: '#E06D10', gap: '2px' }}>
                {'★★★★★'}
              </div>
              <span style={{ fontWeight: '800', color: 'var(--text-dark)' }}>4.9</span>
              <span style={{ color: '#D4C4B7' }}>•</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#16A34A',
                  display: 'inline-block',
                  boxShadow: '0 0 0 3px rgba(22, 163, 74, 0.2)',
                }} />
                <span style={{ color: 'var(--text-muted)' }}>Roaster live: batches dispatching now</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Props Bar (4 items) */}
      <section style={{ padding: '16px 0 48px 0' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px',
          }}>
            {[
              {
                icon: <Zap size={20} color="var(--amber-accent)" />,
                title: '30-min Hot Delivery',
                desc: 'Direct from hearth to door',
              },
              {
                icon: <Flame size={20} color="var(--amber-accent)" />,
                title: 'Baked Every 2 Hours',
                desc: 'Crisp, golden layers',
              },
              {
                icon: <Coffee size={20} color="var(--amber-accent)" />,
                title: '100% Single-Origin',
                desc: 'Heirloom espresso roast',
              },
              {
                icon: <Package size={20} color="var(--amber-accent)" />,
                title: 'Thermal Eco-Packaging',
                desc: '100% compostable fiber',
              },
            ].map((prop, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#FFF8F2',
                  border: '1px solid #F4E2D2',
                  borderRadius: '16px',
                  padding: '18px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                }}
              >
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  backgroundColor: '#FDEEE0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  {prop.icon}
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-dark)' }}>
                    {prop.title}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {prop.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Artisanal Favorites Section */}
      <section style={{ padding: '36px 0 64px 0' }}>
        <div className="container">
          {/* Section Header */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '32px',
            flexWrap: 'wrap',
            gap: '16px',
          }}>
            <div>
              <div style={{
                fontSize: '11px',
                fontWeight: '800',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--amber-secondary)',
                marginBottom: '6px',
              }}>
                Signature Selections
              </div>
              <h2 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--text-dark)' }}>
                Our Artisanal Favorites
              </h2>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '4px' }}>
                Freshly roasted, pulled with intention, and paired with morning pastries straight from the stone oven.
              </p>
            </div>

            <button
              onClick={() => onNavigate('menu')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '13.5px',
                fontWeight: '700',
                color: 'var(--amber-primary)',
                transition: 'gap 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.gap = '9px'}
              onMouseLeave={e => e.currentTarget.style.gap = '6px'}
            >
              <span>Explore Full Menu</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* 4 Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px',
          }}>
            {favoriteProducts.map((product) => (
              <div
                key={product.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #EEDCCE',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                  e.currentTarget.style.borderColor = '#DFC7B4';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                  e.currentTarget.style.borderColor = '#EEDCCE';
                }}
              >
                {/* Product Image */}
                <div style={{ position: 'relative', width: '100%', height: '180px', overflow: 'hidden' }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.4s ease',
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  />
                  {/* Badge */}
                  <span style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    backgroundColor: '#A34805',
                    color: '#FFFFFF',
                    fontSize: '11px',
                    fontWeight: '700',
                    padding: '4px 10px',
                    borderRadius: '9999px',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                  }}>
                    {product.badge}
                  </span>
                </div>

                {/* Card Content */}
                <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{
                    fontSize: '17px',
                    fontWeight: '800',
                    color: 'var(--text-dark)',
                    marginBottom: '6px',
                  }}>
                    {product.name}
                  </h3>
                  <p style={{
                    fontSize: '12.5px',
                    color: 'var(--text-muted)',
                    lineHeight: 1.5,
                    marginBottom: '14px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}>
                    {product.description}
                  </p>

                  {/* Micro tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '18px' }}>
                    {product.tags.slice(0, 2).map(tag => (
                      <span
                        key={tag}
                        style={{
                          fontSize: '11px',
                          color: 'var(--text-body)',
                          backgroundColor: '#F7ECE1',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          fontWeight: '600',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Bottom Row: Price & Add Button */}
                  <div style={{
                    marginTop: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                    <span style={{
                      fontSize: '18px',
                      fontWeight: '800',
                      color: 'var(--text-dark)',
                      fontFamily: 'var(--font-heading)',
                    }}>
                      ${product.price.toFixed(2)}
                    </span>

                    <button
                      onClick={() => addToCart(product)}
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--amber-banner)',
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 3px 8px rgba(153, 59, 0, 0.3)',
                        transition: 'transform 0.15s ease',
                      }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                      title="Add to bag"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Daily Delivery Promise (The Artisan Protocol) */}
      <section style={{
        padding: '64px 0',
        backgroundColor: '#FFF9F3',
        borderTop: '1px solid #F1E5D8',
        borderBottom: '1px solid #F1E5D8',
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 48px auto' }}>
            <div style={{
              fontSize: '11px',
              fontWeight: '800',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--amber-secondary)',
              marginBottom: '8px',
            }}>
              The Artisan Protocol
            </div>
            <h2 style={{ fontSize: '32px', fontWeight: '800', color: 'var(--text-dark)', marginBottom: '12px' }}>
              The Daily Delivery Promise
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--text-body)', lineHeight: 1.6 }}>
              We treat speed and culinary integrity as equal partners. Here is how your breakfast arrives tasting exactly as it does at our counter.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
          }}>
            {[
              {
                step: '01',
                title: 'Crafted to Order',
                desc: 'No holding bins or heat lamps. Shots are pulled within 60 seconds of packaging, and pastries leave the oven straight onto wax liners.',
                badge: '⏱ Zero lag-time guarantee',
                icon: <Coffee size={20} color="var(--amber-primary)" />
              },
              {
                step: '02',
                title: 'Thermal Insulated Bag',
                desc: 'Custom breathable vents prevent pastry condensation while our double-walled thermal carriers preserve coffee temp at 145°F.',
                badge: '🍂 Moisture-balanced microclimate',
                icon: <Package size={20} color="var(--amber-primary)" />
              },
              {
                step: '03',
                title: 'Arrives Steaming Hot',
                desc: 'Our dedicated neighborhood couriers navigate directly to your doorstep in under 30 minutes, without detour drop-offs.',
                badge: '🛵 Real-time live courier tracking',
                icon: <Zap size={20} color="var(--amber-primary)" />
              },
            ].map(item => (
              <div
                key={item.step}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #EEDCCE',
                  borderRadius: '20px',
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '18px',
                }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    backgroundColor: '#FAF0E6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    {item.icon}
                  </div>
                  <span style={{
                    fontSize: '24px',
                    fontWeight: '800',
                    color: '#DFC3AD',
                    fontFamily: 'var(--font-heading)',
                  }}>
                    {item.step}
                  </span>
                </div>

                <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-dark)', marginBottom: '10px' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '13.5px', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: '20px' }}>
                  {item.desc}
                </p>

                <div style={{
                  marginTop: 'auto',
                  fontSize: '12px',
                  fontWeight: '700',
                  color: 'var(--amber-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}>
                  {item.badge}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Check Delivery Radius Bar */}
      <section style={{ padding: '52px 0 16px 0' }}>
        <div className="container">
          <div style={{
            backgroundColor: '#FAF0E6',
            border: '1px solid #EEDCCE',
            borderRadius: '20px',
            padding: '20px 24px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                backgroundColor: 'var(--amber-banner)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <MapPin size={22} />
              </div>
              <div>
                <div style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-dark)' }}>
                  Check your delivery radius
                </div>
                <div style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>
                  Serving Downtown, Belltown, Capitol Hill, &amp; South Lake Union
                </div>
              </div>
            </div>

            <form
              onSubmit={handleZipCheck}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                flex: '1',
                maxWidth: '460px',
              }}
            >
              <input
                type="text"
                value={zipInput}
                onChange={e => setZipInput(e.target.value)}
                placeholder="Enter your ZIP or street (e.g. 98101)"
                style={{
                  flex: 1,
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #DFC7B4',
                  borderRadius: '9999px',
                  padding: '11px 18px',
                  fontSize: '13.5px',
                  color: 'var(--text-dark)',
                }}
              />
              <button
                type="submit"
                style={{
                  backgroundColor: 'var(--amber-banner)',
                  color: '#FFFFFF',
                  fontWeight: '700',
                  fontSize: '13.5px',
                  padding: '11px 22px',
                  borderRadius: '9999px',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 2px 8px rgba(153, 59, 0, 0.25)',
                }}
              >
                Check
              </button>
            </form>
          </div>

          {zipStatus && (
            <div style={{
              marginTop: '12px',
              padding: '12px 18px',
              borderRadius: '12px',
              fontSize: '13px',
              fontWeight: '600',
              backgroundColor: zipStatus.success ? '#F0FDF4' : '#FEF2F2',
              border: `1px solid ${zipStatus.success ? '#BBF7D0' : '#FECACA'}`,
              color: zipStatus.success ? '#166534' : '#991B1B',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              {zipStatus.success ? <Check size={16} /> : <ShieldCheck size={16} />}
              <span>{zipStatus.message}</span>
            </div>
          )}
        </div>
      </section>

      {/* How Delivery Works Modal */}
      {showHowDeliveryWorks && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1000,
          backgroundColor: 'rgba(34, 20, 13, 0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
        }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            maxWidth: '540px',
            width: '100%',
            padding: '32px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
            border: '1px solid #EEDCCE',
            animation: 'fadeIn 0.2s ease-out',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Zap size={20} color="var(--amber-primary)" />
                <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-dark)' }}>
                  How Artisan Delivery Works
                </h3>
              </div>
              <button
                onClick={() => setShowHowDeliveryWorks(false)}
                style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-muted)' }}
              >
                ✕
              </button>
            </div>
            <p style={{ fontSize: '14px', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: '20px' }}>
              From hearth to doorstep within 30 minutes. Here is our step-by-step dispatch workflow:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#FEEEDD', color: 'var(--amber-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '13px', flexShrink: 0 }}>1</div>
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: '700' }}>Immediate Order Dispatch</h4>
                  <p style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>Baristas receive your ticket digitally and initiate extraction immediately.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#FEEEDD', color: 'var(--amber-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '13px', flexShrink: 0 }}>2</div>
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: '700' }}>Thermal Vault Packaging</h4>
                  <p style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>Beverages are sealed at 145°F and pastries are placed in vented wax sleeves.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#FEEEDD', color: 'var(--amber-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '13px', flexShrink: 0 }}>3</div>
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: '700' }}>Direct Neighborhood Courier</h4>
                  <p style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>Dedicated neighborhood riders bike directly to your doorstep with zero multi-stop delays.</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                setShowHowDeliveryWorks(false);
                onNavigate('menu');
              }}
              className="btn-primary"
              style={{ width: '100%', padding: '12px' }}
            >
              Order Warm Coffee Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
