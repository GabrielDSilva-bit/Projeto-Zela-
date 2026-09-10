import 'dotenv/config';
import app from './app';
import { pool } from './config/database';

const PORT = Number(process.env.PORT) || 3333;

async function start() {
  try {
    await pool.query('SELECT 1');
    console.log('Banco de dados conectado');

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
      console.log(`Acesse no celular pelo IP da sua máquina:${PORT}`);
    });
  } catch (error) {
    console.error('Falha ao iniciar servidor:', error);
    process.exit(1);
  }
}

process.on('SIGINT', async () => {
  console.log('\nEncerrando servidor...');
  await pool.end();
  process.exit(0);
});

start();