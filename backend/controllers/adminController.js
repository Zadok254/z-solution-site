const Product = require("../models/Product");
const Order = require("../models/Order");
const Client = require("../models/Client");

exports.getDashboardStats = async (req, res) => {
  try {
    const totalSales = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ]);
    const ordersCount = await Order.countDocuments();
    const clientsCount = await Client.countDocuments();
    const productCount = await Product.countDocuments();

    const topProducts = await Order.aggregate([
      { $unwind: "$products" },
      { $group: { _id: "$products.name", totalQty: { $sum: 1 } } },
      { $sort: { totalQty: -1 } },
      { $limit: 5 }
    ]);

    res.json({
      totalSales: totalSales[0]?.total || 0,
      ordersCount,
      clientsCount,
      productCount,
      topProducts
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
