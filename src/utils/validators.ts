import { z } from 'zod';

export function validarCPF(cpf: string): boolean {
  const cpfLimpo = cpf.replace(/\D/g, '');
  if (cpfLimpo.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(cpfLimpo)) return false;

  let soma = 0;
  let resto;

  for (let i = 1; i <= 9; i++) {
    soma += parseInt(cpfLimpo.substring(i - 1, i)) * (11 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpfLimpo.substring(9, 10))) return false;

  soma = 0;
  for (let i = 1; i <= 10; i++) {
    soma += parseInt(cpfLimpo.substring(i - 1, i)) * (12 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpfLimpo.substring(10, 11))) return false;

  return true;
}

export const cadastroSchema = z
  .object({
    nome: z.string({ required_error: 'Nome é obrigatório' }).min(3).max(120).trim(),
    cpf: z.string({ required_error: 'CPF é obrigatório' })
      .refine((cpf) => validarCPF(cpf), { message: 'CPF inválido' }),
    email: z.string({ required_error: 'E-mail é obrigatório' })
      .email('E-mail inválido').toLowerCase().trim(),
    senha: z.string({ required_error: 'Senha é obrigatória' })
      .min(8, 'A senha deve ter no mínimo 8 caracteres')
      .regex(/[A-Z]/, 'A senha deve conter ao menos uma letra maiúscula')
      .regex(/[a-z]/, 'A senha deve conter ao menos uma letra minúscula')
      .regex(/[0-9]/, 'A senha deve conter ao menos um número'),
    confirmarSenha: z.string({ required_error: 'Confirmação de senha é obrigatória' }),
    termosAceitos: z.boolean({ required_error: 'É necessário aceitar os termos' })
      .refine((v) => v === true, { message: 'É necessário aceitar os termos de uso' }),
  })
  .refine((data) => data.senha === data.confirmarSenha, {
    message: 'As senhas não coincidem',
    path: ['confirmarSenha'],
  });

export const loginSchema = z.object({
  identificador: z.string({ required_error: 'CPF ou E-mail é obrigatório' }).trim(),
  senha: z.string({ required_error: 'Senha é obrigatória' }).min(1),
});

export const denunciaSchema = z.object({
  titulo: z.string().min(3).max(120),
  descricao: z.string().min(10).max(1000),
  categoria: z.enum(['BURACO', 'ILUMINACAO', 'LIXO', 'SANEAMENTO', 'CALCADA', 'OUTROS']),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  endereco: z.string().max(255).optional(),
})