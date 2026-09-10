import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

import authRoutes from './routes/authRoutes';
import denunciaRoutes from './routes/denunciaRoutes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, message: 'Muitas requisições, tente mais tarde' },
});
app.use(limiter);

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, message: 'Muitas tentativas, aguarde 15 minutos' },
});
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/cadastro', authLimiter);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/auth', authRoutes);
app.use('/api/denuncias', denunciaRoutes);

app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Rota não encontrada' });
});

app.use(errorHandler);

export default app;