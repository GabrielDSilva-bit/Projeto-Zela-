import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

router.post('/cadastro', asyncHandler(AuthController.cadastrar));
router.post('/login', asyncHandler(AuthController.login));
router.get('/me', authMiddleware, asyncHandler(AuthController.me));

export default router;