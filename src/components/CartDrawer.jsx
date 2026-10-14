import { useEffect, useRef } from 'react';
import {
  ArrowRight,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from 'lucide-react';

import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';

export const CartDrawer = ({ onNavigateToCheckout }) => {
  const dialogRef = useRef(null);

  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    itemsCount,
    itemsSubtotal,
  } = useCart();

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!isCartOpen) {
      if (dialog.open) dialog.close();
      return;
    }

    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;

    dialog.showModal();
    document.body.style.overflow = 'hidden';

    return () => {
      if (dialog.open) dialog.close();
      document.body.style.overflow = previousOverflow;

      if (previousFocus instanceof HTMLElement) {
        previousFocus.focus();
      }
    };
  }, [isCartOpen]);

  const close = () => setIsCartOpen(false);

  return (
    <dialog
      ref={dialogRef}
      className="jc-cart-dialog"
      aria-labelledby="jc-cart-title"
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;

        const rect = event.currentTarget.getBoundingClientRect();

        if (
          event.clientX < rect.left ||
          event.clientX > rect.right ||
          event.clientY < rect.top ||
          event.clientY > rect.bottom
        ) {
          close();
        }
      }}
    >
      <div className="jc-cart-shell">
        <div className="jc-cart-heading">
          <div>
            <h2 id="jc-cart-title">Your order</h2>
            <p>{itemsCount} {itemsCount === 1 ? 'item' : 'items'}</p>
          </div>

          <button
            type="button"
            className="jc-icon-button"
            onClick={close}
            aria-label="Close your order"
            autoFocus
          >
            <X size={23} />
          </button>
        </div>

        <div className="jc-cart-content">
          {cart.length === 0 ? (
            <div className="jc-empty-cart">
              <ShoppingBag size={42} aria-hidden="true" />
              <h3>Your order is empty</h3>
              <p>Add something delicious from the menu.</p>
              <button type="button" className="jc-button" onClick={close}>
                Keep browsing
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <article className="jc-cart-item" key={item.id}>
                <div className="jc-cart-item-top">
                  <div>
                    <h3>{item.name}</h3>
                    <p>{formatPrice(item.price)} each</p>
                  </div>

                  <button
                    type="button"
                    className="jc-icon-button"
                    onClick={() => removeFromCart(item.id)}
                    aria-label={`Remove ${item.name}`}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="jc-cart-item-bottom">
                  <div className="jc-quantity">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, -1)}
                      aria-label={`Decrease ${item.name} quantity`}
                    >
                      <Minus size={16} />
                    </button>

                    <span aria-live="polite">{item.quantity}</span>

                    <button
                      type="button"
                      disabled={item.quantity >= 99}
                      onClick={() => updateQuantity(item.id, 1)}
                      aria-label={`Increase ${item.name} quantity`}
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <strong>
                    {formatPrice(item.price * item.quantity)}
                  </strong>
                </div>
              </article>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="jc-cart-summary">
            <div className="jc-cart-subtotal">
              <span>Items subtotal</span>
              <strong>{formatPrice(itemsSubtotal)}</strong>
            </div>

            <p>
              Delivery or pickup is selected at checkout.
              Any delivery fee must be confirmed before ordering.
            </p>

            <button
              type="button"
              className="jc-button"
              onClick={() => {
                close();
                onNavigateToCheckout();
              }}
            >
              Continue to checkout
              <ArrowRight size={18} aria-hidden="true" />
            </button>

            <small>Preview only · checkout is being updated.</small>
          </div>
        )}
      </div>
    </dialog>
  );
};