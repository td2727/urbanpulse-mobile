import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '../themed-text';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.text}>{message}</ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#FFE5E5',
    borderRadius: 8,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#FF3B30',
  },
  text: {
    color: '#FF3B30',
    fontSize: 14,
    textAlign: 'center',
  },
});
