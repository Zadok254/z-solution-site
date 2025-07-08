const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const clientRoutes = require('./routes/clientRoutes');
const branchRoutes = require('./routes/branchRoutes');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/branches', branchRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const farmRoutes = require("./routes/farmRoutes");
app.use("/api/farms", farmRoutes);

const orderRoutes = require("./routes/orderRoutes");
app.use("/api/orders", orderRoutes);
const mpesaRoutes = require('./routes/mpesaRoutes');
app.use('/api/mpesa', mpesaRoutes);
const connectDB = require('./config/db');
connectDB();
const adminRoutes = require('./routes/adminRoutes');
app.use('/api/admin', adminRoutes);
const adminAuthRoutes = require('./routes/adminAuth');
app.use('/api/admin-auth', adminAuthRoutes);
