const Product = require("../models/Product");

// @desc    Get all products
// @route   GET /api/products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Add a product
// @route   POST /api/products
exports.addProduct = async (req, res) => {
  try {
    const { name, description, price, category, image } = req.body;
    const newProduct = await Product.create({ name, description, price, category, image });
    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
