import express from "express";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

const router = express.Router();

// Place an order
router.post("/", async (req, res) => {
  try {
    const { productId, customerId, quantity } = req.body;
    const product = await Product.findByPk(productId);

    if (!product) return res.status(404).json({ message: "Product not found" });
    if (product.quantity < quantity)
      return res.status(400).json({ message: "Insufficient stock" });

    const totalPrice = product.price * quantity;
    const order = await Order.create({
      productId,
      customerId,
      quantity,
      totalPrice,
    });

    product.quantity -= quantity;
    await product.save();

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  const orders = await Order.findAll({ include: Product });
  res.json(orders);
});

export default router;
