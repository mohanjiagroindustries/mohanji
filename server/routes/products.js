const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const Product = require('../models/Product');
const auth = require('../middleware/auth');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: { folder: 'mohanji-products', allowed_formats: ['jpg', 'jpeg', 'png', 'webp'] }
});

const upload = multer({ storage });

// Get all products (public)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({ inStock: true });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add product (admin only) — up to 4 images
router.post('/', auth, upload.array('images', 4), async (req, res) => {
  try {
    const { name, description, category, retailPrice, retailUnit,
            wholesalePrice, wholesaleUnit, wholesaleMinQty } = req.body;
    const images = req.files ? req.files.map(f => f.path) : [];
    const product = await Product.create({
      name, description, category,
      images,
      image: images[0] || '',
      retailPrice, retailUnit,
      wholesalePrice, wholesaleUnit,
      wholesaleMinQty: wholesaleMinQty || 1
    });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Edit product (admin only)
router.put('/:id', auth, upload.array('newImages', 4), async (req, res) => {
  try {
    const { name, description, category, retailPrice, retailUnit,
            wholesalePrice, wholesaleUnit, wholesaleMinQty, existingImages } = req.body;

    // existingImages is a JSON string of kept images in order
    let kept = [];
    try { kept = JSON.parse(existingImages || '[]'); } catch { kept = []; }

    // new uploads
    const newUploads = req.files ? req.files.map(f => f.path) : [];
    const allImages = [...kept, ...newUploads];

    const updates = {
      name, description, category,
      retailPrice, retailUnit,
      wholesalePrice, wholesaleUnit,
      wholesaleMinQty,
      images: allImages,
      image: allImages[0] || ''
    };

    const product = await Product.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete product (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;