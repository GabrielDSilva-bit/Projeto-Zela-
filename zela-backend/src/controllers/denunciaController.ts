import { Request, Response } from 'express';
import { DenunciaService } from '../services/denunciaService';
import { denunciaSchema } from '../utils/validators';
import { AppError } from '../utils/AppError';
import { StatusDenuncia } from '../models/Denuncia';

export class DenunciaController {
  static async criar(req: Request, res: Response) {
    const parsed = denunciaSchema.safeParse(req.body);
    if (!parsed.success) {
      const msg = parsed.error.issues.map((e) => e.message).join(', ');
      throw new AppError(`Dados inválidos: ${msg}`, 422);
    }

    const denuncia = await DenunciaService.criar({
      usuario_id: req.userId!,
      ...parsed.data,
    });

    return res.status(201).json({
      success: true,
      message: 'Denúncia registrada com sucesso',
      data: denuncia,
    });
  }

  static async listarMinhas(req: Request, res: Response) {
    const lista = await DenunciaService.listarDoUsuario(req.userId!);
    return res.json({ success: true, data: lista });
  }

  static async listarTodas(_req: Request, res: Response) {
    const lista = await DenunciaService.listarTodas();
    return res.json({ success: true, data: lista });
  }

  static async buscar(req: Request, res: Response) {
    const denuncia = await DenunciaService.buscarPorId(req.params.id, req.userId!);
    return res.json({ success: true, data: denuncia });
  }

  static async atualizarStatus(req: Request, res: Response) {
    const { status } = req.body as { status: StatusDenuncia };
    const denuncia = await DenunciaService.atualizarStatus(req.params.id, status);
    return res.json({ success: true, data: denuncia });
  }
}