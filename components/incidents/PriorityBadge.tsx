import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '../themed-text';
import { COLORS } from '../../constants/colors';
import { LABELS } from '../../constants/labels';

interface PriorityBadgeProps {
  priority: string;
}

export const PriorityBadge = ({ priority }: PriorityBadgeProps) => {
  const getPriorityColor = () => {
    switch (priority?.toUpperCase()) {
      case 'HIGH':
      case 'ALTA':
      case 'CRITICAL':
      case 'CRÍTICA': return COLORS.danger;
      case 'MEDIUM':
      case 'MEDIA': return COLORS.warning;
      case 'LOW':
      case 'BAJA': return COLORS.success;
      default: return COLORS.gray;
    }
  };

  const getPriorityLabel = () => {
    return LABELS.PRIORITY[priority?.toUpperCase() as keyof typeof LABELS.PRIORITY] || priority;
  };

  return (
    <View style={[styles.badge, { backgroundColor: getPriorityColor() }]}>
      <ThemedText style={styles.text}>{getPriorityLabel()}</ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  text: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
