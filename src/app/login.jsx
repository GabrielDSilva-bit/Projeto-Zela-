import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, Feather } from '@expo/vector-icons';

export default function LoginScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.container}>
        
        {/* Cabeçalho com Voltar + Logo Centralizada */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#1E1E1E" />
          </TouchableOpacity>

          <View style={styles.logoBadge}>
            <Text style={styles.logoBadgeText}>ZELA</Text>
          </View>

          {/* Espaçador invisível para manter a logo perfeitamente no centro */}
          <View style={{ width: 40 }} />
        </View>

        {/* Conteúdo do Formulário */}
        <View style={styles.content}>
          <Text style={styles.title}>Acessar a Conta</Text>

          <View style={styles.inputContainer}>
            <Feather name="mail" size={20} color="#00C5D6" style={styles.icon} />
            <TextInput 
              style={styles.input} 
              placeholder="CPF ou E-mail" 
              placeholderTextColor="#A0A0A0"
            />
          </View>

          <View style={styles.inputContainer}>
            <Feather name="lock" size={20} color="#00C5D6" style={styles.icon} />
            <TextInput 
              style={styles.input} 
              placeholder="Senha" 
              secureTextEntry={true} 
              placeholderTextColor="#A0A0A0"
            />
            <Feather name="eye-off" size={20} color="#A0A0A0" />
          </View>

          <TouchableOpacity>
            <Text style={styles.forgotPassword}>Esqueci minha senha</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} activeOpacity={0.8}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        </View>

        {/* Rodapé */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Não tem conta? </Text>
          <TouchableOpacity onPress={() => router.push('/cadastro')}>
            <Text style={styles.footerLink}>Cadastre-se!</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 24,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  logoBadge: {
    backgroundColor: '#1C2833',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 8,
  },
  logoBadgeText: {
    color: '#00C5D6',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 2,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1E1E1E',
    marginBottom: 32,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    borderWidth: 1.5,
    borderColor: '#00C5D6',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  icon: { marginRight: 12 },
  input: { flex: 1, fontSize: 16, color: '#1E1E1E' },
  forgotPassword: {
    color: '#00C5D6',
    textAlign: 'right',
    fontWeight: '600',
    marginBottom: 28,
  },
  button: {
    height: 52,
    backgroundColor: '#00C5D6',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  footerText: { fontSize: 15, color: '#666666' },
  footerLink: { fontSize: 15, color: '#FF4D6D', fontWeight: 'bold' },
});