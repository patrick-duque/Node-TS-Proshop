"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.admin = exports.protect = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const user_1 = __importDefault(require("../models/user"));
const protect = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (token && token.startsWith('Bearer')) {
            const decoded = jsonwebtoken_1.verify(token.split(' ')[1], process.env.JWT_KEY);
            if (decoded.exp * 1000 >= Date.now()) {
                req.user = decoded;
                next();
            }
            else {
                res.status(401);
                throw new Error('Expired Token');
            }
        }
        else {
            res.status(401);
            throw new Error('Unauthorized user');
        }
        if (!token) {
            res.status(401);
            throw new Error('Unauthorized user');
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.protect = protect;
const admin = async (req, res, next) => {
    try {
        const admin = await user_1.default.findById(req.user.id);
        if (req.user && admin.isAdmin) {
            next();
        }
        else {
            res.status(401);
            throw new Error('Unauthorized user');
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.admin = admin;
