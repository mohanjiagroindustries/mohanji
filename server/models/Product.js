const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  images: [{ type: String }],
  image: { type: String }, // kept for backward compatibility
  retailPrice: { type: Number, required: true },
  retailUnit: { type: String, required: true },
  wholesalePrice: { type: Number, required: true },
  wholesaleUnit: { type: String, required: true },
  wholesaleMinQty: { type: Number, default: 1 },
  inStock: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);