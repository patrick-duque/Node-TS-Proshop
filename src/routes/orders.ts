import { Router } from 'express';
import * as orderController from '../controllers/orders';
import protect from '../middleware/authMiddleware';

const router = Router();

router.post('/', protect, orderController.addOrder);

export default router;
