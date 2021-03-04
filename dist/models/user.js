"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_autopopulate_1 = __importDefault(require("mongoose-autopopulate"));
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
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
                type: mongoose_1.Schema.Types.ObjectId,
                required: true,
                ref: 'Product',
                autopopulate: true
            },
            quantity: {
                type: Number
            }
        }
    ]
}, {
    timestamps: true
});
userSchema.plugin(mongoose_autopopulate_1.default);
const User = mongoose_1.model('User', userSchema);
exports.default = User;
