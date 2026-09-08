import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useRouter } from 'expo-router';
// Importando o seu arquivo SVG gerado no passo 4
import Ilustracao from '../components/Ilustracao'; 

export default function WelcomeScreen() {
  const router = useRouter();
  const flutuacao = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(flutuacao, { toValue: -15, duration: 1500, useNativeDriver: true }),
        Animated.timing(flutuacao, { toValue: 0, duration: 1500, useNativeDriver: true }),
      ])
    ).start();
  }, [flutuacao]);

  return (
    <View style={styles.container}>
      
      {/* Caixa Animada flutuando com o seu SVG dentro */}
      <Animated.View style={[styles.ilustracaoContainer, { transform: [{ translateY: flutuacao }] }]}>
        <Ilustracao width={250} height={250} />
      </Animated.View>

      <Text style={styles.title}>Zelando pela sua cidade</Text>
      <Text style={styles.subtitle}>
        Relate buracos, problemas de iluminação ou lixo irregular de forma rápida e ajude a melhorar nossa cidade.
      </Text>

      <TouchableOpacity 
        style={styles.primaryButton} 
        onPress={() => router.push('/cadastro')}
      >
        <Text style={styles.primaryButtonText}>Criar Conta</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.secondaryButton}
        onPress={() => router.push('/login')}
      >
        <Text style={styles.secondaryButtonText}>Já tenho uma conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    padding: 24,
    justifyContent: 'center',
  },
  ilustracaoContainer: {
    marginBottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E1E1E',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  primaryButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#00C5D6',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#FF4D6D',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#FF4D6D',
    fontSize: 18,
    fontWeight: 'bold',
  },
});