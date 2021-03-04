"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.getAllUsers = exports.removeFromUserCart = exports.addToUserCart = exports.checkUser = exports.registerUser = exports.editUserProfile = exports.loginUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
const setExpiry = () => Math.floor(Date.now()) + 60 * 60 * 1000;
// @desc Login User
// @route POST /api/users/login
// @access Public
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await user_1.default.findOne({ email });
        if (user && (await bcryptjs_1.default.compare(password, user.password))) {
            const { email, isAdmin, _id, cart, name } = user;
            const token = generateToken_1.default(_id);
            const expiry = setExpiry();
            res.status(200).json({ email, isAdmin, _id, cart, name, token, expiry });
        }
        else {
            res.status(401).json({ message: 'Invalid Credentials' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.loginUser = loginUser;
// @desc Edit User
// @route PUT /api/users/editUser
// @access Private
const editUserProfile = async (req, res) => {
    try {
        const user = await user_1.default.findById(req.user.id);
        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            if (req.body.password) {
                user.password = bcryptjs_1.default.hashSync(req.body.password, 10);
            }
            const updatedUser = await user.save();
            const { email, isAdmin, _id, cart, name } = updatedUser;
            const token = generateToken_1.default(_id);
            const expiry = setExpiry();
            res.status(200).json({ email, isAdmin, _id, cart, name, token, expiry });
        }
        else {
            res.status(404).json({ message: 'No user found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.editUserProfile = editUserProfile;
// @desc Register new User
// @route POST /api/users/register
// @access Public
const registerUser = async (req, res) => {
    try {
        const userExist = await user_1.default.findOne({ email: req.body.email });
        if (userExist) {
            res.status(400);
            throw new Error('User already exist');
        }
        else {
            const user = await user_1.default.create({
                name: req.body.name,
                email: req.body.email,
                password: bcryptjs_1.default.hashSync(req.body.password, 10)
            });
            if (user) {
                const { email, isAdmin, _id, cart, name } = user;
                const token = generateToken_1.default(_id);
                const expiry = setExpiry();
                res.status(201).json({ email, isAdmin, _id, cart, name, token, expiry });
            }
            else {
                res.status(400);
                throw new Error('Invalid data');
            }
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.registerUser = registerUser;
// @desc Check User auth
// @route GET /api/users/user
// @access Private
const checkUser = async (req, res) => {
    try {
        if (req.headers.authorization) {
            res.status(200).json({ auth: true });
        }
        else {
            res.status(401);
            throw new Error('Unauthorized user');
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.checkUser = checkUser;
// @desc Add to User cart
// @route POST /api/users/cart
// @access Private
const addToUserCart = async (req, res) => {
    try {
        const user = await user_1.default.findById(req.user.id);
        if (!user) {
            res.status(404);
            throw new Error('No user found');
        }
        else {
            const { product, quantity } = req.body;
            const item = user.cart.find(i => i.product._id == product);
            if (item) {
                item.quantity += +quantity;
                user.cart = user.cart.map(i => (i.product === item.product ? item : i));
            }
            else {
                user.cart.push({ product, quantity });
            }
            const addedToCart = await user.save();
            res.status(201).json({ cart: addedToCart.cart });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.addToUserCart = addToUserCart;
// @desc Add to User cart
// @route GET /api/users/cart/:productId
// @access Private
const removeFromUserCart = async (req, res) => {
    try {
        const user = await user_1.default.findById(req.user.id);
        if (!user) {
            res.status(404);
            throw new Error('No user found');
        }
        else {
            const { productId } = req.params;
            const deleteItem = user.cart.find(i => i.product._id == productId);
            if (deleteItem) {
                user.cart = user.cart.filter(item => item.product._id !== deleteItem.product._id);
            }
            else {
                res.status(500);
                throw new Error('Something went wrong');
            }
            const editedCart = await user.save();
            res.status(201).json({ cart: editedCart.cart });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.removeFromUserCart = removeFromUserCart;
// @desc Get all users by ADMIN
// @route GET /api/users/admin
// @access Private/Admin
const getAllUsers = async (req, res) => {
    try {
        const users = await user_1.default.find({});
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getAllUsers = getAllUsers;
// @desc Delete User Account
// @route Delete /api/users/user/:id
// @access Private
const deleteUser = async (req, res) => {
    try {
        await user_1.default.findByIdAndDelete(req.params.id);
        res.status(201).json({ message: 'Successfully Deleted account.' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteUser = deleteUser;
