import { Schema } from 'mongoose';
import { ProductType } from './product';

export interface CartItemsInterface {
	quantity: number;
	product: ProductType;
}

export interface ProductInterface {
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
	reviews: ReviewInterface[];
}

export interface ReviewInterface {
	name: string;
	rating: number;
	comment: string;
	user: Schema.Types.ObjectId;
}

export interface UserInterface {
	name: string;
	email: string;
	password: string;
	isAdmin?: boolean;
	cart: CartItemsInterface[];
}

export interface OrderInterface {
	user: Schema.Types.ObjectId;
	orderItems: CartItemsInterface[];
	shippingAddress: AddressInterface;
	shippingPrice: number;
	paymentResult: PaymentResultInterface;
	paymentMethod: string;
	totalPrice: number;
	isPaid: boolean;
	isDelivered: boolean;
	deliveredAt: Date;
	paidAt: Date;
}

export interface PaymentResultInterface {
	id: string;
	status: string;
	update_time: string;
	email_address: string;
}

export interface AddressInterface {
	address: string;
	city: string;
	postalCode: number;
}
