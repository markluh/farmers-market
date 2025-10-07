import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./User.js";
import Product from "./Product.js";

const Order = sequelize.define("Order", {
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  totalPrice: { type: DataTypes.FLOAT, allowNull: false },
  status: {
    type: DataTypes.ENUM("pending", "completed", "cancelled"),
    defaultValue: "pending",
  },
});

User.hasMany(Order, { foreignKey: "customerId" });
Order.belongsTo(User, { foreignKey: "customerId" });

Product.hasMany(Order, { foreignKey: "productId" });
Order.belongsTo(Product, { foreignKey: "productId" });

export default Order;
