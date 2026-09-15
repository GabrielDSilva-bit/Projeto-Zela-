import { pool } from '../config/database';

export interface User {
  id: string;
  nome: string;
  cpf: string;
  email: string;
  senha_hash: string;
  termos_aceitos: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface UserPublic {
  id: string;
  nome: string;
  email: string;
  cpf: string;
  created_at: Date;
}

export class UserModel {
  static async findByEmail(email: string): Promise<User | null> {
    const result = await pool.query<User>(
      'SELECT * FROM usuarios WHERE email = $1 LIMIT 1',
      [email.toLowerCase()]
    );
    return result.rows[0] || null;
  }

  static async findByCpf(cpf: string): Promise<User | null> {
    const cpfLimpo = cpf.replace(/\D/g, '');
    const result = await pool.query<User>(
      'SELECT * FROM usuarios WHERE cpf = $1 LIMIT 1',
      [cpfLimpo]
    );
    return result.rows[0] || null;
  }

  static async findById(id: string): Promise<User | null> {
    const result = await pool.query<User>(
      'SELECT * FROM usuarios WHERE id = $1 LIMIT 1',
      [id]
    );
    return result.rows[0] || null;
  }

  static async create(data: {
    nome: string;
    cpf: string;
    email: string;
    senha_hash: string;
    termos_aceitos: boolean;
  }): Promise<UserPublic> {
    const cpfLimpo = data.cpf.replace(/\D/g, '');
    const result = await pool.query<User>(
      `INSERT INTO usuarios (nome, cpf, email, senha_hash, termos_aceitos)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, nome, cpf, email, created_at`,
      [
        data.nome.trim(),
        cpfLimpo,
        data.email.toLowerCase().trim(),
        data.senha_hash,
        data.termos_aceitos,
      ]
    );
    return result.rows[0];
  }

  static toPublic(user: User): UserPublic {
    return {
      id: user.id,
      nome: user.nome,
      email: user.email,
      cpf: user.cpf,
      created_at: user.created_at,
    };
  }
}