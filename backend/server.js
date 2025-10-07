import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import sequelize from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import "./models/User.js";
import "./models/Product.js";
import "./models/Order.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 5000;

// Sync database
sequelize.sync({ alter: true }).then(() => {
  console.log("🧩 Database synced successfully!");
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});
