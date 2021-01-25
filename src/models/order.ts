import { Schema, Document, model } from 'mongoose';
import { OrderInterface } from './interface';

export interface Order extends Document, OrderInterface {}

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
