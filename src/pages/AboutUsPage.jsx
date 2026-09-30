import React, { useState } from 'react';
import { 
  Sparkles, 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  ArrowRight, 
  Star, 
  CheckCircle, 
  Coffee, 
  Flame, 
  Wheat, 
  Leaf, 
  Truck 
} from 'lucide-react';

export const AboutUsPage = ({ onNavigate }) => {
  const [inquiryType, setInquiryType] = useState('personal');
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactSent, setContactSent] = useState(false);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email) return;
    setContactSent(true);
    setTimeout(() => {
      setContactSent(false);
      setContactForm({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '70px' }}>
      {/* 1. Origin & Craft Story */}
      <section style={{
        padding: '54px 0 64px 0',
        backgroundColor: '#FFFBF7',
        borderBottom: '1px solid #F1E5D8',
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '48px',
            alignItems: 'center',
          }}>
            {/* Story Text */}
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '9999px',
                backgroundColor: '#FAF0E6',
                border: '1px solid #EEDCCE',
                color: 'var(--amber-banner)',
                fontSize: '11.5px',
                fontWeight: '700',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '18px',
              }}>
                🪵 Our Origin &amp; Craft
              </div>

              <h1 style={{
                fontSize: 'clamp(32px, 4vw, 44px)',
                fontWeight: '800',
                color: 'var(--text-dark)',
                lineHeight: 1.18,
                marginBottom: '20px',
              }}>
                From Our Hearth to Your Home
              </h1>

              <p style={{
                fontSize: '14.5px',
                color: 'var(--text-body)',
                lineHeight: 1.7,
                marginBottom: '16px',
              }}>
                Founded in 2018 by two lifelong roasters and pastry cooks, Amber &amp; Roast was born from a singular conviction: morning rituals deserve uncompromised sanctuary warmth. What began as a micro-batch garage roaster and wood-fired oven has blossomed into a cherished neighborhood culinary institution.
              </p>

              <p style={{
                fontSize: '14.5px',
                color: 'var(--text-body)',
                lineHeight: 1.7,
                marginBottom: '26px',
              }}>
                We partner directly with small-holder coffee farms across the globe and mill our heirloom grains daily. Every morning at 4:30 AM, our bakers hand-laminate French butter brioches while our master roasting team tests profiles on our 1968 cast-iron drum. We don't just brew coffee — we craft sensory pauses in a fast-paced world, delivered warm to your table within minutes.
              </p>

              {/* Quote Card */}
              <div style={{
                backgroundColor: '#FAF0E6',
                borderLeft: '4px solid var(--amber-secondary)',
                borderRadius: '0 14px 14px 0',
                padding: '18px 22px',
                fontStyle: 'italic',
                fontSize: '13.5px',
                color: 'var(--text-dark)',
                lineHeight: 1.6,
              }}>
                "Specialty coffee and hearth baking aren't luxuries — they're essential daily anchors. We deliver both with unmatched soul and reverence."
                <div style={{
                  fontStyle: 'normal',
                  fontSize: '12px',
                  fontWeight: '700',
                  color: 'var(--amber-banner)',
                  marginTop: '8px',
                }}>
                  — Claire Vance &amp; Miles Reed, Co-Founders &amp; Master Artisans
                </div>
              </div>
            </div>

            {/* Photo & Badge */}
            <div style={{ position: 'relative' }}>
              <div style={{
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(62, 33, 16, 0.12)',
                border: '1px solid #EEDCCE',
                aspectRatio: '4/3',
              }}>
                <img
                  src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1000&q=80"
                  alt="Our Roastery & Bakery Hearth"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Floating Badge */}
              <div style={{
                position: 'absolute',
                bottom: '-20px',
                right: '20px',
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                padding: '14px 20px',
                boxShadow: '0 10px 28px rgba(34, 20, 13, 0.18)',
                border: '1px solid #F1E5D8',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  backgroundColor: '#FAF0E6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Coffee size={20} color="var(--amber-primary)" />
                </div>
                <div>
                  <div style={{ fontSize: '10.5px', fontWeight: '800', letterSpacing: '0.06em', color: 'var(--text-muted)' }}>
                    EST. 2018 • PACIFIC NORTHWEST
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text-dark)' }}>
                    1,400+ Cups Freshly Crafted Daily
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Artisan Standards (3 Pillars) */}
      <section style={{ padding: '64px 0 48px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 40px auto' }}>
            <div style={{
              fontSize: '11px',
              fontWeight: '800',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--amber-secondary)',
              marginBottom: '6px',
            }}>
              The Pillars We Stand By
            </div>
            <h2 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--text-dark)' }}>
              Artisan Standards, Uncompromising Care
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            marginBottom: '40px',
          }}>
            {[
              {
                icon: <Coffee size={20} color="var(--amber-secondary)" />,
                title: 'Single Origin Direct-Trade',
                desc: 'We circumvent opaque broker chains to pay 40% above fair-trade floor prices directly to regenerative farms in Huila, Yirgacheffe, and Antigua.',
                link: 'Full source transparency ➔'
              },
              {
                icon: <Wheat size={20} color="var(--amber-secondary)" />,
                title: 'Slow-Ferment Sourdough',
                desc: '48-hour cold fermentation with organic stone-ground flours. Easy on digestion, caramelised crisp crust, and heavenly soft pillowy brioche interiors.',
                link: 'Batch recovery 72 hours ➔'
              },
              {
                icon: <Leaf size={20} color="var(--amber-secondary)" />,
                title: 'Zero-Waste Delivery',
                desc: 'Thermal insulated boxing avoids ice packs, keeping hot drinks steamy and pastries oven-crisp. Returnable glass jars and electric cargo e-bike fleet.',
                link: '100% compostable fiber ➔'
              },
            ].map((pillar, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #EEDCCE',
                  borderRadius: '20px',
                  padding: '28px',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
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
                  backgroundColor: '#FAF0E6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '18px',
                }}>
                  {pillar.icon}
                </div>

                <h3 style={{ fontSize: '17px', fontWeight: '800', color: 'var(--text-dark)', marginBottom: '10px' }}>
                  {pillar.title}
                </h3>
                <p style={{ fontSize: '13.5px', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: '20px' }}>
                  {pillar.desc}
                </p>

                <div style={{
                  marginTop: 'auto',
                  fontSize: '12px',
                  fontWeight: '700',
                  color: 'var(--amber-secondary)',
                  cursor: 'pointer',
                }}>
                  {pillar.link}
                </div>
              </div>
            ))}
          </div>

          {/* Guarantee Banner */}
          <div style={{
            backgroundColor: '#7A3508',
            borderRadius: '18px',
            padding: '20px 28px',
            color: '#FFFFFF',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px',
            boxShadow: '0 8px 24px rgba(122, 53, 8, 0.25)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Flame size={22} color="#FDEEE0" />
              </div>
              <div>
                <div style={{
                  fontSize: '11px',
                  fontWeight: '800',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#FCD34D',
                }}>
                  The Amber Guarantee
                </div>
                <div style={{ fontSize: '16px', fontWeight: '800', marginTop: '2px' }}>
                  Never More Than 7 Days Off The Roaster
                </div>
                <div style={{ fontSize: '12.5px', color: '#FDEEE0', marginTop: '2px' }}>
                  We pull espresso from beans directly in peak off-gas and serve at peak degassing rest.
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '24px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '20px', fontWeight: '800', fontFamily: 'var(--font-heading)' }}>198°F</div>
                <div style={{ fontSize: '11px', color: '#FCD34D', fontWeight: '600' }}>Brew Temp</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '20px', fontWeight: '800', fontFamily: 'var(--font-heading)' }}>30 min</div>
                <div style={{ fontSize: '11px', color: '#FCD34D', fontWeight: '600' }}>Avg Delivery</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Visit Our Sanctuary or Send a Note */}
      <section style={{ padding: '48px 0', backgroundColor: '#FFF9F3', borderTop: '1px solid #F1E5D8' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 40px auto' }}>
            <div style={{
              fontSize: '11px',
              fontWeight: '800',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--amber-secondary)',
              marginBottom: '6px',
            }}>
              Come Say Hello
            </div>
            <h2 style={{ fontSize: '30px', fontWeight: '800', color: 'var(--text-dark)', marginBottom: '8px' }}>
              Visit Our Sanctuary or Send a Note
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--text-body)' }}>
              Whether you are dropping in for a pour-over or ordering catering for your morning team meeting, we are always eager to connect.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '28px',
          }}>
            {/* Sanctuary Details & Map Card */}
            <div style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #EEDCCE',
              borderRadius: '20px',
              padding: '24px',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              flexDirection: 'column',
            }}>
              <div style={{
                position: 'relative',
                borderRadius: '16px',
                overflow: 'hidden',
                height: '180px',
                backgroundColor: '#DCE8EC',
                marginBottom: '20px',
                border: '1px solid #C8DAE2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {/* Styled Map Graphic Mockup */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  opacity: 0.75,
                  backgroundImage: 'radial-gradient(#B8D1DC 1.5px, transparent 1.5px), radial-gradient(#B8D1DC 1.5px, #DCE8EC 1.5px)',
                  backgroundSize: '20px 20px',
                  backgroundPosition: '0 0, 10px 10px',
                }} />
                {/* Roads and contours */}
                <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
                  <path d="M-20 60 Q 150 40, 240 100 T 500 120" stroke="#FFFFFF" strokeWidth="12" fill="none" opacity="0.8" />
                  <path d="M120 -10 L 140 220" stroke="#FFFFFF" strokeWidth="8" fill="none" opacity="0.8" />
                  <path d="M260 -10 L 250 220" stroke="#FDE2C8" strokeWidth="6" fill="none" opacity="0.8" />
                  <circle cx="210" cy="85" r="28" fill="rgba(194, 94, 0, 0.15)" />
                </svg>

                {/* Pin with label */}
                <div style={{
                  position: 'relative',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '9999px',
                  padding: '6px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.18)',
                  border: '1px solid var(--amber-secondary)',
                }}>
                  <MapPin size={16} color="var(--amber-secondary)" fill="var(--amber-secondary)" />
                  <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--text-dark)' }}>
                    442 Amber Hearth Lane, Suite 100
                  </span>
                </div>

                <div style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  backgroundColor: 'rgba(255,255,255,0.95)',
                  borderRadius: '6px',
                  padding: '3px 8px',
                  fontSize: '10px',
                  fontWeight: '700',
                  color: '#15803D',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#15803D' }} />
                  Open Today
                </div>
              </div>

              {/* Contact info grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
                fontSize: '12.5px',
                marginBottom: '20px',
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '700', color: 'var(--text-dark)' }}>
                    <Clock size={14} color="var(--amber-secondary)" />
                    Hours
                  </div>
                  <div style={{ color: 'var(--text-body)', marginTop: '2px' }}>
                    Daily 7:00 AM – 8:00 PM<br/>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Kitchen closes 7:30 PM</span>
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '700', color: 'var(--text-dark)' }}>
                    <Truck size={14} color="var(--amber-secondary)" />
                    Delivery Radius
                  </div>
                  <div style={{ color: 'var(--text-body)', marginTop: '2px' }}>
                    Full 6-Mile Radius<br/>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Direct courier dispatch</span>
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '700', color: 'var(--text-dark)' }}>
                    <Phone size={14} color="var(--amber-secondary)" />
                    Phone
                  </div>
                  <div style={{ color: 'var(--text-body)', marginTop: '2px' }}>(206) 555-0182</div>
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '700', color: 'var(--text-dark)' }}>
                    <Mail size={14} color="var(--amber-secondary)" />
                    Inquiries
                  </div>
                  <div style={{ color: 'var(--text-body)', marginTop: '2px' }}>hello@amberandroast.com</div>
                </div>
              </div>

              <div style={{
                marginTop: 'auto',
                paddingTop: '14px',
                borderTop: '1px solid #F1E5D8',
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '12px',
                fontWeight: '600',
                color: 'var(--amber-primary)',
              }}>
                <span>Walking directions from commute work?</span>
                <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>View Seattle Field Guide ➔</span>
              </div>
            </div>

            {/* Note to Roasters Form */}
            <div style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #EEDCCE',
              borderRadius: '20px',
              padding: '28px',
              boxShadow: 'var(--shadow-sm)',
            }}>
              <div style={{
                fontSize: '11px',
                fontWeight: '800',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--amber-secondary)',
                marginBottom: '4px',
              }}>
                Drop a Message &amp; Catering
              </div>
              <h3 style={{ fontSize: '19px', fontWeight: '800', color: 'var(--text-dark)', marginBottom: '8px' }}>
                Send a Note to Our Roasters
              </h3>
              <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginBottom: '18px' }}>
                Have questions about roasting origins, our bean supply, or fresh bakery orders? We respond within one to two hours.
              </p>

              {contactSent ? (
                <div style={{
                  backgroundColor: '#F0FDF4',
                  border: '1px solid #BBF7D0',
                  borderRadius: '14px',
                  padding: '24px',
                  textAlign: 'center',
                  color: '#166534',
                }}>
                  <CheckCircle size={36} color="#16A34A" style={{ margin: '0 auto 8px auto' }} />
                  <h4 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '4px' }}>
                    Note Received by Hearth Team!
                  </h4>
                  <p style={{ fontSize: '13px' }}>
                    We've assigned your note to Head Barista Claire. A reply is heading to your inbox shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label className="cafe-label" style={{ fontSize: '12px' }}>Your Name</label>
                      <input
                        type="text"
                        required
                        value={contactForm.name}
                        onChange={e => setContactForm({ ...contactForm, name: e.target.value })}
                        placeholder="Elena Rossi"
                        className="cafe-input"
                        style={{ padding: '9px 12px', fontSize: '13px' }}
                      />
                    </div>
                    <div>
                      <label className="cafe-label" style={{ fontSize: '12px' }}>Email Address</label>
                      <input
                        type="email"
                        required
                        value={contactForm.email}
                        onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
                        placeholder="elena@example.com"
                        className="cafe-input"
                        style={{ padding: '9px 12px', fontSize: '13px' }}
                      />
                    </div>
                  </div>

                  {/* Inquiry Type buttons */}
                  <div>
                    <label className="cafe-label" style={{ fontSize: '12px' }}>Inquiry Type</label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                      {[
                        { id: 'personal', label: 'Personal Note' },
                        { id: 'catering', label: 'Catering Box' },
                        { id: 'wholesale', label: 'Bulk Wholesale' },
                      ].map(type => {
                        const isSel = inquiryType === type.id;
                        return (
                          <button
                            type="button"
                            key={type.id}
                            onClick={() => setInquiryType(type.id)}
                            style={{
                              padding: '8px 4px',
                              borderRadius: '8px',
                              fontSize: '11.5px',
                              fontWeight: '700',
                              backgroundColor: isSel ? 'var(--amber-banner)' : '#FAF0E6',
                              color: isSel ? '#FFFFFF' : 'var(--text-dark)',
                              border: isSel ? '1px solid var(--amber-banner)' : '1px solid #EEDCCE',
                              transition: 'all 0.15s ease',
                            }}
                          >
                            {type.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="cafe-label" style={{ fontSize: '12px' }}>How can we help?</label>
                    <textarea
                      rows={3}
                      required
                      value={contactForm.message}
                      onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="Tell us about your event date, coffee preferences, or custom request..."
                      className="cafe-input"
                      style={{ padding: '10px 12px', fontSize: '13px', resize: 'vertical' }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary"
                    style={{ width: '100%', padding: '12px', fontSize: '14px', marginTop: '4px' }}
                  >
                    <span>Send Note to Roastery</span>
                    <ArrowRight size={15} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Customer Reviews Section */}
      <section style={{ padding: '64px 0 48px 0' }}>
        <div className="container">
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
                marginBottom: '4px',
              }}>
                ★ Community Reverence
              </div>
              <h2 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--text-dark)' }}>
                Loved by Local Coffee Lovers
              </h2>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', fontWeight: '700' }}>
              <div style={{ display: 'flex', color: '#E06D10' }}>★★★★★</div>
              <span style={{ color: 'var(--text-dark)' }}>4.9 / 5.0</span>
              <span style={{ color: 'var(--text-muted)', fontWeight: '500' }}>(1,400+ Verified Orders)</span>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
          }}>
            {[
              {
                stars: 5,
                role: 'Verified Patron',
                name: 'Elena R.',
                title: 'Architect & Daily Regular',
                avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80',
                review: '"I work cozy hours as an architect and order from Amber & Roast at least 4 mornings a week. The cardamom brioche arrives genuinely steaming warm as if pulled directly from their oven rack. And the flat white micro-foam is pristine even after delivery!"'
              },
              {
                stars: 5,
                role: 'Food Critic',
                name: 'Marcus K.',
                title: 'Metropolitan Food Critic',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80',
                review: '"Most roasteries excel in either espresso or pastry — rarely both. Amber & Roast is the rare anomaly. Their natural processed Ethiopian single-origin displays vibrant Jasmine and peach notes, while their 48-hour sourdough croissant has unmatched honeycomb lamination."'
              },
              {
                stars: 5,
                role: 'Verified Patron',
                name: 'Sophie T.',
                title: 'Weekend Brunch Enthusiast',
                avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=160&q=80',
                review: '"Their lightning-fast insulated carrier box is pure genius. Sunday brunches at home feel elevated to a 5-star hotel terrace. Not a drop spilled, and the oat milk honey latte arrives completely intact. Amber & Roast has permanently won our weekend routine!"'
              },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #EEDCCE',
                  borderRadius: '20px',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '14px',
                }}>
                  <div style={{ display: 'flex', color: '#E06D10', gap: '2px', fontSize: '13px' }}>
                    {'★'.repeat(item.stars)}
                  </div>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: '700',
                    color: '#9C430B',
                    backgroundColor: '#FAF0E6',
                    padding: '3px 8px',
                    borderRadius: '9999px',
                  }}>
                    {item.role}
                  </span>
                </div>

                <p style={{
                  fontSize: '13.5px',
                  color: 'var(--text-body)',
                  lineHeight: 1.65,
                  marginBottom: '20px',
                  fontStyle: 'italic',
                  flex: 1,
                }}>
                  {item.review}
                </p>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  paddingTop: '14px',
                  borderTop: '1px solid #F1E5D8',
                }}>
                  <img
                    src={item.avatar}
                    alt={item.name}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '1px solid #EEDCCE',
                    }}
                  />
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text-dark)' }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                      {item.title}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Bottom Call-to-Action Banner */}
      <section style={{ padding: '0 0 20px 0' }}>
        <div className="container">
          <div style={{
            backgroundColor: '#8F3903',
            borderRadius: '24px',
            padding: '40px',
            color: '#FFFFFF',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px',
            boxShadow: '0 12px 32px rgba(143, 57, 3, 0.3)',
          }}>
            <div style={{ maxWidth: '540px' }}>
              <h2 style={{ fontSize: '26px', fontWeight: '800', color: '#FFFFFF', marginBottom: '8px' }}>
                Craving a freshly pulled brew right now?
              </h2>
              <p style={{ fontSize: '14px', color: '#FDEEE0', lineHeight: 1.6 }}>
                Experience our 30-minute neighborhood doorstep delivery or visit our sunny hearth on Amber Wood Lane.
              </p>
            </div>

            <button
              onClick={() => onNavigate('menu')}
              style={{
                backgroundColor: '#FFFFFF',
                color: '#8F3903',
                fontWeight: '700',
                fontSize: '14.5px',
                padding: '14px 26px',
                borderRadius: '9999px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(0,0,0,0.18)',
                transition: 'transform 0.15s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <Coffee size={16} />
              <span>Explore Menu &amp; Order</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
