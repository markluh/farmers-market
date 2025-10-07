import React from "react";

export default function ProductCard({ product, onAdd }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: 12,
        borderRadius: 8,
        width: 260,
      }}
    >
      <img
        src={product.image || "https://via.placeholder.com/240"}
        alt=""
        style={{ width: "100%", height: 140, objectFit: "cover" }}
      />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>
        <strong>${product.price}</strong> · {product.quantity} in stock
      </p>
      <p>Farmer: {product.User?.name || product.farmerName}</p>
      {onAdd && <button onClick={() => onAdd(product)}>Add to cart</button>}
    </div>
  );
}
