import { RequestHandler } from 'express';
import Order, { OrderType } from '../models/order';
import User, { UserType } from '../models/user';

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

			const user: UserType = await User.findById(req.user.id);
			user.cart = [];
			await user.save();
			res.status(201).json(createdOrder);
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// @desc Get Orders by User
// @route GET /api/orders/user
// @access Private
export const getOrdersByUser: RequestHandler = async (req, res) => {
	try {
		const orders: OrderType[] = await Order.find({ user: req.user.id }).select('-user');
		res.status(200).json(orders);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// @desc Get All Orders
// @route GET /api/orders/
// @access Private
export const getOrdersByAdmin: RequestHandler = async (req, res) => {
	try {
		const admin: UserType = await User.findById(req.user.id);
		if (!admin.isAdmin) {
			res.status(401);
			throw new Error('Unauthorized user');
		} else {
			const orders: OrderType[] = await Order.find({});
			res.status(200).json(orders);
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// @desc Update Order to paid
// @route PUT /api/orders/:id/pay
// @access Private
export const updateOrderToPaid: RequestHandler = async (req, res) => {
	try {
		const order: OrderType = await Order.findById(req.params.id);

		if (!order) {
			res.status(404);
			throw new Error('No order found');
		} else {
			order.isPaid = true;
			order.paidAt = new Date();
			order.paymentResult = {
				id: req.body.id,
				status: req.body.status,
				update_time: req.body.update_time,
				email_address: req.body.email_address
			};

			const updatedOrder = await order.save();
			res.status(201).json(updatedOrder);
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
