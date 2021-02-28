import { Router } from 'express';
import * as orderController from '../controllers/orders';
import { protect, admin } from '../middleware/authMiddleware';

const router = Router();

router.post('/', protect, orderController.addOrder);
router.get('/', protect, admin, orderController.getOrdersByAdmin);
router.get('/user', protect, orderController.getOrdersByUser);
router.put('/:id/pay', protect, orderController.updateOrderToPaid);
router.get('/:id/deliver', protect, admin, orderController.updateOrderToDelivered);

export default router;
