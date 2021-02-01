import { Router } from 'express';
import * as userController from '../controllers/users';
import protect from '../middleware/authMiddleware';

const router = Router();

router.post('/login', userController.login);
router.get('/:id', protect, userController.getUserProfile);

export default router;
