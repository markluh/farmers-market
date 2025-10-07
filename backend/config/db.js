import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// You can store this whole URL in .env instead
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "mysql",
  logging: false,
});

try {
  await sequelize.authenticate();
  console.log("✅ MySQL connected successfully!");
} catch (err) {
  console.error("❌ Unable to connect to MySQL:", err);
}

export default sequelize;
