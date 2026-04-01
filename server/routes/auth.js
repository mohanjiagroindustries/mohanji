const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// Seed admin on first run
router.post('/setup', async (req, res) => {
  try {
    const exists = await Admin.findOne({ email: 'ItAdmin@mohanji.com' });
    if (exists) return res.json({ message: 'Admin already exists' });
    const hashed = await bcrypt.hash('Gamla7@123', 10);
    await Admin.create({ email: 'ItAdmin@mohanji.com', password: hashed });
    res.json({ message: 'Admin created' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ message: 'Invalid credentials' });
    const match = await bcrypt.compare(password, admin.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;