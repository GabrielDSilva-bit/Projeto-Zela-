import { Router } from 'express';
import { DenunciaController } from '../controllers/denunciaController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

router.use(authMiddleware);

router.post('/', asyncHandler(DenunciaController.criar));
router.get('/minhas', asyncHandler(DenunciaController.listarMinhas));
router.get('/', asyncHandler(DenunciaController.listarTodas));
router.get('/:id', asyncHandler(DenunciaController.buscar));
router.patch('/:id/status', asyncHandler(DenunciaController.atualizarStatus));

export default router;