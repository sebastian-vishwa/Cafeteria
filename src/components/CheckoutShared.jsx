import { formatPrice } from '../data/products';

// Prototype value only. Replace with a server-generated delivery quote later.
const DEMO_DELIVERY_FEE = 250;

export function getCheckoutTotals(cart, fulfillment) {
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const deliveryFee =
    cart.length > 0 && fulfillment === 'delivery'
      ? DEMO_DELIVERY_FEE
      : 0;

  return {
    subtotal,
    deliveryFee,
    total: subtotal + deliveryFee,
  };
}

export function validateCheckout(data) {
  const errors = {};
  const phone = (data.phone || '').replace(/[\s()-]/g, '');

  if (!(data.fullName || '').trim()) {
    errors.fullName = 'Enter your name.';
  }

  if (!/^(?:07\d{8}|\+947\d{8})$/.test(phone)) {
    errors.phone = 'Use 0771234567 or +94771234567.';
  }

  if (!['pickup', 'delivery'].includes(data.fulfillment)) {
    errors.fulfillment = 'Choose delivery or pickup.';
  }

  if (data.fulfillment === 'delivery') {
    if (!(data.street || '').trim()) {
      errors.street = 'Enter your delivery address.';
    }

    if (!(data.city || '').trim()) {
      errors.city = 'Enter your town or area.';
    }
  }

  return errors;
}

export function CheckoutSteps({ current }) {
  return (
    <ol className="jc-checkout-steps" aria-label="Checkout progress">
      {['Your details', 'Review & payment', 'Demo confirmation'].map(
        (label, index) => (
          <li
            key={label}
            className={current === index + 1 ? 'is-current' : ''}
            aria-current={current === index + 1 ? 'step' : undefined}
          >
            <span>{index + 1}</span>
            {label}
          </li>
        )
      )}
    </ol>
  );
}

export function OrderSummary({ cart, fulfillment, onEdit }) {
  const totals = getCheckoutTotals(cart, fulfillment);

  return (
    <aside className="jc-checkout-card jc-order-summary">
      <div className="jc-summary-heading">
        <h2>Your order</h2>

        {onEdit && (
          <button type="button" className="jc-text-button" onClick={onEdit}>
            Edit order
          </button>
        )}
      </div>

      <ul className="jc-summary-items">
        {cart.map((item) => (
          <li key={item.id}>
            <span>{item.quantity} × {item.name}</span>
            <strong>{formatPrice(item.price * item.quantity)}</strong>
          </li>
        ))}
      </ul>

      <div className="jc-summary-line">
        <span>Items subtotal</span>
        <span>{formatPrice(totals.subtotal)}</span>
      </div>

      <div className="jc-summary-line">
        <span>
          {fulfillment === 'delivery' ? 'Delivery · demo fee' : 'Pickup'}
        </span>
        <span>{formatPrice(totals.deliveryFee)}</span>
      </div>

      <div className="jc-summary-line jc-summary-total">
        <strong>Demo total</strong>
        <strong>{formatPrice(totals.total)}</strong>
      </div>

      {fulfillment === 'delivery' && (
        <p className="jc-checkout-muted">
          LKR 250 is a sample fee. Delivery availability and actual pricing
          are not checked in this prototype.
        </p>
      )}
    </aside>
  );
}

export function EmptyCheckout({ onReturn }) {
  return (
    <div className="jc-wrap jc-checkout">
      <div className="jc-checkout-card">
        <h1>Your order is empty</h1>
        <p className="jc-checkout-muted">
          Add items from the menu before continuing.
        </p>
        <button type="button" className="jc-button" onClick={onReturn}>
          {onReturn ? 'Go back' : 'Browse menu'}
        </button>
      </div>
    </div>
  );
}