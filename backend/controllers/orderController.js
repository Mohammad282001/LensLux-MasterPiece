const { Order, OrderItem, User, Product } = require('../models');

module.exports = {
    // Create or find an existing order (if the user is already adding to cart)
    async createOrFindOrder(req, res) {
        try {
            const { user_id } = req.body; // assuming user is authenticated and we get the user_id
            let order = await Order.findOne({
                where: { user_id, status: 'pending' } // Check for an active cart
            });

            // If no cart order exists, create a new one
            if (!order) {
                order = await Order.create({
                    user_id,
                    total_amount: 0, // initially zero
                    status: 'pending', // "cart" indicates the order is still in progress
                    shipping_address: null // to be added later when checking out
                });
            }

            res.status(200).json(order); // Return the order to be used in the front-end
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to create or find order' });
        }
    },

    // Update order to 'completed' after checkout
    async completeOrder(req, res) {
        try {
            const { order_id, shipping_address, total_amount } = req.body;

            const [updated] = await Order.update(
                {
                    status: 'completed',
                    shipping_address,
                    total_amount
                },
                { where: { id: order_id } }
            );

            if (!updated) {
                return res.status(404).json({ error: 'Order not found' });
            }

            res.json({ message: 'Order completed successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to complete order' });
        }
    }
};
