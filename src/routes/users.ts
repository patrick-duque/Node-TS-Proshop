import { Router } from 'express';
import * as userController from '../controllers/users';
import protect from '../middleware/authMiddleware';

const router = Router();

router.post('/login', userController.loginUser);
router.post('/register', userController.registerUser);
router.get('/:id', protect, userController.getUserProfile);

export default router;
