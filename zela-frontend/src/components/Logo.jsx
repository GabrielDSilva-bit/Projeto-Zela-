import React from 'react';
import { Image, StyleSheet } from 'react-native';

export default function Logo({ width = 200, style }) {
  // Proporção exata da imagem ZELA (largura x altura = 4.85 : 1)
  const height = width / 4.85;

  return (
    <Image
      source={require('../../assets/images/logo.png')}
      style={[{ width, height }, style]}
      resizeMode="contain"
    />
  );
}