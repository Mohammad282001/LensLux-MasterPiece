const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

router.post('/cart', protect, orderController.createOrFindOrder);
router.post('/checkout', protect, orderController.completeOrder);
router.post('/process-payment', protect, orderController.processPayment);
router.post('/confirm-payment', protect, orderController.confirmPayment);

module.exports = router;