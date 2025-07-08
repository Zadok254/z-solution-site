const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ['Vegetables', 'Fruits', 'Poultry', 'Cattle', 'Dairy', 'Grains', 'Honey'], required: true },
  description: String,
  price: { type: Number, required: true },
  image: String,
  stock: { type: Number, default: 100 },
  farmOrigin: String,
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);

