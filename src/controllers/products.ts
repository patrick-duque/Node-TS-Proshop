import { RequestHandler } from 'express';

import products from '../data/products';

interface GetSingleProductParams {
  id: string;
}

export const getProducts: RequestHandler = (req, res) => {
  return res.status(200).json({ products });
};

export const getSingleProduct: RequestHandler<GetSingleProductParams> = (req, res) => {
  const id = req.params.id;
  const product = products.find(p => p._id === id);
  return res.status(200).json({ product });
};
