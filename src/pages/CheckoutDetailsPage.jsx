import { useRef, useState } from 'react';
import { useCart } from '../context/CartContext';

import {
  CheckoutSteps,
  EmptyCheckout,
  OrderSummary,
  validateCheckout,
} from '../components/CheckoutShared';

export const CheckoutDetailsPage = ({
  onContinueToPayment,
  onModifyCart,
}) => {
  const { cart, checkoutData, setCheckoutData } = useCart();
  const [errors, setErrors] = useState({});
  const formRef = useRef(null);

  const isDelivery = checkoutData.fulfillment === 'delivery';

  const updateField = (field, value) => {
    setCheckoutData((previous) => ({
      ...previous,
      [field]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [field]: '',
    }));
  };

  const changeFulfillment = (value) => {
    updateField('fulfillment', value);
    setErrors({});
  };

  const submit = (event) => {
    event.preventDefault();

    const nextErrors = validateCheckout(checkoutData);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      const firstField = Object.keys(nextErrors)[0];
      formRef.current
        ?.querySelector(`[name="${firstField}"]`)
        ?.focus();
      return;
    }

    if (cart.length === 0) return;

    setCheckoutData((previous) => ({
      ...previous,
      fullName: previous.fullName.trim(),
      phone: previous.phone.replace(/[\s()-]/g, ''),
      street: previous.street.trim(),
      city: previous.city.trim(),
      instructions: previous.instructions.trim(),
    }));

    onContinueToPayment();
  };

  if (cart.length === 0) {
    return <EmptyCheckout onReturn={onModifyCart} />;
  }

  const fields = [
    {
      name: 'fullName',
      label: 'Your name',
      autoComplete: 'name',
      placeholder: 'Enter your name',
    },
    {
      name: 'phone',
      label: 'Mobile number',
      type: 'tel',
      autoComplete: 'tel',
      placeholder: '0771234567',
    },
    ...(isDelivery
      ? [
          {
            name: 'street',
            label: 'Delivery address',
            autoComplete: 'street-address',
            placeholder: 'House number and street',
          },
          {
            name: 'city',
            label: 'Town / area',
            autoComplete: 'address-level2',
            placeholder: 'Enter your town or area',
          },
        ]
      : []),
  ];

  return (
    <div className="jc-wrap jc-checkout">
      <CheckoutSteps current={1} />

      <div className="jc-checkout-title">
        <h1>How would you like your order?</h1>
        <p>Quick guest checkout. No account needed.</p>
      </div>

      <p className="jc-demo-notice">
        Demo checkout — no order will be sent to Josh Cafe.
      </p>

      <div className="jc-checkout-grid">
        <form
          ref={formRef}
          className="jc-checkout-card"
          onSubmit={submit}
          noValidate
        >
          <fieldset className="jc-choice-group">
            <legend>Delivery or pickup</legend>

            <div className="jc-fulfillment-options">
              {[
                ['delivery', 'Delivery', 'Bring it to my address'],
                ['pickup', 'Pickup', 'Collect it from the cafe'],
              ].map(([value, label, description]) => (
                <label
                  key={value}
                  className={
                    checkoutData.fulfillment === value
                      ? 'jc-choice is-selected'
                      : 'jc-choice'
                  }
                >
                  <input
                    type="radio"
                    name="fulfillment"
                    value={value}
                    checked={checkoutData.fulfillment === value}
                    onChange={() => changeFulfillment(value)}
                  />
                  <span>
                    <strong>{label}</strong>
                    <small>{description}</small>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="jc-checkout-fields">
            {fields.map((field) => (
              <div key={field.name}>
                <label className="cafe-label" htmlFor={field.name}>
                  {field.label} *
                </label>

                <input
                  id={field.name}
                  name={field.name}
                  type={field.type || 'text'}
                  className="cafe-input"
                  autoComplete={field.autoComplete}
                  placeholder={field.placeholder}
                  value={checkoutData[field.name] || ''}
                  onChange={(event) =>
                    updateField(field.name, event.target.value)
                  }
                  required
                  maxLength={field.name === 'street' ? 200 : 80}
                  aria-invalid={Boolean(errors[field.name])}
                  aria-describedby={
                    errors[field.name] ? `${field.name}-error` : undefined
                  }
                />

                {errors[field.name] && (
                  <p
                    id={`${field.name}-error`}
                    className="jc-field-error"
                    role="alert"
                  >
                    {errors[field.name]}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="jc-checkout-notes">
            <label className="cafe-label" htmlFor="instructions">
              {isDelivery ? 'Delivery instructions' : 'Order note'} (optional)
            </label>

            <textarea
              id="instructions"
              className="cafe-input"
              rows={3}
              maxLength={500}
              placeholder={
                isDelivery
                  ? 'Landmark or instructions to find your address'
                  : 'Anything you would like the cafe to know?'
              }
              value={checkoutData.instructions || ''}
              onChange={(event) =>
                updateField('instructions', event.target.value)
              }
            />
          </div>

          {!isDelivery && (
            <p className="jc-checkout-muted">
              Pickup has no delivery charge. The shop address and collection
              time will be added when confirmed by the owner.
            </p>
          )}

          <button type="submit" className="jc-button jc-checkout-submit">
            Continue to review →
          </button>
        </form>

        <OrderSummary
          cart={cart}
          fulfillment={checkoutData.fulfillment}
          onEdit={onModifyCart}
        />
      </div>
    </div>
  );
};