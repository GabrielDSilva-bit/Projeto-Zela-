import { pool } from '../config/database';

export type StatusDenuncia = 'PENDENTE' | 'EM_ANALISE' | 'EM_ANDAMENTO' | 'RESOLVIDO' | 'CANCELADO';
export type CategoriaDenuncia = 'BURACO' | 'ILUMINACAO' | 'LIXO' | 'SANEAMENTO' | 'CALCADA' | 'OUTROS';

export interface Denuncia {
  id: string;
  usuario_id: string;
  titulo: string;
  descricao: string;
  categoria: CategoriaDenuncia;
  status: StatusDenuncia;
  latitude: number | null;
  longitude: number | null;
  endereco: string | null;
  foto_url: string | null;
  created_at: Date;
  updated_at: Date;
}

export class DenunciaModel {
  static async create(data: {
    usuario_id: string;
    titulo: string;
    descricao: string;
    categoria: CategoriaDenuncia;
    latitude?: number;
    longitude?: number;
    endereco?: string;
    foto_url?: string;
  }): Promise<Denuncia> {
    const result = await pool.query<Denuncia>(
      `INSERT INTO denuncias 
        (usuario_id, titulo, descricao, categoria, latitude, longitude, endereco, foto_url)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [
        data.usuario_id,
        data.titulo,
        data.descricao,
        data.categoria,
        data.latitude ?? null,
        data.longitude ?? null,
        data.endereco ?? null,
        data.foto_url ?? null,
      ]
    );
    return result.rows[0];
  }

  static async listByUser(usuario_id: string): Promise<Denuncia[]> {
    const result = await pool.query<Denuncia>(
      `SELECT * FROM denuncias WHERE usuario_id = $1 ORDER BY created_at DESC`,
      [usuario_id]
    );
    return result.rows;
  }

  static async listAll(): Promise<Denuncia[]> {
    const result = await pool.query<Denuncia>(
      `SELECT * FROM denuncias ORDER BY created_at DESC`
    );
    return result.rows;
  }

  static async findById(id: string): Promise<Denuncia | null> {
    const result = await pool.query<Denuncia>(
      `SELECT * FROM denuncias WHERE id = $1 LIMIT 1`,
      [id]
    );
    return result.rows[0] || null;
  }

  static async updateStatus(id: string, status: StatusDenuncia): Promise<Denuncia | null> {
    const result = await pool.query<Denuncia>(
      `UPDATE denuncias SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *`,
      [status, id]
    );
    return result.rows[0] || null;
  }
}