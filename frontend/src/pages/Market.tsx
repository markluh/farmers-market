import React, { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";

export default function Market() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api
      .get("/products")
      .then((res) => setProducts(res.data))
      .catch(console.error);
  }, []);

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find(
      (i) => i.productId === product.id || i.productId === product._id
    );
    if (existing) existing.quantity += 1;
    else
      cart.push({
        productId: product.id || product._id,
        name: product.name,
        price: product.price,
        quantity: 1,
      });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart");
  };

  return (
    <div>
      <h2>Market</h2>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {products.map((p) => (
          <ProductCard key={p.id || p._id} product={p} onAdd={addToCart} />
        ))}
      </div>
    </div>
  );
}
