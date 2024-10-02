const { OrderItem, Products, Order } = require('../models');

module.exports = {
    // Add item to the order (cart)
    async addItemToOrder(req, res) {
        try {
            const { order_id, product_id, quantity, price_per_item } = req.body;

            // Ensure required fields are present
            if (!order_id || !product_id || !quantity || !price_per_item) {
                return res.status(400).json({ error: 'Order ID, product ID, quantity, and price per item are required' });
            }

            // Fetch the product by product_id
            const product = await Products.findByPk(product_id);
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }

            // Check if the order exists
            const order = await Order.findByPk(order_id);
            if (!order) {
                return res.status(404).json({ error: 'Order not found' });
            }

            // Check if this item is already in the cart (for this order)
            let orderItem = await OrderItem.findOne({
                where: { order_id, product_id }
            });

            // If the item is already in the cart, update the quantity
            if (orderItem) {
                orderItem.quantity += quantity;
                await orderItem.save();
            } else {
                // Otherwise, create a new order item with the product's price
                orderItem = await OrderItem.create({
                    order_id,
                    product_id,
                    quantity,
                    price_per_item: parseFloat(price_per_item), // Ensure it's a float
                });
            }

            // Update the order's total price
            const addedAmount = parseFloat(price_per_item) * quantity; // Ensure it's a float
            order.total_amount = parseFloat(order.total_amount) + addedAmount; // Update total
            console.log(`Updating total_amount by ${addedAmount}. New total: ${order.total_amount}`); // Log for debugging
            await order.save();

            return res.status(201).json(orderItem); // Send back the newly added item
        } catch (error) {
            console.error('Failed to add item to order:', error);
            return res.status(500).json({ error: 'Failed to add item to order', details: error.message });
        }
    }
,

    // Remove item from the order (cart)
    async removeItemFromOrder(req, res) {
        try {
            const { order_id, product_id } = req.body;

            const orderItem = await OrderItem.findOne({
                where: { order_id, product_id }
            });

            if (!orderItem) {
                return res.status(404).json({ error: 'Order item not found' });
            }

            // Update the total order amount
            const order = await Order.findByPk(order_id);
            order.total_amount -= orderItem.price_per_item * orderItem.quantity;
            await order.save();

            // Delete the order item
            await orderItem.destroy();

            res.json({ message: 'Item removed from order' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to remove item from order' });
        }
    }
};
