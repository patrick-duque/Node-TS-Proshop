import { Router } from 'express';
import * as orderController from '../controllers/orders';
import protect from '../middleware/authMiddleware';

const router = Router();

router.post('/', protect, orderController.addOrder);
router.get('/', protect, orderController.getOrdersByAdmin);
router.get('/user', protect, orderController.getOrdersByUser);

export default router;
