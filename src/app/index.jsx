import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  StatusBar,
  Platform,
  SafeAreaView,
  Easing,
} from 'react-native';
import { useRouter } from 'expo-router';
import Ilustracao from '../components/Ilustracao'; 

export default function WelcomeScreen() {
  const router = useRouter();
  
  const animProgress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animProgress, {
          toValue: 1,
          duration: 3000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(animProgress, {
          toValue: 0,
          duration: 3000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [animProgress]);

  const translateY = animProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -12]
  });

  const scale = animProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.03],
  });

  const rotate = animProgress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '1.2deg'], 
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.container}>
        
        {/* Topo / Logo */}
        <View style={styles.header}>
          <View style={styles.logoBadge}>
            <Text style={styles.logoBadgeText}>ZELA</Text>
          </View>
        </View>

        {/* Conteúdo Central */}
        <View style={styles.mainContent}>
          <Animated.View 
            style={[
              styles.ilustracaoContainer, 
              { 
                transform: [
                  { translateY },
                  { scale },
                  { rotate }
                ] 
              }
            ]}
          >
            <Ilustracao width={310} height={240} />
          </Animated.View>

          <View style={styles.textGroup}>
            <Text style={styles.title}>Zelando pela sua cidade</Text>
            <Text style={styles.subtitle}>
              Relate buracos, problemas de iluminação ou lixo irregular de forma rápida e ajude a melhorar nossa cidade.
            </Text>
          </View>
        </View>

        {/* Botões */}
        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.primaryButton} 
            onPress={() => router.push('/cadastro')}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>Criar Conta</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => router.push('/login')}
            activeOpacity={0.7}
          >
            <Text style={styles.secondaryButtonText}>Já tenho uma conta</Text>
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
    alignItems: 'center',
  },
  header: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 12,
    paddingBottom: 8,
  },
  logoBadge: {
    backgroundColor: '#1C2833',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  logoBadgeText: {
    color: '#00C5D6',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 2,
  },
  mainContent: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  ilustracaoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  textGroup: {
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 23,
    fontWeight: '700',
    color: '#1E1E1E',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 21,
  },
  footer: {
    width: '100%',
    gap: 12,
  },
  primaryButton: {
    width: '100%',
    height: 52,
    backgroundColor: '#00C5D6',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    width: '100%',
    height: 52,
    backgroundColor: '#F5F5F7',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#333333',
    fontSize: 16,
    fontWeight: '600',
  },
});