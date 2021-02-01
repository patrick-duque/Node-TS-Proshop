import { RequestHandler } from 'express';
import User, { UserType } from '../models/user';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken';

interface LoginParams {
  email: string;
  password: string;
}

export const login: RequestHandler<any, any, LoginParams> = async (req, res) => {
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

export const getUserProfile: RequestHandler = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'No user found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
