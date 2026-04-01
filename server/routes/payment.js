const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Order = require('../models/Order');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create order
router.post('/create-order', async (req, res) => {
  try {
    const { amount, customerName, phone, address, city, pincode, priceMode, totalAmount, items } = req.body;
    const options = {
      amount: amount * 100,
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      notes: {
        customerName, phone, address, city, pincode, priceMode,
        totalAmount, items: JSON.stringify(items)
      }
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Verify payment (for card payments)
router.post('/verify', (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const body = razorpay_order_id + '|' + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest('hex');
  if (expectedSignature === razorpay_signature) {
    res.json({ success: true, paymentId: razorpay_payment_id });
  } else {
    res.status(400).json({ success: false, message: 'Payment verification failed' });
  }
});

// Webhook (for UPI payments)
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  try {
    const signature = req.headers['x-razorpay-signature'];
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(req.body)
      .digest('hex');

    if (expectedSignature !== signature) {
      return res.status(400).json({ error: 'Invalid signature' });
    }

    const event = JSON.parse(req.body);

    if (event.event === 'payment.captured') {
      const payment = event.payload.payment.entity;
      const notes = payment.notes;

      // Save order to DB
      await Order.create({
        customerName: notes.customerName,
        phone: notes.phone,
        address: notes.address,
        city: notes.city,
        pincode: notes.pincode,
        razorpayPaymentId: payment.id,
        priceMode: notes.priceMode,
        totalAmount: Number(notes.totalAmount),
        items: JSON.parse(notes.items),
      });

      console.log('Order saved via webhook:', payment.id);
    }

    res.json({ status: 'ok' });
  } catch (err) {
    console.error('Webhook error:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;