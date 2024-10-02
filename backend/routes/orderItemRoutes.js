const express = require('express');
const router = express.Router();
const orderItemController = require('../controllers/orderItemController');

// Add an item to the order (cart)
router.post('/add', orderItemController.addItemToOrder);

// Remove an item from the order (cart)
router.post('/remove', orderItemController.removeItemFromOrder);

module.exports = router;
