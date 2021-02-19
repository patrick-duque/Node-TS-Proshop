import { RequestHandler } from 'express';
import Order from '../models/order';

// @desc Create new Order
// @route POST /api/orders
// @access Private
export const addOrder: RequestHandler = async (req, res) => {
	try {
		const { orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, totalPrice } = req.body;
		if (orderItems && orderItems.length === 0) {
			res.status(400);
			throw new Error('No order items');
		} else {
			const order = new Order({
				orderItems,
				shippingAddress,
				paymentMethod,
				itemsPrice,
				shippingPrice,
				totalPrice,
				user: req.user.id
			});

			const createdOrder = await order.save();

			res.status(201).json(createdOrder);
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
