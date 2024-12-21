import React, { useState } from "react";
import { FaTimes, FaTrash } from "react-icons/fa";
import CheckoutForm from "./CheckoutForm";

export default function Cart({ items, onRemoveItem, onClose }) {
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);

  // Calculate the total price
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckoutClick = () => {
    setShowCheckoutForm(true);
  };

  const handleCloseCheckoutForm = () => {
    setShowCheckoutForm(false);
  };

  return (
    <>
      <div className="cart-modal">
        <div className="cart-content">
          <button className="close-button" onClick={onClose}>
            <FaTimes />
          </button>
          <h2>Your Cart</h2>
          {items.length > 0 ? (
            <ul>
              {items.map((item) => (
                <li key={item.id} className="cart-item">
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                  <button onClick={() => onRemoveItem(item.id)}>
                    <FaTrash />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>Your cart is empty.</p>
          )}
          {items.length > 0 && (
            <>
              <div className="cart-total">
                <strong>Total: </strong>${totalPrice.toFixed(2)}
              </div>
              <button className="button" onClick={handleCheckoutClick}>
                Checkout
              </button>
            </>
          )}
        </div>
      </div>
      {showCheckoutForm && (
        <CheckoutForm
          items={items}
          totalPrice={totalPrice}
          onClose={handleCloseCheckoutForm}
        />
      )}
    </>
  );
}
