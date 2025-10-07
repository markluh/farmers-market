import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav
      style={{
        display: "flex",
        gap: 12,
        padding: 12,
        borderBottom: "1px solid #ddd",
      }}
    >
      <Link to="/">Market</Link>
      {!user && (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
      {user?.role === "customer" && <Link to="/cart">Cart</Link>}
      {user?.role === "farmer" && <Link to="/farmer">Farmer Dashboard</Link>}
      {user?.role === "officer" && <Link to="/officer">Officer Panel</Link>}
      {user && (
        <div style={{ marginLeft: "auto" }}>
          <span style={{ marginRight: 8 }}>
            {user.name} ({user.role})
          </span>
          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
