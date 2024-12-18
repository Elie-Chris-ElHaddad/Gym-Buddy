const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Fetch all products (delegates to ProductRoutes)
router.get('/products', async (req, res) => {
    // Forward to ProductRoutes or query products directly if necessary
});

// Place an order
router.post('/order', async (req, res) => {
    try {
        const { userId, products } = req.body;

        const totalAmount = products.reduce((total, item) => total + item.price * item.quantity, 0);

        const order = new Order({ userId, products, totalAmount });
        await order.save();

        res.status(201).json(order);
    } catch (err) {
        console.error("Error in POST /api/orders:", err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
