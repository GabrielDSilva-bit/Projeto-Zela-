import { api } from './api';
import * as SecureStore from 'expo-secure-store';

interface CadastroData {
  nome: string;
  cpf: string;
  email: string;
  senha: string;
  confirmarSenha: string;
  termosAceitos: boolean;
}

interface LoginData {
  identificador: string;
  senha: string;
}

export const authService = {
  async cadastrar(data: CadastroData) {
    const response = await api.post('/auth/cadastro', data);
    const { token, usuario } = response.data.data;
    await SecureStore.setItemAsync('zela_token', token);
    return { token, usuario };
  },

  async login(data: LoginData) {
    const response = await api.post('/auth/login', data);
    const { token, usuario } = response.data.data;
    await SecureStore.setItemAsync('zela_token', token);
    return { token, usuario };
  },

  async me() {
    const response = await api.get('/auth/me');
    return response.data.data;
  },

  async logout() {
    await SecureStore.deleteItemAsync('zela_token');
  },
};
