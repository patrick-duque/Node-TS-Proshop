import { Schema } from 'mongoose';

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
  user?: Schema.Types.ObjectId;
  reviews?: ReviewInterface[];
}

export interface ReviewInterface {
  name: string;
  rating: number;
  comment: string;
}

export interface UserInterface {
  name: string;
  email: string;
  password: string;
  isAdmin?: boolean;
}

export interface OrderInterface {
  user: Schema.Types.ObjectId;
  orderItems: OrderItemsInterface[];
  shippingAddress: AddressInterface;
  shippingPrice: number;
  paymentResult: PaymentResultInterface;
  paymentMethod: string;
  taxPrice: number;
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

export interface OrderItemsInterface {
  name: string;
  quantity: number;
  image: string;
  price: number;
  product: Schema.Types.ObjectId;
}
