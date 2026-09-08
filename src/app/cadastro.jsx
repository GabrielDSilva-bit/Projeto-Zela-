import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, Feather } from '@expo/vector-icons';

export default function CadastroScreen() {
  const router = useRouter();
  const [termosAceitos, setTermosAceitos] = useState(false);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={28} color="#1E1E1E" />
      </TouchableOpacity>

      <Text style={styles.title}>Criar Conta</Text>

      <View style={styles.inputContainer}>
        <Feather name="user" size={20} color="#00C5D6" style={styles.icon} />
        <TextInput style={styles.input} placeholder="Nome Completo" />
      </View>

      <View style={styles.inputContainer}>
        <Feather name="user" size={20} color="#00C5D6" style={styles.icon} />
        <TextInput style={styles.input} placeholder="CPF" keyboardType="numeric" />
      </View>

      <View style={styles.inputContainer}>
        <Feather name="mail" size={20} color="#00C5D6" style={styles.icon} />
        <TextInput style={styles.input} placeholder="E-mail" keyboardType="email-address" />
      </View>

      <View style={styles.inputContainer}>
        <Feather name="lock" size={20} color="#00C5D6" style={styles.icon} />
        <TextInput style={styles.input} placeholder="Senha" secureTextEntry={true} />
        <Feather name="eye-off" size={20} color="#A0A0A0" />
      </View>

      <View style={styles.inputContainer}>
        <Feather name="lock" size={20} color="#00C5D6" style={styles.icon} />
        <TextInput style={styles.input} placeholder="Confirmar senha" secureTextEntry={true} />
        <Feather name="eye-off" size={20} color="#A0A0A0" />
      </View>

      <TouchableOpacity 
        style={styles.checkboxContainer} 
        onPress={() => setTermosAceitos(!termosAceitos)}
      >
        <View style={[styles.checkbox, termosAceitos && styles.checkboxActive]}>
          {termosAceitos && <Feather name="check" size={16} color="#FFF" />}
        </View>
        <Text style={styles.checkboxText}>Li e concordo com os termos de Uso e Política de Privacidade</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Já tem conta? </Text>
        <TouchableOpacity onPress={() => router.push('/login')}>
          <Text style={styles.footerLink}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', padding: 24, paddingTop: 60 },
  backButton: { marginBottom: 40 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#1E1E1E', marginBottom: 40, textAlign: 'center' },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    borderWidth: 1.5,
    borderColor: '#00C5D6',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  icon: { marginRight: 12 },
  input: { flex: 1, fontSize: 16, color: '#1E1E1E' },
  checkboxContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 40, paddingRight: 20 },
  checkbox: {
    width: 24, height: 24, borderWidth: 2, borderColor: '#00C5D6', borderRadius: 6, marginRight: 12, justifyContent: 'center', alignItems: 'center'
  },
  checkboxActive: { backgroundColor: '#00C5D6' },
  checkboxText: { fontSize: 14, color: '#1E1E1E', flex: 1, lineHeight: 20 },
  button: { height: 56, backgroundColor: '#00C5D6', borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 30 },
  buttonText: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
  footer: { flexDirection: 'row', justifyContent: 'center' },
  footerText: { fontSize: 16, color: '#666666' },
  footerLink: { fontSize: 16, color: '#00C5D6', fontWeight: 'bold' },
});