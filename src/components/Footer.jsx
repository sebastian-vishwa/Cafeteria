import React from 'react';
import { Zap, Clock, MapPin, Phone } from 'lucide-react';

export const Footer = ({ onNavigate }) => {
  return (
    <footer style={{ marginTop: 'auto', backgroundColor: '#F9F2EB', borderTop: '1px solid #EEDCCE' }}>
      {/* Rust Announcement Strip */}
      <div className="amber-alert-strip">
        <Zap size={15} fill="#FFFFFF" color="#FFFFFF" />
        <span>Delivered hot &amp; fresh to your doorstep in 30 mins</span>
      </div>

      <div className="container" style={{ padding: '56px 24px 36px 24px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '36px',
          marginBottom: '48px',
        }}>
          {/* Column 1: Brand */}
          <div>
            <h3 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '20px',
              fontWeight: '800',
              color: 'var(--amber-primary)',
              marginBottom: '12px',
            }}>
              Amber &amp; Roast
            </h3>
            <p style={{
              fontSize: '13.5px',
              color: 'var(--text-body)',
              lineHeight: 1.65,
              maxWidth: '280px',
            }}>
              Crafting unhurried moments through precision roasting, heirloom beans, and artisanal pastry pairings.
            </p>
          </div>

          {/* Column 2: Hours */}
          <div>
            <h4 style={{
              fontSize: '15px',
              fontWeight: '700',
              color: 'var(--text-dark)',
              marginBottom: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}>
              Operating Hours
            </h4>
            <div style={{ fontSize: '13.5px', color: 'var(--text-body)', lineHeight: 1.6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '600' }}>
                <Clock size={14} color="var(--amber-secondary)" />
                <span>Mon – Sun</span>
              </div>
              <div style={{ marginLeft: '20px', color: 'var(--text-muted)' }}>7:00 AM – 8:00 PM</div>
              <div style={{ marginTop: '8px', fontSize: '12.5px', color: 'var(--text-muted)' }}>
                Kitchen closes at 7:30 PM daily
              </div>
            </div>
          </div>

          {/* Column 3: Location */}
          <div>
            <h4 style={{
              fontSize: '15px',
              fontWeight: '700',
              color: 'var(--text-dark)',
              marginBottom: '14px',
            }}>
              Our Sanctuary
            </h4>
            <div style={{ fontSize: '13.5px', color: 'var(--text-body)', lineHeight: 1.6 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
                <MapPin size={16} color="var(--amber-secondary)" style={{ flexShrink: 0, marginTop: '3px' }} />
                <span>442 Amber Hearth Lane, Suite 100<br/>Roasters District, Seattle, WA 98101</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={14} color="var(--amber-secondary)" />
                <span>(206) 555-0182</span>
              </div>
            </div>
          </div>

          {/* Column 4: Quick Links */}
          <div>
            <h4 style={{
              fontSize: '15px',
              fontWeight: '700',
              color: 'var(--text-dark)',
              marginBottom: '14px',
            }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '13.5px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>
                <button 
                  onClick={() => onNavigate && onNavigate('menu')} 
                  style={{ color: 'var(--text-body)', transition: 'color 0.2s ease' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--amber-primary)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-body)'}
                >
                  Seasonal Blends
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate && onNavigate('menu')} 
                  style={{ color: 'var(--text-body)', transition: 'color 0.2s ease' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--amber-primary)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-body)'}
                >
                  Artisanal Pastries
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate && onNavigate('about')} 
                  style={{ color: 'var(--text-body)', transition: 'color 0.2s ease' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--amber-primary)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-body)'}
                >
                  Brew Guides
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate && onNavigate('about')} 
                  style={{ color: 'var(--text-body)', transition: 'color 0.2s ease' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--amber-primary)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-body)'}
                >
                  Catering &amp; Events
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid #EEDCCE',
          paddingTop: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          fontSize: '12.5px',
          color: 'var(--text-muted)',
        }}>
          <div>© 2025 Amber &amp; Roast Cafe Co. All rights reserved.</div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--amber-primary)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>Privacy Policy</span>
            <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--amber-primary)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>Terms of Service</span>
            <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--amber-primary)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
