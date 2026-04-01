const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  pincode: { type: String, required: true },
  items: [{
    productId: String,
    productName: String,
    quantity: Number,
    unit: String,
    pricePerUnit: Number,
    totalPrice: Number,
    priceMode: String
  }],
  totalAmount: { type: Number, required: true },
utrNumber: { type: String },
razorpayPaymentId: { type: String },
  status: { type: String, default: 'pending', enum: ['pending', 'sent_to_delivery', 'dispatched', 'delivered'] },
  priceMode: { type: String, default: 'retail' }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);