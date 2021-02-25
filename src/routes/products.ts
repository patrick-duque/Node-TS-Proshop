import { Router } from 'express';
import * as productController from '../controllers/products';
import { admin, protect } from '../middleware/authMiddleware';

const router = Router();

router.get('/', productController.getProducts);
router.get('/:id', productController.getSingleProduct);
router.delete('/:id', protect, admin, productController.deleteSingleProduct);
router.put('/:id', protect, admin, productController.editSingleProduct);
router.post('/', protect, admin, productController.createProduct);

export default router;
