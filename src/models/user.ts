import autoPopulate from 'mongoose-autopopulate';
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
        _id: false,
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
userSchema.plugin(autoPopulate);
const User = model<UserType>('User', userSchema);

export default User;
