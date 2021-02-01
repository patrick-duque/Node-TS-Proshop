import { Router } from 'express';
import * as userController from '../controllers/users';

const router = Router();

router.post('/login', userController.login);

export default router;
