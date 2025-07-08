const mongoose = require("mongoose");

const farmSchema = new mongoose.Schema({
  name: String,
  location: String,
  size: String,
  description: String,
  image: String,
  crops: [String],
  livestock: [String],
  videos: [String],
  testimonials: [
    {
      client: String,
      message: String
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Farm", farmSchema);
