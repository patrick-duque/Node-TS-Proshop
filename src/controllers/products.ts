import { RequestHandler } from 'express';
import Product from '../models/product';

interface GetSingleProductParams {
	id: string;
}

// @desc Get All Products
// @route GET /api/products
// @access Public
export const getProducts: RequestHandler = async (req, res) => {
	try {
		const products = await Product.find({});
		res.status(200).json(products);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// @desc Get Single Products
// @route GET /api/products/:id
// @access Public
export const getSingleProduct: RequestHandler<GetSingleProductParams> = async (req, res) => {
	try {
		const id = req.params.id;
		const product = await Product.findById(id);
		if (product) {
			res.status(200).json(product);
		} else {
			res.status(404).json({ message: 'No product found' });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// @desc Delete Single Products
// @route DELETE /api/products/:id
// @access Private/Admin
export const deleteSingleProduct: RequestHandler = async (req, res) => {
	try {
		const id = req.params.id;
		await Product.findByIdAndDelete(id);
		res.status(201).json({ message: 'Successfully Deleted Product' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
