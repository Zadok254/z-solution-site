const router = require("express").Router();
const { getAllProducts, addProduct } = require("../controllers/productController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", getAllProducts);
router.post("/", protect, addProduct);

module.exports = router;

