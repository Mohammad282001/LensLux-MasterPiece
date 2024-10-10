const { Order, OrderItem } = require('../models');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

console.log('Stripe Secret Key:', process.env.STRIPE_SECRET_KEY ? 'Set' : 'Not Set');

module.exports = {
    async createOrFindOrder(req, res) {
        try {
            const user_id = req.user.id;
            let order = await Order.findOne({
                where: { user_id, status: 'pending' }
            });

            if (!order) {
                order = await Order.create({
                    user_id,
                    total_amount: 0,
                    status: 'pending',
                    shipping_address: null
                });
            }

            res.status(200).json(order);
        } catch (error) {
            console.error('Error in createOrFindOrder:', error);
            res.status(500).json({ error: 'Failed to create or find order' });
        }
    },

    async completeOrder(req, res) {
        try {
            const { order_id, shipping_address, total_amount, items } = req.body;
            const order = await Order.findByPk(order_id);
            if (!order) {
                return res.status(404).json({ error: 'Order not found' });
            }

            // Update order details
            order.status = 'completed';
            order.shipping_address = JSON.stringify(shipping_address);
            order.total_amount = total_amount;
            await order.save();

            // Create order items
            for (let item of items) {
                await OrderItem.create({
                    order_id: order.id,
                    product_id: item.product_id,
                    quantity: item.quantity,
                    price_per_item: item.price_per_item,
                    details: JSON.stringify(item.details)
                });
            }

            res.json({ success: true, message: 'Order completed successfully' });
        } catch (error) {
            console.error('Error in completeOrder:', error);
            res.status(500).json({ error: 'Failed to complete order', details: error.message });
        }
    },

    async processPayment(req, res) {
        try {
            console.log('Received payment processing request:', req.body);
            const { order_id, payment_method_id, amount } = req.body;

            if (!process.env.STRIPE_SECRET_KEY) {
                throw new Error('Stripe secret key is not set');
            }

            if (!order_id || !payment_method_id || !amount) {
                console.error('Missing required payment information');
                return res.status(400).json({ success: false, message: 'Missing required payment information' });
            }

            console.log('Creating payment intent...');
            const paymentIntent = await stripe.paymentIntents.create({
                amount,
                currency: 'usd',
                payment_method: payment_method_id,
                automatic_payment_methods: {
                    enabled: true,
                    allow_redirects: 'never' 
                },
                confirm: true, 
            });

            console.log('Payment intent created:', paymentIntent.id);

            if (paymentIntent.status === 'succeeded') {
                console.log('Payment succeeded, updating order...');
                const order = await Order.findByPk(order_id);
                if (order) {
                    order.status = 'paid';
                    await order.save();
                    console.log('Order updated to paid status');
                    res.json({ success: true, message: 'Payment processed successfully' });
                } else {
                    console.error('Order not found:', order_id);
                    res.status(404).json({ success: false, message: 'Order not found' });
                }
            } else {
                console.error('Payment intent failed:', paymentIntent.status);
                res.status(400).json({ success: false, message: 'Payment processing failed' });
            }
        } catch (error) {
            console.error('Payment processing error:', error);
            res.status(500).json({
                success: false,
                message: 'An error occurred while processing the payment',
                error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
            });
        }
    },


    async confirmPayment(req, res) {
        try {
            const { payment_intent_id } = req.body;
            const paymentIntent = await stripe.paymentIntents.confirm(payment_intent_id);

            if (paymentIntent.status === 'succeeded') {
                res.json({ success: true, message: 'Payment confirmed successfully' });
            } else {
                res.status(400).json({ success: false, message: 'Payment confirmation failed' });
            }
        } catch (error) {
            console.error('Payment confirmation error:', error);
            res.status(500).json({
                success: false,
                message: 'An error occurred while confirming the payment',
                error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
            });
        }
    }
};