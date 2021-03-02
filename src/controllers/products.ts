import { RequestHandler } from 'express';
import Product, { ProductType } from '../models/product';
import fs from 'fs';
import path from 'path';
import { ReviewInterface } from '../models/interface';

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
		const product: ProductType = await Product.findById(id);
		console.log(product);
		fs.unlinkSync(path.join(process.cwd(), product.image));
		await product.delete();
		res.status(201).json({ message: 'Successfully Deleted Product' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: error.message });
	}
};

// @desc Edit Single Products
// @route PUT /api/products/:id
// @access Private/Admin
export const editSingleProduct: RequestHandler = async (req, res) => {
	try {
		const product: ProductType = await Product.findById(req.params.id);

		if (!product) {
			res.status(404);
			throw new Error('No product found');
		} else {
			const { name, price, description, brand, category, numReviews, countInStock, image } = req.body;
			product.name = name;
			product.price = +price;
			product.brand = brand;
			product.category = category;
			product.numReviews = +numReviews;
			product.countInStock = +countInStock;
			product.description = description;
			product.image = image;
			const editedProduct = await product.save();
			res.status(201).json(editedProduct);
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// @desc Create Single Products
// @route POST /api/products
// @access Private/Admin
export const createProduct: RequestHandler = async (req, res) => {
	try {
		const { name, price, image, brand, category, description } = req.body;
		const product = new Product({
			name,
			price,
			user: req.user.id,
			image,
			brand,
			category,
			numReviews: 0,
			description,
			countInStock: 0
		});

		const createdProduct = await product.save();
		res.status(201).json(createdProduct);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// @desc Create new Review
// @route POST /api/products/:id/reviews
// @access Private
export const createProductReview: RequestHandler = async (req, res) => {
	try {
		const { rating, comment, name } = req.body;
		const product: ProductType = await Product.findById(req.params.id);
		if (!product) {
			res.status(404);
			throw new Error('No product found');
		} else {
			const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user.id);

			if (alreadyReviewed) {
				res.status(400);
				throw new Error('Product already reviewed');
			} else {
				const review: ReviewInterface = {
					name,
					rating: +rating,
					user: req.user.id,
					comment
				};

				product.reviews.push(review);
				product.numReviews = product.reviews.length;
				product.rating = product.reviews.reduce((acc, current) => current.rating + acc, 0) / product.numReviews;
				await product.save();
				res.status(201).json({ message: 'Review added' });
			}
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
