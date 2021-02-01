import { RequestHandler } from 'express';
import jwt, { decode } from 'jsonwebtoken';
import User from '../models/user';

const protect: RequestHandler = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (token && token.startsWith('Bearer')) {
      const decoded: any = jwt.verify(token.split(' ')[1], process.env.JWT_KEY as string);
      if (decoded.exp * 1000 >= Date.now()) {
        next();
      } else {
        console.log(decoded);
        res.status(401);
        throw new Error('Expired Token');
      }
    }

    if (!token) {
      res.status(401);
      throw new Error('Unauthorized user');
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default protect;
