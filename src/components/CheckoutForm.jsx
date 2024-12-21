import React, { useState } from "react";

export default function CheckoutForm({ items, totalPrice, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    street: "",
    postalCode: "",
    city: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const orderData = {
      customer: formData,
      items,
      totalPrice,
    };

    try {
      const response = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order: orderData }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit order.");
      }

      alert("Order submitted successfully!");
      onClose();
    } catch (error) {
      console.error(error.message);
      alert("Failed to submit order.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="checkout-modal">
      <div className="checkout-content">
        <button className="close-button" onClick={onClose}>
          ✖
        </button>
        <h2>Checkout</h2>
        
        {/* Optional Progress Bar */}
        <div className="progress-bar">
          <div className="progress" style={{ width: "100%" }}></div>
        </div>

        <div>
            
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" id="checkout-label">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email" id="checkout-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="street" id="checkout-label">Street</label>
            <input
              type="text"
              id="street"
              name="street"
              placeholder="Enter your street address"
              value={formData.street}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="postalCode" id="checkout-label">Postal Code</label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              placeholder="Enter your postal code"
              value={formData.postalCode}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="city" id="checkout-label">City</label>
            <input
              type="text"
              id="city"
              name="city"
              placeholder="Enter your city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          <button className="button" type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <div className="spinner"></div>
            ) : (
              "Submit Order"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
