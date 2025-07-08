const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, unique: true },
  phone: String,
  location: String,
  registeredVia: { type: String, enum: ['Website', 'WhatsApp', 'Admin'], default: 'Website' },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
}, { timestamps: true });

module.exports = mongoose.model('Client', clientSchema);

