const Order = require("../models/Order");
const { v4: uuidv4 } = require('uuid');

exports.placeOrder = async (req, res) => {
  try {
    const trackingCode = uuidv4().slice(0, 8).toUpperCase();
    const order = new Order({ ...req.body, trackingCode });
    await order.save();
    res.status(201).json({ success: true, trackingCode });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.trackOrder = async (req, res) => {
  try {
    const order = await Order.findOne({ trackingCode: req.params.code });
    if (!order) return res.status(404).json({ message: "Not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;
    await order.save();

    res.json({ message: "Status updated", order });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

