"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController = __importStar(require("../controllers/users"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.Router();
router.post('/login', userController.loginUser);
router.post('/register', userController.registerUser);
router.get('/user', authMiddleware_1.protect, userController.checkUser);
router.put('/editUser', authMiddleware_1.protect, userController.editUserProfile);
router.post('/cart', authMiddleware_1.protect, userController.addToUserCart);
router.get('/cart/:productId', authMiddleware_1.protect, userController.removeFromUserCart);
router.get('/users/admin', authMiddleware_1.protect, authMiddleware_1.admin, userController.getAllUsers);
router.delete('/user/:id', authMiddleware_1.protect, authMiddleware_1.admin, userController.deleteUser);
exports.default = router;
