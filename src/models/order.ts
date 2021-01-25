import { Schema, Document, model } from 'mongoose';

interface OrderItems {
  name: string;
  quantity: number;
  image: string;
  price: number;
  product: Schema.Types.ObjectId;
}

interface Address {
  address: string;
  city: string;
  postalCode: number;
}

interface PaymentResult {
  id: string;
  status: string;
  update_time: string;
  email_address: string;
}

export interface Order extends Document {
  _id: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  orderItems: OrderItems[];
  shippingAddress: Address;
  shippingPrice: number;
  paymentResult: PaymentResult;
  paymentMethod: string;
  taxPrice: number;
  totalPrice: number;
  isPaid: boolean;
  isDelivered: boolean;
  deliveredAt: Date;
  paidAt: Date;
}

const orderSchema: Schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    orderItems: [
      {
        name: {
          type: String,
          required: true
        },
        quantity: {
          type: Number,
          required: true
        },
        image: {
          type: String,
          required: true
        },
        price: {
          type: Number,
          required: true
        },
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        }
      }
    ],
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: Number, required: true }
    },
    paymentMethod: {
      type: String,
      required: true
    },
    paymentResult: {
      id: {
        type: String
      },
      status: {
        type: String
      },
      update_time: {
        type: String
      },
      email_address: {
        type: String
      }
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false
    },
    paidAt: {
      type: Date
    },
    isDelivered: {
      type: Boolean,
      default: false
    },
    deliveredAt: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

const Order = model<Order>('Order', orderSchema);

export default Order;
