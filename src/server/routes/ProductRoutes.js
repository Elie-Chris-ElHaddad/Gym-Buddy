const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Add a new product
router.post('/', async (req, res) => {
    try {
        const { name, description, price } = req.body;

        if (!name || !description || !price) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const product = new Product({ name, description, price });
        const savedProduct = await product.save();

        res.status(201).json(savedProduct);
    } catch (err) {
        console.error("Error in POST /api/products:", err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        console.error("Error in GET /api/products:", err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
