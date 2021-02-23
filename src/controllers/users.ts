import { RequestHandler } from 'express';
import User, { UserType } from '../models/user';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken';

interface LoginParams {
	email: string;
	password: string;
}

const setExpiry = () => Math.floor(Date.now()) + 60 * 60 * 1000;

// @desc Login User
// @route POST /api/users/login
// @access Public
export const loginUser: RequestHandler<any, any, LoginParams> = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user: UserType = await User.findOne({ email });
		if (user && (await bcrypt.compare(password, user.password))) {
			const { email, isAdmin, _id, cart, name } = user;
			const token = generateToken(_id);
			const expiry = setExpiry();
			res.status(200).json({ email, isAdmin, _id, cart, name, token, expiry });
		} else {
			res.status(401).json({ message: 'Invalid Credentials' });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// @desc Edit User
// @route PUT /api/users/editUser
// @access Private
export const editUserProfile: RequestHandler = async (req, res) => {
	try {
		const user: UserType = await User.findById(req.user.id);
		if (user) {
			user.name = req.body.name || user.name;
			user.email = req.body.email || user.email;

			if (req.body.password) {
				user.password = bcrypt.hashSync(req.body.password, 10);
			}
			const updatedUser = await user.save();
			const { email, isAdmin, _id, cart, name } = updatedUser;
			const token = generateToken(_id);
			const expiry = setExpiry();
			res.status(200).json({ email, isAdmin, _id, cart, name, token, expiry });
		} else {
			res.status(404).json({ message: 'No user found' });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// @desc Register new User
// @route POST /api/users/register
// @access Public
export const registerUser: RequestHandler = async (req, res) => {
	try {
		const userExist: UserType = await User.findOne({ email: req.body.email });

		if (userExist) {
			res.status(400);
			throw new Error('User already exist');
		} else {
			const user = await User.create({
				name: req.body.name,
				email: req.body.email,
				password: bcrypt.hashSync(req.body.password, 10)
			});
			if (user) {
				const { email, isAdmin, _id, cart, name } = user;
				const token = generateToken(_id);
				const expiry = setExpiry();
				res.status(201).json({ email, isAdmin, _id, cart, name, token, expiry });
			} else {
				res.status(400);
				throw new Error('Invalid data');
			}
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// @desc Check User auth
// @route GET /api/users/user
// @access Private
export const checkUser: RequestHandler = async (req, res) => {
	try {
		if (req.headers.authorization) {
			res.status(200).json({ auth: true });
		} else {
			res.status(401);
			throw new Error('Unauthorized user');
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// @desc Add to User cart
// @route POST /api/users/cart
// @access Private
export const addToUserCart: RequestHandler = async (req, res) => {
	try {
		const user: UserType = await User.findById(req.user.id);
		if (!user) {
			res.status(404);
			throw new Error('No user found');
		} else {
			const { product, quantity } = req.body;
			const item = user.cart.find(i => i.product._id == product);
			if (item) {
				item.quantity += +quantity;
				user.cart = user.cart.map(i => (i.product === item.product ? item : i));
			} else {
				user.cart.push({ product, quantity });
			}
			const addedToCart = await user.save();
			res.status(201).json({ cart: addedToCart.cart });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// @desc Add to User cart
// @route GET /api/users/cart/:productId
// @access Private
export const removeFromUserCart: RequestHandler = async (req, res) => {
	try {
		const user: UserType = await User.findById(req.user.id);
		if (!user) {
			res.status(404);
			throw new Error('No user found');
		} else {
			const { productId } = req.params;
			const deleteItem = user.cart.find(i => i.product._id == productId);
			if (deleteItem) {
				user.cart = user.cart.filter(item => item.product._id !== deleteItem.product._id);
			} else {
				res.status(500);
				throw new Error('Something went wrong');
			}
			const editedCart = await user.save();
			res.status(201).json({ cart: editedCart.cart });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// @desc Get all users by ADMIN
// @route GET /api/users/admin
// @access Private/Admin
export const getAllUsers: RequestHandler = async (req, res) => {
	try {
		const users: UserType[] = await User.find({});
		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// @desc Delete User Account
// @route Delete /api/users/user
// @access Private
export const deleteUser: RequestHandler = async (req, res) => {
	try {
		await User.findByIdAndDelete(req.user.id);
		res.status(201).json({ message: 'Successfully Deleted account.' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
