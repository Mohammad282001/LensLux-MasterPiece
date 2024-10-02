const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Create or find an order (for the cart)
router.post('/cart', orderController.createOrFindOrder);

// Complete the order (when checking out)
router.post('/checkout', orderController.completeOrder);

module.exports = router;
