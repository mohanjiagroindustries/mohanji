const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const ExcelJS = require('exceljs');
const Order = require('../models/Order');
const auth = require('../middleware/auth');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Place order (public)
router.post('/', async (req, res) => {
  try {
    const order = await Order.create(req.body);

    const itemsList = order.items.map(i =>
      `${i.productName} x${i.quantity} ${i.unit} = ₹${i.totalPrice}`
    ).join('\n');

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `New Order from ${order.customerName}`,
      text: `New order received!\n\nCustomer: ${order.customerName}\nPhone: ${order.phone}\nAddress: ${order.address}, ${order.city} - ${order.pincode}\n\nItems:\n${itemsList}\n\nTotal: ₹${order.totalAmount}\nUTR: ${order.utrNumber}\n\nLogin to admin panel to view all orders.`
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all orders (admin only)
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update order status (admin only)
router.patch('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Export to Excel (admin only)
router.get('/export', auth, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Orders');

    sheet.columns = [
      { header: 'Date', key: 'date', width: 20 },
      { header: 'Customer', key: 'name', width: 20 },
      { header: 'Phone', key: 'phone', width: 15 },
      { header: 'Address', key: 'address', width: 35 },
      { header: 'City', key: 'city', width: 15 },
      { header: 'Pincode', key: 'pincode', width: 10 },
      { header: 'Items', key: 'items', width: 40 },
      { header: 'Total (₹)', key: 'total', width: 12 },
      { header: 'UTR', key: 'utr', width: 20 },
      { header: 'Status', key: 'status', width: 12 }
    ];

    orders.forEach(order => {
      const row = sheet.addRow({
        date: new Date(order.createdAt).toLocaleString('en-IN'),
        name: order.customerName,
        phone: order.phone,
        address: order.address,
        city: order.city,
        pincode: order.pincode,
        items: order.items.map(i => `${i.productName} x${i.quantity} ${i.unit}`).join(', '),
        total: order.totalAmount,
        utr: order.utrNumber,
        status: order.status
      });

      if (order.status === 'dispatched') {
        row.eachCell(cell => {
          cell.fill = {
            type: 'pattern', pattern: 'solid',
            fgColor: { argb: 'FFD4EDDA' }
          };
        });
      }
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=mohanji-orders.xlsx');
    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;