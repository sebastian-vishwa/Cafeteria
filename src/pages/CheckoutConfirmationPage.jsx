import { CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';
import { CheckoutSteps } from '../components/CheckoutShared';

export const CheckoutConfirmationPage = ({ onBackToMenu }) => {
  const { latestOrder } = useCart();

  if (!latestOrder) {
    return (
      <div className="jc-wrap jc-checkout">
        <div className="jc-checkout-card">
          <h1>No demo order to display</h1>
          <p className="jc-checkout-muted">
            The demo receipt is kept only for this page session.
          </p>
          <button
            type="button"
            className="jc-button"
            onClick={onBackToMenu}
          >
            Back to menu
          </button>
        </div>
      </div>
    );
  }

  const order = latestOrder;
  const isDelivery = order.fulfillment === 'delivery';

  return (
    <div className="jc-wrap jc-checkout">
      <CheckoutSteps current={3} />

      <div className="jc-confirmation jc-checkout-card">
        <CheckCircle
          size={52}
          className="jc-confirmation-icon"
          aria-hidden="true"
        />

        <h1>Demo order created</h1>

        <p className="jc-checkout-muted">
          Thanks, {order.checkoutData.fullName}. Your checkout preview
          is complete.
        </p>

        <p className="jc-demo-notice">
          This order was not sent to Josh Cafe. No payment was taken,
          and no preparation or delivery has started.
        </p>

        <dl className="jc-receipt-details">
          <div>
            <dt>Demo reference</dt>
            <dd>{order.orderId}</dd>
          </div>

          <div>
            <dt>Order type</dt>
            <dd>{isDelivery ? 'Delivery' : 'Pickup'}</dd>
          </div>

          <div>
            <dt>Payment</dt>
            <dd>
              Unpaid · {isDelivery ? 'Cash on delivery' : 'Cash at pickup'}
            </dd>
          </div>

          <div>
            <dt>Mobile</dt>
            <dd>{order.checkoutData.phone}</dd>
          </div>

          {isDelivery && (
            <div>
              <dt>Delivery address</dt>
              <dd>
                {order.checkoutData.street}, {order.checkoutData.city}
              </dd>
            </div>
          )}

          {order.checkoutData.instructions && (
            <div>
              <dt>Note</dt>
              <dd>{order.checkoutData.instructions}</dd>
            </div>
          )}
        </dl>

        <ul className="jc-summary-items">
          {order.items.map((item) => (
            <li key={item.id}>
              <span>{item.quantity} × {item.name}</span>
              <strong>{formatPrice(item.price * item.quantity)}</strong>
            </li>
          ))}
        </ul>

        <div className="jc-summary-line">
          <span>Items subtotal</span>
          <span>{formatPrice(order.subtotal)}</span>
        </div>

        <div className="jc-summary-line">
          <span>{isDelivery ? 'Delivery · demo fee' : 'Pickup'}</span>
          <span>{formatPrice(order.deliveryFee)}</span>
        </div>

        <div className="jc-summary-line jc-summary-total">
          <strong>Demo total</strong>
          <strong>{formatPrice(order.total)}</strong>
        </div>

        <button
          type="button"
          className="jc-button jc-checkout-submit"
          onClick={onBackToMenu}
        >
          Back to menu
        </button>
      </div>
    </div>
  );
};