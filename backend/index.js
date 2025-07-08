const express = require("express");
const app = express();
const productRoutes = require("./routes/productRoutes");

// Middleware
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const farmRoutes = require("./routes/farmRoutes");
app.use("/api/farms", farmRoutes);
