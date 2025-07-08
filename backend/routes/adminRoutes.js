const express = require("express");
const router = express.Router();
const { getDashboardStats } = require("../controllers/adminController");
const { protect } = require("../middleware/authMiddleware");

router.get("/stats", protect, getDashboardStats);
const Payment = require("../models/Payment");

router.get("/payments", async (req, res) => {
  try {
    const payments = await Payment.find().sort({ date: -1 });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: "Error fetching payments" });
  }
});

module.exports = router;
