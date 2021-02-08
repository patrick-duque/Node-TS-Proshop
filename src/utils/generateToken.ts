import jwt from 'jsonwebtoken';

export default (id: string) => {
  return jwt.sign({ id }, process.env.JWT_KEY as string, { expiresIn: '1hr' });
};
