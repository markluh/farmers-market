import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./User.js";

const Product = sequelize.define("Product", {
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  price: { type: DataTypes.FLOAT, allowNull: false },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  image: { type: DataTypes.STRING },
});

User.hasMany(Product, { foreignKey: "farmerId" });
Product.belongsTo(User, { foreignKey: "farmerId" });

export default Product;
