"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProductReview = exports.createProduct = exports.editSingleProduct = exports.deleteSingleProduct = exports.getSingleProduct = exports.getProducts = void 0;
const product_1 = __importDefault(require("../models/product"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// @desc Get All Products
// @route GET /api/products
// @access Public
const getProducts = async (req, res) => {
    try {
        let keywords = {};
        const pageSize = 6;
        const page = req.query.pageNumber ? +req.query.pageNumber : 1;
        if (req.query.keywords) {
            keywords = { name: { $regex: req.query.keywords, $options: 'i' } };
        }
        const count = await product_1.default.countDocuments({ ...keywords });
        const products = await product_1.default.find({ ...keywords }).limit(pageSize).skip(pageSize * (page - 1));
        res.status(200).json({ products, page, pages: Math.ceil(count / pageSize) });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getProducts = getProducts;
// @desc Get Single Products
// @route GET /api/products/:id
// @access Public
const getSingleProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await product_1.default.findById(id);
        if (product) {
            res.status(200).json(product);
        }
        else {
            res.status(404).json({ message: 'No product found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getSingleProduct = getSingleProduct;
// @desc Delete Single Products
// @route DELETE /api/products/:id
// @access Private/Admin
const deleteSingleProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await product_1.default.findById(id);
        console.log(product);
        fs_1.default.unlinkSync(path_1.default.join(process.cwd(), product.image));
        await product.delete();
        res.status(201).json({ message: 'Successfully Deleted Product' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};
exports.deleteSingleProduct = deleteSingleProduct;
// @desc Edit Single Products
// @route PUT /api/products/:id
// @access Private/Admin
const editSingleProduct = async (req, res) => {
    try {
        const product = await product_1.default.findById(req.params.id);
        if (!product) {
            res.status(404);
            throw new Error('No product found');
        }
        else {
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
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.editSingleProduct = editSingleProduct;
// @desc Create Single Products
// @route POST /api/products
// @access Private/Admin
const createProduct = async (req, res) => {
    try {
        const { name, price, image, brand, category, description } = req.body;
        const product = new product_1.default({
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
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.createProduct = createProduct;
// @desc Create new Review
// @route POST /api/products/:id/reviews
// @access Private
const createProductReview = async (req, res) => {
    try {
        const { rating, comment, name } = req.body;
        const product = await product_1.default.findById(req.params.id);
        if (!product) {
            res.status(404);
            throw new Error('No product found');
        }
        else {
            const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user.id);
            if (alreadyReviewed) {
                res.status(400);
                throw new Error('Product already reviewed');
            }
            else {
                const review = {
                    name,
                    rating: +rating,
                    user: req.user.id,
                    comment
                };
                product.reviews.push(review);
                product.numReviews = product.reviews.length;
                product.rating = product.reviews.reduce((acc, current) => current.rating + acc, 0) / product.numReviews;
                await product.save();
                res.status(201).json({ review: product.reviews[product.reviews.length - 1] });
            }
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.createProductReview = createProductReview;
