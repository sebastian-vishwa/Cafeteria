import { ArrowRight, ShoppingBag, Truck } from 'lucide-react';
import heroImage from '../assets/hero.png';

export const HomePage = ({ onNavigate }) => {
  return (
    <section className="jc-hero" aria-labelledby="jc-hero-title">
      <img
        className="jc-hero-image"
        src={heroImage}
        alt=""
        fetchPriority="high"
      />

      <div className="jc-hero-shade" />

      <div className="jc-wrap jc-hero-content">
        <p className="jc-eyebrow">JOSH CAFE · BUNS, GRILLS & MOJITOS</p>

        <h1 id="jc-hero-title">
          Big flavour.
          <br />
          Good company.
        </h1>

        <p className="jc-hero-description">
          Fresh buns, smoky grills & refreshing sips.
        </p>

        <button
          type="button"
          className="jc-button"
          onClick={() => onNavigate('menu')}
        >
          Browse menu
          <ArrowRight size={18} aria-hidden="true" />
        </button>

        <div className="jc-service-options">
          <span>
            <Truck size={17} aria-hidden="true" />
            Delivery
          </span>

          <span>
            <ShoppingBag size={17} aria-hidden="true" />
            Pickup
          </span>

          <span>Choose at checkout</span>
        </div>
      </div>
    </section>
  );
};