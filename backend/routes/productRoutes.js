import express from "express";
import Product from "../models/Product.js";
import User from "../models/User.js";

const router = express.Router();

// Get all products
router.get("/", async (req, res) => {
  const products = await Product.findAll({ include: User });
  res.json(products);
});

// Add a product
router.post("/", async (req, res) => {
  try {
    const { name, description, price, quantity, farmerId } = req.body;
    const product = await Product.create({
      name,
      description,
      price,
      quantity,
      farmerId,
    });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update product
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  await Product.update(req.body, { where: { id } });
  res.json({ message: "Product updated" });
});

// Delete product
router.delete("/:id", async (req, res) => {
  await Product.destroy({ where: { id: req.params.id } });
  res.json({ message: "Product deleted" });
});

export default router;
