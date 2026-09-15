import { Request, Response } from 'express';
import { AuthService } from '../services/authService';
import { cadastroSchema, loginSchema } from '../utils/validators';
import { AppError } from '../utils/AppError';

export class AuthController {
  static async cadastrar(req: Request, res: Response) {
    const parsed = cadastroSchema.safeParse(req.body);
    if (!parsed.success) {
      const erros = parsed.error.issues.map((e) => e.message).join(', ');
      throw new AppError(`Dados inválidos: ${erros}`, 422);
    }

    const { nome, cpf, email, senha, termosAceitos } = parsed.data;
    const resultado = await AuthService.cadastrar({ nome, cpf, email, senha, termosAceitos });

    return res.status(201).json({
      success: true,
      message: 'Usuário cadastrado com sucesso',
      data: resultado,
    });
  }

  static async login(req: Request, res: Response) {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) throw new AppError('Dados de login inválidos', 422);

    const resultado = await AuthService.login(parsed.data);
    return res.status(200).json({
      success: true,
      message: 'Login realizado com sucesso',
      data: resultado,
    });
  }

  static async me(req: Request, res: Response) {
    const usuario = await AuthService.me(req.userId!);
    return res.status(200).json({ success: true, data: usuario });
  }
}
