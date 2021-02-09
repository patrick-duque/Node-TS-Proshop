import { NextFunction } from 'express';
import { Schema, Document, model } from 'mongoose';
import { UserInterface } from './interface';

export interface UserType extends Document, UserInterface {}

const userSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    cart: [
      {
        product: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
          autopopulate: true
        },
        quantity: {
          type: Number
        }
      }
    ]
  },
  {
    timestamps: true
  }
);
userSchema.plugin(require('mongoose-autopopulate'));
const User = model<UserType>('User', userSchema);

export default User;
