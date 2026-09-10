import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import { UserModel, UserPublic } from '../models/User';
import { AppError } from '../utils/AppError';

interface CadastroInput {
  nome: string;
  cpf: string;
  email: string;
  senha: string;
  termosAceitos: boolean;
}

interface LoginInput {
  identificador: string;
  senha: string;
}

interface AuthResponse {
  usuario: UserPublic;
  token: string;
}

export class AuthService {
  private static readonly SALT_ROUNDS = 12;

  static async cadastrar(input: CadastroInput): Promise<AuthResponse> {
    const cpfLimpo = input.cpf.replace(/\D/g, '');
    const emailNormalizado = input.email.toLowerCase().trim();

    const emailExistente = await UserModel.findByEmail(emailNormalizado);
    if (emailExistente) throw new AppError('Este e-mail já está cadastrado', 409);

    const cpfExistente = await UserModel.findByCpf(cpfLimpo);
    if (cpfExistente) throw new AppError('Este CPF já está cadastrado', 409);

    const senha_hash = await bcrypt.hash(input.senha, this.SALT_ROUNDS);

    const usuario = await UserModel.create({
      nome: input.nome,
      cpf: cpfLimpo,
      email: emailNormalizado,
      senha_hash,
      termos_aceitos: input.termosAceitos,
    });

    const token = this.gerarToken(usuario.id, usuario.email);
    return { usuario, token };
  }

  static async login(input: LoginInput): Promise<AuthResponse> {
    const identificador = input.identificador.trim();
    const isEmail = identificador.includes('@');

    const usuario = isEmail
      ? await UserModel.findByEmail(identificador)
      : await UserModel.findByCpf(identificador);

    if (!usuario) throw new AppError('Credenciais inválidas', 401);

    const senhaValida = await bcrypt.compare(input.senha, usuario.senha_hash);
    if (!senhaValida) throw new AppError('Credenciais inválidas', 401);

    const token = this.gerarToken(usuario.id, usuario.email);
    return { usuario: UserModel.toPublic(usuario), token };
  }

  static async me(userId: string): Promise<UserPublic> {
    const usuario = await UserModel.findById(userId);
    if (!usuario) throw new AppError('Usuário não encontrado', 404);
    return UserModel.toPublic(usuario);
  }

  private static gerarToken(userId: string, email: string): string {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error('JWT_SECRET não configurado');

    const options: SignOptions = {
      expiresIn: (process.env.JWT_EXPIRES_IN || '7d') as SignOptions['expiresIn'],
    };

    return jwt.sign({ sub: userId, email }, secret, options);
  }
}