import { RequestHandler } from 'express';
import { verify } from 'jsonwebtoken';

const protect: RequestHandler = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (token && token.startsWith('Bearer')) {
      const decoded: any = verify(token.split(' ')[1], process.env.JWT_KEY as string);
      if (decoded.exp * 1000 >= Date.now()) {
        req.user = decoded;
        next();
      } else {
        res.status(401);
        throw new Error('Expired Token');
      }
    } else {
      res.status(401);
      throw new Error('Unauthorized user');
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
