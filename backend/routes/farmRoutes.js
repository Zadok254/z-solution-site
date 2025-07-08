const express = require("express");
const router = express.Router();
const Farm = require("../models/Farm");
const { protect } = require("../middleware/authMiddleware");

// GET all farms
router.get("/", async (req, res) => {
  const farms = await Farm.find().sort({ createdAt: -1 });
  res.json(farms);
});

// GET single farm by ID
router.get("/:id", async (req, res) => {
  const farm = await Farm.findById(req.params.id);
  if (farm) res.json(farm);
  else res.status(404).json({ message: "Farm not found" });
});

// POST new farm (admin only)
router.post("/", protect, async (req, res) => {
  const { name, location, size, description, image, crops, livestock, videos } = req.body;
  const farm = await Farm.create({ name, location, size, description, image, crops, livestock, videos });
  res.status(201).json(farm);
});

// PATCH - Add testimonial (public)
router.patch("/:id/testimonials", async (req, res) => {
  const { client, message } = req.body;
  const farm = await Farm.findById(req.params.id);
  if (farm) {
    farm.testimonials.push({ client, message });
    await farm.save();
    res.json(farm);
  } else {
    res.status(404).json({ message: "Farm not found" });
  }
});

module.exports = router;
