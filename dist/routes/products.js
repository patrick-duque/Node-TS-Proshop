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
const productController = __importStar(require("../controllers/products"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.Router();
router.get('/', productController.getProducts);
router.get('/:id', productController.getSingleProduct);
router.delete('/:id', authMiddleware_1.protect, authMiddleware_1.admin, productController.deleteSingleProduct);
router.put('/:id', authMiddleware_1.protect, authMiddleware_1.admin, productController.editSingleProduct);
router.post('/', authMiddleware_1.protect, authMiddleware_1.admin, productController.createProduct);
router.post('/:id/reviews', authMiddleware_1.protect, productController.createProductReview);
exports.default = router;
