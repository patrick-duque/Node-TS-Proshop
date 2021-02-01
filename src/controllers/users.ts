import { RequestHandler } from 'express';
import User, { UserType } from '../models/user';
import bcrypt from 'bcryptjs';

interface LoginParams {
  email: string;
  password: string;
}

export const login: RequestHandler<any, any, LoginParams> = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    const user: UserType = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const { email, isAdmin, _id, cart, name } = user;
      res.status(200).json({ email, isAdmin, _id, cart, name, token: null });
    } else {
      res.status(401).json({ message: 'Invalid Credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
