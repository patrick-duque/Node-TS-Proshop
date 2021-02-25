import { Schema, Document, model } from 'mongoose';
import { ProductInterface } from './interface';

const reviewSchema = new Schema(
	{
		name: { type: String, required: true },
		rating: { type: Number, required: true },
		comment: { type: String, required: true }
	},
	{
		timestamps: true
	}
);

export interface ProductType extends Document, ProductInterface {}

const productSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'User'
		},
		name: {
			type: String,
			required: true
		},
		image: {
			type: String,
			required: true
		},
		description: {
			type: String,
			required: true
		},
		brand: {
			type: String,
			required: true
		},
		category: {
			type: String,
			required: true
		},
		price: {
			type: Number,
			required: true
		},
		countInStock: {
			type: Number,
			required: true
		},
		rating: {
			type: Number,
			default: 0
		},
		numReviews: {
			type: Number,
			default: 0
		},
		reviews: [ reviewSchema ]
	},
	{
		timestamps: true
	}
);

const Product = model<ProductType>('Product', productSchema);

export default Product;
