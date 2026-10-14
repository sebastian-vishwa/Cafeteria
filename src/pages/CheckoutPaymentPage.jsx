import { useRef, useState } from 'react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';

import {
  CheckoutSteps,
  EmptyCheckout,
  getCheckoutTotals,
  OrderSummary,
  validateCheckout,
} from '../components/CheckoutShared';

export const CheckoutPaymentPage = ({
  onBackToDetails,
  onOrderSuccess,
}) => {
  const {
    cart,
    checkoutData,
    setPaymentData,
    setLatestOrder,
    clearCart,
  } = useCart();

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const submissionLock = useRef(false);

  const isDelivery = checkoutData.fulfillment === 'delivery';
  const totals = getCheckoutTotals(cart, checkoutData.fulfillment);
  const detailsValid =
    Object.keys(validateCheckout(checkoutData)).length === 0;

  const createDemoOrder = () => {
    if (submissionLock.current) return;

    if (!detailsValid || cart.length === 0) {
      setError('Check your order and customer details before continuing.');
      return;
    }

    submissionLock.current = true;
    setSubmitting(true);
    setError('');

    const order = {
      orderId: `DEMO-${Date.now().toString(36).toUpperCase()}`,
      createdAt: new Date().toISOString(),
      isDemo: true,
      status: 'demo',
      paymentMethod: 'cash',
      paymentStatus: 'unpaid',
      fulfillment: checkoutData.fulfillment,
      checkoutData: {
        fullName: checkoutData.fullName.trim(),
        phone: checkoutData.phone,
        street: isDelivery ? checkoutData.street.trim() : '',
        city: isDelivery ? checkoutData.city.trim() : '',
        instructions: checkoutData.instructions.trim(),
      },
      items: cart.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      ...totals,
    };

    setPaymentData((previous) => ({
      ...previous,
      method: 'cod',
    }));

    setLatestOrder(order);
    clearCart();
    onOrderSuccess();
  };

  if (cart.length === 0) {
    return <EmptyCheckout onReturn={onBackToDetails} />;
  }

  return (
    <div className="jc-wrap jc-checkout">
      <CheckoutSteps current={2} />

      <div className="jc-checkout-title">
        <h1>Review your order</h1>
        <p>Check your details and payment choice.</p>
      </div>

      <p className="jc-demo-notice">
        This is a frontend demo. No payment is collected and no order is
        sent to the shop.
      </p>

      <div className="jc-checkout-grid">
        <div className="jc-checkout-card">
          <div className="jc-summary-heading">
            <h2>{isDelivery ? 'Delivery details' : 'Pickup details'}</h2>
            <button
              type="button"
              className="jc-text-button"
              onClick={onBackToDetails}
            >
              Edit details
            </button>
          </div>

          <div className="jc-customer-details">
            <strong>{checkoutData.fullName}</strong>
            <p>{checkoutData.phone}</p>

            {isDelivery && (
              <p>
                {checkoutData.street}
                <br />
                {checkoutData.city}
              </p>
            )}

            {checkoutData.instructions && (
              <p>Note: {checkoutData.instructions}</p>
            )}
          </div>

          <fieldset className="jc-choice-group">
            <legend>Payment method</legend>

            <label className="jc-choice is-selected">
              <input
                type="radio"
                name="payment"
                value="cash"
                checked
                readOnly
              />
              <span>
                <strong>
                  {isDelivery ? 'Cash on delivery' : 'Cash at pickup'}
                </strong>
                <small>
                  {isDelivery
                    ? 'Pay when you receive your food.'
                    : 'Pay at the cafe when collecting your food.'}
                </small>
              </span>
            </label>

            <label className="jc-choice jc-choice-disabled">
              <input type="radio" name="payment" disabled />
              <span>
                <strong>Pay online</strong>
                <small>Unavailable — payment gateway not connected.</small>
              </span>
            </label>
          </fieldset>

          {!detailsValid && (
            <p className="jc-field-error" role="alert">
              Some details are missing or invalid. Select Edit details.
            </p>
          )}

          {error && (
            <p className="jc-field-error" role="alert">{error}</p>
          )}

          <button
            type="button"
            className="jc-button jc-checkout-submit"
            disabled={submitting || !detailsValid}
            onClick={createDemoOrder}
          >
            {submitting
              ? 'Creating demo…'
              : `Create demo order · ${formatPrice(totals.total)}`}
          </button>

          <button
            type="button"
            className="jc-text-button jc-checkout-back"
            onClick={onBackToDetails}
          >
            ← Back to details
          </button>
        </div>

        <OrderSummary
          cart={cart}
          fulfillment={checkoutData.fulfillment}
        />
      </div>
    </div>
  );
};