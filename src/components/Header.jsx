import AppLogo from "../assets/logo.jpg";
import { FaShoppingCart } from "react-icons/fa";
import { useState } from "react";
import Cart from "./Cart";

export default function Header({ cartItems, onRemoveItem }) {
  const [showCart, setShowCart] = useState(false);

  // Calculate total quantity of items in the cart
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <header id="main-header">
        <div id="title">
          <img src={AppLogo} alt="Food Order Logo" />
          <h1>Food Order App</h1>
        </div>
        <button className="button" onClick={() => setShowCart(true)}>
          <FaShoppingCart />
          {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
        </button>
      </header>

      {showCart && (
        <Cart
          items={cartItems}
          onClose={() => setShowCart(false)}
          onRemoveItem={onRemoveItem}
        />
      )}
    </>
  );
}
