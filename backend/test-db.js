import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  "mysql://root:CTCicyWKjFapGjgFPXepuhFRpBfuHIJm@caboose.proxy.rlwy.net:55832/railway"
);

try {
  await sequelize.authenticate();
  console.log("✅ Connected to MySQL successfully!");
  process.exit();
} catch (error) {
  console.error("❌ Connection failed:", error);
  process.exit(1);
}
