const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  phone: String,
  amount: Number,
  mpesaRef: String,
  checkoutRequestID: String,
  merchantRequestID: String,
  resultDesc: String,
  status: {
    type: String,
    enum: ['Success', 'Failed', 'Pending'],
    default: 'Pending'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Payment", paymentSchema);
