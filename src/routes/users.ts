import { Router } from 'express';
import * as userController from '../controllers/users';
import { protect, admin } from '../middleware/authMiddleware';

const router = Router();

router.post('/login', userController.loginUser);
router.post('/register', userController.registerUser);
router.get('/user', protect, userController.checkUser);
router.put('/editUser', protect, userController.editUserProfile);
router.post('/cart', protect, userController.addToUserCart);
router.get('/cart/:productId', protect, userController.removeFromUserCart);
router.get('/users/admin', protect, admin, userController.getAllUsers);
router.delete('/user/:id', protect, admin, userController.deleteUser);

export default router;
