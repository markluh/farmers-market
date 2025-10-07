import React, { useState, useEffect } from "react";
import api from "../services/api";

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart") || "[]"));
  }, []);

  const placeOrder = async () => {
    try {
      // simple: send each cart item as separate order to backend
      for (const item of cart) {
        await api.post("/orders", {
          productId: item.productId,
          customerId: JSON.parse(localStorage.getItem("user"))?.id,
          quantity: item.quantity,
        });
      }
      localStorage.removeItem("cart");
      setCart([]);
      alert("Order placed");
    } catch (err) {
      alert(err.response?.data?.message || "Order failed");
    }
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 && <p>Cart is empty</p>}
      <ul>
        {cart.map((c, i) => (
          <li key={i}>
            {c.name} x {c.quantity} — ${c.price * c.quantity}
          </li>
        ))}
      </ul>
      {cart.length > 0 && <button onClick={placeOrder}>Checkout</button>}
    </div>
  );
}
