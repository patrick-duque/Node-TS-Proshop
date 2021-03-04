"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderToDelivered = exports.updateOrderToPaid = exports.getOrdersByAdmin = exports.getOrdersByUser = exports.addOrder = void 0;
const order_1 = __importDefault(require("../models/order"));
const user_1 = __importDefault(require("../models/user"));
// @desc Create new Order
// @route POST /api/orders
// @access Private
const addOrder = async (req, res) => {
    try {
        const { orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, totalPrice } = req.body;
        if (orderItems && orderItems.length === 0) {
            res.status(400);
            throw new Error('No order items');
        }
        else {
            const order = new order_1.default({
                orderItems,
                shippingAddress,
                paymentMethod,
                itemsPrice,
                shippingPrice,
                totalPrice,
                user: req.user.id
            });
            const createdOrder = await order.save();
            const user = await user_1.default.findById(req.user.id);
            user.cart = [];
            await user.save();
            res.status(201).json(createdOrder);
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.addOrder = addOrder;
// @desc Get Orders by User
// @route GET /api/orders/user
// @access Private
const getOrdersByUser = async (req, res) => {
    try {
        const orders = await order_1.default.find({ user: req.user.id }).select('-user');
        res.status(200).json(orders);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getOrdersByUser = getOrdersByUser;
// @desc Get All Orders
// @route GET /api/orders/
// @access Private
const getOrdersByAdmin = async (req, res) => {
    try {
        const admin = await user_1.default.findById(req.user.id);
        if (!admin.isAdmin) {
            res.status(401);
            throw new Error('Unauthorized user');
        }
        else {
            const orders = await order_1.default.find({});
            res.status(200).json(orders);
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getOrdersByAdmin = getOrdersByAdmin;
// @desc Update Order to paid
// @route PUT /api/orders/:id/pay
// @access Private
const updateOrderToPaid = async (req, res) => {
    try {
        const order = await order_1.default.findById(req.params.id);
        if (!order) {
            res.status(404);
            throw new Error('No order found');
        }
        else {
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
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateOrderToPaid = updateOrderToPaid;
// @desc Update Order to delivered
// @route GET /api/orders/:id/deliver
// @access Private/Admin
const updateOrderToDelivered = async (req, res) => {
    try {
        const order = await order_1.default.findById(req.params.id);
        if (!order) {
            res.status(404);
            throw new Error('No order found');
        }
        else {
            order.isDelivered = true;
            order.deliveredAt = new Date();
            const updatedOrder = await order.save();
            res.status(201).json(updatedOrder);
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateOrderToDelivered = updateOrderToDelivered;
