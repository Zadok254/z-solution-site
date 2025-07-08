const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// Create Order
router.post("/", async (req, res) => {
  try {
    const { customerName, phone, location, paymentMethod, products, total } = req.body;
    const order = await Order.create({ customerName, phone, location, paymentMethod, products, total });
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: "Order failed", error: err.message });
  }
});

// View All Orders (for admin)
router.get("/", async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
});

module.exports = router;
// Client Order Tracker - By Phone or Order ID
router.get("/track/:input", async (req, res) => {
  const input = req.params.input;

  let order;
  if (/^\d+$/.test(input)) {
    // Input is likely a phone number
    order = await Order.findOne({ phone: input }).sort({ createdAt: -1 });
  } else {
    // Input is treated as Order ID
    order = await Order.findById(input);
  }

  if (!order) {
    return res.status(404).json({ message: "Order not found." });
  }

  res.json(order);
});
// Update Order Status by ID
router.put("/:id/status", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = req.body.status || order.status;
    await order.save();

    res.json({ message: "✅ Status updated", order });
  } catch (err) {
    res.status(500).json({ message: "Error updating order", error: err.message });
  }
});
