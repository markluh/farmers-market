import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function FarmerDashboard() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: 0,
    quantity: 0,
  });
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    api.get("/products").then((res) => {
      const mine = res.data.filter(
        (p) =>
          p.farmerId ||
          p.farmerId === user?.id ||
          (p.User && p.User.id === user?.id)
      );
      setProducts(mine);
    });
  }, []);

  const addProduct = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form, farmerId: user?.id };
      const res = await api.post("/products", payload);
      setProducts((prev) => [res.data, ...prev]);
      setForm({ name: "", description: "", price: 0, quantity: 0 });
    } catch (err) {
      alert(err.response?.data?.message || "Failed");
    }
  };

  return (
    <div>
      <h2>Farmer Dashboard</h2>
      <form onSubmit={addProduct} style={{ maxWidth: 560 }}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: parseFloat(e.target.value) })
          }
        />
        <input
          type="number"
          placeholder="Quantity"
          value={form.quantity}
          onChange={(e) =>
            setForm({ ...form, quantity: parseInt(e.target.value) })
          }
        />
        <button type="submit">Add Product</button>
      </form>

      <h3>Your Products</h3>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {products.map((p) => (
          <div
            key={p.id || p._id}
            style={{ border: "1px solid #ddd", padding: 12 }}
          >
            <h4>{p.name}</h4>
            <p>{p.description}</p>
            <p>
              {p.quantity} units · ${p.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
