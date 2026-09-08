import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, Feather } from '@expo/vector-icons';

export default function LoginScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={28} color="#1E1E1E" />
      </TouchableOpacity>

      <Text style={styles.title}>Acessar a Conta</Text>

      <View style={styles.inputContainer}>
        <Feather name="mail" size={20} color="#00C5D6" style={styles.icon} />
        <TextInput style={styles.input} placeholder="CPF ou E-mail" />
      </View>

      <View style={styles.inputContainer}>
        <Feather name="lock" size={20} color="#00C5D6" style={styles.icon} />
        <TextInput style={styles.input} placeholder="Senha" secureTextEntry={true} />
        <Feather name="eye-off" size={20} color="#A0A0A0" />
      </View>

      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Esqueci minha senha</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Não tem conta? </Text>
        <TouchableOpacity onPress={() => router.push('/cadastro')}>
          <Text style={styles.footerLink}>Cadastre-se!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', padding: 24, paddingTop: 60 },
  backButton: { marginBottom: 40 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#1E1E1E', marginBottom: 40, textAlign: 'center' },
  inputContainer: {
    flexDirection: 'row', alignItems: 'center', height: 60, borderWidth: 1.5,
    borderColor: '#00C5D6', borderRadius: 12, paddingHorizontal: 16, marginBottom: 16,
  },
  icon: { marginRight: 12 },
  input: { flex: 1, fontSize: 16, color: '#1E1E1E' },
  forgotPassword: { color: '#00C5D6', textAlign: 'right', fontWeight: '600', marginBottom: 30 },
  button: { height: 56, backgroundColor: '#00C5D6', borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 40 },
  buttonText: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 'auto', marginBottom: 20 },
  footerText: { fontSize: 16, color: '#666666' },
  footerLink: { fontSize: 16, color: '#FF4D6D', fontWeight: 'bold' },
});