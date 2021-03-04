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
const orderController = __importStar(require("../controllers/orders"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.Router();
router.post('/', authMiddleware_1.protect, orderController.addOrder);
router.get('/', authMiddleware_1.protect, authMiddleware_1.admin, orderController.getOrdersByAdmin);
router.get('/user', authMiddleware_1.protect, orderController.getOrdersByUser);
router.put('/:id/pay', authMiddleware_1.protect, orderController.updateOrderToPaid);
router.get('/:id/deliver', authMiddleware_1.protect, authMiddleware_1.admin, orderController.updateOrderToDelivered);
exports.default = router;
