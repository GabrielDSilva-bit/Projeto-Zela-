import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '../utils/AppError';

interface TokenPayload {
  sub: string;
  email: string;
  iat: number;
  exp: number;
}

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export function authMiddleware(req: Request, _res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) throw new AppError('Token não fornecido', 401);

  const [, token] = authHeader.split(' ');
  if (!token) throw new AppError('Token mal formatado', 401);

  try {
    const secret = process.env.JWT_SECRET!;
    const decoded = jwt.verify(token, secret) as TokenPayload;
    req.userId = decoded.sub;
    return next();
  } catch {
    throw new AppError('Token inválido ou expirado', 401);
  }
}