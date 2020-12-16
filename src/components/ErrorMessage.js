import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RED } from '../utils/colors';

export default function ErrorMessage({ message }) {
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.error}>{message}</Text> 
    </View>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
  },
  error: {
    color: RED,
  }
});