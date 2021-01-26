import { RequestHandler } from 'express';
import Product from '../models/product';

interface GetSingleProductParams {
  id: string;
}

export const getProducts: RequestHandler = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getSingleProduct: RequestHandler<GetSingleProductParams> = (req, res) => {
  try {
    const id = req.params.id;
    const product = Product.findById(id);
    if (product) {
      return res.status(200).json({ product });
    }
    return res.status(404).json({ message: 'No product found' });
  } catch (error) {
    return res.status(500).json(error);
  }
};
