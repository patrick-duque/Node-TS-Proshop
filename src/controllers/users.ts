import { RequestHandler } from 'express';
import User, { UserType } from '../models/user';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken';

interface LoginParams {
  email: string;
  password: string;
}

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
      res.status(200).json({ email, isAdmin, _id, cart, name, token });
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
      res.status(200).json({ email, isAdmin, _id, cart, name, token });
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
        res.status(201).json({ email, isAdmin, _id, cart, name, token });
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
// @route GET /api/users/user/:id
// @access Public
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
