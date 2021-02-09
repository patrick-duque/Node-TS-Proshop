import { Router } from 'express';
import * as userController from '../controllers/users';
import protect from '../middleware/authMiddleware';

const router = Router();

router.post('/login', userController.loginUser);
router.post('/register', userController.registerUser);
router.get('/user', protect, userController.checkUser);
router.put('/editUser', protect, userController.editUserProfile);
router.post('/cart', protect, userController.addToUserCart);

export default router;
