import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function OfficerPanel() {
  const [farmers, setFarmers] = useState([]);

  useEffect(() => {
    api
      .get("/auth/farmers")
      .then((res) => setFarmers(res.data))
      .catch(() => {});
  }, []);

  return (
    <div>
      <h2>Agricultural Officer Panel</h2>
      <h3>Farmers</h3>
      <ul>
        {farmers.map((f) => (
          <li key={f.id || f._id}>
            {f.name} — {f.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
