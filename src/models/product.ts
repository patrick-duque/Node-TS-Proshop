import { Schema, Document, model } from 'mongoose';

interface Review extends Document {
  name: string;
  rating: number;
  comment: string;
}

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

export interface Product extends Document {
  _id: Schema.Types.ObjectId;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
  user: Schema.Types.ObjectId;
  reviews: Review[];
}

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

const Product = model<Product>('Product', productSchema);

export default Product;
