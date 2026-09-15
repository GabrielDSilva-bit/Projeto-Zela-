import { DenunciaModel, CategoriaDenuncia, StatusDenuncia } from '../models/Denuncia';
import { AppError } from '../utils/AppError';

interface CriarDenunciaInput {
  usuario_id: string;
  titulo: string;
  descricao: string;
  categoria: CategoriaDenuncia;
  latitude?: number;
  longitude?: number;
  endereco?: string;
  foto_url?: string;
}

export class DenunciaService {
  static async criar(input: CriarDenunciaInput) {
    return DenunciaModel.create(input);
  }

  static async listarDoUsuario(usuario_id: string) {
    return DenunciaModel.listByUser(usuario_id);
  }

  static async listarTodas() {
    return DenunciaModel.listAll();
  }

  static async buscarPorId(id: string, usuario_id: string, isAdmin = false) {
    const denuncia = await DenunciaModel.findById(id);
    if (!denuncia) throw new AppError('Denúncia não encontrada', 404);
    if (!isAdmin && denuncia.usuario_id !== usuario_id) {
      throw new AppError('Você não tem permissão para ver esta denúncia', 403);
    }
    return denuncia;
  }

  static async atualizarStatus(id: string, status: StatusDenuncia) {
    const denuncia = await DenunciaModel.findById(id);
    if (!denuncia) throw new AppError('Denúncia não encontrada', 404);
    return DenunciaModel.updateStatus(id, status);
  }
}
