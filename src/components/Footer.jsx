import { Coffee } from 'lucide-react';

export const Footer = ({ onNavigate }) => {
  return (
    <footer className="jc-footer">
      <div className="jc-wrap">
        <div className="jc-footer-top">
          <div>
            <div className="jc-brand">
              <span>Josh<span className="jc-brand-accent">cafe</span></span>
              <Coffee size={25} aria-hidden="true" />
            </div>
            <p>Fresh buns, smoky grills & refreshing sips.</p>
          </div>

          <div>
            <h3>Made for your cravings</h3>
            <p>Browse the menu and build your order.</p>
            <button
              type="button"
              className="jc-footer-link"
              onClick={() => onNavigate('menu')}
            >
              Explore the menu →
            </button>
          </div>
        </div>

        <div className="jc-footer-bottom">
          © {new Date().getFullYear()} Josh Cafe. All rights reserved.
        </div>
      </div>
    </footer>
  );
};