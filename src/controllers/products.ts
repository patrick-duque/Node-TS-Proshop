import { RequestHandler } from 'express';
import Product from '../models/product';

interface GetSingleProductParams {
  id: string;
}

export const getProducts: RequestHandler = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSingleProduct: RequestHandler<GetSingleProductParams> = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (product) {
      return res.status(200).json(product);
    }
    return res.status(404).json({ message: 'No product found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
